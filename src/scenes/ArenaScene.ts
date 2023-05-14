import Phaser, { Geom,GameObjects } from 'phaser'
import paths from '../paths';
import constants from '../constants';
import Player from '../GameObjects/Player';
import { AnimationFrames, LoadInfo } from '../types';

export default class ArenaScene extends Phaser.Scene
{
   
    //TODO: add separate layer to game objects
    loadInfos;
    gameObjectsLayer:Phaser.GameObjects.Layer;
    background:GameObjects.Image;
    player: Player
    constructor()
    {
        super("arena");
        this.loadInfos=[{name:"mine",count:6}]
       
    }
    preload()
    {
       this.load.image(constants.GAME_OBJECTS.BACKGROUNDS.DEFAULT,paths.backgrounds.gameScreen);
       this.load.image(constants.GAME_OBJECTS.PLAYER.SHIPS.DEFAULT,paths.player.ships.default);
    }
  
    create()
    {
        this.setUpBackground();
        this.setupPhysics();
        this.setupGameLayer();  
        this.throwAway();
    }
    throwAway()
    {
        const frames=this.generateFrames({name:"mine",count:6});
        this.anims.create({
            key:"mine",
            frames:frames,
            frameRate:8,
            repeat:-1,
        })
        
        this.add.sprite(400,300,"mine-1").play("mine").setDepth(constants.GAME_LOGIC.DEPTHS.GAME_OBJECTS)
    }
    generateFrames(loadInfo:LoadInfo):Array<AnimationFrames>
    {
        const {name,count}=loadInfo;
        let result:Array<AnimationFrames>=[];
        for(let i=1;i<=count;i++)
        {
            const key=`${name}-${i}`;
            result.push({key})
        }
        return result;
    }
    setupPhysics()
    {
        this.matter.world.setGravity(0,0);
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
        this.gameObjectsLayer.add(this.player);
    }
    setupPlayer()
    {
        this.addPlayerToScene();
    }
    addPlayerToScene()
    {
        const center = this.getScreenCenter();
        this.player = new Player(this,center.x,center.y,constants.GAME_OBJECTS.PLAYER.SHIPS.DEFAULT);
        this.children.add(this.player);
       
    }
    update(time: number, delta: number): void {
        this.player.update(time,delta);
    }
    getScreenCenter():Geom.Point
    {
        return  new Geom.Point(this.scale.width/2,this.scale.height/2);
    }
}