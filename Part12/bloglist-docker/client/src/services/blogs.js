import axios from "../util/apiClient";
const url = `/blogs`;

let token = null;

export const setToken = (newToken) => {
  token = newToken === null ? null : `bearer ${newToken}`;
};

export const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(url, newObject, config);
  return response.data;
};

export const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${url}/${newObject.id}`, newObject, config);
  return response.data;
};

export const comment = async (id, comment) => {
  const response = await axios.post(`${url}/${id}/comments`, { comment });

  return response.data;
};

export const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${url}/${id}`, config);
  return response.data;
};
