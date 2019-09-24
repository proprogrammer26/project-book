import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class User extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        // melakukan fetch untuk semua data user | start
        axios.get('http://localhost:8000/api/user')
            .then(res => {
                this.setState({
                    users: res.data.data
                })
               
            })
        // melakukan fetch untuk semua data user | end
    }

    onDelete = (id) => {
        // mendelete satu data user
        axios.delete('http://localhost:8000/api/user/' + id)
            .then(res => {
                this.setState({
                    users: res.data.data
                })
            })

    }

    render() {
        const { users } = this.state;
        // var i untuk id pada data tabel
        let i = 1
        // melakukan pengulangan untuk semua data user
        const userList = users.map((user) => {
            return(
                <tr key={user.id}>
                    <td>{i++}</td>
                    <td>{user.nama}</td>
                    <td>{user.umur}</td>
                    <td>
                        <Link to={'/user/edit/' + user.id} className="btn btn-primary">Ubah</Link>
                        <Link className="btn btn-danger" onClick={() => this.onDelete(user.id)}>Hapus</Link>
                    </td>
                </tr>
            )
        })
        return(
            <div className="mt-3">
                <Link to="/user/add" className="btn btn-primary mb-1 mt-1">Tambah User</Link>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Umur</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* data user */}
                       { userList }
                    </tbody>
                </table>
            </div>
            
        )
    }
}

export default User