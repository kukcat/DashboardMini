import { Settings } from "./models";

export enum LOCAL_STORAGE_TYPES {
    BOARDS,
    SETTINGS
}
export enum THEMES {
    LIGHT,
    DARK
}

export const baseSettings: Settings = {
    theme: THEMES.DARK, 
    tags: [],
    tagFilter: [],
    language: undefined
}
