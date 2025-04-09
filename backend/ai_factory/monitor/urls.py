from django.urls import path
from . import views

urlpatterns = [
    path('process-frame/', views.process_frame),
    path('latest/', views.latest_detections),
]
