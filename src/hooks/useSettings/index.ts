import { useCallback, useEffect, useState } from "react"
import { Settings } from "../../models/settings"
import { LOCAL_STORAGE_TYPES, THEMES, baseSettings } from "../../consts"
import { setLocalStorage } from "../../localeStorage"

export const useSettings = () => {

    const [settings, setSettings] = useState<Settings>(baseSettings)

    useEffect(() => {
        if (settings !== baseSettings) {
            setLocalStorage(LOCAL_STORAGE_TYPES.SETTINGS, settings);
        }
    }, [settings]);

    const onSettingChange = useCallback((settingType: keyof Settings, value: any) => {
        setSettings(prevSettings => ({...prevSettings, [settingType]:value}) as Settings)

    }, [])

    const onSettingSet = useCallback((localSettings: Settings) => {
        setSettings(localSettings)
    }, [])

    const onTagAdd = useCallback((newTag: string)=>{
        setSettings(prevSettings => ({...prevSettings, tags: [...prevSettings.tags, {id: Number(new Date()), color: newTag}]}))
    }, [])

    const onTagDelete = useCallback((id: number)=>{
        setSettings(prevSettings => ({...prevSettings, tags: prevSettings.tags.filter(tag => tag.id !== id )}))
    }, [])

    const onTagChange = useCallback((id: number, color: string)=>{
        setSettings(prevSettings => ({...prevSettings, tags: prevSettings.tags.map(tag => tag.id !== id ? tag : {id: tag.id, color: color})}))
    }, [])

    const onThemeChange = useCallback((theme: THEMES)=>{
        setSettings(prevSettings => ({...prevSettings, theme: theme}))
    }, [])

    const onLanguageChange = useCallback((language: string)=>{
        setSettings(prevSettings => ({...prevSettings, language}))
    }, [])
 
    return {
        settings,
        setSettings,
        onSettingChange,
        onSettingSet,
        onTagAdd,
        onTagDelete, 
        onTagChange,
        onThemeChange,
        onLanguageChange
    }
}