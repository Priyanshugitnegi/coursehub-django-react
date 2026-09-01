# CourseHub — Django + React

A full-stack course management application built with **Django REST Framework** and **React**.

CourseHub allows users to register and log in, browse available courses, enroll in courses, and manage courses through a React-based frontend connected to a Django REST API.

## Features

- User registration
- Token-based authentication
- User login and logout
- Protected API endpoints
- Course listing
- Create courses
- Edit courses
- Delete courses
- Course categories
- Course enrollment
- User-specific enrollment status
- Form validation
- Loading states for API operations
- Responsive frontend UI

## Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- django-cors-headers
- SQLite

### Frontend

- React
- Vite
- JavaScript
- CSS

## Project Structure

```text
coursehub-django-react/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CourseForm.jsx
│   │   │   ├── CourseList.jsx
│   │   │   └── EditCourse.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── mysite/
│   ├── home/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── forms.py
│   │
│   ├── mysite/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
└── README.md