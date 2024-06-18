// Based on the info & code at https://developers.google.com/youtube/v3/quickstart/nodejs

let fs = require('fs')
let readline = require('readline')
let {google} = require('googleapis')
let OAuth2 = google.auth.OAuth2
let auth = ''
const dayjs = require('dayjs')

let primaryAccountId = 'UCUJm-6yXHW28Qiq-SitBMtA' // LockpickingTV
//primaryAccountId = 'UC0JPKMvYyewFE0DujaiGpfw' //Neal Bayless
//primaryAccountId = 'UCijhDLjaLA2um-KF-ijzYWw' //mgsecure

// copy serverEnv-development.js or serverEnv-production.js to serverEnv.js as appropriate
const env = require('./serverEnv')

// set paths for development and production environments
const workDir = env.production()
    ? '/home/dh_wk2wdh/youtube-api'
    : '/Users/nealbayless/Documents/GitHub/lockpicking-tv/YouTubeAPI'
const serverDir = env.production()
    ? '/home/dh_wk2wdh/locktrackers.com.channels/data'
    : '/Users/nealbayless/Documents/GitHub/lockpicking-tv/public/data'
const serverDirBeta = env.production()
    ? '/home/dh_wk2wdh/lockpicking.tv.beta/data'
    : '/Users/nealbayless/Documents/GitHub/lockpicking-tv/YouTubeAPI/beta-temp'
const archiveDir = env.production()
    ? '/home/dh_wk2wdh/youtube-api/archive'
    : '/Users/nealbayless/Documents/GitHub/lockpicking-tv/YouTubeAPI/archive'


// If modifying these scopes, delete your previously saved credentials
// at ~/credentials/youtube-nodejs-quickstart.json
let SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']
let TOKEN_DIR = `${workDir}/credentials/`
let TOKEN_PATH = TOKEN_DIR + 'youtube-credentials.json'

// you must put a working copy of your client-secret.json in 'workDir'
fs.readFile(`${workDir}/client_secret.json`, function processClientSecrets(err, content) {
    if (err) {
        console.error('Error loading client secret file: ' + err)
        return
    }

    auth = JSON.parse(content.toString())
    authorize(auth, getYouTubeData)

})


//          //
//   MAIN   //
//          //

const dev = true  // log version and statistics to console
const debug = false
const debug2 = false
const lite = false

let totalRequests = 0
let channelFlags = {}

let allSubscriptionIds = []
let allFeaturedChannelIds = []
let allNewChannelIds = []
let allRecentChannelIds = []
let allPlaylistChannelIds = []
let allChannelIds = []
let allChannels = []

let allPlaylistIds = []

let videoFlags = {}
let allPlaylistVideoIds = []
let allPlaylistVideos = []
let allVideos = []
let mainVideos = []
let videoData = {}

async function getYouTubeData(auth) {

    //await runTest(); return
    async function runTest() {
        const {data} = await getVideos(auth, '7X2PuE6ELmg', undefined)
        const {items} = data
        const liveJSON = JSON.stringify(items[0], null, 2)
        console.log(liveJSON)
        // snippet.liveBroadcastContent: "upcoming"
    }

    // SUBSCRIPTIONS

    let allSubscriptions = []
    let nextPageToken = undefined
    let morePages = true
    while (morePages) {
        const data = (await getSubscriptionsData(auth, nextPageToken)).data
        allSubscriptions.push(...data.items)
        nextPageToken = data.nextPageToken
        if (!nextPageToken) {
            morePages = false
        }
    }
    if (debug) console.log('allSubscriptions', allSubscriptions.length, allSubscriptions[0])

    allSubscriptionIds = allSubscriptions.map(subscription => {
        return subscription.snippet.resourceId.channelId
    })
    flagChannelIds(allSubscriptionIds, 'subscription')

    // PLAYLISTS

    const allPages = []
    const sections = (await getChannelSections(auth, primaryAccountId)).data.items
    if (debug) console.log('primaryChannelSections', sections.length, sections[0])

    for (const section of sections) {

        if (section.snippet.title === 'Featured Channels') {
            allFeaturedChannelIds.push(...section.contentDetails.channels)
            flagChannelIds(allFeaturedChannelIds, 'featured')
            if (debug) console.log('allFeaturedChannelIds, channelFlags', allFeaturedChannelIds, channelFlags)

        } else if (section.snippet.title === 'New and Noteworthy') {
            allNewChannelIds.push(...section.contentDetails.channels)
            flagChannelIds(allNewChannelIds, 'new')
            if (debug) console.log('allNewChannelIds, channelFlags', allNewChannelIds, channelFlags)

        } else if (section.snippet.title === 'Recently Added') {
            allRecentChannelIds.push(...section.contentDetails.channels)
            flagChannelIds(allRecentChannelIds, 'recent')
            if (debug) console.log('allRecentChannelIds, channelFlags', allRecentChannelIds, channelFlags)

        } else if (section?.snippet.type === 'singleplaylist') {
            const playlistId = section.contentDetails.playlists[0]
            allPlaylistIds.push(playlistId)

            const {playlistItemChannelIds, playlistItemVideoIds} = await getIdsFromPlaylistId(auth, playlistId)
            const page = await buildPlaylistPage(auth, playlistId, section, playlistItemVideoIds)
            allPages.push(page)

            // add channels & playlist creator to channels
            allPlaylistChannelIds.push(...playlistItemChannelIds, page.channelId)
            flagChannelIds([...playlistItemChannelIds, page.channelId], 'playlist')

            allPlaylistVideoIds.push(...playlistItemVideoIds)
            flagVideoIds(playlistItemVideoIds, 'playlist')

        } else if (section?.snippet.type === 'multipleplaylists') {

            flagChannelIds([section.snippet.channelId], 'playlist')
            allPlaylistChannelIds.push(section.snippet.channelId)

            const playlistIds = section.contentDetails.playlists
            allPlaylistIds.push(...playlistIds)

            const playlists = await getPlaylistsFromIds(auth, playlistIds)
            if (debug) console.log('multipleplaylists list', playlists)

            // add playlist creator to channels
            playlists.map(playlist => {
                if (debug) console.log('multipleplaylists playlist', playlist.title, playlist.channelId)
                flagChannelIds([playlist.channelId], 'playlist')
                allPlaylistChannelIds.push(playlist.channelId)
            })

            const mappedPlaylists = playlists.map((playlist) => {
                return {
                    ...playlist,
                    pId: section.id + '_' + playlist.id
                }
            })

            const firstPlaylist = playlists[0]
            const page = {
                sectionId: section.id,
                sectionName: section.snippet.title.replace(/[\s/]/g, '_').replace(/\W/g, ''),
                kind: section.snippet.kind,
                type: section.snippet.type,
                channelId: section.snippet.channelId,
                title: section.snippet.title,
                thumbnail: firstPlaylist.thumbnail,
                thumbnailHigh: firstPlaylist.thumbnailHigh,
                publishedAt: firstPlaylist.publishedAt,
                items: playlists
            }
            allPages.push(page)

            const getPseudoPagesFromPlaylists = (async (auth, playlists, sectionId) => {
                const pseudoPages = playlists.map(async playlist => {
                    return await buildPlaylistPseudoPage(auth, playlist.id, sectionId)
                })
                return (await Promise.all(pseudoPages)).flat(1)
            })

            const pseudoPages = await getPseudoPagesFromPlaylists(auth, mappedPlaylists, section.id)
            allPages.push(...pseudoPages)

            const playlistChannelIds = playlists.map(playlist => {
                return playlist.channelId
            })

            if (debug) console.log('adding playlist channels by channelID', section.snippet.title, playlistChannelIds)
            allPlaylistChannelIds.push(...playlistChannelIds)
            flagChannelIds(playlistChannelIds, 'playlist')

        } else {
            if (debug) console.log('unknown section type', section.id, section.snippet.title, section)
        }
    }

    allPlaylistChannelIds = [...new Set(allPlaylistChannelIds)].filter(x => x)

    // get all playlists, and their videosId

    if (debug) console.log('allPlaylistVideoIds', allPlaylistVideoIds)
    if (debug) console.log('allPlaylistChannelIds, channelFlags', allPlaylistChannelIds, channelFlags)

    // shouldn't need to do this!
    flagChannelIds(allPlaylistChannelIds, 'playlist')

    const flaggedChannelIds = Object.keys(channelFlags)

    allChannelIds = [
        ...allSubscriptionIds,
        ...allFeaturedChannelIds,
        ...allNewChannelIds,
        ...allRecentChannelIds,
        ...allPlaylistChannelIds,
        ...flaggedChannelIds
    ]

    allChannelIds = [...new Set(allChannelIds)].filter(x => x)

    if (debug) console.log('allChannelIds', allChannelIds.length)

    allChannelIds.map(channelId => {
        if (debug) console.log('allChannelIds channel:', channelId, channelFlags[channelId])
    })

    // ALL CHANNELS

    allChannels = await getChannelsFromIds(auth, allChannelIds)
    allChannels = allChannels.map(channel => {
        return {
            ...channel,
            channelFlags: channelFlags[channel.id]
        }
    })
    if (debug2) console.log('allChannels', allChannels.length)

    // get all playlistVideos

    allPlaylistVideos = await getVideosFromIds(auth, allPlaylistVideoIds)
    if (debug) console.log('allPlaylistVideos', allPlaylistVideos.length, allPlaylistVideos[0])

    flagVideoIds(allPlaylistVideoIds, 'playlist')
    allVideos.push(...allPlaylistVideos)

    // get videos:
    // new (separate for lite version?)
    // all

    let channelPlaylistIds = allChannels.map(channel => {
        if (channel.statistics.videoCount > 0) {
            return channel.uploadsPlaylist
        }
    })

    channelPlaylistIds = [...new Set(channelPlaylistIds)].filter(x => x)

    // get all playlistItems

    const numVideos = lite ? 50 : 200

    const getPlaylistItemsFromPlaylistIds = (async (auth, playlistIds, itemCount) => {
        const playlistItems = playlistIds.map(async playlistId => {
            const playlistItems = await getPlaylistItemsFromIds(auth, [playlistId], itemCount)

            if (debug2) console.log('getPlaylistItemsFromPlaylistIds', playlistId, playlistItems.length)

            return playlistItems
        })
        return (await Promise.all(playlistItems)).flat(1)
    })


    const channelPlaylistItems = await getPlaylistItemsFromPlaylistIds(auth, channelPlaylistIds, numVideos)
    if (debug2) console.log('channelPlaylistItems', channelPlaylistItems.length, channelPlaylistItems[0])

    let channelVideoIds = channelPlaylistItems.map(playlistItem => {
        return playlistItem.contentDetails.videoId
    })

    channelVideoIds = [...new Set(channelVideoIds)].filter(x => x)
    channelVideoIds = channelVideoIds
        .filter((videoId) => !allPlaylistVideoIds.includes(videoId))

    if (debug) console.log('channelVideoIds', channelVideoIds.length, channelVideoIds[0])

    // get all videos from playlistItems

    const allChannelVideos = await getVideosFromIds(auth, channelVideoIds)
    if (debug) console.log('allChannelVideos', allChannelVideos.length, allChannelVideos[0])

    flagVideoIds(channelVideoIds, 'channel')
    allVideos.push(...allChannelVideos)

    // make sure we have channels for all videos
    allVideos.map(video => {
        const channelId = video.snippet.channelId
        const videoChannel = allChannels.find(channel => channel.id === channelId)
        if (!videoChannel) {
            console.error('no channel for video!!', video)
        }
    })

    // remove playlist items that don't have available videos
    allPages
        .filter(page => page.type === 'singleplaylist')
        .map(page => {
            page.items.map(videoId => {
                const video = allVideos.find(video => video.id === videoId)
                if (!video) {
                    const index = page.items.indexOf(videoId)
                    if (debug) console.log('playlist', page.title, 'playlist items were', page.items)
                    const removedItem = page.items.splice(index, 1)
                    if (debug) console.log(`removed: ${removedItem}`)
                    if (debug) console.log('playlist are now', page.items)
                }

            })
        })

    if (debug2) console.log('setTimeout')
    setTimeout(buildMainVideos, 1000)
    setTimeout(saveData, 2000)

    function buildMainVideos() {

        const mappedVideos = allVideos.map(video => {
            return {
                id: video.id,
                kind: video.kind,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.medium.url,
                thumbnailHigh: video.snippet.thumbnails.high.url,
                publishedAt: video.snippet.publishedAt,
                viewCount: video.statistics.viewCount,
                likeCount: video.statistics.likeCount,
                favoriteCount: video.statistics.favoriteCount,
                commentCount: video.statistics.commentCount,
                channelId: video.snippet.channelId
            }
        })

        const sortNewVideos = mappedVideos.sort((a, b) => {
            return Math.floor(dayjs(b.publishedAt).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.publishedAt).valueOf() / 60000) * 60000
        })
        if (debug) console.log('sortNewVideos', sortNewVideos[0])
        const newVideos = sortNewVideos.slice(0, 200)
        mainVideos.push(...newVideos)

        const newVideoIds = newVideos.map(video => {
            return video.id
        })
        flagVideoIds(newVideoIds, 'new')

        // get latest video publish data
        allChannels.map((channel) => {
            const latestVideo = sortNewVideos.find((video) =>
                video.channelId === channel.id
            )
            channel.latestVideo = latestVideo?.publishedAt
                ? latestVideo.publishedAt
                : '1970-01-01T00:00:01Z'
        })

        // TODO: remove subscription channels once there are enough featured ones
        const mainChannels = allChannels
            .filter(x => x)
            .filter(channel =>
                channel.channelFlags?.includes('new')
                || channel.channelFlags?.includes('featured')
                || channel.channelFlags?.includes('subscription')
            )

        if (debug) console.log('mainChannels', mainChannels.length, mainChannels[0])

        const popularVideosPerChannel = []
        const videosPerChannel = 6

        mainChannels.map(channel => {
            const channelPopularVideos = mappedVideos
                .filter((video) => !!video)
                .filter((video) => video.channelId === channel.id)
                .sort((a, b) => {
                    return parseInt(b.viewCount) - parseInt(a.viewCount)
                })
                .slice(0, videosPerChannel)
            popularVideosPerChannel.push(...channelPopularVideos)
        })

        const popularVideos = popularVideosPerChannel
            .sort((a, b) => {
                return b.likeCount - a.likeCount
            })
            .slice(0, 200)

        const popularVideoIds = popularVideos.map(video => {
            return video.id
        })
        flagVideoIds(popularVideoIds, 'popular')

        const mainVideoIds = Object.keys(videoFlags)
        if (debug) console.log('mainVideoIds', mainVideoIds.length, mainVideoIds)

        mainVideos = mainVideoIds.map(videoId => {
            const video = mappedVideos.find(video => video.id === videoId)
            const channel = allChannels.find(channel => channel.id === video?.channelId)
            return {
                ...video,
                channelOwner: channel?.snippet?.title,
                videoFlags: videoFlags[videoId]
            }
        })
        if (debug) console.log('mainVideos', mainVideos.length, mainVideos[0])

    }

    function saveData() {

        const dateTime = dayjs().format()

        // write CHANNEL DATA to json
        const channelData = {
            metadata: {
                dateTime: dateTime,
                channelCount: allChannels.length
            },
            allChannels: allChannels
        }
        const channelDataJSON = JSON.stringify(channelData, null, 2)
        fs.writeFileSync(`${serverDir}/channelData.json`, channelDataJSON)
        fs.writeFileSync(`${serverDirBeta}/channelData.json`, channelDataJSON)
        const archiveDate = dayjs().format('YYYY-MM-DD')
        fs.writeFileSync(`${archiveDir}/channelData_${archiveDate}.json`, channelDataJSON)


        // write VIDEO DATA to json

        const newVideos = mainVideos.filter(video => video.videoFlags?.includes('new'))
        if (debug) console.log('newVideos', newVideos.length, newVideos[0])

        const popularVideos = mainVideos.filter(video => video.videoFlags?.includes('popular'))
        if (debug) console.log('popularVideos', popularVideos.length, popularVideos[0])

        const playlistVideos = mainVideos.filter(video => video.videoFlags?.includes('playlist'))
        if (debug) console.log('playlistVideos', playlistVideos.length, playlistVideos[0])


        videoData.allVideos = mainVideos
        videoData.metadata = {
            dateTime: dateTime,
            totalVideoCount: videoData.allVideos.length,
            popularVideoCount: popularVideos.length,
            newVideoCount: newVideos.length,
            playlistVideoCount: playlistVideos.length
        }
        const videoDataJSON = JSON.stringify(videoData, null, 2)
        fs.writeFileSync(`${serverDir}/videoData.json`, videoDataJSON)
        fs.writeFileSync(`${serverDirBeta}/videoData.json`, videoDataJSON)

        // write PAGE DATA to json
        const pagesData = {
            metadata: {
                dateTime: dateTime,
                pageCount: allPages.length
            },
            allPages: allPages
        }
        const pagesDataJSON = JSON.stringify(pagesData, null, 2)
        fs.writeFileSync(`${serverDir}/pagesData.json`, pagesDataJSON)
        fs.writeFileSync(`${serverDirBeta}/pagesData.json`, pagesDataJSON)

        // update version file
        // TODO: only if new data??
        const versionString = buildVersion()
        fs.writeFileSync(`${serverDir}/version.json`, versionString)
        fs.writeFileSync(`${serverDirBeta}/version.json`, versionString)

        const sortAllVideos = allVideos.sort((a, b) => {
            return Math.floor(dayjs(b.snippet.publishedAt).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.snippet.publishedAt).valueOf() / 60000) * 60000
        })

        if (debug2) console.log(sortAllVideos[0])

        // write ALL VIDEO DATA to json
        const allVideoDataJSON = JSON.stringify(sortAllVideos, null, 2)
        fs.writeFileSync(`${serverDir}/allVideoData.json`, allVideoDataJSON)
    }
}

const buildVersion = (() => {

    const newVideos = mainVideos.filter(video => video.videoFlags?.includes('new'))
    const popularVideos = mainVideos.filter(video => video.videoFlags?.includes('popular'))
    const playlistVideos = mainVideos.filter(video => video.videoFlags?.includes('playlist'))

    const version = dayjs().format()
    const versionObj = {'version': version}
    versionObj.totalRequests = totalRequests

    versionObj.mainVideos = mainVideos.length
    versionObj.playlistVideos = playlistVideos.length
    versionObj.popularVideos = popularVideos.length
    versionObj.newVideos = newVideos.length

    versionObj.allchannels = allChannels.length
    versionObj.getSubscriptionsDataRequests = getSubscriptionsDataRequests
    versionObj.getPlaylistItemsRequests = getPlaylistItemsRequests
    versionObj.getPlaylistsRequests = getPlaylistsRequests
    versionObj.getPlaylistsFromIdsRequests = getPlaylistsFromIdsRequests
    versionObj.getVideosRequests = getVideosRequests

    versionObj.allSubscriptionIds = allSubscriptionIds.length
    versionObj.allFeaturedChannelIds = allFeaturedChannelIds.length
    versionObj.allNewChannelIds = allNewChannelIds.length
    versionObj.allRecentChannelIds = allRecentChannelIds.length
    versionObj.allPlaylistChannelIds = allPlaylistChannelIds.length

    versionObj.allChannels = allChannels.length

    versionObj.allPlaylistIds = allPlaylistIds.length
    versionObj.singlePlaylistVideoIds = allPlaylistVideoIds.length

    if (dev) console.log(JSON.stringify(versionObj, null, 2))
    return JSON.stringify(versionObj, null, 2)

})

function flagChannelIds(channelIds, flag) {
    channelIds.map(channelId => {
        if (channelFlags[channelId] && !channelFlags[channelId].includes(flag)) {
            channelFlags[channelId].push(flag)
        } else if (!channelFlags[channelId])
            channelFlags[channelId] = [flag]
    })
}

function flagVideoIds(videoIds, flag) {
    videoIds.map(videoId => {
        if (videoFlags[videoId] && !videoFlags[videoId].includes(flag)) {
            videoFlags[videoId].push(flag)
        } else if (!videoFlags[videoId])
            videoFlags[videoId] = [flag]
    })
}

const buildPlaylistPage = (async (auth, playlistId, section, playlistItemVideoIds) => {
    const playlist = (await getPlaylists(auth, playlistId)).data.items[0]
    //const playlist = playlistData.data.items[0]

    return {
        sectionId: section.id,
        type: section.snippet.type,
        kind: section.snippet.kind,
        channelId: section.snippet.channelId,
        playlistId: section.contentDetails.playlists[0],
        parentId: section.parentId ? section.parentId : null,
        sectionName: playlist.snippet.title.replace(/[\s/]/g, '_').replace(/\W/g, ''),
        title: playlist.snippet.title,
        description: playlist.snippet.description,
        thumbnail: playlist.snippet.thumbnails.medium.url,
        thumbnailHigh: playlist.snippet.thumbnails.high.url,
        publishedAt: playlist.snippet.publishedAt,
        items: playlistItemVideoIds
    }
})

const buildPlaylistPseudoPage = (async (auth, playlistId, sectionId) => {
    const playlist = (await getPlaylists(auth, playlistId)).data.items[0]

    if (debug) console.log('buildPlaylistPseudoPage playlist', playlist)

    const section = {
        id: 'pl_' + playlist.snippet.channelId + '_' + playlist.id,
        snippet: {
            type: 'singleplaylist',
            kind: 'singleplaylist',
            channelId: playlist.snippet.channelId
        },
        contentDetails: {
            playlists: [
                playlist.id
            ]
        },
        parentId: sectionId
    }

    const {playlistItemChannelIds, playlistItemVideoIds} = await getIdsFromPlaylistId(auth, playlistId)
    allPlaylistVideoIds.push(...playlistItemVideoIds)
    flagVideoIds(playlistItemVideoIds, 'playlist')

    allPlaylistChannelIds.push(...playlistItemChannelIds, playlist.channelId)
    flagChannelIds(playlistItemChannelIds, 'playlist')

    if (debug) console.log('buildPlaylistPseudoPage playlistItemChannelIds', playlist.snippet.title, playlistItemChannelIds)

    return await buildPlaylistPage(auth, playlistId, section, playlistItemVideoIds)
})

let getChannelRequests = 0
const getChannel = (async (auth, id, pageToken) => {
    getChannelRequests++
    totalRequests++
    let service = google.youtube('v3')
    try {
        return await service.channels.list({
            auth: auth,
            part: 'snippet,contentDetails,statistics',
            type: 'channel',
            id: id,
            maxResults: 50,
            pageToken: pageToken
        })
    } catch (err) {
        console.error('getChannel error:', err)
        return null
    }
})

const getChannelsFromIds = (async (auth, channelIds) => {
    let channelItems = []
    while (channelIds.length > 0) {
        const firstN = channelIds.splice(0, 50)
        const channelIdsString = firstN.join(',')
        const {items} = (await getChannel(auth, channelIdsString, undefined)).data
        if (items) {
            channelItems.push(...items)
        }
    }
    channelItems.map(channel => {
        channel.channelId = channel.id
        channel.uploadsPlaylist = channel.contentDetails.relatedPlaylists.uploads
    })
    return channelItems
})

const getVideosFromIds = (async (auth, videoIds) => {
    let videoItems = []
    while (videoIds.length > 0) {
        const firstN = videoIds.splice(0, 50)
        const videoIdsString = firstN.join(',')
        const {items} = (await getVideos(auth, videoIdsString, undefined)).data
        if (items) {
            videoItems.push(...items)
        }
    }
    return videoItems
})

let getVideosRequests = 0

const getVideos = (async (auth, ids, pageToken) => {
    getVideosRequests++
    totalRequests++

    let service = google.youtube('v3')
    try {
        return await service.videos.list({
            auth: auth,
            part: 'statistics, snippet',
            id: ids,
            maxResults: 50,
            pageToken: pageToken
        })
    } catch (err) {
        console.error('getVideos error:', err)
        return null
    }
})

const getPlaylistItemsFromIds = (async (auth, playlistIds, numItems) => {
    const batchNum = numItems < 50 ? numItems : 50
    let playlistItems = []
    while (playlistIds.length > 0 && playlistItems.length < batchNum) {
        const firstN = playlistIds.splice(0, batchNum)
        const playlistIdsString = firstN.join(',')
        const {items} = (await getPlaylistItems(auth, playlistIdsString, undefined)).data
        if (items) {
            playlistItems.push(...items)
        }
    }
    return playlistItems
})

let getPlaylistItemsRequests = 0

const getPlaylistItems = (async (auth, ids, pageToken) => {
    getPlaylistItemsRequests++
    totalRequests++
    let service = google.youtube('v3')
    try {
        return await service.playlistItems.list({
            auth: auth,
            part: 'snippet, contentDetails',
            playlistId: ids,
            maxResults: 50,
            pageToken: pageToken
        })
    } catch (err) {
        console.error('getPlaylistItems error:', err)
        return null
    }
})

let getSubscriptionsDataRequests = 0
const getSubscriptionsData = (async (auth, pageToken) => {
    getSubscriptionsDataRequests++
    totalRequests++
    let service = google.youtube('v3')
    try {
        return await service.subscriptions.list({
            auth: auth,
            part: 'snippet,contentDetails',
            channelId: primaryAccountId,
            pageToken: pageToken,
            maxResults: 50
        })
    } catch (err) {
        console.error('getSubscriptionsData error:', err)
        return null
    }
})

let getChannelSectionsRequests = 0
const getChannelSections = (async (auth, id) => {
    getChannelSectionsRequests++
    totalRequests++
    let service = google.youtube('v3')
    try {
        return await service.channelSections.list({
            auth: auth,
            part: 'snippet,contentDetails,id',
            channelId: id
        })
    } catch (err) {
        console.error('getChannel error:', err)
        return null
    }
})

let getPlaylistsFromIdsRequests = 0

async function getPlaylistsFromIds(auth, playlistIds) {
    const playlists = playlistIds.map(async (playlistId) => {
        try {
            getPlaylistsFromIdsRequests++
            totalRequests++
            const {items} = (await getPlaylists(auth, playlistId)).data
            const playlistItem = items[0]
            return {
                id: playlistItem.id,
                kind: playlistItem.kind,
                title: playlistItem.snippet.title,
                thumbnail: playlistItem.snippet.thumbnails.medium.url,
                thumbnailHigh: playlistItem.snippet.thumbnails.high.url,
                publishedAt: playlistItem.snippet.publishedAt,
                channelId: playlistItem.snippet.channelId,
                itemCount: playlistItem.contentDetails.itemCount
            }
        } catch (err) {
            console.error(err)
            return null
        }
    })
    return (await Promise.all(playlists)).flat(1)
}

let getPlaylistsRequests = 0
const getPlaylists = (async (auth, id) => {
    getPlaylistsRequests++
    totalRequests++
    let service = google.youtube('v3')
    try {
        return await service.playlists.list({
            auth: auth,
            part: 'snippet, contentDetails',
            id: id,
            maxResults: 50
        })
    } catch (err) {
        console.error('getPlaylists error:', err)
        return null
    }
})

const getIdsFromPlaylistId = (async (auth, playlistId) => {

    const playlistItems = []
    let nextPageTokenLocal = undefined
    let morePages = true
    while (morePages) {
        const {items, nextPageToken} = (await getPlaylistItems(auth, playlistId, nextPageTokenLocal)).data
        playlistItems.push(...items)
        nextPageTokenLocal = nextPageToken
        if (!nextPageToken) {
            morePages = false
        }
    }

    if (debug) console.log('getIdsFromPlaylistId playlistItems', playlistItems.length)

    const playlistItemChannelIds = playlistItems.map(playlistItem => {
        return playlistItem.snippet.videoOwnerChannelId
    })
    const playlistItemVideoIds = playlistItems.map(playlistItem => {
        return playlistItem.contentDetails.videoId
    })

    if (debug) console.log('getIdsFromPlaylistId playlistItemChannelIds', playlistItemChannelIds)

    return {playlistItemChannelIds: playlistItemChannelIds, playlistItemVideoIds: playlistItemVideoIds}
})


//
// YouTube AUTH functions
//

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    let clientSecret = credentials.installed.client_secret
    let clientId = credentials.installed.client_id
    let {redirect_uris} = credentials.installed
    let redirectUrl = redirect_uris[0]
    let oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback)
        } else {
            oauth2Client.credentials = JSON.parse(token.toString())
            callback(oauth2Client)
        }
    })
}

function getNewToken(oauth2Client, callback) {
    let authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    })
    console.log('Authorize this app by visiting this url: ', authUrl)
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close()
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.error('Error while trying to retrieve access token', err)
                return
            }
            oauth2Client.credentials = token
            storeToken(token)
            callback(oauth2Client)
        })
    })
}

function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR)
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) throw err
        if (debug) console.log('Token stored to ' + TOKEN_PATH)
    })
}

