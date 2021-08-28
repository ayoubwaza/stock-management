import React, { useEffect, useState } from "react";
import styles from "../styles/Parent.module.scss";
import Axios from "axios";
import { AiFillEdit, AiOutlineSearch, AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";
import NoData from "../Images/no-data.png";
import { FcCalendar, FcPlus, FcHome, FcFullTrash, FcOk } from "react-icons/fc";
import Loading from "./loading";
function HistoriqueFuct() {
  const [data, setData] = useState([]);
  const [searchbar, setSearchBar] = useState("");
  const [formu, setFormu] = useState(false);
  const [ladate, setLaDate] = useState("");
  const [expe, setExpe] = useState("");
  const [phone, setPhone] = useState("");
  const [hub, setHub] = useState("");
  const [clt, setClt] = useState("");
  const [addresse, setAddresse] = useState("");
  const [retourn, setRetourn] = useState("");
  const [ndmse, setNdmse] = useState("");
  const [Id, setID] = useState("");
  const [msgDelete, setMsgDelete] = useState("");
  const [msgdeleted, setmsgdeleted] = useState(false);
  const [controlNodata, setControlNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  //end of states
  useEffect(() => {
    const fetchallInvoices = async () => {
      try {
        setLoading(true);
        const url = "http://localhost:8000/historique/facturation/";
        const getData = await Axios.get(url);
        setData(getData.data);
        if (getData.data.length <= 0) {
           setControlNoData(true);
        } else {
           setControlNoData(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchallInvoices();
  }, []);
  //useeffect for updating
  const Conditions_Manus = () => {
    if (msgdeleted) {
      setTimeout(() => {
        setmsgdeleted(false);
      }, 1000);
    }
  };
  Conditions_Manus();
  const fetchInvoiceById = async (id) => {
    try {
      setFormu(true);
      var getit = await Axios.get("http://localhost:8000/getall/" + id);
      setLaDate(await getit.data.ladate);
      setExpe(await getit.data.exped);
      setPhone(await getit.data.telephone);
      setHub(await getit.data.hub);
      setClt(await getit.data.client);
      setAddresse(await getit.data.addresse);
      setRetourn(await getit.data.retourn);
      setNdmse(await getit.data.ndmse);
      setID(await getit.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  //filter by client name 'filtredInvoice'
  var filtredInvoice = data.filter((info) =>
    info.client.toLowerCase().includes(searchbar.toLowerCase())
  );
  const RemoveFact = (id) => {
    Axios.delete("http://localhost:8000/delete/fact/" + id)
      .then((response) =>
        setData(
          data.filter((fact) => {
            return fact._id !== id;
          }),
          setMsgDelete(response.data),
          setmsgdeleted(true)
        )
      )
      .catch((err) => console.log(err));
  };
  //function to validate updates
  const UpdateFact = async (id) => {
    var dataUp = {
      ladate: ladate,
      exped: expe,
      telephone: phone,
      hub: hub,
      client: clt,
      addresse: addresse,
      retourn: retourn,
      ndmse: ndmse,
    };
    await Axios.put("http://localhost:8000/update/facture/" + id, dataUp);
    return window.location.reload();
  };
  const bodyTable = () => {
    return filtredInvoice.map((info, i) => {
      return (
        <tr key={i}>
          <td>{info.createdAt.substring(0, 10)}</td>
          <td>{info.exped}</td>
          <td>{info.telephone}</td>
          <td>{info.hub}</td>
          <td>{info.client}</td>
          <td>{info.addresse}</td>
          <td>{info.retourn}</td>
          <td>{info.ndmse}</td>
          <td>
            <span>
              date : {info.updatedAt.substring(0, 10)}
              <br />
              <i>heure : {info.updatedAt.substring(11, 19)}</i>
            </span>
          </td>
          <td>
            <span
              className={styles.delete_fact}
              onClick={() => RemoveFact(info._id)}
            >
              <FcFullTrash />
            </span>
          </td>
          <td>
            <span
              className={styles.update_fact}
              onClick={() => fetchInvoiceById(info._id)}
            >
              <AiFillEdit />
            </span>
          </td>
        </tr>
      );
    });
  };
  const headTable = () => {
    return (
      <tr>
        <th>Date</th>
        <th>Expéditeur</th>
        <th>Télé</th>
        <th>Hub</th>
        <th>Client</th>
        <th>Adresse</th>
        <th>Retourn</th>
        <th>Nature de marchandise</th>
        <th>dernières mises à jour</th>
        <th>Supprimer</th>
        <th>Modifier</th>
      </tr>
    );
  };
  return (
    <div>
      {msgdeleted ? (
        <motion.div className={styles.handle_msges_parent}>
          <motion.div
            className={styles.handle_msges_child}
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div>
              <span>
                <FcOk />
              </span>
              <p>{msgDelete}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
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
              <button onClick={() => UpdateFact(Id)}>تحذيث</button>
            </div>
          </div>
        </motion.div>
      ) : null}
      <div className={styles.histo_fuct}>
        <div className={styles.headers_fact}>
          <div className={styles.search_bar_fact}>
            <span>
              <AiOutlineSearch />
            </span>
            <TextField
              type="search"
              id="outlined"
              placeholder="Rechercher Une Facture..."
              value={searchbar}
              onChange={(e) => setSearchBar(e.target.value)}
            />
          </div>
          <div className={styles.handle_btns_histo_func}>
            <div className={styles._home_fact_histo}>
              <Link to="/">
                <button>
                  <span>
                    <FcHome />
                  </span>
                  Accueil
                </button>
              </Link>
            </div>
            <div className={styles._calend_fact_histo}>
              <Link to="/filtrer/date/">
                <button>
                  <span>
                    <FcCalendar />
                  </span>
                  Filtrer Par Date
                </button>
              </Link>
            </div>
            <div>
              <ReactHTMLTableToExcel
                id=""
                className={styles.to_excel_fact_histo}
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Télécharger Comme Excel"
              />
            </div>
            <div>
              <Link to="/facturation">
                <button>
                  <span>
                    <FcPlus />
                  </span>
                  Nouveaux Facture
                </button>
              </Link>
            </div>
            <div className={styles._trash_fact_histo}>
              <Link to="/facture/rubbish">
                <button>
                  <span>
                    <FcFullTrash />
                  </span>
                  Corbeille
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.histo_fuct_child}>
          {controlNodata ? (
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
          ) : (
            <>
              {loading ? (
                <div className={styles.handleçloading_component_facturehisto}>
                  <Loading />
                </div>
              ) : (
                <table id="table-to-xls">
                  <thead>{headTable()}</thead>
                  <tbody>{bodyTable()}</tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoriqueFuct;
