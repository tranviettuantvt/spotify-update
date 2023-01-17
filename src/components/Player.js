import React, { useContext, useEffect, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { Songs } from "../context";
import "./PLayer.css";

export default function Player() {
  const { song, handleSetSong, DataSongs, isPlaying, setIsPlaying, audioElem } =
    useContext(Songs);

  const progress=document.querySelector('#progress')
  const audioStart=document.querySelector('.play_start')

// handle play/pause, next prev end song
  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (song.id >= DataSongs.length - 1) {
      handleSetSong(0);
    } else {
      handleSetSong(song.id + 1);
    }
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    if (!song.id) {
      handleSetSong(DataSongs.length - 1);
    } else {
      handleSetSong(song.id - 1);
    }
    setIsPlaying(true);
  };

  const endSong=() => {
    handleNextSong()
  }
// ------------------------------------------

// Set currentTime and duration
  function timeFormat(seconds) {
    var minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    var seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  const [currentTime, setCurrentTime] = useState(
    timeFormat(audioElem.current.currentTime.toFixed(2))
  );
  const [duration, setDuration] = useState(
    timeFormat(audioElem.current.duration.toFixed(2))
  );

  const loadTime = () => {
    setCurrentTime(timeFormat(audioElem.current.currentTime.toFixed(2)));
    setDuration(timeFormat(audioElem.current.duration.toFixed(2)));
  };
  // ------------------------------------------

// ontimeupdate and seek the bar
  const timeUpdate=() => {
    if(audioElem.current.duration){
      const progressPercent=Math.floor(audioElem.current.currentTime / audioElem.current.duration * 100);
      progress.value=progressPercent;
      audioStart.textContent = timeFormat(audioElem.current.currentTime.toFixed(2))
    }
  }

  const changeCurrentTime=() => {
    audioElem.current.currentTime= progress.value * audioElem.current.duration / 100;
  }


  
  return (
    <div className="h-24 flex justify-between bg-zinc-800 p-2 items-center c">
      <div className="p-2 w-[20%]">
        <h4 className="text-white mb-2 text-xl truncate">{song.name}</h4>
        <h5 className="text-zinc-500">{song.author}</h5>
      </div>
      <div className="w-[60%] text-white">
        <div className="flex justify-evenly mb-2 text-xl">
          <div className="btn-repeat ">
            <i className="fa-solid fa-repeat"></i>
          </div>

          <div
            className="btn-backward"
            onClick={() => {
              handlePrevSong();
            }}
          >
            <i className="fa-solid fa-backward-step"></i>
          </div>

          <div
            className={`btn-play ${isPlaying && "active"}`}
            onClick={PlayPause}
          >
            <i className="btn_play--playing fa-solid fa-play"></i>
            <i className="btn_play--pause fa-solid fa-pause"></i>
          </div>

          <div
            className="btn-forward"
            onClick={() => {
              handleNextSong();
            }}
          >
            <i className="fa-solid fa-forward-step"></i>
          </div>

          <div className="btn-random">
            <i className="fa-solid fa-shuffle"></i>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span class="play_start">{currentTime}</span>
          <input
            className="mx-2 mt-[2px]"
            id="progress"
            type="range"
            min="0"
            max="100"
            step="1"
            value="0"
            onChange={changeCurrentTime}
          />
          <span class="play_finish">{duration}</span>
        </div>
      </div>

      <div className="text-white w-[20%] justify-center flex items-center">
        <i className=" fa-sharp fa-solid fa-volume-high mr-1"></i>
        <input
          className="w-[50%px]"
          type="range"
          id="volume"
          min="0"
          max="100"
          step="1"
        />
      </div>

      <audio
        ref={audioElem}
        id="audio"
        src={song.url}
        onLoadedData={loadTime}
        onTimeUpdate={timeUpdate}
        onEnded={endSong}
      ></audio>
    </div>
  );
}
