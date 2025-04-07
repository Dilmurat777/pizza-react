import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SinglePizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  useEffect(() => {
    const getSinglePage = async () => {
      try {
        const { data } = await axios.get(`https://67c6c90cc19eb8753e7750a7.mockapi.io/items/${id}`);
        setData(data);
      } catch (error) {
        alert('Ошибка при получения пиццы!');
        navigate('/');
      }
    };
    getSinglePage();
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div style={{ display: 'flex', columnCount: '20px' }}>
        <div>
          <img className="single-page__img" src={data.imageUrl} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
          <h2>{data.title}</h2>
          <h2>{data.price} com</h2>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        style={{ fontSize: '18px', display: 'flex', justifySelf: 'anchor-center' }}
        className="button button--black">
        GO Home page
      </button>
    </div>
  );
};

export default SinglePizza;
