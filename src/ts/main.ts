// define various fish types
const fishType: string[] = ["fish1.svg", "fish2.svg", "fish3.svg", "fish4.svg",
                            "fish5.svg", "fish6.svg", "fish7.svg", "fish8.svg",
                            "fish9.svg", "fish10.svg", "fish11.svg"];

// define words list
const words: string[] = [
    "a", "alaba", "uza", "palab", "eraj", "paleka", "oi", "mawq", "zhuag", "xapve",
    "eps", "acosin", "phirz", "mcdeltat", "vavi", "rhob", "los", "knho", "force", "brani", "ganaram",
    "zitishen", "iqnd", "polygon", "namm", "mintbean", "io", "oryza", "yamz", "javascript", "feedme",
    "iamhungry", "iwantu", "wantfood", "chainfood", "sunday", "posix", "three", "omega", "zxcv", "dvorak",
    "whoami", "whatis", "sudo", "beautiful", "nospace", "corona", "savannah", "kasakuyan", "rusuto",
    "mosura", "endomu", "hambamuyan", "xyz", "azula", "genji", "lossky", "walker", "capsicum", "helloworld",
    "tsc", "daimessdn", "staysafe", "covidline", "donotcross", "wearmask", "parampaa", "lorem", "ipsum",
    "dolor", "sit", "amet", "requirem", "gojira", "randa", "kasaku", "yanmu", "dongan", "takeshi",
    "canuck", "eh", "freezie", "gitrdone", "giver", "habs", "hoser", "keener", "mickey", "parkade", "pop",
    "poutine", "rinkrat", "thepeg", "timbits", "toque", "washroom", "amazon", "wellerman", "argules", "runners",
    "darts", "gelay", "anjay", "azure", "eier", "spacex", "caribou", "aqua", "typewriter", "elusmod", "tempor",
    "venlam", "blanditiis", "iusto", "malorum", "autem", "fuga", "chiton", "omnis", "vivipar", "fakear",
    "anuum", "onyx", "vaporeon", "kirlia", "charmeleon", "saulus", "quam", "wocher",
    "jahre", "alt", "vierzehn", "zwanzig", "winters", "portfolio", "suburban", "manhattan", "pizza", "assuming",
    "pollka", "zigizaga", "alumunium", "foramens", "only", "manganese", "molybdenum", "legume", "benzene",
    "birch", "rattata", "thunderbolt", "gitignore", "boltcutter", "lockpick", "deutschland", "impromptu",
    "minute", "minuet", "sprach", "cheveux", "cheguavera", "chevaleresque", "burgmuller", "oblivion",
    "prego", "watashi", "tangwroth", "tormentor", "staryu", "kuriboh", "turtwig", "piplup", "staravia",
    "bibarel", "golduck", "stringify", "burneary", "trias", "quarter", "arabesque", "gracieuse", "pastorale",
    "piazzas", "zelda", "adawong", "styrienne", "plainte", "chatterbox", "defunte", "infante", "pavine",
    "campnella", "chateau", "plateau", "penumbra", "amplitude", "longitude", "molybdenum", "leguminosum",
    "bombyxmorii", "versicolor", "virginica", "turing", "blobfish", "dumbo", "angler", "barrelfish",
    "iguana", "madagaskar", "pavalzar", "zimbabwe", "lvndscape", "dranchuk", "fsck", "nomodeset", "evince",
    "flameshot", "okonomiyaki", "elixir", "history", "hoisting", "daosd", "pudxqa", "sdfop", "ingpd", "sploit",
    "spotify", "premium", "spontaneous", "snowmode", "hiddenspace", "copywriting", "copyright", "gksudo", "ifconfig",
    "vscode", "vaccine", "zusammen", "arbeite", "bureaucracy", "onomatopoeia", "occurence", "maneuver", 
    "alveolus", "massachusetts", "sweetscar", "cardigan", "oscillator", "scenegraph", "district",
    "camouflage", "nefarious", "hegemony", "matsutake", "cellulla", "pseudomonas", "shutdown", "jinzo", "ushioni",
    "twinheaded", "thunderdragon", "magician", "plaque", "pheumonia", "xerophthalmia", "sdu", "qw", "siz",
    "e", "i", "z", "mercedez", "benz", "volkswagen", "ievan", "pollka", "aristoteles", "archimedes",
    "redi", "oxygen", "krypton", "argentum", "dacapo", "ibidem", "pathway", "metabolism", "carbohydrate",
    "phosphate", "wettability", "humidity", "basketball", "petit", "dance", "macabre", "uroboros", "ferdinand",
    "oyeleye", "adeyinka", "aderonke", "morenike", "faderara"
];

// define HTML DOM interface
const aquarium = document.querySelector("#aquarium")! as HTMLElement;
const feedInput = document.querySelector("#feeding-keyboard")! as HTMLInputElement;
const levelStats = document.querySelector("#level-stats")! as HTMLElement;
const cashStats = document.querySelector("#cash-stats")! as HTMLElement;
const xpStats = document.querySelector("#xp-stats")! as HTMLElement;
const maxXpStats = document.querySelector("#max-xp-stats")! as HTMLElement;
const gameNotification = document.querySelector("#game-notification")! as HTMLElement;
const gameHelper = document.querySelector("#game-helper")! as HTMLElement;

// sounds library
const fishEatenSound = new Audio("src/sounds/slurp.mp3");
const fishAddedSound = new Audio("src/sounds/splash.mp3");
const fishDiedSound = new Audio("src/sounds/bruh.mp3");
const tankAddedSound = new Audio("src/sounds/wow.mp3");

// define local keys for localStorage
const GAMESTATS_LOCAL_KEY = "aquarium.gamestats";
const FISH_LOCAL_KEY = "aquarium.fish";
const TANKS_LOCAL_KEY = "aquarium.tanks";

// create game status for the first time
if (!localStorage.getItem(GAMESTATS_LOCAL_KEY)) {
    localStorage.setItem(GAMESTATS_LOCAL_KEY, '{ "level": 1, "cash": 50, "xp": 1 }');
    localStorage.setItem(FISH_LOCAL_KEY, "[ ]");
    localStorage.setItem(TANKS_LOCAL_KEY, '["aquarium1"]');
}

// other variables
let fishTanks = JSON.parse(localStorage.getItem(TANKS_LOCAL_KEY)!);
let aquariumIteration = 0;

class Game {
    // init'd stats
    level: number; cash: number; xp: number; max_xp: number;
    isPaused: boolean;

    // // init'd fish collections in aquarium
    fish: Fish[] = [];

    // define initial game stats
    //// starter will have level 1, 50 cash, and xp point 1
    constructor(stats: { level: number;
                         cash: number;
                         xp: number } = { level: 1, cash: 50, xp: 1 }) {
        this.level = stats.level;
        this.cash = stats.cash;
        this.xp = stats.xp;

        this.isPaused = false;

        // determine max_xp for the next level
        this.max_xp = 10 + (5 * this.level * this.level);

        // loaded fish from localStrorage
        const loaded = JSON.parse(localStorage.getItem(FISH_LOCAL_KEY)!);
        
        // check if there is no fish in localStorage,
        //// it will create two fish instead of load from localStorage
        if (loaded.length < 1) {
            this.fish.push(new Fish());
            this.fish.push(new Fish());
        } else {
            loaded.forEach((loadedFish: { id: string |undefined;
                                          img: string | undefined;
                                          x: number | undefined; y: number | undefined;
                                          hungerTimer: number| undefined }) => {
                this.fish.push(new Fish(loadedFish.id,
                                        loadedFish.img,
                                        loadedFish.x, loadedFish.y,
                                        loadedFish.hungerTimer));
            });
        }
    }

    // in case of game level up
    validateLevelUp() {
        // validating the XP to level up
        if (this.xp >= this.max_xp) {
            this.level += 1;
            this.xp -= this.max_xp;
        }
    }

    // rendering updated stats of the game
    updateStats() {
        // update stats to HTML
        levelStats.textContent = this.level.toString();
        cashStats.textContent = this.cash.toString();
        xpStats.textContent = this.xp.toString();
        maxXpStats.textContent = this.max_xp.toString();

        // filter fish which are not died
        this.fish = this.fish.filter(fish => !fish.isDied);

        // upload game and fish status to localStorage
        const stats = { level: this.level, cash: this.cash, xp: this.xp }
        localStorage.setItem(GAMESTATS_LOCAL_KEY, JSON.stringify(stats));
        localStorage.setItem(FISH_LOCAL_KEY, JSON.stringify(this.fish));
        localStorage.setItem(TANKS_LOCAL_KEY, JSON.stringify(fishTanks));
    }

    restartStats() {
        this.level = 1;
        this.cash = 50;
        this.xp = 1;
    }
}

class Fish {
    // init'd fish properties
    id: string; img: string; x: number; y: number; htmlFish: any;
    
    // init'd fish status
    isHungry: boolean; isDied: boolean; wordToFeed: string = "";
    hungerTimer: number;

    // define fish in game
    constructor(id: string = "",
                img: string = fishType[Math.floor(Math.random() * fishType.length)],
                x: number = Math.floor(Math.random() * (document.body.clientWidth * 0.75)),
                y: number = Math.floor(Math.random() * (document.body.clientHeight * 0.45)),
                hungerTimer:number = 11) {

        this.id = makeid();
        this.img = img;
        this.x = x;
        this.y = y;

        // defined fish status
        this.isHungry = true;
        this.isDied = false;
        this.hungerTimer = hungerTimer;
        
        // load fish instance directly to HTML
        this.generateFish();
    }

    // rendered fish instance to HTML
    generateFish() {
        this.htmlFish = document.createElement("figure");
        this.htmlFish.id = `fish-${this.id}`;
        this.htmlFish.style.cssText = `
            position: relative; left: ${this.x}px;
                                top: ${this.y}px;
        `;
        
        const img = document.createElement("img");
        img.src = `src/img/fish/${this.img}`;
        img.draggable = false;

        const feedCaption = document.createElement("figcaption");
        feedCaption.id = `word-${this.id}`;

        this.htmlFish.appendChild(img);
        this.htmlFish.appendChild(feedCaption);

        document.querySelector("#aquarium")!.appendChild(this.htmlFish);
    }

    // change position of the fish
    changePosition() {
        this.x = Math.floor(Math.random() * (document.body.clientWidth * 0.75));
        this.y = Math.floor(Math.random() * (document.body.clientHeight * 0.45));
    }

    // trigger HTML to move fish
    moveFishInAquarium() {
        const previousPosition = { x: this.x, y: this.y };
        this.changePosition();
    
        this.htmlFish.style.cssText = `
            position: relative; left: ${this.x}px;
                                top: ${this.y}px;`;
    
        // rotate fish turn left or turn right depends on position
        this.htmlFish.children[0].style.transform = previousPosition.x < this.x ?
                                        "rotateY(0deg)" : "rotateY(180deg)";
    }

    // generate word to feed the fish (if the fish hungry)
    triggerHungry() {
        if (this.hungerTimer <= 10 && this.wordToFeed === "") {
            this.wordToFeed = words[Math.floor(Math.random() * words.length)];
            document.querySelector(`#word-${this.id}`)!.textContent = this.wordToFeed;
        }
    }
    
    triggerDie() {
        this.isDied = true;
        this.isHungry = false;
        
        fishDiedSound.play();
        document.querySelector(`#fish-${this.id}`)!.remove();
    }
}

// define a new game
//// and also update game state
const game = new Game(JSON.parse(localStorage.getItem(GAMESTATS_LOCAL_KEY)!));
game.updateStats();

function makeid() {
   var result           = '';
   var characters       = '0123456789abcdef';
   var charactersLength = characters.length;
   for ( var i = 0; i < 15; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// trigger fish movement continuously
let movementTime = Math.floor(Math.random() * 10000);

const triggerFishMovement = setInterval(function() {
    game.fish.forEach(fishItem => {
        fishItem.moveFishInAquarium();
        console.log(fishItem.x, fishItem.y)
    });

    movementTime = Math.floor(Math.random() * 10000);
}, movementTime);

// trigger hunger countdown
const triggerCountdown = setInterval(function() {
    if (!game.isPaused) {
        game.fish.forEach(fishItem => {
            fishItem.hungerTimer -= 1;
            fishItem.triggerHungry();

            // makes the fish die
            //// if times out
            if(fishItem.hungerTimer < 0) {
                fishItem.triggerDie();
                triggerNotification("Oh, no! Your fish is died!", "");
            }

            game.updateStats();
        });
    }

    if (game.fish.length < 1) {
        // restart game stats
        game.restartStats();

        localStorage.setItem(GAMESTATS_LOCAL_KEY, '{ "level": 1, "cash": 50, "xp": 1 }');
        localStorage.setItem(FISH_LOCAL_KEY, "[ ]");
        localStorage.setItem(TANKS_LOCAL_KEY, '["aquarium1"]');

        feedInput.disabled = true;

        gameNotification.textContent = "All your fish are died. Please reload (Ctrl + R) to restart game."
    }
}, 1000);

// trigger feedInput
//// this is where you can feed fish by keyboard input
feedInput.addEventListener("input", () => {
    // get the hungry fish based on input value (feeding mechanism)
    const getHungryFish = game.fish.filter(matchedFish => 
        feedInput.value == matchedFish.wordToFeed
    );

    // in case we got the hungry fish,
    //// change fish status hunger
    //// and proceed the game reward (XP increased and cash increased)
    if (getHungryFish.length > 0) {
        getHungryFish.forEach(fish => {
            fish.isHungry = false; fish.wordToFeed = ""; fish.hungerTimer = 20;
            game.xp += game.level; game.cash += 5;
            game.max_xp = 10 + (5 * game.level * game.level);

            // wait 10 seconds again
            //// to make fish hungry
            fishEatenSound.play();
            setTimeout(() => fish.isHungry = true, 10000 + (game.level * 100));

            // check for level up
            //// and update game stats
            game.validateLevelUp();
            game.updateStats();

            // clear input
            feedInput.value = "";
            document.querySelector(`#word-${fish.id}`)!.textContent = "";
        });
        // console.log(game);
    }

    // instant clear input
    //// using backspace key
    feedInput.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
            feedInput.value = "";
        }
    });
});

// keyboard actions
//// buy fish, backgrounds, and also quit the game
document.body.addEventListener("keydown", (event) => {
    // press 1 to buy the fish
    //// as long as the game is not paused
    if (event.key === "1") {
        if (game.isPaused === false) {
            if (game.fish.length > 0) {
                if (game.cash >= 100) {
                    game.fish.push(new Fish());
                    fishAddedSound.play();
                    triggerNotification("You bought a new fish. Take care of it.", "");
    
                    game.cash -= 100;
                    game.updateStats();
                } else {
                    triggerNotification("Your money is not enough to buy a fish!", "");
                }
            } else {
                triggerNotification("Your game is already over. You cannot buy fish anymore.",
                                    "All your fish are died. Please reload (Ctrl + R) to restart game.");
            }
        } else {
            triggerNotification("You cannot buy a fish in paused mode!",
                                "Game paused");
        }
    } else if (event.key === "2") {
        if (game.isPaused === false) {
            // in case of you still have fish
            if (game.fish.length > 0) {
                if (game.cash >= 1000 && !fishTanks.includes("aquarium2")) {
                    // if your money is enought and you can afford the background
                    fishTanks.push("aquarium2");

                    tankAddedSound.play();
                    triggerNotification("Congratulations! You've bought a new background! Your fish must be love it.", "");
                    
                    aquariumIteration += 1;
                    aquarium.style.backgroundImage = `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)),
                                                    url("src/img/aquariums/${
                                                        fishTanks[aquariumIteration % fishTanks.length]
                                                    }.svg")`;
                    game.cash -= 1000;
                    game.updateStats();
                } else if (fishTanks.includes("aquarium2")) {
                    // in case you already ahve a background
                    triggerNotification("You have already bought a background!", "");
                } else {
                    // your money is not enough
                    triggerNotification("Your money is not enough to buy a background!", "");
                }
            } else {
                triggerNotification("Your game is already over. You cannot buy a background anymore.",
                                    "All your fish are died. Please reload (Ctrl + R) to restart game.");
            }
        } else {
            triggerNotification("You cannot buy a background in paused mode!",
                                "Game paused");
        }
    } else if (event.key === "0") {
        aquariumIteration += 1;
        aquarium.style.backgroundImage = `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)),
                                          url("src/img/aquariums/${
                                              fishTanks[aquariumIteration % fishTanks.length]
                                          }.svg")`;
    } else if (event.key === "Escape") {
        pauseGame();
    } else if (event.key === "?") {
        gameHelper.style.display = gameHelper.style.display === "block" ? "none" : "block";
    } else if (event.key === "`") {
        if (!game.isPaused) {
            pauseGame();
        }
        
        window.open("https://forms.gle/U7JF7tA9QbrA5Mjy6", "_blank");
    }

    document.body.click();
});

function triggerNotification(text: string, finalText: string) {
    gameNotification.textContent = text;
    setTimeout(() => { gameNotification.textContent = finalText; }, 5000);
}

window.onclick = () => {
    if (document.activeElement !== feedInput) {
        feedInput.focus();
    }
}

function pauseGame() {
    game.isPaused = game.isPaused ? false : true;
    // console.log("game pause/not paused.");

    feedInput.disabled = game.isPaused ? true : false;
    gameNotification.textContent = game.isPaused ? "Game paused" : "";
}