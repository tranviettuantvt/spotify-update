import React, { useContext } from "react";
import { Songs } from "../context";

export default function Navbar() {
  const { searchInput, handleSearch}=useContext(Songs)
  
  return (
    <div className="relative h-24 bg-neutral-900 text-white  leading-[6rem] text-[2.5rem]">
      <div className="absolute left-[5%] md:left-[2%] xl:left-[50%] xl:translate-x-[-50%]">
        <i className="fa-brands fa-spotify mr-3  text-green-500"></i>
        <span className="font-light hidden md:inline-block">Spotify</span>
      </div>

      <div className="absolute right-0 bottom-[0.5rem]">
        <input
          className="h-[2.5rem] mr-4 md:mr-4 xl:mr-8 w-[17rem] md:w-48 bg-black pl-4 rounded-3xl text-base"
          type="text"
          placeholder="Enter song or author..."
          onChange={handleSearch}
          value={searchInput}
        />
      </div>

    </div>
  );
}
