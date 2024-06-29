import styled from '@emotion/styled'
import { Box, Button, Grid, Icon, IconButton, Paper, Popover, TextField } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { BoardProps, CardProps } from '../../models';
import { HexColorPicker } from 'react-colorful';
import Card from '../Card';
import fontColorContrast from 'font-color-contrast';
import { Settings } from '../../models/settings';
import ColorPopver from '../ColorPopover';
import { Scrollbar } from 'react-scrollbars-custom'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

const BoardPaper = styled(Paper)(({theme}: any)=>({
    width: '400px',
    borderRadius: '20px',
    height: '500px',
    padding: '20px',
    position: 'relative' as any
}))

const BoardNameTextBox = styled(TextField)(({theme, textcolor}: any)=>({
    input: {
        padding: 0,
        color: textcolor
    },
    fieldset: {
        border: 'none'
    }
}))

interface Props {
    board: BoardProps,
    onBoardChange: (newBoard: BoardProps, id: number) => void,
    onBoardDelete: (id: number) => void,
    onCardAdd: (id: number) => void,
    settings: Settings,
    dragHandle: any
}

const Board = ({board, onBoardChange, onBoardDelete, onCardAdd, settings, dragHandle}: Props) => {

    const {t} = useTranslation()

    const fontContrastColor = fontColorContrast(board.boardColor)

    const boardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onBoardChange({...board, boardTitle: e.target.value}, board.boardId)
    }

    const cardChange = (newCard: CardProps): void =>{
        onBoardChange({...board, cards: board.cards.map(card => card.cardId === newCard.cardId ? newCard : card)}, board.boardId)
    }

    const boardColorChange = (color: string) => {
        onBoardChange({...board, boardColor: color}, board.boardId)
    }

   
    return (
        <Droppable
                    droppableId={String(board.boardId)}
                    type='CARD'
                >
                    {provided => (
            <BoardPaper
                sx={{backgroundColor: board.boardColor, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} {...provided.droppableProps} ref={provided.innerRef}
            >
            <Box display='flex' justifyContent='space-between' alignItems='center'> 
                <BoardNameTextBox 
                    textcolor = {fontContrastColor}
                    value={board.boardTitle} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>boardTitleChange(e)}
                    placeholder={t('Board.boardName')}
                    inputProps={{
                        autoComplete: 'off'
                     }}
                />
                <Box display='flex' alignItems='center'>
                    <Icon {...dragHandle} sx={{padding: 1, width: '40px', height: '40px', display: 'flex', color: fontContrastColor}}>
                        <DragHandleIcon />
                    </Icon>
                    <ColorPopver
                        Icon={MoreHorizIcon}
                        iconColor={fontContrastColor}
                        value={board.boardColor}
                        onColorChange={boardColorChange}
                    />
                    <IconButton aria-label="delete"  onClick={()=>onBoardDelete(board.boardId)}>
                        <CloseIcon sx={{color: fontContrastColor}} color='primary'/>
                    </IconButton>
                </Box>
            </Box>
                
            <Scrollbar>
                <Grid 
                    container 
                    spacing={2} 
                    mt={0} 
                    sx={{height: '100%'}}
                >
                    {board.cards.map((card, index) => (
                    settings.tagFilter.length === 0 || settings.tagFilter.some((element) => card.cardTags.includes(element.id)) 
                    ? 
                        <Draggable key={card.cardId} draggableId={String(card.cardId)} index={index}>
                            {provided => (
                                <Grid item xs={12}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Card 
                                        card={card} 
                                        cardChange={cardChange} 
                                        settings={settings}
                                    />
                                </Grid>
                            )}
                        </Draggable>
                    : null
                ))} 
                {provided.placeholder}
                </Grid>
            </Scrollbar>
                        
            <Box>
                <Button sx={{color: fontContrastColor}} onClick={()=>onCardAdd(board.boardId)}>
                    +{t('Board.addCard')}
                </Button>
            </Box>
        </BoardPaper>  
        )}
        </Droppable>
  )
}

export default memo(Board)