import { getUserInitials } from "../utils/getUserInitials";
import { stringToColor } from "../utils/stringToColor";

export default function Avatar({ user }) {
  return (
    <div
      className="avatar-circle me-3"
      style={{
        backgroundColor: user?.email ? stringToColor(user.email) : undefined,
      }}
    >
      {getUserInitials(user)}
    </div>
  );
}
