import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Book extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        // fetch data ke semua data buku
        axios.get('http://localhost:8000/api/book')
            .then(res => {
                this.setState({
                    books: res.data.data
                })
            })
        // akhir fetch data ke semua data buku
    }

    onDelete = (id) => {
        // mendelete data buku
        axios.delete('http://localhost:8000/api/book/' + id)
            .then(res => {
                this.setState({
                    books: res.data.data
                })
            })
    }


    render() {
        // membuat variabel i untuk data id pada tabel
        let i = 1
        // membuat pengulangan untuk data buku
        const bookList = this.state.books.map((book) => {
            return(
                <tr key={book.id}>
                    <td>{i++}</td>
                    <td>{book.judul}</td>
                    <td>{book.jumlah_halaman}</td>
                    <td>{book.penerbit}</td>
                    <td>{book.user.nama}</td>
                    <td>
                        <Link to={'book/edit/' + book.id} className="btn btn-info" >Ubah</Link>
                        <Link onClick={() => this.onDelete(book.id)} className="btn btn-danger" >Hapus</Link>
                    </td>
                </tr>
            )
        })
        // akhir membuat pengulangan untuk data buku

        return(
            <div className="mt-3">
                <Link to="/book/add" className="btn btn-primary mb-1 mt-1">Tambah Buku</Link>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Judul</th>
                            <th scope="col">Jumlah Halaman</th>
                            <th scope="col">Penerbit</th>
                            <th scope="col">Nama pengguna</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* data buku */}
                      {bookList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Book