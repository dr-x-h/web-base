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
        const menu = []
        const index = routes.find(item => item?.meta?.header)
        menu.push({key: index?.path, label: index?.children?.find((item: CustomRoute) => item.index)?.meta?.name})
        const pages = index?.children
            ?.filter((item: CustomRoute) => !item?.meta?.hidden && !item?.index)
            .map(item => {
                return {key: (index?.path || "/") + item.path, label: item?.meta?.name}
            }) as any[]
        menu.push(...pages)
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
