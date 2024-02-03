import React, { useState, useEffect } from "react";
import "./DeleteConfirmationModal.css";
import CROSS_ICON from "../../assets/crossIcon.svg";
import { deleteConversation } from "../../utils/services/api";
import { AppContext } from "../../utils/Context/AppContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
const DeleteConfirmationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { appData, dispatch } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [loading, setLoading] = useState("");
  const [searchParams] = useSearchParams();
  let conversationId = searchParams.get("conversation_id");
  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleDelete = async () => {
    let toastId;
    setLoading(true);
    let flag = false;
    // console.log(appData.dataDrivenChat.length - 1 == conversationId);
    if (
      window.location.pathname.includes("/ai_converser")
        ? appData.aiConverserChat.length - 1 == conversationId
        : appData.dataDrivenChat.length - 1 == conversationId
    ) {
      // window.location.reload();
      flag = true;
      // console.log(flag, "flag");
    }
    try {
      toastId = toast.loading("loading...");
      let response = await deleteConversation(
        appData.deleteModalOpen.deleteConversationId,
        window.location.pathname === "/ai_converser"
          ? "ai_driven"
          : "data_driven"
      );
      await appData.getConvo();
      // console.log(
      //   appData.deleteModalOpen.deleteConversationId, conversationId, appData.deleteModalOpen.deleteConversationId == conversationId,"pqpqpq"
      // );
      // console.log(
      //   appData.deleteModalOpen.index,
      //   conversationId,
      //   flag,
      //   "[[[]]]]"
      // );
      if (appData.deleteModalOpen.index == conversationId || flag) {
        navigate(`${window.location.pathname}?new_conversation`);
      }
      toast.dismiss(toastId);
      onClose();
      // console.log(response);
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Some Error");
      // console.log(err);
    }

    setLoading(false);
  };
  useEffect(() => {}, []);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto transition-opacity ${
        modalOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="modal-container pb-12 sm:pb-0">
          <div className="modal-content sm:w-[40%] sm:max-w-[80%] w-[90%] sm:mx-auto my-0 mx-0">
            <div className="modal-header flex items-center justify-between px-6 py-3 border-b-[1px] border-[#E1E1E1]">
              <h1 className="text-md font-medium text-[#242424]">Clear Chat</h1>
              <img
                className="cursor-pointer"
                src={CROSS_ICON}
                alt=""
                onClick={closeModal}
              />
            </div>
            <div className="modal-body">
              <div className="inner py-2 px-6">
                <p className="sm:w-[80%] w-full text-md">
                  This will delete the conversation, and
                  <span className="font-medium ps-1">End the session.</span>
                </p>
              </div>
              <div className="btn-cont flex px-5 py-4 justify-end gap-[15px]">
                <button
                  className=" text-sm rounded-[3px] px-[12px] py-[6px] border-[1px] border-[#E1E1E1] text-[#424242]"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className=" text-sm rounded-[3px] px-[12px] py-[6px] bg-[#DC1212] text-white"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;







// import React, { useState, useEffect } from "react";
// import CROSS_ICON from "../../assets/crossIcon.svg";
// import { deleteConversation } from "../../utils/services/api";
// import { AppContext } from "../../utils/Context/AppContext";
// import { useContext } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const DeleteConfirmationModal = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const { appData, dispatch } = useContext(AppContext);
//   const [modalOpen, setModalOpen] = useState(isOpen);
//   const [loading, setLoading] = useState("");
//   const [searchParams] = useSearchParams();
//   let conversationId = searchParams.get("conversation_id");

//   const closeModal = () => {
//     setModalOpen(false);
//     onClose();
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         right: 0,
//         bottom: 0,
//         left: 0,
//         zIndex: 50,
//         overflow: "auto",
//         transition: "opacity 0.3s",
//         opacity: modalOpen ? 1 : 0,
//         pointerEvents: modalOpen ? "auto" : "none",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div
//           style={{
//             paddingBottom: "12px",
//             maxWidth: "80%",
//           }}
//         >
//           <div
//             style={{
//               maxWidth: "40%",
//               width: "90%",
//               margin: "0 auto",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "6px",
//                 borderBottom: "1px solid #E1E1E1",
//               }}
//             >
//               <h1
//                 style={{
//                   fontSize: "14px",
//                   fontWeight: "bold",
//                   color: "#242424",
//                 }}
//               >
//                 Clear Chat
//               </h1>
//               <img
//                 src={CROSS_ICON}
//                 alt=""
//                 style={{
//                   cursor: "pointer",
//                 }}
//                 onClick={closeModal}
//               />
//             </div>
//             <div
//               style={{
//                 padding: "2px",
//               }}
//             >
//               <p
//                 style={{
//                   width: "80%",
//                   fontSize: "14px",
//                 }}
//               >
//                 This will delete the conversation, and
//                 <span
//                   style={{
//                     fontWeight: "bold",
//                     paddingLeft: "1px",
//                   }}
//                 >
//                   End the session.
//                 </span>
//               </p>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 padding: "5px",
//                 justifyContent: "flex-end",
//                 gap: "15px",
//               }}
//             >
//               <button
//                 style={{
//                   fontSize: "12px",
//                   borderRadius: "3px",
//                   padding: "6px 12px",
//                   border: "1px solid #E1E1E1",
//                   color: "#424242",
//                 }}
//                 onClick={closeModal}
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{
//                   fontSize: "12px",
//                   borderRadius: "3px",
//                   padding: "6px 12px",
//                   backgroundColor: "#DC1212",
//                   color: "white",
//                 }}
//                 onClick={handleDelete}
//                 disabled={loading}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmationModal;
