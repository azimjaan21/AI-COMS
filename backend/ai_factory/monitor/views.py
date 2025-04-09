from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Detection
from .serializers import DetectionSerializer
from .YOLO.ppe_yolo import run_ppe_inference
from .YOLO.fire_yolo import run_fire_inference
import base64
import numpy as np
import cv2


@api_view(['POST'])
def process_frame(request):
    """
    Accepts a frame (uploaded or base64) and camera_id, runs inference (PPE or FIRE), and saves result.
    """
    try:
        camera_id = request.data.get('camera_id')
        detection_type = request.data.get('detection_type')  # 'PPE' or 'FIRE'

        frame = request.FILES.get('frame')
        image_base64 = request.data.get('image_base64')

        if frame:
            img_np = np.frombuffer(frame.read(), np.uint8)
            img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)
        elif image_base64:
            if "," in image_base64:
                image_base64 = image_base64.split(",")[1]  # remove "data:image/jpeg;base64," if present
            image_bytes = base64.b64decode(image_base64)
            img_np = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)
        else:
            return Response({'error': 'No image provided (frame or image_base64)'}, status=400)

        # Run appropriate detection
        if detection_type == 'PPE':
            result = run_ppe_inference(img)
        elif detection_type == 'FIRE':
            result = run_fire_inference(img)
        else:
            return Response({'error': 'Invalid detection type'}, status=400)

        # Save to DB
        detection = Detection.objects.create(
            camera_id=camera_id,
            detection_type=detection_type,
            result_json=result
        )

        return Response(DetectionSerializer(detection).data)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['GET'])
def latest_detections(request):
    """
    Return latest detections (for frontend polling).
    """
    limit = int(request.GET.get("limit", 10))
    queryset = Detection.objects.all().order_by('-timestamp')[:limit]
    return Response(DetectionSerializer(queryset, many=True).data)

