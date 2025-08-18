import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useApi } from "../hooks/useApi";
import { useCategories } from "../hooks/useCategories";
import FormCategory from "./FormCategory";
import { formatName } from "../utils/formatName";
import { toast } from "react-toastify";

const emptyCategory = {
  id: "",
  name: "",
  alias: "",
  description: "",
  image: null,
};

export default function CategoriesPage() {
  const { categories } = useCategories();
  const { postCategory, patchCategory, destroyCategory } = useApi();

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(emptyCategory);

  const handleCreateCategory = async (data) => {
    try {
      await postCategory({ ...data, image: data.image?.[0] });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async (data) => {
    try {
      const categoryData = { ...data, image: data.image?.[0] };
      if (!data.image) {
        delete categoryData.image;
      }
      await patchCategory(categoryData);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete?</p>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                try {
                  await destroyCategory(id);
                  closeToast();
                } catch (error) {
                  closeToast();
                  toast.error("Failed to delete user", { theme: "dark" });
                }
              }}
            >
              Accept
            </button>
            <button className="btn btn-secondary btn-sm" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  const handleEditForm = (category) => {
    setSelectedCategory({ ...category, image: null });
    setShowModal(true);
  };

  const handleCreateForm = () => {
    setSelectedCategory(emptyCategory);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedCategory(emptyCategory);
    setShowModal(false);
  };

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="row mt-4 d-flex gap-3">
        <div className="col-12 d-flex justify-content-between align-items-center p-0">
          <h3 className="fw-bold">Categories</h3>
          <Button className="btn-mycolor" onClick={handleCreateForm}>
            Add Category
          </Button>
        </div>
        <div className="col border rounded shadow p-4 bg-white">
          <div className="row">
            {categories.map((category) => (
              <div className="col-md-4 mb-4" key={category.id}>
                <div className="border rounded shadow-sm p-3 h-100 d-flex flex-column">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="img-fluid rounded mb-3"
                      style={{ objectFit: "contain", height: "200px" }}
                    />
                  ) : (
                    <div className="no-image rounded mb-3">No Image</div>
                  )}
                  <h6 className="mb-1">{formatName(category.name)}</h6>
                  <h5 className="fw-bold mb-1">{category.alias}</h5>
                  <p className="text-muted small mb-3">
                    {category.description}
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between">
                      <Button
                        size="sm"
                        className="btn-outline-mycolor"
                        onClick={() => handleEditForm(category)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {`${selectedCategory.id ? "Edit" : "Add New"} `} Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCategory
            initialValues={selectedCategory}
            onCancel={handleModalClose}
            onSubmit={
              selectedCategory.id ? handleUpdateCategory : handleCreateCategory
            }
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
