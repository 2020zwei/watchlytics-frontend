import baseInstance from "./axios"
import { METHODS, URLS } from "./constants"

export const getProfileInfo = async () => {
    // @ts-ignore
    const PAYLOAD: RequestTypes = {
        url: URLS.ME,
        method: METHODS.GET,
    }
    const res = await baseInstance.get(PAYLOAD)
    return res
}