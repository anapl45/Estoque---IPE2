import React, { createContext, useState } from 'react';
import { db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

// Criando o contexto
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Exemplo de dado global (usuário logado)
  const [loading, setLoading] = useState(true);

  const fetchUserByEmail = async (email) => {
    try {
      console.log('Iniciando busca de usuário no Firestore para o email:', email);
      
      const userRef = doc(db, 'usuários', email); // Referência ao documento do Firestore
      const userSnap = await getDoc(userRef); // Obtém o snapshot do documento
      
      console.log('Snapshot do usuário obtido:', userSnap);
  
      if (userSnap.exists()) {
        console.log('Usuário encontrado no Firestore:', userSnap.data());
        
        setUser(userSnap.data()); // Atualiza o estado do usuário
        console.log('Estado do usuário atualizado com:', userSnap.data());
      } else {
        console.log('Usuário não encontrado no Firestore para o email:', email);
      }
    } catch (error) {
      console.error('Erro ao buscar o usuário no Firestore:', error);
    } finally {
      setLoading(false);  // Finaliza o carregamento
      console.log('Finalizado o processo de busca de usuário no Firestore.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        console.log('Autenticação detectada, usuário logado:');
        console.log(userCredential.email);
  
        // Carrega os dados do usuário automaticamente
        fetchUserByEmail(userCredential.email).then(() => {
          console.log('Dados do usuário carregados com sucesso.');
        }).catch((error) => {
          console.error('Erro ao carregar os dados do usuário:', error);
        });
  
      } else {
        console.log('Nenhum usuário autenticado.');
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();  // Limpeza do listener de autenticação
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, loading}}>
      {children}
    </AppContext.Provider>
  );
};
