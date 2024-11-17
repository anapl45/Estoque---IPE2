import React, { useState, useEffect } from "react";
import styles from "./../styles/components/CRUD2.module.css"
import Painel from "./painel";
import { AiOutlineClose } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { AppContext } from "../Context/appContext";
import { useContext } from "react";
import Painel2 from "./painel2";




function CRUD2(){
    const { user, loading } = useContext(AppContext);
    const [itens, setItens] = useState([]);
    const [modal1, setmodal1] = useState(false);
    const [modal2, setmodal2] = useState(false);



            const fetchCaut = (user) => {
            const unsubscribe = onSnapshot(collection(db, "cautelas"), (querySnapshot) => {
                const cautelasArray = querySnapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter((cautela) => {
                    // Verifica se os primeiros 5 números da string cautela.id são iguais ao nome do usuário
                    return cautela.id.slice(0, 5) === user.número;
                });
                
                setItens(cautelasArray); // Atualiza o estado com as cautelas filtradas
            });

            // Retorna a função de unsubscribe, caso queira parar de escutar
            return () => unsubscribe();
            };

            useEffect(() => {
            if (user) {
                fetchCaut(user); // Chama a função apenas se o usuário estiver definido
            }
            }, [user]); // O useEffect será disparado quando o 'user' mudar

    return(
        <div className={styles.Container}>
            <div className={styles.title}>
                <h1>Itens Cautelados</h1>
            </div>
            <hr className={styles.divider}></hr>
            <div className={styles.sumario}>
                <h1>Nome</h1>
                <h1>Categoria</h1>
                <h1>Quantidade</h1>
                <h1>Tamanho</h1>
            </div>
            <hr className={styles.divider}></hr>
            <div className={styles.painel}>
                <Painel2 array={itens}/>
            </div>
        </div>
    )
}

export default CRUD2;