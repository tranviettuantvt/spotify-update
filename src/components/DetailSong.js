import React, { useContext, useEffect, useRef } from "react";
import { Songs } from "../context";
import "./DetailSong.css";

export default function DetailSong() {
  const { song, thumbnail } = useContext(Songs);

  return (
    <div className=" col-span-3 md:col-span-1 ml-4 mr-4 md:mr-10 mb-4 pt-2">
      <div className="relative h-40 md:h-full">
        <img
          className="w-full h-full image-under rounded"
          src={song.links.images[1].url}
          alt="avatar"
        />

        <div className="image-above">
          <div className="w-[50%] md:w-[80%] md:text-center md:mx-auto mt-[-4px] md:mt-0">
            <h2 className="text-green-500 font-bold text-xl md:text-2xl mb-1 md:mb-2">
              Now Playing
            </h2>
            <h2 className="text-white trunConfig text-base md:text-2xl">{song.name}</h2>
            <h3 className="mt-1 md:mt-0 text-sm md:text-xl text-slate-200">{song.author}</h3>
          </div>
          <div className="w-[39%] md:w-[80%] xl:h-[66%] md:mt-8 md:mx-auto">
            <img
              ref={thumbnail}
              className="w-full h-full rounded-full"
              src={song.links.images[0].url}
              alt="avatar"
            />
          </div>
        </div>
      </div>

      {/* <div className="flex justify-evenly items-center mt-10">
        <img
          className="w-[70px] rounded-full"
          src="https://wallpaperaccess.com/full/5574864.jpg"
          alt="avatar2"
        />
        <span className="text-xl text-white">Alan Walker</span>
      </div> */}
    </div>
  );
}
