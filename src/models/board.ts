import { CardProps } from "."
import { Card } from "./card"

export type Board = {
    boardId: number,
    boardTitle: string,
    boardColor: string,
    cards: CardProps[]
}