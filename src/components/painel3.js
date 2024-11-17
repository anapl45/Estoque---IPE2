import styles from "./../styles/components/painel.module.css"
import Cardcautela from "./cardcautela";

function Painel3({array}){
    return (
        <div className={styles.container}>
          {array.map((item, index) => (
            <Cardcautela key={index} produto={item} />
          ))}
        </div>
      );
}

export default Painel3;