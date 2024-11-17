import React from "react";
import { useState } from "react";
import styles from "./../styles/components/loginform.module.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginForm(){
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('email: ', email);
        console.log('Password: ', password);

        setemail('');
        setPassword('');

        navigate('/Estoque');
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
                    type="text"
                    placeholder="Senha"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
                <Link to='/Cadastro' style={{textDecoration: 'none'}}>Não Possui Conta?</Link>
            </form>
        </div>
    );
}

export default LoginForm;