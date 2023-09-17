
class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;

    }
}

class littleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class bigMonster extends Character {
    constructor() {
        super('BIG MONSTER');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1e1, fighter2e1, logObject) {
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1e1 = fighter1e1
        this.fighter2e1 = fighter2e1
        this.log = logObject
    }

    start() {
        this.update();

        this.fighter1e1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))
        this.fighter2e1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
    }

    update() {
        this.fighter1e1.querySelector('.name').innerHTML = `${this.fighter1.name}  - ${this.fighter1.life.toFixed(2)} HP`;
        let f1pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1e1.querySelector('.bar').style.width = `${f1pct}%`

        this.fighter2e1.querySelector('.name').innerHTML = `${this.fighter2.name}  - ${this.fighter2.life.toFixed(2)} HP`;
        let f2pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2e1.querySelector('.bar').style.width = `${f2pct}%`
    }

    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`A luta acabou | Comece novamente | Atualizar pagina`)
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else {
            this.log.addMessage(`${attacked.name} conseguio defender`);
        }

        this.update();
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.unshift(msg);
        this.render();
    }

    render () {
        this.listEl.innerHTML = '';

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}



let log = new Log(document.querySelector('.log'))

let char = new Knight('GUIZÃO');
let monster = new bigMonster();

const stage = new Stage(char,monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();
