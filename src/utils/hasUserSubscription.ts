import { sendRequest } from "./apis"
import { METHODS, URLS } from "./constants"

export const getProfileInfo = async () => {
    // @ts-ignore
    const PAYLOAD: RequestTypes = {
        url: URLS.ME,
        method: METHODS.GET,
    }
    sendRequest(PAYLOAD).then((res) => {
        if (res?.data) {
            console.log(res, 'middleware')
        }
    })
}