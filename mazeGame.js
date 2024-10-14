// Элементы HTML
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const playerNameInput = document.getElementById('playerNameInput');
const levelMenu = document.getElementById('levelMenu'); // Добавьте элемент для меню уровней
const levelButtons = document.querySelectorAll('.levelButton'); // Кнопки для уровней


// Настройки игры
const tileSize = 50;
const playerSize = 40;
const playerSpeed = 50;

// Позиция игрока
let player = { x: 1 * tileSize, y: 1 * tileSize };

// Текущий уровень
let currentLevel = 0;
let score = 0; // Счёт
let coinsCollected = 0; // Количество собранных монет

// Имя игрока
let playerName = '';

// Определение уровней
const levels = [
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 3, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 2, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 3, 1, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 500, height: 500 }  // Размер канваса для этого уровня
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 3, 1, 2, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 3, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 500, height: 500 }
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 3, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 2, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 1, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 500, height: 500 }
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 3, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 3, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 550, height: 550 }  // Здесь размер канваса больше
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 550, height: 550 }  // Здесь размер канваса больше
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1],  // 2 — выход
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 3, 0, 0, 0, 1],  // 3 — монетка
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 550, height: 550 }  // Здесь размер канваса больше
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 2, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 1],  // 3 — монетка
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 650, height: 650 }  // Здесь размер канваса больше
  },
  {
    maze: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 3, 1],  // 3 — монетка
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1],  // 2 — выход
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 700, height: 700 }  // Здесь размер канваса больше
  },
  {
    maze: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1],  // 2 — выход
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],  // 3 — монетка
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 700, height: 700 }  // Здесь размер канваса больше
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 750, height: 750 }  // Здесь размер канваса больше
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 3, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1],
      [1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 750, height: 750 }  // Здесь размер канваса больше
  },
  
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 3, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
      [1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 750, height: 750 }  // Здесь размер канваса больше
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 2, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 3, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 900, height: 900 }  // Здесь размер канваса больше
  },
  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 900, height: 900 }  // Здесь размер канваса больше
  },

  {
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ] ,
  
    playerStart: { x: 1 * tileSize, y: 1 * tileSize },
    canvasSize: { width: 900, height: 900 }  // Здесь размер канваса больше
  },
];

// Загрузка изображений
const wallImage = new Image();
wallImage.src = 'i.png'; // Изображение стены

const exitImage = new Image();
exitImage.src = 'exit.jpg'; // Изображение выхода

const coinImage = new Image();
coinImage.src = 'monetks.webp'; // Изображение монетки

const playerImage = new Image();
playerImage.src = 'dino.png'; // Изображение игрока

// Функция для перехода в меню уровней
function showLevelMenu() {
  startScreen.style.display = 'none'; // Скрываем экран старта
  levelMenu.style.display = 'block'; // Показываем меню уровней
}

function adjustCanvasSize(maze) {
  // Определяем размеры лабиринта
  const rows = maze.length; // Количество строк
  const cols = maze[0].length; // Количество столбцов

  // Устанавливаем размеры canvas в зависимости от количества строк и колонок
  const cellSize = 40; // Размер одной ячейки (в пикселях, можно изменить)
  const canvasWidth = cols * cellSize; // Ширина canvas
  const canvasHeight = rows * cellSize; // Высота canvas

  // Получаем доступ к элементу canvas
  const canvas = document.getElementById("gameCanvas");

  // Изменяем размеры canvas
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // После изменения размеров необходимо перерисовать лабиринт
  drawMaze(maze);
}


// Обработчик выбора уровня
levelButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    currentLevel = index; // Устанавливаем текущий уровень
    player.x = levels[currentLevel].playerStart.x; // Устанавливаем начальную позицию игрока
    player.y = levels[currentLevel].playerStart.y; 
    levelMenu.style.display = 'none'; // Скрываем меню уровней
    drawGame(); // Запускаем игру
    adjustCanvasSize(maze);
  });
});

// Функция рисования лабиринта
function drawMaze() {
  const maze = levels[currentLevel].maze;
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        ctx.drawImage(wallImage, col * tileSize, row * tileSize, tileSize, tileSize);
      } else if (maze[row][col] === 2) {
        ctx.drawImage(exitImage, col * tileSize, row * tileSize, tileSize, tileSize);
      } else if (maze[row][col] === 3) {
        ctx.drawImage(coinImage, col * tileSize, row * tileSize, tileSize, tileSize);
      } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }
  }
}

// Функция рисования игрока
function drawPlayer() {
  ctx.drawImage(playerImage, player.x, player.y, playerSize, playerSize);
}

function drawScore() {
  ctx.fillStyle = 'Red';
  ctx.font = '20px Arial';

  // Выводим счётчик внизу слева
  ctx.fillText(`Score: ${score}`, 100, canvas.height - 20);  // Общий счёт
  ctx.fillText(`Coins: ${coinsCollected}`, 20, canvas.height - 20);  // Количество монет
}

// Обработчик нажатий клавиш
document.addEventListener('keydown', function (event) {
  let newX = player.x;
  let newY = player.y;

  if (event.key === 'ArrowUp') {
    newY -= playerSpeed;
  } else if (event.key === 'ArrowDown') {
    newY += playerSpeed;
  } else if (event.key === 'ArrowLeft') {
    newX -= playerSpeed;
  } else if (event.key === 'ArrowRight') {
    newX += playerSpeed;
  }

  // Проверка на столкновение со стенами
  if (canMoveTo(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }

  // Проверка, достиг ли игрок выхода
  if (checkExit(newX, newY)) {
    nextLevel();
  }

  // Проверка на сбор монетки
  collectCoin(newX, newY);

  // Перерисовка
  drawGame();
});

// Функция проверки, можно ли двигаться на новую клетку
function canMoveTo(newX, newY) {
  const col = newX / tileSize;
  const row = newY / tileSize;
  const maze = levels[currentLevel].maze;
  return maze[row] && (maze[row][col] === 0 || maze[row][col] === 2 || maze[row][col] === 3);
}

// Функция проверки достижения выхода
function checkExit(newX, newY) {
  const col = newX / tileSize;
  const row = newY / tileSize;
  return levels[currentLevel].maze[row][col] === 2;
}

// Функция перехода на следующий уровень
function nextLevel() {
  if (currentLevel < levels.length - 1) {
    currentLevel++;
    const newCanvasSize = levels[currentLevel].canvasSize;
    canvas.width = newCanvasSize.width;
    canvas.height = newCanvasSize.height;
    
    player.x = levels[currentLevel].playerStart.x;
    player.y = levels[currentLevel].playerStart.y;
  } else {
    saveScore();
    alert(`Congratulations, ${playerName}! You've completed the game with a score of ${score}.`);
    resetGame();
  }
}

// Функция сбора монет
function collectCoin(newX, newY) {
  const col = newX / tileSize;
  const row = newY / tileSize;
  if (levels[currentLevel].maze[row][col] === 3) {
    levels[currentLevel].maze[row][col] = 0;
    score += 100;
  }
}

// Функция перерисовки игры
// Функция для перерисовки игры
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас
  drawMaze(); // Рисуем лабиринт
  drawPlayer(); // Рисуем игрока
  drawScore(); // Рисуем счёт
}

// Сохранение результата
function saveScore() {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
  // Проверка на дубликаты имен
  const existingPlayerIndex = leaderboard.findIndex(entry => entry.name === playerName);
  
  if (existingPlayerIndex !== -1) {
    // Если игрок с таким именем уже есть, обновляем его результат, если новый выше
    if (score > leaderboard[existingPlayerIndex].score) {
      leaderboard[existingPlayerIndex].score = score;
    }
  } else {
    // Если игрока нет в списке, добавляем его
    leaderboard.push({ name: playerName, score });
  }
  
  // Сортировка по результатам
  leaderboard.sort((a, b) => b.score - a.score);
  
  // Оставляем только топ-10
  leaderboard = leaderboard.slice(0, 10);
  
  // Сохранение в localStorage
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Сброс игры
function resetGame() {
  currentLevel = 0;
  const newCanvasSize = levels[currentLevel].canvasSize;
  canvas.width = newCanvasSize.width;
  canvas.height = newCanvasSize.height;
  
  player.x = levels[currentLevel].playerStart.x;
  player.y = levels[currentLevel].playerStart.y;
  score = 0;
  drawGame();
}


// Старт игры
function startGame() {
  playerName = playerNameInput.value;
  if (!playerName) {
    alert('Please enter your name!');
    return;
  }

  startScreen.style.display = 'none';
  canvas.style.display = 'block';
  resetGame();
}

// Отображение таблицы лидеров
// Отображение таблицы лидеров
function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  let leaderboardText = 'Leaderboard:\n';
  
  leaderboard.forEach((entry, index) => {
    leaderboardText += `${index + 1}. ${entry.name} - ${entry.score} points\n`;
  });

  alert(leaderboardText);
}

// Стартовая страница
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('leaderboardButton').addEventListener('click', showLeaderboard);
startButton.addEventListener('click', showLevelMenu);
drawGame();
