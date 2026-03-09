import type { UpdateProfileParams } from "../types/schemas";

export const API_URL = import.meta.env.VITE_API_URL;

export async function getProfile() {
  let token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  let response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  let data = await response.json();
  return data;
}

export async function updateProfile(params: UpdateProfileParams) {
  let token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  let response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(params.userData),
  });

  let data = await response.json();
  return data;
}

export async function deleteProfile() {
  let token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  let id = await getProfile().then((profile) => profile.id);

  let response = await fetch(`${API_URL}/profile`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ id: id }),
  });

  return response.ok;
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getAuthHeaders() {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
