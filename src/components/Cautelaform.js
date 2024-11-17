import React from "react";
import { useState } from "react";
import styles from '../styles/components/cautelaform.module.css'
import { db } from "../services/firebaseConfig";  
import { doc, setDoc, getDoc, query, getDocs, where, collection, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AppContext } from "../Context/appContext";


function Cautelaform(){
    const[número, setNúmero] = useState("");
    const[ID, setID] = useState('');
    const[quantidade, setQuantidade] = useState(0);
    const[tipo, setTipo] = useState('unidades');


    const { user, loading } = useContext(AppContext);

    async function getUserByNumber(userNumber){

        const usersCollection = collection(db, 'usuários');
      
        const q = query(usersCollection, where('número', '==', userNumber));
      
        // Executa a consulta
        const querySnapshot = await getDocs(q);
      
        // Verifica se encontrou algum documento
        if (!querySnapshot.empty) {
          // Pega o primeiro documento encontrado (supondo que o número seja único)
          const userDoc = querySnapshot.docs[0];
      
          // Armazena o objeto usuário
          const userData = userDoc.data();
          
          console.log("Usuário encontrado:", userData);
          return userData; // Armazena o objeto retornado na variável
        } else {
          console.log('Nenhum usuário encontrado com o número fornecido');
          return null;
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

        const docRef = doc(db, "itens", ID); 
        const req = await getDoc(docRef); 

        const item = req.data();
        
        const aluno = await getUserByNumber(número);

        const updatedItem = {
            nome: item.nome,
            categoria: item.categoria,
            tamanho: item.tamanho,
            tipo: item.tipo,
            quantidade: item.quantidade - quantidade,
        }

        const cautItem = {
            nome: item.nome,
            categoria: item.categoria,
            tamanho: item.tamanho,
            tipo: item.tipo,
            quantidade: quantidade,
        }

        const ci = aluno.número + String(req.id);

        console.log(ci);

        try {
             // Cria/atualiza um documento com um ID específico
             await setDoc(doc(db, "cautelas", ci), {
                aluno: aluno,
                item: cautItem,

            });
                
            atualizarValoresDoEstoque(ID, updatedItem);

            console.log("deu bom")
         } 
        
         catch (e) {
             console.error("Erro ao salvar documento: ", e);
         }

         setQuantidade(0)
         setID(0);
         setNúmero('');

    };
  


    return(
        <div className={styles.Container}>
            <h2>Lançar Cautela</h2>
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
                <button style={{width: "30%"}} type="submit" onClick={handleSubmit}>Lançar Cautela</button>
            </form>
        </div>
    );
}

export default Cautelaform;