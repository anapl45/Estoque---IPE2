import React from "react";
import styles from "./../styles/login.module.css"
import LoginForm from "../components/loginform";
import logoIME from "../imgs/Logo.png"


function Login(){
    return(
        <div className={styles.Main}>
            <div className={styles.Container}>
                <div className={styles.Content1}>
                    <div className={styles.View1}>
                        <img src={logoIME}/>
                        <h1>Instituto Militar de Engenharia</h1>
                        <h2>Cadeia de suprimento - Corpo de Alunos</h2>
                    </div>
                </div>
                <div className={styles.LoginForms}>
                    <LoginForm/>    
                </div>
            </div>
        </div>
    )
}

export default Login;