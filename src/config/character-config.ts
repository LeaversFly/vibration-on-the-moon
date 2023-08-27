import { reactive } from "vue";
import { TeamType } from "../types/config";
import { getSheet } from "../utils/sheet";

export enum Character {
    IRENE = 'irene',
    SPINEBOY = 'spineboy',
    SYDONQ = 'sydonq'
}

export const team = reactive<TeamType[]>([])

export function useTeam() {
    const addTeam = (members: string[]) => {
        members.forEach((item) => {
            team.push({
                name: item,
                data: getSheet(item).spineData
            })
        })
    }

    const getTeam = () => {
        return team
    }

    return {
        addTeam,
        getTeam
    }
}