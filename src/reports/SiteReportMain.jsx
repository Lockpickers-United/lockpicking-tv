import React, {useContext} from 'react'
import LoadingDisplay from '../util/LoadingDisplay'
import usePageTitle from '../util/usePageTitle'
import useWindowSize from '../util/useWindowSize'
import dayjs from 'dayjs'
import PageViewsLine from './siteReport/PageViewsLine.jsx'
import FirstVisitsLastSevenTable from './siteReport/FirstVisitsLastSevenTable'
import PageTrackingTable from './siteReport/PageTrackingTable'
import SiteReportSummary from './siteReport/SiteReportSummary'
import PopularCountries from './siteReport/PopularCountries'
import TopUrlsTable from './siteReport/TopUrlsTable.jsx'
import ToggleBetaButton from '../nav/ToggleBetaButton.jsx'
import HourlyRequestsLine from './siteReport/HourlyRequestsLine.jsx'
import TrafficStats from './siteReport/TrafficStats.jsx'
import TopVideosTable from './siteReport/TopVideosTable.jsx'
import SiteReportVideosSummary from './siteReport/SiteReportVideosSummary.jsx'
import ReportingContext from '../youtubeContext/ReportingProvider.jsx'
import TopPlaylistsTable from './siteReport/TopPlaylistsTable.jsx'


function SiteReportMain() {

    usePageTitle('Site Report')

    const {siteFull, siteSummary, videoIndex, allDataLoaded} = useContext(ReportingContext)

    const loading = !allDataLoaded

    const {width} = useWindowSize()
    const smallWindow = width < 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const firstHeaderStyle = {margin: '20px 0px 36px 0px', width: '100%', textAlign: 'center', color: '#fff'}
    const headerStyle = {margin: '46px 0px 18px 0px', width: '100%', textAlign: 'center', color: '#fff'}
    const summaryHeaderStyle = siteFull?.firstVistsLastSevenDays?.countryCount
        ? headerStyle
        : firstHeaderStyle

    const updateTime = loading ? '--'
        : '(updated: ' + dayjs(siteFull?.metadata.updatedDateTime).format('MM/DD/YY hh:mm') + ` ${siteFull?.metadata.timezone})`

    if (loading) return <LoadingDisplay/>

    else if (!loading) return (
        <div style={{
            minWidth: '320px', maxWidth: 1000, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, marginTop:0
        }}>

            {!!siteFull?.firstVistsLastSevenDays?.countryCount &&
                <React.Fragment>
                    <div style={firstHeaderStyle}>First Visits (Last Seven Days)</div>
                    <FirstVisitsLastSevenTable data={siteFull} tableWidth={'50%'}/>
                </React.Fragment>
            }

            <div style={summaryHeaderStyle}>
                <ToggleBetaButton/><br/>
                Site Summary<br/>
                <span style={{fontSize: '0.85rem'}}>{updateTime}</span>
            </div>
            <SiteReportSummary data={siteFull}/>


            <div style={headerStyle}>Weekly Page Views</div>
            <PageViewsLine data={siteFull}/>

            <div style={headerStyle}>Page Tracking</div>
            <PageTrackingTable data={siteFull}/>

            <div style={headerStyle}>Video Summary</div>
            <SiteReportVideosSummary data={siteFull}/>

            <div style={headerStyle}>Top Videos</div>
            <TopVideosTable data={siteFull} videoIndex={videoIndex}/>

            <div style={headerStyle}>Top Playlists</div>
            <TopPlaylistsTable data={siteFull}/>

            <div style={headerStyle}>Top Exit URLs</div>
            <TopUrlsTable data={siteFull}/>

            {!!siteFull?.popularCountries1 &&
                <React.Fragment>
                    <div style={headerStyle}>Popular Countries</div>
                    <PopularCountries data={siteFull}/>
                </React.Fragment>
            }

            <div style={headerStyle}>Hourly Traffic</div>
            <HourlyRequestsLine data={siteSummary}/>

            <div style={headerStyle}>Visits by Platform & Browser</div>
            <TrafficStats data={siteSummary}/>

        </div>
    )
}


export default SiteReportMain
