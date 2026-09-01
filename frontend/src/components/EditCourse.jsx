import { useEffect, useState } from "react";

function EditCourse({
  editingCourse,
  setEditingCourse,
  handleUpdateCourse,
  loading
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

    if (editingCourse) {
      fetchCategories();
    }
  }, [editingCourse, token]);

  if (!editingCourse) {
    return null;
  }

  return (
    <div className="edit-form">
      <h2>Edit Course</h2>

      <input
        type="text"
        value={editingCourse.name}
        onChange={(e) =>
          setEditingCourse({
            ...editingCourse,
            name: e.target.value,
          })
        }
      />

      <input
        type="number"
        value={editingCourse.duration}
        onChange={(e) =>
          setEditingCourse({
            ...editingCourse,
            duration: Number(e.target.value),
          })
        }
      />

      <select
        value={editingCourse.category}
        onChange={(e) =>
          setEditingCourse({
            ...editingCourse,
            category: Number(e.target.value),
          })
        }
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button
        className="update-button"
        onClick={handleUpdateCourse}
        disabled={loading}
      >
        {loading ? "Updatting...": "Update Course"}
      </button>

      <button
        className="cancel-button"
        onClick={() => setEditingCourse(null)}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditCourse;