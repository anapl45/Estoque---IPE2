import React from "react";
import { useState } from "react";
import styles from "./../styles/components/cadastroform.module.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { criarUsuario } from "../services/auth";
import { db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";



function CadastroForm(){
    const[nome, setNome] = useState("");
    const[número, setNúmero] = useState("");
    const[pat, setPat] = useState("");
    const[email, setemail] = useState("");
    const[role, setRole] = useState("user")
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    //erros
    const [erro1, setErro1] = useState(false);
    const [erro2, setErro2] = useState(false);
    const [erro3, seterro3] = useState(false);

    const navigate = useNavigate();

    const handlePatChange = (event) => {
        setPat(event.target.value);
    };

    const Patentes = [
        'Soldado',
        'Cabo',
        '3° Sgt',
        '2° Sgt',
        '1° Sgt',
        "Aluno 1°ano",
        "Aluno 2°ano",
        "Aluno 3°ano",
        "Aluno 4°ano",
        "2° Tenente",
        '1° Tenente',
        'Capitão',
    ];


    async function handleSubmit(e){
        e.preventDefault();
        setErro1(false);
        seterro3(false);


        if(email === '' || password === '' || password2 === ''){
            setemail('');
            setPassword('');
            setPassword2('');
            setErro1(true);
        } else if(password !== password2){
            setemail('');
            setPassword('');
            setPassword2('');
            seterro3(true);
        } 
        else{
            
            try {
                // Cria/atualiza um documento com um ID específico
                await setDoc(doc(db, "usuários", email), {
                    nome: nome,
                    número: número,
                    pat: pat,
                    role: role,
                  });
            
            } 
            
            catch (e) {
                console.error("Erro ao salvar documento: ", e);
            }

            criarUsuario(email, password)
            navigate('/'); 
            setemail('');
            setPassword('');
        }
         
    };

    return(
        <div className={styles.Container}>
            <h2>Cadastro</h2>
            <div className={styles.forms}>
                <div className={styles.inputs}>
                    <label htmlFor="Email">Email: </label>
                    <input
                    type="email"
                    placeholder="email"
                    id="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}/>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="Nome de Guerra">Nome de Guerra: </label>
                    <input
                    type="Nome de Guerra"
                    placeholder="Nome de Guerra"
                    id="Nome de Guerra"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}/>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="Posto ou Graduação">Posto // Graduação: </label>
                    <select 
                    id="bancos" 
                    value={pat} 
                    onChange={handlePatChange} 
                    required
                    >
                        <option value="" disabled>Escolha seu posto/Graduação</option>
                        {Patentes.map((pat, index) => (
                            <option key={index} value={pat}>
                                {pat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="Número">Número: </label>
                    <input
                    type="Número"
                    placeholder="Número (preencher apenas se for aluno)"
                    id="Número"
                    value={número}
                    onChange={(e) => setNúmero(e.target.value)}/>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="Senha">Senha: </label>
                    <input
                    type="password"
                    placeholder="Senha"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="Email">Confirme a senha: </label>
                    <input
                    type="password"
                    placeholder="Repita a Senha"
                    id="Password2"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}/>
                </div>
                {erro1 && (
                    <div className={styles.erro}>
                        <h4>Formulário não submetido. Preencha os campos vazios</h4>
                    </div>
                )}
                {erro3 && (
                    <div className={styles.erro}>
                        <h4>Formulário não submetido. As senhas não coincidem!</h4>
                    </div>
                )}
                <button onClick={handleSubmit}>Cadastrar-se</button>
                <Link to='/' style={{textDecoration: 'none', fontFamily: "Roboto", color: "#49a9f8"}}>Realizar login!</Link>
            </div>
        </div>
    );
}

export default CadastroForm;