
const MAX_VELOCITY=15;
const FORCE_X=5;
const FORCE_Y=7;
import {Scene} from 'phaser'
export default class Player extends Phaser.Physics.Matter.Sprite
{
    world:Phaser.Physics.Matter.World;
    scene:Scene;
    cursors:Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(world:Phaser.Physics.Matter.World,scene:Scene,x:number,y:number,texture:string)
    {
        super(world,x,y,texture);
        this.world=world;
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
        this.scene.physics.world.enable(this);
       
    }
    update(t:number,dt:number)
    {
        this.handleMovement();
    }
    handleMovement()
    {

        const velocityY=this.getForceYToApply();
        const velocityX=this.getForceXToApply();
        this
    }
    getForceYToApply()
    {
        if(this.cursors.down.isDown && !this.cursors.up.isUp)
        {
            return FORCE_Y*-1;
        }
        if(!this.cursors.down.isDown && this.cursors.up.isUp)
        {
            return FORCE_Y; 
        }
        return 0;

    }
    getForceXToApply()
    {
        if(this.cursors.left.isDown && !this.cursors.right.isUp)
        {
            return FORCE_X*-1;
        }
        if(!this.cursors.left.isDown && this.cursors.right.isUp)
        {
            return FORCE_X; 
        }
        return 0;

    }
}