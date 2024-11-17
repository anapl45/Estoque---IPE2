import React from "react";
import Logo from "../imgs/Logo.png"
import styles from "../styles/components/sidebar.module.css"
import { BsFillArchiveFill } from 'react-icons/bs';
import { AiOutlineLineChart } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";
import { FaClipboard } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';


function SideBar({user}){

    if (!user) {
        return (
            <div>
                <h1>carregando!!!</h1>
            </div>
        ); // Ou você pode renderizar um loader, se preferir
    }

    async function logout(){
        signOut(auth)
    }

    if(user.role === 'user'){
        return(
            <div className={styles.Container}>
                <div className={styles.logo}>
                    <img src={Logo}></img>
                    </div>
                    <div className={styles.bar}>
                        <Link to='/Estoque' style={{textDecoration: 'none', marginLeft:"15px", height: "60px"}}>
                            <div className={styles.link}>
                                <BsFillArchiveFill size={20} style={{marginRight: "8px"}}/>
                                <p>Estoque</p>
                            </div>
                        </Link>
                        <Link to='/ItensCaut' style={{textDecoration: 'none', marginLeft:"15px", height: "60px"}}>
                            <div className={styles.link}>
                                <FiSettings size={20} style={{marginRight: "10px"}}/>
                                <div className={styles.bigtextsb}>
                                    <p>Itens</p>
                                    <p>Cautelados</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.logout}>
                        <Link to='/' style={{textDecoration: 'none'}}>
                            <div className={styles.link}>
                                <FiLogOut size={23} style={{marginRight: "10px"}}/>
                                Sair
                            </div>
                        </Link>
                    </div>
                </div>
            )
    } 
     
    if(user.role === 'admin'){
        return(
            <div className={styles.Container}>
                <div className={styles.logo}>
                    <img src={Logo}></img>
                </div>
                <div className={styles.bar}>
                    <Link to='/Estoque' style={{textDecoration: 'none', marginLeft:"15px",}}>
                        <div className={styles.link}>
                            <BsFillArchiveFill size={20} style={{marginRight: "10px"}}/>
                            <p>Estoque</p>
                        </div>
                    </Link>
                    <Link to='/Cautela' style={{textDecoration: 'none', marginLeft:"15px",}}>
                        <div className={styles.link}>
                            <AiOutlinePlus size={20} style={{marginRight: "10px"}} />
                            <div className={styles.bigtextsb}>
                                <p>Cautela</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/Cautelas' style={{textDecoration: 'none', marginLeft:"15px",}}>
                        <div className={styles.link}>
                            <FaClipboard size={20} style={{marginRight: "10px"}}/>
                            <div className={styles.bigtextsb}>
                                <p>Itens Cautelados</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/Perms' style={{textDecoration: 'none', marginLeft:"15px",}}>
                        <div className={styles.link}>
                            <FiSettings size={20} style={{marginRight: "10px"}}/>
                            <div className={styles.bigtextsb}>
                                <p>Permissões</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={styles.logout}>
                    <Link to='/' style={{textDecoration: 'none'}} >
                        <div className={styles.link}>
                            <FiLogOut size={23} style={{marginRight: "10px"}}/>
                            Sair
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default SideBar;