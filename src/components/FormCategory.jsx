import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { formatName } from "../utils/formatName";
import { useState } from "react";

export default function FormCategory({ initialValues, onSubmit, onCancel }) {
  const isEditing = initialValues.id;

  const { register, setValue, handleSubmit, watch } = useForm({
    defaultValues: initialValues,
  });

  const nameValue = watch("name", initialValues?.name || "");

  const handleNameChange = (e) => {
    const lower = e.target.value.toLowerCase();
    setValue("name", lower, { shouldValidate: true });
  };

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
        <Form.Control
          value={formatName(nameValue)}
          onChange={handleNameChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Alias</Form.Label>
        <Form.Control {...register("alias", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          {...register("description", { required: true })}
        />
      </Form.Group>

      {nameValue !== "uncategorized" && (
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
      )}

      <div className="text-end">
        <Button variant="outline-secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button className="btn-mycolor" type="submit">
          {isEditing ? "Save Changes" : "Add Category"}
        </Button>
      </div>
    </Form>
  );
}
