import React, { useEffect, useState } from "react";
import styles from "../../styles/Parent.module.scss";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../loading";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
var { GoogleSpreadsheet } = require("google-spreadsheet");
function Pending(props) {
  const [userData, setUserData] = useState([]);
  const [confirmedData, setConfirmedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideInfo, setHideInf] = useState(false);
  const [itemInfo, setItemInfo] = useState();
  useEffect(() => {
    const GetInfoAlert = localStorage.getItem("Info");
    setItemInfo(GetInfoAlert);
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
    const HandlingSpreadSheets = () => {
      const SPREADSHEET_ID = "1TpBzZacSeRbeMl7rJVy6-mpPNsZ_DJNxv3cgxTNZDmc";
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
      const HandleConfirmedSheets = async () => {
        try {
          setLoading(true);
          await doc.useServiceAccountAuth({
            client_email: "testjs@testjs-324514.iam.gserviceaccount.com",
            private_key:
              "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCWto59B+xgFeb4\ncE3P+QCcCgDZ8aaE+bCUCj/uBtgORS9xVLB4yHIU5NHpcK+gmN/GZ/qWkWQMZ14H\nmnrswnmSXOo5lUm2RNvScfwFSCeih9uyalI1WvyMp39kSrltebXFgK3BIY06ntwn\nEbDyzC143aOjrSZXSGN5CmzIs6ls2cUn4fIorTEW9UKKXOa7+NUdyayF1MkDtYgX\nDkKsAWxiXvGXKfpCiqTome61+gjyaKY3aJkAfeGnZ2z+4nMlDgiPDaHywRwdIqam\nmR6x2hBXCLmkWtstfZVQgVDhYN8DXSSEyu1TlLIQGDpMptCAtIJAKajdu929T8yX\nVJsrfySRAgMBAAECgf9emhF0QqxYGgT02YmIKXXWBkoMXHugEC7aR+OKXiPd5PId\nztAKirPWQkGA98Sop5vPUP8h+iE1WTbUBSPBebOa3QafRe7D8JyBQVnwbPfWg7+e\n75Q0hyNiEvyVHvAKx9E9xXQ32iZpzNefEPHtnSh3tbuzFYaZG6/K+8A5TrRZYxLh\nMcMf8p4ajsET6VI04u/oU6NE9eQf2Q8wH41PiUzxVQWILeb60D/dsy0dQVO5UZXQ\neOiymS+33y1I+eDqQlUQlC19n0jkon/sBzgd3dCARtPZQB25hxOl5fK5XmRxCZvD\nrjw7TlPP/0nWTadmyJcCSQ9jHCqB4YSLCyDlayUCgYEAz0oko/XkSMT7e0rpxjyh\noRS6YU1rH9OFoyeGPYwAbYJwpjPjsq2vpCawa09P9+z7FmQqcW9NuU6rzng0fM8u\ncThwU7rtannlp3WKHAmLIfkhpKrAVUsnqgPXeZAGeKguu8kQYWOyFxvp84fRpXJK\ns+ffBvvrPFTlBF8tQXL8J2MCgYEAuiD1RGBYFbP6ngpOldTqRoAfVihi6QW2KGbY\nlG0RTQgZPh/MgwIhOYRaEP5NdBJ9+xYvJ4qewcLD/zXsM0q/VcAGEHdhObOK7Gmx\nKOgExw54RDNxpgfpiVmSGP3iXRmL9IHLNqlqmWrHa+tZmBpWs9Z33VlFo5xNVLew\nRJ3IaHsCgYAd8lwww8ljKfIa8cusM/41w0TZ4dFkG67mz0L5iUxWhc24dS6kFauW\nT3CVUDQBYV808Ougz6+u4cq4XW1Xyqau/LRdpFfAVjPzaWu2eTp8gf12SKTYra7h\nRQTQLxqAO+vkfTu8liaYaBP4dtq2yDg6nXj/DU4CvVEIvKdRGUeMeQKBgFmGNLI4\nrOVzdd3CE15Z1H0obuof7sMp7h2sqgtqEmI8vPd2kAWLZrOlhzSZPGPR6Sp11yRr\ntkR4C5GbPArHrxPtkn0lDmyUgQOJKp8EShf8S7hyDf3P3HIl1PGUW+ZvvTNTooye\nHBnClDzCLIvOT1mclHaw06AIM+HFoFDAm341AoGAJYmwh3m9UjeBjZIrpAeXlJHC\nYQyHbayTzfy4ev6Wq3O5jXV26pe3XEWEPiJ5HpHeAe+3/i9yjkEPoF6hNXLRnTGP\nfgeBOtT+vLy/jpG+TM0EASGa1ocPob6um4jVtqZ+UDg4vyDzky3fihaOlsRchv3u\nECGf2XUBQq91Zxf0dRs=\n-----END PRIVATE KEY-----\n",
          });
          // loads document properties and worksheets
          await doc.loadInfo();
          const sheet = doc.sheetsById[0];
          const rows = await sheet.getRows();
          rows.map((deltaSiham) => {
            const CltNames = deltaSiham._rawData[0];
            const CltCity = deltaSiham._rawData[1];
            const CLtAddresse = deltaSiham._rawData[2];
            const CltPhone = deltaSiham._rawData[3];
            const CltProduct = deltaSiham._rawData[4];
            confirmedData.push({
              CltNames,
              CltCity,
              CLtAddresse,
              CltPhone,
              CltProduct,
            });
          });
          setConfirmedata([...confirmedData]);
          console.log(confirmedData);
          setLoading(false);
        } catch (e) {
          console.error("Error: ", e);
        }
      };
      HandleConfirmedSheets();
    };
    HandlingSpreadSheets();
  }, []);
  const handleDatankljnol = async () => {
    const data = {
      dataPending: confirmedData,
    };
    await axios.post(
      "https://ownleads-apps.herokuapp.com/apis/api/pending/userid/all_All/",
      data
    );
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
    return confirmedData.map((deltaSheet, i) => {
      return (
        <tr key={i} className={styles.flex_td}>
          <td>{i + 1}</td>
          <td>{deltaSheet.CltProduct}</td>
          <td>{deltaSheet.CltNames}</td>
          <td>{deltaSheet.CltCity}</td>
          <td>{deltaSheet.CLtAddresse}</td>
          <td>{deltaSheet.CltPhone}</td>
        </tr>
      );
    });
  };
  const handlePendingHeader = () => {
    return (
      <tr>
        <th>N°</th>
        <th>Product Type</th>
        <th>Name</th>
        <th>City</th>
        <th>Addresse</th>
        <th>Phone</th>
      </tr>
    );
  };
  const ControleAlert = () => {
    setHideInf(true);
    return localStorage.setItem("Info", true);
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
          <motion.h2>Pending("data from Sheet")</motion.h2>
          <motion.div
            variants={variantsAside}
            initial="ini"
            animate="ani"
            className={styles.headrs_data_dashborad_each}
          >
            <motion.div variants={itemsAside} className={styles.conf_btn}>
              <button onClick={() => handleDatankljnol()}>Update</button>
            </motion.div>
            <motion.div variants={itemsAside} className={styles.pannel_btn}>
              <Link
                to={`/dashboard/user_uu/pending/db/${props.match.params.userId}`}
              >
                <button>Pending("db")</button>
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
        {hideInfo || itemInfo ? null : (
          <motion.div
            className={styles.handle_info_BTn}
            initial="initia"
            animate="animated"
            variants={{
              initia: {
                opacity: 0,
                x: -500,
              },
              animated: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 3,
                  type: "spring",
                  stiffness: 300,
                },
              },
            }}
          >
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              {"-->"} Button — <strong> "Mise à jour" !</strong> was made for
              Getting New Leads From Your Own Sheet :)
              <button onClick={() => ControleAlert()}>Hide</button>
            </Alert>
          </motion.div>
        )}
        <div className={styles.pending_Child}>
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
        </div>
      </div>
    </div>
  );
}
export default Pending;
