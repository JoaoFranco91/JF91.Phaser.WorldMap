import { Player } from "./player";
import { createBullet } from "./bullet";

let bullet;

export const createControls = (scene: Phaser.Scene): Phaser.Types.Input.Keyboard.CursorKeys => {
    const controls = scene.input.keyboard.createCursorKeys();
    return controls;
}

export const configControls = (
    player: Player,
    controls: Phaser.Types.Input.Keyboard.CursorKeys,
    scene: Phaser.Scene): void =>
{
    player.setVelocityX(0);
    player.setVelocityY(0);

    if (player.isAttacking)
    {
        return;
    }
    if (controls.up.isDown && controls.right.isDown)
    {
        defaultVelocity = 150;
        moveRight(player);
        moveUp(player);
        return;
    }
    if (controls.up.isDown && controls.down.isDown)
    {
        defaultVelocity = 150;
        moveRight(player);
        moveDown(player);
        return;
    }
    if (controls.down.isDown && controls.left.isDown)
    {
        defaultVelocity = 150;
        moveLeft(player);
        moveDown(player);
        return;
    }
    if (controls.down.isDown && controls.right.isDown)
    {
        defaultVelocity = 150;
        moveRight(player);
        moveDown(player);
        return;
    }
    if (controls.up.isDown && controls.left.isDown)
    {
        defaultVelocity = 150;
        moveLeft(player);
        moveUp(player);
        return;
    }
    if (controls.right.isDown)
    {
        defaultVelocity = 200;
        moveRight(player);
        return;
    }
    if (controls.left.isDown)
    {
        defaultVelocity = 200;
        moveLeft(player);
        return;
    }
    if (controls.up.isDown)
    {
        defaultVelocity = 200;
        moveUp(player);
        return;
    }
    if (controls.down.isDown)
    {
        defaultVelocity = 200;
        moveDown(player);
        return;
    }
    if (controls.space.isDown)
    {
        if (!player.isAttacking)
        {
            attack(player, scene);
        }
        return;
    }
    else
    {
        player.anims.play("player_idle", true);
    }
}

let defaultVelocity = 200;

const moveRight = (player: Player): void => {
    player.flipX = false;
    player.anims.play("player_walk", true);
    player.setVelocityX(defaultVelocity);
}

const moveLeft = (player: Player): void => {
    player.flipX = true;
    player.anims.play("player_walk", true);
    player.setVelocityX(-defaultVelocity);
}

const moveUp = (player: Player): void => {
    player.anims.play("player_walk", true);
    player.setVelocityY(-defaultVelocity);
}

const moveDown = (player: Player): void => {
    player.anims.play("player_walk", true);
    player.setVelocityY(defaultVelocity);
}

const attack = (player: Player, scene: Phaser.Scene): void => {
    player.isAttacking = true;
    player.anims.play("player_attack", true);
    bullet = createBullet(player, scene);
}