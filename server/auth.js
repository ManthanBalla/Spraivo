// Authentication Middleware and Token Utility for LinguaPath (ES Module)
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "linguapath_secure_jwt_secret_2026";

/**
 * Generate a signed JWT
 * @param {object} payload - { user_id, email, name }
 * @param {boolean} rememberMe - true for 30 days, false for 1 day / session
 */
export function generateToken(payload, rememberMe = false) {
  const expiresIn = rememberMe ? "30d" : "1d";
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Express Middleware to require authentication
 * Reads token from httpOnly cookie 'lp_token' or Authorization Bearer header
 */
export function requireAuth(req, res, next) {
  let token = null;

  // 1. Check cookies (preferred for browser security)
  if (req.cookies && req.cookies.lp_token) {
    token = req.cookies.lp_token;
  }

  // 2. Fallback to Authorization: Bearer <token>
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Authentication required. Please sign in." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains { user_id, email, name }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Session expired or invalid. Please sign in again." });
  }
}

/**
 * Optional Authentication Middleware
 * Decodes user if token is present, but allows guest access if absent
 */
export function optionalAuth(req, res, next) {
  let token = null;

  if (req.cookies && req.cookies.lp_token) {
    token = req.cookies.lp_token;
  } else if (req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (e) {
      // Ignore token failure for optional auth
    }
  }
  next();
}

