import React from "react";
import { useState } from "react";
import styles from '../styles/components/cautelaform.module.css'
import { db } from "../services/firebaseConfig";  
import { doc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AppContext } from "../Context/appContext";


function Baixaform(){
    const[número, setNúmero] = useState("");
    const[ID, setID] = useState('');
    const[quantidade, setQuantidade] = useState(0);
    const[tipo, setTipo] = useState('unidades');


    const { user, loading } = useContext(AppContext);

    
    
    async function atualizarValoresCautela(Id, novosDados) {
        const cautRef = doc(db, "cautelas", Id);
      
        try {
          await updateDoc(cautRef, novosDados);
          console.log("Dados de cautela atualizados com sucesso!");
        } catch (error) {
          console.error("Erro ao atualizar os dados: ", error);
        }
    }

    async function atualizarValoresDoEstoque(Id, novosDados) {
        // Referência ao documento do usuário
        const usuarioRef = doc(db, "itens", Id);
      
        try {
          await updateDoc(usuarioRef, novosDados);
          console.log("Dados do usuário atualizados com sucesso!");
        } catch (error) {
          console.error("Erro ao atualizar os dados: ", error);
        }
    }
   

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const identificador = número + ID;

        const docRef = doc(db, "cautelas", identificador);

        const docSnap = await getDoc(docRef);

        let dadosDoDocumento;

        if (docSnap.exists()) {
            dadosDoDocumento = docSnap.data();
            console.log("Dados do documento antes de deletar:", dadosDoDocumento);
        } else {
            console.log("Documento não encontrado!");
            return; 
        }
        
        const qnt = dadosDoDocumento.item.quantidade - quantidade;

        const updatedCaut = {
            aluno: dadosDoDocumento.aluno,
            item: {
                quantidade: qnt,
                nome: dadosDoDocumento.item.nome,
                tamanho: dadosDoDocumento.item.tamanho,
                tipo: dadosDoDocumento.item.tipo,
                categoria: dadosDoDocumento.item.categoria,
            }
        }


        const docRef2 = doc(db, "itens", ID);

        const docSnap2 = await getDoc(docRef2);

        let Item = docSnap2.data()

        console.log(Item)

        const updatedItem = {
            nome: dadosDoDocumento.item.nome,
            tamanho: dadosDoDocumento.item.tamanho,
            tipo: dadosDoDocumento.item.tipo,
            categoria: dadosDoDocumento.item.categoria,
            quantidade: (parseInt(Item.quantidade) + parseInt(quantidade)).toString()
        }
        
        if (qnt == 0){
            try {
                await deleteDoc(doc(db, "cautelas", identificador));
                atualizarValoresDoEstoque(ID, updatedItem);
            } 
           
            catch (e) {
                console.error("Erro ao deletar documento: ", e);
            }
        }
        if(qnt > 0){
            try {
                atualizarValoresCautela(identificador, updatedCaut);
                atualizarValoresDoEstoque(ID, updatedItem);
            } 
           
            catch (e) {
                console.error("Erro ao atualizar documento: ", e);
            }
        }

         setQuantidade(0)
         setID(0);
         setNúmero('');
    };
  


    return(
        <div className={styles.Container}>
            <h2>Remover Cautela</h2>
            <form onSubmit={handleSubmit} className={styles.forms}>
                <div className={styles.inputs}>
                    <label htmlFor="Número">Número do aluno: </label>
                    <input
                    type="Número"
                    placeholder="Número"
                    id="Número"
                    value={número}
                    onChange={(e) => setNúmero(e.target.value)}/>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="ID">ID: </label>
                    <input
                    type="ID"
                    placeholder="ID"
                    id="ID"
                    value={ID}
                    onChange={(e) => setID(e.target.value)}/>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="quantidade">Quantidade: </label>
                    <input
                    type="quantidade"
                    placeholder="quantidade desejada (pares ou unidades)"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}/>
                </div>
                <div className={styles.radio}>
                    <div className={styles.roptions}>
                        <div>
                            <input
                            type="radio"
                            id="unidades"
                            name="tipoQuantidade"
                            value="unidades"
                            checked={tipo === "unidades"}
                            onChange={(e) => setTipo(e.target.value)}
                            />
                            <label htmlFor="unidades">Unidades</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            id="pares"
                            name="tipoQuantidade"
                            value="pares"
                            checked={tipo === "pares"}
                            onChange={(e) => setTipo(e.target.value)}
                            />
                            <label htmlFor="pares">Pares</label>
                        </div>
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit}>Remover</button>
            </form>
        </div>
    );
}

export default Baixaform;