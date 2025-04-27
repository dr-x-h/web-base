import {createBrowserRouter, RouteObject} from "react-router-dom";
import Home from "@/pages/home";
import About from "@/pages/about";
import Login from "@/pages/login";
import Error from "@/pages/404";
import HeaderBar from "@/layout";

export type CustomRoute = RouteObject & {
    meta?: any
    children?: CustomRoute[]
}

const route: CustomRoute[] = [
    {path: '/', element: <HeaderBar/>, children: [
        {index: true, path: '/', meta: {name: '首页',}, element: <Home/>},
        {path: '/about', meta: {name: '关于',}, element: <About/>},
    ]},
    {path: '/login', element: <Login/>}, {path: '*', element: <Error/>},
]

export const router = createBrowserRouter(route)
