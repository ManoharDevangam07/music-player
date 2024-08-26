const songs = [
    {
        id: 1,
        name: "Song One",
        artist: "Artist One",
        img: "https://via.placeholder.com/150",
        genre: "rock",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        name: "Song Two",
        artist: "Artist Two",
        img: "https://via.placeholder.com/150",
        genre: "pop",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        name: "Song Three",
        artist: "Artist Three",
        img: "https://via.placeholder.com/150",
        genre: "jazz",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

let currentSongIndex = 0;
let playlists = {};

function toggleTheme() {
    const body = document.body;
    body.setAttribute("data-theme", 
        body.getAttribute("data-theme") === "dark" ? "light" : "dark"
    );
}

function showSongs() {
    const songList = document.getElementById("songList");
    const genreFilter = document.getElementById("genreFilter").value;
    songList.innerHTML = "";
    songs.filter(song => !genreFilter || song.genre === genreFilter)
         .forEach(song => {
            const li = document.createElement("li");
            li.textContent = `${song.name} - ${song.artist}`;
            li.onclick = () => playSong(song.id);
            songList.appendChild(li);
        });
}

function renderCurrentSong() {
    const song = songs[currentSongIndex];
    document.getElementById("songImage").src = song.img;
    document.getElementById("songName").textContent = song.name;
    document.getElementById("songArtist").textContent = song.artist;
    document.getElementById("audioPlayer").src = song.source;
    document.querySelectorAll("#songList li")
        .forEach((li, index) => li.classList.toggle("playing", index === currentSongIndex));
}

function playSong(songId) {
    currentSongIndex = songs.findIndex(song => song.id === songId);
    renderCurrentSong();
    document.getElementById("audioPlayer").play();
    document.getElementById("playPauseBtn").innerHTML = `<i class="fas fa-pause"></i>`;
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong();
    document.getElementById("audioPlayer").play();
    document.getElementById("playPauseBtn").innerHTML = `<i class="fas fa-pause"></i>`;
}

function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong();
    document.getElementById("audioPlayer").play();
    document.getElementById("playPauseBtn").innerHTML = `<i class="fas fa-pause"></i>`;
}

function togglePlayPause() {
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById("playPauseBtn").innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
        audioPlayer.pause();
        document.getElementById("playPauseBtn").innerHTML = `<i class="fas fa-play"></i>`;
    }
}

function createPlaylist() {
    const playlistName = document.getElementById("newPlaylist").value.trim();
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        const li = document.createElement("li");
        li.textContent = playlistName;
        li.onclick = () => viewPlaylist(playlistName);
        document.getElementById("playlists").appendChild(li);
        document.getElementById("newPlaylist").value = '';
    }
}

function addToPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName && playlists[playlistName]) {
        playlists[playlistName].push(songs[currentSongIndex]);
        alert(`Added to playlist: ${playlistName}`);
    } else {
        alert("Playlist does not exist. Please create a playlist first.");
    }
}

function viewPlaylist(playlistName) {
    const playlist = playlists[playlistName];
    const songList = document.getElementById("songList");
    songList.innerHTML = "";
    playlist.forEach(song => {
        const li = document.createElement("li");
        li.textContent = `${song.name} - ${song.artist}`;
        li.onclick = () => playSong(song.id);
        songList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showSongs();
    renderCurrentSong();
});
