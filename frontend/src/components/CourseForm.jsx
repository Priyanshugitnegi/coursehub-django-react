function CourseForm({
  courseName,
  setCourseName,
  courseDuration,
  setCourseDuration,
  courseCategory,
  setCourseCategory,
  categories,
  handleAddCourse,
  loading,
}) {
  return (
    <div className="course-form">

      <h2>Add Course</h2>

      <div className="course-form-row">

        <input
          type="text"
          placeholder="Course name"
          value={courseName}
          onChange={(e) =>
            setCourseName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Duration"
          value={courseDuration}
          onChange={(e) =>
            setCourseDuration(e.target.value)
          }
        />

        <select
          value={courseCategory}
          onChange={(e) =>
            setCourseCategory(e.target.value)
          }
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddCourse}
          disabled={loading}
        >
          {loading
            ? "Adding..."
            : "Add Course"}
        </button>

      </div>

    </div>
  );
}

export default CourseForm;