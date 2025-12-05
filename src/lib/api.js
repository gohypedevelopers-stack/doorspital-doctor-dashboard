const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://doorspital-backend.onrender.com";

const createHeaders = (token, isForm = false) => {
  const headers = {};
  if (!isForm) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const parseResponse = async (response) => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
};

export async function apiRequest(path, { method = "GET", body, token, isForm } = {}) {
  const url = `${BASE_URL}${path}`;
  console.log(`API Request: ${method} ${url}`, body); // Log request details

  const response = await fetch(url, {
    method,
    headers: createHeaders(token, isForm),
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  const parsed = await parseResponse(response);
  console.log(`API Response (${response.status}):`, parsed); // Log response details

  if (!response.ok) {
    const message = parsed?.message ?? parsed?.error ?? response.statusText;
    console.error("API Error:", message); // Log API error
    throw new Error(typeof message === "string" ? message : "Something went wrong");
  }
  return parsed;
}
