import React from "react";
import SideBar from "../components/sidebar";
import styles from "../styles/estoque.module.css"
import CRUD from "../components/CRUD";
import { useContext } from "react";
import { AppContext } from "../Context/appContext";

function Estoque(){
    const { user, loading } = useContext(AppContext);

    if(loading){
        return(
            <div>
                <h1>Carregando!</h1>
            </div>
        )
    }

    return(
        <div className={styles.Container}>
            <div className={styles.column1}>
                <SideBar user={user}/>
            </div>
            <div className={styles.column2}>
                <CRUD user={user}/>
            </div>
        </div>
    )
}

export default Estoque;