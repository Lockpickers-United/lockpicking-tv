import React, {useContext} from 'react'
import AdminStatsTable from '../AdminStatsTable'
import useWindowSize from '../../util/useWindowSize'
import ReportingContext from '../../youtubeContext/ReportingProvider.jsx'

const SiteComponent = ({data}) => {
    const {playlistViews} = data

    const {pageIndex, getPageIdFromPartialId, channelIndex} = useContext(ReportingContext)

    const topN = 25

    let missingPlaylists = []
    const rows = Object.keys(playlistViews)
        .map(playlistIdString => {

            console.log(playlistIdString, playlistIdString.split('&'))

            const thisParentId = playlistIdString.includes('&')
                ? playlistIdString.split('&')[0]
                : undefined
            const playlistId = playlistIdString.includes('&')
                ? playlistIdString.split('&')[1]
                : playlistIdString
            const fullPageId = thisParentId
                ? 'pl_' + thisParentId + '_' + playlistId
                : playlistId

            const thisPlaylist = pageIndex[fullPageId] ? pageIndex[fullPageId] : pageIndex[getPageIdFromPartialId(fullPageId)]

            const parentPage = thisParentId
                ? pageIndex[thisParentId]
                : thisPlaylist
                    ? pageIndex[thisPlaylist.parentId]
                    : undefined

            const playlistTitle = parentPage && thisPlaylist
                ? parentPage.title + ' > ' + thisPlaylist.title
                : thisPlaylist
                    ? thisPlaylist.title
                    : playlistIdString

            if (!thisPlaylist) {
                missingPlaylists.push(playlistIdString)
            }

            const unknownString = playlistIdString.length > 40 ? playlistIdString.substring(0, 40) + '...' : playlistIdString
            return thisPlaylist
                ? {
                    title: playlistTitle,
                    channel: channelIndex[thisPlaylist.channelId].title,
                    views: playlistViews[playlistIdString]
                }
                : {
                    title: `(${unknownString})`,
                    channel: '',
                    views: playlistViews[playlistIdString]
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

    console.log('missingPlaylists', missingPlaylists)

    const columns = [
        {
            'name': 'Rank',
            'align': 'center',
            'id': 'rank'
        },
        {
            'align': 'left',
            'id': 'title',
            'name': 'Title'
        },
        {
            'align': 'left',
            'id': 'channel',
            'name': 'Channel'
        },
        {
            'align': 'center',
            'id': 'views',
            'name': 'Views'
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

export default SiteComponent
