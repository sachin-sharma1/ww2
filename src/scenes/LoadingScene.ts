import { getAllLoadInfos } from "../AssetManager";
import constants from "../constants"
import paths from "../paths"
import { LoadInfo } from "../types";
import ArenaScene from "./ArenaScene";
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
        this.load.image(constants.GAME_OBJECTS.LOGO,paths.miscellaneous.companyLogo)
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
        // this.lblText = this.add.bitmapText(400, 300, 'atari', '', 38)
        //     .setInteractive()
        //     .setOrigin(0.5)
        //     .setCenterAlign();
        // this.lblText=this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        // this.lblText.setText([
        //     'Phaser 3',
        //     'BitmapText',
        //     'Click to change Font'
        // ]);
       
        this.logoSprite=this.add.sprite(this.getCenter(),100+250,constants.GAME_OBJECTS.LOGO);
        this.updateTextLabel=this.add.text(this.getCenter(),700,"loading", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setOrigin(.5)
        this.loadingTextLabel=this.add.text(this.getCenter(),725,"please wait..", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setOrigin(.5)

    }
    update(t:number,dt:number)
    {
      this._updateTextLabel(t);
       
    }
    _updateTextLabel(t:number)
    {
        if(t<1*1000) return;
        else if(t< 2.5 * 1000)
        {
         this.updateTextLabel.text="Do you really think we are loading!!"
        }
        else if(t < 3.5 * 1000)
        {
         this.updateTextLabel.text="And I thought my jokes are bad!"
        }
        else if(t < 4*1000)
        {
            this.updateTextLabel.text="I see dead people(here goes spoilers!)"
        }
        else if(t < 5  *1000)
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