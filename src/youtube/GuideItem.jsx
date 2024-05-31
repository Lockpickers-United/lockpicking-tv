import ListItemIcon from '@mui/material/ListItemIcon'
import queryString from 'query-string'
import React, {useCallback, useContext} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {TableCell, TableRow} from '@mui/material'
import Button from '@mui/material/Button'
import FilterContext from '../context/FilterContext.jsx'

function GuideItem({menuItem, openTitle, onOpen, onClose, child, index}) {
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = queryString.parse(location.search)
    const {children, title, params, path, icon, separator} = menuItem

    const {filters} = useContext(FilterContext)
    const {page} = filters


    const isCurrentPage = path?.includes(page)

    const isCurrentPath = location.pathname === path
    const isCurrentParams = Object.keys(params || [])
        .every(key => params[key] === searchParams[key])
    const isCurrentRoute = (isCurrentPath && isCurrentParams) || isCurrentPage

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const handleClick = useCallback(() => {
        if (children) {
            const isOpen = openTitle === title
            onOpen(isOpen ? null : title)
        } else if (path.includes('http')) {
            openInNewTab(path)
        } else {
            onClose()
            const url = params
                ? `${path}?${queryString.stringify(params)}`
                : path
            navigate(url)
            window.scrollTo({top: 0})
        }
    }, [children, navigate, onClose, onOpen, openTitle, params, path, title])

    const color = isCurrentRoute ? '#4691ba' : null
    const backgroundColor = children
        ? '#171717'
        : isCurrentRoute ? '#2e6787' : '#333'

    const hoverColor = isCurrentRoute ? 'inherit' : '#5a5a5a'

    const channelNumber = child || children
        ? 900 + index
        : 800 + index

    const coloredIcon = icon
        ? React.cloneElement(icon, {style: {color}})
        : null

    return (
        <React.Fragment>
            {separator &&
                <TableRow>
                    <TableCell>
                        <div style={{height: 1}}/>
                    </TableCell>
                </TableRow>
            }

            <TableRow
                key={menuItem}
            >
                <TableCell component='th' scope='row'
                           sx={{border: '4px solid #000', width: 80, backgroundColor: '#171717'}}>
                    <div style={{display: 'flex', width: 65}}>
                        <b>{channelNumber}</b>
                        {coloredIcon &&
                            <ListItemIcon style={{height: 20, marginLeft: 20, width: 40}}>
                                {coloredIcon}
                            </ListItemIcon>
                        }
                    </div>
                </TableCell>
                <TableCell sx={{border: '4px solid #000', borderRight: '8px solid #000', padding: 0}}
                           style={{backgroundColor}}>
                    <Button
                        onClick={handleClick}
                        fullWidth={true}
                        sx={{
                            justifyContent: 'flex-start',
                            width: '100%', margin: 0, borderRadius: 0,
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: hoverColor
                            }
                        }}
                    >
                        {title}
                    </Button>
                </TableCell>
            </TableRow>


            {children && children.map((childItem, childIndex) =>
                <GuideItem
                    child
                    menuItem={childItem}
                    openTitle={openTitle}
                    onOpen={onOpen}
                    onClose={onClose}
                    key={childIndex}
                    index={childIndex}
                />
            )}

        </React.Fragment>
    )
}

export default GuideItem
