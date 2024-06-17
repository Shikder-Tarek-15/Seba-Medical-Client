import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Analytics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    
    const { data, isLoading } = useQuery({
        queryKey: ['participant', user.email],
        queryFn: async () => {
            const res = await axiosSecure.post(`participant/${user.email}`);
            return res.data; 
        }
    });

   
    if (isLoading) {
        return <span className="loading loading-ring loading-lg"></span>;
    }

    
   

   
    const transformedData = data.map(camp => ({
        campName: camp.campName,
        campFees: camp.campFees,
        participantCount: camp.participantCount, 
    }));

    return (
        <div>
            <h2>Participant Camps Analytics</h2>
            <BarChart width={1200} height={600} data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="campName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="campFees" fill="#8884d8" /> 
                
            </BarChart>
        </div>
    );
};

export default Analytics;
