import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import axiosInstance from '../../utils/axiosInstances'

const AddEditNotes = ({getAllNotes, noteData, type, onClose, showToast}) => {
  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  
  const [error, setError] = useState(null)

  const addNewNode = async() => {
    try {
      const res = await axiosInstance.post('/add-note', {
        title: title,
        content: content,
        tags: tags || []
      })
      console.log(res.data)
      if(res.data && res.data.data){
        onClose() 
        showToast("Note Added Successfully!")
        setTimeout(()=>{
          getAllNotes()
        }, 1000) 
      }
      
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        toast.error("Unable to add note!")
      }
    }
  }
  const editNode = async() => {
    try {
      const noteId = noteData?._id
      const res = await axiosInstance.put(`/edit-note/${noteId}`, {
        title, content, tags
      })
      if(res.data){
        showToast("Note Updated Successfull!")
        getAllNotes()
        onClose()
      }
    } catch (error) {
      toast.error("Unable to edit!")
    }
  }

  const handleAddNote = () => {
    if(!title){
      toast.error("Please enter the title!")
      setError("Please enter the title!")
      return
    }
    if(!content){
      toast.error("Please enter the content!")
      setError("Please enter the title!")
      return
    }
    setError(null)
    if(type == 'edit'){
      editNode()
    }
    else{
      addNewNode()
    }
  }

  return (
    <div className='relative'>
      <ToastContainer position="bottom-right" autoClose={3000}  />
      <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200 ' onClick={onClose}>
        <MdClose />
      </button>
      <div className="flex flex-col gap-2">
        <label className='input-label'>Title</label>
        <input type="text" className='text-2xl text-slate-950 outline-0 ' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Go to Gym at 5am' />
      </div>
      <div className="flex flex-col gap-2 mt-4 ">
        <label htmlFor="" className='input-label'>Content</label>
        <textarea className='tetx-sm text-slate-950 outline-none rounded bg-slate-50' placeholder='Content' value={content} onChange={(e)=>setContent(e.target.value)}  rows={10}></textarea>
      </div>
      <div className="mt-3">
        <label htmlFor="" className='input-label' >Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <button className='btn-primary font-medium mt-5 p-3 cursor-pointer' onClick={handleAddNote}>{type === 'edit' ? "Update" : "Add"}</button>

      
    </div>
  )
}

export default AddEditNotes
