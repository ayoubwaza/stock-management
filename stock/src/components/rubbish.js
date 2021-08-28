import React, { useEffect, useState } from "react";
import Axios from "axios";
import styles from "../styles/Parent.module.scss";
import { FaTrash, FaTrashRestoreAlt } from "react-icons/fa";
import NoData from "../Images/no-data.png";
import { motion } from "framer-motion";
function Rubbish() {
  const [rubbish, setRubbish] = useState([]);
  const [doit, setDoIt] = useState(false);
  const [modaledel, setModalDel] = useState(false);
  const [getid, setGetID] = useState("");
  const ControleModale = () => {
    return setModalDel(!modaledel);
  };
  useEffect(() => {
    async function GetallRubbish() {
      try {
        var url = "http://localhost:8000/allRubbish";
        const getallRubbish = await Axios.get(url);
        setRubbish(getallRubbish.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetallRubbish();
  }, []);

  const deleteFrEver = async (id) => {
    try {
      var req = await Axios.delete(
        "http://localhost:8000/delete/rub/invoice/" + id
      );
      setRubbish(
        rubbish.filter((rub) => {
          return rub._id !== id;
        })
      );
      ControleModale();
    } catch (err) {
      console.log(err);
    }
  };
  const restoredInvoice = async (id) => {
    try {
      var reque = await Axios.delete(
        "http://localhost:8000/restore/invoice/" + id
      );
      setRubbish(
        rubbish.filter((rub) => {
          return rub._id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  const functwithId = (id) => {
    ControleModale();
    setGetID(id);
  };
  return (
    <div>
      {modaledel ? (
        <motion.div className={styles.modaledel}>
          <motion.div
            className={styles.modaledel_child}
            initial={{
              opacity: -1,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: "tween",
            }}
          >
            <div className={styles.modaledel_content}>
              <div>
                <h3>
                  êtes-vous sûr de vouloir supprimer cette facture pour toujours
                </h3>
              </div>
              <div className={styles._handle_modaledel_btns}>
                <div>
                  <button onClick={ControleModale}>Non</button>
                </div>
                <div>
                  <button onClick={() => deleteFrEver(getid)}>Oui</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
      <div className={styles.parent_rub_fact}>
        <div className={styles.child_rub_fact}>
          {rubbish.length > 0 ? (
            <>
              {rubbish.map((rub, i) => {
                return (
                  <div className={styles.each_rub_list} key={i}>
                    <ul>
                      <li>
                        <i>Date de suppression : </i>
                        {rub.createdAt.substring(0, 10)}
                      </li>
                      <li>
                        <i>Heure de suppression : </i>
                        {rub.createdAt.substring(11, 19)}
                      </li>
                      <li>
                        <i>Client : </i>
                        {rub.client}
                      </li>
                      <li>
                        <i>Téléphone Client : </i>
                        {rub.telephone}
                      </li>
                      <li>
                        <i>Nature de marchandise : </i>
                        {rub.ndmse}
                      </li>
                    </ul>
                    <div className={styles.restore_rub_fact}>
                      <span onClick={() => restoredInvoice(rub._id)}>
                        <FaTrashRestoreAlt />
                      </span>
                    </div>
                    <div className={styles.delete_dif_rub_fact}>
                      <span onClick={() => functwithId(rub._id)}>
                        <FaTrash />
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <motion.div
              initial="init"
              animate="ani"
              variants={{
                init: {
                  opacity: 0,
                  scale: 0,
                },
                ani: {
                  opacity: 1,
                  scale: 1,
                  y: 200,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                  },
                },
              }}
            >
              <img src={NoData} width="100%" height="100%" alt="" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rubbish;
