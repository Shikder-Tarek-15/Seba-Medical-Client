import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdCancel, MdFileDownloadDone } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const ManageRegisterCamp = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [currentPage, setCurrentPage] = useState(0);


    // Pagination
    const {data:itemCount=[]} = useQuery({
      queryKey: ['participantCampCount'],
      queryFn: async() =>{
          const res = await axiosSecure.get('/participantCampCount');
          return res.data.count;
      }
  })

  const numberOfPage = Math.ceil(itemCount / 10)
    const pages = [...Array(numberOfPage).keys()];

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }



    const { data:registerCamp=[], isLoading, refetch } = useQuery({
      queryKey: ['participant', user.email, currentPage],
      queryFn: async () => {
          const res = await axiosSecure.get(`participant_camp?page=${currentPage}&size=${10}`);
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
{/* Pagination */}
<div className="flex justify-center mt-12">
            <div aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm bg-gray-100 text-gray-800">
	<button onClick={handlePrevPage}  className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md border-gray-300">
		<span className="sr-only">Previous</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
			<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
		</svg>
	</button>
	{
        pages.map(page=> <button key={page} onClick={()=>setCurrentPage(page)} className={`inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 ${currentPage === page ? 'bg-violet-600 text-white' : 'bg-blue-100'}`}>{page}</button>)
    }
	
	<button onClick={handleNextPage} className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md border-gray-300">
		<span className="sr-only">Next</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
			<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
		</svg>
	</button>
</div>
            </div>
{/* Pagination end */}
        </div>
    );
};

export default ManageRegisterCamp;