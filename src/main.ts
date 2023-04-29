import Phaser from 'phaser'

import ArenaScene from './scenes/ArenaScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [ArenaScene],
}

export default new Phaser.Game(config)
