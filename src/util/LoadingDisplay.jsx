import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import {circularProgressClasses} from '@mui/material'
import TvStatic from '../assets/tv-static-300-8.gif'

function LoadingDisplay() {
    return (
        <React.Fragment>
            <div style={{
                display: 'flex',
                placeItems: 'center',
                width: '100%',
                textAlign: 'center',
                marginRight: 'auto',
                marginLeft: 'auto',
            }}>
                <div style={{
                    width: 272,
                    paddingLeft: 20
                }}>
                    <img src={TvStatic} alt='Loading' width='272' height='300'/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoadingDisplay
