import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 640

const config = {
    pixelArt: true,
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    scene: [PreloadScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})