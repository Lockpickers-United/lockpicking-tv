import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/videos?page=newVideos&guide=true')
    },
    {
        path: '/featured',
        lazy: async () => {
            const {default: ChannelsRoute} = await import('../youtube/ChannelsRoute.jsx')
            return {element: <ChannelsRoute channelSet={'featured'}/>}
        }
    },
    {
        path: '/new',
        lazy: async () => {
            const {default: ChannelsRoute} = await import('../youtube/ChannelsRoute.jsx')
            return {element: <ChannelsRoute channelSet={'new'}/>}
        }
    },
    {
        path: '/full',
        lazy: async () => {
            const {default: ChannelsRoute} = await import('../youtube/ChannelsRoute.jsx')
            return {element: <ChannelsRoute channelSet={'full'}/>}
        }
    },
    {
        path: '/pages',
        lazy: async () => {
            const {default: PagesRoute} = await import('../youtube/PagesRoute.jsx')
            return {element: <PagesRoute/>}
        }
    },
    {
        path: '/videos',
        lazy: async () => {
            const {default: VideosRoute} = await import('../youtube/VideosRoute.jsx')
            return {element: <VideosRoute/>}
        }
    },
    {
        path: '/playlist',
        lazy: async () => {
            const {default: PlaylistRoute} = await import('../youtube/PlaylistRoute.jsx')
            return {element: <PlaylistRoute/>}
        }
    },
    {
        path: '/guide',
        lazy: async () => {
            const {default: GuideRoute} = await import('../youtube/GuideRoute.jsx')
            return {element: <GuideRoute/>}
        }
    },
    {
        path: '*',
        loader: () => redirect('/videos?page=newVideos&guide=true')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

