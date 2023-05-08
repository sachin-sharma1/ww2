import paths from "../paths"
import constants from "../constants";
export default class Bullet extends Phaser.Physics.Matter.Sprite
{

    constructor(scene:Phaser.Scene,x:number,y:number)
    {
        super(scene.matter.world,x,y,paths.projectiles.laser.green)
    }
    init()
    {
        this.setVelocityY(constants.GAME_LOGIC.PROJECTILE.SPEED)
      
    }
    update(t:number,dt:number)
    {
        const extraBounds:number=200;
        //get screen bounds
        const topLeftBoundX=extraBounds*-1;
        const topLeftBoundY=extraBounds*-1;

        const bottomRightBoundX=this.scene.scale.width+extraBounds;
        const bottomRightBoundY=this.scene.scale.height+extraBounds;
        if(this.x <topLeftBoundX || this.x>bottomRightBoundX) this.destroy();
        if(this.y <topLeftBoundY || this.y>bottomRightBoundY) this.destroy();

    }
}