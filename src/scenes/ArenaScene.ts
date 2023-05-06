import Phaser, { GameObjects,Geom } from 'phaser'
import paths from '../paths';
import constants from '../constants';
import Player from '../GameObjects/Player';

export default class ArenaScene extends Phaser.Scene
{
   
    background:GameObjects.Image;
    player: Player
    constructor()
    {
        super("arena");
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
        this.setupPlayer();
        
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