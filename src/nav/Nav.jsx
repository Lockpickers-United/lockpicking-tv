import React, {useContext} from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ScrollToTopButton from './ScrollToTopButton'
import VersionCheckerCode from '../app/VersionCheckerCode.jsx'
import VersionCheckerData from '../app/VersionCheckerData.jsx'
import SearchBox from './SearchBox.jsx'
import MenuGuide from './MenuGuide.jsx'
import MenuSimple from './MenuSimple.jsx'
//import GuideFull from './GuideFull.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import config from '../app/config'
import FilterContext from '../context/FilterContext.jsx'

function Nav({extras, noSearch, noMenu}) {

    const {menuStyle} = config

    const {filters = {}} = useContext(FilterContext)
    const {guide} = filters

    const {width} = useWindowSize()
    const smallWindow = width < 800
    const showGuideFull = !smallWindow && menuStyle === 'guide' && !guide

    const searchBox = noSearch ? null : <SearchBox label=''/>
    return (
        <React.Fragment>
            <AppBar position='fixed' style={{display: 'flex', placeItems: 'center', minHeight:61}} id='appBar'>
                <div style={{padding: 10, width: '100%', maxWidth: 1200}}>
                    <div style={{display: 'flex', width: '100%', marginTop: 5}}>
                        {!noMenu &&
                            <div style={{marginRight: 20, marginLeft: 5}}>
                                {showGuideFull &&
                                    <MenuGuide/>
                                }
                                {(!showGuideFull && menuStyle === 'guide') &&
                                    <MenuGuide/>
                                }
                                {(!showGuideFull && menuStyle !== 'guide') &&
                                    <MenuSimple/>
                                }
                            </div>
                        }
                        <div style={{marginRight: 10, flexGrow: 1}}>
                            {searchBox}
                        </div>
                        <div style={{
                            fontWeight: 500,
                            fontSize: '1.5rem'
                        }}>
                            <VersionCheckerData/>
                            <VersionCheckerCode/>
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

        </React.Fragment>
    )
}

export default Nav
