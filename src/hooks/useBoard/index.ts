import { useState, useCallback, useEffect } from 'react';
import { BoardProps, CardProps } from '../../models';
import { setLocalStorage } from '../../localeStorage';
import { LOCAL_STORAGE_TYPES } from '../../consts';
import { useTranslation } from 'react-i18next';

export const useBoard = () => {

    const {t} = useTranslation()

    const [boards, setBoards] = useState<BoardProps[]>([]);

    useEffect(() => {
        if (boards.length) {
            setLocalStorage(LOCAL_STORAGE_TYPES.BOARDS, boards);
        }
    }, [boards]);

    const onBoardChange = useCallback((newBoard: BoardProps, currentBoardId: number): void => {
        setBoards(prevBoards => prevBoards.map((b) => (b.boardId === currentBoardId ? { ...b, ...newBoard } : b)));
    }, []);

    const onBoardDelete = useCallback((currentBoardId: number): void => {
        setBoards(prevBoards => prevBoards.filter(board => board.boardId !== currentBoardId));
    }, []);

    const onBoardAdd = useCallback((): void => {
        const newBoard: BoardProps = {
            boardId: Date.now(),
            boardColor: "#c1c1c1",
            boardTitle: '',
            cards: [],
        };
        setBoards(prevBoards => [...prevBoards, {...newBoard, boardIndex: prevBoards.length}]);
    }, []);

    const onCardAdd = useCallback((boardId: number): void => {
        setBoards(prevBoards => prevBoards.map(board => board.boardId === boardId  ? 
          {...board, cards: [...board.cards, { cardId: Date.now(), cardTitle: t("Card.newCard"), description: '',
                                position: board.cards.length + 1, cardTags: [],  expiredDate: new Date(), }, ], }
          : board));
    }, []);

    const onBoardsAdd = useCallback((boardsArr: BoardProps[]): void => {
        setBoards(prevBoards => [...prevBoards, ...boardsArr]);
    }, []);

    return {
        boards,
        onBoardDelete,
        onBoardChange,
        onBoardAdd,
        onCardAdd,
        onBoardsAdd,
        setBoards
    };
};