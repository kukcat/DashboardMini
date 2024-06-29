import React, { memo, useState } from 'react'
import { CardProps } from '../../models'
import { Modal, Box, Typography, Button, TextField, Grid, Checkbox, FormControlLabel, FormGroup, colors } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import { Tags } from '../../models/tags';
import { Settings } from '../../models/settings';
import { useTranslation } from 'react-i18next';

const style = {
    position: 'absolute' as 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
};


interface Props {
    card: CardProps,
    open: boolean,
    handleClose(): void
    cardChange(newCard: CardProps): void,
    settings: Settings
}

const CardModal = ({card, open, handleClose, cardChange, settings}: Props) => {

    const {t} = useTranslation()
    const [newCard, setNewCard] = useState<CardProps>(card)

    const newCardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNewCard({...newCard, [e.target.name]: e.target.value})
    }

    const newCardChangeDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNewCard({...newCard, expiredDate: new Date(e.target.value)})
    }

    const newCardColorChange = (color: Tags): void => {
        if (newCard.cardTags?.includes(color.id)) {
            setNewCard(prevCard => ({...prevCard, cardTags: newCard.cardTags?.filter((c) => c !== color.id)}));
          } else {
            setNewCard(prevCard => ({...prevCard, cardTags: [...prevCard.cardTags, color.id]}));
          }
    } 

    const handleOk = () => {
        cardChange(newCard)
        handleClose()
    }


  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={style}>
            <Grid container spacing={2} display='flex' flexDirection='column'>
                <Grid item>
                    <TextField fullWidth size='small' label={t('Card.cardTitle')} name='cardTitle' value={newCard.cardTitle} onChange={(e)=>newCardChange(e)} />
                </Grid>
                <Grid item>
                    <TextField fullWidth rows='15' multiline size='small' label={t('Card.description')} name='description' value={newCard.description} onChange={(e)=>newCardChange(e)} />
                </Grid>
                <Grid item>
                    <TextField fullWidth size='small' type='date' label={t('Card.deadline')} value={dayjs(newCard.expiredDate).format("YYYY-MM-DD")} onChange={(e)=>newCardChangeDate(e)} />
                </Grid> 
                <Grid item>
                    <FormGroup>
                        <Box display='flex' justifyContent='space-between'>
                            {settings.tags.map((color, index) => (
                                <Checkbox
                                    key={index}
                                    checked={newCard.cardTags?.includes(color.id)}
                                    onChange={() => newCardColorChange(color)}
                                    style={{ color: color.color }}
                                />
                            ))}
                        </Box>
                    </FormGroup>
                </Grid>
            </Grid>
            
            
            <Button onClick={handleOk} sx={{mt: 2}}>
                {t('Card.change')}
            </Button>
        </Box>

    </Modal>
  )
}

export default memo(CardModal)