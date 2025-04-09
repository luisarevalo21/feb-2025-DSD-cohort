import api from "./index";

export async function fetchApartmentInformation() {
  try {
    const result = await api.get("/api/apartment");
    return result.data;
  } catch (err) {
    return err;
  }
}

export async function fetchApartmentDetailsById(id) {
  try {
    const result = await api.get(`/api/apartment/${id}`);
    return result;
  } catch (err) {
    return err;
  }
}

export async function updateApartmentDetails(id, updatedData) {
  try {
    const result = await api.put(`/api/apartment/${id}`, updatedData);
    return result.data;
  } catch (err) {
    return err;
  }
}
