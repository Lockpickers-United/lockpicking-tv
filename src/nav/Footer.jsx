import React from 'react'
import Typography from '@mui/material/Typography'
import ToggleColorMode from './ToggleColorMode'
import {openInNewTab} from '../util/openInNewTab'


function Footer({hide, extras}) {

    console.log(hide)

    return (
        <React.Fragment>
            {!hide &&
                <Typography align='center' component='div' style={{marginTop: 16, marginBottom: 80, color: '#121212'}}>
                    <span style={{fontSize: '0.85rem', fontWeight: 600}}>founders</span><br/>
                    <a onClick={() => {
                        openInNewTab('https://www.youtube.com/@thecompguy')
                    }} style={{color: '#121212', cursor: 'pointer'}}>
                        Adam Harris
                    </a>
                    &nbsp;•&nbsp;
                    <a onClick={() => {
                        openInNewTab('https://www.youtube.com/@LadyLocks')
                    }} style={{color: '#121212', cursor: 'pointer'}}>
                        Lady Locks
                    </a>
                    &nbsp;•&nbsp;
                    <a onClick={null} style={{color: '#121212'}}>
                        mgsecure
                    </a>

                    {extras}

                    <div style={{textAlign: 'center'}}>
                        {0 === 1 &&
                            <div style={{marginTop: '20px', display: 'flex', textAlign: 'center'}}>
                                <div style={{marginRight: 'auto', marginLeft: 'auto'}}>
                                    <ToggleColorMode/>
                                </div>
                            </div>
                        }
                    </div>

                    <img alt='LPTV' src='/i/temp.gif' height={0} width={0} id='trackImage'/>
                </Typography>
            }
        </React.Fragment>
    )
}

export default Footer
