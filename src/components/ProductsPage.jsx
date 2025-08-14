import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormProduct from "./FormProduct";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import { useApi } from "../hooks/useApi";
import { formatName } from "../utils/formatName";

const emptyProduct = {
  id: "",
  name: "",
  description: "",
  price: "",
  stock: "",
  featured: false,
  categoryId: "",
  image: null,
};

function ProductsPage() {
  const { products = [] } = useCategoryProducts();
  const { postProduct, patchProduct, destroyProduct } = useApi();

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(emptyProduct);

  const handleCreateProduct = async (data) => {
    try {
      await postProduct({ ...data, image: data.image?.[0] });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      const productData = { ...data, image: data.image?.[0] };
      if (!data.image) {
        delete productData.image;
      }
      await patchProduct(productData);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    await destroyProduct(id);
  };

  const handleEditForm = (product) => {
    setSelectedProduct({ ...product, image: null });
    setShowModal(true);
  };

  const handleCreateForm = () => {
    setSelectedProduct(emptyProduct);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedProduct(emptyProduct);
    setShowModal(false);
  };

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.trim().toLowerCase();
    const nameMatch = product.name?.toLowerCase().includes(search);
    const categoryMatch = product.category?.name
      ?.toLowerCase()
      .includes(search);
    return nameMatch || categoryMatch;
  });

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="row mt-4 d-flex gap-3">
        <div className="col-12 d-flex justify-content-between align-items-center p-0">
          <h3 className="fw-bold">Products</h3>
          <Button variant="primary" onClick={handleCreateForm}>
            Add Product
          </Button>
        </div>

        <div className="col border rounded shadow p-4">
          <div className="row">
            <div className="col-12 mb-3 p-0 d-flex justify-content-center">
              <input
                type="text"
                placeholder="Search by name or category..."
                className="form-control w-25"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
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
                      {formatName(product.name)}{" "}
                      {product.featured && <span title="Featured">⭐</span>}
                    </h5>
                    <p className="text-muted small mb-2">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <div className="mb-2">
                        <strong>Price:</strong> U$S{" "}
                        {Number(product.price).toLocaleString("de-DE")} <br />
                        <strong>Stock:</strong> {product.stock}
                        <br />
                        <strong>Category:</strong>{" "}
                        {product.category?.name || "Uncategorized"}
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleEditForm(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted mb-4">
                The product you’re looking for doesn’t exist or may be
                unavailable
              </p>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {`${selectedProduct.id ? "Edit" : "Add New"} `} Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProduct
            initialValues={selectedProduct}
            onCancel={handleModalClose}
            onSubmit={
              selectedProduct.id ? handleUpdateProduct : handleCreateProduct
            }
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductsPage;
