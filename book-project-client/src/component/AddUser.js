import React from 'react'
import axios from 'axios'


class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nama: '',
            password: '',
            umur: '' 
        }
    }

    handleChange = (e) => {
        // mengubah data state sesuai inputan
       this.setState({
           [e.target.id]: e.target.value
       })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { nama,password,umur } = this.state

        // melakukan fetch dan menambahkan user
        axios.post('http://localhost:8000/api/user',{
            nama: nama,
            password: password,
            umur: umur
        })
            .then(res => {
                this.props.history.push('/user')
            })
            .catch(err => console.log(err))
        // akhir melakukan fetch dan menambahkan user

        // mengubah kosong kembali data state
        this.setState({
            nama: '',
            password: '',
            umur: ''
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                {/* inputan nama */}
                <div className="form-group">
                    <label htmlFor="nama">Nama</label>
                    <input type="text" required className="form-control" id="nama" placeholder="rahmat" onChange={this.handleChange} />
                </div>

                {/* inputan password */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required className="form-control" id="password" placeholder="" onChange={this.handleChange}  />
                </div>

                {/* inputan umur */}
                <div className="form-group">
                    <label htmlFor="umur">Umur</label>
                    <input type="number" className="form-control" id="umur" placeholder="16" required onChange={this.handleChange} />
                </div>

                <div className="">
                    <button className="btn btn-success">Tambah</button>
                </div>
            </form>
        )
    }
}

export default AddUser;