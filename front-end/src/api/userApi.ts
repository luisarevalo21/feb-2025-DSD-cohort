import api from "./index";

export async function deleteAdmin(id) {
  try {
    if (!id) {
      throw new Error("User not found. Please try again");
    }
    const response = await api.delete(`/users/${id}`);
    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }
    return response.data;
  } catch (err) {
    return new Error(err);
  }
}
