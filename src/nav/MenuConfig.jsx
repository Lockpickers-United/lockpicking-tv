import React, {useContext} from 'react'
import LPU_logo from '../assets/LPU_logo'
import GradeIcon from '@mui/icons-material/Grade'
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LoadingContext from '../youtubeContext/LoadingProvider.jsx'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'

function MenuConfig() {

    const {pageNavData} = useContext(LoadingContext)

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

    const pageItems = pageNavData.map(page => {
        const safeName = page.title.replace(/[\s/]/g, '_').replace(/\W/g, '')

        const pageIcon = page.type === 'multipleplaylists'
            ? <PlaylistPlayIcon fontSize='small'/>
            : <PlayCircleOutlineIcon fontSize='small'/>

        return {
            title: page.title,
            icon: pageIcon,
            path: `/pages?page=${page.id}&name=${safeName}`
        }
    })

    return (
        [
            ...channelItems,
            ...pageItems,
            {
                title: 'More from LPU',
                icon: <LPU_logo style={{height: 20}}/>,
                separator: true,
                expanded: true,
                children: [
                    {
                        title: 'LPUbelts.com',
                        path: 'https://lpubelts.com/'
                    },
                    {
                        title: 'LPUlocks.com',
                        path: 'https://lpulocks.com/'
                    },
                    {
                        title: 'LPU YouTube',
                        path: 'https://www.youtube.com/channel/UCHEPEHbo6kAxsxvIePE9kRw'
                    }
                ]
            }
        ]
    )
}

export default MenuConfig