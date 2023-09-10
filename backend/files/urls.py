from django.urls import path
from . import views

urlpatterns = [
    path('compress', views.compress, name='get_users'),
    path('decompress', views.decompress, name='decompress'),
    path('share', views.share, name='share'),
    path('share_with_password', views.share_with_password, name='share_with_password'),
    # Add more URL patterns as needed
]