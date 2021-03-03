import React,{useContext} from 'react';
import bookContext from '../../context/bookContext';


const AddBook = () => {

  const result=useContext(bookContext)
  const book=result.book
  const handleAddBook=result.handleAddBook
  const handleChange=result.handleChange
  const handleUpdateBook=result.handleUpdateBook
  const onEdit=result.onEdit
  const error=result.errors


  const handleInput=(name,label,value)=>{
    return(
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input type="text" name={name} value={value}  className="form-control" onChange={handleChange} />
        {error[name] && <p className="text-danger">{error[name]}</p>}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="card card-body">
        <form onSubmit={(e)=>{
          e.preventDefault()
        }}>
       
          <div className="form-group">
            <input type="hidden" name="_id" className="form-control" value={book._id} onChange={handleChange}   />
          </div>
          {handleInput('title','Book Title',book.title)}
          {handleInput('price','Book Price',book.price)}
          {!onEdit&&<button className="btn btn-primary mr-5" onClick={()=>handleAddBook(book)}>Submit</button>}
          {onEdit&&<button className="btn btn-primary" onClick={()=>handleUpdateBook(book._id,book)}>Update</button>}
        </form>
      </div>
      
    </React.Fragment>
  );
};

export default AddBook;