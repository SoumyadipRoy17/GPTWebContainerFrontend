import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  console.log(location.state);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = [...Array(10)].map((_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
  }));

  return (
    <main className="h-screen w-screen flex bg-gray-100">
      <section className="left relative h-full min-w-96 flex flex-col bg-white shadow-lg border-r border-gray-300">
        <header className="flex justify-between items-center p-3 px-4 w-full bg-gray-200 shadow-md">
          <button
            className="flex gap-2 "
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <i className="ri-add-fill mr-1"></i>
            <p>Add Colaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2 text-gray-700 hover:bg-gray-300 rounded-full transition duration-300"
          >
            <i className="ri-group-fill text-lg"></i>
          </button>
        </header>
        <div className="conversation-area flex-grow flex flex-col p-3">
          <div className="message-box flex-grow flex flex-col gap-2 overflow-y-auto">
            <div className="incoming message max-w-56 flex flex-col p-3 bg-blue-100 w-fit rounded-xl shadow-md">
              <small className="opacity-65 text-xs text-gray-600">
                example@gmail.com
              </small>
              <p className="text-sm text-gray-800">
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Quis, cum
              </p>
            </div>
            <div className="ml-auto outgoing message max-w-56 flex flex-col p-3 bg-green-100 w-fit rounded-xl shadow-md">
              <small className="opacity-65 text-xs text-gray-600">
                example@gmail.com
              </small>
              <p className="text-sm text-gray-800">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
          <div className="inputField w-full flex items-center mt-3 bg-white p-2 rounded-lg shadow-inner border border-gray-300">
            <input
              className="p-2 px-4 flex-grow border-none outline-none rounded-lg text-gray-700 bg-transparent"
              type="text"
              placeholder="Enter message..."
            />
            <button className="inputField p-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
              <i className="ri-send-plane-fill text-lg"></i>
            </button>
          </div>
        </div>
        {/* <div
          className={`sidePanel flex flex-col gap-2 w-full h-full bg-slate-100 absolute transition-all  ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full "
          } top-0 `}
        >
          <header className="flex justify-end px-4 p-4 bg-slate-300">
            <button onClick={() => setIsSidePanelOpen(false)}>
              <i className="ri-close-fill"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2">
            <div className="user flex gap-2 items-center cursor-pointer hover:bg-slate-300 p-2 ">
              <div className="aspect-square rounded-full w-fit h-fit p-4 text-white flex items-center justify-center bg-slate-600">
                <i className="ri-user-fill absolute "></i>
              </div>
              <h1 className="font-semibold text-lg">username</h1>
            </div>
          </div>
        </div> */}
        <div
          className={`sidePanel flex flex-col gap-4 w-64 h-full bg-white shadow-lg absolute transition-all ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0 border-l border-gray-300`}
        >
          <header className="flex justify-between items-center px-4 py-3 bg-gray-200 shadow-md">
            <h2 className="text-md font-semibold text-gray-700">
              Collaborators
            </h2>
            <button
              onClick={() => setIsSidePanelOpen(false)}
              className="p-2 rounded-full hover:bg-gray-300 transition"
            >
              <i className="ri-close-fill text-lg"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-3 px-4 py-2 overflow-y-auto">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="user flex gap-3 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
                  <i className="ri-user-fill text-lg"></i>
                </div>
                <h1 className="font-medium text-gray-800">User {index + 1}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">Select a User</h2>
            <div className="flex flex-col gap-2 max-h-96 overflow-auto">
              {users.map((user) => (
                <button
                  key={user.id}
                  className={`p-2 rounded-md text-left ${
                    selectedUserId === user.id
                      ? "bg-blue-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <i className="ri-user-fill mr-2 text-lg text-gray-600"></i>
                  {user.name}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Add as Collaborator
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
