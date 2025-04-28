import React, {useEffect} from "react";
import "./index.scss"
import {Button, Descriptions, DescriptionsProps, message, Table, TableProps} from "antd";
import {useGetUser, useGetUsers} from "@/pages/home/hooks.ts";
import {useLogout} from "@/hooks/user.ts";
import {useNavigate} from "react-router-dom";

interface UserType {
    id: string;
    username: string;
    password: string;
    last_login?: string;
    role: string;
}

const Home: React.FC = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const requestContext = [messageApi, navigate]

    const {run: getUser, loading: getUserLoading, data: user} = useGetUser()
    const {run: getUsers, loading: getUsersLoading, data: users} = useGetUsers()
    const {runAsync: logout, loading: logoutLoading} = useLogout()

    useEffect(() => {
        getUser(requestContext)
        getUsers(requestContext)
    }, [])

    const handleGetUserClick = () => {
        getUser(requestContext)
    }

    const handleGetUsersClick = () => {
        getUsers(requestContext)
    }

    const handleLogoutClick = async () => {
        await logout(requestContext)
        messageApi.success("已退出登录")
        setTimeout(() => navigate("/login"), 1000)
    }

    const items: DescriptionsProps["items"] = [{
        key: "id", label: "ID", children: user?.id
    }, {
        key: "username", label: "用户名", children: user?.username
    }, {
        key: "password", label: "密码", children: user?.password
    }, {
        key: "last_login", label: "最后登录", children: user?.last_login
    }, {
        key: "role", label: "权限", children: user?.role
    },]

    const columns: TableProps<UserType>["columns"] = [{
        title: "ID", dataIndex: "id", key: "id",
    }, {
        title: "用户名", dataIndex: "username", key: "username",
    }, {
        title: "密码", dataIndex: "password", key: "password",
    }, {
        title: "最后登录时间", dataIndex: "last_login", key: "last_login",
    }, {
        title: "权限组", dataIndex: "role", key: "role",
    },];

    return (<div className={"home-body"}>
        {contextHolder}
        <div className={"button-col"}>
            <Button loading={getUserLoading} onClick={handleGetUserClick}>点击获取当前用户</Button>
            <Button loading={getUsersLoading} onClick={handleGetUsersClick}>点击获取用户列表</Button>
            <Button loading={logoutLoading} onClick={handleLogoutClick}>退出登录</Button>
        </div>
        {user && (<Descriptions bordered title={"用户详情"} items={items}/>)}
        {users && (<Table<UserType> columns={columns} dataSource={users}/>)}
    </div>)
}

export default Home
