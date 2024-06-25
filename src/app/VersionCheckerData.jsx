import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CachedIcon from '@mui/icons-material/Cached'
import LoadingContext from '../context/LoadingContext.jsx'

function VersionCheckerData() {
    //if (import.meta.env.DEV) return null
    const handleClick = useCallback(() => location.reload(), [])

    const {newData} = useContext(LoadingContext)
    if (!newData) return null

    return (
        <Tooltip title='Click to load new videos' arrow disableFocusListener>
            <IconButton onClick={handleClick} style={{color: '#7272ce', marginLeft: 0}}>
                <CachedIcon/>
            </IconButton>
        </Tooltip>
    )
}

export default VersionCheckerData
