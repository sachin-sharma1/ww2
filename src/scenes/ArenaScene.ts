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
    private uiLayer:Phaser.GameObjects.Layer;
    background:GameObjects.Image;
    private enemyManger:EnemyManager
    player: Player
    score:number;
    scoreBoard:Phaser.GameObjects.Text;
    constructor()
    {
        super("arena");
        this.loadInfos=[{name:"mine",count:6}]
      
       
    }
    create()
    {
        this.score=0;
        this.setUpBackground();

        this.setupBackgroundAudio();
        this.setupPhysics();
        this.setupGameLayer();  
        this.setupUILayer();  
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
       bodyA.gameObject.callBackOnCollision();
       bodyB.gameObject.callBackOnCollision();
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
    onEnemyDestroy()
    {
        this.score++;
      
    }
    updateScoreBoard()
    {
        this.scoreBoard.setText(`Score is : ${this.score}`)
    }
    setupGameLayer()
    {
        this.gameObjectsLayer = this.add.layer();
        this.gameObjectsLayer.setName(constants.GAME_OBJECTS.LAYERS.GAME_OBJECTS);
        this.gameObjectsLayer.setDepth(constants.GAME_LOGIC.DEPTHS.GAME_OBJECTS);
        this.setupPlayer();
        this.addToGameLayer(this.player)
       
    }
    setupUILayer()
    {
        this.uiLayer = this.add.layer();
        this.uiLayer.setName(constants.GAME_OBJECTS.LAYERS.UI);
        this.uiLayer.setDepth(constants.GAME_LOGIC.DEPTHS.UI);
        this.scoreBoard = this.add.bitmapText(0, 0, 'ice','Score : 0',32);
        this.updateScoreBoard();
        this.uiLayer.add(this.scoreBoard)
     
    }
    setupBackgroundAudio()
    {
        this.sound.play(constants.AUDIO.BACKGROUND_AUDIO,{loop:true,volume:.5})
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
    onPlayerEnd()
    {
        const message = [
            'Welcome to the',
            'Phaser 3 Wipe FX',
            'Using Text PreFX',
            'and a Tween'
        ];

        const text = this.add.text(this.scale.width/2, this.scale.height/2, "Game Over", { fontFamily: 'Arial Black', fontSize: 80 });
        this.addToGameLayer(text);

        const gradient = text.context.createLinearGradient(0, 0, 0, text.height);

        gradient.addColorStop(0, '#f26522');
        gradient.addColorStop(0.5, '#fff200');
        gradient.addColorStop(0.5, '#f7941d');
        gradient.addColorStop(1, '#ed1c24');

        text.setFill(gradient);
        text.setOrigin(0.5, 0.5);
        

        const fx = text.preFX?.addReveal();

        this.tweens.add({
            targets: fx,
            progress: 1,
            hold: 500,
            duration: 3000,
            repeat: -1,

        });
        this.scene.stop();
    }
}