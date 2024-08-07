import React, {useCallback, useContext, useState} from 'react'
import Stack from '@mui/material/Stack'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Tooltip from '@mui/material/Tooltip'
import {useHotkeys} from 'react-hotkeys-hook'
import AppContext from '../app/AppContext.jsx'
import MenuConfig from './MenuConfig.jsx'
import Button from '@mui/material/Button'
import LPTVlogo from '../assets/LPTVlogo2-w.jsx'
import LPTVheader from '../assets/LPTVlogo-tvset.jsx'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import MenuGuideItem from './MenuGuideItem.jsx'
import dayjs from 'dayjs'
import FilterContext from '../context/FilterContext.jsx'
import {openInNewTab} from '../util/openInNewTab'

function MenuGuide() {

    const menuConfig = MenuConfig()

    const {filters} = useContext(FilterContext)
    const {guide} = filters

    const showGuide = guide

    const {beta} = useContext(AppContext)
    const [open, setOpen] = useState(showGuide)
    const [openTitle, setOpenTitle] = useState('More from LPU') // TODO: don't do this once there are more
    const now = dayjs().format('h:mma')

    const handleHotkey = useCallback(() => setOpen(!open), [open])
    useHotkeys('g', handleHotkey)

    const openDrawer = useCallback(() => {
        setOpen(true)
        // Clear current focus to prevent weird issues on mobile
        document.activeElement.blur()
    }, [])

    const closeDrawer = useCallback(() => setOpen(false), [])

    return (
        <React.Fragment>
            <Tooltip title='Guide' arrow disableFocusListener>
                <Button edge='start' color='inherit' onClick={openDrawer}
                        style={{height: '30px', minWidth: '30px', margin: 0, padding: 0}}
                >
                    <LPTVlogo height={40} fill={'#fff'} color={'#fff'}/>
                </Button>
            </Tooltip>

            <SwipeableDrawer
                anchor='left'
                open={open}
                onOpen={openDrawer}
                onClose={closeDrawer}
            >
                <Stack direction='column' style={{minWidth: 250}}>
                    <div onClick={closeDrawer} style={{
                        padding: '12px 0px 6px 10px',
                        margin: '0px',
                        backgroundColor: '#292929',
                        borderBottom: '1px solid #000',
                        display: 'flex'
                    }}>
                        <div style={{marginLeft: 5}}>
                            <LPTVheader fill={'#fff'} color={'#fff'} style={{color:'#fff', width: 110, position: 'relative'}}/>
                        </div>
                        <div
                            style={{width: 200, marginLeft: 30, marginRight: 10, paddingTop: 32, lineHeight: '1.3rem'}}>
                            <span style={{fontSize: '1.1rem', fontWeight: 600}}>lockpicking.tv</span><br/>
                            Showcasing video content from across the locksport community.
                        </div>
                    </div>

                    <div style={{backgroundColor: '#000'}}>

                        <TableContainer>
                            <Table style={{backgroundColor: '#000'}} sx={{border: '1px solid #000'}} size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{padding: '0px 0px 0px 14px', fontWeight: 600}}>Today</TableCell>
                                        <TableCell sx={{padding: '0px 0px 0px 10px', fontWeight: 600}}>{now}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {menuConfig
                                        .filter(menuItem => beta || !menuItem.beta)
                                        .map((menuItem, index) =>
                                            <MenuGuideItem
                                                key={index}
                                                menuItem={menuItem}
                                                openTitle={openTitle}
                                                onOpen={setOpenTitle}
                                                onClose={closeDrawer}
                                                index={index}
                                                openInNewTab={openInNewTab}
                                            />
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div style={{height: 6}}/>

                    </div>
                </Stack>
                <img alt='LPTV' src='/i/temp.gif' height={0} width={0} id='trackImage'/>
            </SwipeableDrawer>

        </React.Fragment>
    )
}

export default MenuGuide
