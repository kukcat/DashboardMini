import React, { useEffect } from 'react';
import {  CssBaseline } from '@mui/material'
import { ThemeProvider, I18nProvider } from './providers';
import MainBoard from './components/MainBoard';
import { LOCAL_STORAGE_TYPES } from './consts';
import { getFromStorage } from './localeStorage';
import { useBoard } from './hooks/useBoard';
import { useSettings } from './hooks/useSettings';
import { Settings } from './models';
import i18n from './providers/i18n';

function App() {


  const {boards, onBoardChange, onBoardDelete, onBoardAdd, onCardAdd, onBoardsAdd, setBoards} = useBoard()
  const {settings, onSettingChange, onSettingSet, onTagAdd, onTagDelete, onTagChange, onThemeChange, onLanguageChange} = useSettings()
  
  useEffect(()=>{

    const localBoard = getFromStorage(LOCAL_STORAGE_TYPES.BOARDS)
    
    if (localBoard) {
      onBoardsAdd(localBoard)
    }

    const localSettings = getFromStorage(LOCAL_STORAGE_TYPES.SETTINGS)

    if (localSettings) {
      onSettingSet(localSettings)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  i18n.on('languageChanged', ()=>{
    onLanguageChange(i18n.language)
  })

  return (
    <I18nProvider>
      <ThemeProvider theme={settings.theme}>
        <CssBaseline/>
        <MainBoard
          onBoardAdd={onBoardAdd} 
          settings={settings as Settings} 
          onSettingChange={onSettingChange}
          onTagAdd={onTagAdd}
          onTagDelete={onTagDelete}
          onTagChange={onTagChange}
          boards={boards} 
          onBoardChange={onBoardChange} 
          onBoardDelete={onBoardDelete} 
          onCardAdd={onCardAdd}     
          setBoards={setBoards}
          onThemeChange={onThemeChange}
        />
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
