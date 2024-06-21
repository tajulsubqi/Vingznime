/**
 * An array of routes that are inaccessible to the public.
 * These routes require authentication
 * @type {string[]}
 */
export const privateRoutes = ["/users", "/users/comment", "/users/collection"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /users
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/users";
