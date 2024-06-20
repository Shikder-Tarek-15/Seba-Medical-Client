import { FaBook, FaHome, FaList, FaSearch } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { MdAnalytics, MdAppRegistration, MdOutlinePayment } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiAddBoxFill } from "react-icons/ri";
import { useState } from 'react';
import useAdmin from '../../Hooks/useAdmin';
import { TiThMenu } from "react-icons/ti";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Mobile menu button */}
            <div className="lg:hidden p-4 bg-orange-300">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white flex items-center gap-2"
                >
                  <TiThMenu />  {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                </button>
            </div>

            {/* Dashboard sidebar */}
            <div className={`w-full lg:w-64 bg-orange-400 lg:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
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
                                    Add a Camp
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageCamps">
                                    <FaList />
                                    Manage Camps
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageRegisterCamps">
                                    <FaBook />
                                    Manage Register Camps
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/analytics">
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
                    {/* Shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/available-camps">
                            <FaSearch />
                            Available Camps
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
