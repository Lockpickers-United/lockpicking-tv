import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/youtube')
    },
    {
        path: '/youtube',
        lazy: async () => {
            const {default: YouTubeRoute} = await import('../youtube/YouTubeRoute.jsx')
            return {element: <YouTubeRoute/>}
        }
    },
    {
        path: '*',
        loader: () => redirect('/youtube')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

