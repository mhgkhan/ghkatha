import React from 'react'

const WrongOpener = ({color,text}) => {


    
    return (
        <>
            <main>
                <div className="container">
                    <h1 style={{ color: color, textAlign: "center", padding: "50px" }}>{text}</h1>
                </div>
            </main>
        </>
    )
}

export default WrongOpener
