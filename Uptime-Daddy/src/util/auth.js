const AUTH_TOKEN_KEY = "authToken";

function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function hasAuthToken() {
  return Boolean(getAuthToken());
}

function parseJwtPayload(token) {
  if (!token) return null;

  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;

    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const decoded = atob(padded);

    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function getAuthPayload() {
  return parseJwtPayload(getAuthToken());
}

function getAuthHeaders() {
  const token = getAuthToken();
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

export { AUTH_TOKEN_KEY, getAuthToken, hasAuthToken, getAuthPayload, parseJwtPayload, getAuthHeaders };