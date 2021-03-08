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
    "anuum", "oleum", "hirata", "onyx", "vaporeon", "kirlia", "charmeleon", "saulus", "quam", "wocher",
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
    "spotify", "premium", "spontaneus", "snowmode", "hiddenspace", "copywriting", "copyright", "gksudo", "ifconfig",
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
const feedInput = document.querySelector("#feeding-keyboard")! as HTMLInputElement;
const levelStats = document.querySelector("#level-stats")!;
const cashStats = document.querySelector("#cash-stats")!;
const xpStats = document.querySelector("#xp-stats")!;
const maxXpStats = document.querySelector("#max-xp-stats")!;
const gameNotification = document.querySelector("#game-notification")!;

// sounds library
const fishEatenSound = new Audio("src/sounds/slurp.mp3");
const fishAddedSound = new Audio("src/sounds/splash.mp3");
const fishDiedSound = new Audio("src/sounds/bruh.mp3");
const tankAddedSound = new Audio("src/sounds/wow.mp3");

// define local keys for localStorage
const GAMESTATS_LOCAL_KEY = "aquarium.gamestats";
const FISH_LOCAL_KEY = "aquarium.fish";

// create game status for the first time
if (!localStorage.getItem(GAMESTATS_LOCAL_KEY)) {
    localStorage.setItem(GAMESTATS_LOCAL_KEY, '{ "level": 1, "cash": 50, "xp": 1 }');
    localStorage.setItem(FISH_LOCAL_KEY, "[ ]");
}

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
            loaded.forEach((loadedFish: { id: string | undefined; img: string | undefined; x: number | undefined; y: number | undefined; }) => {
                this.fish.push(new Fish(loadedFish.id, loadedFish.img, loadedFish.x, loadedFish.y));
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
    renderUpdateStats() {
        // update stats to HTML
        levelStats.textContent = this.level.toString();
        cashStats.textContent = this.cash.toString();
        xpStats.textContent = this.xp.toString();
        maxXpStats.textContent = this.max_xp.toString();

        // check fish which are not died
        this.fish = this.fish.filter(fish => !fish.isDied);

        // upload game and fish status to localStorage
        const stats = { level: this.level, cash: this.cash, xp: this.xp }
        localStorage.setItem(GAMESTATS_LOCAL_KEY, JSON.stringify(stats));
        localStorage.setItem(FISH_LOCAL_KEY, JSON.stringify(this.fish));
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
                x = Math.floor(Math.random() * (document.body.clientWidth - 220)),
                y = Math.floor(Math.random() * (document.body.clientHeight - 150))) {

        this.id = makeid();
        this.img = img;
        this.x = x;
        this.y = y;

        // defined fish status
        this.isHungry = true;
        this.isDied = false;
        this.hungerTimer = 11;
        
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

        const feedCaption = document.createElement("figcaption");
        feedCaption.id = `word-${this.id}`;

        this.htmlFish.appendChild(img);
        this.htmlFish.appendChild(feedCaption);

        document.querySelector("#aquarium")!.appendChild(this.htmlFish);
    }

    // change position of the fish
    changePosition() {
        this.x = Math.floor(Math.random() * (document.body.clientWidth - 220));
        this.y = Math.floor(Math.random() * (document.body.clientHeight - 150));
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
        if (this.isHungry && this.wordToFeed === "") {
           this.wordToFeed = words[Math.floor(Math.random() * words.length)];
           // console.log(this);

           document.querySelector(`#word-${this.id}`)!.textContent = this.wordToFeed;

           // 10 seconds deadline
           //// else, the fish will die
            let countDown = setInterval(() => {
				if (this.hungerTimer < 0) {
					console.log("your fish died!");
					fishDiedSound.play();

                    this.isDied = true;
                    this.isHungry = false;
                    
                    clearInterval(countDown);
                    this.triggerDie();
				} else {
                    if (!game.isPaused) {
                        this.hungerTimer--;
                        // console.log(this.hungerTimer);
                    }

                    if (!this.isHungry) { clearInterval(countDown); }
                }
           }, 1000);
        }
    }

    triggerDie() {
        document.querySelector(`#fish-${this.id}`)!.remove();
    }
}

// define a new game
//// and also update game state
const game = new Game(JSON.parse(localStorage.getItem(GAMESTATS_LOCAL_KEY)!));
game.renderUpdateStats();

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
const triggerFishMovement = setInterval(function() {
    game.fish.forEach(fishItem => {
        fishItem.moveFishInAquarium();
    });
}, Math.floor(Math.random() * 10000));

// watch progress of fish hunger
//// only if the game is not paused
const triggerFishHunger = setInterval(function() {
    if (!game.isPaused) {
        game.fish.forEach(fishItem => {
            fishItem.triggerHungry();
        });
    }
}, Math.floor(50));

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
            fish.isHungry = false; fish.wordToFeed = ""; fish.hungerTimer = 10;
            game.xp += game.level; game.cash += 5;
            game.max_xp = 10 + (5 * game.level * game.level);

            // wait 10 seconds again
            //// to make fish hungry
            fishEatenSound.play();
            setTimeout(() => fish.isHungry = true, 10000 + (game.level * 100));

            // check for level up
            //// and update game stats
            game.validateLevelUp();
            game.renderUpdateStats();

            // clear input
            feedInput.value = "";
            document.querySelector(`#word-${fish.id}`)!.textContent = "";
        });
        // console.log(game);
    }

    // instant clear input
    //// using backspace key
    feedInput.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" ||
            event.key === "1") {
            feedInput.value = "";
        }
    });
});

// keyboard actions
//// buy fish, backgrounds, and also quit the game
document.addEventListener("keydown", (event) => {
    // press 1 to buy the fish
    //// as long as the game is not paused
    if (event.key === "1") {
        if (game.isPaused === false) {
            game.fish.push(new Fish());
            fishAddedSound.play();
        
            if (game.cash <= 100) {
                game.cash -= 100;
                game.renderUpdateStats();
            } else {
                triggerNotification("Your money is not enough to buy a fish", "");
            }
        
            feedInput.value = "";
        } else {
            triggerNotification("You cannot buy a fish in paused mode!",
                                "Game paused");
        }
    } else if (event.key === "2") {
        if (game.isPaused === false) {
            tankAddedSound.play();
        
            if (game.cash <= 1000) {
                game.cash -= 100;
                game.renderUpdateStats();
            } else {
                triggerNotification("Your money is not enough to buy a fish", "");
            }
        
            feedInput.value = "";
        } else {
            triggerNotification("You cannot buy a background in paused mode!",
                                "Game paused");
        }
    } else if (event.key === "Escape") {
        game.isPaused = game.isPaused ? false : true;
        // console.log("game pause/not paused.");

        feedInput.disabled = game.isPaused ? true : false;
        gameNotification.textContent = game.isPaused ? "Game paused" : "";
    }

    feedInput.focus();
});

function triggerNotification(text: string, finalText: string) {
    gameNotification.textContent = "You cannot buy a fish in paused mode!";
    setTimeout(() => { gameNotification.textContent = "Game paused"; }, 5000);
}