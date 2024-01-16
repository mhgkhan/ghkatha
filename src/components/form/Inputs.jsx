import React from 'react'

const Inputs = ({ type, ph, minl, name, required,onchange,val,disable }) => {
    return (
        <input type={type} name={name} placeholder={ph} minLength={minl} required={required} onChange={onchange} value={val} disabled={disable} />
    )
}

export default Inputs
