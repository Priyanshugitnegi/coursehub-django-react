import { useEffect, useState } from "react";

import Login from "./components/Login";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import EditCourse from "./components/EditCourse";
import Register from "./components/Register";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseCategory, setCourseCategory] = useState("");

  const [editingCourse, setEditingCourse] = useState(null);
const [enrollingCourse, setEnrollingCourse] = useState(null);
  const token = localStorage.getItem("token");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/api/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      localStorage.setItem("token", data.token);

      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  // const fetchCourses = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/api/courses/",
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch courses");
  //     }

  //     setCourses(data);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // const fetchEnrollments = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/api/enrollments/",
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch enrollments");
  //     }

  //     setEnrolledCourses(
  //       data.map((enrollment) => enrollment.course)
  //     );
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

 useEffect(() => {
  if (!token) {
    return;
  }

  const loadCoursesAndEnrollments = async () => {
    try {
      const [coursesResponse, enrollmentsResponse] =
        await Promise.all([
          fetch("http://127.0.0.1:8000/api/courses/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          }),

          fetch("http://127.0.0.1:8000/api/enrollments/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          }),
        ]);

      const coursesData = await coursesResponse.json();
      const enrollmentsData =
        await enrollmentsResponse.json();

      if (!coursesResponse.ok) {
        throw new Error("Failed to fetch courses");
      }

      if (!enrollmentsResponse.ok) {
        throw new Error("Failed to fetch enrollments");
      }

      setCourses(coursesData);

      setEnrolledCourses(
        enrollmentsData.map(
          (enrollment) => enrollment.course
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  loadCoursesAndEnrollments();
}, [token]);

  const handleEnroll = async (courseId) => {
  if (enrollingCourse === courseId) {
    return;
  }

  try {
    setEnrollingCourse(courseId);

    const response = await fetch(
      "http://127.0.0.1:8000/api/enrollments/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          course: courseId,
        }),
      }
    );

    // const data = await response.json();

    if (!response.ok) {
      throw new Error("Enrollment failed");
    }

    setEnrolledCourses((previous) => [
      ...previous,
      courseId,
    ]);

    alert("Enrolled successfully!");
  } catch (error) {
    alert(error.message);
  } finally {
    setEnrollingCourse(null);
  }
};

  const handleAddCourse = async () => {
    if (!courseName.trim()) {
  alert("Please enter a course name");
  return;
}

if (!courseDuration || Number(courseDuration) <= 0) {
  alert("Duration must be greater than 0");
  return;
}

if (!courseCategory) {
  alert("Please select a category");
  return;
}
  try {
    setLoading(true);

    const response = await fetch(
      "http://127.0.0.1:8000/api/courses/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          name: courseName,
          duration: Number(courseDuration),
          category: Number(courseCategory),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to add course");
    }

    setCourses((previous) => [
      ...previous,
      data,
    ]);

    setCourseName("");
    setCourseDuration("");
    setCourseCategory("");

    alert("Course added successfully!");
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (course) => {
    setEditingCourse(course);
  };
const handleUpdateCourse = async () => {
  if (!editingCourse.name.trim()) {
    alert("Please enter a course name");
    return;
  }

  if (
    !editingCourse.duration ||
    Number(editingCourse.duration) <= 0
  ) {
    alert("Duration must be greater than 0");
    return;
  }

  if (!editingCourse.category) {
    alert("Please select a category");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      `http://127.0.0.1:8000/api/courses/${editingCourse.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          name: editingCourse.name,
          duration: Number(editingCourse.duration),
          category: Number(editingCourse.category),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to update course");
    }

    setCourses((previous) =>
      previous.map((course) =>
        course.id === data.id ? data : course
      )
    );

    setEditingCourse(null);

    alert("Course updated successfully!");
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
  

const handleDeleteCourse = async (courseId) => {
  try {
    setLoading(true);

    const response = await fetch(
      `http://127.0.0.1:8000/api/courses/${courseId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete course");
    }

    setCourses((previous) =>
      previous.filter((course) => course.id !== courseId)
    );

    alert("Course deleted successfully!");
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!token) {
  if (showRegister) {
    return (
      <Register
        onBackToLogin={() => setShowRegister(false)}
      />
    );
  }

  return (
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
      error={error}
      onRegister={() => setShowRegister(true)}
    />
  );
}

  return (
    <div className="app">
    <nav className="navbar">
      <h1 className="logo">CourseHub</h1>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>

    <div className="container">

      <EditCourse
        editingCourse={editingCourse}
        setEditingCourse={setEditingCourse}
          handleUpdateCourse={handleUpdateCourse}
          loading={loading}

      />

      <CourseForm
        courseName={courseName}
        setCourseName={setCourseName}
        courseDuration={courseDuration}
        setCourseDuration={setCourseDuration}
        courseCategory={courseCategory}
        setCourseCategory={setCourseCategory}
        handleAddCourse={handleAddCourse}
        loading={loading}
      />

{error && <p className="error">{error}</p>}
      <CourseList
        courses={courses}
        enrolledCourses={enrolledCourses}
        handleEnroll={handleEnroll}
        handleEdit={handleEdit}
          handleDeleteCourse={handleDeleteCourse}
          loading={loading}
            enrollingCourse={enrollingCourse}


      />
    </div>
    </div>
  );
}

export default App;