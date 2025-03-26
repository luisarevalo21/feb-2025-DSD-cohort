import api from "./index";

export async function fetchAccessControlInformation() {
  try {
    const result = await api.get("/api/access-control");
    return result.data;
  } catch (err) {
    return err;
  }
}

export async function updateAccessControlDetails(id, updatedData) {
    try {
      const result = await api.put(`/api/access-control/${id}`, updatedData);
      return result.data;
    } catch (err) {
      return err;
    }
  }