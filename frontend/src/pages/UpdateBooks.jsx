import React, { useEffect, useState } from "react";
import Alert from "../components/Alert/Alert";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBooks() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    mybook : id
  };

    const apiVal = `http://localhost:1000/api/v1/get-book-by-id/${id}`;
    useEffect(()=>{
        const fetch = async ()=>{
            const response = await axios.get(apiVal);
            setData(response.data.data);
        }
        fetch();  
    },[]);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();


  const handleChange = (event) => {
    event.preventDefault();
    const {name,value} = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        if(data.url === "" || data.title === "" || data.author === "" || data.price === "" || data.desc === "" || data.language === ""){
            setMessage("All fields are required");
            setVisible(true);
        }
        else{
            const response = await axios.put("http://localhost:1000/api/v1/update-book",
                data,
                { headers }
            );
            setData({
                url: "",
                title: "",
                author: "",
                price: "",
                desc: "",
                language: "",
            });
            setMessage(response.data.message);
            setVisible(true);
            navigate(`/view-book-details/${id}`);
        }
    } catch (error) {
        setMessage(error.response.data.message);
        setVisible(true);
    }
  };

  return (
    <>
      {visible && <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>}
      {/* {data && <Loading/>} */}
      {
        <div className="flex items-center justify-center bg-zinc-900">
            <div className="h-[100%] w-[90%] md:mt-2 mt-10 p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center">
            Update Book
          </h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="p-4 bg-zinc-800 rounded-[13px]">
              <div className="">
                <label htmlFor="" className="text-xl text-zinc-400">
                  Image Url
                </label>
                <input
                  type="text"
                  className="w-full p-2 mt-2 bg-zinc-900 text-zinc-100 outline-none"
                  placeholder="Image Url"
                  name="url"
                  value={data.url}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mt-4">
                <label htmlFor="" className="text-xl text-zinc-400">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 mt-2 bg-zinc-900 text-zinc-100 outline-none"
                  placeholder="Title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mt-4">
                <label htmlFor="" className="text-xl text-zinc-400">
                  Author
                </label>
                <input
                  type="text"
                  className="w-full p-2 mt-2 bg-zinc-900 text-zinc-100 outline-none"
                  placeholder="Author"
                  name="author"
                  value={data.author}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <div className="my-4 w-full">
                  <label htmlFor="" className="text-xl w-[100%] text-zinc-400">
                    Price
                  </label>
                  <input
                    type="number"
                    className="w-[100%] p-2 mt-2 bg-zinc-900 text-zinc-100 outline-none"
                    placeholder="Price"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="my-4 w-full">
                  <label htmlFor="" className="text-xl text-zinc-400">
                    Language
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 mt-2 bg-zinc-900 text-zinc-100 outline-none"
                    placeholder="Language"
                    name="language"
                    value={data.language}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <label htmlFor="" className="text-xl text-zinc-400">
                  Description
                </label>
                <textarea
                  className="w-full p-2 mt-2 bg-zinc-900 text-zinc-100 outline-none"
                  rows="5"
                  placeholder="Description of Book"
                  name="desc"
                  value={data.desc}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300">
                  Update Book
                </button>
              </div>
            </div>
          </form>
        </div>
        </div>
      }
    </>
  );
}
