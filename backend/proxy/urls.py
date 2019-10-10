from django.urls import path

from proxy import views

urlpatterns = [
    path('get_access_token/', views.get_access_token)
]
