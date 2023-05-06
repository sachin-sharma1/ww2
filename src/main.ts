import Phaser from 'phaser'
import constants from './constants'

import ArenaScene from './scenes/ArenaScene'
const {WIDTH:width,HEIGHT:height}=constants.DISPLAY.RESOLUTION.FULL_HD;

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width,
	height,
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 0},
			debug:true
		},
	},
	scene: [ArenaScene],
}

export default new Phaser.Game(config)
