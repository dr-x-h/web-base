import {useRequest} from "ahooks";
import request from "@/utils/request.ts";

export const useGetUser = () => {
    return useRequest(async () => {
        return await request.get("/v1/user") as any
    })
}


export const useGetUsers = () => {
    return useRequest(async () => {
        return await request.get("/v1/users") as any
    })
}
