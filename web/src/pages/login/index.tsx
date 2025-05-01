import React, {useEffect, useState} from "react";
import {useLogin, useRegister} from "@/pages/login/hooks.ts";
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {Button, Form, Input, message} from "antd";
import "./index.scss"
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const requestValue = [messageApi, navigate]
    const {runAsync: login, loading: awaitLogin} = useLogin()
    const {runAsync: register, loading: awaitRegister} = useRegister()

    const [form] = Form.useForm<{ username: string; password: string }>()
    const formValue = Form.useWatch([], form)

    const [sendVisible, setSendVisible] = useState(true)
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        if (formValue?.username && formValue?.password) {
            setSendVisible(false)
        } else {
            setSendVisible(true)
        }
    }, [formValue?.username, formValue?.password])

    const handleClick = async () => {
        if (isLogin) {
            const data = await login(formValue, requestValue)
            messageApi.success("登录成功")
            localStorage.user = JSON.stringify(data)
            setTimeout(() => navigate("/"), 1000)
        } else {
            await register(formValue, requestValue)
            messageApi.success("注册成功")
            onRegisterOrLogin()
        }
    }

    const onRegisterOrLogin = () => {
        form.resetFields()
        setIsLogin(i => !i)
    }

    const formFinish = async (data: any) => {
        if (data?.keyCode === 13 && !sendVisible) {
            await handleClick()
        }
    }

    return (<div className={"login_box"}>
        {contextHolder}
        <span className={"title"}>{isLogin ? "Login" : "Register"}</span>
        <Form form={form} layout={"inline"} disabled={awaitLogin || awaitRegister} onKeyDown={formFinish}>
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
        <Button type={"link"} onClick={onRegisterOrLogin}>{isLogin ? "register" : "login"}</Button>
        <Button disabled={sendVisible} style={{width: 75}} onClick={handleClick} type={"primary"}
                loading={awaitLogin || awaitRegister}>点击</Button>
    </div>)
}

export default Login
