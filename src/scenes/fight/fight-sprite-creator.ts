import { Application } from "pixi.js";
import FightSprite from "../../characters/fight-sprite";
import { TeamType } from "../../types/config";

export class FightSpriteCreator {
    constructor() { }

    create(options: { team: TeamType[], app: Application }) {
        const fightSprites: { [key: string]: FightSprite } = {}
        options.team.forEach((item) => {
            let sprite = new FightSprite({ data: item.data })
            sprite.position.set(options.app.screen.width / 2, options.app.screen.height / 2)
            sprite.state.setAnimation(0, 'Idle', true)
            sprite.stateData.setMix('Idle', 'Die', 0.2)

            fightSprites[item.name] = sprite
        })

        return fightSprites
    }
}