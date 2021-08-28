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
function HistoriqueGh() {
  const [getdata, setGetData] = useState([]);
  useEffect(() => {
    const fetchSlimBodyHistorique = async () => {
      const url = "http://localhost:8000/api/historique/goldenhorn/";
      const getsbhistodata = await Axios.get(url);
      setGetData(getsbhistodata.data);
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
          <td>{data.stockValueGh}</td>
          <td className={styles.addesb_green}>{data.addedGh}</td>
          <td className={styles.addesb_green}>{data.routurnGh}</td>
          <td className={styles.minus_red}>{data.minusGh}</td>
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
            <table>
              <thead>{TableHeaderSb()}</thead>
              <tbody>{TableBodySb()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HistoriqueGh;
