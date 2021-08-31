import React, { useRef, useState } from "react";
import styles from "../styles/Parent.module.scss";
import { TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Pdf from "react-to-pdf";
import {
  AiFillEdit,
  AiOutlineHistory,
  AiFillFilePdf,
  AiFillHome,
  AiFillCloseCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";
function Facturation() {
  const [formu, setFormu] = useState(false);
  const [ladate, setLaDate] = useState("");
  const [expe, setExpe] = useState("");
  const [phone, setPhone] = useState("");
  const [hub, setHub] = useState("");
  const [clt, setClt] = useState("");
  const [addresse, setAddresse] = useState("");
  const [retourn, setRetourn] = useState("");
  const [ndmse, setNdmse] = useState("");
  const [submitingMsg, setSubmitingMsg] = useState("");
  const ref = useRef();
  const submitFacture = async () => {
    var data = {
      ladate: ladate,
      exped: expe,
      telephone: phone,
      hub: hub,
      client: clt,
      addresse: addresse,
      retourn: retourn,
      ndmse: ndmse,
    };
    var url = "http://localhost:8000/add/facture/";
    const getalldata = await axios.post(url, data);
    setSubmitingMsg(getalldata.data);
    setFormu(false);
  };
  return (
    <div>
      {formu ? (
        <motion.div className={styles.formu_compo}>
          <div className={styles.formu_child}>
            <div className={styles.close_formu}>
              <span onClick={() => setFormu(!formu)}>
                <AiFillCloseCircle />
              </span>
            </div>
            <div>
              <TextField
                type="date"
                value={ladate}
                onChange={(e) => setLaDate(e.target.value)}
                variant="standard"
              />
            </div>
            <div>
              <TextField
                type="text"
                value={expe}
                onChange={(e) => setExpe(e.target.value)}
                label="Sender"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label="Phone"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                type="text"
                value={hub}
                onChange={(e) => setHub(e.target.value)}
                label="Hub"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                type="text"
                value={clt}
                onChange={(e) => setClt(e.target.value)}
                label="Client"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                type="text"
                value={addresse}
                onChange={(e) => setAddresse(e.target.value)}
                label="Addresse"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                type="text"
                value={retourn}
                onChange={(e) => setRetourn(e.target.value)}
                label="Background return"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                type="text"
                value={ndmse}
                onChange={(e) => setNdmse(e.target.value)}
                label="Nature of goods"
                variant="standard"
              />
            </div>
            <div className={styles._plus_btn_frmu}>
              <button onClick={submitFacture}>إضافة</button>
            </div>
          </div>
        </motion.div>
      ) : null}
      <div className={styles.facturation}>
        <div className={styles.handle_fact_btns}>
          <motion.div
            className={styles.to_home}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                },
              },
            }}
          >
            <Link to="/">
              <button>
                <span>
                  <AiFillHome />
                </span>
                Accueil
              </button>
            </Link>
          </motion.div>
          <motion.div
            className={styles.to_pdf}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                },
              },
            }}
          >
            <Pdf targetRef={ref} filename="code-example.pdf">
              {({ toPdf }) => (
                <button onClick={toPdf}>
                  <span>
                    <AiFillFilePdf />
                  </span>
                  Générer Pdf
                </button>
              )}
            </Pdf>
          </motion.div>
          <motion.div
            className={styles.fill_in}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                },
              },
            }}
          >
            <button
              onClick={() => {
                setFormu(true);
              }}
            >
              <span>
                <AiFillEdit />
              </span>
              Remplir la form
            </button>
          </motion.div>
          <motion.div
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                },
              },
            }}
          >
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className={styles.to_excel}
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download as XLS"
            />
          </motion.div>
          <motion.div
            className={styles.to_historique_btn_func}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 2,
                y: 0,
                transition: {
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                },
              },
            }}
          >
            <Link to="/facture/historique">
              <button>
                <span>
                  <AiOutlineHistory />
                </span>
                Historique
              </button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          ref={ref}
          className={styles.facturation_child}
          initial="ini"
          animate="ani"
          variants={{
            ini: {
              opacity: 0,
              scale: 0,
              rotate: 300,
            },
            ani: {
              rotate: 0,
              opacity: 2,
              scale: 1,
              transition: {
                delay: 0.4,
                type: "spring",
                stiffness: 80,
              },
            },
          }}
        >
          <div className={styles.declara_expe}>
            <div>
              <h3>DECLARATION D'EXPPEDITIONS</h3>
              <p>network agadir</p>
            </div>
          </div>
          <div className={styles.detailes_time}>
            <div className={styles.our_info}>
              <h3>
                Date : <span>{ladate}</span>
              </h3>
              <h3>
                Expéditeur : <span>{expe}</span>
              </h3>
              <h3>
                TéléPhone : <span>{phone}</span>
              </h3>
            </div>
            <div className={styles.numbers}>
              <h1>
                N°: {"S 1545484865"}
                <br />
                {"1202"}
              </h1>
            </div>
          </div>
          <div className={styles.handle_table}>
            <table id="table-to-xls">
              <thead>
                <tr>
                  <th>
                    <p>Hub</p>
                  </th>
                  <th>
                    <p>Client</p>
                  </th>
                  <th>
                    {" "}
                    <p>Adresse</p>
                  </th>
                  <th>
                    <p>Retourn de fond</p>
                  </th>
                  <th>
                    <p>Nature de Marchandise</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>{hub}</p>
                  </td>
                  <td>
                    <p>{clt}</p>
                  </td>
                  <td>
                    <p>{addresse}</p>
                  </td>
                  <td>
                    <p>{retourn}</p>
                  </td>
                  <td>
                    <p>{ndmse}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.facture_nb}>
            <h1>Autorisé D'ouvrir Le Colis</h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Facturation;
