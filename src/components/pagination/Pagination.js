import React from 'react'
import ReactPaginate from 'react-paginate'
import style from './pagination.module.scss'

// Invoke when user click to request another page.
// const handlePageClick = (event) => {
//   const newOffset = (event.selected * itemsPerPage) % items.length;
//   console.log(
//     `User requested page number ${event.selected}, which is offset ${newOffset}`
//   );
//   setItemOffset(newOffset);
// };

const Pagination = () => {
  return (

    <div className={style.rootParent}>
      <ReactPaginate
        className={style.root}
        pageClassName={style.listElement}
        activeClassName={style.listElement_active}
        pageLinkClassName={style.linkElement}
        activeLinkClassName={style.linkElement_active}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => console.log(event)
        }
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination