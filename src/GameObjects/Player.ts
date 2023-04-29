
const MAX_VELOCITY=15;
const VELOCITY_X=5;
const VELOCITY_Y=7;

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    scene:Phaser.Scene;
    cursors:Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(scene:Phaser.Scene,x:number,y:number,texture:string)
    {
        super(scene,x,y,texture);
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
        this.setMaxVelocity(MAX_VELOCITY);
       
    }
    update(t:number,dt:number)
    {
        this.handleMovement();
    }
    handleMovement()
    {

        const velocityY=this.getVelocityY();
        const velocityX=this.getVelocityX();
        this
    }
    getVelocityY()
    {
        if(this.cursors.down.isDown && !this.cursors.up.isUp)
        {
            return VELOCITY_Y*-1;
        }
        if(!this.cursors.down.isDown && this.cursors.up.isUp)
        {
            return VELOCITY_Y; 
        }
        return 0;

    }
    getVelocityX()
    {
        if(this.cursors.left.isDown && !this.cursors.right.isUp)
        {
            return VELOCITY_X*-1;
        }
        if(!this.cursors.left.isDown && this.cursors.right.isUp)
        {
            return VELOCITY_X; 
        }
        return 0;

    }
}