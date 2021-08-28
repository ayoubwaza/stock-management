import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/Parent.module.scss";
import Axios from "axios";
import Loading from "../../loading";
import NoData from "../../../Images/no-data.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FcHome, FcCalendar, FcPlus } from "react-icons/fc";
import { AiFillFilePdf } from "react-icons/ai";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
function SortEntrSb() {
  const [getdata, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nodata, setNodata] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const fetchSlimBodyHistorique = async () => {
      try {
        setLoading(true);
        const url = "http://localhost:8000/api/historique/slimbody/";
        const getsbhistodata = await Axios.get(url);
        setGetData(getsbhistodata.data);
        if (getsbhistodata.data.length <= 0) {
          setNodata(true);
        } else {
          setNodata(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSlimBodyHistorique();
  }, []);
  const TableHeaderSb = () => {
    return (
      <tr>
        <th>Date d'ajout</th>
        <th>Stock Initial</th>
        <th>Entrées</th>
        <th>Retour</th>
        <th>Sorties</th>
        <th>Solde</th>
      </tr>
    );
  };
  const TableBodySb = () => {
    return getdata.map((data, i) => {
      return (
        <tr key={i}>
          <td className={styles.ensrDates}>
            {"Le" +
              " " +
              data.createdAt.substr(0, 10) +
              " " +
              "à" +
              " " +
              data.createdAt.substr(11, 8) +
              "h"}
          </td>
          <td>{data.stockInitialH}</td>
          <td className={styles.ensrGreen}>{data.addedH}</td>
          <td>{data.routurnH}</td>
          <td className={styles.ensrRed}>{data.minusH}</td>
          <td>{data.stockValueH}</td>
        </tr>
      );
    });
  };
  return (
    <div>
      <div className={styles.handlein_outSb}>
        <motion.h1
          initial="ini"
          animate="ani"
          variants={{
            ini: {
              opacity: 0,
              x: -300,
            },
            ani: {
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.3,
                type: "spring",
                stiffness: 50,
                damping: 30,
              },
            },
          }}
        >
          Gestion De Stock
        </motion.h1>
        <motion.div className={styles.handle_en_in_sbbtns}>
          <motion.div
            className={styles.l}
            initial="ini"
            animate="ani"
            whileHover={{
              scale: 1.1,
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.2,
              },
            }}
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
                  stiffness: 50,
                },
              },
            }}
          >
            <Link to="/">
              <button>
                <span>
                  <FcHome />
                </span>
                Accueil
              </button>
            </Link>
          </motion.div>
          <motion.div
            className={styles.e}
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
                  stiffness: 50,
                },
              },
            }}
          >
            <Link to="/filtrer/date/">
              <button>
                <span>
                  <FcCalendar />
                </span>
                Filtrer Par Date
              </button>
            </Link>
          </motion.div>
          <motion.div
            className={styles.e}
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
                  stiffness: 50,
                },
              },
            }}
          >
            <Link to="/all/products/">
              <button>
                <span>
                  <FcPlus />
                </span>
                Modifier à Nouveau
              </button>
            </Link>
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
                  delay: 0.8,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
          >
            <ReactHTMLTableToExcel
              className={styles.to_excel_fact_histo}
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download as XLS"
            />
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
                  delay: 1,
                  type: "spring",
                  stiffness: 50,
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
        </motion.div>
      </div>
      <div className={styles.entree_sortieSb_Table_handler}>
        <div className={styles.handle_table_wdd}>
          {nodata ? (
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
                    stiffness: 50,
                  },
                },
              }}
            >
              <img src={NoData} width="100%" height="100%" alt="" />
            </motion.div>
          ) : (
            <table id="table-to-xls" ref={ref}>
              {loading ? (
                <div className={styles.center_loadingspinner}>
                  <Loading />
                </div>
              ) : (
                <>
                  <thead>{TableHeaderSb()}</thead>
                  <tbody>{TableBodySb()}</tbody>
                </>
              )}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default SortEntrSb;
