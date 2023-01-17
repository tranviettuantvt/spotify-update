import { useEffect, useRef, useState } from "react";
import "./App.css";
import DetailSong from "./components/DetailSong";
import ListSong from "./components/ListSong";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import { Songs } from "./context";
import DataSongs from "./data/songs.json";

function App() {
  const [song, setSong] = useState(DataSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [idSong, setIdSong] = useState(song.id);

  const thumbnail = useRef();
  const audioElem = useRef(new Audio(DataSongs[0].url));

  // Set song when click
  const handleSetSong = (songId) => {
    const song = DataSongs.find((song) => song.id === songId);
    console.log(song.id, "handleSetSong");
    setSong(song);
  };
  // -------------------------------------

  // handle scroll Song to view event and thumbnail rotate
  useEffect(() => {
    const a = document.querySelector("tr.active");
    if (a) {
      a.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    console.log(song.id, "scrollIntoView");
  }, [song]);

  useEffect(() => {
    const cdRotate = thumbnail.current.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    cdRotate.pause();
    audioElem.current.onplay = () => {
      cdRotate.play();
    };
    audioElem.current.onpause = () => {
      cdRotate.pause();
    };
  }, []);
  // --------------------------------------------

  // handle play song when click button
  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [song, isPlaying]);

  return (
    <div className="App">
      <Songs.Provider
        value={{
          DataSongs,
          song,
          handleSetSong,
          thumbnail,
          isPlaying,
          setIsPlaying,
          audioElem,
          isRepeat,
          setIsRepeat,
          isRandom,
          setIsRandom,
          idSong,
          setIdSong,
        }}
      >
        <Navbar />
        <div className="grid grid-cols-3 bg-neutral-900 h-screen-navbar-player overflow-hidden">
          <DetailSong />
          <ListSong />
        </div>
        <Player />
      </Songs.Provider>
    </div>
  );
}

export default App;
