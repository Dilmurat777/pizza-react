import { useCallback, useRef} from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, setSearchId, setValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const { value } = useSelector(selectSearch)
  
  const dispatch = useDispatch()

  const inputRef = useRef(null);

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchId(str))
    }, 700),
    [],
  );

  const onChangeInput = (e) => {
    dispatch(setValue(e.target.value));
    updateSearchValue(e.target.value)
  };



  const clickClear = () => {
    dispatch(setSearchId(''))
    dispatch(setValue(''))
    inputRef.current.focus();
  };

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.search_input}
        type="text"
        placeholder="Search pizza..."
      />
      <svg
        className={styles.search_icon}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      {value && (
        
        
        <svg
          onClick={clickClear}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.search_close}>
          <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
          <path d="m12 9 6 6" />
          <path d="m18 9-6 6" />
        </svg>
      )}
    </div>
  );
};

export default Search;
