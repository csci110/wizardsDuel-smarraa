import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("volleyballNet.png");

class Spike extends Sprite() {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
    }
}

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Alexa";
        this.setImage("alexaSprite.png");
        this.height = 150;
        this.width = 218;
        this.x = this.width;
        this.y = 375;
        this.defineAnimation("left");
        this.speedWhenWalking = 300;
       // this.defineAnimation("right");
        //this.defineAnimation("up");
       // this.defineAnimation("down");

    }
    handleGameLoop() {
        this.x = Math.max(5, this.x);
        this.x = Math.min(645, this.x);
        this.y = Math.max(5, this.y);
        this.y = Math.min(375, this.y);
        this.speed = 0;
        //keep Alexa in display area
    }
    handleRightArrowKey() {
       // this.playAnimation("right");
        this.speed = this.speedWhenWalking;
        this.angle = 0;
    }

    handleLeftArrowKey() {
        //this.playAnimation("left");
        this.speed = this.speedWhenWalking;
        this.angle = 180;
    }

    handleUpArrowKey() {
        //this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }

    handleDownArrowKey() {
        //this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }

    handleSpacebar() {
        let spike = new Spike();
        spike.x = this.x;
        spike.y = this.y;
        spike.setImage("ball.png");
        spike.angle = 90;
    }

}

let alexa = new PlayerWizard();
