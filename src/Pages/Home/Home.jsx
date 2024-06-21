import { useEffect } from "react";
import Slider from "./Slider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CampCard from "../../Shared/CampCard";
import { Link } from "react-router-dom";
import Feedback from "./Feedback";
import Newsletter from "./Newsletter";

const Home = () => {
    
    const axiosPublic = useAxiosPublic()
    const {data:camps=[]} = useQuery({
        queryKey: ['mostCamps'],
        queryFn: async()=>{
          const res = await  axiosPublic.get(`/camps?sort=${'mostRegistered'}`)
        return res.data
        }
    });

    const {data: feedbacks=[]} = useQuery({
        queryKey: ['feedback'],
        queryFn: async ()=>{
            const resource = await axiosPublic.get('/feedback')
            return resource.data
        }
    })
    return (
        <div className="mt-12">
            <Slider/>
            <h2 className="my-6 text-3xl font-bold text-center">Popular Medical Camps</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    camps.slice(0,6).map(camp=> <CampCard key={camp._id} camp={camp}/>)
                }
            </div>
            <div className="flex justify-center mt-5 mb-5">
            <Link className='mx-auto' to='/available-camps'><button className="btn bg-orange-500 text-white">See All Camps</button></Link>
            </div>

            <h2 className="my-6 text-3xl font-bold text-center">Feedback and Ratings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                    {
                        feedbacks.slice(0,6).map(feedback=> <Feedback key={feedback._id} feedback={feedback}/>)
                    }
                </div>
                <Newsletter/>
        </div>
    );
};

export default Home;