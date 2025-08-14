export function getUserInitials(user) {
  if (!user) return "U";
  const first = user.firstname?.[0] || "";
  const last = user.lastname?.[0] || "";
  return (first + last).toUpperCase();
}
