import {Scene} from 'phaser'
export default class Enemy extends Phaser.Physics.Matter.Sprite
{
    world:Phaser.Physics.Matter.World;
    constructor(scene:Scene,x:number,y:number,texture: string | Phaser.Textures.Texture)
    {
        super(scene.matter.world,x,y,texture);
        this.world=scene.matter.world;
        this.on(Phaser.GameObjects.Events.DESTROY,this.onDelete);
        
    }
    
    onDelete()
    {
       
        console.log("i am being deleted")
    }
    
}