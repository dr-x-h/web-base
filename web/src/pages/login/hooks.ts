import {useRequest} from "ahooks";
import request from "@/utils/request.ts";

export const useLogin = () => {
    return useRequest(async (param) => {
        return await request.post("/v1/login", param)
    }, {manual: true,})
}
