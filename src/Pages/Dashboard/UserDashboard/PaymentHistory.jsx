import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [currentPage, setCurrentPage] = useState(0);


     // pagination
    const {data:itemCount=[]} = useQuery({
        queryKey: ['itemCount'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/campCount');
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




    const { data:registerCamp=[], isLoading } = useQuery({
      queryKey: ['participant', user.email,currentPage],
      queryFn: async () => {
          const res = await axiosSecure.post(`participant/${user.email}?page=${currentPage}&size=${10}`);
          return res.data; 
      }
  });
  if (isLoading) {
    return <div className='text-center'><span className="loading loading-ring loading-lg"></span></div>;
}

    return (
        <div>
            <h2 className="font-bold text-2xl text-center mb-7">Manage Register Camp</h2>
             <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th> 
        <th>Camp Name</th> 
        <th>Camp Fees</th> 
        <th>Payment Status</th> 
        <th>Confirmation Status</th> 
      </tr>
    </thead> 
    <tbody>
      {
        registerCamp.map((camp, idx)=> <tr key={camp._id}>
            <th>{idx+1}</th>     
            <td>{camp.campName}</td> 
            <td>{camp.campFees}</td> 
            <td>{camp?.paymentStatus ? camp.paymentStatus : 'Unpaid'}</td> 
            <td>{camp?.confirmationStatus ? camp.confirmationStatus : 'Pending'}</td>   
            
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

export default PaymentHistory;