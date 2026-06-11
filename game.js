const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

const levelValue = document.querySelector("#levelValue");
const waterValue = document.querySelector("#waterValue");
const plantsValue = document.querySelector("#plantsValue");
const energyValue = document.querySelector("#energyValue");
const shieldValue = document.querySelector("#shieldValue");
const pauseButton = document.querySelector("#pauseButton");
const soundButton = document.querySelector("#soundButton");
const shopButton = document.querySelector("#shopButton");
const startButton = document.querySelector("#startButton");
const continueButton = document.querySelector("#continueButton");
const locationsButton = document.querySelector("#locationsButton");
const openShopButton = document.querySelector("#openShopButton");
const pauseShopButton = document.querySelector("#pauseShopButton");
const resultShopButton = document.querySelector("#resultShopButton");
const closeShopButton = document.querySelector("#closeShopButton");
const closeLocationsButton = document.querySelector("#closeLocationsButton");
const nextButton = document.querySelector("#nextButton");
const resultRestartButton = document.querySelector("#resultRestartButton");
const resumeButton = document.querySelector("#resumeButton");
const pauseRestartButton = document.querySelector("#pauseRestartButton");
const mainMenuButton = document.querySelector("#mainMenuButton");
const actionButton = document.querySelector("#actionButton");
const joystick = document.querySelector("#joystick");
const joystickKnob = document.querySelector("#joystickKnob");
const menuFlavor = document.querySelector("#menuFlavor");
const menuPanel = document.querySelector("#menuPanel");
const pausePanel = document.querySelector("#pausePanel");
const resultPanel = document.querySelector("#resultPanel");
const shopPanel = document.querySelector("#shopPanel");
const locationsPanel = document.querySelector("#locationsPanel");
const shopGrid = document.querySelector("#shopGrid");
const locationsGrid = document.querySelector("#locationsGrid");
const shopCoins = document.querySelector("#shopCoins");
const resultKicker = document.querySelector("#resultKicker");
const resultTitle = document.querySelector("#resultTitle");
const resultMessage = document.querySelector("#resultMessage");
const finalPlants = document.querySelector("#finalPlants");
const finalWater = document.querySelector("#finalWater");
const levelBanner = document.querySelector("#levelBanner");
const messageToast = document.querySelector("#messageToast");
const activeCodes = document.querySelector("#activeCodes");

const TAU = Math.PI * 2;
const SAVE_KEY = "location-raid-save-v1";
const CHEAT_KEYS = ["л", "о", "х"];
const CHEAT_CODES = ["KeyK", "KeyJ", "BracketLeft"];
const POWER_CHEAT_KEYS = ["б", "о", "г"];
const POWER_CHEAT_CODES = ["Comma", "KeyJ", "KeyU"];
const WASTELAND_CHEAT_KEYS = ["б", "о", "с"];
const WASTELAND_CHEAT_CODES = ["Comma", "KeyJ", "KeyC"];
const WASTELAND_CHARACTER_ID = "wasteland";
const ENEMY_SHOOT_RANGE_LIMIT = 285;
const FINAL_LEVEL_HP_BONUS = 10;
const BOSS_ATTACK_RANGE_MULTIPLIER = 1.65;
const POWER_CHEAT_DAMAGE_MULTIPLIER = 5;

const CHARACTERS = [
  {
    id: "ranger",
    name: "Ковбой",
    mark: "K",
    cost: 0,
    hp: 8,
    speed: 245,
    reload: 0.38,
    damage: 20,
    range: 315,
    bulletSpeed: 720,
    color: "#76a7c8",
    accent: "#f0c05a",
    abilityCd: 4.2,
    mechanic: "Быстрый револьвер и пробивающий выстрел.",
  },
  {
    id: "spark",
    name: "Ведьма",
    mark: "Q",
    cost: 15,
    hp: 8,
    speed: 285,
    reload: 0.3,
    damage: 13,
    range: 285,
    bulletSpeed: 780,
    color: "#b9865b",
    accent: "#76a7c8",
    abilityCd: 5.2,
    chain: 2,
    mechanic: "Рикошеты перескакивают между целями.",
  },
  {
    id: "hunter",
    name: "Снайпер",
    mark: "O",
    cost: 23,
    hp: 9,
    speed: 225,
    reload: 0.92,
    damage: 46,
    range: 390,
    bulletSpeed: 980,
    color: "#7c98c7",
    accent: "#f8f7ee",
    abilityCd: 6.8,
    pierce: 2,
    bulletRadius: 5,
    bulletLife: 1,
    mechanic: "Дальняя винтовка пробивает врагов.",
  },
  {
    id: "engineer",
    name: "Механик",
    mark: "E",
    cost: 29,
    hp: 10,
    speed: 230,
    reload: 0.46,
    damage: 16,
    range: 300,
    bulletSpeed: 690,
    color: "#9ecf8d",
    accent: "#f0c05a",
    abilityCd: 7.5,
    drone: true,
    mechanic: "Часовой механизм и переносная турель.",
  },
  {
    id: "guardian",
    name: "Шериф",
    mark: "H",
    cost: 35,
    hp: 11,
    speed: 205,
    reload: 0.78,
    damage: 13,
    range: 235,
    bulletSpeed: 650,
    color: "#bf6f45",
    accent: "#f0c05a",
    abilityCd: 6.4,
    pellets: 5,
    mechanic: "Дробовик и круговой удар прикладом.",
  },
  {
    id: "bomber",
    name: "Подрывник",
    mark: "P",
    cost: 40,
    hp: 12,
    speed: 210,
    reload: 0.82,
    damage: 28,
    range: 260,
    bulletSpeed: 540,
    color: "#d18a43",
    accent: "#bf6f45",
    abilityCd: 7.2,
    bulletRadius: 7,
    bulletLife: 0.72,
    explosionRadius: 82,
    mechanic: "Динамит взрывается по площади.",
  },
  {
    id: WASTELAND_CHARACTER_ID,
    name: "Ковбой пустоши",
    mark: "B",
    cost: 0,
    hp: 680,
    speed: 205,
    reload: 1.08,
    damage: 15,
    range: 360,
    bulletSpeed: 610,
    color: "#4b241d",
    accent: "#d85d49",
    abilityCd: 8.8,
    bulletRadius: 8,
    bulletLife: 1.1,
    bossSpread: 5,
    bossSpreadAngle: 0.48,
    secret: true,
    mechanic: "Секретный залп Ковбоя Пустоши.",
  },
];

const LOCATIONS = [
  {
    name: "Город-рынок",
    flavor: "Торговая улица уже ждёт первого выстрела.",
    worldW: 1780,
    worldH: 1180,
    goal: 12,
    spawnRate: 1.12,
    maxActive: 6,
    threat: {
      hp: 0.88,
      speed: 0.9,
      damage: 1,
      projectile: 1,
      reload: 1,
      spawn: 1.04,
      activeBonus: 0,
      coin: 1,
      openingDelay: 0.8,
      safeDistance: 380,
    },
    floor: "#8b5734",
    floorMid: "#b27745",
    grid: "#d4a069",
    trail: "#d9aa68",
    accent: "#76a7c8",
    coin: "#f0c05a",
    landmark: "town",
    decor: ["barrel", "cactus", "sign", "plank", "rock", "tumbleweed"],
    pool: [
      ["scrap", 1],
      ["runner", 0.22],
    ],
  },
  {
    name: "Золотая Шахта",
    flavor: "Рельсы звенят под землёй, а золото манит всё глубже.",
    worldW: 1960,
    worldH: 1280,
    goal: 18,
    spawnRate: 0.95,
    maxActive: 11,
    threat: {
      hp: 1.25,
      speed: 1.12,
      damage: 1.1,
      projectile: 1.08,
      reload: 0.88,
      spawn: 0.84,
      activeBonus: 1,
      coin: 1.08,
      openingDelay: 0.65,
      safeDistance: 340,
    },
    floor: "#5f4b37",
    floorMid: "#7b6246",
    grid: "#b58755",
    trail: "#c59256",
    accent: "#f0c05a",
    coin: "#f0c05a",
    landmark: "mine",
    gate: { xOffset: -270, yRatio: 0.44, yOffset: 26 },
    decor: ["rail", "crate", "barrel", "lantern", "rock", "plank"],
    pool: [
      ["scrap", 0.8],
      ["runner", 0.55],
      ["spitter", 0.55],
    ],
  },
  {
    name: "Каньон Кактусов",
    flavor: "Ветер гонит песок между скалами, и тропа постоянно меняет форму.",
    worldW: 2100,
    worldH: 1360,
    goal: 22,
    spawnRate: 0.82,
    maxActive: 13,
    threat: {
      hp: 1.52,
      speed: 1.24,
      damage: 1.32,
      projectile: 1.22,
      reload: 0.78,
      spawn: 0.72,
      activeBonus: 2,
      coin: 1.16,
      openingDelay: 0.45,
      safeDistance: 330,
    },
    floor: "#884a32",
    floorMid: "#b9623d",
    grid: "#d38b55",
    trail: "#d8a261",
    accent: "#9ecf8d",
    coin: "#f0c05a",
    landmark: "canyon",
    decor: ["cactus", "brush", "rock", "wagon", "skull", "tumbleweed"],
    pool: [
      ["runner", 0.8],
      ["spitter", 0.7],
      ["tank", 0.34],
    ],
  },
  {
    name: "Форт На Закате",
    flavor: "Последняя застава держится на досках, порохе и упрямстве.",
    worldW: 2240,
    worldH: 1440,
    goal: 27,
    spawnRate: 0.72,
    maxActive: 15,
    threat: {
      hp: 1.9,
      speed: 1.4,
      damage: 1.62,
      projectile: 1.4,
      reload: 0.66,
      spawn: 0.58,
      activeBonus: 4,
      coin: 1.25,
      openingDelay: 0.35,
      safeDistance: 300,
    },
    floor: "#6f412e",
    floorMid: "#955b38",
    grid: "#c48a54",
    trail: "#c99559",
    accent: "#bf6f45",
    coin: "#f0c05a",
    landmark: "fort",
    decor: ["palisade", "crate", "barrel", "sign", "rock", "lantern"],
    pool: [
      ["scrap", 0.45],
      ["runner", 0.75],
      ["spitter", 0.75],
      ["tank", 0.55],
      ["shard", 0.45],
    ],
  },
  {
    name: "Город Призрак",
    flavor: "Тёмные вывески молчат, а траурный ветер несёт пепел по пустой улице.",
    worldW: 2380,
    worldH: 1540,
    goal: 30,
    spawnRate: 0.66,
    maxActive: 16,
    threat: {
      hp: 2.2,
      speed: 1.48,
      damage: 1.86,
      projectile: 1.5,
      reload: 0.58,
      spawn: 0.52,
      activeBonus: 4,
      coin: 1.35,
      openingDelay: 0.28,
      safeDistance: 290,
    },
    floor: "#211f24",
    floorMid: "#343039",
    grid: "#6b626a",
    trail: "#4b4247",
    accent: "#a997a1",
    coin: "#f0c05a",
    landmark: "ghost",
    boss: { type: "baron", xRatio: 0.76, yRatio: 0.5 },
    decor: ["sign", "plank", "barrel", "rock", "brush", "skull", "wagon", "lantern"],
    pool: [
      ["scrap", 0.35],
      ["runner", 0.7],
      ["spitter", 0.85],
      ["tank", 0.62],
      ["shard", 0.8],
    ],
  },
];

const ENEMY_TYPES = {
  scrap: {
    name: "Пыльник",
    hp: 34,
    speed: 78,
    radius: 17,
    damage: 1,
    coin: 4,
    color: "#bf6f45",
    accent: "#f0c05a",
  },
  runner: {
    name: "Налётчик",
    hp: 23,
    speed: 128,
    radius: 13,
    damage: 1,
    coin: 5,
    color: "#f0c05a",
    accent: "#bf6f45",
  },
  spitter: {
    name: "Дымарь",
    hp: 31,
    speed: 54,
    radius: 15,
    damage: 1,
    coin: 7,
    color: "#7a6050",
    accent: "#76a7c8",
    ranged: true,
    range: 360,
    reload: 1.6,
  },
  tank: {
    name: "Громила",
    hp: 82,
    speed: 42,
    radius: 24,
    damage: 2,
    coin: 12,
    color: "#9ecf8d",
    accent: "#f8f7ee",
  },
  shard: {
    name: "Осколочник",
    hp: 48,
    speed: 96,
    radius: 18,
    damage: 1,
    coin: 9,
    color: "#76a7c8",
    accent: "#b9865b",
  },
  baron: {
    name: "Ковбой Пустоши",
    hp: 680,
    speed: 48,
    radius: 50,
    damage: 2,
    coin: 24,
    color: "#4b241d",
    accent: "#d85d49",
    boss: true,
    ranged: true,
    range: 510,
    reload: 1.18,
    spread: 5,
    spreadAngle: 0.48,
    projectileSpeed: 285,
  },
};

const keys = new Set();
const stars = [];
const decor = [];
const groundDetails = [];
const enemies = [];
const bullets = [];
const enemyBullets = [];
const pickups = [];
const particles = [];
const floaters = [];
const flashes = [];
const turrets = [];

const saveData = loadSave();

const perf = createPerformanceProfile();

const camera = { x: 0, y: 0 };
const player = {
  x: 160,
  y: 590,
  vx: 0,
  vy: 0,
  radius: 20,
  hp: 6,
  invulnerable: 0,
  reload: 0,
  ability: 0,
  aimX: 1,
  aimY: 0,
  face: 1,
  bob: 0,
  droneAngle: 0,
  droneReload: 0,
};

const input = {
  joystickActive: false,
  joystickId: null,
  joyX: 0,
  joyY: 0,
};

const game = {
  width: 0,
  height: 0,
  dpr: 1,
  state: "menu",
  shopReturnState: "menu",
  levelIndex: 0,
  coins: saveData.coins,
  kills: 0,
  spawned: 0,
  bossSpawned: false,
  earned: 0,
  spawnTimer: 0,
  portalOpen: false,
  portalPulse: 0,
  portalX: 0,
  portalY: 0,
  sound: true,
  time: 0,
  lastTime: 0,
  hudTimer: 0,
  shake: 0,
  toastTimer: 0,
  saveTimer: 0,
  saveDirty: false,
  cheatTextProgress: 0,
  cheatCodeProgress: 0,
  powerCheatTextProgress: 0,
  powerCheatCodeProgress: 0,
  wastelandCheatTextProgress: 0,
  wastelandCheatCodeProgress: 0,
  unlockCheatActive: false,
  unlockCheatSnapshot: null,
  wastelandCheatActive: false,
  wastelandCheatSnapshot: null,
  immortal: false,
  damageMultiplier: 1,
};

let audioContext = null;
let audioMaster = null;
let audioCompressor = null;
let noiseBuffer = null;
const soundCooldowns = new Map();

function loadSave() {
  const fallback = {
    coins: 0,
    levelIndex: 0,
    selected: "ranger",
    unlocked: ["ranger"],
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
    if (!parsed || typeof parsed !== "object") {
      return fallback;
    }

    const unlocked = sanitizeUnlocked(Array.isArray(parsed.unlocked) ? parsed.unlocked.filter(Boolean) : ["ranger"]);
    if (!unlocked.includes("ranger")) {
      unlocked.unshift("ranger");
    }

    const selected = unlocked.includes(parsed.selected) && !isSecretCharacter(parsed.selected) ? parsed.selected : "ranger";
    return {
      coins: Math.max(0, Math.floor(Number(parsed.coins) || 0)),
      levelIndex: clamp(Math.floor(Number(parsed.levelIndex) || 0), 0, LOCATIONS.length - 1),
      selected,
      unlocked,
    };
  } catch {
    return fallback;
  }
}

function persistSave() {
  saveData.coins = game.coins;
  saveData.levelIndex = clamp(saveData.levelIndex, 0, LOCATIONS.length - 1);
  const unlocked = sanitizeUnlocked(saveData.unlocked);
  const selected = unlocked.includes(saveData.selected) && !isSecretCharacter(saveData.selected) ? saveData.selected : "ranger";
  try {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        coins: saveData.coins,
        levelIndex: saveData.levelIndex,
        selected,
        unlocked,
      }),
    );
  } catch {
    // Progress stays available during this page session if storage is blocked.
  }
}

function isSecretCharacter(id) {
  return CHARACTERS.some((character) => character.id === id && character.secret);
}

function sanitizeUnlocked(unlocked) {
  const clean = [];
  for (const id of unlocked) {
    if (!id || isSecretCharacter(id) || clean.includes(id)) {
      continue;
    }
    clean.push(id);
  }

  if (!clean.includes("ranger")) {
    clean.unshift("ranger");
  }

  return clean;
}

function queueSave(delay = 0.45) {
  saveData.coins = game.coins;
  game.saveDirty = true;
  game.saveTimer = Math.max(game.saveTimer, delay);
}

function updateQueuedSave(dt) {
  if (!game.saveDirty) {
    return;
  }

  game.saveTimer -= dt;
  if (game.saveTimer <= 0) {
    game.saveDirty = false;
    game.saveTimer = 0;
    persistSave();
  }
}

function resetSave() {
  saveData.coins = 0;
  saveData.levelIndex = 0;
  saveData.selected = "ranger";
  saveData.unlocked = ["ranger"];
  game.coins = 0;
  game.unlockCheatActive = false;
  game.unlockCheatSnapshot = null;
  game.wastelandCheatActive = false;
  game.wastelandCheatSnapshot = null;
  renderActiveCodes();
  persistSave();
}

function unlockCharacter(id) {
  if (!saveData.unlocked.includes(id)) {
    saveData.unlocked.push(id);
  }
}

function unlockEverything() {
  game.saveDirty = false;
  game.saveTimer = 0;
  if (!game.unlockCheatActive) {
    game.unlockCheatSnapshot = {
      coins: game.coins,
      levelIndex: saveData.levelIndex,
      selected: saveData.selected,
      unlocked: [...saveData.unlocked],
    };
  }

  saveData.levelIndex = LOCATIONS.length - 1;
  saveData.unlocked = CHARACTERS.filter((character) => !character.secret).map((character) => character.id);
  if (!saveData.unlocked.includes(saveData.selected)) {
    saveData.selected = "ranger";
  }

  game.unlockCheatActive = true;
  persistSave();
  updateMenuButtons();
  renderShop();
  renderLocations();
  updateHud(true);
  renderActiveCodes();
  showToast("Все локации и персонажи открыты", 1.8);
  playSound("cheatOn");
}

function deactivateUnlockCheat() {
  if (!game.unlockCheatActive) {
    return;
  }

  const snapshot = game.unlockCheatSnapshot;
  game.unlockCheatActive = false;
  game.unlockCheatSnapshot = null;

  if (snapshot) {
    game.saveDirty = false;
    game.saveTimer = 0;
    game.coins = Math.max(0, Math.floor(Number(snapshot.coins) || 0));
    saveData.levelIndex = clamp(Math.floor(Number(snapshot.levelIndex) || 0), 0, LOCATIONS.length - 1);
    saveData.unlocked = Array.isArray(snapshot.unlocked) ? snapshot.unlocked.filter(Boolean) : ["ranger"];
    if (!saveData.unlocked.includes("ranger")) {
      saveData.unlocked.unshift("ranger");
    }
    saveData.selected = saveData.unlocked.includes(snapshot.selected) ? snapshot.selected : "ranger";
    if (game.wastelandCheatActive) {
      unlockCharacter(WASTELAND_CHARACTER_ID);
      saveData.selected = WASTELAND_CHARACTER_ID;
    }
    persistSave();
  }

  if (game.levelIndex > saveData.levelIndex) {
    loadLocation(saveData.levelIndex, game.state !== "playing");
  }
  updateMenuButtons();
  renderShop();
  renderLocations();
  updateHud(true);
  renderActiveCodes();
  showToast("Код ЛОХ выключен", 1.2);
  playSound("cheatOff");
}

function activateWastelandCheat() {
  if (!game.wastelandCheatActive) {
    game.wastelandCheatSnapshot = {
      selected: saveData.selected,
      unlocked: [...saveData.unlocked],
    };
  }

  game.wastelandCheatActive = true;
  unlockCharacter(WASTELAND_CHARACTER_ID);
  saveData.selected = WASTELAND_CHARACTER_ID;
  persistSave();
  player.hp = getPlayerMaxHp(getCharacter());
  updateHud(true);
  renderShop();
  renderActiveCodes();
  showToast("Ковбой пустоши открыт", 1.8);
  addFloater("Ковбой пустоши", player, "#d85d49");
  addFlash({
    type: "ring",
    x: player.x,
    y: player.y,
    radius: 118,
    life: 0.48,
    maxLife: 0.48,
    color: "#d85d49",
  });
  addBurst(player, "#d85d49", 38, 0.82);
  playSound("bossSpawn");
}

function deactivateWastelandCheat() {
  if (!game.wastelandCheatActive) {
    return;
  }

  const snapshot = game.wastelandCheatSnapshot;
  game.wastelandCheatActive = false;
  game.wastelandCheatSnapshot = null;

  if (snapshot && !game.unlockCheatActive) {
    saveData.unlocked = Array.isArray(snapshot.unlocked) ? snapshot.unlocked.filter(Boolean) : ["ranger"];
    if (!saveData.unlocked.includes("ranger")) {
      saveData.unlocked.unshift("ranger");
    }
    saveData.selected = saveData.unlocked.includes(snapshot.selected) ? snapshot.selected : "ranger";
  } else if (saveData.selected === WASTELAND_CHARACTER_ID && !saveData.unlocked.includes(WASTELAND_CHARACTER_ID)) {
    saveData.selected = "ranger";
  }

  persistSave();
  player.hp = clamp(player.hp, 1, getPlayerMaxHp(getCharacter()));
  updateHud(true);
  renderShop();
  renderActiveCodes();
  showToast("Код БОС выключен", 1.2);
  addFloater("код выключен", player, "#f8f7ee");
  playSound("cheatOff");
}

function activatePowerCheat() {
  game.immortal = true;
  game.damageMultiplier = POWER_CHEAT_DAMAGE_MULTIPLIER;
  player.hp = getPlayerMaxHp();
  updateHud(true);
  renderActiveCodes();
  showToast("Бессмертие и урон x5", 1.8);
  addFloater("бессмертие x5", player, "#f0c05a");
  addFlash({
    type: "ring",
    x: player.x,
    y: player.y,
    radius: 110,
    life: 0.48,
    maxLife: 0.48,
    color: "#f0c05a",
  });
  addBurst(player, "#f0c05a", 34, 0.78);
  playSound("cheatOn");
}

function deactivatePowerCheat() {
  if (!game.immortal && game.damageMultiplier === 1) {
    return;
  }

  game.immortal = false;
  game.damageMultiplier = 1;
  renderActiveCodes();
  showToast("Код БОГ выключен", 1.2);
  addFloater("код выключен", player, "#f8f7ee");
  playSound("cheatOff");
}

function togglePowerCheat() {
  if (game.immortal || game.damageMultiplier > 1) {
    deactivatePowerCheat();
  } else {
    activatePowerCheat();
  }
}

function handleCheatKey(event) {
  const key = (event.key || "").toLowerCase();
  game.cheatTextProgress = key === CHEAT_KEYS[game.cheatTextProgress] ? game.cheatTextProgress + 1 : key === CHEAT_KEYS[0] ? 1 : 0;
  game.cheatCodeProgress =
    event.code === CHEAT_CODES[game.cheatCodeProgress] ? game.cheatCodeProgress + 1 : event.code === CHEAT_CODES[0] ? 1 : 0;
  game.powerCheatTextProgress =
    key === POWER_CHEAT_KEYS[game.powerCheatTextProgress]
      ? game.powerCheatTextProgress + 1
      : key === POWER_CHEAT_KEYS[0]
        ? 1
        : 0;
  game.powerCheatCodeProgress =
    event.code === POWER_CHEAT_CODES[game.powerCheatCodeProgress]
      ? game.powerCheatCodeProgress + 1
      : event.code === POWER_CHEAT_CODES[0]
        ? 1
        : 0;
  game.wastelandCheatTextProgress =
    key === WASTELAND_CHEAT_KEYS[game.wastelandCheatTextProgress]
      ? game.wastelandCheatTextProgress + 1
      : key === WASTELAND_CHEAT_KEYS[0]
        ? 1
        : 0;
  game.wastelandCheatCodeProgress =
    event.code === WASTELAND_CHEAT_CODES[game.wastelandCheatCodeProgress]
      ? game.wastelandCheatCodeProgress + 1
      : event.code === WASTELAND_CHEAT_CODES[0]
        ? 1
        : 0;

  if (game.cheatTextProgress === CHEAT_KEYS.length || game.cheatCodeProgress === CHEAT_CODES.length) {
    game.cheatTextProgress = 0;
    game.cheatCodeProgress = 0;
    unlockEverything();
  }

  if (game.powerCheatTextProgress === POWER_CHEAT_KEYS.length || game.powerCheatCodeProgress === POWER_CHEAT_CODES.length) {
    game.powerCheatTextProgress = 0;
    game.powerCheatCodeProgress = 0;
    togglePowerCheat();
  }

  if (game.wastelandCheatTextProgress === WASTELAND_CHEAT_KEYS.length || game.wastelandCheatCodeProgress === WASTELAND_CHEAT_CODES.length) {
    game.wastelandCheatTextProgress = 0;
    game.wastelandCheatCodeProgress = 0;
    activateWastelandCheat();
  }
}

function deactivateCode(codeId) {
  if (codeId === "power") {
    deactivatePowerCheat();
  } else if (codeId === "unlock") {
    deactivateUnlockCheat();
  } else if (codeId === "wasteland") {
    deactivateWastelandCheat();
  }
}

function renderActiveCodes() {
  if (!activeCodes) {
    return;
  }

  const codes = [];
  if (game.immortal || game.damageMultiplier > 1) {
    codes.push({ id: "power", code: "БОГ", text: `бессмертие x${game.damageMultiplier}` });
  }
  if (game.unlockCheatActive) {
    codes.push({ id: "unlock", code: "ЛОХ", text: "всё открыто" });
  }
  if (game.wastelandCheatActive) {
    codes.push({ id: "wasteland", code: "БОС", text: "Ковбой пустоши" });
  }

  activeCodes.replaceChildren();
  activeCodes.classList.toggle("panel-hidden", codes.length === 0);

  if (codes.length > 0) {
    const title = document.createElement("div");
    title.className = "active-codes-title";
    title.textContent = "Активные чит-коды";
    activeCodes.append(title);
  }

  for (const item of codes) {
    const row = document.createElement("div");
    row.className = "active-code";

    const code = document.createElement("strong");
    code.textContent = item.code;

    const text = document.createElement("span");
    text.textContent = item.text;

    const button = document.createElement("button");
    button.className = "active-code-off";
    button.type = "button";
    button.textContent = "выключить";
    button.setAttribute("aria-label", `Выключить код ${item.code}`);
    button.addEventListener("click", () => deactivateCode(item.id));

    row.append(code, text, button);
    activeCodes.append(row);
  }
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function normalize(x, y) {
  const length = Math.hypot(x, y);
  if (length < 0.0001) {
    return { x: 0, y: 0, length: 0 };
  }

  return { x: x / length, y: y / length, length };
}

function seededRandom(seed) {
  let value = seed + 0x6d2b79f5;
  return function next() {
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function getLocation() {
  return LOCATIONS[game.levelIndex];
}

function getThreat(location = getLocation()) {
  return location.threat || {
    hp: 1,
    speed: 1,
    damage: 1,
    projectile: 1,
    reload: 1,
    spawn: 1,
    activeBonus: 0,
    coin: 1,
    openingDelay: 0.45,
    safeDistance: 320,
  };
}

function getGatePosition(location = getLocation()) {
  if (location.gate) {
    return {
      x: typeof location.gate.x === "number" ? location.gate.x : location.worldW + (location.gate.xOffset || -170),
      y:
        typeof location.gate.y === "number"
          ? location.gate.y
          : location.worldH * (location.gate.yRatio || 0.5) + (location.gate.yOffset || 0),
    };
  }

  return {
    x: location.worldW - 170,
    y: location.worldH / 2,
  };
}

function getCharacter() {
  return CHARACTERS.find((character) => character.id === saveData.selected) || CHARACTERS[0];
}

function getFinalLevelHpBonus(levelIndex = game.levelIndex) {
  return levelIndex >= LOCATIONS.length - 1 ? FINAL_LEVEL_HP_BONUS : 0;
}

function getPlayerMaxHp(character = getCharacter(), levelIndex = game.levelIndex) {
  return character.hp + getFinalLevelHpBonus(levelIndex);
}

function isUnlocked(id) {
  return saveData.unlocked.includes(id);
}

function createPerformanceProfile() {
  return {
    low: true,
    adaptive: false,
    dprCap: 0.9,
    frameInterval: 1000 / 30,
    starDensity: 36000,
    decorCount: 24,
    particleScale: 0.24,
    maxParticles: 52,
    maxFloaters: 12,
    maxFlashes: 5,
    drawShadows: false,
    drawVignette: false,
    drawScenery: false,
    drawAttackRange: true,
    simpleEnemies: true,
    detailCount: 58,
    maxBullets: 42,
    maxEnemyBullets: 34,
    worldPadding: 80,
    hudInterval: 0.24,
  };
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  game.width = Math.max(320, rect.width || window.innerWidth);
  game.height = Math.max(500, rect.height || window.innerHeight);
  game.dpr = Math.min(window.devicePixelRatio || 1, perf.dprCap);

  canvas.width = Math.floor(game.width * game.dpr);
  canvas.height = Math.floor(game.height * game.dpr);
  ctx.setTransform(game.dpr, 0, 0, game.dpr, 0, 0);

  buildStars();
}

function buildStars() {
  stars.length = 0;
  const count = Math.round((game.width * game.height) / perf.starDensity);
  const palette = ["#f8f7ee", "#f0c05a", "#d9aa68", "#76a7c8", "#9ecf8d"];

  for (let i = 0; i < count; i += 1) {
    stars.push({
      x: Math.random() * game.width,
      y: Math.random() * game.height,
      size: random(0.5, 2.2),
      speed: random(3, 13),
      phase: random(0, TAU),
      alpha: random(0.16, 0.54),
      color: palette[Math.floor(Math.random() * palette.length)],
    });
  }
}

function buildDecor(levelIndex) {
  const location = LOCATIONS[levelIndex];
  const rand = seededRandom(3400 + levelIndex * 131);
  const choices = location.decor || ["barrel", "rock", "plank"];
  const detailChoices = getGroundDetailChoices(location);
  decor.length = 0;
  groundDetails.length = 0;

  for (let i = 0; i < perf.decorCount; i += 1) {
    const type = choices[Math.floor(rand() * choices.length)];
    decor.push({
      x: rand() * location.worldW,
      y: rand() * location.worldH,
      w: 20 + rand() * 62,
      h: 14 + rand() * 46,
      angle: rand() * TAU,
      type,
      alpha: 0.42 + rand() * 0.32,
    });
  }

  for (let i = 0; i < perf.detailCount; i += 1) {
    const type = detailChoices[Math.floor(rand() * detailChoices.length)];
    groundDetails.push({
      x: 52 + rand() * (location.worldW - 104),
      y: 52 + rand() * (location.worldH - 104),
      w: 16 + rand() * 64,
      h: 8 + rand() * 34,
      angle: rand() * TAU,
      type,
      alpha: 0.18 + rand() * 0.22,
    });
  }

  if (location.landmark === "mine") {
    const goldCount = perf.low ? 28 : 42;
    for (let i = 0; i < goldCount; i += 1) {
      groundDetails.push({
        x: 64 + rand() * (location.worldW - 128),
        y: 64 + rand() * (location.worldH - 128),
        w: 8 + rand() * 18,
        h: 8 + rand() * 18,
        angle: rand() * TAU,
        type: "gold",
        alpha: 0.52 + rand() * 0.3,
      });
    }
  } else if (location.landmark === "canyon") {
    const cactusCount = perf.low ? 14 : 22;
    for (let i = 0; i < cactusCount; i += 1) {
      groundDetails.push({
        x: 80 + rand() * (location.worldW - 160),
        y: 80 + rand() * (location.worldH - 160),
        w: 24 + rand() * 24,
        h: 42 + rand() * 52,
        angle: rand() * 0.18 - 0.09,
        type: "lightCactus",
        alpha: 0.72 + rand() * 0.22,
      });
    }
  } else if (location.landmark === "ghost") {
    const mourningCount = perf.low ? 24 : 36;
    for (let i = 0; i < mourningCount; i += 1) {
      groundDetails.push({
        x: 70 + rand() * (location.worldW - 140),
        y: 70 + rand() * (location.worldH - 140),
        w: 18 + rand() * 34,
        h: 18 + rand() * 36,
        angle: rand() * 0.36 - 0.18,
        type: ["grave", "mourningCross", "candle"][Math.floor(rand() * 3)],
        alpha: 0.42 + rand() * 0.3,
      });
    }
  }
}

function getGroundDetailChoices(location) {
  if (location.landmark === "mine") {
    return ["stone", "tie", "ore", "gold", "track"];
  }
  if (location.landmark === "canyon") {
    return ["stone", "brush", "crack", "bone"];
  }
  if (location.landmark === "fort") {
    return ["plank", "post", "stone", "track"];
  }
  if (location.landmark === "ghost") {
    return ["plank", "post", "bone", "crack", "grave", "mourningCross", "candle"];
  }
  return ["dust", "plank", "post", "stone"];
}

function updateCamera() {
  const location = getLocation();

  if (location.worldW <= game.width) {
    camera.x = location.worldW / 2;
  } else {
    camera.x = clamp(player.x, game.width / 2, location.worldW - game.width / 2);
  }

  if (location.worldH <= game.height) {
    camera.y = location.worldH / 2;
  } else {
    camera.y = clamp(player.y, game.height / 2, location.worldH - game.height / 2);
  }
}

function worldToScreen(point) {
  return {
    x: point.x - camera.x + game.width / 2,
    y: point.y - camera.y + game.height / 2,
  };
}

function isWorldVisible(point, padding = perf.worldPadding) {
  const left = camera.x - game.width / 2 - padding;
  const right = camera.x + game.width / 2 + padding;
  const top = camera.y - game.height / 2 - padding;
  const bottom = camera.y + game.height / 2 + padding;
  return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
}

function applyShadow(color, blur) {
  if (!perf.drawShadows) {
    ctx.shadowBlur = 0;
    return;
  }

  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
}

function screenToWorld(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: clientX - rect.left + camera.x - game.width / 2,
    y: clientY - rect.top + camera.y - game.height / 2,
  };
}

function hidePanels(includeShop = true) {
  menuPanel.classList.add("panel-hidden");
  locationsPanel.classList.add("panel-hidden");
  pausePanel.classList.add("panel-hidden");
  resultPanel.classList.add("panel-hidden");
  if (includeShop) {
    shopPanel.classList.add("panel-hidden");
  }
}

function loadLocation(index, keepMenu = false) {
  const location = LOCATIONS[index];
  const character = getCharacter();
  const threat = getThreat(location);
  const finalHpBonus = getFinalLevelHpBonus(index);
  const playerMaxHp = getPlayerMaxHp(character, index);

  game.levelIndex = index;
  game.kills = 0;
  game.spawned = 0;
  game.bossSpawned = false;
  game.earned = 0;
  game.spawnTimer = threat.openingDelay || 0.35;
  game.portalOpen = false;
  game.portalPulse = 0;
  game.shake = 0;
  const gate = getGatePosition(location);
  game.portalX = gate.x;
  game.portalY = gate.y;

  enemies.length = 0;
  bullets.length = 0;
  enemyBullets.length = 0;
  pickups.length = 0;
  particles.length = 0;
  floaters.length = 0;
  flashes.length = 0;
  turrets.length = 0;

  player.x = 170;
  player.y = location.worldH / 2;
  player.vx = 0;
  player.vy = 0;
  player.hp = playerMaxHp;
  player.reload = 0;
  player.ability = 0;
  player.invulnerable = keepMenu ? 0 : 1.4;
  player.aimX = 1;
  player.aimY = 0;
  player.droneAngle = 0;
  player.droneReload = 0;

  buildDecor(index);
  levelBanner.textContent = location.name;
  menuFlavor.textContent = location.flavor;
  updateCamera();
  updateHud(true);
  updateMenuButtons();
  renderShop();
  renderLocations();

  if (!keepMenu) {
    hidePanels();
    game.state = "playing";
    if (finalHpBonus > 0) {
      showToast(`${location.name}: +${finalHpBonus} HP`, 1.8);
      addFloater(`+${finalHpBonus} HP`, player, "#9ecf8d");
      addFlash({
        type: "ring",
        x: player.x,
        y: player.y,
        radius: 86,
        life: 0.48,
        maxLife: 0.48,
        color: "#9ecf8d",
      });
      addBurst(player, "#9ecf8d", 32, 0.75);
      playSound("heal");
    } else {
      showToast(location.name, 1.4);
    }
  }
}

function startNewGame() {
  ensureAudio();
  resetSave();
  loadLocation(0);
  playSound("ui", { frequency: 620, endFrequency: 900 });
  playTone(900, 0.08, "sine", 0.018, 0.07);
}

function continueGame() {
  ensureAudio();
  loadLocation(saveData.levelIndex);
  playSound("ui", { frequency: 520, endFrequency: 780 });
  playTone(780, 0.08, "sine", 0.016, 0.06);
}

function updateMenuButtons() {
  if (!continueButton) {
    return;
  }

  const hasProgress = saveData.levelIndex > 0;
  continueButton.disabled = !hasProgress;
  continueButton.textContent = hasProgress ? `Продолжить: ${LOCATIONS[saveData.levelIndex].name}` : "Продолжить";
}

function setPaused(paused) {
  if (paused && game.state === "playing") {
    game.state = "paused";
    pauseButton.textContent = ">";
    pauseButton.classList.add("is-active");
    pausePanel.classList.remove("panel-hidden");
    playSound("ui", { frequency: 280, endFrequency: 190 });
  } else if (!paused && game.state === "paused") {
    game.state = "playing";
    pauseButton.textContent = "II";
    pauseButton.classList.remove("is-active");
    pausePanel.classList.add("panel-hidden");
    playSound("ui", { frequency: 420, endFrequency: 650 });
  }
}

function returnToMenu() {
  game.state = "menu";
  pauseButton.textContent = "II";
  pauseButton.classList.remove("is-active");
  hidePanels();
  menuPanel.classList.remove("panel-hidden");
  loadLocation(0, true);
}

function openShop() {
  if (game.state === "shop" || game.state === "locations") {
    return;
  }

  game.shopReturnState = game.state;
  hidePanels(false);
  shopPanel.classList.remove("panel-hidden");
  game.state = "shop";
  pauseButton.textContent = ">";
  pauseButton.classList.add("is-active");
  renderShop();
}

function closeShop() {
  shopPanel.classList.add("panel-hidden");
  pauseButton.textContent = "II";
  pauseButton.classList.remove("is-active");

  if (game.shopReturnState === "menu") {
    game.state = "menu";
    menuPanel.classList.remove("panel-hidden");
  } else if (game.shopReturnState === "paused") {
    game.state = "paused";
    pauseButton.textContent = ">";
    pauseButton.classList.add("is-active");
    pausePanel.classList.remove("panel-hidden");
  } else if (game.shopReturnState === "level-complete" || game.shopReturnState === "game-over") {
    game.state = game.shopReturnState;
    resultPanel.classList.remove("panel-hidden");
  } else {
    game.state = "playing";
  }

  updateHud();
}

function openLocations() {
  if (game.state !== "menu") {
    return;
  }

  hidePanels();
  renderLocations();
  locationsPanel.classList.remove("panel-hidden");
  game.state = "locations";
  playSound("ui", { frequency: 460, endFrequency: 620 });
}

function closeLocations() {
  hidePanels();
  menuPanel.classList.remove("panel-hidden");
  game.state = "menu";
  playSound("ui", { frequency: 360, endFrequency: 250 });
}

function startLocation(index) {
  const highestUnlocked = clamp(saveData.levelIndex, 0, LOCATIONS.length - 1);
  if (index > highestUnlocked) {
    showToast("Локация закрыта", 1.1);
    playTone(170, 0.06, "square", 0.014, 0, { endFrequency: 120 });
    return;
  }

  ensureAudio();
  loadLocation(index);
  playSound("ui", { frequency: 540, endFrequency: 760 });
  playTone(760, 0.08, "sine", 0.016, 0.06);
}

function finishLevel() {
  if (game.state !== "playing") {
    return;
  }

  game.state = "level-complete";
  saveData.levelIndex = Math.max(saveData.levelIndex, Math.min(game.levelIndex + 1, LOCATIONS.length - 1));
  persistSave();

  finalPlants.textContent = `${game.kills}/${getLocation().goal}`;
  finalWater.textContent = `+${game.earned}`;
  resultKicker.textContent = "Локация очищена";

  if (game.levelIndex >= LOCATIONS.length - 1) {
    resultTitle.textContent = "Рейд завершён";
    resultMessage.textContent = "Все локации отбиты, но монеты ещё зовут в новый круг.";
    nextButton.textContent = "Сначала";
  } else {
    resultTitle.textContent = "Ворота открыты";
    resultMessage.textContent = "Новая локация ждёт сильнее, чем предыдущая.";
    nextButton.textContent = "Следующая";
  }

  resultPanel.classList.remove("panel-hidden");
  addBurst({ x: game.portalX, y: game.portalY }, "#f0c05a", 70, 1.2);
  playSound("levelComplete");
}

function failLevel() {
  game.state = "game-over";
  finalPlants.textContent = `${game.kills}/${getLocation().goal}`;
  finalWater.textContent = `+${game.earned}`;
  resultKicker.textContent = "Рейд сорвался";
  resultTitle.textContent = "HP на нуле";
  resultMessage.textContent = "Монеты остаются у команды, а локацию можно пройти заново.";
  nextButton.textContent = "Повторить";
  resultPanel.classList.remove("panel-hidden");
  persistSave();
  playSound("fail");
}

function nextLevel() {
  ensureAudio();
  if (game.state === "game-over") {
    loadLocation(game.levelIndex);
    return;
  }

  if (game.levelIndex >= LOCATIONS.length - 1) {
    game.levelIndex = 0;
  } else {
    game.levelIndex += 1;
  }

  loadLocation(game.levelIndex);
}

function restartCurrentLevel() {
  ensureAudio();
  loadLocation(game.levelIndex);
}

function updateHud(force = false) {
  if (!force && game.state === "playing" && game.hudTimer > 0) {
    return;
  }

  const location = getLocation();
  const character = getCharacter();
  game.hudTimer = perf.hudInterval;
  levelValue.textContent = String(game.levelIndex + 1);
  waterValue.textContent = String(game.coins);
  plantsValue.textContent = `${game.kills}/${location.goal}`;
  energyValue.textContent = character.name;
  shieldValue.textContent = `${Math.max(0, Math.ceil(player.hp))}/${getPlayerMaxHp(character)}`;
  actionButton.style.opacity = player.ability > 0 && game.state === "playing" ? "0.5" : "1";
}

function showToast(text, duration = 1.4) {
  messageToast.textContent = text;
  messageToast.classList.remove("panel-hidden");
  game.toastTimer = duration;
}

function updateToast(dt) {
  if (game.toastTimer <= 0) {
    return;
  }

  game.toastTimer -= dt;
  if (game.toastTimer <= 0) {
    messageToast.classList.add("panel-hidden");
  }
}

function renderLocations() {
  const highestUnlocked = clamp(saveData.levelIndex, 0, LOCATIONS.length - 1);
  locationsGrid.innerHTML = "";

  LOCATIONS.forEach((location, index) => {
    const unlocked = index <= highestUnlocked;
    const row = document.createElement("article");
    row.className = "location-row";
    if (!unlocked) {
      row.classList.add("is-locked");
    }

    const badge = document.createElement("div");
    badge.className = "location-badge";
    badge.textContent = String(index + 1);
    badge.style.borderColor = `${location.accent}88`;
    badge.style.boxShadow = unlocked ? `0 0 18px ${location.accent}44` : "none";

    const copy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = location.name;
    const details = document.createElement("p");
    details.textContent = `Врагов: ${location.goal}${location.boss ? " + босс" : ""}. Сложность ${index + 1}/${LOCATIONS.length}.`;
    copy.append(title, details);

    const button = document.createElement("button");
    button.className = "buy-button";
    button.type = "button";
    button.textContent = unlocked ? "Играть" : "Закрыто";
    button.disabled = !unlocked;
    button.addEventListener("click", () => startLocation(index));

    row.append(badge, copy, button);
    locationsGrid.append(row);
  });
}

function renderShop() {
  shopCoins.textContent = String(game.coins);
  shopGrid.innerHTML = "";

  for (const character of CHARACTERS) {
    const unlocked = isUnlocked(character.id);
    if (character.secret && !unlocked) {
      continue;
    }

    const selected = saveData.selected === character.id;
    const row = document.createElement("article");
    row.className = "character-row";

    const badge = document.createElement("div");
    badge.className = "character-badge";
    badge.textContent = character.mark;
    badge.style.boxShadow = `0 0 24px ${character.color}55`;
    badge.style.borderColor = `${character.color}88`;

    const copy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = character.name;
    const details = document.createElement("p");
    details.textContent = `${character.mechanic} HP ${character.hp}.`;
    copy.append(title, details);

    const button = document.createElement("button");
    button.className = "buy-button";
    button.type = "button";

    if (selected) {
      button.textContent = "Выбран";
      button.classList.add("is-selected");
    } else if (unlocked) {
      button.textContent = "Выбрать";
    } else {
      button.textContent = `${character.cost} монет`;
      button.disabled = game.coins < character.cost;
    }

    button.addEventListener("click", () => {
      if (!isUnlocked(character.id)) {
        if (game.coins < character.cost) {
          showToast("Не хватает монет", 1.1);
          playTone(170, 0.06, "square", 0.014, 0, { endFrequency: 120 });
          return;
        }

        game.coins -= character.cost;
        saveData.unlocked.push(character.id);
      }

      saveData.selected = character.id;
      player.hp = clamp(player.hp, 1, getPlayerMaxHp(character));
      persistSave();
      renderShop();
      updateHud();
      showToast(character.name, 0.9);
      playSound("ui", { frequency: 620, endFrequency: 880 });
    });

    row.append(badge, copy, button);
    shopGrid.append(row);
  }
}

function ensureAudio() {
  if (!game.sound || audioContext) {
    if (audioContext?.state === "suspended") {
      audioContext.resume?.();
    }
    return;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (AudioContext) {
    audioContext = new AudioContext();
    audioMaster = audioContext.createGain();
    audioCompressor = audioContext.createDynamicsCompressor();
    audioMaster.gain.value = 0.82;
    audioCompressor.threshold.value = -28;
    audioCompressor.knee.value = 18;
    audioCompressor.ratio.value = 5;
    audioCompressor.attack.value = 0.004;
    audioCompressor.release.value = 0.18;
    audioMaster.connect(audioCompressor).connect(audioContext.destination);
  }
}

function getAudioOutput() {
  return audioMaster || audioContext?.destination;
}

function playTone(frequency, duration, type = "sine", volume = 0.03, delay = 0, options = {}) {
  if (!game.sound || !audioContext) {
    return;
  }

  const now = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const attack = options.attack ?? 0.006;
  const endFrequency = options.endFrequency || frequency;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  if (endFrequency !== frequency) {
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + duration);
  }
  if (options.detune) {
    oscillator.detune.setValueAtTime(options.detune, now);
  }
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  oscillator.connect(gain).connect(getAudioOutput());
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function getNoiseBuffer() {
  if (!audioContext) {
    return null;
  }

  if (!noiseBuffer) {
    const length = Math.floor(audioContext.sampleRate * 0.36);
    noiseBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
  }

  return noiseBuffer;
}

function playNoise(duration = 0.08, volume = 0.018, delay = 0, options = {}) {
  if (!game.sound || !audioContext) {
    return;
  }

  const buffer = getNoiseBuffer();
  if (!buffer) {
    return;
  }

  const now = audioContext.currentTime + delay;
  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  source.buffer = buffer;
  source.loop = true;
  filter.type = options.filterType || "bandpass";
  filter.frequency.setValueAtTime(options.frequency || 900, now);
  filter.Q.value = options.q || 0.8;
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + (options.attack ?? 0.006));
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  source.connect(filter).connect(gain).connect(getAudioOutput());
  source.start(now);
  source.stop(now + duration + 0.03);
}

function canPlaySound(name, cooldown = 0.035) {
  if (!audioContext) {
    return false;
  }

  const now = audioContext.currentTime;
  const last = soundCooldowns.get(name) || -Infinity;
  if (now - last < cooldown) {
    return false;
  }

  soundCooldowns.set(name, now);
  return true;
}

function playSound(name, options = {}) {
  if (!game.sound || !audioContext || !canPlaySound(name, options.cooldown)) {
    return;
  }

  if (name === "shot") {
    const character = options.character || {};
    if (character.id === "guardian") {
      playNoise(0.11, 0.03, 0, { frequency: 460, q: 0.7 });
      playTone(150, 0.08, "sawtooth", 0.018, 0, { endFrequency: 82 });
    } else if (character.id === WASTELAND_CHARACTER_ID) {
      playNoise(0.08, 0.025, 0, { frequency: 330, filterType: "lowpass", q: 0.8 });
      playTone(190, 0.09, "square", 0.014, 0, { endFrequency: 118 });
    } else if (character.id === "bomber") {
      playNoise(0.08, 0.026, 0, { frequency: 320, q: 0.8 });
      playTone(190, 0.1, "sawtooth", 0.018, 0, { endFrequency: 74 });
    } else if (character.id === "hunter") {
      playNoise(0.045, 0.016, 0, { frequency: 1900, q: 1.8 });
      playTone(720, 0.05, "triangle", 0.012, 0, { endFrequency: 360 });
    } else if (character.id === "spark") {
      playTone(840, 0.05, "sine", 0.014, 0, { endFrequency: 1240 });
      playTone(1260, 0.045, "triangle", 0.008, 0.035, { endFrequency: 740 });
    } else {
      playNoise(0.05, 0.018, 0, { frequency: 920, q: 1.1 });
      playTone(420, 0.055, "triangle", 0.014, 0, { endFrequency: 240 });
    }
    return;
  }

  if (name === "coin") {
    playTone(920, 0.055, "sine", 0.016, 0, { endFrequency: 1180 });
    playTone(1480, 0.07, "triangle", 0.01, 0.045);
    return;
  }

  if (name === "heal") {
    playTone(420, 0.08, "sine", 0.014);
    playTone(690, 0.09, "triangle", 0.012, 0.055);
    playTone(930, 0.12, "sine", 0.008, 0.12);
    return;
  }

  if (name === "hurt") {
    playNoise(0.09, 0.03, 0, { frequency: 240, filterType: "lowpass", q: 0.8 });
    playTone(150, 0.11, "sawtooth", 0.02, 0, { endFrequency: 70 });
    return;
  }

  if (name === "enemyDie") {
    playTone(360 + Math.random() * 80, 0.05, "triangle", 0.01, 0, { endFrequency: 180 });
    playNoise(0.045, 0.01, 0.01, { frequency: 700, q: 0.9 });
    return;
  }

  if (name === "bossSpawn") {
    playNoise(0.22, 0.036, 0, { frequency: 180, filterType: "lowpass", q: 0.6 });
    playTone(110, 0.24, "sawtooth", 0.032, 0, { endFrequency: 55 });
    playTone(260, 0.18, "triangle", 0.02, 0.1, { endFrequency: 160 });
    return;
  }

  if (name === "enemyShot") {
    playNoise(0.035, 0.01, 0, { frequency: 760, q: 1.2 });
    playTone(300, 0.045, "square", 0.006, 0, { endFrequency: 210 });
    return;
  }

  if (name === "bossShot") {
    playNoise(0.07, 0.018, 0, { frequency: 360, filterType: "lowpass", q: 0.8 });
    playTone(190, 0.075, "square", 0.012, 0, { endFrequency: 120 });
    return;
  }

  if (name === "bossDie") {
    playTone(180, 0.16, "sawtooth", 0.028, 0, { endFrequency: 70 });
    playTone(520, 0.18, "triangle", 0.018, 0.08, { endFrequency: 880 });
    playNoise(0.2, 0.026, 0.02, { frequency: 260, filterType: "lowpass", q: 0.7 });
    return;
  }

  if (name === "portal") {
    playTone(480, 0.12, "triangle", 0.018, 0, { endFrequency: 720 });
    playTone(860, 0.16, "sine", 0.014, 0.08, { endFrequency: 1180 });
    playTone(1320, 0.18, "triangle", 0.01, 0.16);
    return;
  }

  if (name === "levelComplete") {
    playTone(620, 0.1, "triangle", 0.024);
    playTone(880, 0.12, "triangle", 0.018, 0.08);
    playTone(1240, 0.18, "sine", 0.014, 0.18);
    return;
  }

  if (name === "fail") {
    playNoise(0.14, 0.024, 0, { frequency: 160, filterType: "lowpass", q: 0.7 });
    playTone(160, 0.2, "sawtooth", 0.026, 0, { endFrequency: 58 });
    return;
  }

  if (name === "ability") {
    playTone(360, 0.08, "triangle", 0.016, 0, { endFrequency: 620 });
    playTone(840, 0.11, "sine", 0.012, 0.055, { endFrequency: 1120 });
    return;
  }

  if (name === "cheatOn") {
    playTone(560, 0.08, "triangle", 0.02);
    playTone(880, 0.1, "sine", 0.018, 0.06);
    playTone(1320, 0.14, "triangle", 0.014, 0.13);
    return;
  }

  if (name === "cheatOff") {
    playTone(420, 0.075, "triangle", 0.014, 0, { endFrequency: 260 });
    playTone(240, 0.09, "sine", 0.012, 0.055);
    return;
  }

  if (name === "ui") {
    playTone(options.frequency || 520, 0.045, "triangle", 0.012, 0, { endFrequency: options.endFrequency || options.frequency || 520 });
  }
}

function getInputVector() {
  let x = 0;
  let y = 0;

  if (keys.has("ArrowLeft") || keys.has("KeyA")) {
    x -= 1;
  }
  if (keys.has("ArrowRight") || keys.has("KeyD")) {
    x += 1;
  }
  if (keys.has("ArrowUp") || keys.has("KeyW")) {
    y -= 1;
  }
  if (keys.has("ArrowDown") || keys.has("KeyS")) {
    y += 1;
  }

  if (Math.abs(input.joyX) > 0.08 || Math.abs(input.joyY) > 0.08) {
    x += input.joyX;
    y += input.joyY;
  }

  const vector = normalize(x, y);
  return { x: vector.x, y: vector.y, moving: vector.length > 0.1 };
}

function updatePlayer(dt) {
  const location = getLocation();
  const character = getCharacter();
  const movement = getInputVector();
  const smoothing = 1 - Math.pow(0.0015, dt);
  const targetVx = movement.x * character.speed;
  const targetVy = movement.y * character.speed;

  player.vx = lerp(player.vx, targetVx, smoothing);
  player.vy = lerp(player.vy, targetVy, smoothing);
  player.x += player.vx * dt;
  player.y += player.vy * dt;
  player.x = clamp(player.x, player.radius + 18, location.worldW - player.radius - 18);
  player.y = clamp(player.y, player.radius + 18, location.worldH - player.radius - 18);
  player.bob += dt * (movement.moving ? 10 : 4);

  if (Math.abs(player.vx) > 5) {
    player.face = player.vx > 0 ? 1 : -1;
  }

  player.invulnerable = Math.max(0, player.invulnerable - dt);
  player.reload = Math.max(0, player.reload - dt);
  player.ability = Math.max(0, player.ability - dt);
  player.droneAngle += dt * 3.2;
  player.droneReload = Math.max(0, player.droneReload - dt);
}

function updateWeapons(dt) {
  const character = getCharacter();
  const target = findNearestEnemy(player.x, player.y, getAttackRange(character), {
    bossRange: getBossAttackRange(character),
  });

  if (target) {
    const aim = normalize(target.x - player.x, target.y - player.y);
    player.aimX = aim.x;
    player.aimY = aim.y;

    if (player.reload <= 0) {
      fireCharacterWeapon(character, player.x, player.y, target.x, target.y, { bossTarget: target.boss });
      player.reload = character.reload;
    }
  }

  if (character.drone && player.droneReload <= 0) {
    const drone = getDronePosition();
    const droneTarget = findNearestEnemy(drone.x, drone.y, 260);
    if (droneTarget) {
      fireBullet({
        x: drone.x,
        y: drone.y,
        tx: droneTarget.x,
        ty: droneTarget.y,
        speed: 720,
        damage: 10,
        radius: 4,
        life: 0.85,
        color: character.accent,
      });
      player.droneReload = 0.64;
    }
  }
}

function getAttackRange(character = getCharacter()) {
  return character.range || 280;
}

function getBossAttackRange(character = getCharacter()) {
  return Math.round(getAttackRange(character) * BOSS_ATTACK_RANGE_MULTIPLIER);
}

function getBulletLife(character, bossTarget = false) {
  const baseLife = character.bulletLife || (character.id === "spark" ? 0.72 : character.id === "guardian" ? 0.5 : 0.82);
  if (!bossTarget) {
    return baseLife;
  }

  return Math.max(baseLife, getBossAttackRange(character) / character.bulletSpeed + 0.12);
}

function fireWastelandVolley(character, x, y, tx, ty, options = {}) {
  const aim = Math.atan2(ty - y, tx - x);
  const count = options.count || character.bossSpread || 5;
  const spread = options.spread ?? character.bossSpreadAngle ?? 0.48;

  for (let i = 0; i < count; i += 1) {
    const offset = count === 1 ? 0 : (i / (count - 1) - 0.5) * spread;
    fireBullet({
      x,
      y,
      tx: x + Math.cos(aim + offset) * 100,
      ty: y + Math.sin(aim + offset) * 100,
      speed: options.speed || character.bulletSpeed,
      damage: options.damage || character.damage,
      radius: options.radius || character.bulletRadius || 8,
      life: options.life || getBulletLife(character, options.bossTarget),
      color: character.accent,
    });
  }
}

function fireCharacterWeapon(character, x, y, tx, ty, options = {}) {
  const bossTarget = Boolean(options.bossTarget);

  if (character.id === WASTELAND_CHARACTER_ID) {
    fireWastelandVolley(character, x, y, tx, ty, { bossTarget });
    playSound("shot", { character });
    return;
  }

  if (character.id === "guardian") {
    const aim = Math.atan2(ty - y, tx - x);
    const pellets = character.pellets || 5;
    for (let i = 0; i < pellets; i += 1) {
      const spread = (i - (pellets - 1) / 2) * 0.14;
      fireBullet({
        x,
        y,
        tx: x + Math.cos(aim + spread) * 100,
        ty: y + Math.sin(aim + spread) * 100,
        speed: character.bulletSpeed,
        damage: character.damage,
        radius: 5,
        life: getBulletLife(character, bossTarget),
        color: character.color,
      });
    }
    playSound("shot", { character });
    return;
  }

  fireBullet({
    x,
    y,
    tx,
    ty,
    speed: character.bulletSpeed,
    damage: character.damage,
    radius: character.bulletRadius || (character.id === "spark" ? 4 : 5),
    life: getBulletLife(character, bossTarget),
    color: character.color,
    pierce: character.pierce || 0,
    chain: character.chain || 0,
    explosionRadius: character.explosionRadius || 0,
  });
  playSound("shot", { character });
}

function manualShot(world) {
  if (game.state !== "playing") {
    return;
  }

  const character = getCharacter();
  const aim = normalize(world.x - player.x, world.y - player.y);
  if (aim.length > 0.1) {
    player.aimX = aim.x;
    player.aimY = aim.y;
  }

  if (player.reload <= 0.08) {
    fireCharacterWeapon(character, player.x, player.y, world.x, world.y);
    player.reload = character.reload * 0.9;
  }
}

function fireBullet(options) {
  const direction = normalize(options.tx - options.x, options.ty - options.y);
  if (!direction.length) {
    return;
  }

  if (bullets.length >= perf.maxBullets) {
    bullets.shift();
  }

  bullets.push({
    x: options.x + direction.x * 24,
    y: options.y + direction.y * 24,
    vx: direction.x * options.speed,
    vy: direction.y * options.speed,
    damage: options.damage,
    radius: options.radius,
    life: options.life,
    maxLife: options.life,
    color: options.color,
    pierce: options.pierce || 0,
    chain: options.chain || 0,
    explosionRadius: options.explosionRadius || 0,
  });
}

function useAbility() {
  if (game.state !== "playing" || player.ability > 0) {
    return;
  }

  ensureAudio();
  const character = getCharacter();
  const target = findNearestEnemy(player.x, player.y, character.range + 120);

  if (character.id === "ranger") {
    const tx = target ? target.x : player.x + player.aimX * 500;
    const ty = target ? target.y : player.y + player.aimY * 500;
    fireBullet({
      x: player.x,
      y: player.y,
      tx,
      ty,
      speed: 920,
      damage: 52,
      radius: 7,
      life: 0.95,
      color: character.accent,
      pierce: 5,
    });
    addFloater("залп", player, character.accent);
  } else if (character.id === "spark") {
    chainLightning({ x: player.x, y: player.y }, 5, 26, 330);
    addBurst(player, character.color, 36, 0.55);
    addFloater("рикошет", player, character.color);
  } else if (character.id === "guardian") {
    addFlash({ type: "ring", x: player.x, y: player.y, radius: 190, life: 0.32, maxLife: 0.32, color: character.accent });
    for (let e = enemies.length - 1; e >= 0; e -= 1) {
      const enemy = enemies[e];
      const gap = Math.hypot(enemy.x - player.x, enemy.y - player.y);
      if (gap <= 190) {
        const away = normalize(enemy.x - player.x, enemy.y - player.y);
        enemy.x += away.x * 34;
        enemy.y += away.y * 34;
        damageEnemy(enemy, 34, character.accent);
      }
    }
    addFloater("удар", player, character.accent);
  } else if (character.id === "engineer") {
    turrets.push({
      x: player.x,
      y: player.y,
      life: 9,
      reload: 0.2,
      angle: 0,
      color: character.color,
    });
    addBurst(player, character.color, 26, 0.5);
    addFloater("турель", player, character.color);
  } else if (character.id === "hunter") {
    const tx = target ? target.x : player.x + player.aimX * 660;
    const ty = target ? target.y : player.y + player.aimY * 660;
    fireBullet({
      x: player.x,
      y: player.y,
      tx,
      ty,
      speed: 1080,
      damage: 92,
      radius: 6,
      life: 1.1,
      color: character.accent,
      pierce: 8,
    });
    addFloater("метко", player, character.accent);
  } else if (character.id === WASTELAND_CHARACTER_ID) {
    const tx = target ? target.x : player.x + player.aimX * 680;
    const ty = target ? target.y : player.y + player.aimY * 680;
    fireWastelandVolley(character, player.x, player.y, tx, ty, {
      count: 7,
      spread: 0.72,
      damage: 24,
      radius: 9,
      life: 1.25,
    });
    addFlash({ type: "ring", x: player.x, y: player.y, radius: 122, life: 0.3, maxLife: 0.3, color: character.accent });
    addFloater("залп пустоши", player, character.accent);
  } else if (character.id === "bomber") {
    const blast = target || {
      x: player.x + player.aimX * 230,
      y: player.y + player.aimY * 230,
    };
    explodeAt(blast.x, blast.y, 148, 54, character.accent);
    addFloater("динамит", player, character.accent);
  }

  player.ability = character.abilityCd;
  playSound("ability");
  updateHud();
}

function updateTurrets(dt) {
  for (let i = turrets.length - 1; i >= 0; i -= 1) {
    const turret = turrets[i];
    turret.life -= dt;
    turret.reload -= dt;
    turret.angle += dt * 4;

    if (turret.life <= 0) {
      addBurst(turret, turret.color, 16, 0.4);
      turrets.splice(i, 1);
      continue;
    }

    if (turret.reload <= 0) {
      const target = findNearestEnemy(turret.x, turret.y, 460);
      if (target) {
        fireBullet({
          x: turret.x,
          y: turret.y,
          tx: target.x,
          ty: target.y,
          speed: 760,
          damage: 12,
          radius: 4,
          life: 0.74,
          color: turret.color,
        });
        turret.reload = 0.48;
      }
    }
  }
}

function findNearestEnemy(x, y, range = Number.POSITIVE_INFINITY, options = {}) {
  let nearest = null;
  let bestSq = Number.POSITIVE_INFINITY;
  const bossRange = options.bossRange || range;

  for (const enemy of enemies) {
    const dx = enemy.x - x;
    const dy = enemy.y - y;
    const gapSq = dx * dx + dy * dy;
    const enemyRange = enemy.boss ? bossRange : range;
    if (gapSq > enemyRange * enemyRange) {
      continue;
    }

    if (gapSq < bestSq) {
      nearest = enemy;
      bestSq = gapSq;
    }
  }

  return nearest;
}

function weightedEnemy(pool) {
  const total = pool.reduce((sum, item) => sum + item[1], 0);
  let roll = Math.random() * total;

  for (const [type, weight] of pool) {
    roll -= weight;
    if (roll <= 0) {
      return type;
    }
  }

  return pool[0][0];
}

function updateSpawner(dt) {
  const location = getLocation();
  const threat = getThreat(location);
  const rawMaxActive = location.maxActive + threat.activeBonus;
  const maxActive = perf.low ? Math.min(rawMaxActive, 9) : rawMaxActive;
  const regularGoal = location.boss ? location.goal - 1 : location.goal;

  if (location.boss && game.spawned >= regularGoal && !game.bossSpawned) {
    const clearEnoughForBoss = enemies.length <= Math.max(2, Math.floor(maxActive * 0.35));
    if (!clearEnoughForBoss) {
      return;
    }

    game.spawnTimer -= dt;
    if (game.spawnTimer > 0) {
      return;
    }

    spawnBoss(location.boss);
    game.spawnTimer = location.spawnRate * threat.spawn;
    return;
  }

  if (game.spawned >= regularGoal || enemies.length >= maxActive) {
    return;
  }

  game.spawnTimer -= dt;
  if (game.spawnTimer > 0) {
    return;
  }

  spawnEnemy();
  game.spawnTimer = location.spawnRate * threat.spawn * random(0.55, 1.15);
}

function spawnBoss(config) {
  const location = getLocation();
  const threat = getThreat(location);
  const typeId = config.type;
  const type = ENEMY_TYPES[typeId];
  const x = clamp(
    typeof config.x === "number" ? config.x : location.worldW * (config.xRatio || 0.74),
    type.radius + 28,
    location.worldW - type.radius - 28,
  );
  const y = clamp(
    typeof config.y === "number" ? config.y : location.worldH * (config.yRatio || 0.5),
    type.radius + 28,
    location.worldH - type.radius - 28,
  );

  enemies.push({
    id: globalThis.crypto?.randomUUID?.() || String(Math.random()),
    type: typeId,
    boss: true,
    x,
    y,
    vx: 0,
    vy: 0,
    radius: type.radius,
    hp: type.hp,
    maxHp: type.hp,
    speed: type.speed,
    damage: Math.max(2, Math.round(type.damage * (1 + (threat.damage - 1) * 0.45))),
    range: type.range * (1 + (threat.projectile - 1) * 0.32),
    projectileSpeed: (type.projectileSpeed || 260) * (1 + (threat.projectile - 1) * 0.25),
    reloadScale: Math.max(0.78, threat.reload),
    reload: 0.9,
    phase: random(0, TAU),
    hit: 0,
  });

  game.spawned += 1;
  game.bossSpawned = true;
  game.shake = 14;

  const maxHp = getPlayerMaxHp();
  const healed = Math.max(0, maxHp - player.hp);
  player.hp = maxHp;
  updateHud(true);
  addFloater(healed > 0 ? `+${Math.ceil(healed)} HP` : "HP максимум", player, "#9ecf8d");
  addFlash({
    type: "ring",
    x: player.x,
    y: player.y,
    radius: 92,
    life: 0.42,
    maxLife: 0.42,
    color: "#9ecf8d",
  });
  addBurst(player, "#9ecf8d", 28, 0.7);

  showToast(`${type.name} вышел на дуэль`, 1.6);
  addBurst({ x, y }, type.accent, 62, 1.05);
  playSound("bossSpawn");
}

function spawnEnemy() {
  const location = getLocation();
  const threat = getThreat(location);
  const typeId = weightedEnemy(location.pool);
  const type = ENEMY_TYPES[typeId];
  const hpScale = threat.hp;
  const speedScale = threat.speed;
  const damageScale = threat.damage;
  const projectileScale = threat.projectile;
  const reloadScale = threat.reload;
  const safeDistance = threat.safeDistance || 290;
  const margin = 120;
  let x = player.x;
  let y = player.y;

  for (let attempt = 0; attempt < 16; attempt += 1) {
    const side = Math.floor(Math.random() * 4);
    if (side === 0) {
      x = clamp(camera.x - game.width / 2 - margin, 40, location.worldW - 40);
      y = clamp(camera.y + random(-game.height / 2, game.height / 2), 40, location.worldH - 40);
    } else if (side === 1) {
      x = clamp(camera.x + game.width / 2 + margin, 40, location.worldW - 40);
      y = clamp(camera.y + random(-game.height / 2, game.height / 2), 40, location.worldH - 40);
    } else if (side === 2) {
      x = clamp(camera.x + random(-game.width / 2, game.width / 2), 40, location.worldW - 40);
      y = clamp(camera.y - game.height / 2 - margin, 40, location.worldH - 40);
    } else {
      x = clamp(camera.x + random(-game.width / 2, game.width / 2), 40, location.worldW - 40);
      y = clamp(camera.y + game.height / 2 + margin, 40, location.worldH - 40);
    }

    if (Math.hypot(x - player.x, y - player.y) > safeDistance) {
      break;
    }
  }

  enemies.push({
    id: globalThis.crypto?.randomUUID?.() || String(Math.random()),
    type: typeId,
    x,
    y,
    vx: 0,
    vy: 0,
    radius: type.radius,
    hp: type.hp * hpScale,
    maxHp: type.hp * hpScale,
    speed: type.speed * speedScale,
    damage: Math.max(1, Math.round(type.damage * damageScale)),
    range: type.range ? Math.min(type.range * (1 + (projectileScale - 1) * 0.45), ENEMY_SHOOT_RANGE_LIMIT) : 0,
    projectileSpeed: 250 * projectileScale,
    reloadScale,
    reload: random(0.4, 1.4) * reloadScale,
    phase: random(0, TAU),
    hit: 0,
  });
  game.spawned += 1;
}

function updateEnemies(dt) {
  const location = getLocation();

  for (const enemy of enemies) {
    const type = ENEMY_TYPES[enemy.type];
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const gap = Math.hypot(dx, dy);
    const invGap = gap > 0.0001 ? 1 / gap : 0;
    const toPlayerX = dx * invGap;
    const toPlayerY = dy * invGap;
    const rangedRange = enemy.range || type.range || 0;
    const enemySpeed = enemy.speed || type.speed;
    let desiredSpeed = type.ranged && gap < rangedRange * 0.72 ? -enemySpeed * 0.35 : enemySpeed;
    if (type.boss && rangedRange) {
      if (gap > rangedRange * 0.78) {
        desiredSpeed = enemySpeed;
      } else if (gap < rangedRange * 0.48) {
        desiredSpeed = -enemySpeed * 0.46;
      } else {
        desiredSpeed = enemySpeed * 0.16;
      }
    }

    const steer = 1 - Math.pow(0.006, dt);
    enemy.vx = lerp(enemy.vx, toPlayerX * desiredSpeed, steer);
    enemy.vy = lerp(enemy.vy, toPlayerY * desiredSpeed, steer);
  }

  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    for (let j = i + 1; j < enemies.length; j += 1) {
      const other = enemies[j];
      const dx = enemy.x - other.x;
      const dy = enemy.y - other.y;
      const minGap = enemy.radius + other.radius + 6;
      const distSq = dx * dx + dy * dy;

      if (distSq <= 0.0001 || distSq >= minGap * minGap) {
        continue;
      }

      const dist = Math.sqrt(distSq);
      const push = (1 - dist / minGap) * 30 * dt;
      const nx = dx / dist;
      const ny = dy / dist;
      enemy.vx += nx * push;
      enemy.vy += ny * push;
      other.vx -= nx * push;
      other.vy -= ny * push;
    }
  }

  for (const enemy of enemies) {
    const type = ENEMY_TYPES[enemy.type];
    const rangedRange = enemy.range || type.range || 0;

    enemy.x = clamp(enemy.x + enemy.vx * dt, enemy.radius + 10, location.worldW - enemy.radius - 10);
    enemy.y = clamp(enemy.y + enemy.vy * dt, enemy.radius + 10, location.worldH - enemy.radius - 10);
    enemy.reload = Math.max(0, enemy.reload - dt);
    enemy.hit = Math.max(0, enemy.hit - dt * 5);

    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const gap = Math.hypot(dx, dy);

    if (type.ranged && gap < rangedRange && enemy.reload <= 0) {
      if (type.boss) {
        shootEnemySpread(enemy, type);
      } else {
        shootEnemyProjectile(enemy, type);
      }
      enemy.reload = type.reload * (enemy.reloadScale || 1) * random(0.75, 1.15);
    }

    if (gap < enemy.radius + player.radius - 2) {
      damagePlayer(enemy.damage || type.damage, enemy);
    }
  }
}

function shootEnemySpread(enemy, type) {
  const count = perf.low && type.boss ? Math.min(type.spread || 1, 3) : type.spread || 1;
  const spread = type.spreadAngle || 0;

  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1) - 0.5;
    shootEnemyProjectile(enemy, type, t * spread, i === Math.floor(count / 2));
  }

  addFlash({ type: "ring", x: enemy.x, y: enemy.y, radius: enemy.radius + 28, life: 0.22, maxLife: 0.22, color: type.accent });
}

function shootEnemyProjectile(enemy, type, angleOffset = 0, withSound = true) {
  const baseAngle = Math.atan2(player.y - enemy.y, player.x - enemy.x) + angleOffset;
  const direction = {
    x: Math.cos(baseAngle),
    y: Math.sin(baseAngle),
  };

  if (enemyBullets.length >= perf.maxEnemyBullets) {
    enemyBullets.shift();
  }

  enemyBullets.push({
    x: enemy.x + direction.x * (enemy.radius + 8),
    y: enemy.y + direction.y * (enemy.radius + 8),
    vx: direction.x * (enemy.projectileSpeed || 250),
    vy: direction.y * (enemy.projectileSpeed || 250),
    radius: type.boss ? 9 : 7,
    damage: enemy.damage || type.damage,
    life: type.boss ? 3.4 : 3,
    color: type.accent,
  });
  if (withSound) {
    playSound(type.boss ? "bossShot" : "enemyShot", { cooldown: type.boss ? 0.08 : 0.05 });
  }
}

function damagePlayer(amount, source) {
  if (player.invulnerable > 0 || game.state !== "playing") {
    return;
  }

  if (game.immortal) {
    player.invulnerable = 0.18;
    addFloater("0", player, "#f0c05a");
    return;
  }

  player.hp -= amount;
  player.invulnerable = 0.82;
  game.shake = 11;

  const away = normalize(player.x - source.x, player.y - source.y);
  player.x += away.x * 32;
  player.y += away.y * 32;
  player.vx += away.x * 120;
  player.vy += away.y * 120;

  addBurst(player, "#bf6f45", 28, 0.9);
  addFloater(`-${amount}`, player, "#bf6f45");
  playSound("hurt");
  updateHud();

  if (player.hp <= 0) {
    failLevel();
  }
}

function updateBullets(dt) {
  const location = getLocation();

  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const bullet = bullets[i];
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    bullet.life -= dt;

    let remove = bullet.life <= 0 || bullet.x < -80 || bullet.y < -80 || bullet.x > location.worldW + 80 || bullet.y > location.worldH + 80;
    let exploded = false;

    for (let e = enemies.length - 1; e >= 0; e -= 1) {
      const enemy = enemies[e];
      if (remove && bullet.pierce <= 0) {
        break;
      }

      const hitRadius = enemy.radius + bullet.radius;
      const hitDx = enemy.x - bullet.x;
      const hitDy = enemy.y - bullet.y;
      if (hitDx * hitDx + hitDy * hitDy <= hitRadius * hitRadius) {
        if (bullet.explosionRadius) {
          explodeAt(bullet.x, bullet.y, bullet.explosionRadius, bullet.damage, bullet.color);
          exploded = true;
          remove = true;
          break;
        } else {
          damageEnemy(enemy, bullet.damage, bullet.color);
          if (bullet.chain > 0) {
            chainLightning(enemy, bullet.chain, bullet.damage * 0.62, 220);
          }
          if (bullet.pierce > 0) {
            bullet.pierce -= 1;
          } else {
            remove = true;
          }
        }
      }
    }

    if (remove && bullet.explosionRadius && !exploded && bullet.life <= 0) {
      explodeAt(bullet.x, bullet.y, bullet.explosionRadius, bullet.damage, bullet.color);
    }

    if (remove) {
      bullets.splice(i, 1);
    }
  }

  for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
    const bullet = enemyBullets[i];
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    bullet.life -= dt;

    const hitRadius = bullet.radius + player.radius;
    const dx = bullet.x - player.x;
    const dy = bullet.y - player.y;
    const hit = dx * dx + dy * dy < hitRadius * hitRadius;
    if (hit) {
      damagePlayer(bullet.damage, bullet);
    }

    if (hit || bullet.life <= 0 || bullet.x < -80 || bullet.y < -80 || bullet.x > location.worldW + 80 || bullet.y > location.worldH + 80) {
      enemyBullets.splice(i, 1);
    }
  }
}

function explodeAt(x, y, radius, damage, color) {
  addFlash({ type: "ring", x, y, radius, life: 0.24, maxLife: 0.24, color });
  addBurst({ x, y }, color, 24, 0.72);

  const radiusSq = radius * radius;
  for (let i = enemies.length - 1; i >= 0; i -= 1) {
    const enemy = enemies[i];
    const dx = enemy.x - x;
    const dy = enemy.y - y;
    const distSq = dx * dx + dy * dy;
    if (distSq > radiusSq) {
      continue;
    }

    const falloff = 1 - Math.sqrt(distSq) / radius;
    damageEnemy(enemy, damage * (0.62 + falloff * 0.38), color);
  }
}

function damageEnemy(enemy, amount, color = "#f8f7ee") {
  if (!enemies.includes(enemy)) {
    return;
  }

  enemy.hp -= amount * game.damageMultiplier;
  enemy.hit = 1;
  addBurst(enemy, color, 4, 0.28);

  if (enemy.hp <= 0) {
    killEnemy(enemy);
  }
}

function killEnemy(enemy) {
  const index = enemies.indexOf(enemy);
  if (index === -1) {
    return;
  }

  const type = ENEMY_TYPES[enemy.type];
  enemies.splice(index, 1);
  game.kills += 1;
  addBurst(enemy, type.color, type.boss ? 86 : 24, type.boss ? 1.18 : 0.8);
  const coinCount = type.boss ? type.coin : 1;
  addFloater(`+${coinCount}`, enemy, getLocation().coin);

  for (let i = 0; i < coinCount; i += 1) {
    const scatter = type.boss ? 44 : 0;
    dropPickup("coin", enemy.x + random(-scatter, scatter), enemy.y + random(-scatter, scatter), 1);
  }

  if (type.boss) {
    game.shake = 18;
    showToast(`${type.name} повержен`, 1.65);
    dropPickup("heart", enemy.x, enemy.y - enemy.radius, 2);
    playSound("bossDie");
  } else if (Math.random() < 0.1) {
    dropPickup("heart", enemy.x + random(-18, 18), enemy.y + random(-18, 18), 2);
    playSound("enemyDie");
  } else {
    playSound("enemyDie");
  }

  updateHud();
  maybeOpenPortal();
}

function chainLightning(origin, jumps, damage, range) {
  let current = origin;
  const hit = new Set();

  for (let i = 0; i < jumps; i += 1) {
    let best = null;
    let bestGap = range;

    for (const enemy of enemies) {
      if (hit.has(enemy)) {
        continue;
      }
      const gap = Math.hypot(enemy.x - current.x, enemy.y - current.y);
      if (gap < bestGap) {
        best = enemy;
        bestGap = gap;
      }
    }

    if (!best) {
      return;
    }

    hit.add(best);
    addFlash({
      type: "line",
      x: current.x,
      y: current.y,
      x2: best.x,
      y2: best.y,
      life: 0.18,
      maxLife: 0.18,
      color: "#76a7c8",
    });
    damageEnemy(best, damage, "#76a7c8");
    current = best;
  }
}

function dropPickup(type, x, y, value) {
  const pickupLimit = perf.low ? 44 : 72;
  if (pickups.length >= pickupLimit) {
    if (type === "coin") {
      game.coins += value;
      game.earned += value;
      queueSave();
      updateHud(true);
    }
    return;
  }

  const angle = random(0, TAU);
  const speed = random(45, 130);
  pickups.push({
    type,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    value,
    bob: random(0, TAU),
  });
}

function updatePickups(dt) {
  for (let i = pickups.length - 1; i >= 0; i -= 1) {
    const pickup = pickups[i];
    pickup.x += pickup.vx * dt;
    pickup.y += pickup.vy * dt;
    pickup.vx *= Math.pow(0.08, dt);
    pickup.vy *= Math.pow(0.08, dt);
    pickup.bob += dt * 4;

    const dx = player.x - pickup.x;
    const dy = player.y - pickup.y;
    const gapSq = dx * dx + dy * dy;
    const magnetized = pickup.type === "coin" || gapSq < 150 * 150;
    if (magnetized) {
      const gap = Math.sqrt(gapSq);
      if (gap > 0.0001) {
        const strength = pickup.type === "coin" ? 980 : 760;
        pickup.vx += (dx / gap) * strength * dt;
        pickup.vy += (dy / gap) * strength * dt;
      }
    }

    const collectRadius = player.radius + 18;
    if (gapSq < collectRadius * collectRadius) {
      if (pickup.type === "coin") {
        game.coins += pickup.value;
        game.earned += pickup.value;
        addFloater(`+${pickup.value}`, player, getLocation().coin);
        playSound("coin", { cooldown: 0.045 });
        queueSave();
      } else {
        const character = getCharacter();
        player.hp = Math.min(getPlayerMaxHp(character), player.hp + pickup.value);
        addFloater("+HP", player, "#9ecf8d");
        playSound("heal");
      }
      pickups.splice(i, 1);
      updateHud();
    }
  }
}

function maybeOpenPortal() {
  const location = getLocation();
  if (game.portalOpen || game.kills < location.goal || enemies.length > 0) {
    return;
  }

  game.portalOpen = true;
  showToast("Ворота открыты", 1.35);
  addBurst({ x: game.portalX, y: game.portalY }, location.accent, 48, 1);
  playSound("portal");
}

function updatePortal(dt) {
  game.portalPulse += dt;
  if (!game.portalOpen) {
    return;
  }

  const dx = player.x - game.portalX;
  const dy = player.y - game.portalY;
  if (dx * dx + dy * dy < 70 * 70) {
    finishLevel();
  }
}

function updateEffects(dt) {
  updateQueuedSave(dt);

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const particle = particles[i];
    particle.life -= dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= Math.pow(0.16, dt);
    particle.vy *= Math.pow(0.32, dt);

    if (particle.life <= 0) {
      particles.splice(i, 1);
    }
  }

  for (let i = floaters.length - 1; i >= 0; i -= 1) {
    const floater = floaters[i];
    floater.life -= dt;
    floater.y += floater.vy * dt;

    if (floater.life <= 0) {
      floaters.splice(i, 1);
    }
  }

  for (let i = flashes.length - 1; i >= 0; i -= 1) {
    flashes[i].life -= dt;
    if (flashes[i].life <= 0) {
      flashes.splice(i, 1);
    }
  }

  game.shake = Math.max(0, game.shake - dt * 18);
  updateToast(dt);
}

function addBurst(origin, color, amount, force = 1) {
  if (perf.low && amount <= 6) {
    return;
  }

  if (perf.low && !isWorldVisible(origin, 260)) {
    return;
  }

  const budget = Math.max(1, Math.round(amount * perf.particleScale));
  const freeSlots = Math.max(0, perf.maxParticles - particles.length);
  const count = Math.min(budget, freeSlots);

  for (let i = 0; i < count; i += 1) {
    const angle = random(0, TAU);
    const speed = random(28, 170) * force;
    const life = random(0.32, 0.82);
    particles.push({
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: random(1.4, 4.2),
      color,
      life,
      maxLife: life,
    });
  }
}

function addFloater(text, origin, color = "#f8f7ee") {
  if (floaters.length >= perf.maxFloaters) {
    floaters.shift();
  }

  floaters.push({
    text,
    x: origin.x,
    y: origin.y - 24,
    vy: -36,
    life: 0.95,
    maxLife: 0.95,
    color,
  });
}

function addFlash(flash) {
  if (flashes.length >= perf.maxFlashes) {
    flashes.shift();
  }

  flashes.push(flash);
}

function update(dt) {
  game.hudTimer = Math.max(0, game.hudTimer - dt);
  updatePlayer(dt);
  updateCamera();
  updateSpawner(dt);
  updateWeapons(dt);
  updateTurrets(dt);
  updateEnemies(dt);
  updateBullets(dt);
  updatePickups(dt);
  updatePortal(dt);
  updateEffects(dt);
  maybeOpenPortal();
  updateHud();
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, game.height);
  gradient.addColorStop(0, "#17181d");
  gradient.addColorStop(0.42, "#2b211a");
  gradient.addColorStop(0.72, "#342115");
  gradient.addColorStop(1, "#151a18");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, game.width, game.height);

  for (const star of stars) {
    const y = perf.low ? star.y : (star.y + game.time * star.speed) % (game.height + 16) - 8;
    const x = perf.low ? star.x : (star.x + Math.sin(game.time * 0.18 + star.phase) * 8) % game.width;
    const twinkle = perf.low ? 0.75 : 0.64 + Math.sin(game.time * 2.2 + star.phase) * 0.28;
    ctx.globalAlpha = clamp(star.alpha * twinkle, 0.12, 1);
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, TAU);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function drawWorld() {
  const location = getLocation();
  const viewLeft = camera.x - game.width / 2;
  const viewTop = camera.y - game.height / 2;
  ctx.save();
  ctx.translate(game.width / 2 - camera.x, game.height / 2 - camera.y);

  if (perf.low) {
    ctx.fillStyle = location.floorMid || location.floor;
  } else {
    const floor = ctx.createLinearGradient(0, 0, location.worldW, location.worldH);
    floor.addColorStop(0, location.floor);
    floor.addColorStop(0.52, location.floorMid || location.floor);
    floor.addColorStop(1, location.floor);
    ctx.fillStyle = floor;
  }
  ctx.fillRect(viewLeft - 4, viewTop - 4, game.width + 8, game.height + 8);

  drawGrid(location);
  drawTrails(location);
  if (perf.drawScenery) {
    drawLandmarks(location);
    drawDecor(location);
  } else {
    drawLightScenery(location);
  }
  drawPortal(location);
  drawPickups(location);
  drawTurrets();
  drawBullets();
  drawEnemies();
  drawPlayerAttackRange();
  drawPlayer();
  drawEnemyBullets();
  drawFlashes();
  drawBounds(location);

  ctx.restore();
}

function drawGrid(location) {
  ctx.save();
  ctx.strokeStyle = location.grid;
  ctx.globalAlpha = 0.13;
  ctx.lineWidth = 1;
  const step = perf.low ? 180 : 118;

  for (let x = 0; x <= location.worldW; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, location.worldH);
    ctx.stroke();
  }

  for (let y = 0; y <= location.worldH; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(location.worldW, y);
    ctx.stroke();
  }

  if (perf.low) {
    ctx.restore();
    return;
  }

  ctx.globalAlpha = 0.08;
  ctx.lineWidth = 2;
  for (let y = 70; y <= location.worldH; y += 210) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(
      location.worldW * 0.25,
      y + Math.sin(y) * 26,
      location.worldW * 0.72,
      y - 42,
      location.worldW,
      y + 16,
    );
    ctx.stroke();
  }

  ctx.restore();
}

function drawTrails(location) {
  ctx.save();
  ctx.fillStyle = location.trail;
  ctx.strokeStyle = `${location.grid}aa`;
  ctx.lineCap = "round";

  if (location.landmark === "town") {
    const streetY = location.worldH / 2;
    ctx.globalAlpha = 0.48;
    ctx.beginPath();
    ctx.ellipse(location.worldW / 2, streetY, location.worldW * 0.52, 150, 0, 0, TAU);
    ctx.fill();

    ctx.globalAlpha = 0.34;
    ctx.lineWidth = 4;
    for (const offset of [-52, 52]) {
      ctx.beginPath();
      ctx.moveTo(70, streetY + offset);
      ctx.bezierCurveTo(location.worldW * 0.34, streetY + offset + 22, location.worldW * 0.7, streetY + offset - 18, location.worldW - 70, streetY + offset);
      ctx.stroke();
    }
  } else if (location.landmark === "mine") {
    ctx.globalAlpha = 0.36;
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(90, location.worldH * 0.56);
    ctx.bezierCurveTo(location.worldW * 0.32, location.worldH * 0.42, location.worldW * 0.58, location.worldH * 0.7, location.worldW - 160, location.worldH * 0.46);
    ctx.stroke();
  } else if (location.landmark === "canyon") {
    ctx.globalAlpha = 0.38;
    ctx.beginPath();
    ctx.moveTo(0, location.worldH * 0.62);
    ctx.bezierCurveTo(location.worldW * 0.26, location.worldH * 0.5, location.worldW * 0.44, location.worldH * 0.72, location.worldW * 0.68, location.worldH * 0.58);
    ctx.bezierCurveTo(location.worldW * 0.82, location.worldH * 0.5, location.worldW * 0.92, location.worldH * 0.52, location.worldW, location.worldH * 0.46);
    ctx.lineTo(location.worldW, location.worldH * 0.6);
    ctx.bezierCurveTo(location.worldW * 0.74, location.worldH * 0.74, location.worldW * 0.44, location.worldH * 0.86, 0, location.worldH * 0.76);
    ctx.closePath();
    ctx.fill();
  } else if (location.landmark === "ghost") {
    const streetY = location.worldH * 0.5;
    ctx.globalAlpha = 0.42;
    ctx.beginPath();
    ctx.ellipse(location.worldW * 0.53, streetY, location.worldW * 0.46, 176, -0.03, 0, TAU);
    ctx.fill();

    ctx.globalAlpha = 0.32;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(80, streetY + 86);
    ctx.bezierCurveTo(location.worldW * 0.34, streetY + 22, location.worldW * 0.68, streetY - 12, location.worldW - 100, streetY + 72);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, streetY - 92);
    ctx.bezierCurveTo(location.worldW * 0.38, streetY - 28, location.worldW * 0.66, streetY - 68, location.worldW - 120, streetY - 36);
    ctx.stroke();

    ctx.globalAlpha = 0.22;
    ctx.fillStyle = location.accent;
    ctx.beginPath();
    ctx.ellipse(location.worldW * 0.76, streetY, 190, 116, 0, 0, TAU);
    ctx.fill();
  } else {
    ctx.globalAlpha = 0.34;
    ctx.beginPath();
    roundRect(location.worldW * 0.18, location.worldH * 0.22, location.worldW * 0.64, location.worldH * 0.56, 18);
    ctx.fill();
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 5;
    ctx.strokeRect(location.worldW * 0.2, location.worldH * 0.24, location.worldW * 0.6, location.worldH * 0.52);
  }

  ctx.restore();
}

function drawLandmarks(location) {
  ctx.save();

  if (location.landmark === "town") {
    const yTop = location.worldH * 0.33;
    const yBottom = location.worldH * 0.67;
    drawWoodBuilding(location.worldW * 0.33, yTop, 210, 100, "SALOON", location);
    drawWoodBuilding(location.worldW * 0.53, yTop - 6, 190, 94, "BANK", location);
    drawWoodBuilding(location.worldW * 0.72, yTop + 10, 170, 88, "STORE", location);
    drawWoodBuilding(location.worldW * 0.43, yBottom, 190, 88, "JAIL", location);
    drawWoodBuilding(location.worldW * 0.65, yBottom + 4, 210, 96, "STABLE", location);
  } else if (location.landmark === "mine") {
    drawMineEntrance(location.worldW - 270, location.worldH * 0.44, location);
    drawRailCurve(location);
    drawWoodBuilding(location.worldW * 0.3, location.worldH * 0.74, 220, 90, "DEPOT", location);
  } else if (location.landmark === "canyon") {
    drawCanyonWalls(location);
    drawWoodBridge(location.worldW * 0.54, location.worldH * 0.64, 210, 56, -0.22);
  } else if (location.landmark === "ghost") {
    const yTop = location.worldH * 0.31;
    const yBottom = location.worldH * 0.69;
    drawWoodBuilding(location.worldW * 0.31, yTop, 210, 96, "HOTEL", location);
    drawWoodBuilding(location.worldW * 0.52, yTop - 18, 190, 92, "SALOON", location);
    drawWoodBuilding(location.worldW * 0.72, yTop + 14, 178, 86, "BANK", location);
    drawWoodBuilding(location.worldW * 0.36, yBottom + 10, 190, 86, "SHERIFF", location);
    drawWoodBuilding(location.worldW * 0.59, yBottom - 2, 210, 92, "CHURCH", location);
    drawWoodBuilding(location.worldW * 0.8, yBottom + 8, 178, 82, "STABLE", location);
    drawBossArena(location);
  } else {
    drawFortWalls(location);
    drawWoodBuilding(location.worldW * 0.5, location.worldH * 0.28, 250, 98, "FORT", location);
  }

  ctx.restore();
}

function drawLightScenery(location) {
  drawLightLandmarks(location);
  drawGroundDetails(location);
}

function drawLightLandmarks(location) {
  ctx.save();

  if (location.landmark === "town") {
    const yTop = location.worldH * 0.33;
    const yBottom = location.worldH * 0.67;
    drawLightBuilding(location.worldW * 0.34, yTop, 190, 78, location);
    drawLightBuilding(location.worldW * 0.54, yTop - 6, 168, 72, location);
    drawLightBuilding(location.worldW * 0.72, yTop + 8, 148, 68, location);
    drawLightBuilding(location.worldW * 0.43, yBottom, 164, 68, location);
    drawLightBuilding(location.worldW * 0.64, yBottom + 4, 184, 76, location);
  } else if (location.landmark === "mine") {
    drawLightMineEntrance(location.worldW - 270, location.worldH * 0.44, location);
    drawLightBuilding(location.worldW * 0.3, location.worldH * 0.74, 190, 68, location);
  } else if (location.landmark === "canyon") {
    drawLightRockBand(location, 0.08, 0.2, 0.36);
    drawLightRockBand(location, 0.7, 0.78, 0.28);
    drawLightBridge(location.worldW * 0.54, location.worldH * 0.64);
  } else if (location.landmark === "ghost") {
    const yTop = location.worldH * 0.31;
    const yBottom = location.worldH * 0.69;
    drawLightBuilding(location.worldW * 0.31, yTop, 184, 72, location);
    drawLightBuilding(location.worldW * 0.52, yTop - 18, 168, 70, location);
    drawLightBuilding(location.worldW * 0.72, yTop + 14, 154, 64, location);
    drawLightBuilding(location.worldW * 0.38, yBottom + 8, 166, 66, location);
    drawLightBuilding(location.worldW * 0.62, yBottom, 186, 70, location);
    drawLightDuelRing(location);
  } else {
    drawLightFort(location);
  }

  ctx.restore();
}

function drawLightBuilding(x, y, width, height, location) {
  if (!isWorldVisible({ x, y }, Math.max(width, height))) {
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.42;
  ctx.fillStyle = "rgba(44, 27, 18, 0.78)";
  roundRect(-width / 2, -height / 2, width, height, 7);
  ctx.fill();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = location.accent;
  ctx.fillRect(-width * 0.34, -height * 0.42, width * 0.68, 10);
  ctx.globalAlpha = 0.46;
  ctx.fillStyle = "rgba(18, 12, 9, 0.9)";
  roundRect(-width * 0.1, -height * 0.06, width * 0.2, height * 0.4, 4);
  ctx.fill();
  ctx.restore();
}

function drawLightMineEntrance(x, y, location) {
  if (!isWorldVisible({ x, y }, 150)) {
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.52;
  ctx.fillStyle = "rgba(22, 15, 11, 0.86)";
  ctx.beginPath();
  ctx.moveTo(-92, 64);
  ctx.lineTo(-70, -10);
  ctx.quadraticCurveTo(0, -64, 70, -10);
  ctx.lineTo(92, 64);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 0.38;
  ctx.strokeStyle = location.accent;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-58, 52);
  ctx.lineTo(-48, -8);
  ctx.quadraticCurveTo(0, -44, 48, -8);
  ctx.lineTo(58, 52);
  ctx.stroke();
  ctx.restore();
}

function drawLightRockBand(location, topRatio, bottomRatio, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(49, 29, 22, 0.72)";
  ctx.beginPath();
  ctx.moveTo(0, location.worldH * topRatio);
  ctx.lineTo(location.worldW, location.worldH * (topRatio - 0.03));
  ctx.lineTo(location.worldW, location.worldH * bottomRatio);
  ctx.bezierCurveTo(location.worldW * 0.68, location.worldH * (bottomRatio + 0.08), location.worldW * 0.34, location.worldH * (bottomRatio - 0.08), 0, location.worldH * (bottomRatio + 0.02));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLightBridge(x, y) {
  if (!isWorldVisible({ x, y }, 180)) {
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.22);
  ctx.globalAlpha = 0.42;
  ctx.fillStyle = "rgba(74, 43, 26, 0.86)";
  roundRect(-96, -18, 192, 36, 6);
  ctx.fill();
  ctx.globalAlpha = 0.28;
  ctx.strokeStyle = "#f0c05a";
  ctx.lineWidth = 2;
  for (let xLine = -72; xLine <= 72; xLine += 24) {
    ctx.beginPath();
    ctx.moveTo(xLine, -16);
    ctx.lineTo(xLine, 16);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLightFort(location) {
  ctx.save();
  ctx.globalAlpha = 0.44;
  ctx.strokeStyle = "rgba(44, 27, 18, 0.9)";
  ctx.lineWidth = 12;
  ctx.strokeRect(location.worldW * 0.2, location.worldH * 0.25, location.worldW * 0.6, location.worldH * 0.5);
  ctx.fillStyle = "rgba(93, 55, 33, 0.74)";
  const size = 58;
  for (const [x, y] of [
    [location.worldW * 0.2, location.worldH * 0.25],
    [location.worldW * 0.8, location.worldH * 0.25],
    [location.worldW * 0.2, location.worldH * 0.75],
    [location.worldW * 0.8, location.worldH * 0.75],
  ]) {
    roundRect(x - size / 2, y - size / 2, size, size, 6);
    ctx.fill();
  }
  ctx.restore();
}

function drawLightDuelRing(location) {
  const boss = location.boss || {};
  const x = location.worldW * (boss.xRatio || 0.76);
  const y = location.worldH * (boss.yRatio || 0.5);
  if (!isWorldVisible({ x, y }, 220)) {
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = location.accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 0, 166, 104, 0, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function drawGroundDetails(location) {
  ctx.save();

  for (const item of groundDetails) {
    if (!isWorldVisible(item, Math.max(item.w, item.h) + 52)) {
      continue;
    }

    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle);
    ctx.globalAlpha = item.alpha;

    if (item.type === "dust") {
      ctx.fillStyle = "rgba(238, 180, 108, 0.5)";
      ctx.beginPath();
      ctx.ellipse(0, 0, item.w * 0.42, item.h * 0.34, 0, 0, TAU);
      ctx.fill();
    } else if (item.type === "lightCactus") {
      const h = item.h;
      const arm = item.w * 0.42;
      ctx.strokeStyle = "rgba(71, 111, 66, 0.88)";
      ctx.lineWidth = Math.max(6, item.w * 0.18);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.36);
      ctx.lineTo(0, -h * 0.36);
      ctx.moveTo(0, -h * 0.06);
      ctx.quadraticCurveTo(-arm, -h * 0.08, -arm, -h * 0.26);
      ctx.moveTo(0, h * 0.08);
      ctx.quadraticCurveTo(arm, h * 0.04, arm, -h * 0.14);
      ctx.stroke();
    } else if (item.type === "plank") {
      ctx.fillStyle = "rgba(91, 53, 31, 0.72)";
      roundRect(-item.w * 0.35, -4, item.w * 0.7, 8, 3);
      ctx.fill();
    } else if (item.type === "post") {
      ctx.fillStyle = "rgba(45, 28, 19, 0.62)";
      ctx.fillRect(-3, -item.h * 0.42, 6, item.h * 0.84);
    } else if (item.type === "gold") {
      const r = Math.max(3, item.h * 0.22);
      ctx.fillStyle = "rgba(240, 192, 90, 0.95)";
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "rgba(111, 70, 14, 0.55)";
      ctx.beginPath();
      ctx.arc(r * 0.36, -r * 0.28, Math.max(1.4, r * 0.34), 0, TAU);
      ctx.fill();
      if (!perf.low) {
        ctx.fillStyle = "rgba(248, 247, 238, 0.72)";
        ctx.beginPath();
        ctx.arc(-r * 0.28, -r * 0.34, Math.max(1, r * 0.2), 0, TAU);
        ctx.fill();
      }
    } else if (item.type === "stone" || item.type === "ore") {
      ctx.fillStyle = item.type === "ore" ? "rgba(240, 192, 90, 0.46)" : "rgba(103, 92, 80, 0.54)";
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(4, item.h * 0.22), 0, TAU);
      ctx.fill();
    } else if (item.type === "tie" || item.type === "track") {
      ctx.strokeStyle = "rgba(40, 27, 20, 0.62)";
      ctx.lineWidth = item.type === "track" ? 3 : 5;
      ctx.beginPath();
      ctx.moveTo(-item.w * 0.38, 0);
      ctx.lineTo(item.w * 0.38, 0);
      ctx.stroke();
    } else if (item.type === "brush") {
      ctx.strokeStyle = "rgba(126, 145, 94, 0.58)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-item.w * 0.18, item.h * 0.12);
      ctx.lineTo(0, -item.h * 0.22);
      ctx.lineTo(item.w * 0.18, item.h * 0.12);
      ctx.stroke();
    } else if (item.type === "crack" || item.type === "bone") {
      ctx.strokeStyle = item.type === "bone" ? "rgba(248, 247, 238, 0.46)" : "rgba(35, 23, 18, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-item.w * 0.32, 0);
      ctx.lineTo(-item.w * 0.08, -item.h * 0.12);
      ctx.lineTo(item.w * 0.18, item.h * 0.1);
      ctx.lineTo(item.w * 0.36, -item.h * 0.08);
      ctx.stroke();
    } else if (item.type === "grave") {
      const w = Math.max(12, item.w * 0.42);
      const h = Math.max(18, item.h * 0.72);
      ctx.fillStyle = "rgba(33, 31, 36, 0.72)";
      roundRect(-w / 2, -h / 2, w, h, 5);
      ctx.fill();
      ctx.strokeStyle = "rgba(169, 151, 161, 0.46)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.24);
      ctx.lineTo(0, h * 0.12);
      ctx.moveTo(-w * 0.22, -h * 0.1);
      ctx.lineTo(w * 0.22, -h * 0.1);
      ctx.stroke();
    } else if (item.type === "mourningCross") {
      ctx.strokeStyle = "rgba(19, 17, 21, 0.72)";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -item.h * 0.42);
      ctx.lineTo(0, item.h * 0.42);
      ctx.moveTo(-item.w * 0.3, -item.h * 0.14);
      ctx.lineTo(item.w * 0.3, -item.h * 0.14);
      ctx.stroke();
    } else if (item.type === "candle") {
      ctx.fillStyle = "rgba(230, 219, 202, 0.58)";
      ctx.fillRect(-3, -item.h * 0.2, 6, item.h * 0.4);
      ctx.fillStyle = "rgba(240, 192, 90, 0.65)";
      ctx.beginPath();
      ctx.arc(0, -item.h * 0.28, 3, 0, TAU);
      ctx.fill();
    }

    ctx.restore();
  }

  ctx.restore();
}

function drawBossArena(location) {
  const boss = location.boss || {};
  const x = location.worldW * (boss.xRatio || 0.76);
  const y = location.worldH * (boss.yRatio || 0.5);

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = `${location.accent}66`;
  ctx.lineWidth = 4;
  ctx.setLineDash([18, 16]);
  ctx.beginPath();
  ctx.ellipse(0, 0, 172, 108, 0, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(38, 22, 16, 0.54)";
  roundRect(-86, -12, 172, 24, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(240, 192, 90, 0.36)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "rgba(248, 247, 238, 0.74)";
  ctx.font = "850 13px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("DUEL", 0, 0);
  ctx.restore();
}

function drawDecor(location) {
  for (const item of decor) {
    if (!isWorldVisible(item, Math.max(item.w, item.h) + perf.worldPadding)) {
      continue;
    }

    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle);
    ctx.globalAlpha = item.alpha;

    if (item.type === "cactus") {
      drawCactus(item.w, item.h);
    } else if (item.type === "barrel") {
      drawBarrel(item.w, item.h);
    } else if (item.type === "sign") {
      drawSign(item.w, item.h, location);
    } else if (item.type === "plank") {
      drawPlank(item.w, item.h);
    } else if (item.type === "rock") {
      drawRock(item.w, item.h);
    } else if (item.type === "tumbleweed") {
      drawTumbleweed(item.w);
    } else if (item.type === "rail") {
      drawRailPiece(item.w, item.h);
    } else if (item.type === "crate") {
      drawCrate(item.w, item.h);
    } else if (item.type === "lantern") {
      drawLantern(item.w, item.h);
    } else if (item.type === "brush") {
      drawBrush(item.w, item.h);
    } else if (item.type === "wagon") {
      drawWagon(item.w, item.h);
    } else if (item.type === "skull") {
      drawSkull(item.w, item.h);
    } else if (item.type === "palisade") {
      drawPalisade(item.w, item.h);
    }

    ctx.restore();
  }
}

function drawWoodBuilding(x, y, width, height, label, location) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(54, 32, 20, 0.58)";
  ctx.beginPath();
  ctx.ellipse(0, height * 0.52, width * 0.48, height * 0.18, 0, 0, TAU);
  ctx.fill();

  ctx.fillStyle = "#6f4429";
  roundRect(-width / 2, -height / 2, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(36, 22, 13, 0.72)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#9b6138";
  for (let i = -Math.floor(width / 36); i <= Math.floor(width / 36); i += 1) {
    ctx.fillRect(i * 36 - 4, -height / 2 + 4, 8, height - 8);
  }

  ctx.fillStyle = "#3a2518";
  roundRect(-width * 0.12, -height * 0.18, width * 0.24, height * 0.44, 5);
  ctx.fill();
  ctx.fillStyle = "#f0c05a";
  ctx.fillRect(width * 0.03, -height * 0.02, 4, 4);

  ctx.fillStyle = location.accent;
  ctx.globalAlpha = 0.9;
  roundRect(-width * 0.36, -height * 0.43, width * 0.72, 24, 5);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#1d140b";
  ctx.font = "800 13px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 0, -height * 0.43 + 12);
  ctx.restore();
}

function drawMineEntrance(x, y, location) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(23, 17, 13, 0.74)";
  ctx.beginPath();
  ctx.moveTo(-105, 78);
  ctx.lineTo(-84, -14);
  ctx.quadraticCurveTo(0, -92, 84, -14);
  ctx.lineTo(105, 78);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#7b4d2f";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(-74, 64);
  ctx.lineTo(-62, -10);
  ctx.quadraticCurveTo(0, -64, 62, -10);
  ctx.lineTo(74, 64);
  ctx.stroke();

  ctx.fillStyle = location.accent;
  ctx.globalAlpha = 0.36;
  ctx.beginPath();
  ctx.ellipse(0, 22, 56, 62, 0, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawRailCurve(location) {
  ctx.save();
  ctx.strokeStyle = "rgba(49, 31, 21, 0.82)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  for (const offset of [-12, 12]) {
    ctx.beginPath();
    ctx.moveTo(90, location.worldH * 0.56 + offset);
    ctx.bezierCurveTo(location.worldW * 0.32, location.worldH * 0.42 + offset, location.worldW * 0.58, location.worldH * 0.7 + offset, location.worldW - 160, location.worldH * 0.46 + offset);
    ctx.stroke();
  }
  ctx.lineWidth = 8;
  ctx.strokeStyle = "rgba(108, 68, 42, 0.72)";
  for (let t = 0.08; t < 0.92; t += 0.08) {
    const x = lerp(110, location.worldW - 180, t);
    const y = location.worldH * (0.56 + Math.sin(t * Math.PI * 3) * 0.1);
    ctx.beginPath();
    ctx.moveTo(x - 20, y - 20);
    ctx.lineTo(x + 20, y + 20);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCanyonWalls(location) {
  ctx.save();
  ctx.fillStyle = "rgba(74, 36, 25, 0.44)";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(location.worldW, 0);
  ctx.lineTo(location.worldW, location.worldH * 0.2);
  ctx.bezierCurveTo(location.worldW * 0.78, location.worldH * 0.34, location.worldW * 0.62, location.worldH * 0.18, location.worldW * 0.42, location.worldH * 0.3);
  ctx.bezierCurveTo(location.worldW * 0.22, location.worldH * 0.42, location.worldW * 0.14, location.worldH * 0.28, 0, location.worldH * 0.36);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(46, 26, 20, 0.34)";
  ctx.beginPath();
  ctx.moveTo(0, location.worldH);
  ctx.lineTo(location.worldW, location.worldH);
  ctx.lineTo(location.worldW, location.worldH * 0.78);
  ctx.bezierCurveTo(location.worldW * 0.76, location.worldH * 0.66, location.worldW * 0.5, location.worldH * 0.88, location.worldW * 0.28, location.worldH * 0.72);
  ctx.bezierCurveTo(location.worldW * 0.16, location.worldH * 0.64, location.worldW * 0.08, location.worldH * 0.74, 0, location.worldH * 0.68);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawWoodBridge(x, y, width, height, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "rgba(82, 48, 29, 0.78)";
  roundRect(-width / 2, -height / 2, width, height, 7);
  ctx.fill();
  ctx.strokeStyle = "rgba(36, 22, 13, 0.72)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "rgba(222, 170, 104, 0.5)";
  ctx.lineWidth = 2;
  for (let xLine = -width / 2 + 18; xLine < width / 2; xLine += 24) {
    ctx.beginPath();
    ctx.moveTo(xLine, -height / 2 + 4);
    ctx.lineTo(xLine, height / 2 - 4);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFortWalls(location) {
  ctx.save();
  ctx.strokeStyle = "rgba(63, 38, 24, 0.86)";
  ctx.lineWidth = 20;
  ctx.lineJoin = "round";
  ctx.strokeRect(location.worldW * 0.18, location.worldH * 0.22, location.worldW * 0.64, location.worldH * 0.56);

  ctx.fillStyle = "#74472b";
  const towers = [
    [location.worldW * 0.18, location.worldH * 0.22],
    [location.worldW * 0.82, location.worldH * 0.22],
    [location.worldW * 0.18, location.worldH * 0.78],
    [location.worldW * 0.82, location.worldH * 0.78],
  ];
  for (const [x, y] of towers) {
    roundRect(x - 42, y - 42, 84, 84, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(36, 22, 13, 0.72)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  ctx.restore();
}

function drawCactus(width, height) {
  const h = Math.max(34, height * 1.25);
  ctx.strokeStyle = "#476f42";
  ctx.lineWidth = Math.max(8, width * 0.14);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.38);
  ctx.lineTo(0, -h * 0.38);
  ctx.moveTo(0, -h * 0.05);
  ctx.quadraticCurveTo(-width * 0.34, -h * 0.08, -width * 0.34, -h * 0.3);
  ctx.moveTo(0, h * 0.08);
  ctx.quadraticCurveTo(width * 0.34, h * 0.04, width * 0.34, -h * 0.18);
  ctx.stroke();
}

function drawBarrel(width, height) {
  const w = Math.max(24, width * 0.58);
  const h = Math.max(22, height * 0.64);
  ctx.fillStyle = "#7b4a2b";
  roundRect(-w / 2, -h / 2, w, h, 8);
  ctx.fill();
  ctx.strokeStyle = "#2e1c13";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "rgba(240, 192, 90, 0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-w / 2 + 4, -h * 0.22);
  ctx.lineTo(w / 2 - 4, -h * 0.22);
  ctx.moveTo(-w / 2 + 4, h * 0.22);
  ctx.lineTo(w / 2 - 4, h * 0.22);
  ctx.stroke();
}

function drawSign(width, height, location) {
  const w = Math.max(46, width);
  ctx.fillStyle = "#4c2f1e";
  ctx.fillRect(-3, -height * 0.1, 6, height * 0.62);
  ctx.fillStyle = "#8c5733";
  roundRect(-w / 2, -height * 0.42, w, 24, 5);
  ctx.fill();
  ctx.strokeStyle = location.accent;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawPlank(width, height) {
  const w = Math.max(42, width);
  const h = Math.max(12, height * 0.34);
  ctx.fillStyle = "#8b5734";
  roundRect(-w / 2, -h / 2, w, h, 4);
  ctx.fill();
  ctx.strokeStyle = "rgba(49, 31, 21, 0.52)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawRock(width, height) {
  const r = Math.max(width, height) * 0.42;
  ctx.fillStyle = "#6d6258";
  ctx.beginPath();
  for (let i = 0; i < 7; i += 1) {
    const angle = (i / 7) * TAU;
    const radius = r * (0.78 + (i % 3) * 0.13);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.72;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

function drawTumbleweed(width) {
  const r = Math.max(13, width * 0.24);
  ctx.strokeStyle = "rgba(220, 176, 116, 0.72)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * 0.55, (i / 5) * TAU, 0, TAU);
    ctx.stroke();
  }
}

function drawRailPiece(width, height) {
  const w = Math.max(62, width);
  const h = Math.max(28, height * 0.64);
  ctx.strokeStyle = "rgba(39, 27, 20, 0.78)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-w / 2, -h * 0.24);
  ctx.lineTo(w / 2, -h * 0.24);
  ctx.moveTo(-w / 2, h * 0.24);
  ctx.lineTo(w / 2, h * 0.24);
  ctx.stroke();
  ctx.strokeStyle = "rgba(121, 74, 44, 0.72)";
  ctx.lineWidth = 5;
  for (let x = -w / 2 + 10; x < w / 2; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, -h * 0.42);
    ctx.lineTo(x, h * 0.42);
    ctx.stroke();
  }
}

function drawCrate(width, height) {
  const w = Math.max(32, width * 0.72);
  const h = Math.max(28, height * 0.72);
  ctx.fillStyle = "#7c4a2c";
  roundRect(-w / 2, -h / 2, w, h, 5);
  ctx.fill();
  ctx.strokeStyle = "rgba(38, 23, 14, 0.72)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-w / 2 + 5, -h / 2 + 5);
  ctx.lineTo(w / 2 - 5, h / 2 - 5);
  ctx.moveTo(w / 2 - 5, -h / 2 + 5);
  ctx.lineTo(-w / 2 + 5, h / 2 - 5);
  ctx.stroke();
}

function drawLantern(width, height) {
  const r = Math.max(9, Math.min(width, height) * 0.22);
  applyShadow("rgba(240, 192, 90, 0.65)", 18);
  ctx.fillStyle = "#f0c05a";
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, TAU);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#3c281b";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawBrush(width, height) {
  ctx.strokeStyle = "#7f915e";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  for (let i = 0; i < 7; i += 1) {
    const angle = (i / 7) * TAU;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * width * 0.32, Math.sin(angle) * height * 0.32);
    ctx.stroke();
  }
}

function drawWagon(width, height) {
  const w = Math.max(48, width * 0.82);
  const h = Math.max(30, height * 0.7);
  ctx.fillStyle = "#7c4a2c";
  roundRect(-w / 2, -h / 2, w, h, 8);
  ctx.fill();
  ctx.strokeStyle = "#2d1b12";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#251811";
  for (const y of [-h * 0.5, h * 0.5]) {
    ctx.beginPath();
    ctx.arc(-w * 0.32, y, 8, 0, TAU);
    ctx.arc(w * 0.32, y, 8, 0, TAU);
    ctx.fill();
  }
}

function drawSkull(width, height) {
  const r = Math.max(12, Math.min(width, height) * 0.26);
  ctx.fillStyle = "rgba(248, 247, 238, 0.72)";
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 1.15, r, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#2f2118";
  ctx.beginPath();
  ctx.arc(-r * 0.36, -r * 0.1, r * 0.18, 0, TAU);
  ctx.arc(r * 0.36, -r * 0.1, r * 0.18, 0, TAU);
  ctx.fill();
}

function drawPalisade(width, height) {
  const count = Math.max(3, Math.floor(width / 16));
  ctx.fillStyle = "#6f4429";
  ctx.strokeStyle = "rgba(36, 22, 13, 0.62)";
  ctx.lineWidth = 2;
  for (let i = 0; i < count; i += 1) {
    const x = (i - (count - 1) / 2) * 15;
    ctx.beginPath();
    ctx.moveTo(x, -height * 0.48);
    ctx.lineTo(x + 6, -height * 0.28);
    ctx.lineTo(x + 6, height * 0.48);
    ctx.lineTo(x - 6, height * 0.48);
    ctx.lineTo(x - 6, -height * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

function drawBounds(location) {
  ctx.save();
  ctx.strokeStyle = `${location.accent}66`;
  ctx.lineWidth = 5;
  ctx.shadowColor = `${location.accent}55`;
  ctx.shadowBlur = 18;
  ctx.strokeRect(8, 8, location.worldW - 16, location.worldH - 16);
  ctx.restore();
}

function drawPortal(location) {
  if (!isWorldVisible({ x: game.portalX, y: game.portalY }, 160)) {
    return;
  }

  ctx.save();
  ctx.translate(game.portalX, game.portalY);
  const pulse = 1 + Math.sin(game.portalPulse * 4) * 0.06;

  if (!game.portalOpen) {
    ctx.globalAlpha = 0.58;
    ctx.fillStyle = "rgba(54, 32, 20, 0.74)";
    roundRect(-34, -34, 68, 68, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(240, 192, 90, 0.45)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, -2, 26 * pulse, Math.PI * 0.15, Math.PI * 1.85);
    ctx.stroke();
    ctx.fillStyle = "rgba(240, 192, 90, 0.38)";
    ctx.fillRect(-22, 28, 44, 5);
    ctx.restore();
    return;
  }

  applyShadow(`${location.accent}aa`, 26);
  const colors = [location.accent, "#f0c05a", "#76a7c8", "#f8f7ee"];
  for (let i = 0; i < colors.length; i += 1) {
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, -4, 30 * pulse + i * 7, Math.PI * 0.12 + game.time * 0.4, Math.PI * 1.88 + game.time * 0.4);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(240, 192, 90, 0.42)";
  ctx.fillRect(-40, 31, 80, 6);
  ctx.restore();
}

function drawPickups(location) {
  for (const pickup of pickups) {
    if (!isWorldVisible(pickup, 80)) {
      continue;
    }

    const bob = Math.sin(pickup.bob) * 4;
    ctx.save();
    ctx.translate(pickup.x, pickup.y + bob);
    if (pickup.type === "coin") {
      applyShadow(`${location.coin}aa`, 12);
      ctx.fillStyle = location.coin;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "rgba(70, 44, 8, 0.55)";
      ctx.fillRect(-2, -6, 4, 12);
    } else {
      applyShadow("rgba(158, 207, 141, 0.72)", 14);
      ctx.fillStyle = "#9ecf8d";
      roundRect(-9, -9, 18, 18, 5);
      ctx.fill();
      ctx.fillStyle = "#1d140b";
      ctx.fillRect(-2, -6, 4, 12);
      ctx.fillRect(-6, -2, 12, 4);
    }
    ctx.restore();
  }
}

function drawTurrets() {
  for (const turret of turrets) {
    if (!isWorldVisible(turret, 120)) {
      continue;
    }

    ctx.save();
    ctx.translate(turret.x, turret.y);
    ctx.rotate(turret.angle);
    applyShadow(`${turret.color}99`, 16);
    ctx.fillStyle = "rgba(47, 29, 19, 0.95)";
    roundRect(-16, -16, 32, 32, 8);
    ctx.fill();
    ctx.strokeStyle = turret.color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#3a2418";
    ctx.fillRect(-3, 14, 6, 18);
    ctx.fillStyle = turret.color;
    ctx.fillRect(6, -4, 22, 8);
    ctx.restore();
  }
}

function drawBullets() {
  for (const bullet of bullets) {
    if (!isWorldVisible(bullet, 80)) {
      continue;
    }

    ctx.save();
    ctx.globalAlpha = clamp(bullet.life / bullet.maxLife, 0.25, 1);
    ctx.fillStyle = bullet.color;
    applyShadow(bullet.color, 14);
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
}

function drawEnemyBullets() {
  for (const bullet of enemyBullets) {
    if (!isWorldVisible(bullet, 80)) {
      continue;
    }

    ctx.save();
    ctx.fillStyle = bullet.color;
    applyShadow(bullet.color, 14);
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
}

function drawEnemies() {
  for (const enemy of enemies) {
    if (!isWorldVisible(enemy, 120)) {
      continue;
    }

    const type = ENEMY_TYPES[enemy.type];
    const wobble = Math.sin(game.time * 5 + enemy.phase) * 0.08;

    if (type.boss) {
      drawBossEnemy(enemy, type, wobble);
      drawEnemyBar(enemy, type);
      continue;
    }

    if (perf.simpleEnemies) {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.fillStyle = enemy.hit > 0 ? "#ffffff" : type.color;
      ctx.beginPath();
      ctx.arc(0, 0, enemy.radius, 0, TAU);
      ctx.fill();
      ctx.fillStyle = type.accent;
      ctx.beginPath();
      ctx.arc(enemy.radius * 0.28, -enemy.radius * 0.18, enemy.radius * 0.2, 0, TAU);
      ctx.fill();
      ctx.restore();

      if (enemy.hit > 0 || enemy.hp < enemy.maxHp) {
        drawEnemyBar(enemy, type);
      }
      continue;
    }

    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    ctx.rotate(Math.atan2(enemy.vy, enemy.vx) + wobble);
    applyShadow(`${type.color}77`, 16);
    ctx.fillStyle = enemy.hit > 0 ? "#ffffff" : type.color;
    ctx.beginPath();
    for (let i = 0; i < 9; i += 1) {
      const angle = (i / 9) * TAU;
      const radius = enemy.radius * (i % 2 ? 0.78 : 1.1);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = type.accent;
    ctx.beginPath();
    ctx.arc(enemy.radius * 0.28, -enemy.radius * 0.18, enemy.radius * 0.22, 0, TAU);
    ctx.fill();
    ctx.restore();

    if (!perf.low || enemy.hit > 0 || enemy.hp < enemy.maxHp) {
      drawEnemyBar(enemy, type);
    }
  }
}

function drawBossEnemy(enemy, type, wobble) {
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.rotate(Math.atan2(enemy.vy, enemy.vx) + wobble * 0.35);

  ctx.fillStyle = "rgba(0, 0, 0, 0.34)";
  ctx.beginPath();
  ctx.ellipse(0, enemy.radius * 0.68, enemy.radius * 0.86, enemy.radius * 0.28, 0, 0, TAU);
  ctx.fill();

  applyShadow(`${type.accent}77`, 24);
  ctx.fillStyle = enemy.hit > 0 ? "#ffffff" : type.color;
  ctx.beginPath();
  ctx.moveTo(enemy.radius * 0.7, 0);
  ctx.lineTo(enemy.radius * 0.28, enemy.radius * 0.58);
  ctx.lineTo(-enemy.radius * 0.34, enemy.radius * 0.7);
  ctx.lineTo(-enemy.radius * 0.82, enemy.radius * 0.18);
  ctx.lineTo(-enemy.radius * 0.58, -enemy.radius * 0.58);
  ctx.lineTo(enemy.radius * 0.3, -enemy.radius * 0.74);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(19, 12, 9, 0.76)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = type.accent;
  ctx.beginPath();
  ctx.arc(enemy.radius * 0.26, -enemy.radius * 0.1, enemy.radius * 0.16, 0, TAU);
  ctx.arc(enemy.radius * 0.05, -enemy.radius * 0.14, enemy.radius * 0.12, 0, TAU);
  ctx.fill();

  ctx.fillStyle = "#20120e";
  ctx.beginPath();
  ctx.ellipse(-enemy.radius * 0.12, -enemy.radius * 0.58, enemy.radius * 0.74, enemy.radius * 0.22, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#7a3a2f";
  roundRect(-enemy.radius * 0.46, -enemy.radius * 0.82, enemy.radius * 0.56, enemy.radius * 0.26, 7);
  ctx.fill();
  ctx.fillStyle = "#f0c05a";
  ctx.fillRect(-enemy.radius * 0.38, -enemy.radius * 0.69, enemy.radius * 0.42, 5);

  ctx.strokeStyle = type.accent;
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(enemy.radius * 0.42, -enemy.radius * 0.04);
  ctx.lineTo(enemy.radius * 0.92, -enemy.radius * 0.12);
  ctx.stroke();
  ctx.restore();
}

function drawEnemyBar(enemy, type) {
  const width = type.boss ? 178 : enemy.radius * 2.2;
  const height = type.boss ? 9 : 5;
  const pct = clamp(enemy.hp / enemy.maxHp, 0, 1);
  ctx.save();
  ctx.translate(enemy.x - width / 2, enemy.y - enemy.radius - (type.boss ? 30 : 14));
  if (type.boss) {
    ctx.fillStyle = "rgba(248, 247, 238, 0.86)";
    ctx.font = "850 13px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(type.name, width / 2, -12);
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
  roundRect(0, 0, width, height, 3);
  ctx.fill();
  ctx.fillStyle = type.accent;
  roundRect(0, 0, width * pct, height, 3);
  ctx.fill();
  ctx.restore();
}

function drawPlayerAttackRange() {
  if (!perf.drawAttackRange) {
    return;
  }

  const character = getCharacter();
  const radius = getAttackRange(character);
  const bossRadius = getBossAttackRange(character);
  const bossAlive = enemies.some((enemy) => enemy.boss);

  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.globalAlpha = perf.low ? 0.26 : 0.16;
  ctx.strokeStyle = character.accent;
  ctx.lineWidth = 2;
  if (!perf.low) {
    ctx.setLineDash([10, 12]);
  }
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.stroke();

  if (bossAlive && bossRadius > radius) {
    if (!perf.low) {
      ctx.setLineDash([8, 14]);
    }
    ctx.globalAlpha = perf.low ? 0.18 : 0.12;
    ctx.strokeStyle = "#f0c05a";
    ctx.beginPath();
    ctx.arc(0, 0, bossRadius, 0, TAU);
    ctx.stroke();
  }

  if (!perf.low) {
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = character.accent;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlayer() {
  const character = getCharacter();
  const blink = player.invulnerable > 0 && Math.floor(game.time * 16) % 2 === 0;
  if (blink) {
    return;
  }

  const bob = Math.sin(player.bob) * 2.4;
  const angle = Math.atan2(player.aimY, player.aimX);

  if (character.id === WASTELAND_CHARACTER_ID) {
    drawBossEnemy(
      {
        x: player.x,
        y: player.y + bob,
        vx: player.aimX,
        vy: player.aimY,
        radius: 29,
        hit: 0,
      },
      {
        color: character.color,
        accent: character.accent,
      },
      0,
    );
    return;
  }

  ctx.save();
  ctx.translate(player.x, player.y + bob);
  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 22 - bob, 22, 8, 0, 0, TAU);
  ctx.fill();

  ctx.rotate(angle);
  ctx.fillStyle = "#3a2418";
  roundRect(7, -5, 29, 10, 4);
  ctx.fill();
  ctx.fillStyle = character.accent;
  ctx.fillRect(27, -2, 12, 4);
  ctx.rotate(-angle);

  ctx.shadowColor = `${character.color}99`;
  applyShadow(`${character.color}99`, 18);
  ctx.fillStyle = character.color;
  roundRect(-15, -11, 30, 32, 8);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(49, 31, 21, 0.76)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#5b3723";
  ctx.beginPath();
  ctx.arc(0, -18, 15, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "#2a1a11";
  ctx.stroke();

  ctx.fillStyle = "#3a2418";
  ctx.beginPath();
  ctx.ellipse(0, -24, 24, 8, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = character.accent;
  roundRect(-12, -29, 24, 9, 4);
  ctx.fill();
  ctx.strokeStyle = "#2a1a11";
  ctx.stroke();
  ctx.restore();

  if (character.drone) {
    drawDrone(character);
  }
}

function drawDrone(character) {
  const drone = getDronePosition();
  ctx.save();
  ctx.strokeStyle = `${character.color}55`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(drone.x, drone.y);
  ctx.stroke();

  ctx.translate(drone.x, drone.y);
  ctx.rotate(-player.droneAngle * 1.7);
  ctx.fillStyle = "#3a2418";
  applyShadow(`${character.accent}99`, 12);
  roundRect(-10, -10, 20, 20, 6);
  ctx.fill();
  ctx.strokeStyle = character.accent;
  ctx.stroke();
  ctx.restore();
}

function getDronePosition() {
  return {
    x: player.x + Math.cos(player.droneAngle) * 54,
    y: player.y + Math.sin(player.droneAngle) * 54,
  };
}

function drawFlashes() {
  for (const flash of flashes) {
    const alpha = clamp(flash.life / flash.maxLife, 0, 1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = flash.color;
    ctx.lineWidth = flash.type === "line" ? 4 : 6;
    applyShadow(flash.color, 18);

    if (flash.type === "line") {
      ctx.beginPath();
      ctx.moveTo(flash.x, flash.y);
      ctx.lineTo(flash.x2, flash.y2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(flash.x, flash.y, flash.radius * (1 + (1 - alpha) * 0.22), 0, TAU);
      ctx.stroke();
    }

    ctx.restore();
  }
}

function drawParticles() {
  for (const particle of particles) {
    if (!isWorldVisible(particle, 80)) {
      continue;
    }

    const alpha = clamp(particle.life / particle.maxLife, 0, 1);
    const point = worldToScreen(particle);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;
    applyShadow(particle.color, 10);
    ctx.beginPath();
    ctx.arc(point.x, point.y, particle.radius * (0.4 + alpha * 0.8), 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  for (const floater of floaters) {
    if (!isWorldVisible(floater, 90)) {
      continue;
    }

    const alpha = clamp(floater.life / floater.maxLife, 0, 1);
    const point = worldToScreen(floater);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = floater.color;
    ctx.font = "800 15px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    applyShadow("rgba(0, 0, 0, 0.55)", 6);
    ctx.fillText(floater.text, point.x, point.y);
    ctx.restore();
  }
}

function drawVignette() {
  const gradient = ctx.createRadialGradient(
    game.width / 2,
    game.height / 2,
    Math.min(game.width, game.height) * 0.2,
    game.width / 2,
    game.height / 2,
    Math.max(game.width, game.height) * 0.72,
  );
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.38)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, game.width, game.height);
}

function render() {
  ctx.clearRect(0, 0, game.width, game.height);
  drawBackground();

  ctx.save();
  if (game.shake > 0) {
    ctx.translate(random(-game.shake, game.shake), random(-game.shake, game.shake));
  }
  drawWorld();
  ctx.restore();

  drawParticles();
  if (perf.drawVignette) {
    drawVignette();
  }
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function frame(timestamp) {
  if (perf.frameInterval && game.lastTime && timestamp - game.lastTime < perf.frameInterval) {
    requestAnimationFrame(frame);
    return;
  }

  if (!game.lastTime) {
    game.lastTime = timestamp;
  }

  const elapsed = timestamp - game.lastTime;
  const dt = Math.min(0.033, elapsed / 1000);
  game.lastTime = timestamp;
  game.time += dt;

  if (game.state === "playing") {
    update(dt);
  } else {
    updateEffects(dt);
    updateCamera();
  }

  render();
  requestAnimationFrame(frame);
}

function updateJoystick(event) {
  const rect = joystick.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const max = rect.width * 0.34;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  const vector = normalize(dx, dy);
  const distance = Math.min(max, vector.length);

  input.joyX = max ? (vector.x * distance) / max : 0;
  input.joyY = max ? (vector.y * distance) / max : 0;
  joystickKnob.style.transform = `translate(calc(-50% + ${vector.x * distance}px), calc(-50% + ${vector.y * distance}px))`;
}

function resetJoystick() {
  input.joystickActive = false;
  input.joystickId = null;
  input.joyX = 0;
  input.joyY = 0;
  joystickKnob.style.transform = "translate(-50%, -50%)";
}

window.addEventListener("resize", resize);

window.addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(event.code)) {
    event.preventDefault();
  }

  keys.add(event.code);

  if (event.repeat) {
    return;
  }

  handleCheatKey(event);

  if (event.code === "Space") {
    ensureAudio();
    if (game.state === "menu") {
      startNewGame();
    } else {
      useAbility();
    }
  }

  if (event.code === "KeyB") {
    openShop();
  }

  if (event.code === "Escape") {
    ensureAudio();
    if (game.state === "shop") {
      closeShop();
    } else if (game.state === "locations") {
      closeLocations();
    } else if (game.state === "playing") {
      setPaused(true);
    } else if (game.state === "paused") {
      setPaused(false);
    }
  }

  if (event.code === "KeyP") {
    ensureAudio();
    setPaused(game.state === "playing");
  }
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

canvas.addEventListener("pointermove", (event) => {
  if (game.state !== "playing") {
    return;
  }

  const world = screenToWorld(event.clientX, event.clientY);
  const aim = normalize(world.x - player.x, world.y - player.y);
  if (aim.length > 0.1) {
    player.aimX = aim.x;
    player.aimY = aim.y;
  }
});

canvas.addEventListener("pointerdown", (event) => {
  if (game.state !== "playing") {
    return;
  }

  ensureAudio();
  event.preventDefault();
  manualShot(screenToWorld(event.clientX, event.clientY));
});

startButton.addEventListener("click", startNewGame);
continueButton.addEventListener("click", continueGame);
locationsButton.addEventListener("click", openLocations);
nextButton.addEventListener("click", nextLevel);
resultRestartButton.addEventListener("click", restartCurrentLevel);
resumeButton.addEventListener("click", () => setPaused(false));
pauseRestartButton.addEventListener("click", restartCurrentLevel);
mainMenuButton.addEventListener("click", returnToMenu);
shopButton.addEventListener("click", openShop);
openShopButton.addEventListener("click", openShop);
pauseShopButton.addEventListener("click", openShop);
resultShopButton.addEventListener("click", openShop);
closeShopButton.addEventListener("click", closeShop);
closeLocationsButton.addEventListener("click", closeLocations);

pauseButton.addEventListener("click", () => {
  ensureAudio();
  if (game.state === "playing") {
    setPaused(true);
  } else if (game.state === "paused") {
    setPaused(false);
  } else if (game.state === "shop") {
    closeShop();
  }
});

soundButton.addEventListener("click", () => {
  game.sound = !game.sound;
  soundButton.classList.toggle("is-active", !game.sound);
  soundButton.textContent = game.sound ? "♪" : "×";
  if (game.sound) {
    ensureAudio();
    playSound("ui", { frequency: 640, endFrequency: 840 });
  }
});

actionButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  useAbility();
});

joystick.addEventListener("pointerdown", (event) => {
  ensureAudio();
  input.joystickActive = true;
  input.joystickId = event.pointerId;
  joystick.setPointerCapture(event.pointerId);
  updateJoystick(event);
});

joystick.addEventListener("pointermove", (event) => {
  if (!input.joystickActive || input.joystickId !== event.pointerId) {
    return;
  }

  updateJoystick(event);
});

joystick.addEventListener("pointerup", resetJoystick);
joystick.addEventListener("pointercancel", resetJoystick);

resize();
loadLocation(0, true);
requestAnimationFrame(frame);
