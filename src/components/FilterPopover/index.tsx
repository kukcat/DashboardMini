import * as React from 'react';
import Popover from '@mui/material/Popover';
import { StyledComponent } from '@emotion/styled';
import { FormGroup, Box, Checkbox, Button } from '@mui/material';
import { Tags } from '../../models/tags';
import { Settings } from '../../models/settings';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    title: string,
    ButtonComponent: StyledComponent<any>,
    tags: Tags[],
    onSettingChange(settingType: keyof Settings, value: any): void
}

const FilterPopover = ({title, ButtonComponent, tags, onSettingChange}: Props) => {

  const {t} = useTranslation()
  
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tagFilter, setTagFilter] = useState<Tags[]>([])
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=> {
    setTagFilter([])
  }, [anchorEl])

  const onCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tagFilter.some(tag => String(tag.id) === e.target.value)){

      setTagFilter(prevTags => 
        prevTags.filter(tag => String(tag.id) === e.target.value)
      )

    }else{

      setTagFilter(prevTags => 
        [
          ...prevTags, 
          tags.find(tag => String(tag.id) === e.target.value) as Tags
        ])

    }
  }

  const removeFilter = () => {
    onSettingChange('tagFilter', [])
    handleClose()
  }

  const setFilter = () => {
    onSettingChange('tagFilter', tagFilter)
    handleClose()
  }

  const open = Boolean(anchorEl);

  return (
    <div>
      <ButtonComponent disabled={Boolean(!tags.length)} size='small' onClick={handleClick}>
        {title}
      </ButtonComponent>
      <Popover
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Box display='flex' justifyContent='center' flexDirection='column' sx={{p: 1}}>
            <FormGroup>
                <Box display='flex' justifyContent='space-between'>
                    {tags.map((tag, index) => (
                        <Checkbox
                            key={index}
                            style={{ color: tag.color }}
                            value={tag.id}
                            onChange={onCheckBoxChange}
                        />
                    ))}
                </Box>
            </FormGroup>
            <Box>
              <Button onClick={setFilter}>
                  {t('Settings.select')} 
              </Button>
              <Button onClick={removeFilter}>
                {t('Settings.remove')}  
              </Button>
            </Box>
        </Box>
      </Popover>
    </div>
  );
}

export default memo(FilterPopover)