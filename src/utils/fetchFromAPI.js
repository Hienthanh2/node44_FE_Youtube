import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const getListVideos = async () => {
  const { data } = await axios.get(`${BASE_URL}/videos/get-videos`);

  return data;
};

export const getListVideoTypes = async () => {
  const { data } = await axios.get(`${BASE_URL}/videos/get-video-types`);

  return data;
};

export const getListVideoByTypeId = async (typeId) => {
  const { data } = await axios.get(
    `${BASE_URL}/videos/get-video-by-type-id/${typeId}`
  );

  return data;
};

export const registerAccount = async (payload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, payload);

  return data;
};
