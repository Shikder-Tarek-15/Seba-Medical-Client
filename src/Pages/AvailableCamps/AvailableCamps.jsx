import { useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { FaLocationCrosshairs, FaLocationPin, FaLocationPinLock, FaMapLocation, FaPeopleGroup } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";


const AvailableCamps = () => {
    const camps = useLoaderData()   

    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Available Camps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    camps.map(camp => <div key={camp._id} className="card card-compact bg-base-100 shadow-xl">
                        <figure><img className="h-72 w-full object-cover" src={camp.image} alt="Shoes" /></figure>

                        <div className="card-body">
                            <div className="flex justify-between w-auto">
                            <p>{new Date(camp.dateTime).toLocaleDateString()}</p>
                            <p className="flex gap-2 items-center">
                               <FaLocationPin/> {camp.location}
                            </p>
                            </div>
                          <div className="flex justify-between">
                          <h2 className="card-title">{camp.campName}</h2>
                          <p className="flex items-center gap-2"><FaPeopleGroup /> {camp.participantCount}</p>
                          </div>
                          <h3 className="font-bold text-base">Doctor: {camp.healthcareProfessionalName}</h3>
                          <p>{camp.description}</p>
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                          </div>
                        </div>
                      </div>)
                }
            </div>
        </div>
    );
};

export default AvailableCamps;