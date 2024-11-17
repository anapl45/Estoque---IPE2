import React from "react";
import SideBar from "../components/sidebar";
import styles from "../styles/estoque.module.css"
import { useContext } from "react";
import { AppContext } from "../Context/appContext";
import CRUD2 from "../components/CRUD2";
import CRUD from "../components/CRUD";

function ItensCaut(){
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
                <CRUD2/>
            </div>
        </div>
    )
}

export default ItensCaut;