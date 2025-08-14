import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { formatName } from "../utils/formatName";
import { useState } from "react";

export default function FormProducts({
  initialValues,
  onSubmit,
  onCancel,
  categories = [
    { id: "1", name: "sofas" },
    { id: "2", name: "tables" },
    { id: "3", name: "chair" },
  ],
}) {
  const isEditing = initialValues.id;

  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const [previewUrl, setPreviewUrl] = useState(
    typeof initialValues?.image === "string" ? initialValues.image : null
  );

  const handleImagePreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-2">
        <Form.Label>Name</Form.Label>
        <Form.Control {...register("name", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          {...register("description", { required: true })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          {...register("price", { required: true, valueAsNumber: true })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          {...register("stock", { required: true, valueAsNumber: true })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Category</Form.Label>
        <Form.Select {...register("categoryId", { required: true })}>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {formatName(category.name)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          {...register("image", { required: !isEditing })}
          onChange={(e) => {
            handleImagePreview(e);
          }}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: "100%", marginTop: "10px" }}
          />
        )}
      </Form.Group>

      <Form.Check
        type="checkbox"
        label="Featured"
        {...register("featured")}
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
}
