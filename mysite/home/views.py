from django.shortcuts import render,redirect
from .models import Course,Enrollment,Category
from .forms import CourseForm
from django.contrib.auth import authenticate,login
from .forms import CourseForm,RegisterForm
from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import CourseSerializer, EnrollmentSerializer,CategorySerializer,RegisterSerializer
from rest_framework.permissions import IsAuthenticated
# from django.http import HttpResponse

# Create your views here.
# def home(request):
#     return HttpResponse("Hello, Django!")

# def home(request):
#     return render(request,"home.html")


# def home(request):
#     # context={
#     #     "name": "Priyanshu",
#     #     "course":"Django",
#     #     "enrolled":True,
#     #     "courses": ["Python","Django","SQL"]
#     # }
#     # return render(request,"home.html",context)

#     # if request.method=="POST":
#     #     name=request.POST.get("name")
#     #     duration=request.POST.get("duration")

#     #     Course.objects.create(
#     #         name=name,
#     #         duration=duration
#     #     )

#     # courses=Course.objects.all()

#     # context={
#     #     "courses":courses
#     # }
#     return render(request,"home.html",context)

# def home(request):
#     form = CourseForm()

#     courses = Course.objects.all()

#     context = {
#         "courses": courses,
#         "form": form
#     }

#     return render(request, "home.html", context)
@login_required
def home(request):

    if request.method == "POST":
        form = CourseForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect("home")

    else:
        form = CourseForm()

    courses = Course.objects.all()

    enrolled_course_ids = Enrollment.objects.filter(
        user=request.user
    ).values_list("course_id", flat=True)


    context = {
        "courses": courses,
        "form": form,
        "enrolled_course_ids":enrolled_course_ids,
    }

    return render(request, "home.html", context)

# def edit_course(request,id):
#     course=Course.objects.get(id=id)

#     if request.method=="POST":
#         course.name=request.POST.get("name")
#         course.duration=request.POST.get("duration")
#         course.save()

#         return redirect("home")

#     context={
#         "course":course
#     }
#     return render(request,"edit_course.html",context)
@login_required

def edit_course(request, id):
    course = Course.objects.get(id=id)

    if request.method == "POST":
        form = CourseForm(request.POST, instance=course)

        if form.is_valid():
            form.save()
            return redirect("home")

    else:
        form = CourseForm(instance=course)

    context = {
        "form": form
    }

    return render(request, "edit_course.html", context)

@login_required
def delete_course(request, id):

    if request.method == "POST":
        course = Course.objects.get(id=id)
        course.delete()

    return redirect("home")

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)

        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("home")

    else:
        form = RegisterForm()

    return render(request, "register.html", {"form": form})


def user_login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            return redirect("home")
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, "login.html")

def user_logout(request):
    logout(request)
    return redirect("login")

@login_required
def enroll_course(request, id):
    if request.method == "POST":
        course = Course.objects.get(id=id)

    # enrollment, created = Enrollment.objects.get_or_create(
    #     user=request.user,
    #     course=course
    Enrollment.objects.get_or_create(
            user=request.user,
            course=course
    )
    return redirect("home")


# @api_view(["GET"])
# def course_list_api(request):
#     courses = Course.objects.all()
#     serializer = CourseSerializer(courses, many=True)

#     return Response(serializer.data)

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def course_list_api(request):
    if request.method == "GET":
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = CourseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def course_detail_api(request, id):
    try:
        course = Course.objects.get(id=id)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)

    if request.method == "GET":
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = CourseSerializer(course, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    if request.method == "DELETE":
        course.delete()
        return Response(status=204)

@api_view(["GET", "POST"])
# @login_required
@permission_classes([IsAuthenticated])

def enrollment_api(request):

    if request.method == "GET":
        enrollments = Enrollment.objects.filter(user=request.user)
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        course_id = request.data.get("course")

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response(
                {"error": "Course not found"},
                status=404
            )

        enrollment, created = Enrollment.objects.get_or_create(
            user=request.user,
            course=course
        )

        serializer = EnrollmentSerializer(enrollment)
        return Response(
            serializer.data,
            status=201 if created else 200
        )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def category_list_api(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        return Response(
            {
                "message": "User registered successfully",
                "username": user.username,
            },
            status=201,
        )

    return Response(serializer.errors, status=400)