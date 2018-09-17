import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("floor.png");

class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
    }

    handleBoundaryContact() {
        //delete spell when it leaves display area
        game.removeSprite(this);
    }

    handleCollision(otherSprite) {
        //compare images so Stranger's spells don't destroy each other.
        if (this.getImage() !== otherSprite.getImage()) {
            game.removeSprite(this);
            new Fireball(otherSprite);
        }
        return false;
    }
}

class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = (deadSprite.x);
        this.y = (deadSprite.y);
        this.setImage("fireballSheet.png");
        this.name = "A ball of fire.";
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 16);
        this.playAnimation("explode");

    }
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(stranger)) {
            game.end("Congratulations!\n\nMarcus has defeated the mysterious" +
                "\nstranger in the dark cloak!");
        }
        if (!game.isActiveSprite(marcus)) {
            game.end("Marcus is defeated by the mysterious\nstranger in the dark cloak!\n\nBetter luck next time");
        }
    }
}

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Marcus The Wizard";
        this.setImage("marcusSheet.png");
        this.height = 48;
        this.width = 48;
        this.x = this.width;
        this.y = this.height;
        this.defineAnimation("down", 6, 8);
        this.speedWhenWalking = 100;
        this.defineAnimation("up", 6, 8);
        this.defineAnimation("right", 3, 5);
        this.spellCastTime= 0;

    }
    handleGameLoop() {
        this.y = Math.max(5, this.y);
        this.y = Math.min(552, this.y);
        this.speed = 0;
        //keep marcus in display area
    }
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }

    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }

    handleSpacebar() {
        let now= game.getTime(); //get the number of seconds since start game
        let spell = new Spell();
        
        if (now-this.spellCastTime >=2){
            this.spellCastTime=now;
            spell.name = "A spell cast by Marcus";
        spell.setImage("marcusSpellSheet.png");
        spell.angle = 0;
        spell.x = this.x + this.width; // this sets the position of the spell object equal to
        spell.y = this.y; // the position of any object created from the PlayerWizard class
            spell.playAnimation ("magic",true);
            this.playAnimation("right");
             
        }
    }

}

class NonPlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The mysterious stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("left", 3, 5);
    }
    handleGameLoop() {
        if (this.y <= 0) {
            //upward motion has reached top, so turn down
            this.y = 0;
            this.angle = 270;
            this.playAnimation("down");
        }
        if (this.y >= game.displayHeight - this.height) {
            //downward motion has reached botttom, so turn up
            this.y = game.displayHeight - this.height;
            this.angle = 90;
            this.playAnimation("up");
        }
        if (Math.random()< 0.01){
            let spell = new Spell();
        spell.name = "A spell cast by Stranger";
        spell.setImage("strangerSpellSheet.png");
        spell.angle = 180;
        spell.x = this.x - this.width; // this sets the position of the spell object equal to
        spell.y = this.y; // the position of any object created from the PlayerWizard class
        spell.playAnimation("magic", true);
        this.playAnimation("left");//create a spell object 48 pixels to the left of this object

        }
    }
    handleAnimationEnd() {
        if (this.angle === 90) {
            this.playAnimation("up");
        }
        if (this.angle === 270) {
            this.playAnimation("down");
        }
    }
    
}



let marcus = new PlayerWizard();
let stranger = new NonPlayerWizard();
