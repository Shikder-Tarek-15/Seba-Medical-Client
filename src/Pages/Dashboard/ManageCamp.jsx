import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageCamp = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const [selectedCamp, setSelectedCamp] = useState(null);
    
    const {data: camps=[],refetch, isLoading } = useQuery({
        queryKey: ['camps'],
        queryFn: async() =>{
            const res = await axiosPublic.get("/camps");
            // console.log(res.data);
         return res.data
        }
    })
    // {campName, dateTime, campFees, location, healthcareProfessionalName, participantCount, image, description}
    console.log("this is",camps);


    const handleEdit = camp =>{
        console.log(camp);
    }

    const handleDelete = async (campId) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async(result) => {
            if (result.isConfirmed) {
                const res =  await axiosSecure.delete(`/delete-camp/${campId}`);
                console.log(res.data);
                Swal.fire({
                 title: "Deleted!",
                 text: "Camp has been deleted.",
                 icon: "success",
                 showConfirmButton: false,
                 timer: 1000
               });
                 refetch();
            }
          });
        
          


    }
    return (
        <div>
            <h2 className="font-bold text-3xl text-center mb-6">Manage Camps</h2>
           <div className="flex justify-center items-center">
           {
                isLoading && <span className="loading loading-ring loading-lg text-center"></span>
            }
           </div>
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
            <td><button onClick={()=>handleEdit(camp)}><FaRegEdit className="text-xl"/></button></td> 
            <td><button onClick={()=>handleDelete(camp._id)}><MdDelete className="text-xl" /></button></td>
          </tr>)
      }
      
    </tbody> 
   
  </table>
</div>
        </div>
    );
};

export default ManageCamp;