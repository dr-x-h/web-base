import React, {useEffect, useState} from "react";
import {useLogin} from "@/pages/login/hooks.ts";
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {Button, Form, Input, message} from "antd";
import "./index.scss"
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const requestValue = [messageApi, navigate]
    const {runAsync, loading} = useLogin()

    const [form] = Form.useForm<{ username: string; password: string }>()
    const formValue = Form.useWatch([], form)

    const [sendVisible, setSendVisible] = useState(true)

    useEffect(() => {
        if (formValue?.username && formValue?.password) {
            setSendVisible(false)
        } else {
            setSendVisible(true)
        }
    }, [formValue?.username, formValue?.password])

    const handleClick = async () => {
        const data = await runAsync(formValue, requestValue)
        messageApi.success("登录成功")
        localStorage.user = JSON.stringify(data)
        setTimeout(() => navigate("/"), 1000)
    }

    return (<div className={"login_box"}>
        {contextHolder}
        <span className={"title"}>Login</span>
        <div>
            <span>账号：{formValue?.username || "空"}</span>
            <span style={{marginLeft: 40}}>密码：{formValue?.password || "空"}</span>
        </div>
        <Form form={form} layout={"inline"} disabled={loading}>
            <Form.Item
                name={"username"}
            >
                <Input prefix={<UserOutlined/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name={"password"}
            >
                <Input prefix={<LockOutlined/>} type="password" placeholder="Password"/>
            </Form.Item>
        </Form>
        <Button disabled={sendVisible} style={{width: 75}} onClick={handleClick} type={"primary"}
                loading={loading}>点击</Button>
    </div>)
}

export default Login
