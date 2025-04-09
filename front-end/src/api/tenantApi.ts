import api from "./index";

export async function fetchTenantInformation(tenantId) {
  try {
    const result = await api.get(`/api/tenant/${tenantId}`);
    return result.data;
  } catch (err) {
    return err;
  }
}
