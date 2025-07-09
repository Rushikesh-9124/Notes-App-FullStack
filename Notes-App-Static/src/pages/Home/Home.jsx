import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Notecard from "../../components/Cards/Notecard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import moment from "moment";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstances";
import axios from "axios";
import Toast from "../../components/ToastMessage/Toast";
import Loading from "../../components/Loading/Loading";
import EmptyCard from "../../components/Cards/EmptyCard";
Modal.setAppElement("#root");

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShow: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/get-user");
      if (res.data && res.data.user) {
        setUserInfo(res.data.user);
      }
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const showToast = (message, type) => {
    setShowToastMessage({
      isShow: true,
      message: message,
      type: type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMessage({
      isShow: false,
      message: "",
    });
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const getAllNotes = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/get-all-notes");
      setAllNotes(res.data?.data || []);
    } catch (error) {
      if(error && error.response){
        toast.error("Unexpected Error!");
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/delete-note/${id}`);
      if (res.data) {
        showToast("Note Deleted Successfully!", "delete");
        getAllNotes();
      }
    } catch (error) {}
  };

  const onSearchNote = async(query) => {
    try {
      const res = await axiosInstance.get('/search-notes', {
        params:{
          query
        }
      })
      console.log(res.data.notes)
      if(res.data && res.data.notes){
        setIsSearch(true)
        setAllNotes(res.data.notes)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const updateIsPinned = async(notedata) => {
    const noteId = notedata._id
    console.log(noteId)
    try {
      const res = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        isPinned: !notedata.isPinned
      })
      if(res.success ){
        showToast("Note Pinned!")
        
      }
      getAllNotes()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <div>
      <ToastContainer
        progressClassName="custom-toast"
        position="bottom-right"
        autoClose={3000}
      />
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} />
      {loading ? (
        <Loading />
      ) : (
        <div className="z-1 container mx-auto">
          {allNotes.length > 0 ? (
            <div className="grid grid-cols-1 px-5 sm:px-0 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 mb-3">
              {allNotes.length > 0 &&
                allNotes.map((item, idx) => (
                  <Notecard
                    key={idx}
                    title={item?.title}
                    date={moment(item.createdOn).format("Do MMM YYYY")}
                    content={item?.content}
                    tags={item.tags}
                    isPinned={item?.isPinned}
                    onEdit={() => handleEdit(item)}
                    id={item._id}
                    onDelete={() => handleDelete(item._id)}
                    onPinNote={()=>updateIsPinned(item)}
                  />
                ))}
            </div>
          ) : (
            <EmptyCard />
          )}
        </div>
      )}
      <button
        className="z-10 w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2b85ff] hover:bg-blue-600  fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className=" text-[32px] text-white " />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false });
        }}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel=""
        className="w-[80%] z-10 sm:w-[50%] max-h-3/4 bg-white rounded-md mx-auto p-5 mt-16   overflow-scroll"
      >
        <AddEditNotes
          showToast={showToast}
          getAllNotes={getAllNotes}
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
      <Toast
        isShow={showToastMessage.isShow}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Home;
