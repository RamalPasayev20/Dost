const canvas = document.getElementById("connections");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Yıldızlar oluştur
const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.1
  });
}

function drawStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    // Yıldız hareketi (parlaklık efekti gibi)
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function drawConnections() {
  const circle = document.querySelector(".circle");
  const rect = circle.getBoundingClientRect();

  const npc1 = document.getElementById("npc1").getBoundingClientRect();
  const npc2 = document.getElementById("npc2").getBoundingClientRect();
  const npc3 = document.getElementById("npc3").getBoundingClientRect();

  const pos1 = [npc1.left + npc1.width/2, npc1.top + npc1.height/2];
  const pos2 = [npc2.left + npc2.width/2, npc2.top + npc2.height/2];
  const pos3 = [npc3.left + npc3.width/2, npc3.top + npc3.height/2];

  ctx.strokeStyle = "rgba(0,255,200,0.8)";
  ctx.lineWidth = 3;
  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgba(0,255,200,1)";

  ctx.beginPath();
  ctx.moveTo(...pos1);
  ctx.lineTo(...pos2);
  ctx.lineTo(...pos3);
  ctx.closePath();
  ctx.stroke();
}

function animate() {
  drawStars();       // ⭐ yıldızlı arka plan
  drawConnections(); // ✨ neon çizgi bağlantılar
  requestAnimationFrame(animate);
}

animate();
