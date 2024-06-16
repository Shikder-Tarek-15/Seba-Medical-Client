import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { CiBookmarkPlus } from "react-icons/ci";

const imageKey = import.meta.env.VITE_imgKey;
const imgAPI = `https://api.imgbb.com/1/upload?key=${imageKey}`
const AddCamp = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
// console.log(imageKey);
    const onSubmit =async (data) =>{
        console.log(data);

        const {name, dateTime, campFees, location, professionalName, participantName, image, description} = data;

        const updateData = {name, dateTime, campFees, location, professionalName, participantName, imageData: image[0], description}
        console.log(updateData.imageData);

        const imageFile = {image: updateData.imageData}


        const res = await axiosPublic.post(imgAPI, imageFile, {
            headers: {
                'content-type' : 'multipart/form-data',
            }
        });
        // console.log(res.data.data); //display_url
        console.log(res.data);

        if(res.data.success){
            console.log(res.data.data.display_url);

        }
    }
    return (
        <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Camp Name*</span>
            </label>
            <input
              type="text"
              placeholder="Camp Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-2 md:gap-6 flex-col md:flex-row">
            {/* Date & Time */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Date & Time*</span>
              </label>
              <input
                type="datetime-local"
                placeholder="Date & Time"
                {...register("date", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Camp Fees */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Camp Fees*</span>
              </label>
              <input
                type="number"
                placeholder="Camp Fees"
                {...register("campFees", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex gap-6 flex-col md:flex-row">
            {/* Location*/}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Location*</span>
              </label>
              <input
                type="text"
                placeholder="Location"
                {...register("location", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Healthcare Professional Name*</span>
              </label>
              <input
                type="number"
                placeholder="Healthcare Professional Name"
                {...register("professionalName", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* Participant Count */}
          <div className="form-control w-full my-6 md:w-1/2">
              <label className="label">
                <span className="label-text">Participant Count*</span>
              </label>
              <input
                type="number"
                placeholder="Participant Count"
                {...register("participantCount", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          {/* Camp details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Camp Details</span>
            </label>
            <textarea
              {...register("campDetails")}
              className="textarea textarea-bordered h-24"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn">
            Add Item <CiBookmarkPlus className='text-xl font-bold' />
          </button>
        </form>
      </div>
    </div>
    );
};

export default AddCamp;