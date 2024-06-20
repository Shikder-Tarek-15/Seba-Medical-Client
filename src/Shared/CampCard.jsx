
import moment from 'moment';
import { FaLocationPin, FaPeopleGroup } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const CampCard = ({camp}) => {
    return (
        <div className="card card-compact bg-base-200 shadow-xl">
        <figure><img className="h-72 w-full object-cover" src={camp.image} alt="Camp" /></figure>
        <div className="card-body">
            <div className="flex justify-between w-auto">
                <p>{moment(camp.dateTime).format('lll')}</p>
                <p className="flex gap-2 items-center">
                    <FaLocationPin /> {camp.location}
                </p>
            </div>
            <h2 className="card-title">{camp.campName}</h2>
            <div className="flex justify-between">
                <h3 className="font-bold -mt-3 text-base">Doctor: {camp.healthcareProfessionalName}</h3>
                <p className="flex items-center justify-end gap-2"><FaPeopleGroup /> {camp.participantCount}</p>
            </div>
            <p>{camp.description}</p>
            <div className="card-actions justify-end">
                <p className="text-lg"><span className="font-bold">Fees:</span> {camp.campFees} taka</p>
                <Link to={`/camp-details/${camp._id}`}><button  className="btn btn-primary">Details</button></Link>
            </div>
        </div>
    </div>
    );
};

export default CampCard;