export const loadSlimeSprites = (scene: Phaser.Scene) : void => {
    scene.load.spritesheet("slime_idle", "./assets/slime/slime.png", {
        frameWidth: 20,
        frameHeight: 17,
        spacing: 0
    });

    // scene.load.spritesheet("slime_walk", "./assets/slime/walk.png", {
    //     frameWidth: 32,
    //     frameHeight: 32,
    //     spacing: 32
    // });
}

export const createSlimeAnimations = (scene: Phaser.Scene) : void => {
    scene.anims.create({
        key: "slime_idle",
        frames: scene.anims.generateFrameNames("slime_idle", {
            start: 0,
            end: 6
        }),
        frameRate: 8,
        repeat: -1
    });

    // scene.anims.create({
    //     key: "slime_walk",
    //     frames: scene.anims.generateFrameNames("slime_walk", {
    //         start: 0,
    //         end: 3
    //     }),
    //     frameRate: 8,
    //     repeat: -1
    // });
}

export const createSlime = (scene: Phaser.Scene): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody  => {

    const slime = scene.physics.add.sprite(400, 400, "slime_idle").setScale(2);
    slime.anims.play("slime_idle", true);
    slime.setBounce(1);
    // slime.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    slime.setInteractive();
    slime.on("pointerdown", () => {
        slime.setTint(0xff0000);
    });
    slime.on("pointerup", () => {
        slime.clearTint();
    });
    return slime;
}