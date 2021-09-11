import React, { useEffect, useState } from "react";
import styles from "../../styles/Parent.module.scss";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../loading";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import NODATAIMG from "../../Images/users_nodata.webp";
import NODATASEARCHIMG from "../../Images/searcharea.webp";
function ConfirmedLeadsdb(props) {
  const [userData, setUserData] = useState([]);
  const [datapendDb, setDataPendDb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatesPopUp, setUpdatesPopUp] = useState(false);
  const [name, setname] = useState("");
  const [city, setCity] = useState("");
  const [addresse, setAddresse] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [prix, setPrix] = useState("");
  const [Qte, setQte] = useState("");
  const [howSending, setHowSending] = useState("");
  const [Iidup, setIdUp] = useState("");
  const [delivered_not, setDelivered_not] = useState("");
  const [alerted, setAlerted] = useState(false);
  const [handleId, setHandleId] = useState("");
  const [noData, setNoData] = useState(false);
  const [searchBox, setSearchBox] = useState("");
  const [NoSearchData, setNoSearchdata] = useState(false);
  const [startDate, setStatrDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [confDataDates, setConfDataDates] = useState([]);
  const [comingData,setComingDataDate] = useState(false)
  const handleInputsChanges = (e, arg) => {
    arg(e.target.value);
  };
  const handleUpdatesChange = () => {
    setUpdatesPopUp(!updatesPopUp);
  };
  const handleCancelAlert = (argId) => {
    setAlerted(!alerted);
    setHandleId(argId);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const waitingUserData = await axios.get(
        "http://localhost:8000/apis/api/get/user_id/" +
          props.match.params.userId
      );
      setUserData([waitingUserData.data]);
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    const HandleConfirmedgData = async () => {
      const pdburl = "http://localhost:8000/apis/get/all/siham/confirmed/";
      try {
        setLoading(true);
        const dataPendingDb = await axios.get(pdburl);
        setDataPendDb(dataPendingDb.data);
        if (dataPendingDb.data.length <= 0) {
          setNoData(true);
        } else {
          setNoData(false);
        }
        setLoading(false);
      } catch (error) {
        console.log("e", error);
      }
    };
    HandleConfirmedgData();
  }, []);
  //update each client Data
  const GetupdateClientData = async (idClt) => {
    setUpdatesPopUp(true);
    const GetWaitingUpdatedClientdata = await axios.get(
      "http://localhost:8000/apis/pending/siham/confirmed/db/all/" + idClt
    );
    setname(GetWaitingUpdatedClientdata.data.name);
    setCity(GetWaitingUpdatedClientdata.data.city);
    setAddresse(GetWaitingUpdatedClientdata.data.addresse);
    setPhone(GetWaitingUpdatedClientdata.data.phone);
    setType(GetWaitingUpdatedClientdata.data.type);
    setPrix(GetWaitingUpdatedClientdata.data.prix);
    setQte(GetWaitingUpdatedClientdata.data.Qte);
    setHowSending(GetWaitingUpdatedClientdata.data.howSending);
    setDelivered_not(GetWaitingUpdatedClientdata.data.delivered_not);
  };
  const updateClientData = async () => {
    try {
      const dataUpdatedConf = {
        name: name,
        city: city,
        addresse: addresse,
        phone: phone,
        type: type,
        prix: prix,
        Qte: Qte,
        howSending: howSending,
        delivered_not: delivered_not,
      };
      await axios.put(
        "http://localhost:8000/apis/confirmed/clt/db/" + Iidup,
        dataUpdatedConf
      );
    } catch (error) {
      console.log("err : " + " " + error);
    }
  };
  //motion
  const variantsAside = {
    ini: {
      opacity: 0,
    },
    ani: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        staggerChildren: 0.5,
      },
    },
  };
  const itemsAside = {
    ini: {
      opacity: 0,
      y: -300,
    },
    ani: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 50,
      },
    },
  };
  const removeToCancel = async (argId) => {
    const dataToCancel = {
      comments: "",
      mehdi: "",
    };
    const url =
      "http://localhost:8000/apis/from/confirmed/reload/cancel/" + argId;
    await axios.post(url, dataToCancel);
    return window.location.reload();
  };
  const getDataByDates = async () => {
    const dataDates = {
      startDate: startDate,
      endDate: endDate,
    };
    try {
      const url = "http://localhost:8000/apis/get/confirmed/siham/by/Dates/";
      const AwaitdataConfDates = await axios.post(url, dataDates);
      setConfDataDates(AwaitdataConfDates.data);
      setComingDataDate(true)
    } catch (error) {
      console.log(error);
    }
  };
  const dataChangedConfirmed = comingData ?  confDataDates :  datapendDb ;
  const filtredData = dataChangedConfirmed.filter((deltaConfi) => {
    return deltaConfi.name.toLowerCase().includes(searchBox.toLowerCase());
  });
  const handleSerachBar = (e) => {
    setSearchBox(e.target.value);
  };
  const handlePendingBody = () => {
    return filtredData.map((deltaConfi, i) => {
      return (
        <tr key={i} className={styles.flex_td}>
          <td>{i + 1}</td>
          <td>{deltaConfi.productType}</td>
          <td>{deltaConfi.intialDate.substring(0, 10)}</td>
          <td>{deltaConfi.createdAt.substring(0, 10)}</td>
          <td>{deltaConfi.name}</td>
          <td>{deltaConfi.city}</td>
          <td>{deltaConfi.addresse}</td>
          <td>{deltaConfi.phone}</td>
          <td>{deltaConfi.type}</td>
          <td>{deltaConfi.prix}</td>
          <td className={styles.dayone_color_table}>{deltaConfi.Qte}</td>
          <td>{deltaConfi.howSending}</td>
          <td>{deltaConfi.delivered_not}</td>
          <td className={styles.pending_table_btns_edit}>
            <button
              onClick={() => {
                GetupdateClientData(deltaConfi._id);
                setIdUp(deltaConfi._id);
              }}
              className={styles.update_pend_db_btn}
            >
              <span>
                <AiFillEdit />
              </span>
            </button>
            <button
              onClick={() => handleCancelAlert(deltaConfi._id)}
              className={styles.cancel_pend_db_btn}
            >
              <span>
                <AiFillCloseCircle />
              </span>
            </button>
          </td>
        </tr>
      );
    });
  };
  const handlePendingHeader = () => {
    return (
      <tr>
        <th>N°</th>
        <th>Product Type</th>
        <th>Date</th>
        <th>Date de confirmation</th>
        <th>Name</th>
        <th>City</th>
        <th>Addresse</th>
        <th>Phone</th>
        <th>Type</th>
        <th>Price</th>
        <th className={styles.dayone_color_table}>Qte</th>
        <th className={styles.daytwo_color_table}>Sending Way...</th>
        <th className={styles.daytwo_color_table}>delivered_not</th>
        <th>Controles</th>
      </tr>
    );
  };
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                  body {background: rgba(7, 1, 48, 0.9);}
          `,
        }}
      />
      {alerted ? (
        <div className={styles.alerted_Box}>
          <motion.div
            className={styles.alerted_child}
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
            <div>
              <p>
                êtes-vous sûr de vouloir supprimer ce client des prospects
                confirmés
              </p>
            </div>
            <div className={styles.flex_styles_calssbtns}>
              <div className={styles.handleyes_class}>
                <button onClick={() => removeToCancel(handleId)}>Oui</button>
              </div>
              <div className={styles.handleyes_class_red}>
                <button onClick={() => setAlerted(false)}>Non</button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
      {updatesPopUp ? (
        <div className={styles.Updates_pending}>
          <form>
            <motion.div
              className={styles.Updates_child}
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
              <div>
                <span onClick={handleUpdatesChange}>
                  <AiFillCloseCircle />
                </span>
              </div>
              <div className={styles.param_handleInputs}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="name"
                    variant="outlined"
                    type="text"
                    onChange={(e) => handleInputsChanges(e, setname)}
                    value={name}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="city"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setCity)}
                    value={city}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="addresse"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setAddresse)}
                    value={addresse}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="phone"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setPhone)}
                    value={phone}
                  />
                </div>
                <div>
                  <div className={styles.index_select_first}>
                    <select
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option value="">Select from optiopns...</option>
                      <option value="Confirmé">Confirmé</option>
                      <option value="Imprimé">Imprimé</option>
                      <option value="Envoyé">Envoyé</option>
                      <option value="Annulé">Annulé</option>
                      <option value="Remplacer">Remplacer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="price"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setPrix)}
                    value={prix}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label='Amounte("Qte")'
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setQte)}
                    value={Qte}
                  />
                </div>
                <div>
                  <div className={styles.index_select}>
                    <select
                      onChange={(e) => {
                        setHowSending(e.target.value);
                      }}
                    >
                      <option value="">Select from optiopns...</option>
                      <option value="Facture">Facture</option>
                      <option value="Amana">Amana</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className={styles.index_select}>
                    <select
                      onChange={(e) => {
                        setDelivered_not(e.target.value);
                      }}
                    >
                      <option value="">Select from optiopns...</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Retourned">Retourned</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <button onClick={() => updateClientData()}>Valider</button>
              </div>
            </motion.div>
          </form>
        </div>
      ) : (
        ""
      )}
      <div className={styles.pending_Parent}>
        <motion.div className={styles.pending_title}>
          <motion.h2>Confirmed</motion.h2>
          <motion.div
            variants={variantsAside}
            initial="ini"
            animate="ani"
            className={styles.headrs_data_dashborad_each}
          >
            <motion.div variants={itemsAside} className={styles.conf_btn}>
              <Link
                to={`/dashboard/user_uu/pending/db/${props.match.params.userId}`}
              >
                <button>Pending("DB")</button>
              </Link>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.cance_btn}>
              <Link
                to={`/dashboard/user_uu/cancels/db/${props.match.params.userId}`}
              >
                <button>Cancel</button>
              </Link>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.noanswer_btn}>
              <Link
                to={`/dashboard/user_uu/post-ponned/db/${props.match.params.userId}`}
              >
                <button>PostPOnned</button>
              </Link>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.noanswer_btn}>
              <Link
                to={`/dashboard/user_uu/no-answer/db/${props.match.params.userId}`}
              >
                <button>No-Answer</button>
              </Link>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.pannel_btn}>
              <Link to={`/dashboard/user_uu/${props.match.params.userId}`}>
                <button>DashBoard</button>
              </Link>
            </motion.div>
          </motion.div>
          <div className={styles.filters_data}>
            <div className={styles.handle_search_bar_clt}>
              <input
                type="search"
                name="search"
                value={searchBox}
                onChange={handleSerachBar}
                placeholder="Search a client"
              />
            </div>
            <div className={styles.handle_dates_clt}>
              <div className={styles.handle_dates_ev}>
                <div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStatrDate(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button onClick={() => getDataByDates()}>Valider</button>
              </div>
            </div>
          </div>
        </motion.div>
        <div className={styles.pending_Child}>
          {NoSearchData ? (
            <motion.div
              initial="initData"
              animate="animateData"
              variants={{
                initData: {
                  opacity: 0,
                  y: -500,
                },
                animateData: {
                  opacity: 1,
                  y: 50,
                  transition: {
                    type: "spring",
                    stiffness: 150,
                  },
                },
              }}
            >
              <img src={NODATASEARCHIMG} width="100%" height="100%" alt="" />
            </motion.div>
          ) : noData ? (
            <div>
              <motion.div
                initial="initData"
                animate="animateData"
                variants={{
                  initData: {
                    opacity: 0,
                    y: -500,
                  },
                  animateData: {
                    opacity: 1,
                    y: 50,
                    transition: {
                      type: "spring",
                      stiffness: 150,
                    },
                  },
                }}
              >
                <img src={NODATAIMG} width="100%" height="100%" alt="" />
              </motion.div>
            </div>
          ) : (
            <>
              {loading ? (
                <div className={styles.center_loadingspinner}>
                  <Loading />
                </div>
              ) : (
                <table>
                  <thead>{handlePendingHeader()}</thead>
                  <tbody>{handlePendingBody()}</tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default ConfirmedLeadsdb;
