import React from "react";
import { useState } from "react";
import styles from "./../styles/components/loginform.module.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AppContext } from "../Context/appContext";

function LoginForm(){
    const { user, loading } = useContext(AppContext);
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.email)
                console.log("Login realizado com sucesso: ");   
                navigate('/Estoque');
            })
            .catch((error) => {
                setError(error.message);
            });

        setemail("");
        setPassword("");

    };

    return(
        <div className={styles.Container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={styles.forms}>
                <div className={styles.inputs}>
                    <label htmlFor="Email">Email: </label>
                    <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}/>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="Email">Senha: </label>
                    <input
                    type="password"
                    placeholder="Senha"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {error && (
                    <div className={styles.erro}>
                        <h4>{error}</h4>
                    </div>
                )}
                <button type="submit">Login</button>
                <Link to='/Cadastro' style={{textDecoration: 'none', color: "#49a9f8"}}>Cadastre-se aqui!</Link>
            </form>
        </div>
    );
}

export default LoginForm;