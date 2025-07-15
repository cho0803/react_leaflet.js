const express = require("express");
const router = express();

const queries = require("./queries");

// http://localhost:4000/ 으로 접속 시 응답메시지 출력
router.get("/hello", (req, res) => {
  // res.status(200).json(tests); // 목록을 JSON 형식으로 응답
  res.send({ test: "this is hello!!" });
});

router.get("/test", async (req, res) => {
  // queries 객체를 통해 getTests 함수를 호출하여 테스트 목록을 가져옴
  await queries.getTest(res);

  //   try {
  //     // queries 객체를 통해 getTests 함수를 호출하여 테스트 목록을 가져옴
  //     const tests = await queries.getTests();
  //     // 목록을 JSON 형식으로 응답
  //     // res.status(200).json(tests);
  //     res.send(tests.rows);
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal server error" }); // 오류 발생 시 500 에러 응답
  //   }
});

router.post("/test", async (req, res) => {
  // console.log(req.body, "파라미터");
  await queries.getModify(req, res);
});

router.delete("/test/:id", async (req, res) => {
  // console.log(req.body, "파라미터");
  await queries.getDelete(req, res);
});

router.get("/test2", async (req, res) => {
  try {
    // queries 객체를 통해 getTests 함수를 호출하여 테스트 목록을 가져옴
    const tests = await queries.getTest();
    // 목록을 JSON 형식으로 응답
    // res.status(200).json(tests);
    res.send(tests.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" }); // 오류 발생 시 500 에러 응답
  }
});

module.exports = router;
