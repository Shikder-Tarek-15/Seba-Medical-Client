import { getAuth, updateProfile } from "firebase/auth";
import {  useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const Register = () => {
    const axiosPublic = useAxiosPublic()
  const [show, setShow] = useState(false);
  // Navigate
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser ,updateUserProfile, user} = useAuth();
  console.log("I am", createUser);
  const [error, setError] = useState("");

  const handleRegister = (data) => {
    const { name, photo, email, password } = data;
    console.log(email, password);

    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 character");
      return;
    }
    if (!/.*[a-z].*/.test(password)) {
      setError("Password must have an lowercase");
      return;
    }
    if (!/.*[A-Z].*/.test(password)) {
      setError("Password must have an Uppercase");
      return;
    }



        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email 
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    // TODO: add reset after impliment tanstack
                                    // reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate(location?.state ? location.state : "/");
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })
    
  };

  if(user){
    navigate('/')
  }
  return (
    <div className="flex justify-center items-center  h-screen">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-md shadow-blue-600">
        <h1 className="text-2xl font-bold text-center">Register Now</h1>
        <form
          noValidate=""
          action=""
          className="space-y-6"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.name && <p className="text-red-600">Name is required.</p>}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-600">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              {...register("photo", { required: true })}
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.photo && <p className="text-red-600">Photo is required.</p>}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.email && <p className="text-red-600">Email is required.</p>}
          </div>
          <div className="space-y-1 text-sm relative">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password
            </label>
            <input
              type={show? 'text' : "password"}
              name="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {error && <span className="text-red-600 text-sm">{error}</span>}
            {errors.password && (
              <p className="text-red-600">Password is required.</p>
            )}
            <span
              onClick={() => setShow(!show)}
              className="absolute right-2 top-8 text-xl hover:cursor-pointer"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
            <div className="flex justify-end text-xs dark:text-gray-600"></div>
          </div>
          <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 bg-orange-500">
            Register
          </button>
        </form>

        <p className="text-xs text-center sm:px-6 dark:text-gray-600">
          Already have an account?
          <Link className="link-primary" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
