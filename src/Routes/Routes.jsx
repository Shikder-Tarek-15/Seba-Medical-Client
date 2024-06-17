import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Root/Root";
import Register from "../Authentication/Register";
import Login from "../Authentication/Login";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import CampDetails from "../Pages/AvailableCamps/CampDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Shared/Profile/Profile";
import AddCamp from "../Pages/Dashboard/AddCamp";
import ManageCamp from "../Pages/Dashboard/ManageCamp";
import Analytics from "../Pages/Dashboard/UserDashboard/Analytics";

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
        },
        {
          path: "/available-camps",
          element: <AvailableCamps/>,
        },
        {
          path: "/camp-details/:campId",
          element: <PrivateRoute><CampDetails/></PrivateRoute>,
          loader: ({params})=> fetch(`http://localhost:5000/camp-details/${params.campId}`)
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard/>,
      children: [
        {
          path: 'profile',
          element: <Profile/>
        },
        // admin route
        {
          path: "addCamp",
          element: <AddCamp/>
        },
        {
          path: 'manageCamps',
          element: <ManageCamp/>
        },
        // Participant Route
        {
          path: 'analytics',
          element: <Analytics/>
        }
      ]
    }
  ]);




  export default router;