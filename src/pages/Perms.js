import React from "react";
import styles from "../styles/perms.module.css"
import { useContext } from "react";
import { AppContext } from "../Context/appContext";
import SideBar from "../components/sidebar";
import CRUD4 from "../components/CRUD4.js";

function Perms(){
    const { user, loading } = useContext(AppContext);

    return(
        <div className={styles.Container}>
            <div className={styles.column1}>
                <SideBar user={user}/>
            </div>
            <div className={styles.column2}>
                <CRUD4/>
            </div>
        </div>
    )
}

export default Perms;