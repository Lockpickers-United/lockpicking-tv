import * as React from 'react'
import Stack from '@mui/material/Stack'
import AppContext from '../app/AppContext.jsx'
import MenuConfig from './MenuConfig.jsx'
import LPTVheader from '../assets/LPTVlogo-tvset.jsx'
import {Drawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import GuidePageItem from './GuidePageItem.jsx'
import dayjs from 'dayjs'
import {useCallback, useContext, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterContext from '../context/FilterContext.jsx'
import {openInNewTab} from '../util/openInNewTab'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import LPTVlogo from '../assets/LPTVlogo2-w.jsx'

export default function GuideFull() {

    const menuConfig = MenuConfig()
    const {beta} = useContext(AppContext)
    const [openTitle, setOpenTitle] = useState('More from LPU') // TODO: don't do this once there are more

    const {filters} = useContext(FilterContext)
    const {guide} = filters

    const {width} = useWindowSize()
    const smallWindow = width <= 800
    const showGuide = !!guide && !smallWindow

    const [open, setOpen] = useState(showGuide)

    const openDrawer = useCallback(() => {
        setOpen(true)
        // Clear current focus to prevent weird issues on mobile
        document.activeElement.blur()
    }, [])

    const closeDrawer = useCallback(() => setOpen(false), [])

    const now = dayjs()
    const nowString = now.format('h:mma')
    const minute = now.minute()
    const nextMinutes = minute < 30
        ? 30 - minute
        : 60 - minute
    const times = [
        now.add(nextMinutes, 'minute').format('h:mma'),
        now.add(nextMinutes + 30, 'minute').format('h:mma'),
        now.add(nextMinutes + 60, 'minute').format('h:mma')
    ]

    const single = smallWindow
    const headerPadding = smallWindow ? '22px 10px 10px 10px' : '22px 50px 10px 10px'

    const introCopy = smallWindow
        ? 'Showcasing video content from across the locksport community. Remember, never pick a lock in use & never pick a lock you don\'t own.'
        : 'This site is an educational resource for those involved in the hobby of lockpicking and lock manipulation. ' +
        'Please note that it is illegal in many areas for non-professional to pick locks that are actively securing something. ' +
        'Respect the cardinal rules of locksport: never pick a lock in use, never pick a lock you don\'t own.'

    //const handleGuideClose = useCallback(() => setGuideOpen(false),[setGuideOpen])

    return (
        <React.Fragment>
            <Tooltip title='Guide' arrow disableFocusListener>
                <Button edge='start' color='inherit' onClick={openDrawer}
                        style={{height: '30px', minWidth: '30px', margin: 0, padding: 0}}
                >
                    <LPTVlogo height={40} fill={'#fff'}/>
                </Button>
            </Tooltip>

            <Drawer
                anchor='top'
                open={open}
                onOpen={openDrawer}
                onClose={closeDrawer}
            >

                <Stack direction='column' style={{minWidth: 250}}>
                    <div onClick={closeDrawer} style={{
                        padding: headerPadding,
                        margin: '0px',
                        backgroundColor: '#292929',
                        borderBottom: '1px solid #000',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <div style={{marginLeft: 5, paddingTop: 0}}>
                            <LPTVheader style={{width: 110, position: 'relative'}}/>
                        </div>
                        <div style={{
                            width: '100%',
                            marginLeft: 30,
                            lineHeight: '1.3rem'
                        }}>
                            <span style={{fontSize: '1.1rem', fontWeight: 600}}>lockpicking.tv</span><br/>
                            {introCopy}
                        </div>
                    </div>

                    <div style={{backgroundColor: '#000'}}>

                        <TableContainer>
                            <Table style={{backgroundColor: '#000'}} sx={{border: '1px solid #000'}} size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{padding: '0px 0px 0px 14px', fontWeight: 600}}>Today</TableCell>
                                        {!single &&
                                            <TableCell
                                                sx={{
                                                    padding: '0px 0px 0px 10px',
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    border: 0
                                                }}>
                                                <div style={{width: '25%'}}>{nowString}</div>
                                                <div style={{width: '25%'}}>{times[0]}</div>
                                                <div style={{width: '25%'}}>{times[1]}</div>
                                                <div style={{width: '25%'}}>{times[2]}</div>
                                            </TableCell>
                                        }
                                        {single &&
                                            <TableCell
                                                sx={{padding: '0px 0px 0px 10px', fontWeight: 600, display: 'flex'}}>
                                                <div style={{width: '100'}}>{nowString}</div>
                                            </TableCell>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {menuConfig
                                        .filter(menuItem => beta || !menuItem.beta)
                                        .map((menuItem, index) =>
                                            <GuidePageItem
                                                key={index}
                                                menuItem={menuItem}
                                                openTitle={openTitle}
                                                onOpen={setOpenTitle}
                                                onClose={closeDrawer}
                                                index={index}
                                                single={single}
                                                openInNewTab={openInNewTab}
                                            />
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{height: 6}}/>
                    </div>
                </Stack>
            </Drawer>
        </React.Fragment>
    )
}
