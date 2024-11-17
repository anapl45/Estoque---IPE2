import styles from "./../styles/components/painel.module.css"
import Carduser from "./carduser";


function Painel4({array}){
    return (
        <div className={styles.container}>
          {array.map((item, index) => (
            <Carduser key={index} produto={item} />
          ))}
        </div>
      );
}

export default Painel4;