
const MAX_VELOCITY=15;
const MIN_MAX_VELOCITY_TIME=3;
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
        this.setupPhysics();
        this.addKeyBoardEvents();
       
    }
    addKeyBoardEvents()
    {
        this.cursors=this.scene.input.keyboard.createCursorKeys();
    }
    setupPhysics()
    {
       this.world.setGravity(0,0);
       
    }
    update(t:number,dt:number)
    {
       
    }
    
   
}