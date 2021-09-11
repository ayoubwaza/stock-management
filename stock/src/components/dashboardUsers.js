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
  AiOutlineKey,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineHourglass,
  AiFillPlayCircle,
  AiFillDatabase,
  AiOutlineCloudUpload,
  AiOutlineIssuesClose,
} from "react-icons/ai";
import Logo from "../Images/logo.webp";
import { motion } from "framer-motion";
import {
  MdCancel,
  MdNotificationsActive,
  MdVerifiedUser,
} from "react-icons/md";
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
import { signOut } from "./auth/authorisations";
import {
  FaBookReader,
  FaCalendar,
  FaMinusCircle,
  FaPlusCircle,
  FaSadCry,
  FaTrafficLight,
} from "react-icons/fa";
import { FiPhoneMissed } from "react-icons/fi";
import { NotSameUser } from "./auth/controleAccess";
import { Link } from "react-router-dom";
import SleepIMG from "../Images/sleep.svg";
import { ImSad2, ImHappy2 } from "react-icons/im";
import { HiEmojiHappy } from "react-icons/hi";
import Smiley from "../Images/smiley.svg";
import SuperSmile from "../Images/superSmile.svg";
function DashboardUsers(props) {
  const [userData, setUserData] = useState([]);
  const [openUserData, setOpenUserData] = useState(false);
  const [time, setTime] = useState(new Date());
  const [value, onChange] = useState(new Date());
  const [param, setparam] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [warningPassword, setWarningPassword] = useState(false);
  const [notEqual, setNotEqualPass] = useState(false);
  const [confirmedData, setConfirmedata] = useState([]);
  const [noAnswer, setNoAnswer] = useState([]);
  const [PendinG, setPpendingDb] = useState([]);
  const [pp, setPp] = useState([]);
  const [canceledData, setCanceledData] = useState([]);
  const [notesUsers, setNotesUsers] = useState([]);
  const [sleep, setSleep] = useState(false);
  const [newNote, setNewNote] = useState(false);
  const [contentNote, setNoteContent] = useState("");
  const [noteValue, setNoteValue] = useState("10");
  useEffect(() => {
    const fetchUserData = async () => {
      const waitingUserData = await axios.get(
        "http://localhost:8000/apis/api/get/user_id/" +
          props.match.params.userId
      );
      setUserData([waitingUserData.data]);
    };
    fetchUserData();
    //getData from Database
    const GetData = async () => {
      const confirmedData =
        "http://localhost:8000/apis/get/all/siham/confirmed/";
      const noAnsweredData =
        "http://localhost:8000/apis/bring/noAnswers/data/all";
      const PendingData = "http://localhost:8000/apis/pending/db/all/";
      const PostPonnedData = "http://localhost:8000/apis/postponned/siham/all";
      const CanceledData = "http://localhost:8000/apis/canceled/siham/all";
      const getNotesLink = "http://localhost:8000/apis/getAll/siham/Notes";
      const [confirmed, noAnswer, PendinG, pp, cancels, getNotes] =
        await axios.all([
          axios.get(confirmedData),
          axios.get(noAnsweredData),
          axios.get(PendingData),
          axios.get(PostPonnedData),
          axios.get(CanceledData),
          axios.get(getNotesLink),
        ]);
      setConfirmedata(confirmed.data);
      setNoAnswer(noAnswer.data);
      setPpendingDb(PendinG.data);
      setPp(pp.data);
      setCanceledData(cancels.data);
      setNotesUsers(getNotes.data);
      console.log(notesUsers);
      if (getNotes.data.length <= 0) {
        setSleep(true);
      } else {
        setSleep(false);
      }
    };
    GetData();
  }, []);
  NotSameUser(props);
  //************data */
  const colors = scaleOrdinal(schemeCategory10).range();
  const data = [
    {
      name: "Confirmation",
      uv: confirmedData.length,
    },
    {
      name: "Cancel",
      uv: canceledData.length,
    },
    {
      name: "Post Ponned",
      uv: pp.length,
    },
    {
      name: "No-Answer",
      uv: noAnswer.length,
    },
  ];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3} 
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

  //////end atat chart

  /*refs =>*/ const refAside = useRef();
  const handleParamChanges = () => setparam(!param);
  const handleUserDataShowing = () => setOpenUserData(!openUserData);
  const CondiPassword = (e) => {
    setPassword(e.target.value);
    if (password.length < 12) {
      setWarningPassword(true);
    } else {
      setWarningPassword(false);
    }
  };
  const controlePassword = (e) => {
    setConfirmedPassword(e.target.value);
    if (confirmedPassword === password) {
      setNotEqualPass(false);
    } else {
      setNotEqualPass(true);
    }
  };
  const constnewNoteAdded = async () => {
    try {
      const Data = {
        content: noteValue,
      };
      const url = "http://localhost:8000/apis/newSiham/Notes";
      await axios.post(url, Data);
      return window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //motion
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: 300,
    },
    show: {
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 80,
        staggerChildren: 1,
      },
    },
  };
  const items = {
    hidden: {
      opacity: 0,
      x: -87,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 20,
      },
    },
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
      x: -300,
    },
    ani: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 80,
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
                que vous êtes autorisé à changer pour ce moment
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
                      Le mot de passe doit avoir au moins 12 caractères
                    </Alert>
                  </div>
                ) : null}
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Confirmer Votre mot de passe"
                  variant="outlined"
                  value={confirmedPassword}
                  onChange={controlePassword}
                />
                {notEqual ? (
                  <div className={styles.handle_alertBox}>
                    <Alert severity="error">
                      le mot de passe n'est pas valid
                    </Alert>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <button>Valider</button>
            </div>
          </motion.div>
        </div>
      ) : null}
      {openUserData ? (
        <div className={styles.showingUserData_parent}>
          <motion.div
            className={styles.showingUserData_child}
            initial="hidden"
            animate="show"
            variants={variants}
          >
            <div>
              <span onClick={handleUserDataShowing}>
                <AiFillCloseCircle />
              </span>
            </div>
            {userData.map((datauser, indexUser) => {
              return (
                <motion.ul key={indexUser}>
                  <motion.li variants={items}>
                    <i>
                      <AiOutlineKey />
                    </i>{" "}
                    _Id : {datauser._id}
                  </motion.li>
                  <motion.li variants={items}>
                    <i>
                      <AiOutlineUser />
                    </i>
                    Name : {datauser.role}
                  </motion.li>
                  <motion.li variants={items}>
                    <i>
                      <AiOutlineMail />
                    </i>
                    Email : {datauser.email}
                  </motion.li>
                  <motion.li variants={items}>
                    <i>
                      <AiTwotoneCalendar />
                    </i>
                    Date de création : {datauser.createdAt.substr(0, 10)}
                  </motion.li>
                  <motion.li variants={items}>
                    <i>
                      <AiOutlineHourglass />
                    </i>
                    Heure de création : {datauser.createdAt.substr(11, 8)}
                  </motion.li>
                </motion.ul>
              );
            })}
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
                <h1>Confirmée </h1>
                <div className={styles.confirmed_arrow}>
                  <span>
                    <AiOutlineArrowUp />
                  </span>
                  <h5>
                    {confirmedData.length <= 0
                      ? "ــــــ"
                      : confirmedData.length}
                  </h5>
                </div>
                <h3>Mois : 9</h3>
              </div>
              <div className={styles.each_data_style}>
                <h1>Post Ponned </h1>
                <div className={styles.confirmed_arrow}>
                  <span>
                    <AiOutlineArrowUp />
                  </span>
                  <h5>{pp.length <= 0 ? "ــــــ" : pp.length}</h5>
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
                  <h5>
                    {canceledData.length <= 0 ? "ــــــ" : canceledData.length}
                  </h5>
                </div>
                <h3>Mois : 9</h3>
              </div>
              <div className={styles.each_data_style}>
                <h1>No-Answer </h1>
                <div className={styles.cancel_arrow}>
                  <span>
                    <AiOutlineArrowDown />
                  </span>
                  <h5>{noAnswer.length <= 0 ? "ــــــ" : noAnswer.length}</h5>
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
                  top: 50,
                  right: 50,
                  left: 50,
                  bottom: 50,
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
                <h1>Confirmée-Agadir </h1>
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
          <div className={styles.each_user_notes_Parent}>
            <div className={styles.camparing_title}>
              <h2>Notes && Objectifs</h2>
            </div>
            <div className={styles.each_user_notes_Child}>
              <div className={styles.notes_added_withBtn}>
                <div>
                  <span onClick={() => setNewNote(!newNote)}>
                    {newNote ? (
                      <FaMinusCircle className={styles.idss} />
                    ) : (
                      <FaPlusCircle className={styles.idss} />
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.notes_added_lists}>
                <div>
                  {newNote ? (
                    <div className={styles.handle_btn_input_Notes}>
                      <div>
                        <div>
                          {noteValue === "10" ? (
                            <i>
                              <FaSadCry />
                            </i>
                          ) : noteValue === "20" ? (
                            <i>
                              <ImSad2 />
                            </i>
                          ) : noteValue === "30" ? (
                            <i>
                              <HiEmojiHappy />
                            </i>
                          ) : noteValue === "40" ? (
                            <i>
                              <ImHappy2 />
                            </i>
                          ) : noteValue === "50" ? (
                            <i>
                              <img
                                src={Smiley}
                                width="200"
                                height="150"
                                alt=""
                              />
                            </i>
                          ) : noteValue === "more Than 50" ? (
                            <i>
                              <img
                                src={SuperSmile}
                                width="200"
                                height="150"
                                alt=" "
                              />
                            </i>
                          ) : null}
                        </div>
                        <select onChange={(e) => setNoteValue(e.target.value)}>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                          <option value="more Than 50">More Than 50 ? </option>
                        </select>
                      </div>
                      <span onClick={constnewNoteAdded}>
                        <FaPlusCircle />
                      </span>
                    </div>
                  ) : sleep ? (
                    <div>
                      <img src={SleepIMG} width="100%" height="100%" alt="" />
                    </div>
                  ) : (
                    <div>
                      {notesUsers.map((note, i) => {
                        return (
                          <ul key={i} className={styles.handle_Notes_users}>
                            <li style={{ backgroundColor: note.color }}>
                              <i>
                                <FaCalendar /> {note.createdAt.substr(0, 10)}
                              </i>
                              {note.content + " " + "Lead"}
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.dash_user_admin_Well}>
                <div>
                  <img src={SleepIMG} width="100%" height="100%" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
          ASIDE DOWN HERE
      */}
      <div className={styles.dash_users_aside}>
        <motion.div
          className={styles.dash_users_aside_wrapper}
          initial="ini"
          animate="ani"
          variants={variantsAside}
        >
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
            variants={itemsAside}
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
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
            onClick={handleUserDataShowing}
          >
            <span>
              <GiQueenCrown />
            </span>
            <h4>User</h4>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
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
            <Link
              to={`/dashboard/user_uu/analytics/${props.match.params.userId}`}
            >
              <h4>Analytics</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
            onClick={handleParamChanges}
          >
            <span>
              <AiFillSetting />
            </span>
            <h4>Settings</h4>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
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
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <AiFillPlayCircle />
            </span>
            <Link
              to={`/dashboard/user_uu/pending/${props.match.params.userId}`}
            >
              <h4>Pending("Sheet")</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <AiFillDatabase />
            </span>
            <Link
              to={`/dashboard/user_uu/pending/db/${props.match.params.userId}`}
            >
              <h4>Pending("DB")</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <AiOutlineCloudUpload />
            </span>
            <Link
              to={`/dashboard/user_uu/post-ponned/db/${props.match.params.userId}`}
            >
              <h4>Post Ponned</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <FiPhoneMissed />
            </span>
            <Link
              to={`/dashboard/user_uu/no-answer/db/${props.match.params.userId}`}
            >
              <h4>No-Answer</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <MdVerifiedUser />
            </span>
            <Link
              to={`/dashboard/user_uu/confirmed/db/${props.match.params.userId}`}
            >
              <h4>Confirmed</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <MdCancel />
            </span>
            <Link
              to={`/dashboard/user_uu/cancels/db/${props.match.params.userId}`}
            >
              <h4>Cancels</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <FaTrafficLight />
            </span>
            <Link
              to={`/dashboard/user_uu/traffic/kpi/db/${props.match.params.userId}`}
            >
              <h4>TRAFFiC KPI</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <FaBookReader />
            </span>
            <Link
              to={`/dashboard/user_uu/cancels/db/${props.match.params.userId}`}
            >
              <h4>Guide</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
          >
            <span>
              <AiOutlineIssuesClose />
            </span>
            <Link to={`/issues/user/${props.match.params.userId}`}>
              <h4>Issues</h4>
            </Link>
          </motion.div>
          <motion.div
            className={styles.dash_users_aside_data}
            variants={itemsAside}
            whileHover={{
              scale: 1.1,
              cursor: "pointer",
              transition: {
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            }}
            onClick={() => {
              signOut(() => {
                return (window.location = "/SignIn");
              });
            }}
          >
            <span>
              <AiOutlinePoweroff />
            </span>
            <h4>Log Out</h4>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
export default DashboardUsers;
