import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Button } from "./components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { SONGS } from "./songs";
import { Play } from "lucide-react";
import { SkipBack } from "lucide-react";
import { SkipForward } from "lucide-react";
import { Pause } from "lucide-react";

function App() {
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [playQueue, setPlayQueue] = useState([]);
  const [paused, setPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const audioElm = useRef(null);

  const resolveSongFileName = (song) => {
    const fileName = `${song?.title.trim().replaceAll(" ", "_")}_${song?.artist
      .trim()
      .replaceAll(" ", "_")}.mp3`;
    return fileName;
  };
  const resoleCoverFileName = (song) => {
    const coverFile = `${song?.title.trim().replaceAll(" ", "_")}.jpg`;
    return coverFile;
  };
  const changeSong = (direction, fromListener = false) => {
    setTime(0);
    setProgress(0);
    if (direction === "prev") setCurrentSong(playQueue[0]);
    else if (direction === "next")
      setCurrentSong(playQueue[fromListener ? 3 : 2]);

    const autoPlayOnTrackChange = () => {
      audioElm.current.play();
      audioElm.current.removeEventListener("loadeddata", autoPlayOnTrackChange);
    };
    if (!paused || !direction)
      audioElm.current.addEventListener("loadeddata", autoPlayOnTrackChange);

    if (fromListener) {
      audioElm.current.addEventListener("loadeddata", autoPlayOnTrackChange);
    }
  };
  const selectSong = (song) => {
    setCurrentSong(song);
    changeSong();
    setDrawerOpen(false);
  };
  const parseTime = (time) => {
    let seconds = String(Math.floor(time % 60)).padStart(2, "0");
    let minutes = String(Math.floor((time / 60) % 60)).padStart(2, "0");
    let hours = String(Math.floor((time / 3600) % 24)).padStart(2, "0");
    return `${time > 3600 ? hours + " : " : ""}${minutes} : ${seconds}`;
  };

  useEffect(() => {
    if (!currentSong) return;
    const currentIndex = SONGS.findIndex(
      (song) =>
        song.title === currentSong.title && song.title === currentSong.title
    );
    const prevIndex = currentIndex === 0 ? SONGS.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === SONGS.length - 1 ? 0 : currentIndex + 1;
    const nextIndex2 =
      currentIndex === SONGS.length - 2
        ? 0
        : currentIndex === SONGS.length - 1
        ? 1
        : currentIndex + 2;
    const newQueue = [
      SONGS[prevIndex],
      SONGS[currentIndex],
      SONGS[nextIndex],
      SONGS[nextIndex2],
    ];
    setPlayQueue(newQueue);
  }, [currentSong]);

  useEffect(() => {
    const ended = () => {
      changeSong("next", true);
      audioElm.current.removeEventListener("ended", ended);
    };
    audioElm.current.addEventListener("ended", ended);
  }, [playQueue]);

  useEffect(() => {
    if (!audioElm.current) return;
    let audio = audioElm.current;
    audio.addEventListener("play", () => setPaused(false));
    audio.addEventListener("pause", () => setPaused(true));
    audio.addEventListener("timeupdate", () => {
      setProgress(100 * (audio.currentTime / audio.duration));
      setTime(audio.currentTime);
    });
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
  }, []);

  useEffect(() => {
    if (paused) audioElm.current.pause();
    else audioElm.current.play();
  }, [paused]);

  const songsDOM = SONGS.map((song, i) => {
    return (
      <div
        key={i + Math.random()}
        onClick={() => selectSong(song)}
        className="song bg-[#0001] w-full sm:w-3/4 flex flex-col hover:bg-[#fff1] bg-red-300 even:saturate-50 py-5 px-2"
      >
        <h2>{song?.title}</h2>
        <h4 className="text-sm">{song?.artist}</h4>
      </div>
    );
  });
  return (
    <div className="app bg-sky-400 h-dvh w-screen">
      <img
        className={`fixed inset-1/2 -translate-1/2 scale-300 blur-sm cover-pic h-full object-cover rounded-lg`}
        src={"/posters/" + resoleCoverFileName(currentSong)}
        alt={currentSong?.title + "-cover"}
        style={{ opacity: 0.3 + 0.45 * (1 - time / duration) }}
      />
      <div className="player relative h-full flex flex-col items-center justify-start pt-20 sm:pt-5">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger>
            <div className="playlist bg-red-300 px-3 py-1">playlist</div>
          </DrawerTrigger>
          <DrawerContent className="backdrop-blur-3xl bg-transparent">
            <DrawerHeader>
              <DrawerTitle className="text-white">Playlist</DrawerTitle>
              <DrawerDescription>listen... and disappear...</DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-scroll py-2 songs-dom w-full flex flex-col items-center">
              {songsDOM}
            </div>
          </DrawerContent>
        </Drawer>
        <div className="song-dom flex flex-col gap-5 items-center p-1">
          <h2>
            {currentSong?.title} - {currentSong?.artist}
          </h2>
          <div className="pic p-3 w-50 aspect-square sm:w-100">
            <img
              className="cover-pic w-full object-cover rounded-lg"
              src={"/posters/" + resoleCoverFileName(currentSong)}
              alt={currentSong?.title + "-cover"}
              style={{ boxShadow: "0 0 10px red" }}
            />
          </div>
          <audio
            ref={audioElm}
            src={"/songs/" + resolveSongFileName(currentSong)}
          />
        </div>
        <div className="controls absolute bottom-0 w-full max-w-100 p-2 bg-red-300 flex flex-col gap-3">
          <div className="progress w-full">
            <div className="time w-full flex flex-row justify-between *:text-sm *:font-mono">
              <span>{parseTime(time)}</span>
              <span>{parseTime(duration)}</span>
            </div>
            <Slider
              value={[progress]}
              onValueChange={(e) =>
                (audioElm.current.currentTime = (duration * e[0]) / 100)
              }
              defaultValue={[0]}
              max={100}
              step={0.001}
              className="bg-sky-300"
            />
          </div>
          <div className="media-buttons w-full flex flex-row items-center justify-center gap-5 *:bg-sky-300 *:text-sky-900">
            <Button onClick={() => changeSong("prev")}>
              <SkipBack />
            </Button>
            <Button onClick={() => setPaused(!paused)}>
              {paused ? <Play /> : <Pause />}
            </Button>
            <Button onClick={() => changeSong("next")}>
              <SkipForward />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
