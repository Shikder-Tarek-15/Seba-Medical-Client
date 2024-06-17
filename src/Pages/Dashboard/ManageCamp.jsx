import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";


const imageKey = import.meta.env.VITE_imgKey;
const imgAPI = `https://api.imgbb.com/1/upload?key=${imageKey}`;
const ManageCamp = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const [selectedCamp, setSelectedCamp] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    
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


    const handleEdit = (camp) => {
        setSelectedCamp(camp);
        reset(camp); // Reset form with the camp data
        document.getElementById('edit_modal').showModal();
    };



    const onSubmit = async (data) => {

            const campId = selectedCamp._id
        
            const res = await axiosSecure.put(`/update-camp/${campId}`, data);
            if(res.data.modifiedCount >0){
                Swal.fire({
                    title: "Update!",
                    text: "Camp Updated successfull.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
            })
            refetch();
            document.getElementById('edit_modal').close(); 
        }
        
    };





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


<dialog id="edit_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Camp Name</span>
                            </div>
                            <input
                                {...register("campName", { required: true })}
                                type="text"
                                placeholder="Camp Name"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Date & Time</span>
                            </div>
                            <input
                                {...register("dateTime", { required: true })}
                                type="datetime-local"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Location</span>
                            </div>
                            <input
                                {...register("location", { required: true })}
                                type="text"
                                placeholder="Location"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Healthcare Professional Name</span>
                            </div>
                            <input
                                {...register("healthcareProfessionalName", { required: true })}
                                type="text"
                                placeholder="Healthcare Professional"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea
                                {...register("description", { required: true })}
                                placeholder="Description"
                                className="textarea textarea-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Image</span>
                            </div>
                            <input
                                {...register("image")}
                                type="file"
                                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                            />
                        </label>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn" onClick={() => document.getElementById('edit_modal').close()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default ManageCamp;