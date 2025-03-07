import { useContext } from "react";
import { CustomContext } from "../config/context";



const Categories = ({valueCategory, onChangeCategory}) => {
 
  const { categoryName } = useContext(CustomContext);

  return (
    <div className="categories">
      <ul>
        {
          categoryName.map((value, idx) => {
            return <li key={idx} onClick={() => onChangeCategory(idx)} className={valueCategory === idx ? 'active' : ''}>{value}</li>
          })
        }
      </ul>
    </div>
  );
};

export default Categories;
