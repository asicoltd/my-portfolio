// Get the current timestamp
const timestamp = new Date().getTime();

// Check if timestamp is positive or negative and change the video source
const videoSource = document.getElementById('video-source');
videoSource.src = 'bgv2.mp4';

// Reload the video to reflect the change in the source
const video = document.getElementById('bg-video');
video.load();
window.addEventListener('load', function () {
    var audio = document.getElementById('backgroundMusic');
    if (audio.paused) {
        audio.play();
    }
});
// JavaScript to handle toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#experience ul').forEach(ul => {
        // Add initial collapsed state
        ul.classList.add('collapsed');

        ul.addEventListener('click', function (e) {
            // Toggle active state
            this.classList.toggle('active');
            this.classList.toggle('collapsed');

            // Collapse other items if needed (optional)
            // document.querySelectorAll('#experience ul').forEach(otherUl => {
            //     if (otherUl !== this) {
            //         otherUl.classList.remove('active');
            //         otherUl.classList.add('collapsed');
            //     }
            // });
        });
    });
});

