import { Tags } from "./tags"

export type Card = {
    cardId: number,
    cardTitle: string,
    cardTags: number[],
    expiredDate: Date | undefined,
    description: string,
}