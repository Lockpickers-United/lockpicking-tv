import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ScrollToTopButton from './ScrollToTopButton'
import VersionCheckerCode from '../app/VersionCheckerCode.jsx'
import VersionCheckerData from '../app/VersionCheckerData.jsx'
import Tracker from '../app/Tracker.jsx'
import SearchBox from './SearchBox.jsx'
import GuideMenu from '../youtube/GuideMenu.jsx'
import GuideFull from '../youtube/GuideFull.jsx'

function Nav({extras, noSearch}) {

    const searchBox = noSearch ? null : <SearchBox label=''/>
    return (
        <React.Fragment>
            <AppBar position='fixed' style={{display: 'flex', placeItems: 'center'}} id='appBar'>
                <div style={{padding: 10, width: '100%', maxWidth: 1200}}>
                    <div style={{display: 'flex', width: '100%', marginTop: 5}}>
                        <div style={{marginRight: 20, marginLeft: 5}}>
                            <GuideMenu/>
                        </div>
                        <div style={{marginRight: 10, flexGrow: 1}}>
                            {searchBox}
                        </div>
                        <div style={{
                            fontWeight: 500,
                            fontSize: '1.5rem'
                        }}>
                            <VersionCheckerData/>
                            <VersionCheckerCode/>
                            <Tracker feature='nav'/>
                        </div>
                        <div style={{}}>
                            {extras}
                        </div>
                    </div>
                </div>
            </AppBar>

            {/* Dummy toolbar to help content place correctly below this */}
            <Toolbar style={{backgroundColor: 'rgba(255, 255, 255, 0.09)', minHeight: 61}}/>

            <ScrollToTopButton/>
            <GuideFull/>

        </React.Fragment>
    )
}

export default Nav
