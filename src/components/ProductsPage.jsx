import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Silla Nórdica",
      description: "Silla de madera estilo nórdico.",
      price: 120,
      stock: 8,
      featured: true,
      image: "https://picsum.photos/id/4/300/200",
    },
    {
      id: 2,
      name: "Mesa de Cedro",
      description: "Mesa grande de comedor en cedro macizo.",
      price: 950,
      stock: 3,
      featured: false,
      image: "https://picsum.photos/id/9/300/200",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    featured: false,
    image: null,
  });

  const resetModal = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      featured: false,
      image: null,
    });
    setEditingProductId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setNewProduct((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();

    if (editingProductId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                name: newProduct.name,
                description: newProduct.description,
                price: parseFloat(newProduct.price),
                stock: parseInt(newProduct.stock),
                featured: newProduct.featured,
                image: newProduct.image || p.image,
              }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          ...newProduct,
          id: Date.now(),
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
        },
      ]);
    }

    resetModal();
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      featured: product.featured,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    resetModal();
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h3 className="fw-bold">Products</h3>
        <Button
          variant="primary"
          onClick={() => {
            resetModal();
            setShowModal(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="border rounded shadow-sm p-3 h-100 d-flex flex-column">
              <img
                src={
                  product.image instanceof File
                    ? URL.createObjectURL(product.image)
                    : product.image || "https://via.placeholder.com/300x200"
                }
                alt={product.name}
                className="img-fluid rounded mb-3"
                style={{ objectFit: "contain", height: "200px" }}
              />
              <h5 className="fw-bold mb-1">
                {product.name}{" "}
                {product.featured && <span title="Featured">⭐</span>}
              </h5>
              <p className="text-muted small mb-2">{product.description}</p>
              <div className="mt-auto">
                <div className="mb-2">
                  <strong>Price:</strong> ${product.price.toFixed(2)} <br />
                  <strong>Stock:</strong> {product.stock}
                </div>
                <div className="d-flex justify-content-between">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProductId ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOrUpdateProduct}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                as="textarea"
                rows={2}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                name="stock"
                type="number"
                value={newProduct.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required={!editingProductId}
              />

              {newProduct.image && (
                <img
                  src={
                    newProduct.image instanceof File
                      ? URL.createObjectURL(newProduct.image)
                      : newProduct.image
                  }
                  alt="Preview"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              )}
            </Form.Group>
            <Form.Check
              name="featured"
              type="checkbox"
              label="Featured"
              checked={newProduct.featured}
              onChange={handleChange}
              className="mb-3"
            />
            <div className="text-end">
              <Button
                variant="secondary"
                onClick={handleModalClose}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingProductId ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductsPage;
