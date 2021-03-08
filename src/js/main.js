"use strict";
var Game = /** @class */ (function () {
    // // init'd fish
    // fish: Fish[] = [];
    // define initial game stats
    function Game(stats) {
        this.level = stats.level;
        this.cash = stats.cash;
        this.xp = stats.xp;
        // determine max_xp for the next level
        this.max_xp = 10 + (5 * this.level * this.level);
        // // init'd two fish
        // this.fish.push(new Fish({ id: "123abc", img: "fish4.svg", x: 33, y: 44 }));
        // this.fish.push(new Fish({ id: "123abd", img: "fish2.svg", x: 22, y: 54 }));
    }
    // in case of game level up
    Game.prototype.levelUp = function () {
        if (this.xp >= this.max_xp) {
            this.level += 1;
            this.xp -= this.max_xp;
        }
    };
    return Game;
}());
var Fish = /** @class */ (function () {
    function Fish(stats) {
        this.id = stats.id;
        this.img = stats.img;
        this.x = stats.x;
        this.y = stats.y;
    }
    Fish.prototype.changePosition = function () {
        this.x = Math.floor(Math.random() * document.body.clientWidth) - 100;
        this.y = Math.floor(Math.random() * document.body.clientHeight) - 100;
    };
    return Fish;
}());
var fish1 = new Fish({ id: "123abc", img: "fish4.svg", x: 33, y: 44 });
var fish2 = new Fish({ id: "123abc", img: "fish1.svg", x: 22, y: 54 });
var htmlFish = document.createElement("img");
htmlFish.src = "src/img/" + fish1.img;
htmlFish.style.cssText = "\n    position: relative;\n    left: " + fish1.x + "px;\n    top: " + fish1.y + "px;\n";
var htmlFish2 = document.createElement("img");
htmlFish2.src = "src/img/" + fish2.img;
htmlFish2.style.cssText = "\n    position: relative;\n    left: " + fish2.x + "px;\n    top: " + fish2.y + "px;\n";
document.querySelector("#aquarium").appendChild(htmlFish);
document.querySelector("#aquarium").appendChild(htmlFish2);
var moveFishInAquarium = function (fish, mv) {
    setTimeout(function () {
        var previousPosition = { x: fish.x, y: fish.y };
        fish.changePosition();
        htmlFish.style.cssText = "\n            position: relative;\n            left: " + fish.x + "px;\n            top: " + fish.y + "px;\n        ";
        htmlFish.style.transform = previousPosition.x < fish.x ? "rotateY(0deg)" : "rotateY(180deg)";
        console.log(htmlFish.style);
    }, Math.floor(Math.random() * 10000) * mv);
};
var moveFishInAquarium2 = function (fish, mv) {
    setTimeout(function () {
        var previousPosition = { x: fish.x, y: fish.y };
        fish.changePosition();
        htmlFish2.style.cssText = "\n            position: relative;\n            left: " + fish.x + "px;\n            top: " + fish.y + "px;\n        ";
        htmlFish2.style.transform = previousPosition.x < fish.x ? "rotateY(0deg)" : "rotateY(180deg)";
        console.log(htmlFish.style);
    }, Math.floor(Math.random() * 10000) * mv);
};
for (var i = 0; i <= 10; i++) {
    moveFishInAquarium(fish1, i);
    moveFishInAquarium2(fish2, i);
}
var generateQuestion = function () {
    document.querySelector("#test").innerHTML = "hello";
    console.log("question added");
};
generateQuestion();
