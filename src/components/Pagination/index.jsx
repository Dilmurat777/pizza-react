import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      activeLinkClassName="selected" // Заменили activeClassName
    />
  );
};

export default Pagination;
