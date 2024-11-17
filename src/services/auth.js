import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebaseConfig';
import { signOut } from 'firebase/auth';


export async function criarUsuario(email, password){
    await createUserWithEmailAndPassword(auth, email, password)
    .then((user)=> console.log("usuario criado com sucesso"))
}

export async function loginUsuario(email, password){  

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Login realizado com sucesso: ", user);   
            return user;                     
        })
        .catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
        });

}




