// Image array for the slideshow
const images = [
    'bilderochfiler/family.jpg', 
    'bilderochfiler/upandbeyond.jpg',
    'bilderochfiler/jamesbond.jpg',
    'bilderochfiler/alkisar.jpg',
    'bilderochfiler/elefant.jpg',
    'bilderochfiler/hikes.jpg'
];

let currentIndex = 0;           // Tracks the current image index
let slideshowInterval = null;   // Stores the interval ID for the slideshow
let isPlaying = false;          // Indicates whether the slideshow is playing

const imageElement = document.getElementById('scrollable-image');       // Bild-elementet
const playPauseIcon = document.getElementById('play-pause-icon');        // Play-/Pause-ikonen
const backgroundMusic = document.getElementById('background-music');     // Bakgrundsmusiken
const playContainer = document.querySelector('.play-button-container');   // Containern för play-/pause-knappen

// Funktion för att uppdatera den visade bilden
function updateImage(index = currentIndex + 1) {
    currentIndex = index % images.length;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    imageElement.src = images[currentIndex];
}

// Funktion för att toggla slideshow och musik
function toggleSlideshow() {
    if (isPlaying) {
        // Pausa slideshow och musik
        backgroundMusic.pause();
        clearInterval(slideshowInterval);
        isPlaying = false;
        // Visa play-ikonen (ta bort "playing"-klassen)
        playPauseIcon.src = "bilderochfiler/play.png";
        playContainer.classList.remove('playing');
    } else {
        // Starta slideshow och musik
        backgroundMusic.play();
        slideshowInterval = setInterval(() => updateImage(), 5000);
        isPlaying = true;
        // Sätt paus-ikonen (via src) och lägg på "playing"-klassen så att ikonen normalt är dold
        playPauseIcon.src = "bilderochfiler/pause.png";
        playContainer.classList.add('playing');
    }
}

// Klick på play-/pause-ikonen (eller dess container) togglar slideshow
playPauseIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Förhindra att evenemanget bubblar
    toggleSlideshow();
});
playContainer.addEventListener('click', toggleSlideshow);

// Klick på bilden pausar slideshow (om den är igång) och visar play-ikonen
imageElement.addEventListener('click', () => {
    if (isPlaying) {
        toggleSlideshow();
    }
});

// Event listener för tangentbordsnavigering
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        toggleSlideshow();
        event.preventDefault();
    } else if (event.code === 'ArrowRight') {
        if (isPlaying) {
            clearInterval(slideshowInterval);
            updateImage(currentIndex + 1);
            slideshowInterval = setInterval(() => updateImage(), 5000);
        } else {
            updateImage(currentIndex + 1);
        }
        event.preventDefault();
    } else if (event.code === 'ArrowLeft') {
        if (isPlaying) {
            clearInterval(slideshowInterval);
            updateImage(currentIndex - 1);
            slideshowInterval = setInterval(() => updateImage(), 5000);
        } else {
            updateImage(currentIndex - 1);
        }
        event.preventDefault();
    }
});

// Säkerställ att play-ikonen är korrekt vid sidladdning
window.addEventListener('load', () => {
    playPauseIcon.src = "bilderochfiler/play.png";
    backgroundMusic.pause();
    isPlaying = false;
    playContainer.classList.remove('playing');
});

// Navbar scroll-effekt (lägger till en border vid scroll)
document.addEventListener("scroll", function () {
    const nav = document.querySelector(".nav");
    if (window.scrollY > 0) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
