import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const CampDetails = () => {
    const camp = useLoaderData()
    const {campName,image,campFees,dateTime,location,healthcareProfessionalName,participantCount,description} = camp;
    const {user} = useAuth()
    return (
        <div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
        <div>
          <img className="rounded-xl w-full" src={image} alt="" />
          <figcaption className="text-center">{campName}</figcaption>
        </div>
        <div>
          <h2 className="text-3xl font-bold border-b pb-5 mt-5">
            {campName}
          </h2>
          <h4 className="font-bold">Doctor Name: {healthcareProfessionalName}</h4>
          <p className="mt-5 border-b pb-5">
            <span className="font-bold">Description: </span>
            {description}
          </p>
          <h2 className="text-xl font-bold pt-5 border-b pb-5">More Details</h2>
          <p className="pt-5 mb-2">
            <span className="font-bold">Location: </span> {location}
          </p>
          <p className="">
            Date: {new Date(dateTime).toLocaleDateString()}
          </p>
          <p className="mt-2 mb-2">
            <span className="font-bold">Participant: </span>
            {participantCount}
          </p>
          <p className="text-xl font-bold mb-2">
            <span className="font-black">Fees: </span>
            {campFees} Taka
          </p>
          <div className="flex justify-end">
          <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <form>
    <div className="flex gap-5">
        <div>
        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Camp Name</span>
  </div>
  <input value={campName} disabled type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Camp Fees</span>
  </div>
  <input value={campFees} disabled type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Location</span>
  </div>
  <input value={location} disabled type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Age</span>
  </div>
  <input name="age"  type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Pick the best fantasy franchise</span>
  </div>
  <select className="select select-bordered" name="gender">
    <option disabled selected>Pick one</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    
  </select>
  
</label>
        </div>
        <div>
        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">HealthCare Professional Name</span>
  </div>
  <input value={healthcareProfessionalName} disabled type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Participant Name</span>
  </div>
  <input value={user.displayName} disabled type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Participant Email</span>
  </div>
  <input value={user.email} disabled type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Phone Number</span>
  </div>
  <input name="number"  type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Emergency Contact</span>
  </div>
  <input name="emergency"  type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  
</label>
        </div>
    </div>
    
    </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
    );
};

export default CampDetails;