import React from 'react'
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
                    paddingLeft: 20,
                    marginRight: 'auto',
                    marginLeft: 'auto'
                }}>
                    <img src={TvStatic} alt='Loading' width='272' height='300'/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoadingDisplay
