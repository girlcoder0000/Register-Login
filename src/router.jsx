import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/identity-layout";
import Login, { loginAction } from "./features/identity/components/login";
import Register, { registerAction } from "./features/identity/components/register";
import HomeLayout from "./layouts/home-layout";

const router = createBrowserRouter([
    {   path:"/",
        element: <HomeLayout/>,
        

    },
{
    element: <IdentityLayout/>,
    children:[
        {
            path: 'login',
            element:<Login/>,
            action: loginAction,
            errorElement: <Login/>
        },
        {
            path: 'register',
            element: <Register/>,
            action: registerAction,
            errorElement: <Register/>
        }
    ]
}
])
export default router