import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const {user,logOut} =useAuth()
  console.log(user);

  const handleLogout = () =>{
    logOut()
    .then(()=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout successfull",
        showConfirmButton: false,
        timer: 1500
      });
    })
  }


    const links = <>
    
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/available-camps">Available Camps</NavLink></li>

    </>
    return (
        <div className="navbar bg-green-200 z-50">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
        {links}
      </ul>
    </div>
    <Link className="btn btn-ghost text-xl font-bold">SEBA MEDICAL</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user ? <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ">
        
        <li className="ml-3">{user.displayName}</li>
        <li><Link to="dashboard">Dashboard</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </div> : <Link to="/login"><button className="btn btn-secondary">Join Now</button></Link>
    }
  </div>
</div>
    );
};

export default Navbar;