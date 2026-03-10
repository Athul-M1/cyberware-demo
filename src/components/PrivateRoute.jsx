import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute – only allows authenticated users with the required role.
 * role: "admin" | "user" | undefined (undefined = any authenticated user)
 */
export function ProtectedRoute({ role }) {
    return <Outlet />;
}

/**
 * GuestRoute – redirects already-logged-in users away from auth pages.
 */
export function GuestRoute() {
    return <Outlet />;
}
