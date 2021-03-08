class Game {
    // init'd stats
    level: number; cash: number; xp: number; max_xp: number;

    // // init'd fish
    // fish: Fish[] = [];

    // define initial game stats
    constructor(stats: { level: number; cash: number; xp: number }) {
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
    levelUp() {
        if (this.xp >= this.max_xp) {
            this.level += 1;
            this.xp -= this.max_xp;
        }
    }    
}

class Fish {
    // init'd fish properties
    id: string; img: string; x: number; y: number;

    constructor(stats: { id: string; img: string; x: number; y: number }) {
        this.id = stats.id;
        this.img = stats.img;
        this.x = stats.x;
        this.y = stats.y;
    }

    changePosition() {
        this.x = Math.floor(Math.random() * document.body.clientWidth) - 100;
        this.y = Math.floor(Math.random() * document.body.clientHeight) - 100;
    }
}

const fish1 = new Fish({ id: "123abc", img: "fish4.svg", x: 33, y: 44 });
const fish2 = new Fish({ id: "123abc", img: "fish1.svg", x: 22, y: 54 });

let htmlFish = document.createElement("img");
htmlFish.src = `src/img/${fish1.img}`;
htmlFish.style.cssText = `
    position: relative;
    left: ${fish1.x}px;
    top: ${fish1.y}px;
`;

let htmlFish2 = document.createElement("img");
htmlFish2.src = `src/img/${fish2.img}`;
htmlFish2.style.cssText = `
    position: relative;
    left: ${fish2.x}px;
    top: ${fish2.y}px;
`;

document.querySelector("#aquarium")!.appendChild(htmlFish);
document.querySelector("#aquarium")!.appendChild(htmlFish2);

const moveFishInAquarium = (fish: Fish, mv: number) => {
    setTimeout(() => {
        const previousPosition = { x: fish.x, y: fish.y };
        fish.changePosition();

        htmlFish.style.cssText = `
            position: relative;
            left: ${fish.x}px;
            top: ${fish.y}px;
        `;

        htmlFish.style.transform = previousPosition.x < fish.x ? "rotateY(0deg)" : "rotateY(180deg)";

        console.log(htmlFish.style);
    }, Math.floor(Math.random() * 10000) * mv);
}

const moveFishInAquarium2 = (fish: Fish, mv: number) => {
    setTimeout(() => {
        const previousPosition = { x: fish.x, y: fish.y };
        fish.changePosition();
        
        htmlFish2.style.cssText = `
            position: relative;
            left: ${fish.x}px;
            top: ${fish.y}px;
        `;

        htmlFish2.style.transform = previousPosition.x < fish.x ? "rotateY(0deg)" : "rotateY(180deg)";

        console.log(htmlFish.style);
    }, Math.floor(Math.random() * 10000) * mv);
}

for (let i = 0; i <= 10; i++) {
    moveFishInAquarium(fish1, i);
    moveFishInAquarium2(fish2, i);
}

const generateQuestion = () => {
    document.querySelector("#test")!.innerHTML = "hello";

    console.log("question added");
}

generateQuestion();