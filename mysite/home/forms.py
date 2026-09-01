from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Course


class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ["name", "duration","category"]
        

    def clean_duration(self):
        duration = self.cleaned_data["duration"]

        if duration <= 0:
            raise forms.ValidationError("Duration must be greater than 0.")

        return duration

class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "password1", "password2"]