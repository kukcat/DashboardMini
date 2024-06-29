import React, { memo, useMemo, useState } from 'react'
import { CardProps } from '../../models'
import { Box, Grid, Paper, Typography, styled } from '@mui/material'
import CardModal from '../CardModal'
import { Settings } from '../../models/settings'
import { useTranslation } from 'react-i18next'

const CardPaper = styled(Paper)(({theme}: any)=>({
    width: '100%',
    borderRadius: '20px',
    padding: '10px'
}))

interface Props {
    card: CardProps,
    cardChange(newCard: CardProps): void,
    settings: Settings,
    ref: any
}

const Card = ({card, cardChange, settings, ref}: Props) => {

    const {t} = useTranslation()

    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <>
        <CardPaper onClick={handleOpenModal}>
            <Box display='flex' justifyContent='space-between'>
                <Typography>{card.cardTitle}</Typography>
                <Box display='flex'>
                    {card.cardTags?.map((tagid)=>(
                        <Box key={tagid} bgcolor={settings.tags.find(tag => tag.id === tagid)?.color} sx={{width:'15px', height: '15px', borderRadius: '50%'}}></Box>
                    ))}
                </Box>
            </Box>
            {   
                card.expiredDate? 
                <Box display={'flex'} justifyContent='space-between'>
                    <Typography>{t('Card.deadline')}: </Typography>
                    <Typography>{new Date(card.expiredDate).toLocaleDateString()}</Typography>
                </Box>
                : null
            }
        </CardPaper>
        <CardModal settings={settings} card={card} open={openModal} handleClose={handleCloseModal} cardChange={cardChange}/>
        </>
  )

}


export default memo(Card)