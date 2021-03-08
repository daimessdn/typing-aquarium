"use strict";
// define various fish types
const fishType = ["fish1.svg", "fish2.svg", "fish3.svg", "fish4.svg",
    "fish5.svg", "fish6.svg", "fish7.svg", "fish8.svg",
    "fish9.svg", "fish10.svg", "fish11.svg"];
// define words list
const words = [
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
    "pollka", "zigizaga", "aluminuium", "foramens", "only", "manganese", "molybdenum", "legume", "benzene",
    "birch", "rattata", "thunderbolt", "gitignore", "boltcutter", "lockpick", "deutschland", "impromptu",
    "minute", "minuet", "sprach", "cheveux", "cheguavera", "chevaleresque", "burgmuller", "oblivion",
    "prego", "watashi", "tangwroth", "tormentor", "staryu", "kuriboh", "turtwig", "piplup", "staravia",
    "bibarel", "golduck", "stringify", "burneary", "trias", "quarter", "arabesque", "gracieuse", "pastorale",
    "piazzas", "zelda", "adawong", "styrienne", "plainte", "chatterbox", "defunte", "infante", "pavine",
    "campnella", "chateau", "plateau", "penumbra", "amplitude", "longitude", "molybdenum", "leguminosum",
    "bombyxmorii", "versicolor", "virginica", "turing", "blobfish", "dumbo", "angler", "barrelfish",
    "iguana", "madagaskar", "pavalzar", "zimbabwe", "lvndscape", "dranchuk", "fsck", "nomodeset", "evince",
    "flameshot", "okonomiyaki", "elixir", "history", "hoisting", "daosd", "pudxqa", "sdfop", "ingpd", "sploit",
    "spotify", "premium", "sponteneus"
];
// define HTML 
const feedInput = document.querySelector("#feeding-keyboard");
const levelStats = document.querySelector("#level-stats");
const cashStats = document.querySelector("#cash-stats");
const xpStats = document.querySelector("#xp-stats");
const maxXpStats = document.querySelector("#max-xp-stats");
// sounds library
const fishEatenSound = new Audio("src/sounds/slurp.mp3");
class Game {
    // define initial game stats
    //// starter will have level 1, 50 cash, and xp point 1
    constructor(stats = { level: 1, cash: 50, xp: 1 }) {
        // // init'd fish collections in aquarium
        this.fish = [];
        this.level = stats.level;
        this.cash = stats.cash;
        this.xp = stats.xp;
        // determine max_xp for the next level
        this.max_xp = 10 + (5 * this.level * this.level);
        // init'd two fish
        this.fish.push(new Fish());
        this.fish.push(new Fish());
    }
    // in case of game level up
    validateLevelUp() {
        // validating the XP to level up
        if (this.xp >= this.max_xp) {
            this.level += 1;
            this.xp -= this.max_xp;
        }
    }
    renderUpdateStats() {
        levelStats.textContent = this.level.toString();
        cashStats.textContent = this.cash.toString();
        xpStats.textContent = this.xp.toString();
        maxXpStats.textContent = this.max_xp.toString();
    }
}
class Fish {
    // define fish in game
    constructor(img = fishType[Math.floor(Math.random() * fishType.length)], x = Math.floor(Math.random() * (document.body.clientWidth - 220)), y = Math.floor(Math.random() * (document.body.clientHeight - 150))) {
        // init'd fish properties
        this.id = "";
        this.wordToFeed = "";
        this.img = img;
        this.x = x;
        this.y = y;
        this.id = makeid();
        this.isHungry = true;
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
        document.querySelector("#aquarium").appendChild(this.htmlFish);
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
        this.htmlFish.children[0].style.transform = previousPosition.x < this.x ?
            "rotateY(0deg)" : "rotateY(180deg)";
    }
    // generate word to feed the fish (if the fish hungry)
    triggerHungry() {
        if (this.isHungry && this.wordToFeed === "") {
            this.wordToFeed = words[Math.floor(Math.random() * words.length)];
            console.log(this);
            document.querySelector(`#word-${this.id}`).textContent = this.wordToFeed;
        }
    }
}
function makeid() {
    var result = '';
    var characters = '0123456789abcdef';
    var charactersLength = characters.length;
    for (var i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const game = new Game();
game.renderUpdateStats();
setInterval(function () {
    game.fish.forEach(fishItem => {
        fishItem.moveFishInAquarium();
    });
}, Math.floor(Math.random() * 10000));
setInterval(function () {
    game.fish.forEach(fishItem => {
        fishItem.triggerHungry();
    });
}, Math.floor(50));
feedInput.addEventListener("input", () => {
    // get the hungry fish based on input value
    const getHungryFish = game.fish.filter(matchedFish => feedInput.value == matchedFish.wordToFeed);
    // in case we got the hungry fish,
    //// change fish status hunger
    //// and proceed the game reward (XP increased and cash increased)
    if (getHungryFish.length > 0) {
        getHungryFish.forEach(fish => {
            fish.isHungry = false;
            fish.wordToFeed = "";
            game.xp += game.level;
            game.cash += 5;
            game.max_xp = 10 + (5 * game.level * game.level);
            fishEatenSound.play();
            setTimeout(() => fish.isHungry = true, 10000 + (game.level * 100));
            game.validateLevelUp();
            game.renderUpdateStats();
            // clear input
            feedInput.value = "";
            document.querySelector(`#word-${fish.id}`).textContent = "";
        });
        console.log(game);
    }
    feedInput.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
            feedInput.value = "";
        }
    });
});
