import Phaser from "phaser";

class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    preload() {
        this.load.audio('bgMusic', 'assets/sounds/Tom_Nook_Theme_-_Animal_Crossing_-_New_Horizons_Soundtrack.mp3');
        this.load.audio('buttonClick', 'assets/sounds/buttonclick.wav');
        this.load.audio('boxOpenSound', 'assets/sounds/boxopening.wav');
        this.load.audio('characterRevealSound', 'assets/sounds/characterreveal1.wav');
        this.load.audio('mpBuffSound', 'assets/sounds/Buff.wav');
        this.load.image('background', 'assets/ui/ACNHbg2.png');
        this.load.image('acLogo', 'assets/ui/ACNewHorizons_2020.png');
        this.load.image('startButton', 'assets/ui/startbutton1.png');
        this.load.image('reset', 'assets/ui/reset.png');
        this.load.spritesheet('loading', 'assets/ui/loading-Sheet-sheet.png', {
            frameWidth: 256,
            frameHeight: 256,
            margin: 0,
            spacing: 0,
            endFrame: 11
        });
    }

    create() {

        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
        this.bgMusic.play();

        
        const bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        const logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height * 0.3, 'acLogo');
        logo.setScale(0.2);

        const button = this.add.image(this.cameras.main.width / 2.08, this.cameras.main.height * 0.75, 'startButton').setInteractive();
        button.setScale(2);

        button.on('pointerdown', () => {
            this.sound.play('buttonClick');  // Play button click sound
            button.setVisible(false);
            this.cameras.main.flash(800, 255, 255, 255, true);
        
            const loadingAnim = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height * 0.6, 'loading');
            loadingAnim.setScale(2);
            
            this.anims.create({
                key: 'loadingAnim',
                frames: this.anims.generateFrameNumbers('loading', { start: 0, end: 11 }),
                frameRate: 10,
                repeat: -1
            });
            loadingAnim.play('loadingAnim');
            
            this.time.delayedCall(4000, () => {
                this.scene.start('BlindBoxScene', { revealedCharacters: [] });
            });
        });
    }
}

class BlindBoxScene extends Phaser.Scene {
    displayRevealedCharacters() {
        this.revealedCharacters.forEach((char, index) => {
            const spacingX = 120;
            const yPos = this.cameras.main.height * 0.2;
            const xPos = this.cameras.main.width * 0.1 + index * spacingX;
            const previousCharacter = this.add.sprite(xPos, yPos, char);
            previousCharacter.setScale(2);
        });
    }
    constructor() {
        super({ key: 'BlindBoxScene' });
        this.revealedCharacters = []; // Initialize revealed characters
    }

    init(data) {
        this.revealedCharacters = data.revealedCharacters || [];
    }

    preload() {
        this.load.audio('bgMusic', 'assets/sounds/Tom_Nook_Theme_-_Animal_Crossing_-_New_Horizons_Soundtrack.mp3');
        this.load.audio('buttonClick', 'assets/sounds/buttonclick.wav');
        this.load.audio('boxOpenSound', 'assets/sounds/boxopening.wav');
        this.load.audio('characterRevealSound', 'assets/sounds/characterreveal1.wav');
        this.load.audio('mpBuffSound', 'assets/sounds/Buff.wav');
        this.load.image('background', 'assets/ui/ACNHbg2.png');
        this.load.image('reset', 'assets/ui/reset.png');
        this.load.spritesheet('boxOpening', 'assets/box/box-open.png', {
            frameWidth: 256, 
            frameHeight: 256, 
            endFrame: 19 
        });

        this.load.spritesheet('MP-scarf', 'assets/characters/MP-scarf.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
        this.load.spritesheet('MP-pjs', 'assets/characters/MP-pjs.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
        this.load.spritesheet('MP-greenjacket', 'assets/characters/MP-greenjacket.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
        this.load.spritesheet('MP-fart', 'assets/characters/MP-fart.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
        this.load.spritesheet('MP-buff', 'assets/characters/MP-buff.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
        this.load.spritesheet('DH-scarf', 'assets/characters/DH-scarf.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
        this.load.spritesheet('DH-pjs', 'assets/characters/DH-pjs.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
        this.load.spritesheet('DH-beanie', 'assets/characters/DH-beanie.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
        this.load.spritesheet('DH-beach', 'assets/characters/DH-beach.png', { frameWidth: 128, frameHeight: 128, endFrame: 3 });
    }

    create() {
        const bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const resetButton = this.add.image(this.cameras.main.width * 0.9, this.cameras.main.height * 0.1, 'reset').setInteractive();
        resetButton.setScale(1.5);
        resetButton.on('pointerdown', () => {
            this.sound.play('buttonClick');  // Play button click sound
            this.scene.start('BlindBoxScene', { revealedCharacters: [] });
        });
        

        const characterPool = [
            'MP-scarf', 'MP-pjs', 'MP-greenjacket', 'MP-fart',
            'DH-scarf', 'DH-pjs', 'DH-beanie', 'DH-beach',
            'MP-scarf', 'MP-pjs', 'MP-greenjacket', 'MP-fart',
            'DH-scarf', 'DH-pjs', 'DH-beanie', 'DH-beach',
            'MP-buff' 
        ];

        let character = this.add.sprite(this.cameras.main.width * 0.75, this.cameras.main.height * 0.45, null);
        character.setScale(3);
        character.setVisible(false);

        const box = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height * 0.75, 'boxOpening').setInteractive();
        
        box.setScale(2); 

        this.anims.create({
            key: 'openBox',
            frames: this.anims.generateFrameNumbers('boxOpening', { start: 0, end: 19 }),
            frameRate: 10,
            repeat: 0
        });

        box.on('pointerdown', () => {
            this.sound.play('boxOpenSound');  // Play box opening sound
            box.play('openBox');        
            box.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                const randomCharacter = Phaser.Utils.Array.GetRandom(characterPool);
            
                if (!this.anims.exists('idleAnim_' + randomCharacter)) {
                    this.anims.create({
                        key: 'idleAnim_' + randomCharacter,
                        frames: this.anims.generateFrameNumbers(randomCharacter, { start: 0, end: 3 }),
                        frameRate: 3,
                        repeat: -1
                    });
                }
            
                this.revealedCharacters.push(randomCharacter);
                this.displayRevealedCharacters();
            
                character.setTexture(randomCharacter);
                character.setVisible(true);
                    if (randomCharacter === 'MP-buff') {
                        this.sound.play('mpBuffSound');  // Play special MP Buff sound
                    } else {
                        this.sound.stopByKey('characterRevealSound'); // Stop any existing instance
                        this.sound.play('characterRevealSound', { volume: 1, loop: false }); // Play normal character reveal sound
                    }
                character.play('idleAnim_' + randomCharacter);
            });
            
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [StartScreen, BlindBoxScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);
