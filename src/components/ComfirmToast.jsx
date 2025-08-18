import { toast } from "react-toastify";

export default function ConfirmToast({ message, onConfirm }) {
  return ({ closeToast }) => (
    <div>
      <p>{message}</p>
      <div className="d-flex justify-content-end gap-2 mt-2">
        <button
          className="btn btn-danger btn-sm"
          onClick={async () => {
            try {
              await onConfirm();
              closeToast();
            } catch (error) {
              closeToast();
              toast.error("Action failed");
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
  );
}
