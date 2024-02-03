const express = require("express");
const app = express();
const cors = require('cors');
const port = "8080";
const programmingLanguagesRoute = require("./rotues/programmingLang");
const mailerRouter = require("./rotues/mailerSender");
const uploadRouter = require("./rotues/uploadFile");
const qrCodeRouter = require("./rotues/qrCode");

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/programming-lang", programmingLanguagesRoute);
app.use("/mailer", mailerRouter);
app.use("/upload", uploadRouter);
app.use("/qr-code", qrCodeRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`App listing at port ${port}`);
})