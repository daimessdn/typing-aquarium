"use strict";
// define various fish types
const fishType = ["fish1.svg", "fish2.svg", "fish3.svg", "fish4.svg",
    "fish5.svg", "fish6.svg", "fish7.svg", "fish8.svg",
    "fish9.svg", "fish10.svg", "fish11.svg"];
class Game {
    // define initial game stats
    //// starter will have level 1, 50 cash, and xp point 1
    constructor(stats = { level: 1, cash: 50, xp: 1 }) {
        // // init'd fish collections in auarium
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
    levelUp() {
        // validating the XP to level up
        if (this.xp >= this.max_xp) {
            this.level += 1;
            this.xp -= this.max_xp;
        }
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
        this.htmlFish = document.createElement("img");
        this.htmlFish.src = `src/img/${this.img}`;
        this.htmlFish.id = this.id;
        this.htmlFish.style.cssText = `
            position: relative; left: ${this.x}px;
                                top: ${this.y}px;
        `;
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
        this.htmlFish.style.transform = previousPosition.x < this.x ?
            "rotateY(0deg)" : "rotateY(180deg)";
    }
    // generate word to feed the fish (if the fish hungry)
    triggerHungry() {
        if (this.isHungry && this.wordToFeed === "") {
            this.wordToFeed = words[Math.floor(Math.random() * words.length)];
            console.log(this);
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
const feedInput = document.querySelector("#feeding-keyboard");
feedInput.addEventListener("input", (event) => {
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
            setTimeout(() => fish.isHungry = true, 10000);
            game.levelUp();
            // clear input
            feedInput.value = "";
        });
        console.log(game);
    }
});
