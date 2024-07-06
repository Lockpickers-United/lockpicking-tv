import React from 'react'
import {TagCloud} from 'react-tagcloud'
import Box from '@mui/material/Box'
import useWindowSize from '../util/useWindowSize.jsx'


export default function TagCloudDisplay({tagData, handleTagClick}) {

    const options = {
        luminosity: 'light',
        hue: 'blue'
    }

    const {width} = useWindowSize()
    const smallWindow = width < 800

    const lineHeight = !smallWindow ? '1.5rem' : '1.0rem'
    const maxSize = !smallWindow ? 23 : 20
    const minSize = !smallWindow ? 13 : 12

    return (
                <Box sx={{
                    '& .tag-cloud-tag': {
                        lineHeight: lineHeight
                    }
                }}
                >
                    <TagCloud
                        minSize={minSize}
                        maxSize={maxSize}
                        colorOptions={options}
                        tags={tagData}
                        randomSeed={1}
                        shuffle={false}
                        onClick={tag => handleTagClick(tag.value)}
                    />
                </Box>
    )
}
