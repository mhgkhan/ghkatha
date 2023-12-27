import React from 'react'


import { FaFacebook, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa'


const MemberProfile = ({ imgPath, name, disg, fb, tw, insta, gh }) => {
    return (
        <div className="member-profile">
            <img src={imgPath} alt={`Team member (${name}) profile img `} />
            <h3>{name} </h3>
            <h4>{disg} </h4>
            <div className="links">
                <a href={tw} target='_blank' rel='noreferrer' ><FaTwitter /></a>
                <a href={insta} target='_blank' rel='noreferrer' ><FaInstagram /></a>
                <a href={fb} target='_blank' rel='noreferrer' ><FaFacebook /></a>
                <a href={gh} target='_blank' rel='noreferrer' ><FaGithub /></a>
            </div>
        </div>
    )
}

export default MemberProfile
