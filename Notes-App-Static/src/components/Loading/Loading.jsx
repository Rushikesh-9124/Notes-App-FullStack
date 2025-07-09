import React from 'react'

const Loading = () => {
  return (
    <div className='h-[100vh] w-full flex justify-center items-center'>
      <div className="w-30 h-30  rounded-full border-3 border-black border-t-red-700 animate-spin"></div>
    </div>
  )
}

export default Loading
