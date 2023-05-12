const constants={
    DISPLAY:{
        RESOLUTION:{
            FULL_HD:{
                WIDTH:1920,
                HEIGHT:1080,
            }
        }
    },
    GAME_LOGIC:{
        PROJECTILE:{
            SPEED:-12,
            MAX_COUNT:15,
            MIN_TIME_GAP:80
        },
        DEPTHS:{
            BACKGROUND:100,
            GAME_OBJECTS:200,
        }
    },
    GAME_OBJECTS:{
        BACKGROUNDS:{
            DEFAULT:"background"
        },
        PLAYER:{
            SHIPS:{
                DEFAULT:"player"
            }
        }
    }
};

export default constants;