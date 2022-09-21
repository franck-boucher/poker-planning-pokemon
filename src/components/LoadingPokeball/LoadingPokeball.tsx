import styles from "./LoadingPokeball.module.css";

export const LoadingPokeball = () => (
  <div>
    <div className={styles.pokeball}>
      <div className={styles.pokeballTop}></div>
      <div className={styles.pokeballBottom}></div>
      <div className={styles.pokeballCenter}>
        <div className={styles.pokeballButton}></div>
      </div>
    </div>
    <div className={styles.shadow}></div>
  </div>
);
