import React,{useState,useEffect} from 'react';
import bookContext from '../../context/bookContext';
import AddBook from './add';
import ListBooks from './list';
import idGen from '../../utils/idGen'
import Joi from 'joi-browser'
import Pagination, { Paginate } from './../../utils/pagination';

const MainBook = () => {
  const id=idGen()
  const initialState={_id:id,title:'',price:''}
  const [book,setBook]=useState(initialState)
  let [errors,setErrors]=useState({})
  const booksFromLocalStorage=JSON.parse(localStorage.getItem('books')||'[]')
  const [books,setBooks]=useState(booksFromLocalStorage)
  const [onEdit,setOnEdit]=useState(false)
  const [currentPage,setCurrentPage]=useState(1)
  const pageSize=3
  const [searchQuery,setSearchQuery]=useState('')

  let filtering=books;
  if (searchQuery)
      filtering = books.filter((book) =>
        book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
  const itemsPerPage=Paginate(filtering,currentPage,pageSize)
  
  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books))
  },[books])

  let schema={
    _id:Joi.string(),
    title:Joi.string().required().label('Title'),
    price:Joi.number().required().positive().label('Price'),
  }
  const validate=()=>{
    const options={abortEarly:false}
    const {error}=Joi.validate(book,schema,options)
    if(!error)return null;
    //get details array and map it to an object 
    const errors={}
    for (let item of error.details)
    errors[item.path[0]]=item.message
    return errors
   
  }
  const validatProperty = ({ name, value }) => {
    const obj = { [name]: value };
    schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  const handleChange=({currentTarget: input })=>{
    const newErrors = {...errors};
    const errorMessage = validatProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors)
    const {name,value}=input
    setBook({...book,[name]:value})
  }
  const handleAddBook=(book)=>{
     let errors=validate()
     setErrors(errors||{})
     if(errors)return;
    setBooks([...books,book])
      setBook(initialState)
  }
  const handleUpdateBook=(_id,updatedBook)=>{
    const error=validate()
    setErrors(error||{})
    if(error)return;
    else{
      setBooks(books.map((item) => (item._id === _id ? updatedBook : item)))
      setBook(initialState)
      setOnEdit(false)
    }
  }
  const handleDelete=(book)=>{
    setBooks(books.filter(b=>b._id!==book._id))
  }
  const handleCurrentBook=(book)=>{
    setBook({_id:book._id,title:book.title,price:book.price})
    setOnEdit(true)
  }

  const handlePageChange=page=>{
    setCurrentPage(page)
  }
  const handleSearch = (query)=>{
    setSearchQuery(query)
    setCurrentPage(1)
  }
 


  return (
    <div style={{ paddingTop: "70px"}}>
      <bookContext.Provider value={{handleAddBook,book,books,handleChange,handleDelete,handleCurrentBook,handleUpdateBook,onEdit,errors,handlePageChange,currentPage,pageSize,itemsPerPage,handleSearch,filtering}}>
        <div className="row">
          <div className="col-md-4">
            <AddBook/>
          </div>
          <div className="col-md-8">
            <ListBooks/>
            <div className="mt-5">
            <Pagination/>
            </div>
          </div>
        </div>
      </bookContext.Provider>
      
    </div>
  );
};

export default MainBook;