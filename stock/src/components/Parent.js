import React, { useState } from "react";
import styles from "../styles/Parent.module.scss";
import {
  FaAngleDown,
  FaDatabase,
  FaFileInvoiceDollar,
  FaHistory,
  FaPlus,
} from "react-icons/fa";
import {
  AiOutlineStock,
  AiOutlineSetting,
  AiFillCalendar,
  AiFillFire,
} from "react-icons/ai";
import Logo from "../Images/logo.webp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Parent() {
  const [stock, setStock] = useState(false);
  const [facturation, setFacturation] = useState(false);
  var date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  var getDate = date.toISOString();
  return (
    <div>
      <div className={styles.parent}>
        <motion.div className={styles.handle_aside}>
          <motion.div
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                rotate: -50,
              },
              ani: {
                opacity: 1,
                scale: [1, -2, 1],
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
          >
            <img src={Logo} width="200" height="200" alt="" />
          </motion.div>
          <motion.div
            className={styles.date_hour}
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
                  delay: 0,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
          >
            <h2>
              <span>
                <AiFillCalendar />
              </span>
              {getDate.substr(0, 10)}
            </h2>
          </motion.div>
          <motion.div
            className={styles.compositions}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 1,
                y: 40,
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
          >
            <h4 onClick={() => setFacturation(!facturation)}>
              <span>
                <FaFileInvoiceDollar />
              </span>
              Facturation
              <i>
                <FaAngleDown />
              </i>
            </h4>
          </motion.div>
          {facturation ? (
            <div className={styles._sub_stock}>
              <Link to="/facturation">
                <motion.h4
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
                        type: "spring",
                        delay: 0,
                        stiffness: 140,
                      },
                    },
                  }}
                >
                  <span>
                    <FaPlus />
                  </span>
                  Ajouter
                </motion.h4>
              </Link>
              <Link to="/facture/historique">
                <motion.h4
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
                        type: "spring",
                        delay: 0.4,
                        stiffness: 140,
                      },
                    },
                  }}
                >
                  <span>
                    <FaHistory />
                  </span>
                  Historique
                </motion.h4>
              </Link>
            </div>
          ) : null}
          <motion.div
            className={`${styles.compositions} ${styles.composition_stock}`}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 1,
                y: 50,
                transition: {
                  delay: 0.3,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
          >
            <h4 onClick={() => setStock(!stock)}>
              <span>
                <AiOutlineStock />
              </span>
              Produits
              <i>
                <FaAngleDown />
              </i>
            </h4>
          </motion.div>
          {stock ? (
            <div className={styles._sub_stock}>
              <Link to="/all/products/">
                <motion.h4
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
                        type: "spring",
                        delay: 0.3,
                        stiffness: 140,
                      },
                    },
                  }}
                >
                  <span>
                    <AiFillFire />
                  </span>
                  Tous Prod
                </motion.h4>
              </Link>
            </div>
          ) : null}
          <motion.div
            className={`${styles.compositions} ${styles.composition_data}`}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 1,
                y: 60,
                transition: {
                  delay: 0.7,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
          >
            <h4>
              <span>
                <FaDatabase />
              </span>
              Data
              <i>
                <FaAngleDown />
              </i>
            </h4>
          </motion.div>
          <motion.div
            className={`${styles.compositions} ${styles.composition_param}`}
            initial="ini"
            animate="ani"
            variants={{
              ini: {
                opacity: 0,
                y: -300,
              },
              ani: {
                opacity: 1,
                y: 60,
                transition: {
                  delay: 0.9,
                  type: "spring",
                  stiffness: 50,
                },
              },
            }}
          >
            <h4>
              <span>
                <AiOutlineSetting />
              </span>
              Parameters
              <i>
                <FaAngleDown />
              </i>
            </h4>
          </motion.div>
        </motion.div>
        {/* *********************************************************** */}
        <motion.div className={styles.content_pa}>
          <motion.div className={styles.header_content_pa}>
            <motion.div
              className={`${styles.data_Product} ${styles.lengtg_red}`}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                  y: -300,
                },
                ani: {
                  opacity: 1,
                  y: -0,
                  transition: {
                    delay: 0,
                    type: "spring",
                    stiffness: 50,
                  },
                },
              }}
            >
              <p>200</p>
            </motion.div>
            <motion.div
              className={`${styles.data_Product} ${styles.lengtg_yellow}`}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                  y: -300,
                },
                ani: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    type: "spring",
                    stiffness: 50,
                  },
                },
              }}
            >
              <p>300</p>
            </motion.div>
            <motion.div
              className={`${styles.data_Product} ${styles.lengtg_green}`}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                  y: -300,
                },
                ani: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.5,
                    type: "spring",
                    stiffness: 50,
                  },
                },
              }}
            >
              <p>158</p>
            </motion.div>
            <motion.div
              className={`${styles.data_Product} ${styles.lengtg_grey}`}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                  y: -300,
                },
                ani: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.8,
                    type: "spring",
                    stiffness: 50,
                  },
                },
              }}
            >
              <p>400</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Parent;
