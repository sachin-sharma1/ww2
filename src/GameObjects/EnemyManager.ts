import { Scene,GameObjects } from "phaser";
import { getAllLoadInfos } from "../AssetManager";
import { AnimationFrames, LoadInfo } from "../types";
import constants from "../constants";
import Enemy from "./Enemy";

const enemiesPerRow=[1,2,2,4,6];
const enemiesHeightPerRow=[100,150,300,400,500];
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
    private enemyGroupSetupList:Array<boolean>;
    
   
    update(t:number,dt:number): void {
        if(this.stopProcessing)return;
        if(this.count===this.maxCount)return;
       if(t>3*1000) this.initiateLine5();

    }
    initiateLine5()
    {
       
        const rowNum=4;
        //maybe we have already initiated and in that case simply return
        if(this.enemyGroupSetupList[rowNum])return;
      
        const height=enemiesHeightPerRow[rowNum];
        const textureName=constants.GAME_OBJECTS.ENEMIES.MINE
        const texture=this.scene.textures.get(textureName)
    
        const numEnemies= enemiesPerRow[rowNum];
        const widthAvailable = this.scene.scale.width - (2* enemiesMargin);
        
        const xPoints=this.getInitiateXAxisPoints(enemiesMargin,widthAvailable,texture,numEnemies);
        let enemy:Enemy;
        for(let i=0;i<xPoints.length;i++)
        {
            enemy=new Enemy(this.scene,xPoints[i],height,textureName);
           
            console.log(enemy)
            enemy.setDepth(constants.GAME_LOGIC.DEPTHS.GAME_OBJECTS)
            this.enemyGroupLine5.add(enemy);
        }
        this.enemyGroupSetupList[rowNum]=true;
       
      

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
        this.enemyGroupSetupList=[false,false,false,false,false];
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