import React, {useContext} from 'react'
import AdminStatsTable from '../AdminStatsTable'
import useWindowSize from '../../util/useWindowSize'
import LoadingContext from '../../youtubeContext/LoadingProvider.jsx'

const TopUrlsTable = ({data}) => {
    const {openedUrls} = data
    const {getChannelFromId} = useContext(LoadingContext)

    const topN = 25

    let urlViews = {}
    let urlSubscribes = {}
    Object.keys(openedUrls)
        .map(url => {
            const views = openedUrls[url]
            let channelId
            let channelName
            const subscibeView = url.includes('view_as=subscriber')
            url = url.replace('?view_as=subscriber', '')
            for (const match of url.matchAll(/www.youtube.com\/(@.*)/g)) {
                channelName = match[1]
            }
            for (const match of url.matchAll(/www.youtube.com\/channel\/(.*)/g)) {
                channelId = match[1]
            }
            channelName = channelId ? getChannelFromId(channelId)?.snippet?.customUrl : channelName
            const cleanUrl = channelName ? `www.youtube.com/${channelName}` : url

            urlViews[cleanUrl] = urlViews[cleanUrl] ? urlViews[cleanUrl] + views : views
            urlSubscribes[cleanUrl] = subscibeView
                ? urlSubscribes[cleanUrl]
                    ? urlSubscribes[cleanUrl] + views
                    : views
                : urlSubscribes[cleanUrl]
        })

    const rows = Object.keys(urlViews)
        .map(url => {
            return {
                url: url,
                views: urlViews[url],
                subscribeViews: urlSubscribes[url]
            }
        })
        .sort((a, b) => {
            return b.views - a.views
        })
        .slice(0, topN)
        .map((row, index) => {
            return {
                ...row,
                rank: index + 1
            }
        })

    const columns = [
        {
            'name': 'Rank',
            'align': 'center',
            'id': 'rank'
        },
        {
            'align': 'left',
            'id': 'url',
            'name': 'URL'
        },
        {
            'align': 'center',
            'id': 'views',
            'name': 'Total Views'
        },
        {
            'align': 'center',
            'id': 'subscribeViews',
            'name': 'Subscribe Views'
        }
    ]

    const topUrls = {
        data: rows,
        columns: columns
    }

    const {width} = useWindowSize()
    const mobile360 = width <= 360
    const mobile395 = width <= 395
    const mobile428 = width <= 428  // but test also at 412
    const window560 = width <= 560
    const window820 = width <= 820

    const fontSize = mobile360 ? '.8rem'
        : mobile395 ? '.85rem'
            : mobile428 ? '.9rem'
                : window560 ? '.95rem'
                    : window820 ? '.95rem'
                        : '.95rem'

    const tableWidth = '100%'

    return (
        <AdminStatsTable tableData={topUrls} tableWidth={tableWidth} fontSize={fontSize} wrap={true}/>
    )
}

export default TopUrlsTable
