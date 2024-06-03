import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/featured?guide=true')
    },
    {
        path: '/featured',
        lazy: async () => {
            const {default: YouTubeRoute} = await import('../youtube/ChannelsRoute.jsx')
            return {element: <YouTubeRoute channelSet={'featured'}/>}
        }
    },
    {
        path: '/new',
        lazy: async () => {
            const {default: YouTubeRoute} = await import('../youtube/ChannelsRoute.jsx')
            return {element: <YouTubeRoute channelSet={'new'}/>}
        }
    },
    {
        path: '/full',
        lazy: async () => {
            const {default: YouTubeRoute} = await import('../youtube/ChannelsRoute.jsx')
            return {element: <YouTubeRoute channelSet={'full'}/>}
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
        path: '/playlist',
        lazy: async () => {
            const {default: PlaylistRoute} = await import('../youtube/PlaylistRoute.jsx')
            return {element: <PlaylistRoute/>}
        }
    },
    {
        path: '*',
        loader: () => redirect('/featured?guide=true')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

