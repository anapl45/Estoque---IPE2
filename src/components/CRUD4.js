import React, { useState, useEffect } from "react";
import styles from "./../styles/components/CRUD4.module.css"
import Painel4 from "./painel4";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseConfig";


function CRUD4(){
    const [itens, setItens] = useState([]);


    const fetchItens = () => {
        const unsubscribe = onSnapshot(collection(db, "usuários"), (querySnapshot) => {
          const itensArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          setItens(itensArray);
        });
      
        // Opcional: Retornar a função de unsubscribe, se precisar parar de escutar
        return () => unsubscribe();
    };    

    useEffect(() => {
        fetchItens();
    }, []);

    return(
        <div className={styles.Container}>
            <div className={styles.title}>
                <h1>Usuários</h1>
            </div>
            <hr className={styles.divider}></hr>
            <div className={styles.sumario} styles={{}}>
                <h1>Nome</h1>
                <h1>Número</h1>
                <h1>Posto/Graduação</h1>
                <h1>Função</h1>
            </div>
            <hr className={styles.divider}></hr>
            <div className={styles.painel}>
                <Painel4 array={itens}/>
            </div>
        </div>
    )
}

export default CRUD4;