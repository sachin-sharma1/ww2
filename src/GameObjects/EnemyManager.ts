import { Scene,GameObjects } from "phaser";
export default class OverloadManager extends GameObjects.GameObject
{
    private stopProcessing:boolean;
    private  level:number
    private count:number;
    private maxCount:number;
    private mineGroup:Phaser.GameObjects.Group;
    update(t:number,dt:number): void {
        if(this.stopProcessing)return;
        if(this.count===this.maxCount)return;

    }
    constructor(scene:Scene,defaultLevel:number=1)
    {
        super(scene,"enemyManager")
        this.level=defaultLevel;
        this.stopProcessing=false;
        this.count=0;
        this.maxCount=5;
        
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