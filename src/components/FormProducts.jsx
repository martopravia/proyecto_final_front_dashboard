import React from "react";
import { Form, Button } from "react-bootstrap";

const FormProducts = ({
  onCancel,
  setNewProduct,
  isEditing,
  product,
  onSubmit,
}) => {
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
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          value={product.description}
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
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          value={product.category.name}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="chairs">Chairs</option>
          <option value="tables">Tables</option>
          <option value="sofas">Sofas</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required={!isEditing}
        />
        {product.image && (
          <img
            src={
              product.image instanceof File
                ? URL.createObjectURL(product.image)
                : product.image
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
        checked={product.featured}
        onChange={handleChange}
        className="mb-3"
      />
      <div className="text-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </Form>
  );
};

export default FormProducts;
