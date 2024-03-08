namespace SpriteKind {
    export const spike = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    level += 1
    if (level <= 6) {
        win(false)
    } else {
        win(true)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    gravityflip()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    death()
})
function death () {
    if (timer > 4) {
        info.changeLifeBy(-1)
        tiles.placeOnRandomTile(mainplayer, assets.tile`myTile2`)
        gravity = 10000
        mainplayer.setImage(assets.image`myImage`)
        mainplayer.ay = gravity
        gravity = 500
    }
    timer = 0
    for (let index = 0; index < 10; index++) {
        timer += 1
        pause(1)
    }
}
function win (bool: boolean) {
    if (bool) {
        for (let index = 0; index < 4; index++) {
            characterAnimations.loopFrames(
            mainplayer,
            [img`
                . . . . . . . . 
                . f f f f . . . 
                f 3 3 3 3 f . . 
                f f 3 f 3 f . . 
                f 3 3 3 3 f . . 
                . f 3 3 3 f . . 
                f 3 3 3 3 3 f . 
                . f 3 f 3 f . . 
                `,img`
                . . . . . . . . 
                . f f f f . . . 
                f 3 3 3 3 f . . 
                f f 3 f 3 f . . 
                f 3 2 3 3 f . . 
                . f 3 3 3 f . . 
                f 3 3 3 3 3 f . 
                . f 3 f 3 f . . 
                `,img`
                . f f f f . . . 
                f 3 3 3 3 f . . 
                f f 3 f 3 f . . 
                f 3 2 3 3 f . . 
                . f 3 3 3 f . . 
                f 3 3 3 3 3 f . 
                . f 3 f f f . . 
                . . f . . . . . 
                `,img`
                . f f f f . . . 
                f 3 3 3 3 f . . 
                f f 3 f 3 f . . 
                f 3 2 3 3 f . . 
                . f 3 3 3 f . . 
                f 3 3 3 3 3 f . 
                . f f f 3 f . . 
                . . . . f . . . 
                `],
            500,
            characterAnimations.rule(Predicate.NotMoving)
            )
        }
        game.gameOver(true)
        game.splash("you win", info.score())
        game.splash(info.highScore())
    } else {
        lvlslct(list)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    death()
})
function lvlslct (list: tiles.TileMapData[]) {
    tiles.setCurrentTilemap(list[level])
    tiles.placeOnRandomTile(mainplayer, assets.tile`myTile2`)
    gravity = 10000
    mainplayer.setImage(assets.image`myImage`)
    mainplayer.ay = gravity
    gravity = 500
}
function gravityflip () {
    if (mainplayer.isHittingTile(CollisionDirection.Bottom) || mainplayer.isHittingTile(CollisionDirection.Top)) {
        if (gravity == 500) {
            gravity = -500
            mainplayer.image.flipY()
        } else {
            gravity = 500
            mainplayer.image.flipY()
        }
        mainplayer.ay = gravity
        music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
    }
}
let timer = 0
let list: tiles.TileMapData[] = []
let level = 0
let gravity = 0
let mainplayer: Sprite = null
mainplayer = sprites.create(assets.image`myImage`, SpriteKind.Player)
info.setScore(0)
info.setLife(3)
gravity = 500
controller.moveSprite(mainplayer, 50, 0)
level = 0
list = [
tileUtil.createSmallMap(tilemap`level0`),
tileUtil.createSmallMap(tilemap`level10`),
tileUtil.createSmallMap(tilemap`level6`),
tileUtil.createSmallMap(tilemap`level1`),
tileUtil.createSmallMap(tilemap`level8`),
tileUtil.createSmallMap(tilemap`level15`),
tileUtil.createSmallMap(tilemap`level12`)
]
lvlslct(list)
game.setGameOverEffect(true, effects.confetti)
game.setGameOverEffect(false, effects.melt)
game.setGameOverScoringType(game.ScoringType.LowScore)
game.onUpdateInterval(1000, function () {
    info.changeScoreBy(1)
})
forever(function () {
    if (gravity == 500) {
        characterAnimations.loopFrames(
        mainplayer,
        [img`
            . . . . . . . . 
            . . . f f f f . 
            . . f 3 3 3 3 f 
            . . f 3 f 3 f f 
            . . f 3 3 3 3 f 
            . . f 3 3 3 f . 
            . f 3 3 3 3 3 f 
            . . f 3 f 3 f . 
            `,img`
            . . . f f f f . 
            . . f 3 3 3 3 f 
            . . f 3 f 3 f f 
            . . f 3 3 3 3 f 
            . . f 3 3 3 f . 
            . . f 3 3 3 f . 
            . . f 3 f f . . 
            . . . f . . . . 
            `,img`
            . . . . . . . . 
            . . . f f f f . 
            . . f 3 3 3 3 f 
            . . f 3 f 3 f f 
            . . f 3 3 3 3 f 
            . . f 3 3 3 f . 
            . f 3 3 3 3 3 f 
            . . f 3 f 3 f . 
            `,img`
            . . . f f f f . 
            . . f 3 3 3 3 f 
            . . f 3 f 3 f f 
            . . f 3 3 3 3 f 
            . . f 3 3 3 f . 
            . . f 3 3 3 f . 
            . . . f f 3 f . 
            . . . . . f . . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
    } else {
        characterAnimations.loopFrames(
        mainplayer,
        assets.animation`myAnim0`,
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
    }
})
forever(function () {
    if (gravity == 500) {
        characterAnimations.loopFrames(
        mainplayer,
        assets.animation`myAnim2`,
        500,
        characterAnimations.rule(Predicate.NotMoving)
        )
    } else {
        characterAnimations.loopFrames(
        mainplayer,
        assets.animation`myAnim3`,
        500,
        characterAnimations.rule(Predicate.NotMoving)
        )
    }
})
forever(function () {
    if (gravity == 500) {
        characterAnimations.loopFrames(
        mainplayer,
        [img`
            . . . . . . . . 
            . f f f f . . . 
            f 3 3 3 3 f . . 
            f f 3 f 3 f . . 
            f 3 3 3 3 f . . 
            . f 3 3 3 f . . 
            f 3 3 3 3 3 f . 
            . f 3 f 3 f . . 
            `,img`
            . f f f f . . . 
            f 3 3 3 3 f . . 
            f f 3 f 3 f . . 
            f 3 3 3 3 f . . 
            . f 3 3 3 f . . 
            . f 3 3 3 f . . 
            . . f f 3 f . . 
            . . . . f . . . 
            `,img`
            . . . . . . . . 
            . f f f f . . . 
            f 3 3 3 3 f . . 
            f f 3 f 3 f . . 
            f 3 3 3 3 f . . 
            . f 3 3 3 f . . 
            f 3 3 3 3 3 f . 
            . f 3 f 3 f . . 
            `,img`
            . f f f f . . . 
            f 3 3 3 3 f . . 
            f f 3 f 3 f . . 
            f 3 3 3 3 f . . 
            . f 3 3 3 f . . 
            . f 3 3 3 f . . 
            . f 3 f f . . . 
            . . f . . . . . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    } else {
        characterAnimations.loopFrames(
        mainplayer,
        assets.animation`myAnim1`,
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    }
})
