import axios from "axios";
import React, { useRef, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [val, setVal] = useState(false);

  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const address = useRef("");

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(username.current.value === "" || email.current.value === "" || password.current.value === "" || address.current.value === ""){
        const errorMessage = document.getElementById("errorFill");
        errorMessage.style.display="block";
      }
      else{
        const newUser = {
          username : username.current.value,
          email : email.current.value,
          password : password.current.value,
          address : address.current.value,
        };
        const response = await axios.post("http://localhost:1000/api/v1/sign-up",newUser);
        alert(response.data.message);
        navigate("/logIn");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>

      <div className={`fixed inset-0 text-zinc-200 bg-opacity-30 backdrop-blur-sm h-screen z-[9999]  ${val?"visible":"invisible"} flex items-center justify-center`}>
        <div className="border m-auto flex flex-col items-center justify-center bg-zinc-900 rounded-[15px] p-4 border h-[70%] w-[50%]">
          <h1 className="font-semibold text-2xl text-yellow-100 my-2">Terms and conditions</h1>
          <div className="flex  overflow-hidden overflow-y-scroll bg-zinc-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eligendi amet dicta, saepe consequuntur dolor inventore quis laboriosam distinctio numquam ipsam, eaque animi maiores, nisi nostrum vitae fugit? Magnam assumenda laboriosam pariatur dignissimos error tempora quod officiis nisi commodi minus repudiandae doloribus odio corrupti deleniti, mollitia quas beatae temporibus architecto dolor alias ipsam explicabo quaerat voluptas numquam? Ipsam aperiam cupiditate nesciunt ea quia excepturi unde sunt error molestiae debitis minus repellat perspiciatis dolore, harum mollitia quod quidem hic officiis laborum illo cumque temporibus. Recusandae voluptatibus commodi perferendis eius ad repudiandae dolore qui. Error eos dolor vero repellat at odio distinctio ut aspernatur eveniet nobis ipsam, quia quae. Labore ea veniam odit aliquid voluptates ducimus iste enim ex natus nulla dolor esse dolorem in facere asperiores blanditiis hic vero, voluptatum quia odio maxime harum tempora quas. Molestias quidem eius fugiat dolorem illum ratione corrupti esse doloremque quis maxime, suscipit inventore ipsa laborum atque libero pariatur placeat necessitatibus provident enim minus impedit. In ab nisi blanditiis asperiores porro aperiam magnam quasi ea maiores pariatur rem, quod saepe corrupti qui impedit. Vero est quod sint, enim dicta debitis optio facere, quisquam nulla repellendus numquam beatae vel inventore, eos excepturi dolorem repudiandae laborum illo error reiciendis! Rem numquam eius non. Id esse nam alias expedita soluta temporibus cupiditate placeat nostrum libero adipisci quibusdam ullam numquam pariatur, culpa, doloribus ratione, qui nobis amet. Expedita porro doloremque qui, nesciunt, eaque amet sed quisquam perspiciatis illum, soluta ratione officia quo nihil eligendi pariatur a! Iusto repellendus harum omnis quos! Consectetur libero maxime sequi sapiente, voluptas asperiores hic temporibus dolore aut placeat saepe, iusto odio dolorem. Officiis, molestiae doloribus fuga impedit laboriosam, provident iure animi harum odit ab dolorum corporis facere commodi. Sed aspernatur magnam fugit expedita ullam nesciunt ex incidunt, vel quas, iste quidem eveniet quo quos illo doloremque corrupti quod inventore corporis nostrum laudantium in officiis culpa! Corporis facere sed quae necessitatibus, ratione soluta quas voluptatibus? Suscipit ut, quibusdam debitis maiores perspiciatis, fugiat placeat qui incidunt aut obcaecati, et sunt itaque sequi dignissimos voluptatum. Vero est fuga id ipsum itaque dolore inventore magnam qui, libero minima nemo consectetur, perspiciatis, quasi reiciendis? Omnis, incidunt. Nesciunt, maxime quaerat adipisci facilis et itaque consectetur, aspernatur rerum ullam, quam iure ea quis ad rem corporis iste mollitia non officia exercitationem aliquam quos obcaecati! Nostrum fugit illum expedita ad minima quasi eveniet non quod modi sapiente consectetur aliquid vel molestiae assumenda quidem, nihil mollitia sequi et quisquam nulla perspiciatis doloremque esse libero deleniti. Voluptatum, odit numquam cupiditate ad labore illo hic iure dicta tenetur facilis beatae voluptatem veniam quod necessitatibus possimus repellat, fuga reiciendis consequatur dolores earum veritatis cumque? Libero eum id rerum quis possimus deserunt molestias natus, voluptates temporibus vel doloribus vero corrupti repellat quisquam veniam ullam quod facere laborum voluptatum sed. Veniam impedit ullam fugiat natus libero consequuntur. Eum dolore molestiae eligendi, quis officia rerum quam magni, nisi sapiente suscipit architecto quod officiis minima, provident quisquam blanditiis beatae possimus est sit doloribus cum cupiditate maxime ipsa dicta? Ducimus, vitae?
          </div>
          <button onClick={()=>setVal(false)} className="mt-3 hover:bg-[#027bfd] w-[50%] p-[10px] bg-[#68b0fd] border-none rounded-[26px] text-[#fff] text-[16px] cursor-pointer">
            Done
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 flex items-center justify-center p-8">
        <div className="bg-zinc-800 rounded-[12px] p-6 text-center">
          <h1 className="text-yellow-100 font-semibold text-2xl ">SignUp</h1>
          <form id="registrationForm" onSubmit={handleSubmit}>
            <div className="m-[20px] relative">
              <input
                type="text"
                id="UserName"
                className="w-[90%] inline p-[10px] pr-[35px] border border-[#cccccc] rounded-[30px] box-border font-semibold text-[14px] text-zinc-100 bg-zinc-900"
                ref={username}
                placeholder="Username"
                name="UserName"
                autoComplete="off"
              />
              <FaUser className="absolute right-[8%] top-1/2 transform -translate-y-1/2 text-[#888] text-[1.2rem]" />
            </div>

            <div className="m-[20px] mb-0 relative">
              <input
                type="email"
                id="email"
                ref={email}
                className="w-[90%] inline p-[10px] pr-[35px] border border-[#cccccc] rounded-[30px] box-border font-semibold text-[14px] bg-zinc-900 text-zinc-100"
                name="email"
                placeholder="Email"
                autoComplete="off"
              />
              <FaEnvelope className="absolute right-[8%] top-1/2 transform -translate-y-1/2 text-[#888] text-[1.2rem]" />
            </div>

            <div className="relative m-[20px]">
              <input
                type="text"
                id="password"
                name="password"
                ref={password}
                className="w-[90%] inline p-[10px] pr-[35px] border border-[#cccccc] rounded-[30px] box-border font-semibold text-[14px] bg-zinc-900 text-zinc-100"
                placeholder="Password"
                autoComplete="off"
              />
              <FaLock className="absolute right-[8%] top-1/2 transform -translate-y-1/2 text-[#888] text-[1.2rem] " />
            </div>

            <div className="m-[20px] mb-3 relative">
              <textarea
                type="text"
                id="address"
                ref={address}
                className="w-[90%] inline pr-[35px] border border-[#cccccc] rounded font-semibold text-[14px] bg-zinc-900 text-zinc-100 p-1"
                name="address"
                placeholder="Address"
                autoComplete="off"
                rows="4"
              />
            </div>

            <div id="errorFill" className=" text-[red] hidden">
              <p>All fields are required.</p>
            </div>


            <div className="relative text-left text-[10px] items-center flex mb-2 px-4">
              <input
                type="checkbox"
                className="inline cursor-pointer w-4 h-4 mx-2"
                id="terms"
              />
              <label
                htmlFor="terms"
                className="inline text-[15px] text-zinc-300"
              >
                I agree to the{" "}
                <button
                  onClick={() => setVal(true)}
                  className="text-blue-300 underline hover:text-blue-500"
                >
                  terms and conditions
                </button>
              </label>
            </div>

            

            <button
              type="submit"
              className="hover:bg-[#027bfd] w-[90%] p-[10px] bg-[#68b0fd] border-none rounded-[26px] text-[#fff] text-[16px] cursor-pointer m-2"
            >
              Register
            </button>
          </form>
          <h1 className="text-zinc-300 font-semibold m-2">Or</h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-zinc-300 text-sm">Already have an account?</p>
            <Link
              to="/logIn"
              className="text-blue-300 text-sm underline hover:text-blue-500"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
