import React, { useContext, useEffect, useState } from "react";
import { Songs } from "../context";
import "./ListSong.css";

export default function ListSong() {
  const { DataSongs, handleSetSong, song, setIsPlaying, idSong, setIdSong } = useContext(Songs);

  const handleClickSong = (songId) => {
    setIdSong(songId);
    handleSetSong(songId);
    setIsPlaying(true);
  };

  useEffect(() => {
    setIdSong(song.id);
  }, [song]);

  return (
    <div className="col-span-2 listSong-scroll mr-2 mb-4">
      <table className="table-auto w-full ">
        <thead className="text-xl text-white h-12 ">
          <tr className="">
            <th className="w-[15%]">#</th>
            <th className="text-left">Title</th>
            <th className="text-left w-[15%]">Author</th>
            <th className="w-[15%]">
              {/* <i className="fa fa-download"></i> */}
              Download
            </th>
          </tr>
        </thead>
        <tbody className="text-[16px] text-white">
          {DataSongs.map((song, index) => (
            <tr
              key={index}
              className={`border-b border-neutral-700 h-12 hover:bg-zinc-800 hover:text-green-500 
              ${idSong === song.id && "bg-zinc-800 text-green-500 active"}`}
              onClick={() => {
                handleClickSong(song.id);
              }}
            >
              <td className="text-center">{index + 1}</td>
              <td>{song.name}</td>
              <td className="text-left">{song.author}</td>
              <td className="text-center">
                <a href={song.url}>
                  <i className="fa fa-download"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
