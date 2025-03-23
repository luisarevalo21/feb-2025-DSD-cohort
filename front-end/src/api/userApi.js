import api from "./index";

export async function fetchCurrentUser() {
    try {
        const response = await api.get("/users/me");
        return response.data.user
    } catch (err) {
        return err;
    }
}
