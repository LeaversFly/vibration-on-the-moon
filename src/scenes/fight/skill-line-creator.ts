import { Graphics } from "pixi.js";
import { SkillLineCreateOptions, SkillLineCreatorOptions } from "../../types/scenes";

export class SkillLineCreator {
    lineStyle

    constructor(options: SkillLineCreatorOptions) {
        this.lineStyle = options.lineStyle
    }

    /**
     * 创建技能连线
     * @param {object} options 
     */
    create(options: SkillLineCreateOptions) {
        const line = new Graphics();
        line.position.set(options.x, options.y)
        line.lineStyle(this.lineStyle.width, this.lineStyle.color);
        options.lineTo.forEach(item => {
            line.lineTo(item[0], item[1]);
        })

        return line
    }
}