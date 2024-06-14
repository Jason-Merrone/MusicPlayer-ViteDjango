from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('create_playlist/', view=views.create_playlist, name='user playlist')
]