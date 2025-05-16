// Image array for the slideshow
const images = [ 
    'bilderochfiler/cv.bild.main.museet.transparent.png', 
    'bilderochfiler/family.JPG', 
    'bilderochfiler/upandbeyond.jpg',
    'bilderochfiler/jamesbond.jpg',
    'bilderochfiler/alkisar.jpg',
    'bilderochfiler/elefant.jpg',
    'bilderochfiler/hikes.jpg'
];

let currentIndex = 0;           // Tracks the current image index
let slideshowInterval = null;   // Stores the interval ID for the slideshow
let isPlaying = false;          // Indicates whether the slideshow is playing

const imageElement    = document.getElementById('scrollable-image');
const playPauseIcon   = document.getElementById('play-pause-icon');
const backgroundMusic = document.getElementById('background-music');
const playContainer   = document.querySelector('.play-button-container');

// Uppdaterar bilden baserat på index (eller nästa om inget anges)
function updateImage(index) {
    if (index === undefined) {
        index = currentIndex + 1;
    }
    currentIndex = ((index % images.length) + images.length) % images.length;
    imageElement.src = images[currentIndex];
}

// Toggle-funktion för slideshow + musik
function toggleSlideshow() {
    if (isPlaying) {
        // Pausa
        backgroundMusic.pause();
        clearInterval(slideshowInterval);
        isPlaying = false;
        playPauseIcon.src = "bilderochfiler/play.png";
        playContainer.classList.remove('playing');
    } else {
        // Starta
        backgroundMusic.play();
        isPlaying = true;
        playPauseIcon.src = "bilderochfiler/pause.png";
        playContainer.classList.add('playing');

        // Starta intervallet först efter 5s – då byter den från currentIndex (0) till nästa
        slideshowInterval = setInterval(() => updateImage(), 5000);
    }
}

// Event-listeners
playPauseIcon.addEventListener('click', e => {
    e.stopPropagation();
    toggleSlideshow();
});
playContainer.addEventListener('click', toggleSlideshow);

imageElement.addEventListener('click', () => {
    if (isPlaying) toggleSlideshow();
});

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        toggleSlideshow();
        event.preventDefault();
    }
    if (event.code === 'ArrowRight') {
        clearInterval(slideshowInterval);
        updateImage(currentIndex + 1);
        if (isPlaying) slideshowInterval = setInterval(() => updateImage(), 5000);
        event.preventDefault();
    }
    if (event.code === 'ArrowLeft') {
        clearInterval(slideshowInterval);
        updateImage(currentIndex - 1);
        if (isPlaying) slideshowInterval = setInterval(() => updateImage(), 5000);
        event.preventDefault();
    }
});

// Init vid sidladdning
window.addEventListener('load', () => {
    // Visa första bilden (museet)
    imageElement.src = images[0];
    playPauseIcon.src   = "bilderochfiler/play.png";
    backgroundMusic.pause();
    isPlaying = false;
    playContainer.classList.remove('playing');
});

// Navbar scroll-effekt
document.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("scrolled", window.scrollY > 0);
});
