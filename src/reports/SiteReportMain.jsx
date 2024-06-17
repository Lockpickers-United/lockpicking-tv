import React from 'react'
import LoadingDisplay from '../util/LoadingDisplay'
import useData from '../util/useData'
import usePageTitle from '../util/usePageTitle'
import useWindowSize from '../util/useWindowSize'
import dayjs from 'dayjs'
import {siteFull} from '../data/dataUrls'
import PageViewsLine from './siteReport/PageViewsLine.jsx'
import FirstVisitsLastSevenTable from './siteReport/FirstVisitsLastSevenTable'
import PageTrackingTable from './siteReport/PageTrackingTable'
import SiteReportSummary from './siteReport/SiteReportSummary'
import PopularCountries from './siteReport/PopularCountries'
import TopUrlsTable from './siteReport/TopUrlsTable.jsx'

function SiteReportMain() {
    usePageTitle('Site Report')
    const {data, loading, error} = useData({urls})
    const {siteFull} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

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
    else if (error) return null
    else if (jsonLoaded) return (
        <div style={{
            minWidth: '320px', maxWidth: 1000, height: '100%',
            padding: pagePadding, backgroundColor: '#292929',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8
        }}>

            {!!siteFull?.firstVistsLastSevenDays?.countryCount &&
                <React.Fragment>
                    <div style={firstHeaderStyle}>First Visits (Last Seven Days)</div>
                    <FirstVisitsLastSevenTable data={siteFull} tableWidth={'50%'}/>
                </React.Fragment>
            }

            <div style={summaryHeaderStyle}>
                Site Summary<br/>
                <span style={{fontSize: '0.85rem'}}>{updateTime}</span>
            </div>
            <SiteReportSummary data={siteFull}/>

            <div style={headerStyle}>Weekly Page Views</div>
            <PageViewsLine data={siteFull}/>

            <div style={headerStyle}>Page Tracking</div>
            <PageTrackingTable data={siteFull}/>

            <div style={headerStyle}>Top Exit URLs</div>
            <TopUrlsTable data={siteFull}/>

            {!!siteFull?.popularCountries1 &&
                <React.Fragment>
                    <div style={headerStyle}>Popular Countries</div>
                    <PopularCountries data={siteFull}/>
                </React.Fragment>
            }

        </div>
    )
}

const urls = {
    siteFull
}

export default SiteReportMain
