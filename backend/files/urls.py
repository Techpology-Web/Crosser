from django.urls import path
from . import views

urlpatterns = [
    path('compress', views.compress, name='get_users'),
    path('decompress', views.decompress, name='decompress'),
    path('share', views.share, name='share'),
    path('share_with_password', views.share_with_password, name='share_with_password'),
    path('get_files', views.get_files, name='share_with_password'),
    path('get_db_size', views.getDbSize, name='get_db_size'),
    # Add more URL patterns as needed
]
