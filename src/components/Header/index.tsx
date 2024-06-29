import styled from '@emotion/styled'
import { Box, Button, Grid, TextField } from '@mui/material'
import FilterPopover from '../FilterPopover'
import { Settings } from '../../models/settings'
import SettingsModal from '../SettingsModal'
import { THEMES } from '../../consts'
import { useTranslation } from 'react-i18next'

const NavButton = styled(Button)(({theme} : any)=>({
    width: '150px',
    color: theme.palette.primary.contrastText
}))

const NavBox = styled(Box)(({theme} : any)=>({
    backgroundColor: theme.palette.primary.main
}))

interface Props {
    onBoardAdd: () => void,
    settings: Settings,
    onSettingChange(settingType: keyof Settings, value: any): void,
    onTagAdd(color: string): void,
    onTagDelete(id: number): void,
    onTagChange(id: number, color: string): void,
    onThemeChange: (theme: THEMES) => void
}

const Header = ({onBoardAdd, settings, onSettingChange, onTagAdd, onTagDelete, onTagChange, onThemeChange}: Props) => {

    const {t} = useTranslation()

    const reset = () => {
        localStorage.clear()
        window.location.reload()
    }

  return (
    <NavBox p={1} paddingInline={8}>
        
        <Grid display={'flex'} justifyContent={'space-between'}>
            <NavButton size='small' onClick={onBoardAdd}>
                {t("Settings.addBoard")}
            </NavButton>
            <FilterPopover 
                title={t("Settings.filter")}
                ButtonComponent={NavButton} 
                tags={settings.tags}
                onSettingChange={onSettingChange}
            />
            <SettingsModal
                title={t("Settings.settings")}
                ButtonComponent={NavButton}
                onSettingChange={onSettingChange}
                onTagAdd={onTagAdd}
                onTagDelete={onTagDelete}
                onTagChange={onTagChange}
                tags={settings.tags}
                onThemeChange={onThemeChange}
            />
            <NavButton size='small' onClick={reset}>
                Reset
            </NavButton>
        </Grid>
        
    </NavBox>
  )
}

export default Header