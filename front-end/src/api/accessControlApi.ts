import api from "./index";

export async function fetchAccessControlInformation() {
  try {
    const result = await api.get("/api/access-control");
    return result.data;
  } catch (err) {
    return err;
  }
}

export async function generateAccessControlTempCode(id) {
    try {
      const result = await api.put(`/api/access-control/${id}`);
      return result.data;
    } catch (err) {
      return err;
    }
  }

export async function deleteAccessControlTempCode(id) {
    try {
        const result = await api.delete(`/api/access-control/${id}`)
    } catch (err) {
        return err;
      }
}