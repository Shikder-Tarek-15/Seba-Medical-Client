import React from 'react';
import { FaBook, FaHome, FaList, FaSearch, FaUtensils } from 'react-icons/fa';
import { FaPersonRifle } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import { MdAnalytics, MdAppRegistration, MdOutlinePayment } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiAddBoxFill } from "react-icons/ri";


const Dashboard = () => {
    const isAdmin = true;
    return (
        <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400">
          <ul className="menu p-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/profile">
                  <ImProfile />
                    Organizer Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addCamp">
                  <RiAddBoxFill />
                    Add a camp
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageCamps">
                    <FaList></FaList>
                    Manage Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageRegisterCamps">
                    <FaBook></FaBook>
                    Manage Register Camps
                  </NavLink>
                </li>
                
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/analytics ">
                  <MdAnalytics />
                    Analytics
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">
                  <ImProfile />
                    Participant Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/registerCamps">
                  <MdAppRegistration />
                    Registered Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                  <MdOutlinePayment />
                    Payment History
                  </NavLink>
                </li>
                
              </>
            )}
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/available-camps">
                <FaSearch></FaSearch>
                Available Camps
              </NavLink>
            </li>
          
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;