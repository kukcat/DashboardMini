import { IconButton, Popover, SvgIconTypeMap, styled } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    iconColor: string,
    value: string,
    onColorChange(color: string): void
}

const ColorPopoverBackground = styled(Popover)(({theme}: any)=>({
    '.MuiPopover-paper': {
        backgroundColor: 'transparent',
        overflow: 'visible',
    }
}))

const ColorPopover = ({Icon, iconColor, value, onColorChange}: Props) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState<boolean>(false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    };

    const colorChangeEvent = (color: any) => {
        const selectedColor = color.target.lastElementChild.style.backgroundColor.slice(4, -1) as string
        const selectedColors = selectedColor.split(',')
        const finalColor = "#" + ((1 << 24) | (+selectedColors[0] << 16) | (+selectedColors[1] << 8) | +selectedColors[2]).toString(16).slice(1)

        onColorChange(finalColor)
    }
    
    return (
    <>
        <IconButton  aria-label="changeColor" onClick={handleClick}>
            <Icon sx={{color: iconColor}}/>
        </IconButton>
        <ColorPopoverBackground
            sx={{overflow:'visible'}}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
        >
        <HexColorPicker color={value} onMouseUp={(color)=>colorChangeEvent(color)}/>
        </ColorPopoverBackground>
    </>
  )
}

export default ColorPopover