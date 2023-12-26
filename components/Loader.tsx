import React from 'react'

const Loader = () => {
  return (
    <div className="flex z-40 justify-center items-center w-16 h-16 rounded-full border-4 border-t-4 border-gray-200 animate-spin">
      {/* Customize the loader icon here */}
      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
    </div>
  )
}

export default Loader