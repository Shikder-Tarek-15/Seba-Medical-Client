import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const Root = () => {
    return (
        <>
        <div className="container mx-auto">
            <Navbar/>
            <Outlet/>
        </div>
            <Footer/>
        
        </>
    );
};

export default Root;