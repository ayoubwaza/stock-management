import React, { useEffect, useState } from "react";
import styles from "../../styles/Parent.module.scss";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../loading";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import NODATAIMG from "../../Images/users_nodata.webp";
function Canceled(props) {
  const [userData, setUserData] = useState([]);
  const [datapendDb, setDataPendDb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState("");
  const [uidc, setuidC] = useState("");
  const [city, setCity] = useState("");
  const [addresse, setAddresse] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [canceled, setCanceled] = useState(false);
  const [mehdicommentaire, setMehdiDcommentaire] = useState("");
  const [noData, setNoData] = useState(false);
  const handleInputsChanges = (e, arg) => {
    arg(e.target.value);
  };
  const handleChangeCancel = (argId) => {
    setCanceled(!canceled);
    setuidC(argId);
    UpdateCanceledClient(argId);
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
      const pdburl = "http://localhost:8000/apis/canceled/siham/all";
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
  const UpdateCanceledClient = async (uiArg) => {
    try {
      const getData = await axios.get(
        "http://localhost:8000/apis/canceled/each/client/" + uiArg
      );
      setname(getData.data.name);
      setCity(getData.data.city);
      setAddresse(getData.data.addresse);
      setPhone(getData.data.phone);
      setComments(getData.data.comments);
      setMehdiDcommentaire(getData.data.mehdi);
    } catch (error) {
      console.log(error);
    }
  };
  const makeUpdatesCanceled = async () => {
    const url = "http://localhost:8000/apis/canceled/clt/db/" + uidc;
    const data = {
      name: name,
      city: city,
      addresse: addresse,
      phone: phone,
      status: "cancel",
      comments: comments,
      mehdi: mehdicommentaire,
    };
    await axios.put(url, data);
    return window.location.reload();
  };
  const handlePendingBody = () => {
    return datapendDb.map((deltaConfi, i) => {
      return (
        <tr key={i} className={styles.flex_td}>
          <td>{i + 1}</td>
          <td>{deltaConfi.productType}</td>
          <td>{deltaConfi.createdAt.substring(0, 10)}</td>
          <td>{deltaConfi.name}</td>
          <td>{deltaConfi.city}</td>
          <td>{deltaConfi.addresse}</td>
          <td>{deltaConfi.phone}</td>
          <td className={styles.status_color_cancel}>{deltaConfi.status}</td>
          <td>{deltaConfi.comments}</td>
          <td>{deltaConfi.mehdi}</td>
          <td className={styles.pending_table_btns_edit}>
            <button
              onClick={() => handleChangeCancel(deltaConfi._id)}
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
        <th>Product Type</th>
        <th>Date</th>
        <th>Name</th>
        <th>City</th>
        <th>Addresse</th>
        <th>Phone</th>
        <th className={styles.status_color_cancel}>status</th>
        <th>comments</th>
        <th>mehdi</th>
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
      {canceled ? (
        <div className={styles.Updates_pending}>
          <form>
            <motion.div
              className={`${styles.Updates_child} ${styles.handleyes_class}`}
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
                    id="outlined-basic"
                    label="commentaire"
                    variant="outlined"
                    onChange={(e) => handleInputsChanges(e, setComments)}
                    value={comments}
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
              </div>
              <div>
                <button onClick={() => makeUpdatesCanceled()}>Valider</button>
              </div>
            </motion.div>
          </form>
        </div>
      ) : null}
      <div className={styles.pending_Parent}>
        <motion.div className={styles.pending_title}>
          <motion.h2>Cancels</motion.h2>
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
                to={`/dashboard/user_uu/confirmed/db/${props.match.params.userId}`}
              >
                <button>Confirmed</button>
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
export default Canceled;
