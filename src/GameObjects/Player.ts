
const MAX_VELOCITY=8;

import {Scene} from 'phaser'
import constants from '../constants';
import BulletFactory from './BulletFactory';
export default class Player extends Phaser.Physics.Matter.Sprite
{
    world:Phaser.Physics.Matter.World;
    projectileGroup:Phaser.GameObjects.Group;
    cursors:Phaser.Types.Input.Keyboard.CursorKeys;
    bFactory:BulletFactory
    constructor(scene:Scene,x:number,y:number,texture:string)
    {
        super(scene.matter.world,x,y,texture);
        this.world=scene.matter.world;
        this.bFactory = new BulletFactory(this);
        this.init();
       
    }
    
    init()
    {
        this.addKeyBoardEvents();
        this.setupPhysics();
        this.setupProjectilesGroup();
       // this.setupFlares();
        this.name=constants.GAME_OBJECTS.NAMES.PLAYER;
       
    }
    setupFlares()
    {
        const config={
            frame: 'white',
            color: [ 0x040d61, 0xfacc22, 0xf89800, 0xf83600, 0x9f0404, 0x4b4a4f, 0x353438, 0x040404 ],
            lifespan: 200,
            angle: { min: -100, max: -80 },
            scale: 0.75,
            speed: { min: 200, max: 300 },
            advance: 2000,
            blendMode: 'ADD'
        }
        const smokey = this.scene.add.particles(650, 550, 'flares',config);
    }

    setupProjectilesGroup()
    {
        this.projectileGroup = new Phaser.GameObjects.Group(this.scene);
        this.projectileGroup.maxSize=constants.GAME_LOGIC.PROJECTILE.MAX_COUNT;

    }
    setupPhysics()
    {
        //make sure that it doesn't rotate when forces are applied on it
        this.setFixedRotation();
    }

    addKeyBoardEvents()
    {
        this.cursors=this.scene.input.keyboard.createCursorKeys();
    }
    
    update(t:number,dt:number)
    {
        this.updateVelocity(dt);
        this.horizontalWrap();
        this.verticalWrap();
       this.instantiateProjectile(t,dt)
       this.updateOrDestroyChildProjectiles(t,dt)
    }

    updateOrDestroyChildProjectiles(t:number,dt:number)
    {
        if(this.projectileGroup.children.getArray().length==0)return;
         
        this.projectileGroup.children.getArray().forEach((element) => {
            element.update(t,dt);
        });
    }

    instantiateProjectile(t:number,dt:number)
    {
        //our internal logic
        if(!this.cursors.space.isDown || this.projectileGroup.isFull())return;
        const bullet=this.bFactory.add(t)
        if(bullet==null)return;
        bullet.init()
        this.projectileGroup.add(bullet);
        
    }
    callBackOnCollision()
    {
        console.log("i collided");
    }

    horizontalWrap()
    {
        const halfWidth= this.displayWidth*0.5;
        const sceneWidth=this.scene.scale.width;
        if(this.x<-halfWidth)
        {
            this.x=sceneWidth+halfWidth;
        }else if(this.x >sceneWidth+ halfWidth)
        {
            this.x=-halfWidth;
        }
    }

    verticalWrap()
    {
        const halfHeight=this.displayHeight *0.5;
        const sceneHeight = this.scene.scale.height;
        
        if(this.y < -halfHeight)
        {
            this.y = sceneHeight - halfHeight;
        }else if(this.y > sceneHeight + halfHeight)
        {
            this.y=-halfHeight
        }
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