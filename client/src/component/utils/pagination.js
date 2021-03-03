import React,{useContext} from 'react';
import bookContext from '../context/bookContext';
import _ from 'lodash';

export default function Pagination(){
  //impoted props
  const items=useContext(bookContext)
  const books=items.filtering
  const itemsCount=books.length
  const pageSize=items.pageSize
  const handlePageChange=items.handlePageChange
  const currentPage=items.currentPage
  //pagesCount
  const pagesCount=Math.ceil(itemsCount/pageSize)

  if(pagesCount===1)return null;
  const pages=_.range(1,pagesCount+1)
  
  return(
    <React.Fragment>
      <nav aria-label="Page navigation example mt-4">
        <ul className="pagination">
          {pages.map(page=>(
            <li key={page}
            className={page===currentPage?"page-item active": "page-item"}><button className="page-link" onClick={()=>handlePageChange(page)}>{page}</button></li>
          ))}
          
        </ul>
      </nav>

    </React.Fragment>
  )

}
export function Paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
