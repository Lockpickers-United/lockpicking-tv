import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/channels?page=featured')
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
        path: '/privacy',
        lazy: async () => {
            const {default: PrivacyRoute} = await import('../privacy/PrivacyRoute.jsx')
            return {element: <PrivacyRoute/>}
        }
    },
    {
        path: '/channelreport',
        lazy: async () => {
            const {default: ChannelReportRoute} = await import('../reports/ChannelReportRoute.jsx')
            return {element: <ChannelReportRoute/>}
        }
    },
    {
        path: '/sitereport',
        lazy: async () => {
            const {default: SiteReportRoute} = await import('../reports/SiteReportRoute.jsx')
            return {element: <SiteReportRoute/>}
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
        loader: () => redirect('/channels?page=featured')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

