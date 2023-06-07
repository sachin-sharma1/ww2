import {Scene} from 'phaser'
import constants from '../constants';
export default class Enemy extends Phaser.Physics.Matter.Sprite
{
    world:Phaser.Physics.Matter.World;
    constructor(scene:Scene,x:number,y:number,texture: string | Phaser.Textures.Texture)
    {
        super(scene.matter.world,x,y,texture);
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
        
    }
    
    onDelete()
    {
        console.log("i am being deleted")
    }
    
}