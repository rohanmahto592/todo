"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import Modal from "./_component/modal/Modal";
import axios from "axios";
export default function Home() {
  const [time, setTime] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState([]);
  const [taskItem,setTaskItem]=useState(null);
  const openModal = () => {
    setTaskItem(null);
    setModalOpen(true);
   
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/tasks").then((response: any) => {
      if (response.data) {
        setTasks(response.data);
      }
    });
  }, []);
  const deleteTask = (id: string) => {
    axios
      .delete(`http://127.0.0.1:5000/task`, { params: {"task_id": id } })
      .then((response: any) => {
        if (response.data) {
          console.log(response);
        }
      });
  };
  const editTask=(task:any)=>{
    openModal();
    setTaskItem(task);

  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#cbd7e3]">
      <div className="h-auto  w-2/3 bg-white rounded-lg p-4">
        <div className="mt-3 text-sm text-[#8ea6c8] flex justify-between items-center">
          <p className="set_date">{new Date().toDateString()}</p>
          <p className="set_time">{time}</p>
        </div>
        <p className="text-xl font-semibold mt-2 text-[#063c76]">To-do List</p>

        <ul className="my-4 ">
          {tasks?.map((task: any, index: number) => {
            return (
              <li key={index} className=" mt-4" >
                <div className="flex gap-2">
                  <div className="w-3/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                    <h2 className="text-sm font-semibold text-gray-800">
                      {task?.name}
                    </h2>
                  </div>
                  <div className="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                    <h2 className="text-sm font-semibold text-gray-800">
                      {task?.priority}
                    </h2>
                  </div>
                  <div className="w-2/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                    <h2 className="text-sm font-semibold text-gray-800">
                      {task?.status}
                    </h2>
                  </div>

                  <span className="w-2/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center ">
                    {task.due_date &&
                      new Date(task.due_date).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    {" "}
                    delete
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={()=>editTask(task)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={openModal}
        >
          Add Task
        </button>

        <Modal taskItem={taskItem} modalOpen={modalOpen} closeModal={closeModal} />
      </div>
    </div>
  );
}
