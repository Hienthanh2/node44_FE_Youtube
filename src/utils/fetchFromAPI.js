import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    token: localStorage.getItem("access_token"),
  },
};

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add interceptor to add access token to headers before sending requests
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.requiredAuth) {
      // get access token from local storage
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        config.headers.token = accessToken;
      }
    }

    return config;
  },
  (error) => {}
);

// config interceptor cho response mỗi khi response API nào đó trả về 401
axiosInstance.interceptors.response.use(
  (response) => {
    // param function khi response API tra ve 2xx

    return response;
  },
  async (error) => {
    // param function khi response API tra ve khac 2xx
    const originalRequest = error.config;
    console.log("originalRequest", originalRequest);
    if (error.response.status === 401) {
      console.log("error.response.status: ", error.response.status);

      try {
        const { data } = await extendToken(); // get new access token
        console.log("data extend: ", data);
        originalRequest.headers.token = data;

        // re-call API
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("extend token failed", error);
      }
    }

    return Promise.reject(error);
  }
);

export const fetchFromAPI = async (url) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const getListVideos = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/videos/get-videos`);

  return data;
};

export const getListVideoTypes = async () => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/videos/get-video-types`,
    {
      requiredAuth: true,
    },
    options
  );

  return data;
};

export const getListVideoByTypeId = async (typeId) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/videos/get-video-by-type-id/${typeId}`
  );

  return data;
};

export const registerAccount = async (payload) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/register`,
    payload
  );

  return data;
};

export const loginAPI = async (payload) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/auth/login`, payload, {
    withCredentials: true, // cho phép gửi và nhận cookie từ server (BE)
  });

  return data;
};

export const loginAPIAsyncKey = async (payload) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/login-async-key`,
    payload,
    {
      withCredentials: true, // cho phép gửi và nhận cookie từ server (BE)
    }
  );

  return data;
};

export const loginFacebookAPI = async (newUser) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/login-face`,
    newUser
  );

  return data;
};

export const extendToken = async () => {
  const { data } = await axiosInstance.post(
    `/auth/extend-token`,
    {},
    {
      withCredentials: true, // cho phép gửi và nhận cookie từ server
    }
  );

  // lưu access token mới vào local storage
  localStorage.setItem("access_token", data.data);

  return data;
};

export const extendTokenAsyncKey = async () => {
  const { data } = await axiosInstance.post(
    `/auth/extend-token-async-key`,
    {},
    {
      withCredentials: true, // cho phép gửi và nhận cookie từ server
    }
  );

  // lưu access token mới vào local storage
  localStorage.setItem("access_token", data.data);

  return data;
};

export const forgotPasswordAPI = async (email) => {
  const { data } = await axiosInstance.post(`/auth/forgot-password`, { email });

  return data;
};

export const changePasswordAPI = async ({ email, newPassword, code }) => {
  const { data } = await axiosInstance.post(`/auth/change-password`, {
    email,
    newPassword,
    code,
  });

  return data;
};
