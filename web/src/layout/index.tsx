import React, {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import "./index.scss"
import {Menu} from "antd";
import {CustomRoute, router} from "@/create_router.tsx";

const HeaderBar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const routes = router.routes as CustomRoute[]

    const [menuItem, setMenuItem] = useState<any[]>([])

    useEffect(() => {
        const menu = routes.find(item => item?.meta?.header)?.children
            ?.filter((item: CustomRoute) => !item?.meta?.hidden)
            .map(item => {
                return {key: item.path, label: item?.meta?.name}
            }) as any[]
        setMenuItem(menu)
    }, [routes])

    const onClick = ({key}: { key: string }) => {
        navigate(key)
    };

    return (<div>
        <Menu className={"menu-header"} onClick={onClick} selectedKeys={[location.pathname]} mode={"horizontal"}
              items={menuItem}/>
        <Outlet/>
    </div>)
}

export default HeaderBar
