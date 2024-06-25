import React, {useCallback, useContext} from 'react'
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LoadingContext from '../context/LoadingContext.jsx'

function VersionCheckerCode() {
    //if (import.meta.env.DEV) return null

    const handleClick = useCallback(() => location.reload(), [])

    const {newCode} = useContext(LoadingContext)
    if (!newCode) return null

    return (
        <Tooltip title='New Version Available' arrow disableFocusListener>
            <IconButton onClick={handleClick} style={{color: 'green', marginLeft: 0}}>
                <SystemUpdateIcon/>
            </IconButton>
        </Tooltip>
    )
}

export default VersionCheckerCode
