const getStatusStyle = (status) => {
  const base = "badge rounded-pill text-sm font-medium bg-opacity-25";
  switch (status) {
    case "completed":
      return `${base} bg-success text-success`;
    case "pending":
      return `${base} bg-warning text-warning`;
    case "cancelled":
      return `${base} bg-danger text-danger`;
    default:
      return `${base} bg-secondary text-secondary`;
  }
};

export default function OrderStatus({ status }) {
  return (
    <span className={getStatusStyle(status)} style={{ minWidth: "80px" }}>
      {status}
    </span>
  );
}
