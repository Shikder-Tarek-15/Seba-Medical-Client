import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Newsletter = () => {
    const axiosPublic = useAxiosPublic()
    const handleNewsLetter= (e) =>{
        e.preventDefault()
        const email = e.target.email.value;
        axiosPublic.post('/newsletter', email)
        .then(res=>{    
            if(res.data.insertedId){
                Swal.fire({
                    title: "Subscribed!",
                    text: "Your newsletter subscribe successfull",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                  });
            }
        })


    }
    return (
      <section className="py-6 bg-base-100 mt-12">
        <div className="container mx-auto flex flex-col justify-evenly p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row border border-yellow-700 rounded-xl">
          <div className="flex flex-col space-y-4 text-center lg:text-left">
            <h1 className="text-3xl font-bold leading-none">
              Stay Informed with Our Newsletter!
            </h1>
            <p className="">
              <span className="font-bold text-lg">
                {" "}
                Subscribe to our newsletter and never miss out :
              </span>
              <ul className=" list-disc list-inside mt-3">
                <li>New Camp</li>
                <li>The latest news and updates from our Camps</li>
                <li>Specials camps</li>
              </ul>
            </p>
          </div>
          <div className="border-r-2 border-yellow-600"></div>
          <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
            <div className="flex flex-row">
              <form onSubmit={handleNewsLetter}>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
              />
              <button
                type="submit"
                className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-violet-600 dark:text-gray-50"
              >
                Subscribe
              </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Newsletter;
  