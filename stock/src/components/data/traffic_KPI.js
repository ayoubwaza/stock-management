import React, { useEffect, useState } from "react";
import styles from "../../styles/Parent.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../loading";
function TrafficKPI(props) {
  const [userData, setUserData] = useState([]);
  const [dataWithLeads, setdataWithLeads] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [five, setFive] = useState(Number);
  const [sex, setSex] = useState(Number);
  const [seven, setSeven] = useState(Number);
  const [eight, setEight] = useState(Number);
  const [nine, setNine] = useState(Number);
  const [teen, setTeen] = useState(Number);
  const [eleven, setEleven] = useState(Number);
  const [twelve, setTwelve] = useState(Number);
  const [thirteen, setThirthen] = useState(Number);
  const [fourtheen, setFourtheen] = useState(Number);
  const [fiftheen, setFiftheen] = useState(Number);
  const [sextheen, setSextheen] = useState(Number);
  const [seventheen, setSeventheen] = useState(Number);
  const [eightheen, setEightheen] = useState(Number);
  const [nineTheen, setNineTheen] = useState(Number);
  const [twenty, setTweenty] = useState(Number);
  const [twentyOne, setTweentyOne] = useState(Number);
  const [twentyTwo, setTweentyTwo] = useState(Number);
  const [twentyThree, setTweentyThree] = useState(Number);
  const [twentyFour, setTweentyFour] = useState(Number);
  const [twentyFive, setTweentyFive] = useState(Number);
  const [twentySex, setTweentySex] = useState(Number);
  const [twentySeven, setTweentySeven] = useState(Number);
  const [twentyEight, setTweentyEight] = useState(Number);
  const [twentyNine, setTweentyNine] = useState(Number);
  const [thirthy, setThirty] = useState(Number);
  const [thirtyOne, setOneThirtyOne] = useState(Number);
  const [loading, setLoading] = useState(false);
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
  const fecthData0sLeads = async () => {
    try {
      setLoading(true);
      const data = {
        nameProduct: nameProduct,
      };
      const GetData = await axios.post(
        "https://ownleads-apps.herokuapp.com/apis/siham/traffic/data/",
        data
      );
      setdataWithLeads([GetData.data]);
      dataWithLeads.map((d) => {
        setFive(d.dataDayFive.length);
        setSex(d.dataDaySex.length);
        setSeven(d.dataDaySeven.length);
        setEight(d.dataDayEight.length);
        setNine(d.dataDayNine.length);
        setTeen(d.dataDayTen.length);
        setEleven(d.dataDayEleven.length);
        setTwelve(d.dataDayTwelve.length);
        setThirthen(d.dataDayThirtheen.length);
        setFourtheen(d.dataDayfourtheen.length);
        setFiftheen(d.dataDayfiftheen.length);
        setSextheen(d.dataDaysextheen.length);
        setSeventheen(d.dataDayseventheen.length);
        setEightheen(d.dataDayeighteen.length);
        setNineTheen(d.dataDayninetheen.length);
        setTweenty(d.dataDaytweenty.length);
        setTweentyOne(d.dataDaytwentyOne.length);
        setTweentyTwo(d.dataDaytwentyTwo.length);
        setTweentyThree(d.dataDaytwentyThree.length);
        setTweentyFour(d.dataDaytwentyFour.length);
        setTweentyFive(d.dataDaytwentyFive.length);
        setTweentySex(d.dataDaytwentySex.length);
        setTweentySeven(d.dataDaytwentySeven.length);
        setTweentyEight(d.dataDaytwentyEight.length);
        setTweentyNine(d.dataDaytwentyNine.length);
        setThirty(d.dataDaytThirtheen.length);
        setOneThirtyOne(d.dataDaytThirtyOne.length);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const BodyTableTraffic = () => {
    return (
      <>
        <tr>
          <td>05-09-2021</td>
          <td>0</td>
          <td>{five}</td>
          <td>{five / 22}%</td>
        </tr>
        <tr>
          <td>06-09-2021</td>
          <td>0</td>
          <td>{sex}</td>
          <td>{sex / 22}%</td>
        </tr>
        <tr>
          <td>07-09-2021</td>
          <td>0</td>
          <td>{seven}</td>
          <td>{seven / 22}%</td>
        </tr>
        <tr>
          <td>08-09-2021</td>
          <td>0</td>
          <td>{eight}</td>
          <td>{eight / 22}%</td>
        </tr>
        <tr>
          <td>09-09-2021</td>
          <td>0</td>
          <td>{nine}</td>
          <td>{nine / 22}%</td>
        </tr>
        <tr>
          <td>10-09-2021</td>
          <td>0</td>
          <td>{teen}</td>
          <td>{teen / 22}%</td>
        </tr>
        <tr>
          <td>11-09-2021</td>
          <td>0</td>
          <td>{eleven}</td>
          <td>{eleven / 22}%</td>
        </tr>
        <tr>
          <td>12-09-2021</td>
          <td>0</td>
          <td>{twelve}</td>
          <td>{twelve / 22}%</td>
        </tr>
        <tr>
          <td>13-09-2021</td>
          <td>0</td>
          <td>{thirteen}</td>
          <td>{thirteen / 22}%</td>
        </tr>
        <tr>
          <td>14-09-2021</td>
          <td>0</td>
          <td>{fourtheen}</td>
          <td>{fourtheen / 22}%</td>
        </tr>
        <tr>
          <td>15-09-2021</td>
          <td>0</td>
          <td>{fiftheen}</td>
          <td>{fiftheen / 22}%</td>
        </tr>
        <tr>
          <td>16-09-2021</td>
          <td>0</td>
          <td>{sextheen}</td>
          <td>{sextheen / 22}%</td>
        </tr>
        <tr>
          <td>17-09-2021</td>
          <td>0</td>
          <td>{seventheen}</td>
          <td>{seventheen / 22}%</td>
        </tr>
        <tr>
          <td>18-09-2021</td>
          <td>0</td>
          <td>{eightheen}</td>
          <td>{eightheen / 22}%</td>
        </tr>
        <tr>
          <td>19-09-2021</td>
          <td>0</td>
          <td>{nineTheen}</td>
          <td>{nineTheen / 22}%</td>
        </tr>
        <tr>
          <td>19-09-2021</td>
          <td>0</td>
          <td>{twenty}</td>
          <td>{twenty / 22}%</td>
        </tr>
        <tr>
          <td>20-09-2021</td>
          <td>0</td>
          <td>{twentyOne}</td>
          <td>{twentyOne / 22}%</td>
        </tr>
        <tr>
          <td>21-09-2021</td>
          <td>0</td>
          <td>{twentyTwo}</td>
          <td>{twentyTwo / 22}%</td>
        </tr>
        <tr>
          <td>22-09-2021</td>
          <td>0</td>
          <td>{twentyThree}</td>
          <td>{twentyThree / 22}%</td>
        </tr>
        <tr>
          <td>23-09-2021</td>
          <td>0</td>
          <td>{twentyFour}</td>
          <td>{twentyFour / 22}%</td>
        </tr>
        <tr>
          <td>24-09-2021</td>
          <td>0</td>
          <td>{twentyFive}</td>
          <td>{twentyFive / 22}%</td>
        </tr>
        <tr>
          <td>25-09-2021</td>
          <td>0</td>
          <td>{twentySex}</td>
          <td>{twentySex / 22}%</td>
        </tr>
        <tr>
          <td>26-09-2021</td>
          <td>0</td>
          <td>{twentySeven}</td>
          <td>{twentySeven / 2}%</td>
        </tr>
        <tr>
          <td>27-09-2021</td>
          <td>0</td>
          <td>{twentyEight}</td>
          <td>{twentyEight / 2}%</td>
        </tr>
        <tr>
          <td>28-09-2021</td>
          <td>0</td>
          <td>{twentyNine}</td>
          <td>{twentyNine / 2}%</td>
        </tr>
        <tr>
          <td>29-09-2021</td>
          <td>0</td>
          <td>{thirthy}</td>
          <td>{thirthy / 2}%</td>
        </tr>
        <tr>
          <td>30-09-2021</td>
          <td>0</td>
          <td>{thirtyOne}</td>
          <td>{thirtyOne / 2}%</td>
        </tr>
      </>
    );
  };
  const HeaderTableTraffic = () => {
    return (
      <tr>
        <th>Date</th>
        <th>Leads</th>
        <th>Confirmed</th>
        <th>Confirmed Rating %</th>
      </tr>
    );
  };
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
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                  body {background: rgba(7, 1, 48, 0.9);}
          `,
        }}
      />
      <div className={styles.traffic_parent}>
        <div className={styles.traffic_header}>
          <motion.div className={styles.pending_title}>
            <motion.h2>Traffic KPI</motion.h2>
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
                <Link to={`/dashboard/user_uu/${props.match.params.userId}`}>
                  <button>DashBoard</button>
                </Link>
              </motion.div>
            </motion.div>
            <div className={styles.traffic_serach_Bar}>
              <div>
                <input
                  type="search"
                  name="searchProsuct"
                  id="searchProsuct"
                  value={nameProduct}
                  onChange={(e) => setNameProduct(e.target.value)}
                  placeholder="Serach For a Product By Tag Name"
                />
              </div>
              <div>
                <button onClick={() => fecthData0sLeads()}>Get data</button>
              </div>
            </div>
          </motion.div>
        </div>
        <div className={styles.traffic_child}>
          {loading ? (
            <div className={styles.center_loadingspinner}>
              <Loading />
            </div>
          ) : (
            <table>
              <thead>{HeaderTableTraffic()}</thead>
              <tbody>{BodyTableTraffic()}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
export default TrafficKPI;
