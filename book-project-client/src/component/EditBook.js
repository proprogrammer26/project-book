import React from 'react'
import axios from 'axios'


class EditBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            book: '',
            judul: '',
            jumlah_halaman: '',
            penerbit: '',
            nama_pengguna: '',
            user_id: null,
            error: ''
        }

        // fetch data buku sesuai id
        const { id } = this.props.match.params
        axios.get('http://localhost:8000/api/book/' + id)
            .then(res => {
                const data = res.data.data
                this.setState({
                    book: data,
                    judul: data.judul,
                    jumlah_halaman: data.jumlah_halaman,
                    penerbit: data.penerbit,
                    user_id: data.user_id
                })
               
            })

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { judul,jumlah_halaman,penerbit } = this.state
        const { id } = this.props.match.params

        // fetch api put untuk mengupdate data buku
        axios.put('http://localhost:8000/api/book/' + id,{
           judul: judul,
           jumlah_halaman: jumlah_halaman,
           penerbit: penerbit
        })
            .then(res => {
                // mengecek status response
                if( res.data.status ) {
                    // kalo berhasil arahkan ke halaman utama buku
                    this.props.history.push('/book')
                } else {
                    // kalo gagal data state error diisi
                    this.setState({
                        error: res.data.message
                    })
                }
            })
            .catch(err => console.log(err))
        
        // menset kembali input menjadi kosong
        this.setState({
            judul: '',
            jumlah_halaman: '',
            penerbit: '',
        })
        // akhir fetch api put untuk mengupdate data buku
    }

    render() {
        // untuk error message
        const { error } = this.state
    
        let errorForm = (error) ? (
        <div className="alert alert-danger" role="alert">
            { error }
         </div>
         ) : (<div></div>)
        //  akhir untuk error message
        
        // mengambil judul, jumlah halaman, penerbit, dan user id dari state
         const { book,judul,jumlah_halaman,penerbit,user_id } = this.state

        return(

            <form onSubmit={this.handleSubmit}>
                {/* tampilakan data error jika ada */}
                { errorForm }

                {/* inputan judul  */}
                <div className="form-group">
                    <label htmlFor="judul">Judul</label>
                    <input value={judul} type="text" required className="form-control" id="judul" onChange={this.handleChange} />
                </div>

                {/* inputan jumlah halaman */}
                <div className="form-group">
                    <label htmlFor="jumlah_halaman">Jumlah halaman</label>
                    <input value={jumlah_halaman} type="number" required className="form-control" id="jumlah_halaman" onChange={this.handleChange}  />
                </div>

                {/* inputan penerbit */}
                <div className="form-group">
                    <label htmlFor="penerbit">Penerbit</label>
                    <input value={penerbit} type="text" className="form-control" id="penerbit" required onChange={this.handleChange} />
                </div>

                {/* inputan nama pengguna */}
                <div className="form-group">
                    <label htmlFor="nama_pengguna">Nama Pengguna</label>
                    <select readOnly id="user_id" required onChange={this.handleChange} name="nama_pengguna" className="form-control">
                        <option value={user_id}>{book.nama_pengguna}</option>
                    </select>
                </div>
                <div className="">
                    <button className="btn btn-success">Ubah</button>
                </div>
            </form>
        )
    }
}

export default EditBook;