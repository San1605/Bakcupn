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
    dispatch({
      type: "addSuggestions",
      payload: [],
    });
    let toastId;
    setLoading(true);
    let flag = false;
    if (
      window.location.pathname.includes("/ai_converser")
        ? appData.aiConverserChat.length - 1 == conversationId
        : appData.dataDrivenChat.length - 1 == conversationId
    ) {
      flag = true;
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
      if (appData.deleteModalOpen.index == conversationId || flag) {
        navigate(`${window.location.pathname}?new_conversation`);
      }
      toast.dismiss(toastId);
      onClose();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Some Error");
    }

    setLoading(false);
  };

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
