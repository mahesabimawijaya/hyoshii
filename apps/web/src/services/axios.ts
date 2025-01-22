import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPicReport = async () => {
  try {
    const { data } = await api.get("/packs/pic-reports");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getQtyReport = async () => {
  try {
    const { data } = await api.get("/packs/qty-reports");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductivityReport = async (type: string) => {
  try {
    const { data } = await api.get("/packs/productivity-reports", { params: { type } });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getRejectRatioReport = async (type: string) => {
  try {
    const { data } = await api.get("/packs/gross-ratio-reports", { params: { type } });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getQtyRatioReport = async (type: string) => {
  try {
    const { data } = await api.get("/packs/qty-ratio-reports", { params: { type } });
    return data;
  } catch (error) {
    console.error(error);
  }
};
