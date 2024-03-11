import PhaserLogo from "../objects/phaserLogo";
import FpsText from "../objects/fpsText";
import { createPlayer, loadPlayerSprites, Player, onCollide } from "../objects/player";
import { createControls, configControls } from "../objects/controls";
import { loadBulletSprite } from "../objects/bullet";
import { createSlimeAnimations, loadSlimeSprites, createSlime } from "../objects/slime";

export default class MainScene extends Phaser.Scene
{
    fpsText;
    player: Player;
    controls: Phaser.Types.Input.Keyboard.CursorKeys;
    water;
    slime;

    constructor()
    {
        super({ key: "MainScene" });
    }

    preload()
    {
        this.load.image("tiles", "./assets/map/grass.png");
        this.load.image("border", "./assets/map/water.png");
        this.load.tilemapTiledJSON("map", "./assets/map/map.json");
        loadPlayerSprites(this);
        loadBulletSprite(this);
        loadSlimeSprites(this);
    }

    create()
    {
        const map = this.make.tilemap({
            key: "map"
        });
        const tileSetGrass = map.addTilesetImage("grass", "tiles");
        const tileSetWater = map.addTilesetImage("water", "border");
        const ground = map.createLayer("grass", tileSetGrass, 0, 0);
        this.water = map.createLayer("water", tileSetWater, 0, 0);

        this.water.setCollisionByProperty({ collider: true });

        this.createNewPlayer();
        this.createNewSlime();

        this.controls = createControls(this);
        createSlimeAnimations(this);
    }

    update(time, delta)
    {
        //this.fpsText.update()
        configControls(this.player, this.controls, this);

        const playerX = this.player.x;
        const playerY = this.player.y;

        this.slime.body.velocity.x = playerX - this.slime.x;
        this.slime.body.velocity.y = playerY - this.slime.y;

        const colliding = this.checkCollide(this.player, this.slime);

        if (colliding)
        {
            this.player.destroy();
            this.slime.destroy();

            console.log("You lose!");
            alert("You lose!")

            this.createNewPlayer();
            this.createNewSlime();
        }

        //this.player.body.setSize(this.player.width, this.player.height, true);
    }

    checkCollide(obj1, obj2) {
        var distX = Math.abs(obj1.x - obj2.x) - 18;
        var distY = Math.abs(obj1.y - obj2.y) - 18;
        if (distX < obj1.width / 2) {
            if (distY < obj1.height / 2) {
                return true;
            }
        }
        return false;
    }

    createNewPlayer() {
        this.player = createPlayer(this);
        this.player.anims.play("player_idle", true);
        this.physics.add.collider(this.player, this.water);
    }

    createNewSlime() {
        this.slime = createSlime(this);
        this.physics.add.collider(this.slime, this.water);
    }
}