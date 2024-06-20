import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import {channelReportData} from '../data/dataUrls'
import useData from '../util/useData.jsx'
import ChannelDataGrid from './channelReport/ChannelDataGrid.jsx'
import ChannelReportChannelsLine from './channelReport/ChannelsLine.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import ChannelStats from './channelReport/ChannelStats.jsx'

const urls = {channelReportData}

function ChannelReportMain() {

    const {data, loading, error} = useData({urls})
    const {channelReportData} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    // console.log('channelReportData', channelReportData)

    const {channelLines} = jsonLoaded ? channelReportData : {channelLines:[]}
    const {channelStats} = jsonLoaded ? channelReportData : {channelStats:[]}
    const {channelTitles} = jsonLoaded ? channelReportData : {channelTitles:[]}

    const headerStyle = {margin: '46px 0px 18px 0px', width: '100%', textAlign: 'center', color: '#fff'}

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    if (loading) return <LoadingDisplay/>
    else if (error) return null
    else if (jsonLoaded) return (
        <div style={{
            minWidth: '320px', maxWidth: 1200, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>
            <div style={headerStyle}>Channel Counts</div>
            <ChannelReportChannelsLine lineData={channelLines}/>

            <div style={headerStyle}>Individual Channel Stats</div>
            <ChannelStats channelStats={channelStats} channelTitles={channelTitles}/>

            <div style={headerStyle}>Current Channel Data</div>
            <ChannelDataGrid/>
        </div>
    )
}

export default ChannelReportMain
