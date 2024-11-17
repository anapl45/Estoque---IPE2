import styles from "./../styles/components/painel.module.css"
import Card_product from "./cardproduct"
import Cardcautuser from "./cardcautuser";

function Painel2({array}){
    return (
        <div className={styles.container}>
          {array.map((item, index) => (
            <Cardcautuser key={index} produto={item} />
          ))}
        </div>
      );
}

export default Painel2;