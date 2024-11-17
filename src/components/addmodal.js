import styles from "../styles/components/addmodal.module.css"
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

function Addmodal(){

    const[ID, setID] = useState("");
    const[nome, setNome] = useState("");
    const[categoria, setCategoria] = useState("Uniforme");
    const[quantidade, setQuantidade] = useState("");
    const[tamanho, setTamanho] = useState("");
    const [tipo, setTipo] = useState("unidades");


    const navigate = useNavigate();

    const handleCategoriaChange = (event) => {
      setCategoria(event.target.value);
    };  

    const handleTipoChange = (event) => {
      setTipo(event.target.value);
    };

    const tipos = ['unidades', 'pares', 'metros']
    const categorias = ['Uniforme', "Material de Campo", "Material de Limpeza", "Multimidia", "Material Esportivo","Diversos"]

    //erros
    const [erro1, setErro1] = useState(false);
    const [erro2, setErro2] = useState(false);
    const [erro3, seterro3] = useState(false);

    async function handleSubmit(e){
      e.preventDefault();
      setErro1(false);
      seterro3(false);


      if(nome === '' || ID === 0 || categoria === '' || quantidade === 0 || tamanho === ''){
          setNome('');
          setID(0);
          setTamanho('');
          setCategoria('');
          setQuantidade(0);
          setErro1(true);
      } else{

          try {
              // Cria/atualiza um documento com um ID específico
              await setDoc(doc(db, "itens", ID), {
                  nome: nome,
                  categoria: categoria,
                  quantidade: quantidade,
                  tipo: tipo,
                  tamanho: tamanho,
                });
          
          } 
          
          catch (e) {
              console.error("Erro ao salvar documento: ", e);
          }

          setNome('');
          setID(0);
          setTamanho('');
          setCategoria('');
          setQuantidade('');
      }
       
  };

    return(
      <div className={styles.Container}>
        <h2>Adicionar item</h2>
        <div className={styles.forms}>
          <div className={styles.inputs}>
            <label htmlFor="ID">ID: </label>
            <input
              type="text"
              placeholder="ID"
              id="ID"
              value={ID}
              onChange={(e) => setID(e.target.value)}
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="Nome">Nome: </label>
            <input
              type="text"
              placeholder="Nome"
              id="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="Tamanho">Tamanho: </label>
            <input
              type="text"
              placeholder="Tamanho"
              id="Tamanho"
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="Quantidade">Quantidade: </label>
            <input
              type="number"
              placeholder="Quantidade"
              id="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>
          <div className={styles.inputs}>
                    <label htmlFor="Tipo">Tipo: </label>
                    <select 
                    id="tipo" 
                    value={tipo} 
                    onChange={handleTipoChange} 
                    required
                    >
                        <option value="" disabled>Tipo</option>
                        {tipos.map((pat, index) => (
                            <option key={index} value={pat}>
                                {pat}
                            </option>
                        ))}
                    </select>
          </div>
          <div className={styles.inputs}>
                    <label htmlFor="Categoria">Categoria: </label>
                    <select 
                    id="categoria" 
                    value={categoria} 
                    onChange={handleCategoriaChange} 
                    required
                    >
                        <option value="" disabled>Tipo</option>
                        {categorias.map((pat, index) => (
                            <option key={index} value={pat}>
                                {pat}
                            </option>
                        ))}
                    </select>
          </div>
          {erro1 && (
            <div className={styles.erro}>
              <h4>Formulário não submetido. Preencha os campos vazios</h4>
            </div>
          )}
          {erro3 && (
            <div className={styles.erro}>
              <h4>Formulário não submetido. As Nomes não coincidem!</h4>
            </div>
          )}
          <button onClick={handleSubmit}>Adicionar item</button>
        </div>
      </div>  
      
    )
}

export default Addmodal;