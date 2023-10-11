// -------------------------------------------------------------------------------------------------------------------------- //
// Global Variable declarations
let gameConfig
let game
let currScene

let infoText

let player
let cursorKeys
let wsadKeys
let cameraSnap

let human

let ground

let bird
let clock
let coat
let plant
let bin
let mug
let lilplant
let trash
let painting
let flower

let barClock

let no_hearts
let UIHearts
let lives

let things

let object_knockedFX
let object_backFX
let cat_hitFX
let background_soundFX

let gameMode
    // 0 - start screen
    // 1 - instructions
    // 2 - game on
    // 3 - game over win
    // 4 - game over lose


// -------------------------------------------------------------------------------------------------------------------------- //
// Game Setup

window.onload = function ()
{
    gameConfig =
    {
        width: 1800,
        height: 900,
        backgroundColor: 0x304529,
        physics:
        {
            default: "arcade",
            arcade:
            {
                gravity: { y: 1000 },
                debug: false
            }
        },
        scene:
        {
            preload: Preload,
            create: Create,
            update: Update
        }
    }
    game = new Phaser.Game(gameConfig)
}

// -------------------------------------------------------------------------------------------------------------------------- //
// Special Functions

function Preload()
{
    // Loading step:
    // Use this.load.image or audio here to load your art files or sound files into your game.
    console.log("Preload is starting...")
    console.log(Phaser.VERSION)

    // Make a global shortcut to the current scene
    currScene = this

    // Load a background image that is 3x larger than the screen is set to
    currScene.load.image("background", "images/background.png")

    // Load a little cat to be "in" the world
    currScene.load.spritesheet("cat", "images/sprites/cat.png", {frameWidth: 168, frameHeight: 132})
    // Load a little human to be "in" the world
    currScene.load.spritesheet("human", "images/sprites/human.png", {frameWidth: 204, frameHeight: 264})

    // Load the screens
    currScene.load.image("start_screen", "images/screens/start_screen.png")
    currScene.load.image("instructions_screen", "images/screens/instructions_screen.png")
    currScene.load.image("win_screen", "images/screens/win_screen.png")
    currScene.load.image("lose_screen", "images/screens/lose_screen.png")

    // Load all sounds
    currScene.load.audio("object_knockedFX", "sounds/object_knocked.mp3")
    currScene.load.audio("object_backFX", "sounds/object_back.mp3")
    currScene.load.audio("cat_hitFX", "sounds/cat_hit.mp3")
    currScene.load.audio("background_soundFX", "sounds/background_sound.mp3")   

    // Load all items to knock over
    currScene.load.image("bird", "images/items/bird.png")
    currScene.load.image("clock", "images/items/clock.png")
    currScene.load.image("plant", "images/items/desk_plant.png")
    currScene.load.image("bin", "images/items/inside_bin.png")
    currScene.load.image("mug", "images/items/mug.png")
    currScene.load.image("trash", "images/items/outside_bin.png")
    currScene.load.image("painting", "images/items/painting.png")
    currScene.load.image("flower", "images/items/shelf_flower.png")
    currScene.load.image("box", "images/items/box.png")
    currScene.load.image("lilplant", "images/items/kitchen_plant.png")

    // Load all of the items in the bar and the bar itself
    currScene.load.image("bar", "images/bar/bar.png")
    currScene.load.image("barBird", "images/bar/bar_bird.png")
    currScene.load.image("barBox", "images/bar/bar_box.png")
    currScene.load.image("barClock", "images/bar/bar_clock.png")
    currScene.load.image("barPlant", "images/bar/bar_desk_plant.png")
    currScene.load.image("barBin", "images/bar/bar_inside_bin.png")
    currScene.load.image("barLilplant", "images/bar/bar_kitchen_plant.png")
    currScene.load.image("barMug", "images/bar/bar_mug.png")
    currScene.load.image("barTrash", "images/bar/bar_outside_bin.png")
    currScene.load.image("barPainting", "images/bar/bar_painting.png")
    currScene.load.image("barFlower", "images/bar/bar_shelf_flower.png")

    // Load health bar
    currScene.load.image("three_hearts", "images/health/full_health.png")
    currScene.load.image("two_hearts", "images/health/two_health.png")
    currScene.load.image("one_heart", "images/health/one_health.png")
    currScene.load.image("no_hearts", "images/health/no_health.png")

    // Load in movement of camera and cat
    cursorKeys = currScene.input.keyboard.createCursorKeys();
    wsadKeys = currScene.input.keyboard.addKeys("W,S,A,D")
}

function Create()
{
    // Initialisation step:
    // Create game objects, UI elements, timers, groups and event triggers here
    console.log("Create is starting!")

    // Set the gameMode to 0 (start screen)
    gameMode = 0
    // Create the start screen
    CreateStartScreen()
}

function Update()
{
    // Game management step:
    // Add anything you want to happen every frame of your game here.

    // Check what game mode we are in and call the appropriate function
    switch (gameMode)
    {
        case 0: // Start Screen
            UpdateStartScreen()
            break;
        case 1: // Instructions
            UpdateInstructions()
            break;
        case 2: // Game
            UpdateGame()
            break;
        case 3: // Game Win
            UpdateGameWin()
            break;
        case 4: // Game Lose
            UpdateGameLose()
            break;
    }

    
}

// -------------------------------------------------------------------------------------------------------------------------- //
// Custom Functions

function CreateStartScreen()
{
    console.log("CreateStartScreen")
    // Create the start screen
    startScreen = currScene.add.image(0, 0, 'start_screen')
    // Set the origin to the top left corner to match the camera
    startScreen.setOrigin(0, 0)
    // Set the start screen to be fixed to the camera
    startScreen.setScrollFactor(0)
    /// Create the background sound
    background_soundFX = currScene.sound.add("background_soundFX")
    // Play the background sound
    background_soundFX.play()
    // Loop the background sound
    background_soundFX.loop = true
    
}

function UpdateStartScreen()
{
    // This stuff is checked continuously, but only while the start screen is active!
    if (Phaser.Input.Keyboard.JustDown(cursorKeys.space))   // If space has *just been* pressed
    {
        // Destroy the start screen
        DestroyStartScreen()
        // Set the game mode to 1 (instructions)
        gameMode = 1
        // Create the instructions screen
        CreateInstructions()
    }
}

function DestroyStartScreen()
{
    // This stuff happens when we "leave" the start screen
    // Everything you created in CreateStartScreen should be destroyed here
    // Destroy the start screen
    startScreen.destroy()
}

function CreateInstructions()
{
    console.log("CreateInstructions")
    // Create the instructions screen
    instructions = currScene.add.image(0, 0, 'instructions_screen')
    // Set the origin to the top left corner to match the camera
    instructions.setOrigin(0, 0)
    // Set the instructions screen to be fixed to the camera
    instructions.setScrollFactor(0)
    
}

function UpdateInstructions()
{
    // This stuff is checked continuously, but only while the instructions screen is active!
    if (Phaser.Input.Keyboard.JustDown(cursorKeys.space))   // If space has *just been* pressed
    {
        // Destroy the instructions screen
        DestroyInstructions()
        // Set the game mode to 2 (game)
        gameMode = 2
        // Create the game
        CreateGame()
    }
}

function DestroyInstructions()
{
    // This stuff happens when we "leave" the instructions screen
    // Everything you created in CreateInstructions should be destroyed here
    instructions.destroy()
}

function CreateGame()
{
    // Create an array for the hearts
    hearts = []
    //Set the number of lives to 3
    lives = 3
    // Create an array for the things
    things = []

    // Set the size of the world (usually you want the size of the background image)
    currScene.physics.world.setBounds(461, 0, 4939, 900);
    // Set the area around which the camera is allowed to roam (again usually you want the size of the background image)
    currScene.cameras.main.setBounds(0, 0, 5400, 900);

    //add sound effects to the game world (but doesn't actually trigger it)
    object_knockedFX = currScene.sound.add("object_knockedFX")
    object_backFX = currScene.sound.add("object_backFX")
    cat_hitFX = currScene.sound.add("cat_hitFX")
    background_soundFX = currScene.sound.add("background_soundFX")
    
    // Add "ground" to a static physics group
    ground = currScene.physics.add.staticGroup()
    
    // Load a background as normal, but in the top left corner
    let background = currScene.add.image(0, 0, "background")
    // set the anchor point of the background to the image's top left (so it's "pinned" to the top left)
    background.setOrigin(0, 0)
    
    // Create the floor
    let floor = currScene.add.rectangle(gameConfig.width / 2, 615, 10000, 20)//, 0xff0000 )
    // Add the floor to the ground group
    ground.add(floor)

    // Create the top of the screen
    let top = currScene.add.rectangle(gameConfig.width / 2, 0, 10000, 5)//, 0xff0000 )
    // Add the top to the ground group
    ground.add(top)

    // Create the left wall
    let leftWall = currScene.add.rectangle(450, 0, 20, 1225)//, 0xff0000)
    // Add the left wall to the ground group
    ground.add(leftWall) 

    // Create the right wall
    let rightWall = currScene.add.rectangle(5400, 0, 10, 1225)//, 0xff0000)
    // Add the right wall to the ground group
    ground.add(rightWall) 

    // Create the crate
    let crate = currScene.add.rectangle(620, 497, 200, 10)// 0xff0000)
    // Add the crate to the ground group
    ground.add(crate)

    // Set the create collision from below to false
    crate.body.checkCollision.down = false
    // Set the crate collision from the left to false
    crate.body.checkCollision.left = false
    // Set the crate collision from the right to false
    crate.body.checkCollision.right = false

    // Create the first shelf
    let shelfOne = currScene.add.rectangle(1266, 243, 255, 30)//,, 0xff0000 )
    // Add the first shelf to the ground group
    ground.add(shelfOne)

    // Set the shelf collision from below to false
    shelfOne.body.checkCollision.down = false;
    // Set the shelf collision from the left to false
    shelfOne.body.checkCollision.left = false;
    // Set the shelf collision from the right to false
    shelfOne.body.checkCollision.right = false;

    // Create the second shelf
    let shelfTwo = currScene.add.rectangle(2075, 243, 520, 30)//,, 0xff0000 )
    // Add the second shelf to the ground group
    ground.add(shelfTwo)

    // Set the shelf collision from below to false
    shelfTwo.body.checkCollision.down = false;
    // Set the shelf collision from the left to false
    shelfTwo.body.checkCollision.left = false;
    // Set the shelf collision from the right to false    
    shelfTwo.body.checkCollision.right = false;

    // Create the desk top
    let deskTop = currScene.add.rectangle(1620, 475, 300, 2)//,, 0xff0000 )
    // Add the desk top to the ground group
    ground.add(deskTop)

    // Set the desk top collision from below to false
    deskTop.body.checkCollision.down = false;
    // Set the desk top collision from the left to false
    deskTop.body.checkCollision.left = false;
    // Set the desk top collision from the right to false
    deskTop.body.checkCollision.right = false;
    
    // Create the sofa
    let sofa = currScene.add.rectangle(2150, 525, 125, 2)//,, 0xff0000 )
    // Add the sofa to the ground group
    ground.add(sofa)

    // Set the sofa collision from below to false
    sofa.body.checkCollision.down = false;
    // Set the sofa collision from the left to false
    sofa.body.checkCollision.left = false;
    // Set the sofa collision from the right to false
    sofa.body.checkCollision.right = false;

    // Create the table top
    let tableTop = currScene.add.rectangle(2425, 505, 30, 2)//,, 0xff0000 )
    // Add the table top to the ground group
    ground.add(tableTop)

    // Set the table top collision from below to false
    tableTop.body.checkCollision.down = false;
    // Set the table top collision from the left to false
    tableTop.body.checkCollision.left = false;
    // Set the table top collision from the right to false
    tableTop.body.checkCollision.right = false;

    // Create the fridge top
    let fridgeTop = currScene.add.rectangle(2925, 290, 35, 2)//,, 0xff0000 )
    // Add the fridge top to the ground group
    ground.add(fridgeTop)

    // Set the fridge top collision from below to false
    fridgeTop.body.checkCollision.down = false;
    // Set the fridge top collision from the left to false
    fridgeTop.body.checkCollision.left = false;
    // Set the fridge top collision from the right to false
    fridgeTop.body.checkCollision.right = false;

    // Create to oven top
    let ovenTop = currScene.add.rectangle(3135, 462, 37, 2)//,, 0xff0000 )
    // Add the oven top to the ground group
    ground.add(ovenTop)

    // Set the oven top collision from below to false
    ovenTop.body.checkCollision.down = false;
    // Set the oven top collision from the left to false
    ovenTop.body.checkCollision.left = false;
    // Set the oven top collision from the right to false
    ovenTop.body.checkCollision.right = false;

    // Create the counter top
    let counterTop = currScene.add.rectangle(3520, 458, 375, 2)//,, 0xff0000 )
    // Add the counter top to the ground group
    ground.add(counterTop)

    // Set the counter top collision from below to false
    counterTop.body.checkCollision.down = false;
    // Set the counter top collision from the left to false
    counterTop.body.checkCollision.left = false;
    // Set the counter top collision from the right to false
    counterTop.body.checkCollision.right = false;

    // Create the windowsill
    let windowsill = currScene.add.rectangle(3300, 345, 310, 2)//,, 0xff0000 )
    // Add the windowsill to the ground group
    ground.add(windowsill)

    // Set the windowsill collision from below to false
    windowsill.body.checkCollision.down = false;
    // Set the windowsill collision from the left to false
    windowsill.body.checkCollision.left = false;
    // Set the windowsill collision from the right to false
    windowsill.body.checkCollision.right = false;

    // Create the doorframe
    let doorframe = currScene.add.rectangle(4270, 260, 37, 2)//,, 0xff0000 )
    // Add the doorframe to the ground group
    ground.add(doorframe)

    // Set the doorframe collision from below to false
    doorframe.body.checkCollision.down = false;
    // Set the doorframe collision from the right to false
    doorframe.body.checkCollision.right = false;

    // Create the back wall
    let backWall = currScene.add.rectangle(4176, 129, 25, 260)//, 0xff0000 )
    // Add the back wall to the ground group
    ground.add(backWall)


    // Add a player
    player = currScene.physics.add.sprite(1200, 540, "cat")
    // Don't let the player go outside the world (but remember the world is x3 bigger than the screen this time!)
    player.setCollideWorldBounds(true)
    // Set the player mass  to 30
    player.setMass(30)
    // Set the player stun time to 0
    player.stunTime = 0
    // Make the player collide with the ground
    currScene.physics.add.collider(player, ground)
    
    //  Our player animations, turning, walking left and walking right.
    currScene.anims.create({
        key: 'left',
        frames: currScene.anims.generateFrameNumbers('cat', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    
    currScene.anims.create({
        key: 'turn',
        frames: [ { key: 'cat', frame: 4 } ],
        frameRate: 20
    });
    
    currScene.anims.create({
        key: 'right',
        frames: currScene.anims.generateFrameNumbers('cat', { start: 5, end: 8 }),
        frameRate: 7,
        repeat: -1
    });
    
    // Set the player bounce to 0
    player.setBounce(0);
    //Set the player hit box size to 100, 130
    player.setSize(100, 130)


    // Create objects physics config
    let objectsPhysicsConfig = 
    {
        bounceX: 0.1,
        bounceY: 0.1
    }
    // Create objects group
    objectsGroup = currScene.physics.add.group(objectsPhysicsConfig)
    // Make the players and objects collide
    currScene.physics.add.overlap(player, objectsGroup, gotContact)
    
    
    
    // BAR STUFF!!
    
    // create the bar
    bar = currScene.add.image(gameConfig.width / 2, 760, "bar")
    bar.setScrollFactor(0)
    
    // create the bar items
    function spawnBarItems(xPos, yPos, artName)
    {
        let newBarItem = currScene.add.image(xPos, yPos, artName)
        newBarItem.setScrollFactor(0)
        newBarItem.setTint(0x111111)
        newBarItem.setAlpha(0.25)
        return newBarItem
    }
    
    barBox = spawnBarItems(252, 761, "barBox")
    
    barClock = spawnBarItems(396, 761, "barClock")
    
    barPlant = spawnBarItems(537, 761, "barPlant")
    
    barMug = spawnBarItems(687, 765, "barMug")
    
    barBin = spawnBarItems(828, 761, "barBin")
    
    barFlower = spawnBarItems(972, 761, "barFlower")
    
    barLilplant = spawnBarItems(1116, 761, "barLilplant")
    
    barPainting = spawnBarItems(1260, 761, "barPainting")
    
    barTrash = spawnBarItems(1403, 761, "barTrash")
    
    barBird = spawnBarItems(1548, 761, "barBird")
    
    
    
    // ITEMS !!
    
    // create the items
    function spawnItems(xPos, yPos, artName, icon, useGravity)
    {
        let newItem = currScene.physics.add.image(xPos, yPos, artName)
        objectsGroup.add(newItem)
        newItem.body.allowGravity = useGravity
        currScene.physics.add.collider(newItem, ground)
        newItem.myIcon = icon
        newItem.moved = false
        newItem.StartingX = xPos
        newItem.StartingY = yPos
        newItem.stunTime = 0
        things.push(newItem)
        return newItem
    }

    
    
    bird = spawnItems(4305, 213, "bird", barBird, true)
    
    clock = spawnItems(1135, 186, "clock", barClock, true)
    
    plant = spawnItems(1459, 417, "plant", barPlant, true)
    
    bin = spawnItems(1877, 561, "bin", barBin, true)
    
    mug = spawnItems(2420, 486, "mug", barMug, true)
    
    trash = spawnItems(4980, 500, "trash", barTrash, true)
    
    painting = spawnItems(3970, 300, "painting", barPainting, false)
    
    flower = spawnItems(2290, 171, "flower", barFlower, true)
    
    box = spawnItems(600, 435, "box", barBox, false )
    
    lilplant =spawnItems(3450, 300, "lilplant", barLilplant, true)
    


    // HEALTH STUFF

    // create the hearts
    
    no_hearts = currScene.add.image(1600, 76, "no_hearts")
    no_hearts.setScrollFactor(0)
    
    newHeart = currScene.add.image(1500, 76, "one_heart")
    newHeart.setScrollFactor(0)
    hearts.push(newHeart)

    newHeart = currScene.add.image(1600, 76, "one_heart")
    newHeart.setScrollFactor(0)
    hearts.push(newHeart)

    newHeart = currScene.add.image(1700, 76, "one_heart")
    newHeart.setScrollFactor(0)
    hearts.push(newHeart)


    // create the human

    human = currScene.physics.add.sprite(2700, 473, "human")
    human.setCollideWorldBounds(true)
    currScene.physics.add.collider(human, ground)
    currScene.physics.add.overlap(human, player, gotContactHuman)
    currScene.physics.add.overlap(human, leftWall, gotContactLeftWall)
    currScene.physics.add.overlap(human, objectsGroup, gotContactObject)


    // create the human animations

    currScene.anims.create({
        key: 'left_h',
        frames: currScene.anims.generateFrameNumbers('human', {start: 0, end: 2}),
        frameRate: 7,
        repeat: -1
    });

    currScene.anims.create({
        key: 'turn_h',
        frames: currScene.anims.generateFrameNumbers({key: 'human', frame: 3}),
        frameRate: 7,
    });

    currScene.anims.create({
        key: 'right_h',
        frames: currScene.anims.generateFrameNumbers('human', {start: 4, end: 6}),
        frameRate: 7,
        repeat: -1
    });

    // create the human hit box
    
    human.setSize(155, 255)

    humanLeft = true

    if (humanLeft == true)
    {
        human.setVelocityX(-100)
        human.anims.play('left_h', true)
    }
    

    // Force the camera to follow the player - the player will be in the centre unless the player get near the edge of the world
    cameraSnap = true
    currScene.cameras.main.startFollow(player, true, 0.05, 0.05)
    
    infoText = currScene.add.text(1520, gameConfig.height - 25, "cat nuisance - by maja gaska")
    // Stop the info text from being locked to the world (UI Text)
    infoText.setScrollFactor(0)
}

function UpdateGame()
{

    // set gameWon to true
    gameWon = true

    // for each item in things
    for (let i = 0; i < things.length; i++) 
    {
        // if item.moved is false
        if (things[i].moved == false)
        {
            // set gameWon to false
            gameWon = false
            // break
            break
            // end if
        }
        // end for
    }

    // if gameWon is true
    if (gameWon == true)
    {
        // move to game over screen
        DestroyGame()
        gameMode = 3
        CreateGameWin()
        return
    }        
    
    
    // Move the little dude in the world
    movePlayer()
    
    // Move the camera around the world (dude should stay still relative to the *world*)
    moveCamera()
    
    // set the velocity and angular velocity to be * 0.95
    bird.setVelocity(bird.body.velocity.x * 0.95, bird.body.velocity.y * 0.95)
    bird.setAngularVelocity(bird.body.angularVelocity * 0.95)

    clock.setVelocity(clock.body.velocity.x * 0.95, clock.body.velocity.y * 0.95)
    clock.setAngularVelocity(clock.body.angularVelocity * 0.95)

    plant.setVelocity(plant.body.velocity.x * 0.95, plant.body.velocity.y * 0.95)
    plant.setAngularVelocity(plant.body.angularVelocity * 0.95)
    
    bin.setVelocity(bin.body.velocity.x * 0.95, bin.body.velocity.y * 0.95)
    bin.setAngularVelocity(bin.body.angularVelocity * 0.95)
    
    mug.setVelocity(mug.body.velocity.x * 0.95, mug.body.velocity.y * 0.95)
    mug.setAngularVelocity(mug.body.angularVelocity * 0.95)
    
    trash.setVelocity(trash.body.velocity.x * 0.95, trash.body.velocity.y * 0.95)
    trash.setAngularVelocity(trash.body.angularVelocity * 0.95)
    
    painting.setVelocity(painting.body.velocity.x * 0.95, painting.body.velocity.y * 0.95)
    painting.setAngularVelocity(painting.body.angularVelocity * 0.95)
    
    flower.setVelocity(flower.body.velocity.x * 0.95, flower.body.velocity.y * 0.95)
    flower.setAngularVelocity(flower.body.angularVelocity * 0.95)
    
    box.setVelocity(box.body.velocity.x * 0.95, box.body.velocity.y * 0.95)
    box.setAngularVelocity(box.body.angularVelocity * 0.95)
    
    lilplant.setVelocity(lilplant.body.velocity.x * 0.95, lilplant.body.velocity.y * 0.95)
    lilplant.setAngularVelocity(lilplant.body.angularVelocity * 0.95)

    if (player.stunTime > 0)
    {
        player.stunTime--
        return
    }

    
    
    if (human.x < 555)
    {
        console.log("Hit wall, turning right")
        human.setVelocityX(100)
        human.anims.play('right_h', true);
        console.log("walk right")
    }
    console.log("human x: " + human.x)
    
    if (human.x > 5290)
    {
        console.log("Hit wall, turning left")
        human.setVelocityX(-100)
        human.anims.play('left_h', true);
        console.log("walk left")
    }

 

    //human.setVelocityX(0)
        
    //if (Math.abs(player.y - human.y) <= 7)
    //{
        //human.anims.play('turn_h', true);
    //}



    if (human.VelocityX == 0)
    {
        console.log("human idle")
        human.anims.play('turn_h', true);
        human.setVelocityX(100)

    }

    for (let i = 0; i < things.length; i++)
    {
        if (things[i].stunTime > 0)
        {
            things[i].stunTime -= 1
        }
    }

}

function DestroyGame()
{
    console.log("Byebye game")

    // Destroy the player
    player.destroy()
    // Destroy the human
    human.destroy()

    // Destroy the things
    for (let i = 0; i < things.length; i++)
    {
        things[i].destroy()
    }
    // Destroy the ground
    ground.destroy()
    
    
}

function movePlayer()
{
    
    // Default to standing still
    player.setVelocityX(0)
    

    // If A is pressed
    if ((wsadKeys.A.isDown) || (cursorKeys.left.isDown)) 
    {
        // Start the cat moving left in the world
        player.setVelocityX(-400)
        player.anims.play('left', true);
    }
    // if A isn't pressed, but D is...
    else if ((wsadKeys.D.isDown) || (cursorKeys.right.isDown))
    {
        // Start the cat moving right in the world
        player.setVelocityX(400)
        player.anims.play('right', true);
    }

    else
    {
        player.anims.play('turn');
    }

    if ((Phaser.Input.Keyboard.JustDown(wsadKeys.W) && player.body.touching.down) || (Phaser.Input.Keyboard.JustDown(cursorKeys.up) && player.body.touching.down) || (Phaser.Input.Keyboard.JustDown(cursorKeys.space) && player.body.touching.down))
    {
        player.setVelocityY(-900)
        //player.body.velocity.add()
    }
    else if ((wsadKeys.S.isDown) || (cursorKeys.down.isDown))
    {
        player.setVelocityY(100)
    }
}

function moveCamera()
{
    // If the camera snap is currently off and space has been pressed
    if (!cameraSnap && cursorKeys.space.isDown)
    {
        cameraSnap = true
        // Make the camera follow the little dude
        currScene.cameras.main.startFollow(player, true, 0.05, 0.05);
    }


}

// This function is called when the player collides with an item

function gotContact(player, otherThing)
{
    console.log("hit a thing!")
    if (otherThing.stunTime > 0)
    {
        return
    }
    otherThing.setAngularVelocity(60)
    otherThing.setVelocity(player.body.velocity.x, 1000)
    otherThing.body.allowGravity = true
    if (otherThing.myIcon && otherThing.moved == false)
    {
        const tweenConfig =
        {
            targets: otherThing.myIcon,
            alpha: 1,
        }
        currScene.tweens.add(tweenConfig)
        object_knockedFX.play()

        currScene.tweens.addCounter({
            from: 17,
            to: 255,
            onUpdate: function (tween)
            {
                const value = Math.floor(tween.getValue());

                otherThing.myIcon.setTint(Phaser.Display.Color.GetColor(value, value, value));
            }
        });

        otherThing.moved = true
    }

    if (player.x < human.x - 50px)
    {
        human.setVelocityX(-100)
        human.anims.play('left_h', true);
        console.log("chase left")
        humanLeft = false
    }

    if (player.x > human.x + 50px)
    {
        human.setVelocityX(100)
        human.anims.play('right_h', true);
        console.log("chase right")
        humanLeft = false
    }
    
}
    
// This function is called when the human collides with the player

function gotContactHuman(human, otherThing)
{
    if (lives <= 0)
    {
        DestroyGame()
        gameMode = 4
        CreateGameLose()
    }

    if (player.stunTime > 0)
    {
        return
    }
    cat_hitFX.play()
    lives--
    player.stunTime = 120

    const tweenConfig =
    {
        targets: hearts[lives],
        alpha: 0,
    }
    currScene.tweens.add(tweenConfig)
}

// This function is called when the human collides with the left wall

function gotContactLeftWall(_, _)
{
    console.log("Hit wall, turning right")
    human.setVelocityX(200)
    human.anims.play('right_h', true);
    console.log("walk right")
}


// This function is called when the human collides with an object

function gotContactObject(human, otherThing)
{
    if (otherThing.myIcon && otherThing.moved == true)
    {
        const tweenConfig =
        {
            targets: otherThing.myIcon,
            alpha: 0.25,
        }
        object_backFX.play()
        currScene.tweens.add(tweenConfig)

        currScene.tweens.addCounter({
            from: 255,
            to: 17,
            onUpdate: function (tween)
            {
                const value = Math.floor(tween.getValue());

                otherThing.myIcon.setTint(Phaser.Display.Color.GetColor(value, value, value));
            }
        });

        otherThing.moved = false
    }

    resetThing(otherThing);

}

// This function is called to reset a knocked objects

function resetThing(thingToReset)
{
    thingToReset.setVelocity(0, 0)
    thingToReset.setAngularVelocity(0)
    thingToReset.x = thingToReset.StartingX
    thingToReset.y = thingToReset.StartingY
    thingToReset.moved = false
    thingToReset.rotation = 0
    thingToReset.body.allowGravity = false
    thingToReset.stunTime = 60
    return
}

// create game win

function CreateGameWin(){

    game_win = currScene.add.image(0, 0, 'win_screen')
    game_win.setOrigin(0, 0)
    game_win.setScrollFactor(0)
}


// update game win

function UpdateGameWin()
{
    if (Phaser.Input.Keyboard.JustDown(cursorKeys.space))   // If space has *just been* pressed
    {
        DestroyGameWin()
        gameMode = 0
        CreateStartScreen()
        background_soundFX.stop()
    }
}

// destroy game win

function DestroyGameWin()
{
    game_win.destroy()
}

// create game lose

function CreateGameLose()
{
    game_lose = currScene.add.image(0, 0, 'lose_screen')
    game_lose.setOrigin(0, 0)
    game_lose.setScrollFactor(0)
}

// update game lose

function UpdateGameLose() {
    if (Phaser.Input.Keyboard.JustDown(cursorKeys.space))   // If space has *just been* pressed
    {
        DestroyGameLose()
        gameMode = 0
        CreateStartScreen()
        background_soundFX.stop()
    }
}

// destroy game lose

function DestroyGameLose()
{
    game_lose.destroy()
}
