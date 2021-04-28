// Constants
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music Array
const tracks = [
    {
        filename: 'jacinto-1',
        trackTitle: 'Forward Dancing #1',
        artist: 'ikkä',
    },
    {
        filename: 'jacinto-2',
        trackTitle: 'Forward Dancing #2',
        artist: 'ikkä',
    },
    {
        filename: 'jacinto-3',
        trackTitle: 'Forward Dancing #3',
        artist: 'ikkä',
    },
    {
        filename: 'jacinto-4',
        trackTitle: 'Forward Dancing #4',
        artist: 'ikkae & leefa',
    }    
];

// Check if music track is playing
let isPlaying = false;

// Play
function playTrack() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
// Pause
function pauseTrack() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}
// Previous
function prevTrack() {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }
    loadTrack(tracks[trackIndex]);
    playTrack();    
}
// Next
function nextTrack() {
    trackIndex++;
    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }
    loadTrack(tracks[trackIndex]);
    playTrack();
}

// Event Listener Play or Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseTrack() : playTrack()));

// Update DOM
function loadTrack(track) {
    title.textContent = track.trackTitle;
    artist.textContent = track.artist;
    music.src = `music/${track.filename}.mp3`;
    image.src = `img/${track.filename}.jpg`;
}

// Current Track
let trackIndex = 0;

// On Load - Select first Track
loadTrack(tracks[trackIndex]);

// Update Progress Bar and time
function updateProgressBar(e) {
    if (isPlaying = true) {
        const { duration, currentTime } = e.srcElement;
        // Update the progress bar width
        const progressPercentage = currentTime / duration * 100;
        progress.style.width = `${progressPercentage}%`;        
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10 ) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate the display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10 ) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickLocation = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickLocation / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
music.addEventListener('ended', nextTrack);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);