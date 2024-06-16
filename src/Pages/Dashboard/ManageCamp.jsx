import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ManageCamp = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    
    const {data: camps,refetch } = useQuery({
        queryKey: ['camps'],
        queryFn: async() =>{
            const res = await axiosPublic.get("/camps");
            // console.log(res.data);
         res.data
        }
    })
    // {campName, dateTime, campFees, location, healthcareProfessionalName, participantCount, image, description}
    console.log("this is",camps);
    return (
        <div>
            <h2 className="font-bold text-3xl text-center mb-6">Manage Camps</h2>
            <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th> 
        <th>Name</th> 
        <th>Date & Time</th> 
        <th>Location</th> 
        <th>Healthcare Professional</th> 
        <th>Edit</th> 
        <th>Delete</th>
      </tr>
    </thead> 
    <tbody>
      {
        camps.map((camp, idx)=> <tr key={camp._id}>
            <th>{idx+1}</th> 
            <td>{camp.campName}</td> 
            <td>{camp.dateTime}</td> 
            <td>{camp.location}</td> 
            <td>{camp.healthcareProfessionalName}</td> 
            <td><button><FaRegEdit className="text-xl"/></button></td> 
            <td><button><MdDelete className="text-xl" /></button></td>
          </tr>)
      }
      
    </tbody> 
   
  </table>
</div>
        </div>
    );
};

export default ManageCamp;