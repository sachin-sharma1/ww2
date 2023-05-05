
const MAX_VELOCITY=8;
const MIN_MAX_VELOCITY_TIME=3*1000;
import {Scene} from 'phaser'
export default class Player extends Phaser.Physics.Matter.Sprite
{
    world:Phaser.Physics.Matter.World;
    scene:Scene;
    cursors:Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(scene:Scene,x:number,y:number,texture:string)
    {
        super(scene.matter.world,x,y,texture);
        this.world=scene.matter.world;
        this.scene=scene;
        this.init();
       
    }
    init()
    {
        this.addKeyBoardEvents();
       
    }
    addKeyBoardEvents()
    {
        this.cursors=this.scene.input.keyboard.createCursorKeys();
    }
    
    update(t:number,dt:number)
    {
        this.updateVelocity(dt);
    }
    updateVelocity(dt:number)
    {
        
        this.setVelocity(this.getXAxisDirectionVector()*MAX_VELOCITY,this.getYAxisDirectionVector()*MAX_VELOCITY)
    }
    
    getYAxisDirectionVector():number
    {
        if(this.cursors.up.isDown && !this.cursors.down.isDown) return -1;
       
        if(this.cursors.down.isDown && !this.cursors.up.isDown) return 1;
        return 0;
    }
    getXAxisDirectionVector():number
    {
        if(this.cursors.right.isDown && !this.cursors.left.isDown) return 1;
       
        if(this.cursors.left.isDown && !this.cursors.right.isDown) return -1;
        return 0;
    }

    
   
}