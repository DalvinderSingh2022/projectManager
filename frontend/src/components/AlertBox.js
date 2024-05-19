import React, { useEffect, useRef } from 'react'

const AlertBox = ({ message, type, setAlert }) => {
    const boxRef = useRef();

    useEffect(() => {
        const timeout = () => setAlert(false);
        setTimeout(timeout, 2500);

        return () => clearTimeout(timeout)
    })

    return (
        <div className='alertBox full flex items-end' ref={boxRef}>
            <div className={`alert flex ${type}`}>
                <span>{message}</span>
                <button className='btn round material-symbols-outlined'>{type}</button>
            </div>
        </div >
    )
}

export default AlertBox;