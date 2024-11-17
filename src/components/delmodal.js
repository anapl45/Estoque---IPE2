import { deleteDoc } from "firebase/firestore";
import styles from "../styles/components/delmodal.module.css"
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";


function Delmodal({produto}){



    //erros
    const [erro1, setErro1] = useState(false);
    const [erro3, seterro3] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setErro1(false);
        seterro3(false);

        const produtoRef = doc(db, "itens", produto.id);
        await deleteDoc(produtoRef);

    };

    return(
        <div className={styles.Container}>
            <h2>Confirmação!</h2>
            <div className={styles.forms}>
                <div className={styles.infotext}>
                <p>Você realmente deseja remover esse item?</p>
                    <p>Identificador: {produto.id}</p>
                    <p>Nome: {produto.nome}</p>
                    <p>Categoria: {produto.categoria}</p>
                    <p>Quantidade: {produto.quantidade} {produto.tipo}</p>
                    <p>Tamanho: {produto.tamanho}</p>
                </div>
                <button onClick={handleSubmit}>Remover item</button>
            </div>
        </div>
    )
}

export default Delmodal;