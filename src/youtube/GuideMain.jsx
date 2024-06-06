import * as React from 'react'
import Stack from '@mui/material/Stack'
import AppContext from '../app/AppContext'
import MenuConfig from '../nav/MenuConfig.jsx'
import LPTVheader from '../assets/LPTVlogo-tvset'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import GuideItem from './GuideItem.jsx'
import dayjs from 'dayjs'
import {useContext, useState} from 'react'

export default function GuideMain() {

    const menuConfig = MenuConfig()
    const {beta} = useContext(AppContext)
    const [openTitle, setOpenTitle] = useState('More from LPU') // TODO: don't do this once there are more

    const now = dayjs().format('h:mma')

    return (
        <Stack direction='column' style={{minWidth: 250}}>
            <div style={{
                padding: '12px 0px 6px 10px',
                margin: '0px',
                backgroundColor: '#292929',
                borderBottom: '1px solid #000',
                display:'flex'
            }}>
                <div style={{marginLeft:5}}>
                    <LPTVheader fill={'#fff'} style={{width: 110, position: 'relative'}}/>
                </div>
                <div style={{width: 200, marginLeft: 30, marginRight:10, paddingTop: 32, lineHeight: '1.3rem'}}>
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
                                    <GuideItem
                                        key={index}
                                        menuItem={menuItem}
                                        openTitle={openTitle}
                                        onOpen={setOpenTitle}
                                        onClose={null}
                                        index={index}
                                    />
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div style={{height: 6}}/>

            </div>
        </Stack>    )
}
