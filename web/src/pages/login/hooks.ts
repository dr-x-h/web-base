import {useRequest} from "ahooks";
import {request, setRequestValue} from "@/utils/request.ts";

export const useLogin = () => {
    return useRequest(async (param, [message, navigate]) => {
        setRequestValue(message, navigate)
        return await request.post("/v1/login", param)
    }, {manual: true,})
}
