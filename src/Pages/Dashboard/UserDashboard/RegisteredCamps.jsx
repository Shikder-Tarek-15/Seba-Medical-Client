    import {  useQuery, useQueryClient } from "@tanstack/react-query";
    import useAxiosSecure from "../../../Hooks/useAxiosSecure";
    import useAuth from "../../../Hooks/useAuth";
    import Payment from "./Payment/Payment";
    import { useState } from "react";
import Swal from "sweetalert2";



    const RegisteredCamps = () => {
        const { user } = useAuth();
        const axiosSecure = useAxiosSecure();

    const queryClient = useQueryClient();
        const [selectedCamp, setSelectedCamp] = useState(null);
        const { data: registeredCamps, isLoading } = useQuery({
            queryKey: ['participant', user.email],
            queryFn: async () => {
                const res = await axiosSecure.post(`participant/${user.email}`);
                return res.data; 
            }
        });
        
        
        if (isLoading) {
            return <span className="loading loading-ring loading-lg"></span>;
        }

        const handlePaymentSuccess = () => {
            setSelectedCamp(null);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Payment Successfull",
                showConfirmButton: false,
                timer: 1500
              });
            queryClient.invalidateQueries(['registeredCamps', user.email]);
        };
        
        const handlePayment = (camp) => {
            setSelectedCamp(camp);
            console.log("shikder", camp);
        };

        // Feedback
        const handleFeedback = () =>{
            console.log('a');
        }


        return (
            <div>
                <h2 className="text-2xl font-bold text-center mb-4">Registered Camps</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Serial</th>
                            <th className="py-2 px-4 border-b">Camp Name</th>
                            <th className="py-2 px-4 border-b">Camp Fees</th>
                            <th className="py-2 px-4 border-b">Participant Name</th>
                            <th className="py-2 px-4 border-b">Payment Status</th>
                            <th className="py-2 px-4 border-b">Confirmation Status</th>
                            <th className="py-2 px-4 border-b">Feedback</th>
                            <th className="py-2 px-4 border-b">Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredCamps.map((camp, idx) => (
                            <tr key={camp._id}>
                                <th className="py-2 px-4 border-b">{idx+1}</th>
                                <td className="py-2 px-4 border-b">{camp.campName}</td>
                                <td className="py-2 px-4 border-b">৳{camp.campFees}</td>
                                <td className="py-2 px-4 border-b">{user.displayName}</td>
                                <td className="py-2 px-4 border-b">
                                    {camp.paymentStatus === 'Paid' ? (
                                        <span className="text-green-600">Paid</span>
                                    ) : (
                                        <button
                                            className="bg-blue-500 text-white py-1 px-2 rounded"
                                            onClick={() => handlePayment(camp)}
                                        >
                                            Pay
                                        </button>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">{camp?.confirmationStatus}</td>
                                <td className="py-2 px-4 border-b">
                                    {camp?.paymentStatus === 'Paid' && camp?.confirmationStatus === 'Confirmed' && (
                                        <button
                                            className="bg-yellow-500 text-white py-1 px-2 rounded"
                                            onClick={() => handleFeedback(camp._id)}
                                        >
                                            Give Feedback
                                        </button>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className={` text-white py-1 px-2 rounded ${camp?.paymentStatus === 'Paid' ? 'bg-gray-300' : 'bg-red-500'}`}
                                        // onClick={() => handleCancel(camp._id)}
                                        disabled={camp?.paymentStatus === 'Paid'}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

               

                {/* {showFeedbackForm && (
                    <FeedbackForm
                        campId={selectedCamp}
                        onClose={() => setShowFeedbackForm(false)}
                    />
                )} */}

        {selectedCamp && (
            <Payment camp={selectedCamp} onPaymentSuccess={handlePaymentSuccess} />
        )}

            </div>
            
        );
    };



    export default RegisteredCamps;