import React, {useContext} from 'react'
import Typography from '@mui/material/Typography'
import ToggleBetaButton from './ToggleBetaButton'
import ToggleColorMode from './ToggleColorMode'
import AuthContext from '../app/AuthContext.jsx'
import FirebaseTestButton from './FirebaseTestButton.jsx'

function Footer({extras}) {
    const {user} = useContext(AuthContext)

    return (
        <Typography align='center' component='div' style={{marginTop: 16, marginBottom: 80, color:'#121212'}}>
            <a href='https://discord.gg/lockpicking' target='_blank' rel='noopener noreferrer' style={{color:'#121212'}}>
                LPU Discord
            </a>
            &nbsp;•&nbsp;
            <a href='https://www.reddit.com/r/lockpicking/' target='_blank' rel='noopener noreferrer' style={{color:'#121212'}}>
                Reddit
            </a>
            &nbsp;•&nbsp;
            <a href='/#/privacy' style={{color:'#121212'}}>
                Privacy
            </a>

            {extras}

            <div style={{textAlign: 'center'}}>
                {user?.uid === 'ClbjuilBEHgbzO4UZl4y3GStlEz2' &&
                    <div style={{marginTop: '20px', display: 'flex', textAlign: 'center'}}>
                        <div style={{marginRight: 'auto', marginLeft: 'auto'}}>
                            <ToggleColorMode/>
                        </div>
                    </div>
                }
            </div>
        </Typography>


    )
}

export default Footer
