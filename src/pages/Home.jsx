import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sort, searchId, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch()

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const page = `${currentPage ? `page=${currentPage}&limit=4` : ''}`;

  const sortBy = sort.sortProperty.replace('-', '');
  const order = `${sort.sortProperty.includes('-') ? 'asc' : 'desc'}`;

  const category = `${categoryId > 0 ? `&category=${categoryId}` : ''}`;

  const search = searchId ? `&title=${encodeURIComponent(searchId)}` : '';

  const urlApi = `https://67c6c90cc19eb8753e7750a7.mockapi.io/items?${page}${category}&sortBy=${sortBy}&order=${order}${search}`;

  useEffect(() => {
    setIsLoading(true);
    // fetch(urlApi)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setItems(res);
    //     setIsLoading(false);
    //     window.scrollTo(0, 0);
    //   })
    //   .catch((err) => {
    //     console.error('Ошибка при запросе данных:', err);
    //     setIsLoading(false);
    //   });

    axios.get(urlApi).then((res) => {
      setItems(res.data);
      setIsLoading(false);
      window.scrollTo(0, 0);
    })
    .catch((err) => {
      console.error('Ошибка при запросе данных:', err.response?.data || err.message);
      setIsLoading(false);
        });
  }, [categoryId, sort, searchId, currentPage]);

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
      <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </>
  );
};

export default Home;
