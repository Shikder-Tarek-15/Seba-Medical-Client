
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {FaLocationPin, FaPeopleGroup } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import CampCard from "../../Shared/CampCard";


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
            {camps.map(camp=> <CampCard key={camp._id} camp={camp}/>)
            
            }
        </div>
    </div>
    );
};

export default AvailableCamps;