import { RequestTypes } from "@/types";
import baseInstance from "./axios";

export const sendRequest = async ({ url, payload, method = "GET", headers = {} }: RequestTypes) => {
  try {
    let res;

    // Check if payload is FormData
    const isFormData = payload instanceof FormData;

    // Adjust headers if it's FormData
    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    switch (method) {
      case "POST":
        res = await baseInstance.post(url, payload, { headers });
        break;
      case "PUT":
        res = await baseInstance.put(url, payload, { headers });
        break;
      case "PATCH":
        res = await baseInstance.patch(url, payload, { headers });
        break;
      case "DELETE":
        res = await baseInstance.delete(url, { data: payload, headers });
        break;
      case "GET":
      default:
        res = await baseInstance.get(url, { params: payload, headers });
        break;
    }

    return res?.data

  } catch (err: any) {
    return err
  }
};
