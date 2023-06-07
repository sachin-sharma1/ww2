import {Scene} from 'phaser'
import constants from '../constants';

export default class Enemy extends Phaser.Physics.Matter.Sprite
{
    world:Phaser.Physics.Matter.World;
    health:number;
    maxHealth:number;
    constructor(scene:Scene,x:number,y:number,texture: string | Phaser.Textures.Texture,health=1)
    {
        super(scene.matter.world,x,y,texture);
        this.maxHealth=health;
        
        health = health*constants.GAME_LOGIC.ENEMY.HEALTH_MUL_FACTOR;
        this.world=scene.matter.world;
      //  this.on(Phaser.GameObjects.Events.DESTROY,this.onDelete);
        const onUpdate = (tween:Phaser.Tweens.Tween)=>{
            const value = Math.floor(tween.getValue());
            this.setTint(Phaser.Display.Color.GetColor(value, value, value));
        }

        this.name=constants.GAME_OBJECTS.NAMES.ENEMY;
        
        this.scene.tweens.addCounter({
            from: 0,
            to: 255,
            duration: 3000,
            onUpdate
            
        });
        this.health=health;
        this.setStatic(true)

        
    }
    
    onDelete()
    {
        console.log("i am being deleted")
    }
    callBackOnCollision()
    {
        this.health--;

        if(this.health<=0)
        {
            this.destroy();
        }else
        {
            this.preFX?.addPixelate(this.health/this.maxHealth)
        }
    }
    
}