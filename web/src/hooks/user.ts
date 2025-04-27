import {useRequest} from "ahooks";
import request from "@/utils/request.ts";

export const useLogout = () => {
    return useRequest(async () => {
        return await request.post("/v1/logout")
    }, {manual: true,})
}
