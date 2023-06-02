import Phaser, { Geom,GameObjects } from 'phaser'
import paths from '../paths';
import constants from '../constants';
import Player from '../GameObjects/Player';
import EnemyManager from '../GameObjects/EnemyManager';
import Bullet from '../GameObjects/Bullet';

export default class ArenaScene extends Phaser.Scene
{
   
    //TODO: add separate layer to game objects
    loadInfos;
    private gameObjectsLayer:Phaser.GameObjects.Layer;
    background:GameObjects.Image;
    private enemyManger:EnemyManager
    player: Player
    constructor()
    {
        super("arena");
        this.loadInfos=[{name:"mine",count:6}]
      
       
    }
    create()
    {
        this.setUpBackground();

        this.setupBackgroundAudio();
        this.setupPhysics();
        this.setupGameLayer();  
        this.enemyManger = new EnemyManager(this,1);
        this.enemyManger.init();
       
      
    }
    setupPhysics()
    {
        this.matter.world.setGravity(0,0);
        this.matter.world.on(Phaser.Physics.Matter.Events.COLLISION_START,this.onCollisionStart)
    }
    onCollisionStart(event:any,bodyA:any,bodyB:any)
    {
       bodyA.gameObject.destroy();
       bodyB.gameObject.destroy();
    }
    setUpBackground()
    {
        const center = this.getScreenCenter();
        this.background =this.add.image(center.x,center.y,"background")
        const xScale= this.scale.width/this.background.width;
        const yScale= this.scale.height/this.background.height;
        this.background.setScale(xScale,yScale)
        this.background.setDepth(constants.GAME_LOGIC.DEPTHS.BACKGROUND)
    }
    setupGameLayer()
    {
        this.gameObjectsLayer = this.add.layer();
        this.gameObjectsLayer.setDepth(constants.GAME_LOGIC.DEPTHS.GAME_OBJECTS);
        this.setupPlayer();
        this.addToGameLayer(this.player)
       
    }
    setupBackgroundAudio()
    {
        this.sound.play(constants.AUDIO.BACKGROUND_AUDIO,{loop:true})
    }
    
    public addToGameLayer(obj:Phaser.GameObjects.GameObject)
    {
        this.gameObjectsLayer.add(obj);
    }
    setupPlayer()
    {
        this.addPlayerToScene();
    }
    addPlayerToScene()
    {
        const center = this.getScreenCenter();
        this.player = new Player(this,center.x,center.y*2-200,constants.GAME_OBJECTS.PLAYER.SHIPS.DEFAULT);
        this.children.add(this.player);
       
    }
    update(time: number, delta: number): void {
        this.player.update(time,delta);
      if(!this.enemyManger)
      {
        this.enemyManger = new EnemyManager(this,time);
        this.enemyManger.init();
      }else
      {
        this.enemyManger.update(time,delta);
      }
    }
    getScreenCenter():Geom.Point
    {
        return  new Geom.Point(this.scale.width/2,this.scale.height/2);
    }
}