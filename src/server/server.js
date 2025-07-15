const pool = require("./database/DatabaseConfig");

const PORT = process.env.PORT || 4000;

// express 모듈 호출
const express = require("express");

//클라이언트에서 서버로 , Content-Type 헤더를 application/json으로 설정하고 요청 body에 JSON 데이터를 전송할때 JSON 데이터를 파싱하여 JavaScript 객체로 변환
const app = express();

app.use(express.json());

const api = require("./routes/index");

// api 처리는 './routes/index'에서 일괄처리
// app.use("/api", api);
app.use("/api", require("./routes/index"));

// http://localhost:4000/ 으로 접속 시 응답메시지 출력
app.get("/", (req, res) => {
  res.send("Server Response Success");
});

app.get("/test", async (req, res) => {
  //   res.send({ test: "this is test!!" });
  try {
    const tests = await pool.query("SELECT * FROM tbl_map"); // queries 객체를 통해 getTests 함수를 호출하여 테스트 목록을 가져옴
    console.log(tests.rows)
    res.status(200).json(tests.rows); // 목록을 JSON 형식으로 응답
  } catch (error) {
    res.status(500).json({ error: "Internal server error" }); // 오류 발생 시 500 에러 응답
    throw error;
  }
});

app.post("/test", (req, res) => {
  console.log("/test(post)", req.body, req.params);

  const { title, content, lat, lng } = req.body; //비구조화할당, 구조분해할당, destructuring
  pool.query(
    `INSERT INTO tbl_map(
      title, content, lat, lng)
     VALUES ( '${title}', '${content}', '${lat}',' ${lng}'
   )`,
    (err, data) => {
      if (!err) {
        // console.log(data, "데이터");
        res.send(data);
      } else {
        res.send(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});
