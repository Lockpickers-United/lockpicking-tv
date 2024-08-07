import React from 'react'

function FieldValue({name, value, last, style, headerStyle = {}, textStyle = {}}) {
    const marginStyle = last
        ? {marginLeft: 0, ...style}
        : {marginLeft: 0, marginBottom: 8, ...style}
    const fullHeaderStyle = {
        color: '#666',
        fontSize: '0.85rem',
        lineHeight: '1rem',
        marginBottom: 3,
        ...headerStyle
    }
    const fullTextStyle = {
        marginLeft: 0,
        ...textStyle
    }

    return (
        <div style={marginStyle}>
            <div style={fullHeaderStyle}>
                {name}
            </div>
            <div style={fullTextStyle}>
                {value}
            </div>
        </div>
    )
}

export default React.memo(FieldValue)
