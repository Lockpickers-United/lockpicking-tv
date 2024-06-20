import React, {useContext} from 'react'
import AdminStatsTable from '../AdminStatsTable'
import useWindowSize from '../../util/useWindowSize'
import LoadingContext from '../../youtubeContext/LoadingProvider.jsx'

const Component = ({data}) => {
    const {watchedVideos} = data
    const {getVideosFromIds} = useContext(LoadingContext)

    const rows = Object.keys(watchedVideos)
        .map(videoId => {
            const [video] = getVideosFromIds(videoId)

            return video
            ? {
                title: video.title,
                channel: video.channelOwner,
                views: watchedVideos[videoId],
            }
            : {
                    title: `Unknown (id: ${videoId})`,
                    channel: '',
                    views: watchedVideos[videoId],
                }
        })
        .sort((a, b) => {
            return b.views - a.views
        })
        .slice(0, 50)
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

export default Component
