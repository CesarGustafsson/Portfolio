// Image array for the slideshow
const images = [
    'bilderochfiler/family.JPG', 
    'bilderochfiler/bärs.JPG',
    'bilderochfiler/upandbeyond.jpg',
    'bilderochfiler/jamesbond.jpg',
    'bilderochfiler/alkisar.jpg',
    'bilderochfiler/elefant.jpg',
    'bilderochfiler/hearts.jpg',
    'bilderochfiler/snorkel.jpg',
    'bilderochfiler/goodtimes.jpg',
    'bilderochfiler/hikes.jpg'
];

let currentIndex = 0; // Tracks the current image index
let slideshowInterval = null; // Stores the interval ID for the slideshow
let isPlaying = false; // Indicates whether the slideshow is playing

const imageElement = document.getElementById('scrollable-image'); // Image element
const playPauseIcon = document.getElementById('play-pause-icon'); // Play/Pause button
const backgroundMusic = document.getElementById('background-music'); // Background music element

// Function to update the displayed image
function updateImage(index = currentIndex + 1) {
    currentIndex = index % images.length; // Loops back when reaching the end
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // Loops back to the last image if negative
    }
    imageElement.src = images[currentIndex];
}

// Function to start/stop the slideshow and music
function toggleSlideshow() {
    if (isPlaying) {
        backgroundMusic.pause(); // Pause music
        playPauseIcon.style.animation = "rotate 5s linear"; // Smooth animation effect
        playPauseIcon.addEventListener('animationend', () => {
            playPauseIcon.src = "bilderochfiler/play.png"; // Switch back to play icon
            playPauseIcon.style.animation = "";
        }, { once: true });
        clearInterval(slideshowInterval); // Stop the slideshow
    } else {
        backgroundMusic.play(); // Play music
        slideshowInterval = setInterval(() => updateImage(), 5000); // Start slideshow
        playPauseIcon.src = "bilderochfiler/pause.png"; // Switch to pause icon
        playPauseIcon.style.animation = "rotate 5s linear infinite"; // Continuous rotation animation
    }
    isPlaying = !isPlaying;
}

// Event listener for play/pause button
playPauseIcon.addEventListener('click', toggleSlideshow);

// Event listener for keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        toggleSlideshow(); // Toggle slideshow on spacebar press
        event.preventDefault(); // Prevent page scrolling
    } else if (event.code === 'ArrowRight') {
        if (isPlaying) {
            clearInterval(slideshowInterval); // Restart timer
            updateImage(currentIndex + 1);
            slideshowInterval = setInterval(() => updateImage(), 5000);
        } else {
            updateImage(currentIndex + 1); // Next image manually
        }
        event.preventDefault();
    } else if (event.code === 'ArrowLeft') {
        if (isPlaying) {
            clearInterval(slideshowInterval);
            updateImage(currentIndex - 1); // Previous image
            slideshowInterval = setInterval(() => updateImage(), 5000);
        } else {
            updateImage(currentIndex - 1); // Previous image manually
        }
        event.preventDefault();
    }
});

// Ensures the play button is in the correct state on page load
window.addEventListener('load', () => {
    playPauseIcon.src = "bilderochfiler/play.png";
    backgroundMusic.pause();
    isPlaying = false;
});

// Navbar scroll effect (adds a border when scrolling)
document.addEventListener("scroll", function () {
    const nav = document.querySelector(".nav");
    if (window.scrollY > 0) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
