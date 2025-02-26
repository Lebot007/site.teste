// Variáveis globais
const gameScreen = document.getElementById('game-screen');
const closeButton = document.getElementById('close-button');
const startGameButton = document.getElementById('start-game');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let player, bullets, enemies, keys, stars, lastShotTime, shotCooldown;

function resetGameVariables() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player = { x: canvas.width / 2, y: canvas.height - 150, width: 100, height: 100, speed: 5 };
    bullets = [];
    enemies = [];
    keys = {};
    stars = [];
    lastShotTime = 0;
    shotCooldown = 200;
}

function generateStars() {
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

function drawStars() {
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawPlayer() {
    const playerImage = new Image();
    playerImage.src = 'https://cdn-icons-png.flaticon.com/512/3000/3000644.png';
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function movePlayer() {
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight