"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from backendapi import views
from backend import test_views
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'test/', test_views.index, name='index'),
    path('covidDataIndiaStatewise/<int:countryid>/', views.covidDataIndiaStatewise.as_view()),
    path('covidimpact/<int:countryid>/', views.covidimpact.as_view()),
    path('statesdaily/<int:countryid>/', views.states_daily.as_view()),
    path('countryattribute/<int:countryid>/',views.countrywise_attribute.as_view()),
    path('world', views.world.as_view()),
    path('events/<int:countryid>/', views.events.as_view())
]
