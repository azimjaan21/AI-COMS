from ultralytics import YOLO
import os

# Load model
model_path = os.path.join(os.path.dirname(__file__), 'models', 'ppe.pt')
ppe_model = YOLO(model_path)

# Define class mapping (optional but safer)
CLASS_NAMES = {
    0: 'helmet',
    1: 'vest',
    2: 'head'
}

def run_ppe_inference(frame):
    results = ppe_model.predict(source=frame, save=False, conf=0.4, imgsz=640)[0]

    detections = {
        'helmet': [],
        'vest': [],
        'head': []
    }

    for box in results.boxes:
        class_id = int(box.cls)
        label = CLASS_NAMES.get(class_id, f'class_{class_id}')
        conf = float(box.conf)
        xyxy = box.xyxy.tolist()[0]

        detection = {
            'confidence': round(conf, 3),
            'bbox': [int(coord) for coord in xyxy]
        }

        if label in detections:
            detections[label].append(detection)
        else:
            detections[label] = [detection]

    return detections
