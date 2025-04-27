import axios from "axios"

const request = axios.create({
    baseURL: "/api",//
    timeout: 5000,//
    withCredentials: true,//
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
})

request.interceptors.request.use(//
    config => {
        return config
    },//
    error => {
        return Promise.reject(error)
    },//
)

const code: { [key: string]: (msg: string) => void } = {
    "5000": (msg: string) => {
        console.log("response 5000", msg)
    },
}

request.interceptors.response.use(//
    response => {
        console.log("response is", response)
        const {data} = response
        if (data?.code === "2000") {
            return data?.data
        }
        code[data?.code]?.(data?.message)
        return Promise.reject(data)
    },//
    error => {
        console.log("error is", error)
        return Promise.reject(error)
    },//
)

export default request
