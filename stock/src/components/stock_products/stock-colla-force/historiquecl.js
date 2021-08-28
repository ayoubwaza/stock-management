import React, { useEffect, useState } from "react";
import styles from "../../../styles/Parent.module.scss";
import Axios from "axios";
import { Link } from "react-router-dom";
import { FcFullTrash, FcCalendar, FcHome } from "react-icons/fc";
import {
  AiFillEdit,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import Loading from "../../loading";
import NoData from "../../../Images/no-data.png";
import { motion } from "framer-motion";
function HistoriqueCl() {
  const [getdata, setGetData] = useState([]);
  const [nodata, setNodata] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSlimBodyHistorique = async () => {
      try {
        setLoading(true);
        const url = "http://localhost:8000/api/historique/collaforce/";
        const getsbhistodata = await Axios.get(url);
        setGetData(getsbhistodata.data);
        if (getsbhistodata.data.length <= 0) {
          setNodata(true);
        } else {
          setNodata(false);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchSlimBodyHistorique();
  }, []);
  const TableHeaderSb = () => {
    return (
      <tr>
        <th>_Id</th>
        <th>Solde</th>
        <th className={styles.addesb_green}>
          <span className={styles.up_sb_histo_ico}>
            <AiOutlineArrowUp />
          </span>
        </th>
        <th>
          <span>
            <GiReturnArrow />
          </span>
        </th>
        <th>
          <span>
            <AiOutlineArrowDown />
          </span>
        </th>

        <th>Date d'ajout</th>
        <th>Heure d'ajout</th>
        <th>Modifier</th>
        <th>Supprimer</th>
      </tr>
    );
  };
  const TableBodySb = () => {
    return getdata.map((data, i) => {
      return (
        <tr key={i}>
          <td>{data._id}</td>
          <td>{data.stockValueC}</td>
          <td className={styles.addesb_green}>{data.addedC}</td>
          <td className={styles.addesb_green}>{data.routurnC}</td>
          <td className={styles.minus_red}>{data.minusC}</td>
          <td>{data.createdAt.substr(0, 10)}</td>
          <td>{data.createdAt.substr(11, 8)}</td>
          <td>
            <span>
              <AiFillEdit />
            </span>
          </td>
          <td>
            <span>
              <FcFullTrash />
            </span>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <div className={styles.histo_sb}>
        <div className={styles.handle_title_histosb}>
          <div className={styles.l}>
            <Link to="/">
              <button>
                <span>
                  <FcHome />
                </span>
                Accueil
              </button>
            </Link>
          </div>
          <div className={styles.e}>
            <Link to="/filtrer/date/">
              <button>
                <span>
                  <FcCalendar />
                </span>
                Filtrer Par Date
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.handle_sb_table}>
          <div className={styles.histo_histosb_child}>
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
              <table id="table-to-xls">
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
    </div>
  );
}
export default HistoriqueCl;
