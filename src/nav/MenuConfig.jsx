import React, {useContext} from 'react'
import config from '../app/config'
import GradeIcon from '@mui/icons-material/Grade'
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LoadingContext from '../youtubeContext/LoadingProvider.jsx'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InfoIcon from '@mui/icons-material/Info'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import InsightsIcon from '@mui/icons-material/Insights'

function MenuConfig() {

    const {pageNavData} = useContext(LoadingContext)

    const menuSections = {
        channelItems: [
            {
                separator: true,
                title: 'Featured Channels',
                icon: <GradeIcon fontSize='small'/>,
                path: '/channels?page=featured'
            },
            {
                title: 'New & Noteworthy',
                icon: <BabyChangingStationIcon fontSize='small'/>,
                path: '/channels?page=newChannels'
            },
            {
                title: 'Full Directory',
                icon: <MenuBookIcon fontSize='small'/>,
                path: '/channels?page=full'
            }
        ]
    }

    menuSections.videoItems = [
        {
            separator: true,
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

    menuSections.pageItems = pageNavData
        .filter(page => {
            return page.id.substring(0, 3) !== 'pl_'
        })
        .map((page, index) => {
            const safeName = page.title.replace(/[\s/]/g, '_').replace(/\W/g, '')

            const separator = index === 0

            const pageIcon = page.type === 'multipleplaylists'
                ? <PlaylistPlayIcon fontSize='small'/>
                : <PlayCircleOutlineIcon fontSize='small'/>

            const pageRoute = page.type === 'multipleplaylists'
                ? 'pages'
                : 'playlist'

            return {
                title: page.title,
                separator: separator,
                icon: pageIcon,
                path: `/${pageRoute}?page=${page.id}&name=${safeName}`
            }
        })

    menuSections.siteItems = [
        {
            separator: true,
            full: true,
            title: 'About lockpicking.tv',
            icon: <InfoIcon fontSize='small'/>,
            path: '/about'
        },
        {
            full: true,
            title: 'Submit Channel / Opt Out',
            icon: <MailOutlineIcon fontSize='small'/>,
            path: '/contact'
        },
        {
            full: true,
            title: 'Privacy Policy',
            icon: <AccountCircleIcon fontSize='small'/>,
            path: '/privacy'
        }
    ]

    menuSections.reportItems = [
        {
            separator: true,
            beta: true,
            full: true,
            title: 'Channel Report',
            icon: <InsightsIcon fontSize='small'/>,
            path: '/channelreport'
        },
        {
            full: true,
            beta: true,
            title: 'Site Report',
            icon: <AssessmentOutlinedIcon fontSize='small'/>,
            path: '/sitereport'
        }
    ]

    menuSections.moreItems = {
        title: 'More locksport info',
        icon: <LockIcon fontSize='small'/>,
        separator: true,
        full: true,
        expanded: true,
        children: [
            {
                icon: <OpenInNewIcon fontSize='small' color='disabled'/>,
                title: 'LPUbelts.com',
                path: 'https://lpubelts.com'
            },
            {
                icon: <OpenInNewIcon fontSize='small' color='disabled'/>,
                title: 'Reddit r/lockpicking',
                path: 'https://www.reddit.com/r/lockpicking/'
            }
        ]
    }

    const menu = config.menu.sections.reduce((acc, sectionName) => {
        const section = menuSections[sectionName]
        acc.push(section)
        return acc
    }, [])
    menu[0].separator = false

    return menu.flat()

}

export default MenuConfig