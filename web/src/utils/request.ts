import axios from "axios"

let navigate: any = undefined

let message: any = undefined

const setRequestValue = (messageValue: any, navigateValue: any) => {
    navigate = navigateValue
    message = messageValue
}

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

const code: { [key: number]: (msg: string) => void } = {
    5000: (msg: string) => {
        message.error(msg)
    },
}

const httpCode: { [key: number]: (msg: string) => void } = {
    401: (msg) => {
        if (msg) {
            message.warning(msg)
        }
        navigate("/login")
    },//
    403: (msg) => {
        message.warning(msg)
    },//
}

request.interceptors.response.use(//
    response => {
        const {data} = response
        if (data?.code === 2000) {
            return data?.data
        }
        code[data?.code]?.(data?.message)
        return Promise.reject(data)
    },//
    error => {
        httpCode[error?.status]?.(error?.response?.data?.message)
        return Promise.reject(error)
    },//
)

export {request, setRequestValue}
