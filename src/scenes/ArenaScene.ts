import Phaser, { GameObjects } from 'phaser'
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
        this.background =this.add.image(400,300,"background")
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
        this.player = new Player(this,400,300,constants.GAME_OBJECTS.PLAYER.SHIPS.DEFAULT);
        this.children.add(this.player);
       
    }
    update(time: number, delta: number): void {
        this.player.update(time,delta);
    }
}