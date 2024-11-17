import styles from "./../styles/components/painel.module.css"
import Card_product from "./cardproduct"

function Painel({array}, {user}){

    return (
        <div className={styles.container}>
          {array.map((item, index) => (
            <Card_product key={index} produto={item}/>
          ))}
        </div>
      );
}

export default Painel;