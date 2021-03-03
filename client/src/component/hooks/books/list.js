import React,{useContext} from 'react';
import bookContext from '../../context/bookContext';

const ListBooks = () => {
  const result=useContext(bookContext)
  const books=result.itemsPerPage
  const handleDelete=result.handleDelete
  const handleCurrentBook=result.handleCurrentBook
  const handleSearch=result.handleSearch
  
const message='No items found'
  return (
    <React.Fragment>
     <div>
     <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">title</th>
            <th scope="col">price</th>
            <th scope="col"> </th>
            <th scope="col"> </th>
            <th scope="col">
              <input type="text" name="query" onChange={e=>handleSearch(e.target.value)} className="form-control" placeholder="Search for book..." /> <i className="fa fa-search" style={{position:"absolute",top:"25px",right:"40px"}}></i>
              </th>
          </tr>
        </thead>
          {books.length===0 && <tbody><tr><td className="text-danger">{message}</td></tr></tbody>}
        <tbody>
          {books.map(book=>(
            <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.price}</td>
            <td></td>
            <td><button className="btn btn-primary" onClick={()=>handleCurrentBook(book)}><i className="fa fa-edit"></i></button></td>
            <td><button className="btn btn-danger" onClick={()=>handleDelete(book)}><i className="fa fa-trash"></i></button></td>
          </tr>
          ))}

          
          
        </tbody>
        
      </table>
     </div>
    </React.Fragment>
  );
};

export default ListBooks;