import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import axios from 'axios';
import './styles.css';

const Produto = () => {
  const [quantidade, setQuantidade] = useState(1);

  const { restauranteid, nome } = useParams();
  const [prato, setPrato] = useState({});

  const getPratos = () => {
    axios
      .get(
        `https://afternoon-garden-13285.herokuapp.com/restaurante/${restauranteid}`
      )
      .then((res) => {
        console.log(res);
        res.data.pratos.forEach(item => {
          if(item.nome == nome) {
            setPrato(item);
          }
        });
      });
  };

  useEffect(() => {
    getPratos();
  }, []);
  return (
    <div className="produto-container">
      <div className="produto-card-container">
        <img src="https://images.unsplash.com/photo-1619860860774-1e2e17343432?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80" />
      </div>
      <div className="produto-card-content">
        <h2>{prato.nome}</h2>
        <div className="produto-input-container">
          <AiFillMinusCircle
            color="#C4C4C4"
            size={30}
            onClick={() =>
              setQuantidade((quantidade) =>
                quantidade > 0 ? quantidade - 1 : quantidade
              )
            }
          />
          <input value={quantidade} />
          <AiFillPlusCircle
            color="#C4C4C4"
            size={30}
            onClick={() =>
              setQuantidade((quantidade) =>
                quantidade >= 0 ? quantidade + 1 : quantidade
              )
            }
          />
        </div>
        <div className="produto-button">
          <span>R${(prato.price * quantidade).toFixed(2)}</span>
          <span>COMPRAR</span>
        </div>
      </div>
    </div>
  );
};

export default Produto;
