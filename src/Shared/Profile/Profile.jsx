import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";


const imageKey = import.meta.env.VITE_imgKey;
const imgAPI = `https://api.imgbb.com/1/upload?key=${imageKey}`
const Profile = () => {
    const {user,updateUserProfile} = useAuth()
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const [profileData, setProfileData] = useState({
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
    });

      const onSubmit = async(data) => {
        console.log(data);
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(imgAPI, imageFile, {
            headers: {
                'content-type' : 'multipart/form-data',
            }
        });
        console.log(res.data.data); //display_url

        if(res.data.success){
            console.log("I am success");
            const image =  res.data.data.display_url;
            console.log('image', image);
            updateUserProfile(data.name, image)
            .then(updateData =>{
                console.log("Update",updateData);

                setProfileData({
                    ...profileData,
                    displayName: data.name,
                    photoURL: image
                });

            })
        }



        document.getElementById('my_modal_1').close()
      }

      useEffect(() => {
        setProfileData({
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email,
        });
    }, [user]);



    return (
        <>
        <div className="flex flex-col justify-center max-w-full h-full p-6 shadow-md rounded-xl sm:px-12">
	<img src={user?.photoURL} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square" />
	<div className="space-y-4 text-center divide-y ">
		<div className="my-2 space-y-1">
			<h2 className="text-xl font-semibold sm:text-2xl">{user?.displayName}</h2>
			<p className="px-5 text-xs sm:text-base ">Email: {user?.email}</p>
            <div className="divider"></div> 
            <button className="btn btn-secondary" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
		</div>
		
	</div>
</div>

<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)}>

    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Name</span>
  </div>
  <input
  {...register("name", { required: true })}
  type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>

    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Image</span>
  </div>
  <input
  {...register("image", { required: true })}
  type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
</label>




    <div className="modal-action">
     
        <button className="btn">Update</button>
     
    </div>
    </form>
  </div>
</dialog>
</>
    );
};

export default Profile;