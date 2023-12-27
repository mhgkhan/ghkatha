import React from 'react'

const PageLink = ({iconname,color,link}) => {
    return (
        <div className="page_link">
            <a href={link} target='_blank' rel='noreferrer' style={{color:color}}>{iconname}</a>
        </div>
    )
}

export default PageLink
