import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdCancel, MdFileDownloadDone } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageRegisterCamp = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data:registerCamp=[], isLoading, refetch } = useQuery({
      queryKey: ['participant', user.email],
      queryFn: async () => {
          const res = await axiosSecure.post(`participant/${user.email}`);
          return res.data; 
      }
  });

 
  if (isLoading) {
      return <div className='text-center'><span className="loading loading-ring loading-lg"></span></div>;
  }

    const handleDelete =async(id) =>{




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
          const res = await axiosSecure.delete(`/participant_camp/${id}`);
          console.log(res.data);
          Swal.fire({
            title: "Deleted!",
            text: "Camp has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          refetch()
      }
        
      })
    }



      const handleConfirmation = async (camp) => {
        if (camp.paymentStatus === 'Paid') {




          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!"
          }).then( async(result) => {
            if (result.isConfirmed) {
              const res = await axiosSecure.put(`/update-confirmation/${camp._id}`);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The camp has been confirmed",
                showConfirmButton: false,
                timer: 1500
              });
                refetch();
            }
          }
            
          })



            
        } 
    };

       

    return (
        <div>
          <Helmet>
        <title>Seba Medical | Manage Register Camp</title>
      </Helmet>
            <h2 className="font-bold text-2xl text-center mb-7">Manage Register Camp</h2>
             <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th> 
        <th>Participant Name</th> 
        <th>Camp Name</th> 
        <th>Camp Fees</th> 
        <th>Payment Status</th> 
        <th>Confirmation Status</th> 
        <th>Cancel</th>
      </tr>
    </thead> 
    <tbody>
      {
        registerCamp.map((camp, idx)=> <tr key={camp._id}>
            <th>{idx+1}</th> 
            <td>{camp.participantName}</td> 
            <td>{camp.campName}</td> 
            <td>{camp.campFees}</td> 
            <td>{camp?.paymentStatus ? camp.paymentStatus : 'Unpaid'}</td> 
            <td>
                                    {camp.confirmationStatus === 'Confirmed' ? (
                                        <span className="text-green-600">Confirmed</span>
                                    ) : (
                                        <button
                                            className={` text-white py-1 px-2 rounded ${camp.paymentStatus !== 'Paid' ? 'bg-red-500' : 'bg-yellow-500'}`}
                                            onClick={() => handleConfirmation(camp)}
                                            disabled={camp.paymentStatus !== 'Paid'}
                                        >
                                            {
                                              camp.confirmationStatus? 'Confirmed' : 'Pending'
                                            }
                                        </button>
                                    )}
                                </td>   
            <td>{camp?.paymentStatus ? <button disabled className="text-xl"><MdFileDownloadDone /></button> : 
            <button
             onClick={()=>handleDelete(camp._id)} 
             className="text-xl" ><MdCancel /></button>}</td> 
          </tr>)
      }
      
    </tbody> 
   
  </table>
</div>
        </div>
    );
};

export default ManageRegisterCamp;