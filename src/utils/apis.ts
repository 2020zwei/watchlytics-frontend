import { RequestTypes } from "@/types";
import baseInstance from "./axios";
import axios from "axios";

export const sendRequest = async ({ url, payload, method = "GET", headers = {} }: RequestTypes) => {
  try {
    let res;

    const isFormData = payload instanceof FormData;
    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    const config = {
      headers,
      timeout: 5000,
    };

    switch (method) {
      case "POST":
        res = await baseInstance.post(url, payload, config);
        break;
      case "PUT":
        res = await baseInstance.put(url, payload, config);
        break;
      case "PATCH":
        res = await baseInstance.patch(url, payload, config);
        break;
      case "DELETE":
        res = await baseInstance.delete(url, { ...config, data: payload });
        break;
      case "GET":
      default:
        res = await baseInstance.get(url, { ...config, params: payload });
        break;
    }

    return res;

  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.code === 'ECONNABORTED') {
        console.error("❌ Request timed out");
        return { error: "Request timed out", code: "TIMEOUT" };
      }

      return {
        error: err.message,
        code: err.code || "UNKNOWN_AXIOS_ERROR"
      };
    }
    return { error: "Unexpected error", details: err };
  }
};
