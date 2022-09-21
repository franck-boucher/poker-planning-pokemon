import styles from "./LoadingPokeball.module.css";

// export const LoadingPokeball = () => (
//   <div>
//     <div
//       style={{
//         boxSizing: "border-box",
//         borderColor: "black",
//         position: "relative",
//         width: "50px",
//         height: "50px",
//         top: "50px",
//         left: "calc(50% - 25px)",
//         animationName: "capture",
//         animationDuration: "2s",
//         animationIterationCount: "infinite",
//       }}
//     >
//       <div
//         style={{
//           height: "25px",
//           width: "50px",
//           backgroundColor: "red",
//           borderRadius: "25px 25px 0 0",
//           border: "1px solid black",
//           borderBottomWidth: "2px",
//           zIndex: 1,
//         }}
//       ></div>
//       <div
//         style={{
//           height: "25px",
//           width: "50px",
//           backgroundColor: "white",
//           borderRadius: "0 0 25px 25px",
//           border: "1px solid black",
//           borderTopWidth: "2px",
//           zIndex: 1,
//         }}
//       ></div>
//       <div
//         style={{
//           position: "relative",
//           backgroundColor: "white",
//           top: "-32px",
//           left: "18px",
//           height: "15px",
//           width: "15px",
//           borderRadius: "50%",
//           border: "2px solid black",
//           zIndex: 2,
//         }}
//       >
//         <div
//           style={{
//             position: "relative",
//             backgroundColor: "white",
//             top: "1px",
//             left: "1px",
//             height: "9px",
//             width: "9px",
//             borderRadius: "50%",
//             border: "1px solid black",
//             zIndex: 3,
//           }}
//         ></div>
//       </div>
//     </div>
//     <div className="shadow"></div>
//   </div>
// );

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
