import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";

function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const token = useSelector((state) => state.user.token);

  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = products.map((product) => ({
          ...product,
          category: product.category?.name,
        }));
        dispatch(setProducts(result));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    featured: false,
    category: "",
    image: null,
  });

  const resetModal = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      featured: false,
      category: "",
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
      const updatedProducts = products.map((p) =>
        p.id === editingProductId
          ? {
              ...p,
              ...newProduct,
              price: Number(newProduct.price),
              stock: Number(newProduct.stock),
            }
          : p
      );
      dispatch(setProducts(updatedProducts));
    } else {
      const newId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const newProd = {
        id: newId,
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        category: newProduct.category || "Uncategorized",
        image:
          newProduct.image instanceof File
            ? URL.createObjectURL(newProduct.image)
            : newProduct.image,
      };
      dispatch(setProducts([...products, newProd]));
    }
    resetModal();
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    dispatch(setProducts(filtered));
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      featured: product.featured,
      image: null,
      category: product.category,
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    resetModal();
    setShowModal(false);
  };

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="row mt-4 d-flex gap-3">
        <div className="col-12 d-flex justify-content-between align-items-center p-0">
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
        <div className="col border rounded shadow p-4">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="border rounded shadow-sm p-3 h-100 d-flex flex-column">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={product.name}
                    className="img-fluid rounded mb-3"
                    style={{ objectFit: "contain", height: "200px" }}
                  />
                  <h5 className="fw-bold mb-1">
                    {capitalizeFirstLetter(product.name)}{" "}
                    {product.featured && <span title="Featured">⭐</span>}
                  </h5>
                  <p className="text-muted small mb-2">{product.description}</p>
                  <div className="mt-auto">
                    <div className="mb-2">
                      <strong>Price:</strong> $
                      {Number(product.price).toFixed(2)} <br />
                      <strong>Stock:</strong> {product.stock}
                      <br />
                      <strong>Category:</strong> {product.category}
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
        </div>
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
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={newProduct.category}
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
