import paths from "../paths"
import constants from "../constants";
export default class Bullet extends Phaser.Physics.Matter.Sprite
{

    constructor(scene:Phaser.Scene,x:number,y:number)
    {
        super(scene.matter.world,x,y,constants.GAME_OBJECTS.PROJECTILE.LASER)
    }
    init()
    {  
        
        this.setVelocityY(constants.GAME_LOGIC.PROJECTILE.SPEED)
        this.setCollisionCategory(constants.GAME_LOGIC.PHYSICS.COLLISION.CATEGORY_LASER);
        this.setCollidesWith(constants.GAME_LOGIC.PHYSICS.COLLISION.CATEGORY_ENEMY)
        this.scene.addToGameLayer(this)
        this.name=constants.GAME_OBJECTS.NAMES.BULLET;
        this.addSoundTimer();
      
    }
    addSoundTimer()
    {
       
        this.scene.sound.play(constants.AUDIO.BULLET_FIRE,{loop:false,volume:.5})
      
    }
    update(t:number,dt:number)
    {
        const extraBounds=200;
        //get screen bounds
        const topLeftBoundX=extraBounds*-1;
        const topLeftBoundY=extraBounds*-1;

        const bottomRightBoundX=this.scene.scale.width+extraBounds;
        const bottomRightBoundY=this.scene.scale.height+extraBounds;
        if(this.x <topLeftBoundX || this.x>bottomRightBoundX) this.destroy();
        if(this.y <topLeftBoundY || this.y>bottomRightBoundY) this.destroy();
        if(t <10 *1000) this.destroy();
    }
    callBackOnCollision()
    {
        this.destroy();
    }
}