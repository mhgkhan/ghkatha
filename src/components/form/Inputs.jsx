import React from 'react'

const Inputs = ({ type, ph, minl, name, required,onchange,val,disable,classname }) => {
    return (
        <input type={type} name={name} placeholder={ph} minLength={minl} required={required} onChange={onchange} value={val} disabled={disable} className={classname} />
    )
}

export default Inputs
