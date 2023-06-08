import { Scene,GameObjects } from "phaser";
import { getAllLoadInfos } from "../AssetManager";
import { AnimationFrames, LoadInfo } from "../types";
import constants from "../constants";
import Enemy from "./Enemy";


const enemiesPerRow=[1,2,2,4,4,6];
const enemiesHeightPerRow=[50,150,300,400,500,600];
/**
 * handles the margin between space width and 
 */
const enemiesMargin=400;

export default class EnemyManager extends GameObjects.GameObject
{
    //TODO: add one enemy on screen after 1 second
    /**
     * @description boolean which can be act when to stop processing and acts as main control switch
     */
    private stopProcessing:boolean;
    /**
     * @description current level of the game acts as parent source of truth
     */
    private level:number
    private st:number;
    /**
     * 
     */
    private count:number;
    private maxCount:number;
    private enemyGroupLine1:Phaser.GameObjects.Group;
    private enemyGroupLine2:Phaser.GameObjects.Group;
    private enemyGroupLine3:Phaser.GameObjects.Group;
    private enemyGroupLine4:Phaser.GameObjects.Group;
    private enemyGroupLine5:Phaser.GameObjects.Group;
    private enemyGroupLine6:Phaser.GameObjects.Group;
    private enemyGroupSetupList:Array<boolean>;
    
   
    update(t:number,dt:number): void {
        if(this.stopProcessing)return;
        if(this.count===this.maxCount)return;
        if(t-this.st>3*1000) this.initiateLineParameterized(5);
        if(t-this.st>4.5*1000) this.initiateLineParameterized(4);
        if(t-this.st>6*1000) this.initiateLineParameterized(3);

        if(t-this.st>7.5*1000) this.initiateLineParameterized(2);
        if(t-this.st>9*1000) this.initiateLineParameterized(1);
        if(t-this.st>10.5*1000) this.initiateLineParameterized(0);

    }
   
    initiateLineParameterized(rowNum:number)
    {   
        if(this.enemyGroupSetupList[rowNum])return;
       if(rowNum==0) this.scene.sound.play(constants.AUDIO.ENEMY_GROUP_ENTRY,{loop:false,volume:.5})
        const anim =this.getAnimationFromRow(rowNum);
        const textureName = this.getTextureNameFromRow(rowNum);
        const height=enemiesHeightPerRow[rowNum];
       
        const texture=this.scene.textures.get(textureName)
    
        const numEnemies= enemiesPerRow[rowNum];
        const widthAvailable = this.scene.scale.width - (2* enemiesMargin);
        
        const xPoints=this.getInitiateXAxisPoints(enemiesMargin,widthAvailable,texture,numEnemies);
        let enemy:Enemy;
        for(let i=0;i<xPoints.length;i++)
        {
            enemy=new Enemy(this.scene,xPoints[i],height,textureName,6-rowNum);
            enemy.play(anim)
        
           
            enemy.setDepth(constants.GAME_LOGIC.DEPTHS.GAME_OBJECTS)
            this.getEnemyGroupFromRow(rowNum).add(enemy)
            this.scene.addToGameLayer(enemy)
        }
        this.enemyGroupSetupList[rowNum]=true;
    }
    getEnemyGroupFromRow(rowNum:number):Phaser.GameObjects.Group
    {
       if(rowNum==5) return this.enemyGroupLine6;
       if(rowNum==4) return this.enemyGroupLine5;
       if(rowNum==3) return this.enemyGroupLine4;
       if(rowNum==2) return this.enemyGroupLine3;
       if(rowNum==1) return this.enemyGroupLine2;
       return this.enemyGroupLine1;
    }
    getAnimationFromRow(rowNum:number):string
    {
        if(rowNum==5)return "MINE"
        //TODO: need to find better way
        if(rowNum==4) return "SPACESHIP5"
        if(rowNum==3) return "SPACESHIP4"
        if(rowNum==2) return "SPACESHIP3"
        if(rowNum==1) return "SPACESHIP2"
        return "SPACESHIP1"
    }
    getTextureNameFromRow(rowNum:number):string
    {
        if(rowNum==5)return constants.GAME_OBJECTS.ENEMIES.MINE;
        //TODO: need to find better way
        if(rowNum==4) return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_5
        if(rowNum==3) return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_4
        if(rowNum==2) return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_3
        if(rowNum==1) return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_2
        return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_1
       
     
    }

    getInitiateXAxisPoints(startX:number,width:number,texture:Phaser.Textures.Texture,numEnemies:number):Array<number>
    {
      if(numEnemies==1)return [this.scene.scale.width/2];
      if(numEnemies==2)return [this.scene.scale.width/4,this.scene.scale.width*.75];
        const spaceBetween:number= width/(numEnemies);
        const arr=[];
        let prev=startX+150;
        arr.push(startX);
        let curr;
        
        for(let i=1;i<numEnemies;i++)
        {
            curr=prev+spaceBetween
            arr.push(curr);
            prev=curr;
        }
        return arr;
    }
   
    constructor(scene:Scene,t=0)
    {
        super(scene,"enemyManager")
        this.level=1;
        this.stopProcessing=false;
        this.count=0;
        this.maxCount=5;
        this.st=t;
        
    }
    public init():void
    {
        this.cacheAnimations();
        this.enemyGroupLine1 = new Phaser.GameObjects.Group(this.scene);
        this.enemyGroupLine2 = new Phaser.GameObjects.Group(this.scene);
        this.enemyGroupLine3 = new Phaser.GameObjects.Group(this.scene);
        this.enemyGroupLine4 = new Phaser.GameObjects.Group(this.scene);
        this.enemyGroupLine5 = new Phaser.GameObjects.Group(this.scene);
        this.enemyGroupLine6 = new Phaser.GameObjects.Group(this.scene);
        this.enemyGroupSetupList=[false,false,false,false,false,false];
    }
    cacheAnimations():void
    {
    
        getAllLoadInfos().forEach((li:LoadInfo)=>{
            const frames=this.generateFrames(li);
            this.scene.anims.create({
                key:li.name.toUpperCase(),
                frames,
                frameRate:constants.ANIMATIONS.FRAME_RATE,
                repeat:-1
            })
        })
    }

    generateFrames(loadInfo:LoadInfo):Array<AnimationFrames>
    {
        const {name,count}=loadInfo;
        const result:Array<AnimationFrames>=[];
        for(let i=1;i<=count;i++)
        {
            const key=`${name}-${i}`;
            result.push({key})
        }
        return result;
    }

    stop()
    {
        this.stopProcessing=false;
        this.hideAll();
    }
    hideAll()
    {
        const scene=this.scene;
        const tweenEnemy =function(element:any)
        {
            scene.tweens.addCounter({
                from:255,
                to:0,
                duration:2500,
                onUpdate:function(tween)
                {
                    const value = Math.floor(tween.getValue());

                element.setTint(Phaser.Display.Color.GetColor(value, value, value));
                },
                onComplete:function()
                {
                    element.setVisible(false);
                }
            })
        }
        function hideChildren (group:Phaser.GameObjects.Group)
        {
            group.getChildren().forEach(tweenEnemy);
        }

        [this.enemyGroupLine1,this.enemyGroupLine2,this.enemyGroupLine3,this.enemyGroupLine4,this.enemyGroupLine5,this.enemyGroupLine6].forEach(hideChildren)
    }
    resume()
    {
        this.stopProcessing=true;
    }
    
    
}