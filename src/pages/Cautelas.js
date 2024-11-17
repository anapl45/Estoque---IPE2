import React from "react";
import SideBar from "../components/sidebar";
import styles from "../styles/estoque.module.css"
import CRUD3 from "../components/CRUD3";
import { useContext } from "react";
import { AppContext } from "../Context/appContext";

function Cautelas(){
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
                <CRUD3/>
            </div>
        </div>
    )
}

export default Cautelas;