import React, {useContext} from 'react'
import LPU_logo from '../assets/LPU_logo'
import GradeIcon from '@mui/icons-material/Grade'
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LoadingContext from '../youtubeContext/LoadingProvider.jsx'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import FavoriteIcon from '@mui/icons-material/Favorite'

function MenuConfig() {

    const {pageNavData} = useContext(LoadingContext)

    const videoItems = [
        {
            title: 'New Videos',
            icon: <NewReleasesIcon fontSize='small'/>,
            path: '/videos?page=newVideos'
        },
        {
            title: 'Popular Videos',
            icon: <FavoriteIcon fontSize='small'/>,
            path: '/videos?page=popular'
        }

    ]

    const channelItems = [
        {
            title: 'Featured Channels',
            icon: <GradeIcon fontSize='small'/>,
            path: '/featured'
        },
        {
            title: 'New & Noteworthy',
            icon: <BabyChangingStationIcon fontSize='small'/>,
            path: '/new'
        },
        {
            title: 'Full Directory',
            icon: <MenuBookIcon fontSize='small'/>,
            path: '/full'
        }
    ]

    const pageItems = pageNavData
        .filter(page => {
            return page.id.substring(0, 3) !== 'pl_'
        })
        .map(page => {
            const safeName = page.title.replace(/[\s/]/g, '_').replace(/\W/g, '')

            const pageIcon = page.type === 'multipleplaylists'
                ? <PlaylistPlayIcon fontSize='small'/>
                : <PlayCircleOutlineIcon fontSize='small'/>

            const pageRoute = page.type === 'multipleplaylists'
                ? 'pages'
                : 'playlist'

            return {
                title: page.title,
                icon: pageIcon,
                path: `/${pageRoute}?page=${page.id}&name=${safeName}`
            }
        })

    return (
        [
            ...videoItems,
            ...channelItems,
            ...pageItems,
            {
                title: 'More from LPU',
                icon: <LPU_logo style={{height: 20}}/>,
                separator: true,
                expanded: true,
                children: [
                    {
                        icon: <OpenInNewIcon fontSize='small' color='disabled'/>,
                        title: 'LPUbelts.com',
                        path: 'https://lpubelts.com/'
                    },
                    {
                        icon: <OpenInNewIcon fontSize='small' color='disabled'/>,
                        title: 'LPUlocks.com',
                        path: 'https://lpulocks.com/'
                    },
                    {
                        icon: <OpenInNewIcon fontSize='small' color='disabled'/>,
                        title: 'LPU YouTube',
                        path: 'https://www.youtube.com/channel/UCHEPEHbo6kAxsxvIePE9kRw'
                    }
                ]
            }
        ]
    )
}

export default MenuConfig