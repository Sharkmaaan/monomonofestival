from django.urls import path
from . import views
from website import views

urlpatterns = [
    path('', views.home, name='home'),
]