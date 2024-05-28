import React, {useContext} from 'react'
import LPU_logo from '../assets/LPU_logo'
import GradeIcon from '@mui/icons-material/Grade'
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import LoadingContext from '../youtubeContext/LoadingProvider.jsx'

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
            path: '/new',
        },
        {
            title: 'Full Directory',
            icon: <MenuBookIcon fontSize='small'/>,
            path: '/full',
        }
    ]

    const pageItems = pageNavData.map( page => {
        return {
            title: page.title,
            icon: <KeyboardArrowRightIcon fontSize='small'/>,
            path: `/pages?page=${page.id}&id=0`
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
                        title: 'Reddit',
                        path: 'https://www.reddit.com/r/lockpicking/'
                    }
                ]
            }
        ]
    )
}

export default MenuConfig