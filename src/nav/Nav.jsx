import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ScrollToTopButton from './ScrollToTopButton'
import VersionCheckerCode from '../app/VersionCheckerCode.jsx'
import Tracker from '../app/Tracker.jsx'
import LPTVlogo from '../assets/LPTVlogo2-w.jsx'
import SearchBox from './SearchBox.jsx'
import SortButton from '../filters/SortButton.jsx'
import {channelSortFields} from '../data/sortFields'

function Nav({extras}) {
    return (
        <React.Fragment>
            <AppBar position='fixed' style={{display:'flex', placeItems:'center'}}>
                <div style={{padding: 10, width:'100%', maxWidth:1200}}>

                    <div style={{display: 'flex', width:'100%', marginTop:5}}>
                        <div style={{marginRight: 20, marginLeft:5}}>
                            <LPTVlogo height={40}/>
                        </div>
                        <div style={{marginRight: 10, flexGrow: 1}}>
                            <SearchBox label='Channels'/>
                        </div>
                        <div style={{}}>
                            <SortButton sortValues={channelSortFields}/>
                        </div>
                        <div style={{
                            fontWeight: 500,
                            fontSize: '1.5rem',
                        }}>
                            <VersionCheckerCode/>
                        </div>
                    </div>
                    {extras}

                </div>
            </AppBar>

            {/* Dummy toolbar to help content place correctly below this */}
            <Toolbar style={{backgroundColor: 'rgba(255, 255, 255, 0.09)'}}/>

            <ScrollToTopButton/>
            <Tracker feature='nav'/>

        </React.Fragment>
    )
}

export default Nav
