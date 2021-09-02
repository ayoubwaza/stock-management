import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "../styles/Parent.module.scss";
import {
  AiFillFilter,
  AiFillSetting,
  AiFillSignal,
  AiFillCloseCircle,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineClockCircle,
  AiOutlinePoweroff,
  AiTwotoneCalendar,
} from "react-icons/ai";
import Logo from "../Images/logo.webp";
import { motion } from "framer-motion";
import { MdNotificationsActive, MdNotificationsNone } from "react-icons/md";
import Girl from "../Images/girl.jpg";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { GiQueenCrown } from "react-icons/gi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { constant } from "lodash";
const colors = scaleOrdinal(schemeCategory10).range();
const data = [
  {
    name: "Confirmation",
    uv: 78,
  },
  {
    name: "Cancel",
    uv: 30,
  },
  {
    name: "Post Ponned",
    uv: 120,
  },
  {
    name: "No-Answer",
    uv: 27,
  },
];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
//datat for comparing old months
const dataCompare = [
  {
    name: "Mois 7",
    Confirmation: 4000,
    Cancel: 2400,
  },
  {
    name: "Mois 8",
    Confirmation: 3000,
    Cancel: 1398,
  },
  {
    name: "Mois 9",
    Confirmation: 2000,
    Cancel: 9800,
  },
  {
    name: "Mois 10",
    Confirmation: 2780,
    Cancel: 3908,
  },
  {
    name: "Mois 11",
    Confirmation: 1890,
    Cancel: 4800,
  },
  {
    name: "Mois 12",
    Confirmation: 2390,
    Cancel: 3800,
  },
];
function DashboardUsers(props) {
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [value, onChange] = useState(new Date());
  const [param, setparam] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [warningPassword, setWarningPassword] = useState(false);
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
  //refs
  const refAside = useRef();
  const handleParamChanges = (e) => setparam(!param);
  const CondiPassword = (e) => {
    setPassword(e.target.value);
    if (password.length < 15) {
      setWarningPassword(true);
    } else {
      setWarningPassword(false);
    }
  };
  const controlePassword = () => {
    if (confirmedPassword === password) {
      alert("votre mot de passe a été modifié avec succés...");
    } else {
      console.log("nada");
    }
  };
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body {   background: rgba(7, 1, 48, 0.9);
  }
`,
        }}
      />
      {param ? (
        <div className={styles.params_parent}>
          <motion.div
            className={styles.params_child}
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
            <div className={styles.handle_alertBox}>
              <Alert severity="warning">
                le changement de votre mot de passe sont la seule modification
                que vous êtes autorisé à changer
              </Alert>
            </div>
            <div>
              <span onClick={handleParamChanges}>
                <AiFillCloseCircle />
              </span>
            </div>
            <div className={styles.param_handleInputs}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Nouveaux Mot De Passe"
                  variant="outlined"
                  type="text"
                  value={password}
                  onChange={CondiPassword}
                />
                {warningPassword ? (
                  <div className={styles.handle_alertBox}>
                    <Alert severity="warning">
                      Le mot de passe doit avoir au moins 15 caractères
                    </Alert>
                  </div>
                ) : null}
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Confirmer Votre mot de passe"
                  variant="outlined"
                />
              </div>
            </div>
            <div>
              <button onClick={() => controlePassword()}>Valider</button>
            </div>
          </motion.div>
        </div>
      ) : null}
      <div ref={refAside} className={styles.dash_users_content}>
        <div className={styles.dash_users_content_child}>
          <div className={styles.dash_users_content_child_header}>
            <div className={styles.dash_users_content_child_header_child}>
              <div>
                <span>
                  <MdNotificationsActive />
                </span>
              </div>
              <div>
                <span>
                  <AiFillSetting />
                </span>
              </div>
              <div>
                <img src={Girl} width="80" height="80" alt="" />
              </div>
            </div>
          </div>
          <div className={styles.handle_user_panel_withDate}>
            <div>
              <h2>Utilisateur Panel</h2>
            </div>
            <div className={styles.date_utilsatuer}>
              <div>
                <p>
                  {time.toISOString().substr(0, 10)}{" "}
                  <span>
                    <AiTwotoneCalendar />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.handle_data_cancel_confirm}>
            <div>
              <div className={styles.each_data_style}>
                <h1>Confirmation </h1>
                <div className={styles.confirmed_arrow}>
                  <span>
                    <AiOutlineArrowUp />
                  </span>
                  <h5>78</h5>
                </div>
                <h3>Mois : 9</h3>
              </div>
              <div className={styles.each_data_style}>
                <h1>Post Ponned </h1>
                <div className={styles.confirmed_arrow}>
                  <span>
                    <AiOutlineArrowUp />
                  </span>
                  <h5>120</h5>
                </div>
                <h3>Mois : 9</h3>
              </div>
            </div>
            <div>
              <div className={styles.each_data_style}>
                <h1>Cancel </h1>
                <div className={styles.cancel_arrow}>
                  <span>
                    <AiOutlineArrowDown />
                  </span>
                  <h5>15</h5>
                </div>
                <h3>Mois : 9</h3>
              </div>
              <div className={styles.each_data_style}>
                <h1>No-Answer </h1>
                <div className={styles.cancel_arrow}>
                  <span>
                    <AiOutlineArrowDown />
                  </span>
                  <h5>27</h5>
                </div>
                <h3>Mois : 9</h3>
              </div>
            </div>
            <div className={styles.chart_fits_One}>
              <BarChart
                width={900}
                height={526}
                data={data}
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="0" />
                <XAxis dataKey="name" stroke="orange" />
                <YAxis stroke="orange" />
                <Bar
                  dataKey="uv"
                  fill="#00B5BE"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 30]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
          <div className={styles.compare_data_dash}>
            <div className={styles.camparing_title}>
              <h2>Historique && Comparaison</h2>
            </div>
            <div className={styles.handle_chart_compareMonths}>
              <div className={styles.chart_dash_compare}>
                <BarChart
                  width={700}
                  height={500}
                  data={dataCompare}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="none" stroke="none" />
                  <XAxis stroke="orange" dataKey="name" />
                  <YAxis stroke="orange" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Confirmation" stackId="a" fill="#00B5BE" />
                  <Bar dataKey="Cancel" stackId="a" fill="red" />
                </BarChart>
              </div>
              <div className={styles.each_data_style_underCompare}>
                <h1>Confirm-Agadir </h1>
                <div className={styles.confirmed_arrow}>
                  <span>
                    <AiOutlineArrowUp />
                  </span>
                  <h5>78</h5>
                </div>
                <h3>Mois : 9</h3>
                <div className={styles.old_confirmed_agadir}>
                  <div>Mois 7 : 10</div>
                  <div>Mois 8 : 10</div>
                  <div>Mois 9 : 10</div>
                </div>
              </div>
              <div className={styles.handle_calendar}>
                <h1>Calendar </h1>
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
          </div>
          <div className={styles.notes_todo}>
            <div></div>
          </div>
        </div>
      </div>
      {/* ASIDE DOWN HERE {userData.map((data, i) => {
          return (
            <div key={i}>
              <span>{data.email}</span>
            </div>
          );
        })} */}
      <div className={styles.dash_users_aside}>
        <div className={styles.dash_users_aside_wrapper}>
          <motion.div
            className={styles.dash_users_aside_logo}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
              },
              ani: {
                opacity: 1,
                scale: [0, -2, 0.8],
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
          >
            <img src={Logo} width="100%" height="100%" alt="" />
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                x: -300,
              },
              ani: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <AiOutlineClockCircle />
            </span>
            <h4>{time.toLocaleTimeString()}</h4>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                x: -300,
              },
              ani: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.4,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <GiQueenCrown />
            </span>
            <h4>User</h4>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                x: -300,
              },
              ani: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.6,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <AiFillSignal />
            </span>
            <h4>Analytique</h4>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                x: -300,
              },
              ani: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.8,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
            onClick={() => handleParamChanges()}
          >
            <span>
              <AiFillSetting />
            </span>
            <h4>Paramétres</h4>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                x: -300,
              },
              ani: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 1,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <AiFillFilter />
            </span>
            <h4>Filters</h4>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                x: -300,
              },
              ani: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 1.2,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <AiOutlinePoweroff />
            </span>
            <h4>Déconnecter</h4>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default DashboardUsers;
