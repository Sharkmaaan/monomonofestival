from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('location.html', views.location, name='location'),
    path('aboutus.html', views.aboutus, name='aboutus'),
    path('artists.html', views.artists, name='artists'),
]