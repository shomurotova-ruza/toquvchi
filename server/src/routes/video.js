const express = require("express");
const fs = require("fs");
const path = require("path");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET /api/video/b1  -> server/videos/b1.mp4
router.get("/:id", requireAuth, (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, "..", "..", "videos", `${id}.mp4`);

  if (!fs.existsSync(filePath)) return res.status(404).send("Video topilmadi");

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;


  res.setHeader("Accept-Ranges", "bytes");

  if (range) {
    const match = /bytes=(\d+)-(\d*)/.exec(range);
    const start = match ? parseInt(match[1], 10) : 0;
    const end = match && match[2] ? parseInt(match[2], 10) : fileSize - 1;

    if (start >= fileSize) {
      res.status(416).setHeader("Content-Range", `bytes */${fileSize}`);
      return res.end();
    }
    
    //test

    const chunkSize = end - start + 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(filePath).pipe(res);
  }
});

module.exports = router;