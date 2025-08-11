import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormProducts from "./FormProducts";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import { useApi } from "../hooks/useApi";

function ProductsPage() {
  const { products } = useCategoryProducts();
  const { postProduct, patchProduct, destroyProduct } = useApi();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [newProduct, setNewProduct] = useState({
    id: "",
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
      id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      featured: false,
      category: "",
      image: null,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await postProduct(newProduct);
      resetModal();
      setShowModalAdd(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
      };

      if (!newProduct.image) {
        delete productData.image;
      }

      await patchProduct(productData);
      resetModal();
      setShowModalUpdate(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    await destroyProduct(id);
  };

  const handleEdit = (product) => {
    setNewProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      featured: product.featured,
      image: null,
      category: product.category,
    });
    setShowModalUpdate(true);
  };

  const handleModalClose = () => {
    resetModal();
    setShowModalUpdate(false);
    setShowModalAdd(false);
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
              setShowModalAdd(true);
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
                      <strong>Price:</strong> U$S{" "}
                      {Number(product.price).toLocaleString("de-DE")} <br />
                      <strong>Stock:</strong> {product.stock}
                      <br />
                      <strong>Category:</strong>{" "}
                      {product.category?.name || "Sin categoría"}
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

      <Modal show={showModalUpdate} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProducts
            setNewProduct={setNewProduct}
            product={newProduct}
            isEditing={true}
            onCancel={handleModalClose}
            onSubmit={handleUpdateProduct}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showModalAdd} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProducts
            setNewProduct={setNewProduct}
            onCancel={handleModalClose}
            product={newProduct}
            onSubmit={handleAddProduct}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductsPage;
