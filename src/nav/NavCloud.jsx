import React, {useCallback, useContext} from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ScrollToTopButton from './ScrollToTopButton'
import VersionCheckerCode from '../app/VersionCheckerCode.jsx'
import VersionCheckerData from '../app/VersionCheckerData.jsx'
import MenuGuide from './MenuGuide.jsx'
import MenuSimple from './MenuSimple.jsx'
//import GuideFull from './GuideFull.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import config from '../app/config'
import FilterContext from '../context/FilterContext.jsx'
import TagCloudDisplay from '../youtube/TagCloudDisplay.jsx'
import TagsProvider from '../youtubeContext/TagsProvider.jsx'

export default function NavCloud({noMenu, extras}) {

    const {menuStyle} = config
    const {filters = {}, addFilters} = useContext(FilterContext)
    const {guide} = filters

    const {tagCountData} = useContext(TagsProvider)

    const handleTagClick = useCallback(tag => {
        const filterValue = tag.replace(' ', '')
        addFilters([
            {key: 'make', value: filterValue}
        ], true)
    }, [addFilters])


    const {width} = useWindowSize()
    const smallWindow = width < 800
    const showGuideFull = !smallWindow && menuStyle === 'guide' && !guide

    return (
        <React.Fragment>
            <AppBar position='sticky' style={{display: 'flex', placeItems: 'center'}} id='appBar'>
                <Toolbar style={{padding: 0, display:'block'}}>
                    <div style={{display: 'flex', padding: 10, width: '100%', maxWidth: 1200}}>
                        <div style={{ width: '100%', marginTop: 5}}>
                            {!noMenu &&
                                <div style={{marginRight: 20, marginLeft: 5, float: 'left'}}>
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

                            <TagCloudDisplay tagData={tagCountData} handleTagClick={handleTagClick}/>
                            <div style={{
                                fontWeight: 500,
                                fontSize: '1.5rem'
                            }}>
                                <VersionCheckerData/>
                                <VersionCheckerCode/>
                            </div>

                        </div>
                        <div style={{display: 'inline-block', alignSelf: 'flex-end'}}>
                            {extras}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Dummy toolbar to help content place correctly below this
            <Toolbar style={{backgroundColor: 'rgba(255, 255, 255, 0.09)', minHeight: 61}}/>  */}

            <ScrollToTopButton/>

        </React.Fragment>
    )
}

