import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import ColorPopover from '../ColorPopover'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

interface Props {
    color: string,
    onTagDelete(id: number): void,
    onTagChange(id: number, color: string): void,
    tagId: number
}

const TagSetting = ({color, onTagChange, onTagDelete, tagId} :Props) => {

    const {t} = useTranslation()
    const [changedTagColor, setChangedTagColor] = useState(color)

    const onColorChangeButtonClick = () => {
        onTagChange(tagId, changedTagColor)
    }

    const onColorDeleteButtonClick = () => {
        onTagDelete(tagId)
    }

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
            <Box sx={{height: '30px', width: '100px', bgcolor: changedTagColor}}/>
            <ColorPopover
                value={changedTagColor}
                Icon={ExpandMoreIcon}
                onColorChange={setChangedTagColor}
                iconColor=''
            />
        </Box>
        <Box>
            <Button onClick={onColorChangeButtonClick}>{t('Settings.change')}</Button>
            <Button onClick={onColorDeleteButtonClick}>{t('Settings.remove')}</Button>
        </Box>
    </Box>
  )
}

export default TagSetting