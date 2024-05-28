import React, {useCallback, useContext, useState} from 'react'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Tooltip from '@mui/material/Tooltip'
import {useHotkeys} from 'react-hotkeys-hook'
import AppContext from '../app/AppContext'
import MainMenuItem from './MainMenuItem'
import MenuConfig from './MenuConfig.jsx'
import Button from '@mui/material/Button'
import LPTVlogo from '../assets/LPTVlogo2-w'
import LPTVheader from '../assets/LPTVlogo-tvset'
import DBContext from '../app/DBContext.jsx'

function MainMenu() {

    const menuConfig = MenuConfig()
    const {beta} = useContext(AppContext)
    const {admin} = useContext(DBContext)
    const [open, setOpen] = useState(false)
    const [openTitle, setOpenTitle] = useState('More from LPU') // TODO: don't do this once there are more

    const handleHotkey = useCallback(() => setOpen(!open), [open])
    useHotkeys('m', handleHotkey)

    const openDrawer = useCallback(() => {
        setOpen(true)

        // Clear current focus to prevent weird issues on mobile
        document.activeElement.blur()
    }, [])
    const closeDrawer = useCallback(() => setOpen(false), [])

    return (
        <React.Fragment>
            <Tooltip title='Main Menu' arrow disableFocusListener>
                <Button edge='start' color='inherit' onClick={openDrawer}
                            style={{ height: '30px', minWidth: '30px', margin:0, padding:0}}
                >
                    <LPTVlogo height={40}/>
                </Button>
            </Tooltip>

            <SwipeableDrawer
                anchor='left'
                open={open}
                onOpen={openDrawer}
                onClose={closeDrawer}
            >
                <Stack direction='column' style={{minWidth: 250}}>
                    <MenuItem onClick={closeDrawer} style={{
                        padding: '12px 0px 6px 10px',
                        margin: '0px',
                        backgroundColor: '#292929',
                        borderBottom: '1px solid #000'
                    }}>
                            <div style = {{marginRight: 'auto', marginLeft: 'auto',}}>
                                <LPTVheader fill={'#fff'} style={{width: 110, position:'relative'}}/>
                            </div>
                    </MenuItem>

                    {menuConfig
                        .filter(menuItem => beta || !menuItem.beta)
                        .filter(menuItem => admin || !menuItem.admin)
                        .map((menuItem, index) =>
                            <React.Fragment key={index}>
                                <MainMenuItem
                                    menuItem={menuItem}
                                    openTitle={openTitle}
                                    onOpen={setOpenTitle}
                                    onClose={closeDrawer}
                                />
                                <Divider style={{margin: 0}}/>
                            </React.Fragment>
                        )}
                </Stack>
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default MainMenu
