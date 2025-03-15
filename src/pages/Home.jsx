import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import Categories from '../components/Categories';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { categoryId, sort, searchId, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizza = () => {
    setIsLoading(true);
    const page = `${currentPage ? `page=${currentPage}&limit=4` : ''}`;
    const sortBy = sort.sortProperty.replace('-', '');
    const order = `${sort.sortProperty.includes('-') ? 'asc' : 'desc'}`;
    const category = `${categoryId > 0 ? `&category=${categoryId}` : ''}`;
    const search = searchId ? `&title=${encodeURIComponent(searchId)}` : '';
    axios
      .get(
        `https://67c6c90cc19eb8753e7750a7.mockapi.io/items?${page}${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при запросе данных:', err.response?.data || err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortFilter = sortList.find((obj) => obj.sortProperty === params.sort);
      console.log(sortFilter);

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
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false
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
      </div>
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
      <div className="content__items">
        {isLoading ? (
          [...new Array(2)].map((_, idx) => <Skeleton key={idx} />)
        ) : items && Array.isArray(items) ? (
          items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        ) : (
          <p>Пиццы не найдены</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </>
  );
};

export default Home;
