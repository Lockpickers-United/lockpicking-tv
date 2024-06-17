export default {
    pages: {
        newVideos: {
            title: 'New Videos',
            introCopy: 'The latest videos from our Prefered Channels.',
            cohorts: ['new', 'featured', 'subscription'],
            videosPerChannel: 2,
            maxAge: 30,
            maxVideos: 100
        },
        popular: {
            title: 'Most Popular Videos',
            introCopy: 'The most popular videos from our Prefered Channels.',
            cohorts: ['new', 'featured'],
            videosPerChannel: 1,
            maxVideos: 1000
        },
        fullDirectory: {
            cohorts: ['new', 'featured', 'subscription'],
        }
    },
    guide: {
      sections: ['pageItems', 'channelItems', 'videoItems', 'siteItems', 'moreItems']
    },
    notUsed: {
        sections: ['pageItems']
    }
}