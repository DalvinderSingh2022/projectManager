import React, { memo } from 'react'

const Loading = ({ full }) => {
    return (
        <div className={`${full ? 'full' : ""} flex`} >
            <svg width={full ? 200 : 50} height={full ? 200 : 50}>
                <circle r={full ? 50 : 12.5} cx={full ? 100 : 25} cy={full ? 100 : 25} strokeWidth={full ? 10 : 5 + "px"} stroke={full ? 'var(--primary)' : 'var(--grey)'}></circle>
            </svg>
        </div >
    )
}

export default memo(Loading);