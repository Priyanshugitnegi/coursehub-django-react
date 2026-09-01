function CourseList({
  courses,
  enrolledCourses,
  handleEnroll,
  handleEdit,
  handleDeleteCourse,
  loading,
  enrollingCourse
}) {
  return (
    <div>
      <h1>My Courses</h1>   
      <div className="course-grid">
      {courses.map((course) => (
        <div className="course-card" key={course.id}>
          <h2>{course.name}</h2>

          <p>
            Duration: {course.duration} minutes
          </p>

          <p>
            Category: {course.category}
          </p>

          {enrolledCourses.includes(course.id) ? (
<p className="enrolled">✅ Enrolled</p>          ) : (
           <button
  className="enroll-button"
  onClick={() => handleEnroll(course.id)}
  disabled={enrollingCourse === course.id}
>
  {enrollingCourse === course.id
    ? "Enrolling..."
    : "Enroll"}
</button>
            
          )}
          <button className="delete-button" onClick={() => handleDeleteCourse(course.id)} disabled={loading}>
  {loading ? "Deleting...":"Delete"}
</button>

          <button className="edit-button" onClick={() => handleEdit(course)}>
            Edit
          </button>

          <hr />
        </div>
      ))}
    </div>
    </div>
  );
  
}

export default CourseList;