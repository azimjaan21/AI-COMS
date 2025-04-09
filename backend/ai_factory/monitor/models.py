from django.db import models
class Detection(models.Model):
    DETECTION_TYPES = [
        ('PPE', 'PPE'),
        ('FIRE', 'Fire')
    ]

    camera_id = models.CharField(max_length=50)
    detection_type = models.CharField(max_length=10, choices=DETECTION_TYPES)
    timestamp = models.DateTimeField(auto_now_add=True)
    result_json = models.JSONField()  # Raw YOLO output (boxes, scores, etc.)

    def __str__(self):
        return f"{self.detection_type} - Cam {self.camera_id} - {self.timestamp}"

