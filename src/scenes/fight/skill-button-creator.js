import { Button } from "@pixi/ui";
import { Graphics, Text } from "pixi.js";

export class SkillButtonCreator {
    beginFill
    lineStyle
    width
    height
    radius

    constructor(options) {
        this.beginFill = options.beginFill
        this.lineStyle = options.lineStyle
        this.width = options.width
        this.height = options.height
        this.radius = options.radius
    }

    /**
     * 创建技能按钮
     * @param {object} options 
     */
    create(options) {
        const button = new Button(
            new Graphics().beginFill(this.beginFill)
                .lineStyle(this.lineStyle)
                .drawRoundedRect(options.x, options.y, this.width, this.height, this.radius))

        const skill = new Text(options.text.words, options.text.style)
        skill.x = options.x + (button.view.width - skill.width - this.lineStyle.width * 2) / 2
        skill.y = options.y + (button.view.height - skill.height - this.lineStyle.width * 2) / 2

        button.view.addChild(skill)

        return button
    }
}