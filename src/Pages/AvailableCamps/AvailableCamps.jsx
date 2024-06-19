
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {FaLocationPin, FaPeopleGroup } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import moment from "moment";
import { Helmet } from "react-helmet-async";


const AvailableCamps = () => {
    // const camps = useLoaderData() 

    
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [layout, setLayout] = useState(true)
    const [camps, setCamps] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        const queryParams = new URLSearchParams({ search, sort }).toString();
        axiosPublic.get(`/camps?${queryParams}`)
        .then(res=>{
            console.log(res.data);
            setCamps(res.data)
        })
    },[axiosPublic, search, sort])



    return (
        <div>
             <Helmet>
        <title>Seba Medical | Available Camps</title>
      </Helmet>
        <h2 className="text-2xl font-bold text-center mt-8 mb-5">Available Camps</h2>
        <div className="mb-8 flex flex-col md:flex-row md:justify-evenly items-center">
            <input
                type="text"
                placeholder="Search camps"
                className="input input-bordered mb-4 md:mb-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                className="select select-bordered"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="">Sort Available Camp</option>
                <option value="mostRegistered">Most Registered</option>
                <option value="campFees">Camp Fees</option>
                <option value="alphabeticalOrder">Alphabetical Order</option>
            </select>
            <button onClick={()=> setLayout(!layout)} className="btn btn-secondary">Layout</button>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2  gap-5 ${layout? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            {camps.map(camp => (
                <div key={camp._id} className="card card-compact bg-base-100 shadow-xl">
                    <figure><img className="h-72 w-full object-cover" src={camp.image} alt="Camp" /></figure>
                    <div className="card-body">
                        <div className="flex justify-between w-auto">
                            <p>{moment(camp.dateTime).format('lll')}</p>
                            <p className="flex gap-2 items-center">
                                <FaLocationPin /> {camp.location}
                            </p>
                        </div>
                        <h2 className="card-title">{camp.campName}</h2>
                        <div className="flex justify-between">
                            <h3 className="font-bold text-base">Doctor: {camp.healthcareProfessionalName}</h3>
                            <p className="flex items-center justify-end gap-2"><FaPeopleGroup /> {camp.participantCount}</p>
                        </div>
                        <p>{camp.description}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/camp-details/${camp._id}`}><button  className="btn btn-primary">Details</button></Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default AvailableCamps;