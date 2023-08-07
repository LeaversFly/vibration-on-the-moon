export type MovableSpriteOptions = {
    operational: boolean
}

export type SkillButtonCreatorOptions = {
    beginFill: string
    lineStyle: {
        width: number,
        color: string
    }
    width: number
    height: number
    radius: number
}

export type SkillButtonCreateOptions = {
    x: number,
    y: number,
    text: {
        words: string,
        style: {
            fill: string
        }
    }
}

export type SkillLineCreatorOptions = {
    lineStyle: {
        width: number,
        color: string
    }
}

export type SkillLineCreateOptions = {
    x: number
    y: number
    lineTo: Array<number>[]
}