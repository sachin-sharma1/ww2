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
    
   
    callBackOnCollision()
    {
        this.health--;

        if(this.health<=0)
        {
            this.scene.onEnemyDestroy();
            const emitter= this.scene.add.particles(this.x,this.y,"flares",{
                frame: [ 'red', 'yellow', 'green' ],
            lifespan: 4000,
            speed: { min: 150, max: 250 },
            scale: { start: 0.8, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
            })
            emitter.explode(25);
            this.scene.addToGameLayer(emitter);
           
            this.scene.time.delayedCall(25,()=>{
                this.destroy();
                
            });
        }else
        {
            this.preFX?.addPixelate(this.health/this.maxHealth)
        }
    }
    
}