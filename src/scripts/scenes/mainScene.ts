import Grid = Phaser.GameObjects.Grid;

export default class MainScene extends Phaser.Scene
{
    map;
    text;
    marker;
    objectToPlace = 'platform';
    toolTipText;
    toolTip;

    constructor()
    {
        super({ key: "MainScene" });
    }

    preload()
    {
        this.load.image("tiles", "./assets/map/grass.png");
        this.load.image("border", "./assets/map/water.png");
        this.load.tilemapTiledJSON("map", "./assets/map/map.json");
    }

    create()
    {
        this.map = this.make.tilemap({
            key: "map"
        });
        const tileSetGrass = this.map.addTilesetImage("grass", "tiles");
        const tileSetWater = this.map.addTilesetImage("water", "border");
        const ground = this.map.createLayer("grass", tileSetGrass, -250, -250).setInteractive();
        const water = this.map.createLayer("water", tileSetWater, -250, -250).setInteractive();

        // const grid = new Grid(this, -250, -250, this.map.width, this.map.height, 50, 50, 0x000000, 0.2);
        // grid.setOutlineStyle(0xff0000, 1);

        const grid = this.add.grid(0, 0, this.map.width, this.map.height, 2, 2);
        grid.setAltFillStyle(0x000000, 0.2);
        grid.setStrokeStyle(5, 0xff0000, 1);

        this.text = this.add.text(0, 0, "Click and drag to move", {
            font: "16px Courier",
            backgroundColor: "#000c",
            fixedWidth: 200
        })
            .setScrollFactor(0);

        this.toolTip =  this.add.rectangle( 0, 0, 250, 50, 0xff0000).setOrigin(-250).setScale(-100);
        this.toolTipText = this.add.text( 0, 0, 'This is a white rectangle', { fontFamily: 'Arial', color: '#000' }).setOrigin(0);

        this.marker = this.add.graphics();
        this.marker.lineStyle(0.015, 0x000000, 0.8);
        this.marker.strokeRect(0, 0, this.map.tileWidth * ground.scaleX, this.map.tileHeight * ground.scaleY);

        var cam = this.cameras.main;
        cam.setZoom(100);
        cam.centerOn(-125, -125)
        this.toolTip.setPosition(ground.x / cam.zoom, ground.y / cam.zoom)
        this.input.on("pointermove", function (p) {
            if (!p.isDown) return;

            const { x, y } = p.velocity;
            console.log(p.velocity);

            cam.scrollX -= x / cam.zoom;
            cam.scrollY -= y / cam.zoom;
        });



        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            // Get the current world point under pointer.
            const worldPoint = cam.getWorldPoint(pointer.x, pointer.y);
            const newZoom = cam.zoom - cam.zoom * 0.001 * deltaY;
            cam.zoom = Phaser.Math.Clamp(newZoom, 0, 150);

            // Update camera matrix, so `getWorldPoint` returns zoom-adjusted coordinates.
            //cam.preRender();
            const newWorldPoint = cam.getWorldPoint(pointer.x, pointer.y);
            // Scroll the camera to keep the pointer under the same world point.
            // cam.scrollX -= newWorldPoint.x - worldPoint.x;
            // cam.scrollY -= newWorldPoint.y - worldPoint.y;
        });
    }

    update(time, delta)
    {
        this.text.setText(
            JSON.stringify(
                this.input.activePointer,
                ["isDown", "downX", "downY", "worldX", "worldY", "x", "y", "velocity"],
                2
            )
        );

        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        // Rounds down to nearest tile
        const pointerTileX = this.map.worldToTileX((worldPoint as Phaser.Math.Vector2).x);
        const pointerTileY = this.map.worldToTileY((worldPoint as Phaser.Math.Vector2).y);

        // Snap to tile coordinates, but in world space
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);

        this.toolTip.alpha = 0;
        this.toolTip.alpha = 0;
        this.toolTipText.alpha = 0;
        this.toolTip.x = (worldPoint as Phaser.Math.Vector2).x;
        this.toolTip.y = (worldPoint as Phaser.Math.Vector2).y;
        this.toolTipText.x = (worldPoint as Phaser.Math.Vector2).x + 5;
        this.toolTipText.y = (worldPoint as Phaser.Math.Vector2).y + 5;

        // if (this.input.manager.activePointer.isDown)
        // {
        //     switch (this.objectToPlace)
        //     {
        //         case 'flower':
        //             // You can place an individal tile by index (or by passing in a Tile object)
        //             this.map.putTileAt(15, pointerTileX, pointerTileY);
        //             break;
        //         case 'platform':
        //             // You can place a row of tile indexes at a location
        //             this.map.putTilesAt([ 104, 105, 106, 107 ], pointerTileX, pointerTileY);
        //             break;
        //         case 'tiki':
        //             // You can also place a 2D array of tiles at a location
        //             this.map.putTilesAt([
        //                 [ 49, 50 ],
        //                 [ 51, 52 ]
        //             ], pointerTileX, pointerTileY);
        //             break;
        //         default:
        //             break;
        //     }
        // }
    }
}