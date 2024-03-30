const toggle = document.querySelector(".toggle");
const detail = document.querySelector(".details");
let LSkey = "music";
let musicIndex = 1;
toggle.addEventListener("click", () => {
  if (
    toggle.textContent === "expand_more" &&
    musicList.classList.contains("list-show")
  ) {
    detail.classList.add("hidden");
    toggle.textContent = "expand_less";
    document.querySelector(".player").style.marginTop = "2rem";
    musicList.classList.add("list-show2");
  } else if (toggle.textContent === "expand_more") {
    musicList.style.bottom = "-90%";
    detail.classList.add("hidden");
    toggle.textContent = "expand_less";
    document.querySelector(".player").style.marginTop = "2rem";
  } else {
    detail.classList.remove("hidden");
    toggle.textContent = "expand_more";
    document.querySelector(".player").style.marginTop = "";
    musicList.style.bottom = "";
    musicList.classList.remove("list-show");
    musicList.classList.remove("list-show2");
  }
});

// ==================================play pause music=============================
const musicImg = document.querySelector(".detail-img img"),
  songname = document.querySelector(".song-name"),
  artis = document.querySelector(".artist"),
  audio = document.getElementById("audio"),
  playpausebtn = document.querySelector(".play-pause"),
  playpauseicon = document.querySelector(".play-pause .icon");

window.addEventListener("DOMContentLoaded", function (e) {
  playingNow();
  loadMusic(musicIndex);

  obj = { musicIndex };
  let music = getLS();
  const newMusicindex = music[0];
  let indexLs = newMusicindex.musicIndex;
  loadMusic(indexLs);
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
  addLS(musicIndex);
}
function pauseMusic() {
  mediaplayer.classList.remove("active");
  audio.pause();
  playpauseicon.textContent = "play_arrow";
  addLS(musicIndex);
}

playpausebtn.addEventListener("click", function () {
  mediaplayer.classList.contains("active") ? pauseMusic() : playMusic();

  //musiclist
  playingNow();
});

//=======================next prev button ============================//

const nextbtn = document.querySelector("#next"),
  prevbtn = document.querySelector("#prev");

nextbtn.addEventListener("click", () => {
  nextMusic();
});

function nextMusic() {
  musicIndex++;
  if (musicIndex > allMusic.length) {
    musicIndex = 1;
  } else {
    musicIndex = musicIndex;
  }
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

prevbtn.addEventListener("click", () => {
  prevMusic();
});

function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);

  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

//======================================= progres bar============//
const progressbar = document.querySelector(".progress-bar");
const current = document.querySelector(".current"), //menadapatkan waktu sekarang
  durations = document.querySelector(".durations"); //medapatkan total durasi

function addLeadingZero(number) {
  // Jika angka kurang dari 10, tambahkan 0 di depannya
  return number < 10 ? "0" + number : number;
}

//update progres bar
audio.addEventListener("timeupdate", function (e) {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressbar.style.width = `${progressWidth}%`;

  let musicCurrentTime = mediaplayer.querySelector(".current"),
    musicDuration = mediaplayer.querySelector(".durations");

  audio.addEventListener("loadeddata", () => {
    //update song total durasi
    let audioduration = audio.duration;
    let tmenit = Math.floor(audioduration / 60);
    let tdetik = Math.floor(audioduration % 60);
    // if (tdetik < 10) {
    //   tdetik = `0${tdetik}`;
    // }
    // if (tmenit < 10) {
    //   tmenit - `0${tmenit}`;
    // }

    tmenit = addLeadingZero(tmenit);
    tdetik = addLeadingZero(tdetik);
    musicDuration.innerText = `${tmenit}:${tdetik}`;
  });
  let tmenit = Math.floor(currentTime / 60);
  let tdetik = Math.floor(currentTime % 60);

  tmenit = addLeadingZero(tmenit);
  tdetik = addLeadingZero(tdetik);

  musicCurrentTime.innerText = `${tmenit}:${tdetik}`;
});

//================================membuat progresbar agar bisa di drag=============================//
const progrestArea = document.querySelector(".progress-area");

progrestArea.addEventListener("click", (e) => {
  let progressWidth = progrestArea.clientWidth; //
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = audio.duration; //getting song total duration

  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
});

//=======================================repeat music button======================//

const repeatbtn = document.querySelector("#repeat");

repeat.addEventListener("click", function () {
  let getText = repeatbtn.innerText;

  switch (getText) {
    case "repeat":
      repeatbtn.innerText = "repeat_one";
      repeatbtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatbtn.innerText = "shuffle";
      repeatbtn.setAttribute("title", "Playback shuffle");
      break;
    case "shuffle":
      repeatbtn.innerText = "repeat";
      repeatbtn.setAttribute("title", "Playlist looped");
      playingNow();
      break;
  }
});

audio.addEventListener("ended", function () {
  let getText = repeatbtn.innerText;
  console.log(repeatbtn.innerText);

  switch (getText) {
    case "repeat":
      // repeatbtn.innerText = "repeat_one";
      // repeatbtn.setAttribute("title", "Song looped");
      nextMusic();
      break;
    case "repeat_one":
      // repeatbtn.innerText = "shuffle";
      // repeatbtn.setAttribute("title", "Playback shuffle");
      audio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      // repeatbtn.innerText = "repeat";
      // repeatbtn.setAttribute("title", "Playlist looped");

      let ranIndex = Math.floor(Math.random() * allMusic.length + 1);
      do {
        ranIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (musicIndex == ranIndex);
      musicIndex = ranIndex;
      loadMusic(musicIndex);
      playMusic;
      break;
  }
});
//=====================================show music list=============================//
const mediaplayer = document.querySelector(".media-player");
const queue = document.getElementById("queue");
const musicList = document.querySelector(".music-list");
const close = document.querySelector(".close");

queue.addEventListener("click", function () {
  if (toggle.textContent === "expand_less") {
    musicList.classList.add("list-show2");
  } else {
    musicList.classList.add("list-show");
  }
});

close.onclick = function () {
  musicList.classList.remove("list-show");
  musicList.classList.remove("list-show2");
};

const contentList = document.querySelector(".content");

for (let i = 0; i < allMusic.length; i++) {
  let music = ` <li class="music" li-index="${i + 1}">
                  <div class="music-title">
                    <span class="song-name">${allMusic[i].name}</span>
                    <span class="artis">${allMusic[i].artist}</span>
                  </div>
                  <audio class="${allMusic[i].src}" src="songs/${
    allMusic[i].src
  }.mp3"></audio>
                  <span id="${allMusic[i].src}" class="music-duration"></span>
                </li>`;
  contentList.insertAdjacentHTML("beforeend", music);

  const liaudioTag = contentList.querySelector(`.${allMusic[i].src}`);
  const liduration = contentList.querySelector(`#${allMusic[i].src}`);
  liaudioTag.addEventListener("loadeddata", () => {
    //update song total durasi
    let audioduration = liaudioTag.duration;
    let tmenit = Math.floor(audioduration / 60);
    let tdetik = Math.floor(audioduration % 60);
    // if (tdetik < 10) {
    //   tdetik = `0${tdetik}`;
    // }
    // if (tmenit < 10) {
    //   tmenit - `0${tmenit}`;
    // }

    tmenit = addLeadingZero(tmenit);
    tdetik = addLeadingZero(tdetik);
    liduration.innerText = `${tmenit}:${tdetik}`;

    liduration.setAttribute("data-d", `${tmenit}:${tdetik}`);
  });
}

const allLiTag = document.querySelectorAll(".music");

function playingNow() {
  allLiTag.forEach((musics) => {
    let audiotag = musics.querySelector(".music-duration");
    let adDuration = audiotag.dataset.d;

    // const splitResult = adDuration.split("skjfs")[1].split("sdas")[0];

    // const tmenit = splitResult.slice(0, 2); // Mengambil 2 karakter pertama sebagai menit
    // const tdetik = splitResult.slice(2); // Mengambil karakter setelah menit sebagai detik

    // console.log(`${tmenit}:${tdetik}`); // Output: "03:08"

    if (musics.classList.contains("playing")) {
      musics.classList.remove("playing");
      audiotag.innerText = adDuration;
    }
    if (musics.getAttribute("li-index") == musicIndex) {
      musics.classList.add("playing");
      audiotag.innerText = "playing";
    }
    musics.setAttribute("onclick", "clicked(this)");
  });
}

function clicked(element) {
  let getliIndex = element.getAttribute("li-index");
  musicIndex = getliIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

//========================================local storage================================//

function addLS(musicIndex) {
  obj = { musicIndex };
  let music = getLS();
  const newArray = [obj];
  music = newArray;

  localStorage.setItem(LSkey, JSON.stringify(music));
}

function getLS() {
  return localStorage.getItem(LSkey)
    ? JSON.parse(localStorage.getItem(LSkey))
    : [];
}
