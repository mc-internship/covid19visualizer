from django.urls import path, re_path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path(r'test/', views.index, name='index'),
    re_path(".*", TemplateView.as_view(template_name="index.html"))
]
