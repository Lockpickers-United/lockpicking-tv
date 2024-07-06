import React from 'react'
import useWindowSize from '../../util/useWindowSize'
import SiteReport28DaysVideosLine from './SiteReport28DaysVideosLine.jsx'
import SiteReportVideosSummaryTable from './SiteReportVideosSummaryTable.jsx'

export default function SiteReportVideosSummary({data}) {
    const {width} = useWindowSize()
    const smallWindow = width <= 560

    const divStyle = {
        width: '100%', padding: '0px', marginBottom: 12, alignItems: 'center',
        marginLeft: 'auto', marginRight: 'auto'
    }
    const divFlexStyle = !smallWindow ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <React.Fragment>
            <div style={{textAlign: 'center'}}>
                <div style={combinedDivStyle}>
                    <SiteReport28DaysVideosLine lineData={data}/>
                    <SiteReportVideosSummaryTable fullData={data}/>
                </div>
            </div>
        </React.Fragment>
    )
}
