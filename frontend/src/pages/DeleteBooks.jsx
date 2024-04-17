import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import { api } from '../../config';

const DeleteBooks = () => {
  
  const[loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const handleDelete = () => {
    setLoading(true)
    axios.delete(`${api}/books/${id}`)
    .then(() => {
      setLoading(false);
      enqueueSnackbar("Book deleted succesfully", {variant: "success"});
      navigate('/');
    }).catch((err) => {
      setLoading(false);
      console.log(`${api}/books/${id}`);
      console.log("error: ", err);
      enqueueSnackbar(`Error: ${err}`, {variant: "error"});
    })
  };

  return (
      <div className='p-4'>
        <BackButton />
        <h1 className='text 3x1 my-4'>
          Delete Books
        </h1>
        {loading ? <Loading /> : ''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto'>
          <h3 className='text-2x1'>
            Are you sure you want to delete this book?
          </h3>
          <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDelete}>
            Yes, Delete it!
          </button>
        </div>
      </div>
  )
}

export default DeleteBooks