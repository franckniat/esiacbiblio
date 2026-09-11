/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged users to the dashboard.
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];

/**
 * The prefix of API auth routes.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default login redirect path.
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";