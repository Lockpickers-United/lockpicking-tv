const url = import.meta.env && import.meta.env.VITE_LOCAL_DATA === 'true' //eslint-disable-line
    ? 'http://localhost:3000/data'
    : 'https://lockpicking.tv'

if (import.meta.env && import.meta.env.VITE_LOCAL_DATA === 'true') {
    console.info('Attention: App is using LOCAL DATA.')
}

export const channelData = '/data/channelData.json'
export const pagesData = '/data/pagesData.json'
export const videoData = '/data/videoData.json'

export const siteFull = '/reports/statsSiteFull.json'
export const siteSummary = '/reports/statsSiteSummary.json'

export const channelIndex = '/data/channelIndex.json'
export const videoIndex = '/data/videoIndex.json'
