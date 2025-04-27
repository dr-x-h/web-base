import {useRequest} from "ahooks";
import {request, setRequestValue} from "@/utils/request.ts";

export const useGetUser = () => {
    return useRequest(async ([message, navigate]) => {
        setRequestValue(message, navigate)
        return await request.get("/v1/user") as any
    }, {manual: true,})
}


export const useGetUsers = () => {
    return useRequest(async ([messageApi, navigate]) => {
        setRequestValue(messageApi, navigate)
        return await request.get("/v1/users") as any
    }, {manual: true,})
}
