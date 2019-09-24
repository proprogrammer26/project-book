import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return(
        <div className="text-center mt-5">
              <h2>Selamat datang di Book Project</h2>
              <Link className="btn btn-info mr-2" to="/user">User</Link>
              <Link className="btn btn-danger" to="/book">Book</Link>
          </div>
    )
}

export default Welcome