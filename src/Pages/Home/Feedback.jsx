import { Rating } from "@smastrom/react-rating";

const Feedback = ({feedback}) => {
    return (
        <div className="text-center border rounded-xl p-5">
            <p className="text-gray-400">Rating</p>
            <Rating className="mx-auto" style={{ maxWidth: 250 }} readOnly value={feedback.rating}  />
            <p className="text-gray-400">Description</p>
            <p className="w-96 mx-auto">{feedback.description}</p>
            <br />
            <p>{feedback.Name}</p>
        </div>
    );
};

export default Feedback;