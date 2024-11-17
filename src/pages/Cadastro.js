import React from "react";
import CadastroForm from "../components/cadastroform";
import styles from "../styles/cadastro.module.css"

function Cadastro(){
    return(
        <div className={styles.Container}>
            <CadastroForm/>
        </div>
    )
}

export default Cadastro;