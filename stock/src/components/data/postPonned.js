import React, { useEffect, useState } from "react";
import styles from "../../styles/Parent.module.scss";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../loading";
import { Link } from "react-router-dom";
import NODATAIMG from "../../Images/users_nodata.webp";
function PostPonned(props) {
  const [userData, setUserData] = useState([]);
  const [dataPonned, setDataPonneddDb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
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
    const HandleConfirmedgData = async () => {
      const pdburl = "https://ownleads-apps.herokuapp.com/apis/postponned/siham/all";
      try {
        setLoading(true);
        const dataPponnedDb = await axios.get(pdburl);
        setDataPonneddDb(dataPponnedDb.data);
        if (dataPponnedDb.data.length <= 0) {
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
  const removePending = async () => {
    try {
      const dateComapre = new Date();
      dateComapre.setUTCHours(0, 0, 0, 0);
      const ConverDate = dateComapre.toISOString().substr(0, 10);
      dataPonned.map((dt) => {
        if (ConverDate === dt.dateCall) {
          axios.delete(
            "https://ownleads-apps.herokuapp.com/apis/remove/ponned/to/pend/siham/" + dt._id
          );
          setDataPonneddDb(
            dataPonned.filter((dt) => {
              return dt._id !== dt._id;
            })
          );
        } else {
          return null;
        }
      });
      return window.location.reload();
    } catch (error) {
      console.log(error);
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
    return dataPonned.map((deltaConfi, i) => {
      return (
        <tr key={i} className={styles.flex_td}>
          <td>{i + 1}</td>
          <td>{deltaConfi.productType}</td>
          <td>{deltaConfi.intialDate.substr(0, 10)}</td>
          <td>{deltaConfi.name}</td>
          <td>{deltaConfi.city}</td>
          <td>{deltaConfi.addresse}</td>
          <td>{deltaConfi.phone}</td>
          <td>{deltaConfi.comments}</td>
          <td className={styles.dayone_color_table}>{deltaConfi.dateCall}</td>
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
        <th>Comments</th>
        <th className={styles.dayone_color_table}>Date</th>
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
      <div className={styles.pending_Parent}>
        <motion.div className={styles.pending_title}>
          <motion.h2>Post Ponned</motion.h2>
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
                to={`/dashboard/user_uu/no-answer/db/${props.match.params.userId}`}
              >
                <button>No-Answer</button>
              </Link>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.pannel_btn}>
              <Link
                to={`/dashboard/user_uu/confirmed/db/${props.match.params.userId}`}
              >
                <button>Confirmed</button>
              </Link>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.pannel_btn}>
              <button onClick={() => removePending()}>Update Data</button>
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
export default PostPonned;
