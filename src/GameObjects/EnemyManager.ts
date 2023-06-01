import { Scene,GameObjects } from "phaser";
import { getAllLoadInfos } from "../AssetManager";
import { AnimationFrames, LoadInfo } from "../types";
import constants from "../constants";
import Enemy from "./Enemy";


const enemiesPerRow=[1,2,2,4,4,6];
const enemiesHeightPerRow=[100,150,300,350, 400,500];
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
       if(t>3*1000) this.initiateLineParameterized(6);
       if(t>4*1000) this.initiateLineParameterized(5);
       if(t>5*1000) this.initiateLineParameterized(4);
       if(t>6*1000) this.initiateLineParameterized(3);
       if(t>7*1000) this.initiateLineParameterized(2);
       if(t>8*1000) this.initiateLineParameterized(1);

    }
   
    initiateLineParameterized(rowNum:number)
    {   
        if(this.enemyGroupSetupList[rowNum])return;
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
            enemy=new Enemy(this.scene,xPoints[i],height,textureName);
            enemy.play(anim)
        
           
            enemy.setDepth(constants.GAME_LOGIC.DEPTHS.GAME_OBJECTS)
            this.enemyGroupLine5.add(enemy)
            this.scene.addToGameLayer(enemy)
        }
        this.enemyGroupSetupList[rowNum]=true;
    }
    getAnimationFromRow(rowNum:number):string
    {
        if(rowNum==6)return "MINE"
        //TODO: need to find better way
        if(rowNum==5) return "SPACESHIP_1"
        if(rowNum==4) return "SPACESHIP_2"
        if(rowNum==3) return "SPACESHIP_3"
        if(rowNum==2) return "SPACESHIP_4"
        return "SPACESHIP_5"
    }
    getTextureNameFromRow(rowNum:number):string
    {
        if(rowNum==6)return constants.GAME_OBJECTS.ENEMIES.MINE;
        //TODO: need to find better way
        if(rowNum==5) return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_1
        if(rowNum==4) return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_2
        if(rowNum==3) return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_3
        if(rowNum==2) return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_4
        return constants.GAME_OBJECTS.ENEMIES.SPACESHIP_5
       
     
    }

    getInitiateXAxisPoints(startX:number,width:number,texture:Phaser.Textures.Texture,numEnemies:number):Array<number>
    {
        const textureWidth=texture.get("_BASE").width
        const spaceBetween:number= width/(numEnemies);
        const arr=[];
        let prev=startX+textureWidth;
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
   
    constructor(scene:Scene,defaultLevel=1)
    {
        super(scene,"enemyManager")
        this.level=defaultLevel;
        this.stopProcessing=false;
        this.count=0;
        this.maxCount=5;
        
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
    createMine(x:number,y:number)
    {

    }
    createRandom()
    {

    }
    stop()
    {
        this.stopProcessing=false;
    }
    resume()
    {
        this.stopProcessing=true;
    }
    
    
}