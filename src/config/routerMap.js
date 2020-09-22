import Loadable from "react-loadable";
import Loading  from "../components/Loading";


const Home = Loadable({loader: () => import("../pages/home"), loading: Loading});
const Category = Loadable({loader: () => import("../pages/category"), loading: Loading});
const Product = Loadable({loader: () => import("../pages/product"), loading: Loading});
// const Role = Loadable({loader: () => import("../pages/role"), loading: Loading});
const Error404 = Loadable({loader: () => import("../pages/error/404"), loading: Loading});

export default [
    {path: "/home", component: Home},
    {path: "/product", component: Product},
    {path: "/category", component: Category},
    // {path: "/role", component: Role},
    {path: "/error/404", component: Error404},
];
