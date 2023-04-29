import Phaser, { GameObjects } from 'phaser'
import paths from '../paths';

export default class ArenaScene extends Phaser.Scene
{
   
    background:GameObjects.Image;
    player: Phaser.Physics.Arcade.Sprite;
    constructor()
    {
        super("arena");
    }
    preload()
    {
       this.load.image("background",paths.backgrounds.gameScreen);
       this.load.image("player",paths.player.ships.default);
    }
    create()
    {
        
        this.setUpBackground();
        this.setupPlayer();
        
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
        this.player = this.physics.add.sprite(400,300,"player")
    }
}