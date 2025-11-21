from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def location(request):
    return render(request, 'location.html')

def aboutus(request):
    return render(request, 'aboutus.html')

def artists(request):
    return render(request, 'artists.html')
