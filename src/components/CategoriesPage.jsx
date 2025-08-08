import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../redux/categorySlice";

function CategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const [showModal, setShowModal] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        dispatch(setCategories(res.data));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setEditingCategoryId(null);
    setCategoryName("");
    setShowModal(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
      dispatch(deleteCategory(id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      if (editingCategoryId) {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/categories/${editingCategoryId}`,
          {
            name: categoryName,
          }
        );
        dispatch(updateCategory(res.data));
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/categories`,
          { name: categoryName }
        );
        dispatch(addCategory(res.data));
      }
      setShowModal(false);
      setCategoryName("");
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="row mt-4 d-flex gap-3">
        <div className="col-12 d-flex justify-content-between align-items-center p-0">
          <h3 className="fw-bold">Categories</h3>
          <Button variant="primary" onClick={handleOpenAddModal}>
            Add Category
          </Button>
        </div>
        <div className="col border rounded shadow p-4 bg-white">
          <div className="row">
            {categories.map((category) => (
              <div className="col-md-6 mb-3" key={category.id}>
                <div className="border rounded shadow-sm p-3 bg-white d-flex justify-content-between align-items-center">
                  <span className="fw-semibold fs-5">{category.name}</span>
                  <div>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => handleOpenEditModal(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategoryId ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingCategoryId ? "Save Changes" : "Add Category"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default CategoriesPage;
