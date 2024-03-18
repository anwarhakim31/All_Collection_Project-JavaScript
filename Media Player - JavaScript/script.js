import { allMusic } from "./music-list";

const mediaplayer = document.querySelector(".media-player");
const queue = document.getElementById("queue");
const musicList = document.querySelector(".music-list");
const close = document.querySelector(".close");
let LSkey = "music";

queue.addEventListener("click", function () {
  musicList.classList.add("list-show");
});

close.onclick = function () {
  musicList.classList.remove("list-show");
};

const toggle = document.querySelector(".toggle");
const detail = document.querySelector(".details");

toggle.addEventListener("click", () => {
  if (toggle.textContent === "expand_more") {
    detail.classList.add("hidden");
    toggle.textContent = "expand_less";
    document.querySelector(".player").style.marginTop = "2rem";
  } else {
    detail.classList.remove("hidden");
    toggle.textContent = "expand_more";
    document.querySelector(".player").style.marginTop = "";
  }
});

const musicImg = document.querySelector(".detail-img img"),
  songname = document.querySelector(".song-name"),
  artis = document.querySelector(".artist"),
  audio = document.getElementById("audio"),
  playpausebtn = document.querySelector(".play-pause"),
  playpauseicon = document.querySelector(".play-pause .icon");

// ==================================play pause music=============================

let musicIndex = 1;

window.addEventListener("DOMContentLoaded", function (e) {
  loadMusic(musicIndex);
});

function loadMusic(indexnumb) {
  musicImg.src = `images/${allMusic[indexnumb - 1].img}.jpg`;
  songname.innerHTML = allMusic[indexnumb - 1].name;
  artis.innerHTML = allMusic[indexnumb - 1].artist;
  audio.src = `songs/${allMusic[indexnumb - 1].src}.mp3`;
}

function playMusic() {
  mediaplayer.classList.add("active");
  audio.play();
  playpauseicon.textContent = "pause";
}

function pauseMusic() {
  mediaplayer.classList.remove("active");
  audio.pause();
  playpauseicon.textContent = "play_arrow";
}

playpausebtn.addEventListener("click", function () {
  mediaplayer.classList.contains("active") ? pauseMusic() : playMusic();
});

//=======================next prev button ============================//

const nextbtn = document.querySelector("#next"),
  prevbtn = document.querySelector("#prev");

nextbtn.addEventListener("click", () => {
  musicIndex++;
  if (musicIndex > allMusic.length) {
    musicIndex = 1;
  } else {
    musicIndex = musicIndex;
  }
  loadMusic(musicIndex);
  playMusic();
});

prevbtn.addEventListener("click", () => {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);

  loadMusic(musicIndex);
  playMusic();
});

//=======================================repeat music button======================//

const repeatbtn = document.querySelector("#repeat");

repeatbtn.addEventListener("click", function () {
  audio.currentTime = 0;
});

//=======================================show all music to music list============//
import { allmusic } from "music-list.js";

console.log(allMusic);

// const contentList = document.querySelector('.content')

// for (let i = 0;i>allMusic.length)

// function addLS(musicImg, songname, artis) {
//   obj = { musicImg, songname, artis };
//   music = getLS();

//   music.push(obj);

//   localStorage.setItem(LSkey, JSON.stringify(music));
// }

// function getLS() {
//   return localStorage.getItem(LSkey)
//     ? JSON.parse(localStorage.getItem(LSkey))
//     : [];
// }
