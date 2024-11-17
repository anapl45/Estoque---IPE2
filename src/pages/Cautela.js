import React from "react";
import Cautelaform from "../components/Cautelaform";
import styles from "../styles/cautela.module.css"
import SideBar from "../components/sidebar";
import { useContext } from "react";
import { AppContext } from "../Context/appContext";
import Baixaform from "../components/Baixaform";

function Cautela(){
    const { user, loading } = useContext(AppContext);

    return(
        <div className={styles.Container}>
            <SideBar user={user}/>
            <div className={styles.main}>
                <Cautelaform/>
                <Baixaform/>
            </div>
        </div>
    )
}

export default Cautela;