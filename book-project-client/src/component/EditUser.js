import React from 'react'
import axios from 'axios'

class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nama: '',
            password: '',
            umur: '' 
        }
    }

    componentDidMount() {
        // melakukan fetch untuk satu data user | start
        const id = this.props.match.params.id
        axios.get('http://localhost:8000/api/user/' + id)
            .then(res => {
                this.setState({
                    nama: res.data.data.nama,
                    umur: res.data.data.umur
                })
            })
        // melakukan fetch untuk satu data user | end
    }

    handleChange = (e) => {
        // menset data state sesuai inputan
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const { nama,umur } = this.state

        // mengupdate data user | start
        const id = this.props.match.params.id
        axios.put('http://localhost:8000/api/user/' + id,{
            nama: nama,
            umur: umur
        })
            .then(res => {
                this.props.history.push('/user')
            })
            .catch(err => console.log(err))
        // mengupdate data user | end

        // menset data state menjadi kosong
        this.setState({
            nama: '',
            umur: ''
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                {/* inputan nama */}
                <div className="form-group">
                    <label htmlFor="nama">Nama</label>
                    <input type="text" required className="form-control" value={this.state.nama} id="nama" placeholder="rahmat" onChange={this.handleChange} />
                </div>

                {/* inputan password */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required readOnly className="form-control" id="password" placeholder="" onChange={this.handleChange}  />
                </div>

                {/* inputan umur */}
                <div className="form-group">
                    <label htmlFor="umur">Umur</label>
                    <input type="number" required value={this.state.umur} className="form-control" id="umur" placeholder="16" onChange={this.handleChange} />
                </div>
                <div className="">
                    <button className="btn btn-success">Tambah</button>
                </div>
            </form>
        )
    }
}

export default EditUser;