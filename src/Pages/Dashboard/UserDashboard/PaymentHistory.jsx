import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data:registerCamp=[], isLoading } = useQuery({
      queryKey: ['participant', user.email],
      queryFn: async () => {
          const res = await axiosSecure.post(`participant/${user.email}`);
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
        </div>
    );
};

export default PaymentHistory;