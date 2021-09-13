import React, { useEffect, useState } from "react";
import styles from "../../styles/Parent.module.scss";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../loading";
import {
  AiFillCloseCircle,
  AiOutlineWhatsApp,
  AiFillEdit,
} from "react-icons/ai";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import NODATAIMG from "../../Images/users_nodata.webp";
function NoAnswer(props) {
  const [userData, setUserData] = useState([]);
  const [datanoAnswerDb, setDataNoAnswer] = useState([]);
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
        "https://ownleads-apps.herokuapp.com/apis/api/get/user_id/" +
          props.match.params.userId
      );
      setUserData([waitingUserData.data]);
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    const HandleNoAnswerData = async () => {
      const pdburl = "https://ownleads-apps.herokuapp.com/apis/bring/noAnswers/data/all";
      try {
        setLoading(true);
        const dataNoAnswer = await axios.get(pdburl);
        setDataNoAnswer(dataNoAnswer.data);
        if (dataNoAnswer.data.length <= 0) {
          setNoData(true);
        } else {
          setNoData(false);
        }
        setLoading(false);
      } catch (error) {
        console.log("e", error);
      }
    };
    HandleNoAnswerData();
  }, []);
  //update each client Data
  const GetupdateClientData = async (idClt) => {
    const GetWaitingUpdatedClientdata = await axios.get(
      "https://ownleads-apps.herokuapp.com/apis/get/nocanswer/" + idClt
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
        "https://ownleads-apps.herokuapp.com/apis/noanswer/modifier/" + Iidup,
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
    return datanoAnswerDb.map((deltaSheet, i) => {
      return (
        <tr key={i} className={styles.flex_td}>
          <td>{i + 1}</td>
          <td>{deltaSheet.productType}</td>
          <td>{deltaSheet.intialDate.substring(0, 10)}</td>
          <td>{deltaSheet.createdAt.substring(0, 10)}</td>
          <td>{deltaSheet.name}</td>
          <td>{deltaSheet.city}</td>
          <td>{deltaSheet.addresse}</td>
          <td>{deltaSheet.phone}</td>
          <td>{deltaSheet.observation}</td>
          <td className={styles.status_color_noAnswer}>{deltaSheet.status}</td>
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
          </td>
        </tr>
      );
    });
  };
  const handlePendingHeader = () => {
    return (
      <tr>
        <th>N°</th>
        <td>Product Type</td>
        <th>Date</th>
        <th>Date de "No-Answer"</th>
        <th>Name</th>
        <th>City</th>
        <th>Addresse</th>
        <th>Phone</th>
        <th>Observation</th>
        <th className={styles.status_color_noAnswer}>Status</th>
        <th className={styles.dayone_color_table}>Day 1</th>
        <th className={styles.daytwo_color_table}>Day 2</th>
        <th className={styles.daythree_color_table}>Day 3</th>
        <th className={styles.dayfour_color_table}>Day 4</th>
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
          <motion.h2>No Answer</motion.h2>
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
            <motion.div variants={itemsAside} className={styles.conf_btn}>
              <Link
                to={`/dashboard/user_uu/confirmed/db/${props.match.params.userId}`}
              >
                <button>Confirmed</button>
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
export default NoAnswer;
