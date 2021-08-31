const express = require("express");
const router = express.Router();
var { GoogleSpreadsheet } = require("google-spreadsheet");
const SPREADSHEET_ID = "1TpBzZacSeRbeMl7rJVy6-mpPNsZ_DJNxv3cgxTNZDmc";
router.get("/siham", async (req, res) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  const appendSpreadsheet = async () => {
    try {
      await doc.useServiceAccountAuth({
        client_email: "testjs@testjs-324514.iam.gserviceaccount.com",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCWto59B+xgFeb4\ncE3P+QCcCgDZ8aaE+bCUCj/uBtgORS9xVLB4yHIU5NHpcK+gmN/GZ/qWkWQMZ14H\nmnrswnmSXOo5lUm2RNvScfwFSCeih9uyalI1WvyMp39kSrltebXFgK3BIY06ntwn\nEbDyzC143aOjrSZXSGN5CmzIs6ls2cUn4fIorTEW9UKKXOa7+NUdyayF1MkDtYgX\nDkKsAWxiXvGXKfpCiqTome61+gjyaKY3aJkAfeGnZ2z+4nMlDgiPDaHywRwdIqam\nmR6x2hBXCLmkWtstfZVQgVDhYN8DXSSEyu1TlLIQGDpMptCAtIJAKajdu929T8yX\nVJsrfySRAgMBAAECgf9emhF0QqxYGgT02YmIKXXWBkoMXHugEC7aR+OKXiPd5PId\nztAKirPWQkGA98Sop5vPUP8h+iE1WTbUBSPBebOa3QafRe7D8JyBQVnwbPfWg7+e\n75Q0hyNiEvyVHvAKx9E9xXQ32iZpzNefEPHtnSh3tbuzFYaZG6/K+8A5TrRZYxLh\nMcMf8p4ajsET6VI04u/oU6NE9eQf2Q8wH41PiUzxVQWILeb60D/dsy0dQVO5UZXQ\neOiymS+33y1I+eDqQlUQlC19n0jkon/sBzgd3dCARtPZQB25hxOl5fK5XmRxCZvD\nrjw7TlPP/0nWTadmyJcCSQ9jHCqB4YSLCyDlayUCgYEAz0oko/XkSMT7e0rpxjyh\noRS6YU1rH9OFoyeGPYwAbYJwpjPjsq2vpCawa09P9+z7FmQqcW9NuU6rzng0fM8u\ncThwU7rtannlp3WKHAmLIfkhpKrAVUsnqgPXeZAGeKguu8kQYWOyFxvp84fRpXJK\ns+ffBvvrPFTlBF8tQXL8J2MCgYEAuiD1RGBYFbP6ngpOldTqRoAfVihi6QW2KGbY\nlG0RTQgZPh/MgwIhOYRaEP5NdBJ9+xYvJ4qewcLD/zXsM0q/VcAGEHdhObOK7Gmx\nKOgExw54RDNxpgfpiVmSGP3iXRmL9IHLNqlqmWrHa+tZmBpWs9Z33VlFo5xNVLew\nRJ3IaHsCgYAd8lwww8ljKfIa8cusM/41w0TZ4dFkG67mz0L5iUxWhc24dS6kFauW\nT3CVUDQBYV808Ougz6+u4cq4XW1Xyqau/LRdpFfAVjPzaWu2eTp8gf12SKTYra7h\nRQTQLxqAO+vkfTu8liaYaBP4dtq2yDg6nXj/DU4CvVEIvKdRGUeMeQKBgFmGNLI4\nrOVzdd3CE15Z1H0obuof7sMp7h2sqgtqEmI8vPd2kAWLZrOlhzSZPGPR6Sp11yRr\ntkR4C5GbPArHrxPtkn0lDmyUgQOJKp8EShf8S7hyDf3P3HIl1PGUW+ZvvTNTooye\nHBnClDzCLIvOT1mclHaw06AIM+HFoFDAm341AoGAJYmwh3m9UjeBjZIrpAeXlJHC\nYQyHbayTzfy4ev6Wq3O5jXV26pe3XEWEPiJ5HpHeAe+3/i9yjkEPoF6hNXLRnTGP\nfgeBOtT+vLy/jpG+TM0EASGa1ocPob6um4jVtqZ+UDg4vyDzky3fihaOlsRchv3u\nECGf2XUBQq91Zxf0dRs=\n-----END PRIVATE KEY-----\n",
      });
      // loads document properties and worksheets
      await doc.loadInfo();
      const sheet = doc.sheetsById[0];
      const rows = await sheet.getRows();
      //sheets Data for each Row
      rows.map((g) => {
        console.log(g._rawData[0]);
      });
      //sheet titles
      console.log(sheet.headerValues[0]);
    } catch (e) {
      console.error("Error: ", e);
    }
  };
  appendSpreadsheet();
});
module.exports = router;
