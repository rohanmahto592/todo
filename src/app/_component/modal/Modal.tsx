"use client";
import axios from "axios";
import React, { useState } from "react";
interface modals {
  modalOpen: boolean;
  closeModal(): void;
}
const Modal = (props: modals) => {
  const { modalOpen, closeModal } = props;
  const [label, setLabel] = useState("");
  const [priority, setPriority] = useState("P1");
  const [status, setStatus] = useState('0');
  const [date, setDate] = useState("");

  const handleLabelChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLabel(e.target.value);
  };

  const handlePriorityChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };
  const handleDateChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDate(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { "name": label, "status": status, "priority": priority, "due_date": date };
    try {
        const response = await axios.post("http://127.0.0.1:5000/task", body);
        console.log(response);
        // Handle form submission
    } catch (error) {
        console.error(error);
        // Handle error
    }
};


  return (
    <>
      {modalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-5 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <form
                      onSubmit={(e)=>handleSubmit(e)}
                      className="max-w-md mx-auto mt-8"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="label"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Label Name
                        </label>
                        <input
                          type="text"
                          id="label"
                          value={label}
                          onChange={handleLabelChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="priority"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Priority
                        </label>
                        <select
                          id="priority"
                          value={priority}
                          onChange={handlePriorityChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="P1">P1</option>
                          <option value="P2">P2</option>
                          <option value="P3">P3</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="status"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Status
                        </label>
                        <select
                          id="priority"
                          value={status}
                          onChange={handleStatusChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value='0'>Not yet started</option>
                          <option value="1">Progress</option>
                          <option value="2">Completed</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="status"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Due Date
                        </label>
                        <input
                          type="date"
                          id="status"
                          value={date}
                          onChange={handleDateChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
