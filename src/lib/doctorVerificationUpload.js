import { apiRequest } from "./api.js";

export async function uploadVerificationDocument({ token, fieldName, file }) {
  const formData = new FormData();
  formData.append("fieldName", fieldName);
  formData.append("file", file);

  const response = await apiRequest("/api/doctors/verification/upload-document", {
    method: "POST",
    token,
    body: formData,
    isForm: true,
  });

  return response?.data ?? null;
}
