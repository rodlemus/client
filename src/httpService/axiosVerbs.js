import axiosClient from "./httpService";

export async function getRequest(URL) {
  const response = await axiosClient.get(`/${URL}`);
  return response;
}

export async function postRequest(URL, payload) {
  const response = await axiosClient.post(`/${URL}`, payload);
  return response;
}

export async function patchRequest(URL, payload) {
  const response = await axiosClient.patch(`/${URL}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
}
export async function patchJsonRequest(URL, payload) {
  const response = await axiosClient.patch(`/${URL}`, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
}

export async function deleteRequest(URL) {
  const response = await axiosClient.delete(`/${URL}`);
  return response;
}
