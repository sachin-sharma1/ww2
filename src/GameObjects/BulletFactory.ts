import constants from "../constants";
import Bullet from "./Bullet";

export default class BulletFactory
{
    parent:Phaser.Physics.Matter.Sprite;
    lastBulletCreationTime:number
    constructor(parent:Phaser.Physics.Matter.Sprite)
    {
        this.parent = parent;
        this.lastBulletCreationTime=-1;
    }
    add(t:number):Bullet|null
    {
       
        const bufferTime = constants.GAME_LOGIC.PROJECTILE.MIN_TIME_GAP;
        //guard clause
        if(t-this.lastBulletCreationTime<bufferTime)return null;
       
        this.lastBulletCreationTime = t;
        //create
        const scene = this.parent.scene;
        const point = this.getLocationPoint();
        return new Bullet(scene,point.x,point.y);
         
       
    }
    getLocationPoint():Phaser.Geom.Point
    {
        const x = this.parent.x;
        const y = this.parent.y -this.parent.displayHeight;
        return new Phaser.Geom.Point(x,y);
    }
    
}