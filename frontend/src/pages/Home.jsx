import axios from 'axios';
import { useEffect, useState } from 'react'
import { api } from '../../config';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Loading from '../components/Loading';
import BookTable from '../components/Home/BookTable';
import BookCard from '../components/Home/BookCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState("table");
    
    useEffect(() => {
        setLoading(true);
        axios.get(`${api}/books`).then((res) => {
            setBooks(res.data.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return(
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <button className='bg-sky-300 focus:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}>
                    Table
                </button>
                <button className='bg-sky-300 focus:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('card')}>
                    Card
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3x1 my-8'>
                    Books List
                </h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className='text-sky-800 text-4x1' />
                </Link>
            </div>
            {loading ? <Loading /> : showType==="table" ? <BookTable books={books} /> : <BookCard books={books}/>}
        </div>
    );
}

export default Home