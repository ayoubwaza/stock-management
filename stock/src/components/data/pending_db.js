import React, { useEffect, useState } from "react";
import styles from "../../styles/Parent.module.scss";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../loading";
import {
  AiFillCloseCircle,
  AiOutlineWhatsApp,
  AiFillEdit,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { TextField, Tooltip, withStyles, Fade, Zoom } from "@material-ui/core";
import { Link } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import { FiPhoneMissed } from "react-icons/fi";
import NODATAIMG from "../../Images/users_nodata.webp";
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "gris",
    color: "white",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);
function Pending(props) {
  const [userData, setUserData] = useState([]);
  const [datapendDb, setDataPendDb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatesPopUp, setUpdatesPopUp] = useState(false);
  const [name, setname] = useState("");
  const [city, setCity] = useState("");
  const [addresse, setAddresse] = useState("");
  const [phone, setPhone] = useState("");
  const [dayOne, setdayOne] = useState("");
  const [dayTwo, setdayTwo] = useState("");
  const [dayThree, setdayThree] = useState("");
  const [dayFour, setdayFour] = useState("");
  const [Iidup, setIdUp] = useState("");
  const [observation, setObseravtion] = useState("");
  const [status, setStatus] = useState("");
  const [beforeInitializing, setBeforeInitializing] = useState(false);
  const [type, setType] = useState("");
  const [prix, setPrix] = useState("");
  const [Qte, setQte] = useState("");
  const [howSending, setHowSending] = useState("");
  const [delivered_not, setDelivered_not] = useState("");
  const [postPonned, setPostPonned] = useState(false);
  const [comments, setComments] = useState("");
  const [dateCall, setDateCall] = useState("");
  const [canceled, setCanceled] = useState(false);
  const [noAnswer, setNoAnswer] = useState(false);
  const [mehdicommentaire, setMehdiDcommentaire] = useState("");
  const [noData, setNoData] = useState(false);
  const handleInputsChanges = (e, arg) => {
    arg(e.target.value);
  };
  const handleUpdatesChange = () => {
    setUpdatesPopUp(!updatesPopUp);
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
    const HandlePendingData = async () => {
      const pdburl = "http://localhost:8000/apis/pending/db/all/";
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
        console.log(noData, dataPendingDb);
      } catch (error) {
        console.log("e", error);
      }
    };
    HandlePendingData();
  }, []);
  //update each client Data
  const GetupdateClientData = async (idClt) => {
    const GetWaitingUpdatedClientdata = await axios.get(
      "http://localhost:8000/apis/pending/siham/pending/db/all/" + idClt
    );
    setname(GetWaitingUpdatedClientdata.data.name);
    setCity(GetWaitingUpdatedClientdata.data.city);
    setAddresse(GetWaitingUpdatedClientdata.data.addresse);
    setPhone(GetWaitingUpdatedClientdata.data.phone);
    setObseravtion(GetWaitingUpdatedClientdata.data.observation);
    setStatus(GetWaitingUpdatedClientdata.data.status);
    setdayOne(GetWaitingUpdatedClientdata.data.dayOne);
    setdayTwo(GetWaitingUpdatedClientdata.data.dayTwo);
    setdayThree(GetWaitingUpdatedClientdata.data.dayThree);
    setdayFour(GetWaitingUpdatedClientdata.data.dayFour);
  };
  const updateClientData = async () => {
    try {
      const dataUpdated = {
        nom: name,
        city: city,
        addresse: addresse,
        phone: phone,
        status: status,
        dayOne: dayOne,
        dayTwo: dayTwo,
        dayThree: dayThree,
        dayFour: dayFour,
        observation: observation,
      };
      await axios.put(
        "http://localhost:8000/apis/pending/db/" + Iidup,
        dataUpdated
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

  const handlePendingBody = () => {
    return datapendDb.map((deltaSheet, i) => {
      return (
        <tr key={i} className={styles.flex_td}>
          <td>{i + 1}</td>
          <td>{deltaSheet.productType}</td>
          <td
            style={
              deltaSheet.dateIni !== null ? { backgroundColor: "orange" } : null
            }
          >
            {deltaSheet.createdAt.substring(0, 10)}
          </td>
          <td>{deltaSheet.name}</td>
          <td>{deltaSheet.city}</td>
          <td>{deltaSheet.addresse}</td>
          <td>{deltaSheet.phone}</td>
          <td>{deltaSheet.observation}</td>
          <td className={styles.dayone_color_table}>{deltaSheet.dayOne}</td>
          <td className={styles.daytwo_color_table}>{deltaSheet.dayTwo}</td>
          <td className={styles.daythree_color_table}>{deltaSheet.dayThree}</td>
          <td className={styles.dayfour_color_table}>
            {deltaSheet.dayFour === "sent via whatsApp" ? (
              <span className={styles.whatsApp_pend_green}>
                <AiOutlineWhatsApp />
              </span>
            ) : deltaSheet.dayFour === "not sent" ? (
              <span className={styles.whatsApp_pend_red}>
                <AiOutlineWhatsApp />
              </span>
            ) : null}
          </td>
          <td className={styles.pending_table_btns_edit}>
            <HtmlTooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Update Leads Button"
              arrow
            >
              <button
                onClick={() => {
                  GetupdateClientData(deltaSheet._id);
                  setIdUp(deltaSheet._id);
                  setUpdatesPopUp(true);
                }}
                className={styles.update_pend_db_btn}
              >
                <span>
                  <AiFillEdit />
                </span>
              </button>
            </HtmlTooltip>
            <HtmlTooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Confirmed Button"
              arrow
            >
              <button
                onClick={() => handleChangeInitialiZe(deltaSheet._id)}
                className={styles.confirmed_pend_db_btn}
              >
                <span>
                  <GiConfirmed />
                </span>
              </button>
            </HtmlTooltip>
            <HtmlTooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Post-Ponned Button"
              arrow
            >
              <button
                onClick={() => handleChangePpnd(deltaSheet._id)}
                className={styles.pponned_pend_db_btn}
              >
                <span>
                  <AiOutlineCloudUpload />
                </span>
              </button>
            </HtmlTooltip>
            <HtmlTooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Cancel Button"
              arrow
            >
              <button
                onClick={() => handleChangeCancel(deltaSheet._id)}
                className={styles.cancel_pend_db_btn}
              >
                <span>
                  <AiFillCloseCircle />
                </span>
              </button>
            </HtmlTooltip>
            <HtmlTooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="No-Answer Button"
              arrow
            >
              <button
                onClick={() => handleChangeNoAnswer(deltaSheet._id)}
                className={styles.no_answer_pend_db_btn}
              >
                <span>
                  <FiPhoneMissed />
                </span>
              </button>
            </HtmlTooltip>
          </td>
        </tr>
      );
    });
  };
  const handlePendingHeader = () => {
    return (
      <tr>
        <th>N°</th>
        <th>Type de Produit</th>
        <th>Date</th>
        <th>Name</th>
        <th>City</th>
        <th>Addresse</th>
        <th>Phone</th>
        <th>Observation</th>
        <th className={styles.dayone_color_table}>Day 1</th>
        <th className={styles.daytwo_color_table}>Day 2</th>
        <th className={styles.daythree_color_table}>Day 3</th>
        <th className={styles.dayfour_color_table}>Day 4</th>
        <th>Controles</th>
      </tr>
    );
  };

  //confirmed Form Data
  const handleChangeInitialiZe = (idarg) => {
    setBeforeInitializing(!beforeInitializing);
    setIdUp(idarg);
    ForConfirmmedForm();
  };
  const ForConfirmmedForm = async () => {
    const GetWaitingUpdatedClientdata = await axios.get(
      "http://localhost:8000/apis/pending/siham/pending/db/all/" + Iidup
    );
    setname(GetWaitingUpdatedClientdata.data.name);
    setCity(GetWaitingUpdatedClientdata.data.city);
    setAddresse(GetWaitingUpdatedClientdata.data.addresse);
    setPhone(GetWaitingUpdatedClientdata.data.phone);
  };
  const ConfirmClientData = async () => {
    try {
      const dataUpdatedConf = {
        type: type,
        prix: prix,
        Qte: Qte,
        howSending: howSending,
        delivered_not: delivered_not,
      };
      const url = "http://localhost:8000/apis/remove/pending/lead/" + Iidup;
      await axios.post(url, dataUpdatedConf);
      setDataPendDb(
        datapendDb.filter((iLux) => {
          return iLux._id !== Iidup;
        })
      );
    } catch (error) {
      console.log("err : " + " " + error);
    }
  };
  //post Ponned Form Data
  const handleChangePpnd = (idarg) => {
    setPostPonned(!postPonned);
    setIdUp(idarg);
    ForConfirmmedForm();
  };
  const postPonnedClientData = async () => {
    try {
      const dataUpdatedpp = {
        comments: comments,
        dateCall: dateCall,
      };
      const url =
        "http://localhost:8000/apis/remove/pending/lead/to/ppnd/" + Iidup;
      await axios.post(url, dataUpdatedpp);
      setDataPendDb(
        datapendDb.filter((iLux) => {
          return iLux._id !== Iidup;
        })
      );
    } catch (error) {
      console.log("err : " + " " + error);
    }
  };
  //Cancel Form Data
  const handleChangeCancel = (idarg) => {
    setCanceled(!canceled);
    setIdUp(idarg);
    ForConfirmmedForm();
  };
  const CanceledClientData = async () => {
    try {
      const dataUpdatedCanceled = {
        comments: comments,
        mehdi: mehdicommentaire,
      };
      const url =
        "http://localhost:8000/apis/remove/pending/lead/to/cancel/" + Iidup;
      await axios.post(url, dataUpdatedCanceled);
      setDataPendDb(
        datapendDb.filter((iLux) => {
          return iLux._id !== Iidup;
        })
      );
    } catch (error) {
      console.log("err : " + " " + error);
    }
  };
  //no answer form data
  const handleChangeNoAnswer = (idarg) => {
    setNoAnswer(!noAnswer);
    setIdUp(idarg);
  };
  const noAnswerClientData = async () => {
    try {
      const url =
        "http://localhost:8000/apis/remove/pending/lead/to/no_answer/" + Iidup;
      await axios.post(url);
      setDataPendDb(
        datapendDb.filter((iLux) => {
          return iLux._id !== Iidup;
        })
      );
      return window.location.reload();
    } catch (error) {
      console.log("err : " + " " + error);
    }
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
      {noAnswer ? (
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
                "No-Answer"
              </p>
            </div>
            <div className={styles.flex_styles_calssbtns}>
              <div className={styles.handleyes_class}>
                <button onClick={() => noAnswerClientData()}>Oui</button>
              </div>
              <div className={styles.handleyes_class_red}>
                <button onClick={() => setNoAnswer(false)}>Non</button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
      {canceled ? (
        <div className={styles.Updates_pending}>
          <form>
            <motion.div
              className={`${styles.Updates_child} ${styles.Updates_child_cancel}`}
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
                <span onClick={handleChangeCancel}>
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
                  <TextField
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    label="Mehdi Comment"
                    onChange={(e) =>
                      handleInputsChanges(e, setMehdiDcommentaire)
                    }
                    value={mehdicommentaire}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="commentaire"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setComments)}
                    value={comments}
                  />
                </div>
              </div>
              <div>
                <button onClick={() => CanceledClientData()}>Valider</button>
              </div>
            </motion.div>
          </form>
        </div>
      ) : null}
      {postPonned ? (
        <div className={styles.Updates_pending}>
          <form>
            <motion.div
              className={`${styles.Updates_child} ${styles.Updates_child_ppnd}`}
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
                <span onClick={handleChangePpnd}>
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
                  <TextField
                    type="date"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setDateCall)}
                    value={dateCall}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="comment"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setComments)}
                    value={comments}
                  />
                </div>
              </div>
              <div>
                <button onClick={() => postPonnedClientData()}>Valider</button>
              </div>
            </motion.div>
          </form>
        </div>
      ) : null}
      {beforeInitializing ? (
        <div className={styles.Updates_pending}>
          <form>
            <motion.div
              className={`${styles.Updates_child} ${styles.Updates_child_update}`}
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
                <span onClick={handleChangeInitialiZe}>
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
                <button onClick={() => ConfirmClientData()}>Valider</button>
              </div>
            </motion.div>
          </form>
        </div>
      ) : (
        ""
      )}
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
                    label="nom"
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
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="">Select from optiopns...</option>
                      <option value="cancel">cancel</option>
                      <option value="call again">call again</option>
                      <option value="postPonned">post ponned</option>
                      <option value="no answer">no-answer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Observation"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setObseravtion)}
                    value={observation}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="day 1"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setdayOne)}
                    value={dayOne}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="day 2"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setdayTwo)}
                    value={dayTwo}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="day 3"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setdayThree)}
                    value={dayThree}
                  />
                </div>
                <div>
                  <div className={styles.index_select}>
                    <select
                      onChange={(e) => {
                        setdayFour(e.target.value);
                      }}
                    >
                      <option value="">Select from optiopns...</option>
                      <option value="sent via whatsApp">
                        sent via whatsApp
                      </option>
                      <option value="not sent">Not Sent</option>
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
          <motion.h2>Pending ("Db")</motion.h2>
          <motion.div
            variants={variantsAside}
            initial="ini"
            animate="ani"
            className={styles.headrs_data_dashborad_each}
          >
            <motion.div variants={itemsAside} className={styles.conf_btn}>
              <Link
                to={`/dashboard/user_uu/pending/${props.match.params.userId}`}
              >
                <button>Pending("Sheet")</button>
              </Link>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.conf_btn}>
              <Link
                to={`/dashboard/user_uu/confirmed/db/${props.match.params.userId}`}
              >
                <button>Confirmed</button>
              </Link>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.noanswer_btn}>
              <Link
                to={`/dashboard/user_uu/post-ponned/db/${props.match.params.userId}`}
              >
                <button>Post Ponned</button>
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
        </motion.div>
        <div className={styles.pending_Child}>
          {noData ? (
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
export default Pending;
