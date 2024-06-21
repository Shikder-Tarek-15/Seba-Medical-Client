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
import RegisteredCamps from "../Pages/Dashboard/UserDashboard/RegisteredCamps";
import ManageRegisterCamp from "../Pages/Dashboard/ManageRegisterCamp";
import PaymentHistory from "../Pages/Dashboard/UserDashboard/PaymentHistory";
import AdminRoute from "./AdminRoute";
import Error from "../Pages/Error/Error";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <Error/>,
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
      errorElement: <Error/>,
      children: [
        {
          path: 'profile',
          element: <PrivateRoute><Profile/></PrivateRoute>
        },
        // admin route
        {
          path: "addCamp",
          element: <AdminRoute><AddCamp/></AdminRoute>
          
        },
        {
          path: 'manageCamps',
          element: <AdminRoute><ManageCamp/></AdminRoute>
        },
        {
          path: 'manageRegisterCamps',
          element: <AdminRoute><ManageRegisterCamp/></AdminRoute>
        },
        // Participant Route
        {
          path: 'analytics',
          element: <PrivateRoute><Analytics/></PrivateRoute>
        },
        {
          path: 'registerCamps',
          element: <PrivateRoute><RegisteredCamps/></PrivateRoute>
        },
        {
          path: 'paymentHistory',
          element: <PrivateRoute><PaymentHistory/></PrivateRoute>
        }
      ]
    }
  ]);




  export default router;