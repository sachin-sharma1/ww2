const enemiesPath="assets/enemies/";
const enemies={
    mine:`${enemiesPath}mine-1.png`,
    spaceship_1:`${enemiesPath}spaceship1-1.png`,
    spaceship_2:`${enemiesPath}spaceship2-1.png`,
    spaceship_3:`${enemiesPath}spaceship3-1.png`,
    spaceship_4:`${enemiesPath}spaceship4-1.png`,
    spaceship_5:`${enemiesPath}spaceship5-1.png`,
  
}
const paths={
    backgrounds:{
        gameScreen:"assets/starBackground.png"
    },
    player:{
        ships:{
            default:"assets/playerShip.png"
        }
    },
    audio:{
        background:"assets/background.mp3"
    },
    enemies,
    miscellaneous:{
        companyLogo:"assets/companyLogo.png"
    },
    projectiles:{
       laser:{
        green:"assets/laserGreen.png"
       }
    }
};

export default paths;