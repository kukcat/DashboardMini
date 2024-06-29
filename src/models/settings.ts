import { THEMES } from "../consts"
import { Tags } from "./tags"

export type Settings = { 
    tags: Tags[],
    tagFilter: Tags[],
    theme: THEMES,
    language: string | undefined
}