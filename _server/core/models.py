from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserPlaylist(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.TextField()

    def __str__ (self):
        return f"{self.title} by {self.user_id.username}"