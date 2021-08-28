import React, { useState, useEffect } from "react";
import styles from "../../styles/Parent.module.scss";
import Mega from "../../Images/product-org.webp";
import GG from "../../Images/product.webp";
import Colla from "../../Images/colla.png";
import Golden from "../../Images/GOLDEN.png";
import {
  AiFillEdit,
  AiFillCloseCircle,
  AiOutlineMinusCircle,
  AiOutlineCheck,
  AiOutlinePlusCircle,
  AiOutlineStock,
  AiFillTablet,
} from "react-icons/ai";
import Axios from "axios";
import { TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";
function AllProducts() {
  const [formUpdate, setFormUpdate] = useState(false);
  const [sbData, setSbData] = useState([]);
  const [stockValue, setStockValue] = useState("");
  const [added, setAdded] = useState("");
  const [minus, setMinus] = useState("");
  const [ids, setId] = useState();
  const [routurn, setRouturn] = useState("");
  const [ggData, setGGData] = useState([]);
  const [clData, setClData] = useState([]);
  const [ghData, setGHData] = useState([]);
  useEffect(() => {
    const fetchSb = async () => {
      const url = "http://localhost:8000/api/slimbody/";
      const getSbData = await Axios.get(url);
      setSbData(getSbData.data);
    };
    fetchSb();

    const fetchGG = async () => {
      const url = "http://localhost:8000/api/giantgel/";
      const getGGData = await Axios.get(url);
      setGGData(getGGData.data);
    };
    fetchGG();

    const fetchCl = async () => {
      const url = "http://localhost:8000/api/collaforce/";
      const getForceColla = await Axios.get(url);
      setClData(getForceColla.data);
    };
    fetchCl();
    const fetchGh = async () => {
      const url = "http://localhost:8000/api/goldenhorn/";
      const getGoldeHornData = await Axios.get(url);
      setGHData(getGoldeHornData.data);
    };
    fetchGh();
  }, []);
  const handleForUpdateSb = async () => {
    try {
      const url = "http://localhost:8000/api/slimbody/";
      const datasbUpdated = await Axios.get(url);
      setStockValue(datasbUpdated.data[0].stockValue);
      setId(datasbUpdated.data[0]._id);
    } catch (err) {
      console.log(err);
    }
    setFormUpdate(!formUpdate);
  };
  const handleForUpdateGG = async () => {
    try {
      const url = "http://localhost:8000/api/giantgel/";
      const dataGGUpdated = await Axios.get(url);
      setStockValue(dataGGUpdated.data[0].stockValue);
      setId(dataGGUpdated.data[0]._id);
    } catch (err) {
      console.log(err);
    }
    setFormUpdate(!formUpdate);
  };
  const handleForUpdateCl = async () => {
    try {
      const url = "http://localhost:8000/api/collaforce/";
      const dataClUpdated = await Axios.get(url);
      setStockValue(dataClUpdated.data[0].stockValue);
      setId(dataClUpdated.data[0]._id);
    } catch (err) {
      console.log(err);
    }
    setFormUpdate(!formUpdate);
  };
  const handleForUpdateGH = async () => {
    try {
      const url = "http://localhost:8000/api/goldenhorn/";
      const dataGhUpdated = await Axios.get(url);
      setStockValue(dataGhUpdated.data[0].stockValue);
      setId(dataGhUpdated.data[0]._id);
    } catch (err) {
      console.log(err);
    }
    setFormUpdate(!formUpdate);
  };
  const EditSb = async () => {
    const url =
      ids === "612775fb91f4094ab060190f"
        ? "http://localhost:8000/api/slimbody/add/" + ids
        : ids === "612a3983cd7fde4a48f2e2c5"
        ? "http://localhost:8000/api/collaforce/add/" + ids
        : ids === "612a4a4164ea144b0444446d"
        ? "http://localhost:8000/api/goldenhorn/add/" + ids
        : "http://localhost:8000/api/giantgel/add/" + ids;
    const Rusultas = stockValue + +added + +routurn - +minus;
    const dataSb = {
      stockValue: Rusultas,
      added: added,
      minus: minus,
      routurn: routurn,
    };
    await Axios.put(url, dataSb);
    return window.location.reload();
  };
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body {  background:#348ce0;}
`,
        }}
      />
      {formUpdate ? (
        <div className={styles.form_update_allproducts}>
          <div className={styles.form_pd}>
            <motion.div
              className={styles.handle_formupdateallprod}
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
              <div className={styles.form_up_all_prod}>
                <span onClick={() => handleForUpdateSb()}>
                  <AiFillCloseCircle />
                </span>
              </div>
              <div className={styles.allp_icons}>
                <TextField
                  type="number"
                  value={stockValue}
                  onChange={(e) => setStockValue(e.target.value)}
                  variant="standard"
                  label="stock value"
                />
                <i>
                  <AiOutlineStock />
                </i>
              </div>
              <div className={styles.allp_icons}>
                <TextField
                  type="number"
                  value={added}
                  onChange={(e) => setAdded(e.target.value)}
                  variant="standard"
                  label="stock Plus"
                />
                <i>
                  <AiOutlinePlusCircle />
                </i>
              </div>
              <div className={styles.allp_icons}>
                <TextField
                  type="number"
                  value={minus}
                  onChange={(e) => setMinus(e.target.value)}
                  variant="standard"
                  label="stock Moin"
                />
                <i>
                  <AiOutlineMinusCircle />
                </i>
              </div>
              <div className={styles.allp_icons}>
                <TextField
                  type="number"
                  value={routurn}
                  onChange={(e) => setRouturn(e.target.value)}
                  variant="standard"
                  label="retourn"
                />
                <i>
                  <GiReturnArrow />
                </i>
              </div>
              <div>
                <button onClick={() => EditSb()}>
                  Valider
                  <span>
                    <AiOutlineCheck />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
      <div className={styles.parent_all_product}>
        <div className={styles.parent_allProducts}>
          <div>
            <h1>Produits</h1>
          </div>
        </div>
        <div className={styles.handle_products_details}>
          <div className={styles.content_products}>
            <motion.div
              className={styles.each_product_each}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                },
                ani: {
                  opacity: 1,
                  transition: {
                    delay: 0.1,
                    type: "spring",
                    stiffness: 80,
                  },
                },
              }}
            >
              <div className={styles.bg_each_product_each}>
                <img src={Mega} alt="" />
              </div>
              {sbData.map((datasb, i) => {
                return (
                  <div className={styles.allpro_aftermapping} key={i}>
                    <h1>Solde : {datasb.stockValue}</h1>
                    <div>
                      <button onClick={handleForUpdateSb}>
                        Modifier
                        <span>
                          <AiFillEdit />
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className={styles.btn_histo_sb}>
                <Link to="/historique/slim-body">
                  <button>
                    Historique
                    <span>
                      <GiReturnArrow />
                    </span>
                  </button>
                </Link>
              </div>
              <div className={styles.btn_histo_sb}>
                <Link to="/historique/slimbody/out-in">
                  <button>
                    Contrôle
                    <span>
                      <AiFillTablet />
                    </span>
                  </button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className={styles.each_product_each}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                },
                ani: {
                  opacity: 1,
                  transition: {
                    delay: 0.28,
                    type: "spring",
                    stiffness: 80,
                  },
                },
              }}
            >
              <div className={styles.bg_each_product_each}>
                <img src={Colla} alt="" />
              </div>
              {clData.map((datacl, i) => {
                return (
                  <div className={styles.allpro_aftermapping} key={i}>
                    <h1>Solde : {datacl.stockValue}</h1>
                    <div>
                      <button onClick={handleForUpdateCl}>
                        Modifier
                        <span>
                          <AiFillEdit />
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className={styles.btn_histo_sb}>
                <Link to="/historique/colla-force">
                  <button>
                    Historique
                    <span>
                      <GiReturnArrow />
                    </span>
                  </button>
                </Link>
              </div>
              <div className={styles.btn_histo_sb}>
                <Link to="/historique/colla-force/out-in/">
                  <button>
                    Contrôle
                    <span>
                      <AiFillTablet />
                    </span>
                  </button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className={styles.each_product_each}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                },
                ani: {
                  opacity: 1,
                  transition: {
                    delay: 0.38,
                    type: "spring",
                    stiffness: 80,
                  },
                },
              }}
            >
              <div className={styles.bg_each_product_each}>
                <img src={GG} alt="" />
              </div>
              {ggData.map((datagg, i) => {
                return (
                  <div className={styles.allpro_aftermapping} key={i}>
                    <h1>Solde : {datagg.stockValue}</h1>
                    <div>
                      <button onClick={handleForUpdateGG}>
                        Modifier
                        <span>
                          <AiFillEdit />
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className={styles.btn_histo_sb}>
                <Link to="/historique/giant-gel">
                  <button>
                    Historique
                    <span>
                      <GiReturnArrow />
                    </span>
                  </button>
                </Link>
              </div>
              <div className={styles.btn_histo_sb}>
                <Link to="/historique/giantgel/out-in/">
                  <button>
                    Contrôle
                    <span>
                      <AiFillTablet />
                    </span>
                  </button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className={styles.each_product_each}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                },
                ani: {
                  opacity: 1,
                  transition: {
                    delay: 0.48,
                    type: "spring",
                    stiffness: 80,
                  },
                },
              }}
            >
              <div className={styles.bg_each_product_each}>
                <img src={Golden} alt="" />
              </div>
              {ghData.map((datagh, i) => {
                return (
                  <div className={styles.allpro_aftermapping} key={i}>
                    <h1>Solde : {datagh.stockValue}</h1>
                    <div>
                      <button onClick={handleForUpdateGH}>
                        Modifier
                        <span>
                          <AiFillEdit />
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className={styles.btn_histo_sb}>
                <Link to="/historique/golden-horn">
                  <button>
                    Historique
                    <span>
                      <GiReturnArrow />
                    </span>
                  </button>
                </Link>
              </div>
              <div className={styles.btn_histo_sb}>
                <Link to="/historique/golden-horn/out-in/">
                  <button>
                    Contrôle
                    <span>
                      <AiFillTablet />
                    </span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
