import {useMemo} from 'react'

export default function useWindowSize2() {
    let width = undefined,
        timeout = false,
        delay = 250
    function getDimensions() {
        width = window.innerWidth
    }
    window.addEventListener('resize', function() {
        clearTimeout(timeout)
        timeout = setTimeout(getDimensions, delay)
    })

    getDimensions()

    return useMemo(() => ({
        width
    }), [width])
}


