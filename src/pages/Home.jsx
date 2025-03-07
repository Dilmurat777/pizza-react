import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';


const Home = ({ searchId }) => {
  
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)

  const [categoryId, setCategoryId] = useState(0);
  const [sortTypeId, setSortTypeId] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
 
  const page = `${currentPage ? `page=${currentPage}&limit=4` : ''}`
  
  const sortBy = sortTypeId.sortProperty.replace('-', '');
  const order = `${sortTypeId.sortProperty.includes('-') ? 'asc' : 'desc'}`;
  
  const category = `${categoryId > 0 ? `category=${categoryId}` : ''}`;
  
  const search = searchId ? `&title=${searchId}` : '';
  const urlApi = `https://67c6c90cc19eb8753e7750a7.mockapi.io/items?${page}${category}&sortBy=${sortBy}&order=${order}${search}`;
  
  useEffect(() => {
    setIsLoading(true);
    fetch(urlApi)
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.error('Ошибка при запросе данных:', err);
        setIsLoading(false);
      });
    }, [categoryId, sortTypeId, searchId, currentPage]);
    return (
      <>
      <div className="content__top">
        <Categories valueCategory={categoryId} onChangeCategory={(idx) => setCategoryId(idx)} />
        <Sort valueSort={sortTypeId} onChangeSort={(idx) => setSortTypeId(idx)} />
      </div>
        <h2 className="content__title">{categoryId === 0 ? 'Все Пиццы' : categoryId === 1 ? 'Мясные' : categoryId === 2 ? 'Вегетарианская' : categoryId === 3 ? 'Гриль' : categoryId === 4 ? 'Острые' : categoryId === 5 ? 'Закрытые' : ''}</h2>
      <div className="content__items">
        {isLoading ? (
          [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
        ) : items && Array.isArray(items) ? (
          items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        ) : (
          <p>Пиццы не найдены</p>
          )}
      </div>
        <Pagination onChangePage={(number) => setCurrentPage(number) } />
    </>
  );
};

export default Home;
