
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
    emitter:Phaser.GameObjects.Particles.ParticleEmitter;
    score:number;
    constructor(scene:Scene,x:number,y:number,texture:string)
    {
        super(scene.matter.world,x,y,texture);
        this.world=scene.matter.world;
        this.bFactory = new BulletFactory(this);
        this.init();
       
    }
    
    init()
    {
        this.setupSprite();
        this.addKeyBoardEvents();
        this.setupPhysics();
        this.setupProjectilesGroup();
   this.setupTail();
        this.name=constants.GAME_OBJECTS.NAMES.PLAYER;
        this.score=1;
       
    }
    setupSprite()
    {
        this.setScale(1.5)
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
        this.setCollisionCategory(constants.GAME_LOGIC.PHYSICS.COLLISION.CATEGORY_PLAYER);
        this.setCollidesWith(constants.GAME_LOGIC.PHYSICS.COLLISION.CATEGORY_ENEMY)
    }

    addKeyBoardEvents()
    {
        this.cursors=this.scene.input.keyboard.createCursorKeys();
    }
    setupTail()
    {
       this.emitter = this.scene.add.particles(0, 0, 'space', {
            frame: 'blue',
            speed: {
                onEmit: () => MAX_VELOCITY/4
            },
            lifespan: {
                onEmit: () => Phaser.Math.Percent(5, 0, 300) * 20000
            },
            alpha: {
                onEmit: () => Phaser.Math.Percent(5, 0, 300) * 1000

            },
            scale: { start: 1.0, end: 0 },
            blendMode: 'ADD'
        });
        this.scene.addToGameLayer(this.emitter)
        this.emitter.startFollow(this);
    }
    
    update(t:number,dt:number)
    {
        if(!this.active)return;
       
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
    onEnemyDie()
    {
        this.score++;
    }

    updateVelocity(dt:number)
    {
        if(!this.active)
        {
           
         return;
        }
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
    callBackOnCollision()
    {
        this.setStatic(true);
        this.setActive(false);
        const updateTint = (tween:Phaser.Tweens.Tween)=>{
            const value = Math.floor(tween.getValue());
            this.setTint(Phaser.Display.Color.GetColor(value, value, value));
        }
      
        this.scene.tweens.addCounter({
            from: 255,
            to: 0,
            duration: 500,
            onUpdate:updateTint,
            onComplete:()=>{
                this.emitter.destroy();
                this.setActive(false);
                this.scene.onPlayerEnd();
                this.setVisible(false);
            }
            
        });
       
    }
}