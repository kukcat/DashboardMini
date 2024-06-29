import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, createTheme } from '@mui/material'
import { ThemeProvider, I18nProvider } from './providers';
import MainBoard from './components/MainBoard';
import { DragDropContext } from 'react-beautiful-dnd';
import { dark } from './components/themes';
import { LOCAL_STORAGE_TYPES, THEMES } from './consts';
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
    console.log(localSettings, 'localSettings')
    if (localSettings) {
      onSettingSet(localSettings)
    }

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
