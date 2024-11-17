import styles from "../styles/components/cardproduct.module.css"
import { FaPlus, FaMinus } from "react-icons/fa";
import { db } from "../services/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Delmodal from "./delmodal";
import { useContext } from "react";
import { AppContext } from "../Context/appContext";

function Card_product({produto}){
    const { user, loading } = useContext(AppContext);

    const [modal2, setmodal2] = useState(false);
    

    const openModal2 = () =>{
        setmodal2(true);
    }

    const closeModal2 = () =>{
        setmodal2(false);
    }

    async function incrementarQuantidade(identificador) {
        const itemRef = doc(db, "itens", identificador); 
      
        const updatedItem = {
            nome: produto.nome,
            categoria: produto.categoria,
            tipo: produto.tipo,
            quantidade: parseInt(produto.quantidade) + 1,
            tamanho: produto.tamanho
        }

        await updateDoc(itemRef, updatedItem);
    }

    async function decrementarQuantidade(identificador) {
        const itemRef = doc(db, "itens", identificador);
        

        const updatedItem = {
            nome: produto.nome,
            categoria: produto.categoria,
            tipo: produto.tipo,
            quantidade: parseInt(produto.quantidade) - 1,
            tamanho: produto.tamanho
        }

        await updateDoc(itemRef, updatedItem);
    }


    if (!user) {
        return (
            <div>
                <h1>carregando!!!</h1>
            </div>
        ); // Ou você pode renderizar um loader, se preferir
    }

    if(user.role === 'admin'){
        return(
            <div className={styles.BigContainer}>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div className={styles.verticalline}></div>
                        <div className={styles.pbutton2}>
                            <button onClick={openModal2}>
                                <FaTimes  color="white"/>
                            </button>
                        </div>
                        {modal2 && (
                                    <div className={styles.modaloverlay}>
                                        <div className={styles.modalcontent}>
                                            <div className={styles.closeoption}>
                                                <button className={styles.closebutton} onClick={closeModal2}>
                                                    <AiOutlineClose  color="white" size={24} />
                                                </button>
                                            </div>
                                            <Delmodal produto={produto}/>
                                        </div>
                                    </div>    
                        )}
                        <h1>{produto.id}</h1>
                        <div className={styles.invline}></div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.verticalline}></div>
                        <h1>{produto.nome}</h1>
                        <div className={styles.invline}></div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.verticalline}></div>
                        <h1>{produto.categoria}</h1>
                        <div className={styles.invline}></div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.verticalline}></div>
                        <div className={styles.pbutton}>
                            <button onClick={() => decrementarQuantidade(produto.id)}>
                                <FaMinus  color="white"/>
                            </button>
                        </div>
                        <h1>{produto.quantidade} {produto.tipo}</h1>
                        <div className={styles.pbutton}>
                            <button onClick={() => incrementarQuantidade(produto.id)}>
                                <FaPlus color="white"/>
                            </button>
                        </div>
                        <div className={styles.verticalline}></div>
                    </div>
                    <div className={styles.lastbox}>
                        <h1>{produto.tamanho}</h1>
                    </div>
                    <div className={styles.verticalline}></div>
                </div>
                <hr className={styles.divider}></hr>
            </div>
        )
    }

    if(user.role === 'user'){
        return(
            <div className={styles.BigContainer}>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div className={styles.verticalline}></div>
                        {modal2 && (
                                    <div className={styles.modaloverlay}>
                                        <div className={styles.modalcontent}>
                                            <div className={styles.closeoption}>
                                                <button className={styles.closebutton} onClick={closeModal2}>
                                                    <AiOutlineClose  color="white" size={24} />
                                                </button>
                                            </div>
                                            <Delmodal produto={produto}/>
                                        </div>
                                    </div>    
                        )}
                        <h1>{produto.id}</h1>
                        <div className={styles.invline}></div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.verticalline}></div>
                        <h1>{produto.nome}</h1>
                        <div className={styles.invline}></div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.verticalline}></div>
                        <h1>{produto.categoria}</h1>
                        <div className={styles.invline}></div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.verticalline}></div>
                        <h1>{produto.quantidade} {produto.tipo}</h1>
                        <div className={styles.verticalline}></div>
                    </div>
                    <div className={styles.lastbox}>
                        <h1>{produto.tamanho}</h1>
                    </div>
                    <div className={styles.verticalline}></div>
                </div>
                <hr className={styles.divider}></hr>
            </div>
        )
    }
}
export default Card_product;