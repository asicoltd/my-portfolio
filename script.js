
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

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let numStars = 500;

// Function to generate a soft cosmic color
function getRandomColor() {
    const colors = ["#ffffff", "#87CEFA", "#FFD700", "#FF69B4", "#9400D3"];

    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        speed: Math.random() * 2 + 0.5,
        size: Math.random() * 3 + 0.5,
        color: getRandomColor()
    });
}

// Nebula color transitions (Soft & Smooth)
// let nebulaColors = ["#240046", "#3c096c", "#7b2cbf", "#ff006e", "#00f5d4"];
let nebulaColors = ["#23395d", "#203354", "#1c2e4a", "#192841", "#152238"];
let currentColorIndex = 0;
let prevColorIndex = nebulaColors.length - 1;
let transitionStep = 0;

// Function to draw a smooth nebula transition
function drawNebula() {
    let gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        50,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5
    );

    // Soft blend effect
    let color1 = nebulaColors[prevColorIndex];
    let color2 = nebulaColors[currentColorIndex];

    // Gradually mix between two colors (smooth fade)
    let mixRatio = transitionStep / 200; // Slow transition over ~20 seconds
    let mixedColor = blendColors(color1, color2, mixRatio);

    gradient.addColorStop(0, mixedColor);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to blend colors smoothly
function blendColors(color1, color2, ratio) {
    let c1 = parseInt(color1.substring(1), 16);
    let c2 = parseInt(color2.substring(1), 16);

    let r1 = (c1 >> 16) & 0xff, g1 = (c1 >> 8) & 0xff, b1 = c1 & 0xff;
    let r2 = (c2 >> 16) & 0xff, g2 = (c2 >> 8) & 0xff, b2 = c2 & 0xff;

    let r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    let g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    let b = Math.round(b1 * (1 - ratio) + b2 * ratio);

    return `rgb(${r}, ${g}, ${b})`;
}

// Function to update and render stars
function animateStars() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawNebula();

    for (let star of stars) {
        star.z += star.speed; // move inward
    
        if (star.z > canvas.width) {
            // Reset star to outside
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.z = 1;
            star.speed = Math.random() * 2 + 0.5;
            star.size = Math.random() * 3 + 0.5;
            star.color = getRandomColor();
        }
    
        let scale = 300 / star.z; // now they shrink as they approach center
        let starX = (star.x - canvas.width / 2) * scale + canvas.width / 2;
        let starY = (star.y - canvas.height / 2) * scale + canvas.height / 2;
        let size = Math.max(0.5, scale * star.size);
    
        ctx.shadowBlur = Math.min(15, size * 3);
        ctx.shadowColor = star.color;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(starX, starY, size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animateStars);
}

// Function to gradually change nebula color every 20 seconds
function changeNebulaColor() {
    transitionStep++;

    if (transitionStep >= 200) { // Slow transition (~20 seconds)
        transitionStep = 0;
        prevColorIndex = currentColorIndex;
        currentColorIndex = (currentColorIndex + 1) % nebulaColors.length;
    }

    setTimeout(changeNebulaColor, 100);
}

// Resize canvas dynamically
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animations
animateStars();
changeNebulaColor();

