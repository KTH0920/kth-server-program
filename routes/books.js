const express = require("express");
const router = express.Router();

// 메모리 데이터
let books = [
  { id: 1, title: "javascript", auther: "김**" },
  { id: 2, title: "html", auther: "김**" },
  { id: 3, title: "css", auther: "김**" },
];
let initId = 4;

const findIndexId = (idParam) => {
  return books.findIndex((b) => b.id == Number(idParam));
};

// 도서 생성
router.post("/", (req, res) => {
  try {
    const { title, auther } = req.body;

    // 유효성 검사
    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof auther !== "string" ||
      auther.trim() === ""
    ) {
      return res.status(400).json({
        message: "title과 auther는 비어있지 않은 문자열이어야 합니다.",
      });
    }

    const maxId =
      books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;

    const newBook = {
      id: maxId + 1,
      title: title,
      auther: auther,
    };

    books.push(newBook);

    return res.status(201).json({
      message: "도서 등록 완료",
      books,
    });
  } catch (error) {
    console.error("도서 등록 중 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 도서 전체 불러오기
router.get("/", (req, res) => {
  try {
    res.status(201).json({ message: "도서 전체 불러오기 완료", books });
  } catch (error) {
    console.error("도서 생성 중 오류");
    res.status(500).json({ message: "서버 오류" });
  }
});

// 특정 도서 조회
router.get("/:id", (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const index = findIndexId(bookId);

    if (index === -1) {
      return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
    }

    res
      .status(201)
      .json({ message: "도서 단일 조회 완료", book: books[index] });
  } catch (error) {
    console.error("도서 생성 중 오류");
    res.status(500).json({ message: "서버 오류" });
  }
});

// 도서 수정
router.put("/:id", (req, res) => {
  try {
    const booksId = Number(req.params.id);
    const index = findIndexId(booksId);

    if (index === -1) {
      return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
    }

    const updateData = req.body;

    books[index] = {
      ...books[index],
      ...updateData,
    };

    res.status(201).json({ message: "도서 수정 완료", book: books[index] });
  } catch (error) {
    console.error("도서 생성 중 오류");
    res.status(500).json({ message: "서버 오류" });
  }
});

// 도서 삭제
router.get("/:id", (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const index = findIndexId(bookId);

    if (index === -1) {
      return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
    }

    books.splice(index, 1);

    res
      .status(201)
      .json({ message: "도서 단일 조회 완료", book: books[index] });
  } catch (error) {
    console.error("도서 생성 중 오류");
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
