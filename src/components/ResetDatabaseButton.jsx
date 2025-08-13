import { toast } from "react-toastify";
import { useApi } from "../hooks/useApi";
import { Button } from "react-bootstrap";
import { resetProductsLastFetched } from "../redux/productSlice";
import { resetCategoriesLastFetched } from "../redux/categorySlice";
import { useDispatch } from "react-redux";

export default function ResetDatabaseButton({ className, children }) {
  const { resetDatabase } = useApi();
  const dispatch = useDispatch();

  const resetDB = async () => {
    const response = await toast.promise(
      resetDatabase(),
      {
        pending: "Resetting database...",
        success: "Database reset successfully!",
        error: "Error resetting the database",
      },
      {
        closeOnClick: false,
      }
    );

    if (response.status === 200) {
      toast.info("Refreshing page...", {
        autoClose: 2000,
      });
      setTimeout(() => {
        dispatch(resetProductsLastFetched());
        dispatch(resetCategoriesLastFetched());
      }, 2000);
    }
  };

  const handleResetDatabase = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>
            ⚠ This will delete all tables and restore demo data. Are you sure?
          </p>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                closeToast();
                resetDB();
              }}
            >
              Confirm
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
      }
    );
  };
  return (
    <Button onClick={handleResetDatabase} className={className}>
      {children}
    </Button>
  );
}
