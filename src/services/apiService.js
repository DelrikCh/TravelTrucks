import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchCampers = () => {
  return apiClient.get(`/campers`);
};

export const fetchCamper = (id) => {
    return apiClient.get(`/campers/${id}`);
}
