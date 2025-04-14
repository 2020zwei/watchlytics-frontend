import axios from "axios";

const BASE_URL = "https://api-dev.watchlytics.io/";

// Create an axios instance
const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

baseInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const getApiWithoutAuth = async (url) => {
  try {
    const res = await baseInstance.get(url);
    return {
      data: res.data.data,
      success: true,
    };
  } catch (err) {
    return {
      data: err.response.data,
      success: false,
    };
  }
};

export const postApiWithoutAuth = async (url, body = {}) => {
  try {
    const res = await baseInstance.post(url, body);
    return {
      data: res.data,
      success: res.data.success,
    };
  } catch (err) {
    return err?.response?.data;
  }
};
export const postAuth = async (url, body = {}, headers = {}) => {
  try {
    const res = await baseInstance.post(url, body, { headers });
    return {
      data: res.data, // Return the actual data from the response
      success: res.data.success,
    };
  } catch (err) {
    return err?.response; // Return the error response if an error occurs
  }
};
export const patchApi = async (url, body, { headers }) => {
  try {
    const res = await baseInstance.patch(url, body, { headers });
    return {
      data: res.data.data,
      success: res.data.success,
    };
  } catch (err) {
    return err.response.data;
  }
};
// export const getApi = async (url, { headers = {} }) => {
//   if (url !== "") {
//     try {
//       const res = await baseInstance.get(url, { headers });
//       return {
//         data: res.data,
//         success: res.data.success,
//         status: res.status,
//       };
//     } catch (error) {
//       return error.response;
//     }
//   }
// };
export const getApi = async (url, headers = {}) => {
  if (url !== "") {
    try {
      const res = await baseInstance.get(url, { headers });
      return {
        data: res.data,
        success: res.data.success,
        status: res.status,
      };
    } catch (error) {
      // Throwing the error with a message that will be handled in the thunk
      throw error;
    }
  }
};
export const getSubs = async (url, { headers = {} }) => {
  if (url !== "") {
    try {
      const res = await baseInstance.get(url, { headers });
      return {
        data: res.data,
        success: res.data.success,
        status: res.status,
      };
    } catch (error) {
      // Throwing the error with a message that will be handled in the thunk
      throw error;
    }
  }
};

export const postApiWithAuth = async (url, body) => {
  try {
    const res = await baseInstance.post(url, body);
    return {
      data: res.data.data,
      success: res.data.success,
    };
  } catch (err) {
    return err.response;
  }
};

export const patchApiWithAuth = async (url, body) => {
  try {
    const res = await baseInstance.patch(url, body);
    return {
      data: res.data.data,
      success: res.data.success,
    };
  } catch (err) {
    return err.response.data;
  }
};

export const patchApiWithoutAuth = async (url, body) => {
  try {
    const res = await baseInstance.patch(url, body);
    return {
      data: res.data.data,
      success: res.data.success,
    };
  } catch (err) {
    return err.response.data;
  }
};

export const deleteApiWithAuth = async (url) => {
  try {
    const res = await baseInstance.delete(url);
    return {
      data: res.data.data,
      success: res.data.success,
    };
  } catch (err) {
    return err.response.data;
  }
};
