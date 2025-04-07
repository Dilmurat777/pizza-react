import {  useSelector } from "react-redux";
import { selectCategory } from "../redux/slices/filterSlice";

type CategoriesProps = {
  onChangeCategory: (idx: number) => void;
}




const Categories: React.FC<CategoriesProps> = ({onChangeCategory}) => {
 
  const categoryId = useSelector(selectCategory)
  const categoryName = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {
          categoryName.map((value, idx) => {
            return <li key={idx} onClick={() => onChangeCategory(idx)} className={categoryId === idx ? 'active' : ''}>{value}</li>
          })
        }
      </ul>
    </div>
  );
};

export default Categories;
