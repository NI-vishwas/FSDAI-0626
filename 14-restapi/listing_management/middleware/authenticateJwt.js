const jwt = require("jsonwebtoken");
const { createErrorResponse } = require("../dtos/apiResponseDto");

const toMultilinePem = (value) => (value ? value.replace(/\\n/g, "\n") : value);

const parseAlgorithms = (value) => {
  if (!value) {
    return null;
  }

  return value
    .split(",")
    .map((algo) => algo.trim())
    .filter(Boolean);
};

const getVerificationKey = () => {
  const publicKey = toMultilinePem(process.env.JWT_PUBLIC_KEY);

  if (publicKey) {
    return publicKey;
  }

  // Supports both this service and common Flask naming (flask-jwt-extended)
  return process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
};

const getVerifyOptions = () => {
  const defaultAlgorithms = process.env.JWT_PUBLIC_KEY ? ["RS256"] : ["HS256"];
  const algorithms =
    parseAlgorithms(process.env.JWT_ALGORITHMS) ||
    parseAlgorithms(process.env.JWT_ALGORITHM) ||
    defaultAlgorithms;

  return {
    algorithms,
    issuer:
      process.env.JWT_ISSUER ||
      process.env.JWT_DECODE_ISSUER ||
      process.env.JWT_ENCODE_ISSUER ||
      undefined,
    audience: process.env.JWT_AUDIENCE || process.env.JWT_DECODE_AUDIENCE || undefined
  };
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json(createErrorResponse({
      message: "Unauthorized",
      errors: "Missing or invalid Authorization header"
    }));
  }

  const token = authHeader.slice(7);
  const key = getVerificationKey();

  if (!key) {
    return res.status(500).json(createErrorResponse({
      message: "Authentication configuration error",
      errors: "JWT verification key is not configured"
    }));
  }

  return jwt.verify(token, key, getVerifyOptions(), (err, decoded) => {
    if (err) {
      return res.status(401).json(createErrorResponse({
        message: "Unauthorized",
        errors: err.message
      }));
    }

    req.user = decoded;
    return next();
  });
};

module.exports = authenticateJwt;
