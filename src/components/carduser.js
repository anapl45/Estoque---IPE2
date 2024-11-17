import styles from '../styles/components/carduser.module.css'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';


function Carduser({produto}){

    const[iconType, setIconType] = useState(0)

    const array = [<FaArrowUp color='white'/>, <FaArrowDown color='white'/>]

    useEffect(() => {
        if (produto.role === 'admin') {
            setIconType(1); // Define o ícone para o índice 1 (FaArrowDown)
        } else {
            setIconType(0); // Define o ícone para o índice 0 (FaArrowUp)
        }
    }, [produto.role]);


    async function getUserByName(userName){

        const usersCollection = collection(db, 'usuários');
      
        const q = query(usersCollection, where('nome', '==', userName));
      
        
        const querySnapshot = await getDocs(q);
      
        
        if (!querySnapshot.empty) {
          
          const userDoc = querySnapshot.docs[0];
      
          
          const userData = userDoc.data();
          const userId = userDoc.id; 

          console.log("Usuário encontrado:", userData);
          return userId; 
        } else {
          console.log('Nenhum usuário encontrado com o número fornecido');
          return null;
        }
    }

    const handleRoleToggle = async () => {

        let userEmail = await getUserByName(produto.nome)
        console.log(userEmail)
        const newRole = iconType === 0 ? "admin" : "user"; // Define o novo role com base no iconType atual
        try {
            // Referência ao documento do usuário no Firestore
            const userDocRef = doc(db, "usuários", userEmail);
            await updateDoc(userDocRef, { role: newRole });

            // Alterna o iconType após a atualização bem-sucedida
            setIconType(iconType === 0 ? 1 : 0);
            console.log(`Usuário atualizado para ${newRole}`);
        } catch (error) {
            console.error("Erro ao atualizar o role do usuário:", error);
        }
    };

    return(
        <div className={styles.BigContainer}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.verticalline}></div>
                    <h1>{produto.nome}</h1>
                    <div className={styles.invline}></div>
                </div>
                <div className={styles.box}>
                    <div className={styles.verticalline}></div>
                    <h1>{produto.número}</h1>
                    <div className={styles.invline}></div>
                </div>
                <div className={styles.box}>
                    <div className={styles.verticalline}></div>
                    <h1>{produto.pat}</h1>
                    <div className={styles.verticalline}></div>
                </div>
                <div className={styles.lastbox}>
                    <h1>{produto.role}</h1>
                    <div className={styles.pbutton}>
                        <button onClick={handleRoleToggle}>
                            {array[iconType]}
                        </button>
                    </div>
                </div>
                <div className={styles.verticalline}></div>
            </div>
            <hr className={styles.divider}></hr>
        </div>
    )
}

export default Carduser;