import { getAllLoadInfos } from "../AssetManager";
import constants from "../constants"
import paths from "../paths"
import { LoadInfo } from "../types";
import WebFontLoader from 'webfontloader'
export default class LoadingScene extends Phaser.Scene
{
    updateTextLabel:Phaser.GameObjects.Text;
    logoSprite;
    progressBar:Phaser.GameObjects.Graphics;
    loadingTextLabel:Phaser.GameObjects.Text;
    loadingText;
    isLoadingComplete:boolean;
    

    constructor()
    {
        super(constants.SCENES.LOADING_SCENE)
        this.isLoadingComplete=false;
    }
    preload()
    {
        this.load.bitmapFont('ice', 'assets/iceicebaby.png', 'assets/iceicebaby.xml');
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        this.load.atlas('space', 'assets/space.png', 'assets/space.json');
        this.load.image(constants.GAME_OBJECTS.LOGO,paths.miscellaneous.companyLogo)
        this.load.image(constants.GAME_OBJECTS.BACKGROUNDS.DEFAULT,paths.backgrounds.gameScreen);
        this.load.image(constants.GAME_OBJECTS.PLAYER.SHIPS.DEFAULT,paths.player.ships.default);
        this.load.audio(constants.AUDIO.BACKGROUND_AUDIO,[paths.audio.background])
        this.load.audio(constants.AUDIO.ENEMY_GROUP_ENTRY,[paths.audio.enemyGroupEntry])
        this.load.audio(constants.AUDIO.BULLET_FIRE,[paths.audio.bulletFire])
        this.load.image("laser",paths.projectiles.laser.green);
        this.progressBar=this.add.graphics();
        this.load.on('progress',(value:number)=>{
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(0,825, 800 * value, 60);
        })
        this.load.on('complete', () =>
        {

            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(0,825,1920, 60);
            this.isLoadingComplete=true;

        });
        this.load.on('filecomplete',(key:string)=>{
           this.loadingText=`loaded...${key}`
         });
        this.loadEnemies();
    }
    loadEnemies()
    {
        const doLoad = (li:LoadInfo)=>
        {
            for(let i=1;i<=li.count;i++)
            {
                const name=`${li.name}-${i}`
                const path = `assets/enemies/${name}.png`;
                
                this.load.image(name,path)
            }
        }
     getAllLoadInfos().forEach(li=>doLoad(li));
    }
    create()
    {
        this.logoSprite=this.add.sprite(this.getCenter(),100+250,constants.GAME_OBJECTS.LOGO);
        this.updateTextLabel=this.add.bitmapText(this.getCenter(),700,"ice","loading",32).setOrigin(.5)
        this.loadingTextLabel=this.add.bitmapText(this.getCenter(),725,"ice","please wait..",32).setOrigin(.5)  
    }
    update(t:number,dt:number)
    {
      this._updateTextLabel(t);
        this.loadingTextLabel.setText(this.loadingText)
       
    }
    _updateTextLabel(t:number)
    {
        if(constants.ENV.DEBUG)
        {

            this.scene.start(constants.SCENES.ARENA_SCENE)
            return;
        }
        if(t<1*1000) return;
        else if(t< 2.5 * 1000)
        {
         this.updateTextLabel.text="Do you really think we are loading!!"
        }
        else if(t < 3 * 1000)
        {
         this.updateTextLabel.text="And I thought my jokes are bad!"
        }
        else if(t < 3.5*1000)
        {
            this.updateTextLabel.text="I see dead people(here goes spoilers!)"
        }
        else if(t < 4  *1000)
        {
            this.updateTextLabel.text="I will show you what i can do! Go back"
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(0,825,500, 60);
            this.isLoadingComplete=true;
        }
        else if(t >6 * 1000 && this.isLoadingComplete)
        {
           
            this.scene.start(constants.SCENES.ARENA_SCENE)
        }

    }
    getCenter()
    {
        return this.scale.width/2;
    }
}