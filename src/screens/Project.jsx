import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket";
import { UserContext } from "../context/user.context";

const Project = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState(null);

  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const messageBox = React.createRef();

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return Array.from(newSelected);
    });
  };
  useEffect(() => {
    initializeSocket(project._id);

    receiveMessage("project-message", (data) => {
      console.log(data);
      appendIncomingMessage(data);
    });

    axios
      .get(`projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data.project);

        setProject(res.data.project);
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  const send = () => {
    console.log(user);

    sendMessage("project-message", {
      message,
      sender: user,
    });

    appendOutgoingMessage(message);

    setMessage("");
  };

  function appendIncomingMessage(messageObject) {
    const messageBox = document.querySelector(".message-box");
    const message = document.createElement("div");
    message.classList.add(
      "incoming",
      "message",
      "max-w-56",
      "flex",
      "flex-col",
      "p-3",
      "bg-blue-100",
      "w-fit",

      "rounded-xl",
      "shadow-md"
    );
    message.innerHTML = `
      <small class="opacity-65 text-xs text-gray-600">
        ${messageObject.sender.email}
        <p class='text-sm text-gray-800'>${messageObject.message}</p>
      </small> 
      `;

    messageBox.appendChild(message);
    scrollToBottom();
  }
  function appendOutgoingMessage(message) {
    const messageBox = document.querySelector(".message-box");
    const newMessage = document.createElement("div");
    newMessage.classList.add(
      "message",
      "self-end", // Aligns the message to the right
      "text-right", // Ensures text inside is also right-aligned
      "ml-auto", // Pushes the message to the right side
      "max-w-56",
      "flex",
      "flex-col",
      "p-3",
      "bg-green-100",
      "text-gray-800",
      "w-fit",
      "rounded-xl",
      "shadow-md"
    );
    newMessage.innerHTML = `
      <small class="opacity-65 text-xs text-gray-600">
        ${user.email}
        <p class='text-sm text-gray-800'>${message}</p>
      </small> 
      `;

    messageBox.appendChild(newMessage);
    scrollToBottom();
  }

  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }

  return (
    <main className="h-screen w-screen flex bg-gray-100">
      <section className="left relative h-screen min-w-96 flex flex-col bg-white shadow-lg border-r border-gray-300">
        <header className="flex justify-between items-center p-3 px-4 w-full bg-gray-200 shadow-md absolute z-10 top-0">
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
        <div className="conversation-area flex flex-col h-screen w-full p-4 bg-gray-100">
          {/* Message Box */}
          <div
            ref={messageBox}
            className="message-box pt-14 flex-grow flex flex-col gap-2 overflow-y-auto p-3 bg-white rounded-lg shadow-md scrollbar-hide"
          >
            {/* Incoming Message Example */}
            <div className="incoming message max-w-[75%] sm:max-w-[60%] p-3 bg-blue-100 rounded-lg shadow-md">
              <small className="opacity-65 text-xs text-gray-600">
                example@gmail.com
              </small>
              <p className="text-sm text-gray-800">
                Hello Devs.. This is your chatroom !
              </p>
            </div>

            {/* Outgoing Message Example */}
            <div className="outgoing message ml-auto max-w-[75%] sm:max-w-[60%] p-3 bg-green-100 rounded-lg shadow-md text-right">
              <small className="opacity-65 text-xs text-gray-600">
                example@gmail.com
              </small>
              <p className="text-sm text-gray-800">
                Feel free to discuss anything here, you can also ask our ai bot
                !
              </p>
            </div>
          </div>

          {/* Input Field */}
          <div className="inputField w-full flex items-center bg-white p-3 rounded-lg shadow-md border border-gray-300 sticky bottom-0">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 flex-grow border-none outline-none rounded-lg text-gray-700 bg-transparent"
              type="text"
              placeholder="Enter message..."
            />
            <button
              onClick={send}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
            >
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
        {/* Side Panel */}
        <div
          className={`sidePanel flex flex-col gap-4 w-64 h-full bg-white shadow-lg absolute transition-all ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0 border-l border-gray-300`}
        >
          <header className="flex justify-between items-center px-4 py-3 bg-gray-200 shadow-md">
            <h1 className="text-md font-semibold text-gray-700">
              Collaborators
            </h1>
            <button
              onClick={() => setIsSidePanelOpen(false)}
              className="p-2 rounded-full hover:bg-gray-300 transition"
            >
              <i className="ri-close-fill text-lg"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-3 px-4 py-2 overflow-y-auto">
            {project.users &&
              project.users.map((user) => (
                <div
                  key={user._id}
                  className="user flex gap-3 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
                    <i className="ri-user-fill text-lg"></i>
                  </div>
                  <h1 className="font-medium text-gray-800">{user.email}</h1>
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
                <div
                  key={user._id}
                  className={`p-2 cursor-pointer rounded-md text-left ${
                    Array.from(selectedUserId).indexOf(user._id) != -1
                      ? "bg-blue-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <i className="ri-user-fill mr-2 text-lg text-gray-600"></i>
                  {user.email}
                </div>
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
                onClick={() => {
                  addCollaborators();
                  setIsModalOpen(false);
                }}
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
