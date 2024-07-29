import express from "express";
import axios from "axios";

const app = express();
const port = 1112;
const headers = {
  'accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'accept-encoding': 'gzip, deflate, br, zstd',
  'accept-language': 'en-US,en;q=0.9',
  'referer': 'https://chapmanganato.to/',
  'sec-ch-ua': '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'image',
  'sec-fetch-mode': 'no-cors',
  'sec-fetch-site': 'cross-site',
  'sec-gpc': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
};

app.get("/", async (req, res) => {
  const imageUrl = req.query.url;

  try {
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "stream",
      headers : headers,
    });
    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({msg:"Error fetching image"});
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
