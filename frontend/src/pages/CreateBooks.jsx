import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../config';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';

const CreateBooks = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishedYear,
        };
        setLoading(true);
        axios.post(`${api}/books`, data)
        .then(() => {
            setLoading(false);
            enqueueSnackbar("Book created Successfully", {variant: "success"})
            console.log('success', data);
            navigate("/");
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            enqueueSnackbar(`Book not created:`, {variant: "error"})
        });
    };

    return(
        <div className='p-4'>
            <BackButton />
            <h1 className='text 3x1 my-4'>Create Book</h1>
            {loading ? <Loading /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label htmlFor="" className='text-x1 mr-4 text-gray-500'>Title</label>
                    <input className='border-2 border-gray-500 px-4 py-2 w-full' type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='my-4'>
                    <label htmlFor="" className='text-x1 mr-4 text-gray-500'>Author</label>
                    <input className='border-2 border-gray-500 px-4 py-2 w-full' type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div className='my-4'>
                    <label htmlFor="" className='text-x1 mr-4 text-gray-500'>Published Year</label>
                    <input className='border-2 border-gray-500 px-4 py-2 w-full' type="text" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)}/>
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default CreateBooks