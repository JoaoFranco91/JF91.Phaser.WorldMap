import { Player } from "./player";

export const loadBulletSprite = (scene: Phaser.Scene) : void => {
    scene.load.image("bullet", "./assets/bullet.png");
}

export const createBullet = (player: Player, scene: Phaser.Scene) => {
    const x = player.flipX ? player.x - 40 : player.x + 40
    const y = player.y - 18;

    const bullet = scene.physics.add.image(x, y, "bullet").setScale(0.1);

    bullet.setVelocityX(player.flipX ? -700 : 700);

    return bullet;
}