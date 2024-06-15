import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/videos?page=newVideos')
    },
    {
        path: '/channels',
        lazy: async () => {
            const {default: ChannelsRoute} = await import('../youtube/ChannelsRoute.jsx')
            return {element: <ChannelsRoute/>}
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
        path: '/contact',
        lazy: async () => {
            const {default: ContactRoute} = await import('../contact/ContactRoute.jsx')
            return {element: <ContactRoute/>}
        }
    },
    {
        path: '/reports',
        lazy: async () => {
            const {default: ReportsRoute} = await import('../reports/ReportsRoute.jsx')
            return {element: <ReportsRoute/>}
        }
    },
    {
        path: '/about',
        lazy: async () => {
            const {default: AboutRoute} = await import('../about/AboutRoute.jsx')
            return {element: <AboutRoute/>}
        }
    },
    {
        path: '*',
        loader: () => redirect('/videos?page=newVideos')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

