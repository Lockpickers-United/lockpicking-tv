export default {
    domain: 'https://beta.lockpicking.tv',
    defaultPage: '/videos?page=newVideos',
    NOTdefaultPage: '/channels?page=featured',
    pages: {
        newVideos: {
            title: 'New Videos',
            introCopy: 'The latest videos from our Prefered Channels.',
            cohorts: ['new', 'featured', 'subscription'],
            videosPerChannel: 5,
            maxAge: 30,
            maxVideos: 200
        },
        popular: {
            title: 'Most Popular Videos',
            introCopy: 'The most popular videos from our Prefered Channels.',
            cohorts: ['new', 'featured', 'subscription'],
            videosPerChannel: 3,
            maxVideos: 1000,
            sortBy: 'NOTchannelOwner'
        },
        fullDirectory: {
            cohorts: ['new', 'featured', 'subscription', 'playlist'],
        }
    },
    menuOpen: true,
    menuStyle: 'guide',
    menu: {
      sections: ['videoItems', 'channelItems', 'pageItems', 'siteItems', 'reportItems', 'moreItems']
    },
    menuNotUsed: {
        allSections: ['videoItems', 'channelItems', 'pageItems', 'siteItems', 'reportItems', 'moreItems']
    }
}