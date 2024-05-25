import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/featured')
    },
    {
        path: '/featured',
        lazy: async () => {
            const {default: YouTubeRoute} = await import('../youtube/YouTubeRoute.jsx')
            return {element: <YouTubeRoute channelSet={'featured'}/>}
        }
    },
    {
        path: '/new',
        lazy: async () => {
            const {default: YouTubeRoute} = await import('../youtube/YouTubeRoute.jsx')
            return {element: <YouTubeRoute channelSet={'new'}/>}
        }
    },
    {
        path: '/full',
        lazy: async () => {
            const {default: YouTubeRoute} = await import('../youtube/YouTubeRoute.jsx')
            return {element: <YouTubeRoute channelSet={'full'}/>}
        }
    },
    {
        path: '*',
        loader: () => redirect('/featured')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

