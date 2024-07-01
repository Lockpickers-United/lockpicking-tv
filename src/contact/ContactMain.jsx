import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

function ContactMain() {

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 800, height: '100%',
            padding: pagePadding,
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            <Card style={{
                maxWidth: 450,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 26,
                marginBottom: 16,
                backgroundColor: '#1A2027'
            }}>

                <CardHeader title='Contact Us' action={null} style={{paddingBottom: 0, textAlign: 'left'}}>
                </CardHeader>
                <CardContent>

                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.3rem',
                        width: '100%',
                        textAlign: 'left',
                    }}>
                        Get in touch to submit your channel, opt out of the directory, or just to say hello!
                    </div>
                        <div style={{
                            fontSize: '1.2rem',
                            width: '100%',
                            textAlign: 'center',
                            marginTop: 30,
                        marginBottom: 15
                    }}>
                        <a href='contact@lockpicking.tv'>contact@lockpicking.tv</a>
                    </div>
                </CardContent>
            </Card>


        </div>
    )
}

export default ContactMain
