import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Root/Root";
import Register from "../Authentication/Register";
import Login from "../Authentication/Login";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },{
          path: "/register",
          element: <Register/>
        },
        {
          path: "/login",
          element: <Login/>
        }
      ]
    },
  ]);




  export default router;