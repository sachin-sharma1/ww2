import Phaser from 'phaser'
import constants from './constants'

import ArenaScene from './scenes/ArenaScene'
import LoadingScene from './scenes/LoadingScene'
const {WIDTH:width,HEIGHT:height}=constants.DISPLAY.RESOLUTION.FULL_HD;
const isDebug=constants.ENV.DEBUG;
const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width,
	height,
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 0},
			debug:isDebug
		},
	},
	scene: [LoadingScene,ArenaScene],
}

export default new Phaser.Game(config)
