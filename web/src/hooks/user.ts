import {useRequest} from "ahooks";
import {request, setRequestValue} from "@/utils/request.ts";

export const useLogout = () => {
    return useRequest(async ([message, navigate]) => {
        localStorage.removeItem("user")
        setRequestValue(message, navigate)
        return await request.post("/v1/logout") as any
    }, {manual: true,})
}
