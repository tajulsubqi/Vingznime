"use client"

import { useState } from "react"
import YouTube from "react-youtube"

const VideoPlayer = ({ youtubeId }) => {
  const [isOpen, setIsOpen] = useState(true)

  const option = {
    width: "300",
    height: "250",
  }

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-2 right-2">
          <button
            onClick={() => setIsOpen((prevState) => !prevState)}
            className="text-primary float-right bg-red-500 hover:bg-red-400 transition duration-300 rounded mb-1 px-3 font-bold"
          >
            X
          </button>

          <YouTube
            videoId={youtubeId}
            onReady={(e) => e.target.pauseVideo()}
            opts={option}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-slate-300 hover:bg-accent duration-300 transition px-3 py-1 border-slate-700 font-semibold rounded"
        >
          Tonton Trailer
        </button>
      )}
    </>
  )
}

export default VideoPlayer
