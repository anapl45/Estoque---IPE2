import React, { useState, useEffect } from "react";
import styles from "./../styles/components/CRUD3.module.css"
import Painel3 from '../components/painel3'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseConfig";


function CRUD3(){
    const [itens, setItens] = useState([]);


    const fetchItens = () => {
        const unsubscribe = onSnapshot(collection(db, "cautelas"), (querySnapshot) => {
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
                <h1>Cautelas</h1>
            </div>
            <hr className={styles.divider}></hr>
            <div className={styles.sumario}>
                <h1>Aluno</h1>
                <h1>Posto/Grad</h1>
                <h1>Item</h1>
                <h1>Quantidade</h1>
                <h1>Tamanho</h1>
            </div>
            <hr className={styles.divider}></hr>
            <div className={styles.painel}>
                <Painel3 array={itens}/>
            </div>
        </div>
    )
}

export default CRUD3;