from django.urls import path
from . import views

urlpatterns = [
    path('compress', views.compress, name='get_users'),
    path('share', views.share, name='share'),
    # Add more URL patterns as needed
]
