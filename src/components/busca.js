import styles from "../styles/components/searchBar.module.css"
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs, where} from "firebase/firestore";
import { db } from "../services/firebaseConfig";


const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(query)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const q = query(
            collection(db, "itens"), // Substitua "itens" pelo nome correto da sua coleção
            where("nome", "==", query) // Filtra pelo nome, usando o valor da pesquisa
        );

        const querySnapshot = await getDocs(q);
        const resultados = [];
        querySnapshot.forEach((doc) => {
            resultados.push({ id: doc.id, ...doc.data() });
        });

        console.log(resultados); 
    } catch (error) {
        console.error("Erro ao buscar itens:", error);
    }

    setQuery(""); // Limpa o campo de pesquisa
  };

  return (
    <form onSubmit={handleSubmit} className={styles.SearchBar}>
      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={query}
        onChange={handleChange}
      />
      <button type="submit"><FaSearch className={styles.SearchIcon}/></button>
    </form>
  );
};

export default SearchBar;