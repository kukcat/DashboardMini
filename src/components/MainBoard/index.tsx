import { Box, Grid } from '@mui/material'
import React from 'react'
import Header from '../Header'
import Board from '../Board'
import { BoardProps, CardProps, Settings } from '../../models'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { Scrollbar } from 'react-scrollbars-custom'
import styled from '@emotion/styled'
import { Card } from '../../models/card'
import { ThemeProvider } from '../../providers'
import { THEMES } from '../../consts'

const CustomScrollbar = styled(Scrollbar)(({theme})=>({
  '.ScrollbarsCustom-Track': {
    top: '-16px !important',
    height: '8px !important',
    background: theme.palette.secondary.contrastText + ' !important'
  },
  // background:
}))

interface Props {
    boards: BoardProps[],
    onBoardDelete: (currentBoardId: number) => void,
    onBoardChange: (newBoard: BoardProps, currentBoardId: number) => void,
    onBoardAdd: () => void,
    onCardAdd: (boardId: number) => void,
    settings: Settings,
    onSettingChange: (settingType: keyof Settings, value: any) => void,
    onTagAdd: (newTag: string) => void,
    onTagDelete: (id: number) => void,
    onTagChange: (id: number, color: string) => void,
    setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>,
    onThemeChange: (theme: THEMES) => void
}

const MainBoard = ({
  boards ,
  onBoardDelete,
  onBoardChange,
  onBoardAdd,
  onCardAdd,
  settings,
  onSettingChange,
  onTagAdd,
  onTagDelete,
  onTagChange,
  setBoards,
  onThemeChange
}: Props) => {

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result: DropResult) => {

    if (!result.destination) return

    if (result.source?.droppableId ==='boards' && result.destination?.droppableId ==='boards') {
      
      if (result.source.index === result.destination.index) return
      
      const reordered = reorder(boards, result.source.index, result.destination.index)

      setBoards(reordered)
    }

    if (result.type === 'CARD') {

      console.log(result)

      if (result.destination?.droppableId === result.source.droppableId) {

        if (result.source.index === result.destination.index) return

        const reorderedCards = reorder(boards.find(board => board.boardId === Number(result.source.droppableId))?.cards as CardProps[], result.source.index, result.destination.index)

        setBoards(boards => boards.map(board => board.boardId === Number(result.destination?.droppableId) ? {...board, cards: reorderedCards} : board))

      } else {
        
        const fromBoardId = Number(result.source.droppableId)
        const toBoardId = Number(result.destination.droppableId)
        const cardIndex = Number(result.source.index)
        const cardId = Number(result.draggableId)

        const fromBoard = boards.find(board => board.boardId === fromBoardId)
        const card = fromBoard?.cards.find(card => card.cardId === cardId) as Card

        setBoards(boards.map(board => {

          if (board.boardId === fromBoardId) {
            return {...board, cards: board.cards.filter(card => card.cardId !== cardId)} as BoardProps

          } else if (board.boardId === toBoardId) {
            board.cards.splice(cardIndex, 0, card)
            return board

          }

          return board
        }))
      }

    }
  }

  return (
    <>
      <Header 
        onBoardAdd={onBoardAdd} 
        settings={settings as Settings} 
        onSettingChange={onSettingChange}
        onTagAdd={onTagAdd}
        onTagDelete={onTagDelete}
        onTagChange={onTagChange}
        onThemeChange={onThemeChange}
      />
        <Box marginInline={8} mt={3}>
          <CustomScrollbar style={{ height: '700px'}}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='boards' type='COLUMN' direction="horizontal">
                {provided => (
                  <Grid 
                    flexWrap={'nowrap'}
                    container 
                    spacing={2}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    width='fit-content'
                    position='absolute'
                  >
                        {boards.map((board: BoardProps, index: number)=>(
                          <Draggable draggableId={String(board.boardId)} key={board.boardId} index={index}>
                          {provided => (
                            <Grid 
                              item 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <Board 
                                board={board} 
                                onBoardChange={onBoardChange} 
                                onBoardDelete={onBoardDelete} 
                                onCardAdd={onCardAdd} 
                                settings={settings as Settings}       
                                key={board.boardId}        
                                dragHandle={provided.dragHandleProps}            
                              />
                            </Grid>
                          )}
                        </Draggable>
                        ))
                      }
                      {provided.placeholder}
                    </Grid>
                )}
              </Droppable>
          </DragDropContext>
          </CustomScrollbar>
        </Box>
    </>
  )
}

export default MainBoard