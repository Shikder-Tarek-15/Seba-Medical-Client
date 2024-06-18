import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import moment from "moment";

const CampDetails = () => {
    const camp = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const {_id, campName, image, campFees, dateTime, location, healthcareProfessionalName, participantCount, description } = camp;
    const [currentParticipantCount, setCurrentParticipantCount] = useState(participantCount);

    

    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async(data) => {
        data.campName = campName;
        data.campFees = campFees;
        data.location = location;
        data.participantName = user.displayName;
        data.participantEmail = user.email;
        data.healthcareProfessionalName = healthcareProfessionalName;
        console.log(data);

        const res = await axiosSecure.post('/participant_camp', data);
        console.log(res.data);
        if(res.data.insertedId){
          setCurrentParticipantCount(prevCount => prevCount + 1);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your camp participant successfull",
            showConfirmButton: false,
            timer: 1500
          });

          const patch = await axiosSecure.patch(`/camp_patch/${_id}`);
          console.log(patch.data);
        }
        
        // Close the modal after submission
        document.getElementById('my_modal_5').close();
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
                <div>
                    <img className="rounded-xl w-full" src={image} alt="" />
                    <figcaption className="text-center">{campName}</figcaption>
                </div>
                <div>
                    <h2 className="text-3xl font-bold border-b pb-5 mt-5">{campName}</h2>
                    <h4 className="font-bold">Doctor Name: {healthcareProfessionalName}</h4>
                    <p className="mt-5 border-b pb-5">
                        <span className="font-bold">Description: </span>{description}
                    </p>
                    <h2 className="text-xl font-bold pt-5 border-b pb-5">More Details</h2>
                    <p className="pt-5 mb-2">
                        <span className="font-bold">Location: </span> {location}
                    </p>
                    <p><span className="font-bold">Date & Time:</span> {moment(dateTime).format('lll')}</p>
                    <p className="mt-2 mb-2">
                        <span className="font-bold">Participant: </span>{currentParticipantCount}
                    </p>
                    <p className="text-xl font-bold mb-2">
                        <span className="font-black">Fees: </span>{campFees} Taka
                    </p>
                    <div className="flex justify-end">
                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()}>Join Camp</button>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-5">
                            <div>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Camp Name</span>
                                    </div>
                                    <input
                                        {...register("campName")}
                                        value={campName}
                                        disabled
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Camp Fees</span>
                                    </div>
                                    <input
                                        {...register("campFees")}
                                        value={campFees}
                                        disabled
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Location</span>
                                    </div>
                                    <input
                                        {...register("location")}
                                        value={location}
                                        disabled
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Age</span>
                                    </div>
                                    <input
                                        {...register("age", { required: "Age is required", valueAsNumber: true })}
                                        type="number"
                                        placeholder="Type here"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                    {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Gender</span>
                                    </div>
                                    <select
                                        {...register("gender", { required: "Gender is required" })}
                                        className="select select-bordered"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
                                </label>
                            </div>
                            <div>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">HealthCare Professional Name</span>
                                    </div>
                                    <input
                                        {...register("healthcareProfessionalName")}
                                        value={healthcareProfessionalName}
                                        disabled
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Participant Name</span>
                                    </div>
                                    <input
                                        {...register("participantName")}
                                        value={user.displayName}
                                        disabled
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Participant Email</span>
                                    </div>
                                    <input
                                        {...register("participantEmail")}
                                        value={user.email}
                                        disabled
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Phone Number</span>
                                    </div>
                                    <input
                                        {...register("number", { required: "Phone number is required" })}
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                    {errors.number && <p className="text-red-500">{errors.number.message}</p>}
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Emergency Contact</span>
                                    </div>
                                    <input
                                        {...register("emergency", { required: "Emergency contact is required" })}
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                    {errors.emergency && <p className="text-red-500">{errors.emergency.message}</p>}
                                </label>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default CampDetails;
