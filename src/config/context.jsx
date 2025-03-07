import { createContext, useContext} from 'react';

// Создаем контекст
export const CustomContext = createContext();

// Хук для удобного использования контекста
export const useCustomContext = () => useContext(CustomContext);

// Провайдер контекста
export const ContextProvider = ({ children }) => {

	const categoryName = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <CustomContext.Provider value={{categoryName  }}>
      {children}
    </CustomContext.Provider>
  );
};
