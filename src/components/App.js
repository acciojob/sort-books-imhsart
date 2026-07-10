import axios from "axios";
import React, {useState, useEffect} from "react";
import './../styles/App.css';
import { success, loading, failure, sort } from "../redux/actionCreator";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch()
  const {loading: isLoading, data: bookData, error} = useSelector(state => state.sort)
  const [category, setCategory] = useState('title')
  const [order, setOrder] = useState('asc')

  useEffect(() => {
    getData()
  }, [])


  async function getData(){
      dispatch(loading())
      const apikey = 'XaJWAhrSPAdMqpxLNITLDLgWSGqYY30int2DPVETuROZksMi'
      try{
        const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/2025-05-04/hardcover-fiction?api-key=${apikey}`)
        dispatch(success(response.data.results.books))
      }catch(error){
        dispatch(failure(error))
      }
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(sort(category, order))
  }


  return (
    <div className="container">
      <h1>Books List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sort-by">sort by</label>
        <select id="sort-by" value={category} onChange={e=> setCategory(e.target.value)}>
          <option value='title'>Title</option>
          <option value='author'>Author</option>
          <option value='publisher'>Publisher</option>
        </select>
        <label htmlFor="order">order</label>
        <select id="order" onChange={e => setOrder(e.target.value)} value={order}>
          <option value='asc'>Asc</option>
          <option value='desc'>Desc</option>
        </select>
        <button type="submit">Sort Books</button>
      </form>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {
              bookData.length > 0 && (
                bookData.map(book => {
                  return <tr key={book.rank}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.primary_isbn13}</td>
                  </tr>
                })
              )
            }
          </tbody>
        </table>
    </div>
  )
}

export default App
