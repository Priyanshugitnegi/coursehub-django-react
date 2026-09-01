from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# class Course(models.Model):
#     name=models.CharField(max_length=100)
#     duration=models.IntegerField()
#     category=models.models.ForeignKey(Category,on_delete=models.CASCADE)

class Course(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField()
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints=[
            models.UniqueConstraint(
                fields=["user","course"],
                name="unique_user_course"
            )
        ]