import React from 'react'
import axios from 'axios'


class AddBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            judul: '',
            jumlah_halaman: '',
            penerbit: '',
            nama_pengguna: '',
            user_id: null,
            error: ''
        }
    }

    // fetch data semua data user untuk inputan user
    componentDidMount() {
        axios.get('http://localhost:8000/api/user')
            .then(res => {
                this.setState({
                    users: res.data.data
                })
               
            })
    }

    handleChange = (e) => {
        // mengubah state sesuai inputan
       this.setState({
           [e.target.id]: e.target.value
       })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        // fetch untuk menambahkan data buku
        const { judul,jumlah_halaman,penerbit,user_id } = this.state
        axios.post('http://localhost:8000/api/book',{
           judul: judul,
           jumlah_halaman: jumlah_halaman,
           penerbit: penerbit,
           user_id: user_id
        })
            .then(res => {
                // mengecek respon status
                if( res.data.status ) {
                    // kalo true maka kembalikan ke halaman utama buku
                    this.props.history.push('/book')
                } else {
                    // kalo false maka isi data state error
                    this.setState({
                        error: res.data.message
                    })
                }
            })
            .catch(err => console.log(err))
        // fetch untuk menambahkan data buku

        // menset kosong kembali state
        this.setState({
            judul: '',
            jumlah_halaman: '',
            penerbit: '',
        })
    }

    render() {
        const { users,error } = this.state

        // lakukan pengulangan untuk setiap option user
        const userList = users.map((user) => {
            return(
                <option key={user.id} value={user.id}>{user.nama}</option>
            )
        })
        // akhir lakukan pengulangan untuk setiap option user

        // membuat variabel untuk menampilkan error
        let errorForm = (error) ? (
        <div className="alert alert-danger" role="alert">
            { error }
         </div>
         ) : (<div></div>)
         // akhir membuat variabel untuk menampilkan error

        return(

            <form onSubmit={this.handleSubmit}>
                {/* menampilkan error */}
                { errorForm }

                {/* inputan judul */}
                <div className="form-group">
                    <label htmlFor="judul">Judul</label>
                    <input type="text" required className="form-control" id="judul" onChange={this.handleChange} />
                </div>

                {/* inputan jumlah halaman */}
                <div className="form-group">
                    <label htmlFor="jumlah_halaman">Jumlah halaman</label>
                    <input type="number" required className="form-control" id="jumlah_halaman" onChange={this.handleChange}  />
                </div>

                {/* inputan penerbit */}
                <div className="form-group">
                    <label htmlFor="penerbit">Penerbit</label>
                    <input type="text" className="form-control" id="penerbit" required onChange={this.handleChange} />
                </div>

                {/* inputan nama pengguna */}
                <div className="form-group">
                    <label htmlFor="nama_pengguna">Nama Pengguna</label>
                    <select required onChange={this.handleChange} name="nama_pengguna" className="form-control" id="user_id">
                        <option value="">Pilih pengguna</option>
                        { userList }
                    </select>
                </div>
                <div className="">
                    <button className="btn btn-success">Tambah</button>
                </div>
            </form>
        )
    }
}

export default AddBook;