import React, { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  const onCategory = (index) => {
    setActiveIndex(index)
  }
  return (
    <div className="categories">
      <ul>
        {
          category.map((value, idx) => {
            return <li key={idx} onClick={() => onCategory(idx)} className={activeIndex === idx ? 'active' : ''}>{value}</li>
          })
        }
      </ul>
    </div>
  );
};

export default Categories;
