import axios from 'axios';
import React, { useState } from 'react'

import { MdOutlineDelete } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert/Alert';

export default function DeleteBtn() {

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        mybook : id
    };
    const handleDelete = async () => {
        try {
            const response = await axios.delete("http://localhost:1000/api/v1/delete-book",{headers});
            console.log(response.data.message);
            setMessage(response.data.message);
            setVisible(true);
            navigate("/all-books");
        } catch (error) {
            setMessage(response.data.message);
            setVisible(true);
        }
    }

  return (<>
    {visible && <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>}
    <button className='mr-2 bg-zinc-100 text-pink-400 hover:bg-pink-400 hover:text-zinc-100 p-2 rounded-[10px] flex items-center justify-center' onClick={handleDelete}><MdOutlineDelete/><span className='block md:hidden text-sm font-semibold ms-2'>Delete</span></button></>
  )
}
