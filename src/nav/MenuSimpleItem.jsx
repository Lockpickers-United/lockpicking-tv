import ListItemIcon from '@mui/material/ListItemIcon'
import queryString from 'query-string'
import React, {useCallback, useContext} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {TableCell, TableRow} from '@mui/material'
import Button from '@mui/material/Button'
import FilterContext from '../context/FilterContext.jsx'

function MenuSimpleItem({menuItem, openTitle, onOpen, onClose, openInNewTab}) {
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
    }, [children, navigate, onClose, onOpen, openInNewTab, openTitle, params, path, title])

    const color = isCurrentRoute ? '#fff' : null
    const backgroundColor = children
        ? '#171717'
        : isCurrentRoute ? '#2e6787' : '#333'

    const hoverColor = isCurrentRoute ? 'inherit' : '#5a5a5a'

    const coloredIcon = icon
        ? React.cloneElement(icon, {style: {color}})
        : null

    return (
        <React.Fragment>
            {separator &&
                <TableRow>
                    <TableCell style={{padding: 0}}>
                        <div style={{height: 1}}/>
                    </TableCell>
                </TableRow>
            }

            <TableRow
                key={menuItem}
            >
                <TableCell sx={{border: '2px solid #000', borderRight: '1px solid #000', padding: 0}}
                           style={{backgroundColor}}>
                    <Button
                        onClick={handleClick}
                        fullWidth={true}
                        disabled={!!children}
                        startIcon={<ListItemIcon style={{height: 20, width: 20, minWidth: 20, marginLeft:5}}>{coloredIcon}</ListItemIcon>}
                        style={{
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
                <MenuSimpleItem
                    child
                    menuItem={childItem}
                    openTitle={openTitle}
                    onOpen={onOpen}
                    onClose={onClose}
                    key={childIndex}
                    index={childIndex}
                    openInNewTab={openInNewTab}
                />
            )}

        </React.Fragment>
    )
}

export default MenuSimpleItem
