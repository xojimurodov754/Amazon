const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// Player class
class Player {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 10;
    this.speed = 6;
    this.bullets = [];
    this.shootCooldown = 0;
  }

  move() {
    if (keys["ArrowLeft"] && this.x > 0) this.x -= this.speed;
    if (keys["ArrowRight"] && this.x + this.width < canvas.width)
      this.x += this.speed;
    if (keys["ArrowUp"] && this.y > 0) this.y -= this.speed;
    if (keys["ArrowDown"] && this.y + this.height < canvas.height)
      this.y += this.speed;
  }

  shoot() {
    if (keys[" "] && this.shootCooldown <= 0) {
      this.bullets.push({
        x: this.x + this.width / 2 - 5,
        y: this.y,
        width: 10,
        height: 20,
      });
      this.shootCooldown = 15; // frames between shots
    }
    if (this.shootCooldown > 0) this.shootCooldown--;
  }

  updateBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].y -= 10;
      if (this.bullets[i].y < -20) this.bullets.splice(i, 1);
    }
  }

  draw() {
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.bullets.forEach((b) => {
      ctx.fillStyle = "yellow";
      ctx.fillRect(b.x, b.y, b.width, b.height);
    });
  }
}

// Enemy class
class Enemy {
  constructor(x, y, speed) {
    this.width = 40;
    this.height = 40;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = "red";
  }
  update() {
    this.y += this.speed;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const player = new Player();
let enemies = [];
let score = 0;
let spawnTimer = 0;
let difficultyTimer = 0;
let enemySpeed = 2;

function spawnEnemies() {
  spawnTimer++;
  if (spawnTimer > 60) {
    enemies.push(
      new Enemy(Math.random() * (canvas.width - 40), -40, enemySpeed)
    );
    spawnTimer = 0;
  }
}

function increaseDifficulty() {
  difficultyTimer++;
  if (difficultyTimer > 600) {
    // har 10 sekund
    enemySpeed += 0.5;
    difficultyTimer = 0;
  }
}

function checkCollisions() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    for (let j = player.bullets.length - 1; j >= 0; j--) {
      let b = player.bullets[j];
      if (
        b.x < e.x + e.width &&
        b.x + b.width > e.x &&
        b.y < e.y + e.height &&
        b.y + b.height > e.y
      ) {
        enemies.splice(i, 1);
        player.bullets.splice(j, 1);
        score += 10;
        break;
      }
    }
    // Player collision
    if (
      player.x < e.x + e.width &&
      player.x + player.width > e.x &&
      player.y < e.y + e.height &&
      player.y + player.height > e.y
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }
  }
}

function update() {
  player.move();
  player.shoot();
  player.updateBullets();
  enemies.forEach((e) => e.update());
  spawnEnemies();
  checkCollisions();
  increaseDifficulty();
  enemies = enemies.filter((e) => e.y < canvas.height + 50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  enemies.forEach((e) => e.draw());

  // HUD
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// Player class
class Player {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 10;
    this.speed = 6;
    this.bullets = [];
    this.shootCooldown = 0;
  }

  move() {
    if (keys["ArrowLeft"] && this.x > 0) this.x -= this.speed;
    if (keys["ArrowRight"] && this.x + this.width < canvas.width)
      this.x += this.speed;
    if (keys["ArrowUp"] && this.y > 0) this.y -= this.speed;
    if (keys["ArrowDown"] && this.y + this.height < canvas.height)
      this.y += this.speed;
  }

  shoot() {
    if (keys[" "] && this.shootCooldown <= 0) {
      this.bullets.push({
        x: this.x + this.width / 2 - 5,
        y: this.y,
        width: 10,
        height: 20,
      });
      this.shootCooldown = 15; // frames between shots
    }
    if (this.shootCooldown > 0) this.shootCooldown--;
  }

  updateBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].y -= 10;
      if (this.bullets[i].y < -20) this.bullets.splice(i, 1);
    }
  }

  draw() {
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.bullets.forEach((b) => {
      ctx.fillStyle = "yellow";
      ctx.fillRect(b.x, b.y, b.width, b.height);
    });
  }
}

// Enemy class
class Enemy {
  constructor(x, y, speed) {
    this.width = 40;
    this.height = 40;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = "red";
  }
  update() {
    this.y += this.speed;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const player = new Player();
let enemies = [];
let score = 0;
let spawnTimer = 0;
let difficultyTimer = 0;
let enemySpeed = 2;

function spawnEnemies() {
  spawnTimer++;
  if (spawnTimer > 60) {
    enemies.push(
      new Enemy(Math.random() * (canvas.width - 40), -40, enemySpeed)
    );
    spawnTimer = 0;
  }
}

function increaseDifficulty() {
  difficultyTimer++;
  if (difficultyTimer > 600) {
    // har 10 sekund
    enemySpeed += 0.5;
    difficultyTimer = 0;
  }
}

function checkCollisions() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    for (let j = player.bullets.length - 1; j >= 0; j--) {
      let b = player.bullets[j];
      if (
        b.x < e.x + e.width &&
        b.x + b.width > e.x &&
        b.y < e.y + e.height &&
        b.y + b.height > e.y
      ) {
        enemies.splice(i, 1);
        player.bullets.splice(j, 1);
        score += 10;
        break;
      }
    }
    // Player collision
    if (
      player.x < e.x + e.width &&
      player.x + player.width > e.x &&
      player.y < e.y + e.height &&
      player.y + player.height > e.y
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }
  }
}

function update() {
  player.move();
  player.shoot();
  player.updateBullets();
  enemies.forEach((e) => e.update());
  spawnEnemies();
  checkCollisions();
  increaseDifficulty();
  enemies = enemies.filter((e) => e.y < canvas.height + 50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  enemies.forEach((e) => e.draw());

  // HUD
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
