import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../redux/filterSlice'
import style from './pagination.module.scss'

// Invoke when user click to request another page.
// const handlePageClick = (event) => {
//   const newOffset = (event.selected * itemsPerPage) % items.length;
//   console.log(
//     `User requested page number ${event.selected}, which is offset ${newOffset}`
//   );
//   setItemOffset(newOffset);
// };

const Pagination = ({ pizzaItemsCount, pizzasPerPage }) => {
  const { page } = useSelector(state => state.filterSortSlice)
  const dispatch = useDispatch()

  return (
    <div className={style.rootParent}>
      <ReactPaginate
        // initialPage={page}
        className={style.root}
        pageClassName={style.listElement}
        activeClassName={style.listElement_active}
        pageLinkClassName={style.linkElement}
        activeLinkClassName={style.linkElement_active}
        previousClassName={style.prevButton}
        nextClassName={style.nextButton}
        previousLinkClassName={style.prevButton}
        nextLinkClassName={style.nextButton}
        breakLabel="..."
        nextLabel=""
        onPageChange={event => {
          console.log('сработал пейдж')

          dispatch(setPage({ page: event.selected }))
        }}
        pageRangeDisplayed={pizzasPerPage}
        pageCount={2}
        // pageCount={Math.floor(pizzaItemsCount / pizzasPerPage)}
        previousLabel=""
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination