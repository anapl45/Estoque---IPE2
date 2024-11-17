import React, { useState, useEffect } from "react";
import styles from "./../styles/components/CRUD.module.css"
import SearchBar from "./busca";
import Painel from "./painel";
import Addmodal from "./addmodal";
import Delmodal from "./delmodal";
import { AiOutlineClose } from "react-icons/ai";
import { collection, getDocs, onSnapshot, where, query as firestoreQuery } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import styles2 from '../styles/components/searchBar.module.css'
import { FaSearch } from 'react-icons/fa';



function CRUD({user}){
    const [itens, setItens] = useState([]);
    const [modal1, setmodal1] = useState(false);
    const [modal2, setmodal2] = useState(false);
    const [resultado, setResultado] = useState([])

    const openModal1 = () =>{
        setmodal1(true);
    }
    const openModal2 = () =>{
        setmodal2(true);
    }

    const closeModal1 = () =>{
        setmodal1(false);
    }

    const closeModal2 = () =>{
        setmodal2(false);
    }

    const fetchItens = () => {
        const unsubscribe = onSnapshot(collection(db, "itens"), (querySnapshot) => {
          const itensArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          setItens(itensArray);
          setResultado(itensArray);
        });
      
        // Opcional: Retornar a função de unsubscribe, se precisar parar de escutar
        return () => unsubscribe();
    };    

    useEffect(() => {
        fetchItens();
    }, []);

    const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(query)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // Obtém todos os documentos da coleção "itens"
        const querySnapshot = await getDocs(collection(db, "itens"));
        const resultados = [];

        // Filtra os documentos que contêm a substring no nome
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.nome.toLowerCase().includes(query.toLowerCase())) {
                resultados.push({ id: doc.id, ...data });
            }
        });

        console.log(resultados)

        setResultado(resultados)
    } catch (error) {
        console.error("Erro ao buscar itens:", error);
    }

    setQuery(""); // Limpa o campo de pesquisa
  };


    if (!user) {
        return (
            <div>
                <h1>carregando!!!</h1>
            </div>
        ); // Ou você pode renderizar um loader, se preferir
    }
    
    if(user.role === 'admin'){
        return(
            <div className={styles.Container}>
                <div className={styles.options}>
                    <h1>Estoque Disponível</h1>
                    <div className={styles.icons}>
                        <form onSubmit={handleSubmit} className={styles2.SearchBar}>
                            <input
                                type="text"
                                placeholder="Pesquisar por nome"
                                value={query}
                                onChange={handleChange}
                            />
                            <button type="submit"><FaSearch className={styles2.SearchIcon}/></button>
                        </form>
                        <button className={styles.addbutton} onClick={openModal1} style={{marginRight: "30px"}}>Adicionar Item</button>
                        {modal1 && (
                                <div className={styles.modaloverlay}>
                                    <div className={styles.modalcontent}>
                                        <div className={styles.closeoption}>
                                            <button className={styles.closebutton} onClick={closeModal1}>
                                                <AiOutlineClose  color="white" size={24} />
                                            </button>
                                        </div>
                                        <Addmodal/>
                                    </div>
                                </div>
                        )}
    
                        {modal2 && (
                                <div className={styles.modaloverlay}>
                                    <div className={styles.modalcontent}>
                                        <div className={styles.closeoption}>
                                            <button className={styles.closebutton} onClick={closeModal2}>
                                                <AiOutlineClose  color="white" size={24} />
                                            </button>
                                        </div>
                                        <Delmodal/>
                                    </div>
                                </div>    
                        )}
    
                    </div>
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.sumario}>
                    <h1>Identificador</h1>
                    <h1>Nome</h1>
                    <h1>Categoria</h1>
                    <h1>Quantidade</h1>
                    <h1>Tamanho</h1>
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.painel}>
                    <Painel array={resultado} user={user}/>
                </div>
            </div>
        )
    }
    
    if(user.role === 'user'){
        return(
            <div className={styles.Container}>
                <div className={styles.title}>
                    <h1>Estoque</h1>
                    <div className={styles.barra} style={{marginLeft: "140px", marginTop: "2px"}}>
                        <form onSubmit={handleSubmit} className={styles2.SearchBar}>
                            <input
                                type="text"
                                placeholder="Pesquisar por nome"
                                value={query}
                                onChange={handleChange}
                            />
                            <button type="submit"><FaSearch className={styles2.SearchIcon}/></button>
                        </form>
                    </div>
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.sumario}>
                    <h1>Identificador</h1>
                    <h1>Nome</h1>
                    <h1>Categoria</h1>
                    <h1>Quantidade</h1>
                    <h1>Tamanho</h1>
                </div>
                <hr className={styles.divider}></hr>
                <div className={styles.painel}>
                    <Painel array={resultado}/>
                </div>
            </div>
        )
    }
    
}

export default CRUD;