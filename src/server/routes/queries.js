const pool = require("../database/DatabaseConfig");

const getTest = async (res) => {
  pool.query(`SELECT * FROM tbl_map order by id`, (err, data) => {
    if (!err) {
      // console.log(data.rows);C
      res.send(data.rows);
      // res.send("OK");
    } else {
      res.send(err);
    }
  });
};

const getTests = async (res) => {
  try {
    const tests = await pool.query("SELECT * FROM tbl_map");
    // console.log(tests);
    return tests;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

const getModify = async (req, res) => {
  // console.log(req.params);
  console.log(req.body);

  const { id, title, content, lat, lng } = req.body; //비구조화할당, 구조분해할당, destructuring

  if (!id) {
    pool.query(
      `INSERT INTO tbl_map(title, content, lat, lng) VALUES ( '${title}', '${content}', '${lat}',' ${lng}')`,
      (err, data) => {
        if (!err) {
          // console.log(data, "insert");
          res.send(data);
        } else {
          res.send(err);
        }
      }
    );
  } else {
    pool.query(
      // "update tbl_map  set title = $2, content = $3, lat = $4, lng = $5 where id = $1",[id, title, content, lat, lng],
      `update tbl_map set title = '${title}', content = '${content}', lat = '${lat}', lng = '${lng}' where id = ${id}`,
      (err, data) => {
        if (!err) {
          console.log(data, "update");
          res.send("OK");
        } else {
          console.log(err);
          res.send(err);
        }
      }
    );
  }
};
const getDelete = async (req, res) => {
  console.log(req.params);
  // const { id } = req.body; //비구조화할당, 구조분해할당, destructuring
  const { id } = req.params; //비구조화할당, 구조분해할당, destructuring
  console.log(id);
  pool.query(`delete from tbl_map where id='${id}'`, (err, data) => {
    if (!err) {
      res.send(data);
      console.log("delete success..");
    } else {
      res.send(err);
    }
  });
};
module.exports = {
  getTests,
  getModify,
  getDelete,
  getTest,
};
