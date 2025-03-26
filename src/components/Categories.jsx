import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setCategoryId } from "../redux/slices/filterSlice";






const Categories = () => {
  const dispatch = useDispatch()
  const categoryId = useSelector(selectCategory)
  const categoryName = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {
          categoryName.map((value, idx) => {
            return <li key={idx} onClick={() => dispatch(setCategoryId(idx))} className={categoryId === idx ? 'active' : ''}>{value}</li>
          })
        }
      </ul>
    </div>
  );
};

export default Categories;
