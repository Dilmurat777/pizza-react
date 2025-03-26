import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import Categories from '../components/Categories';
import { useEffect, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizza, selectInitialState } from '../redux/slices/pizzaSlice';

const Home = () => {
  const { categoryId, sort, searchId, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectInitialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getFetchPizza = async () => {
    const page = `${currentPage ? `page=${currentPage}&limit=4` : ''}`;
    const sortBy = sort.sortProperty.replace('-', '');
    const order = `${sort.sortProperty.includes('-') ? 'asc' : 'desc'}`;
    const category = `${categoryId > 0 ? `&category=${categoryId}` : ''}`;
    const search = searchId ? `&title=${encodeURIComponent(searchId)}` : '';
    dispatch(
      fetchPizza({
        page,
        sortBy,
        order,
        category,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortFilter = sortList.find((obj) => obj.sortProperty === params.sort);

      dispatch(
        setFilters({
          ...params,
          sortFilter,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    getFetchPizza();
  }, [categoryId, sort, searchId, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getFetchPizza();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchId, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);


  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort valueSort={sort} />

        <h2 className="content__title">
          {categoryId === 0
            ? 'Все Пиццы'
            : categoryId === 1
            ? 'Мясные'
            : categoryId === 2
            ? 'Вегетарианская'
            : categoryId === 3
            ? 'Гриль'
            : categoryId === 4
            ? 'Острые'
            : categoryId === 5
            ? 'Закрытые'
            : ''}
        </h2>
        <div className="content__top">
          {status === 'error' ? (
            <div style={{ display: 'block', textAlign: 'center', width: '100%'}}>
              <h2 className="content__title">Произошла ошибка 😕</h2>
              <p style={{ fontWeight: 500, fontSize: '18px' }}>
                К сожалению нам не удалось получить пиццы. Попробуйте повторить попытку позже.
              </p>
            </div>
          ) : status === 'loading' ? (
            [...new Array(4)].map((_, idx) => <Skeleton key={idx} />)
          ) : items && Array.isArray(items) ? (
            items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
          ) : (
            <p>Пиццы не найдены</p>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </>
  );
};

export default Home;
