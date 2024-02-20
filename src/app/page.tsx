'use client'
import { useState } from "react";
import "./globals.css";
import Modal from "./_component/modal/Modal";
export default function Home() {
  const [time,setTime]=useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  setInterval(()=>{
    setTime(new Date().toLocaleTimeString());

  },1000)

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#cbd7e3]">
    <div className="h-auto  w-96 bg-white rounded-lg p-4">
        <div className="mt-3 text-sm text-[#8ea6c8] flex justify-between items-center">
            <p className="set_date">{new Date().toDateString()}</p>
            <p className="set_time">{time}</p>
        </div>
        <p className="text-xl font-semibold mt-2 text-[#063c76]">To-do List</p>
        
        <ul className="my-4 ">
            <li className=" mt-4" id="1">
                <div className="flex gap-2">
                    <div className="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                        <span id="check1" className=" w-7 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center"><i className="text-white fa fa-check"></i></span>
                        
                    </div>
                    <span className="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center ">9:00 AM</span>
                </div>
            </li>
            
        </ul>
        <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={openModal}>Add Task</button>
       <Modal modalOpen={modalOpen} closeModal={closeModal} />
      </div>
    </div>
  );
}
