import React from 'react'
import { useParams } from 'react-router-dom'

const Katha = () => {

    const params = useParams();
    const {kathaid} = params
    console.log(kathaid)


  return (
    <main>

        <section>
            <h1> this is katha number-1 {kathaid} </h1>
        </section>
      
    </main>
  )
}

export default Katha
