import React from 'react'
import querystring from 'query-string'

function Tracker({feature, ...extraParams}) {
    //if (import.meta.env.DEV) return null
    const randomStuff = (Math.random()).toString(36).substring(2, 10)
    const file = files[feature] || 'lptv.gif'
    const ref = document.referrer || 'none'
    const page = window.location.href.replace(/.*\/#\/(\w+)\?*.*/, '$1')
    const query = querystring.stringify({trk: feature, r: randomStuff, w: screen.width, ref, page, ...extraParams})
    const url = `/i/${file}?${query}`
    return (
        <img alt='lockpicking.tv' src={url} width={0} height={0}/>
    )
}

const files = {
    nav: 'welcome.gif',
    channel: 'clear.gif',
    playlist: 'lptv.gif'
}

export default React.memo(Tracker)

export const openInNewTab = (url) => {
    const randomStuff = (Math.random()).toString(36).substring(2, 10)
    const destination = url.replace(/https*:\/\//, '')
    document.getElementById('trackImage').src = `/i/lptv.gif?trk=openURL&page=${destination}&r=${randomStuff}&w=${screen.width}&ref=${document.location}`
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}
