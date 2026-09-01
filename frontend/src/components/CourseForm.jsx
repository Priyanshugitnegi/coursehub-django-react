import { useEffect, useState } from "react";

function CourseForm({
  courseName,
  setCourseName,
  courseDuration,
  setCourseDuration,
  courseCategory,
  setCourseCategory,
  handleAddCourse,
  loading,
}) {
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/categories/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [token]);

  return (
    <div className="course-form">
      <h2>Add Course</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration"
          value={courseDuration}
          onChange={(e) => setCourseDuration(e.target.value)}
        />

        <select
          value={courseCategory}
          onChange={(e) => setCourseCategory(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          className="add-button"
          onClick={handleAddCourse}
          disabled={loading}
        >
          {loading ? "Adding ...":"Add Course"}
        </button>
      </div>
    </div>
  );
}

export default CourseForm;