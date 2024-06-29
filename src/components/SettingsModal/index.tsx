import { StyledComponent } from '@emotion/styled';
import { Button, Modal, Box, Typography, Grid, Divider } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColorPopover from '../ColorPopover';
import { Settings, Tags } from '../../models';
import TagSetting from '../TagSetting';
import { THEMES } from '../../consts';
import i18n from '../../providers/i18n';
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
    ButtonComponent: StyledComponent<any>,
    title: string,
    onSettingChange(settingType: keyof Settings, value: any): void,
    onTagAdd(color: string): void,
    onTagDelete(id: number): void,
    onTagChange(id: number, color: string): void,
    tags: Tags[],
    onThemeChange: (theme: THEMES) => void
}

const SettingsModal = ({ButtonComponent, title, onTagAdd, onTagDelete, onTagChange, tags, onThemeChange}: Props) => {

    const {t} = useTranslation()

    const [open, setOpen] = useState<boolean>(false)
    const [currentTagToAdd, setCurrentTagToAdd] = useState<string>('')

    const onCurrentTagChange = (color: string) => {
        setCurrentTagToAdd(color)
    }

    const onTagAddButtonClick = () => {
        if (currentTagToAdd === '') return
        onTagAdd(currentTagToAdd)
        setCurrentTagToAdd('#fff')
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const changeTheme = (value: THEMES) => {
        onThemeChange(value)
    }

    const changeCurrentLanguage = (value: 'en' | 'ua') => {
        i18n.changeLanguage(value)
    }


    return (
    <>
        <ButtonComponent onClick={handleOpen}>{title}</ButtonComponent>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Grid container spacing={2} display='flex' flexDirection='column'>
                    <Grid item>
                    <Divider>{t('Settings.addTag')}</Divider>
                        <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>
                            <Box display='flex' alignItems='center'>
                                <Typography>
                                    {t('Settings.selectColorTag')}:
                                </Typography>
                                <ColorPopover
                                    value={currentTagToAdd}
                                    Icon={ExpandMoreIcon}
                                    onColorChange={onCurrentTagChange}
                                    iconColor=''
                                />
                            </Box>
                            <Box sx={{height: '30px', width: '100px', bgcolor: currentTagToAdd}}></Box>
                            <Button onClick={onTagAddButtonClick}>{t('Settings.createTag')}</Button>
                        </Box>
                    </Grid>
                    {tags.length ?
                        <Grid item>
                        <Divider>{t('Settings.changeTag')}</Divider>
                            <Grid container gap={2} mt={2}>
                            {
                                tags.map((tag)=>(
                                    <Grid key={tag.id} item sx={{width: '100%'}}>
                                        <TagSetting 
                                            color={tag.color}
                                            onTagDelete={onTagDelete}
                                            onTagChange={onTagChange}
                                            tagId={tag.id}
                                        />
                                    </Grid>
                                ))
                            }
                            </Grid>
                        </Grid>
                        : null
                    }
                    <Grid item>
                    <Divider>{t("Settings.changeTheme")}</Divider>
                        <Grid container gap={5} mt={2} justifyContent='center'>
                            <Grid>
                                <Button variant='outlined' onClick={()=>changeTheme(THEMES.LIGHT)}>{t("Settings.lightTheme")}</Button>
                            </Grid>
                            <Grid>
                                <Button variant='outlined' onClick={()=>changeTheme(THEMES.DARK)}>{t("Settings.darkTheme")}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                    <Divider>{t("Settings.changeLanguage")}</Divider>
                        <Grid container gap={5} mt={2} justifyContent='center'>
                            <Grid>
                                <Button variant='outlined' onClick={()=>changeCurrentLanguage('ua')}>Українська</Button>
                            </Grid>
                            <Grid>
                                <Button variant='outlined' onClick={()=>changeCurrentLanguage('en')}>English</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    </>
  )
}

export default SettingsModal