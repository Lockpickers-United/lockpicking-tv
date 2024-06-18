import Tooltip from '@mui/material/Tooltip'
import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import AppContext from '../app/AppContext'
import BoltIcon from '@mui/icons-material/Bolt'

function ToggleBetaButton() {
    const {beta, setBeta} = useContext(AppContext)

    const handleClick = useCallback(() => {
        setBeta(!beta)
    }, [beta, setBeta])

    return (
        <Tooltip title={`Toggle Nav Features ${beta ? 'Off' : 'On'}`} arrow disableFocusListener>
            <IconButton onClick={handleClick}>
                <BoltIcon fontSize='small' style={{color: beta ? '#459eea' : '#60289e'}}/>
            </IconButton>
        </Tooltip>
    )
}

export default ToggleBetaButton
