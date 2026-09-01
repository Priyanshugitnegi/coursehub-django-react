from django.urls import path
from . import views

urlpatterns = [
    path("hello/",views.home,name="home"),
    path("edit/<int:id>/",views.edit_course,name="edit_course"),
    path("delete/<int:id>/", views.delete_course, name="delete_course"),
    path("register/", views.register, name="register"),
    path("login/", views.user_login, name="login"),
    path("logout/", views.user_logout, name="logout"),
    path("enroll/<int:id>/", views.enroll_course, name="enroll_course"),
    path("api/courses/", views.course_list_api, name="course_list_api"),
    path("api/courses/<int:id>/", views.course_detail_api, name="course_detail_api"),
    path("api/enrollments/", views.enrollment_api, name="enrollment_api"),
    path("api/categories/", views.category_list_api,name="category_list_api"),
    path("api/register/",views.register_api,name="register_api"),
]