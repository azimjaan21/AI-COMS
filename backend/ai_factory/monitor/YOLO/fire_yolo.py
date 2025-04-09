from ultralytics import YOLO
import os

model_path = os.path.join(os.path.dirname(__file__), 'models', 'fire.pt')
fire_model = YOLO(model_path)

def run_fire_inference(frame):
    results = fire_model.predict(source=frame, save=False, conf=0.5, imgsz=640)[0]
    
    detections = []
    for box in results.boxes:
        label = results.names[int(box.cls)]
        conf = float(box.conf)
        xyxy = box.xyxy.tolist()[0]
        detections.append({
            'label': label,
            'confidence': round(conf, 3),
            'bbox': [int(coord) for coord in xyxy]
        })

    return {'objects': detections}
