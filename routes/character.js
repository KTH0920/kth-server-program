const express = require("express");
const router = express.Router();

let char = require("../models/characterModel");

// 전체 데이터 가져오기
router.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "전체 데이터 가져오기", char });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
});

// 데이터 등록
router.post("/", (req, res) => {
  try {
    const { name, level, isOnline } = req.body;

    if (!name || !level) {
      return res
        .status(404)
        .json({ message: "이름과 레벨을 모두 입력하세요." });
    }

    const newChar = {
      id: Date.now(),
      name,
      level,
      isOnline: isOnline ?? false, //빈값인 경우는 null일때   false
    };

    char.push(newChar);

    res.status(200).json({ message: "데이터 등록 성공", char });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
});

// 데이터 1개 불러오기
router.get("/:id", (req, res) => {
  try {
    const charId = Number(req.params.id);
    const chars = char.find((item) => item.id === charId);

    if (!char) {
      return res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "전체 데이터 가져오기", chars });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error });
  }
});

// 데이터 수정하기
router.put("/:id", (req, res) => {
  try {
    const charId = Number(req.params.id);
    const index = char.findIndex((item) => item.id === charId);

    if (index === -1) {
      return res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
    }

    const updateData = req.body;

    char[index] = {
      ...char[index],
      ...updateData,
    };

    res.status(200).json({ message: "데이터 수정 완료", char: char[index] });
  } catch (error) {
    console.error("데이터 수정 중 오류:", error);
    res.status(500).json({ message: "서버 오류 발생", error });
  }
});

// 데이터 삭제하기
router.delete("/:id", (req, res) => {
  try {
    const charId = Number(req.params.id);
    const index = char.findIndex((item) => item.id === charId);

    if (index === -1) {
      return res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
    }

    char.splice(index, 1)

    res.status(200).json({ message: "데이터 수정 완료", char});
  } catch (error) {
    console.error("데이터 수정 중 오류:", error);
    res.status(500).json({ message: "서버 오류 발생", error });
  }
});

module.exports = router;
