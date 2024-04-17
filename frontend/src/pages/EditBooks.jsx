import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import { api } from "../../config";

const EditBooks = () => { 
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`${api}/books/${id}`).then((res) => {
      setTitle(res.data.title)
      setAuthor(res.data.author)
      setPublishedYear(res.data.publishedYear)
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
      enqueueSnackbar("Error retrieving book", {variant: "error"});
      alert("Error retrieving book");
    })
  },[]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    console.log(id)
    axios.put(`${api}/books/${id}`, data).then(() => {
      setLoading(false);
      enqueueSnackbar("Updated successfully", {variant: 'success'});
      navigate('/');
    }).catch((err) => {
      setLoading(false);
      enqueueSnackbar(`Error ${err}`, {variant: "error"});
    });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">
        Edit Book
      </h1>
      {loading ? <Loading /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-x mx-auto">
        <div className="my-4">
          <label htmlFor="" className="text-x1 mr-4 text-gray-500">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-x1 mr-4 text-gray-500">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-x1 mr-4 text-gray-500">Published year</label>
          <input type="text" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Update
        </button>
      </div>
    </div>
  );
}

export default EditBooks