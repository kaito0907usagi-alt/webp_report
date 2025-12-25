"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let finalfantasy = [
  { id:1, series:"FinalFantasy1", year:"1",  name:"Final Fantasy",    main:"true", device:"ファミリーコンピューター", explanation:"FFシリーズ初タイトル" },
  { id:2, series:"FinalFantasy2", year:"2",  name:"Final Fantasy II", main:"true", device:"ファミリーコンピューター", explanation:"FFシリーズ2作品目" },
  { id:3, series:"FinalFantasy3", year:"3",  name:"Final Fantasy III",main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:4, series:"FinalFantasy4", year:"4",  name:"Final Fantasy IV", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:5, series:"FinalFantasy5", year:"5",  name:"Final Fantasy V",  main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:6, series:"FinalFantasy6", year:"6",  name:"Final Fantasy VI", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:7, series:"FinalFantasy7", year:"7",  name:"Final Fantasy VII",main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:8, series:"FinalFantasy8", year:"8",  name:"Final Fantasy VIII",main:"true",device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:9, series:"FinalFantasy9", year:"9",  name:"Final Fantasy IX", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:10,series:"FinalFantasy10", year:"10", name:"Final Fantasy X", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:11,series:"FinalFantasy11", year:"11", name:"Final Fantasy XI", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:12,series:"FinalFantasy12", year:"12", name:"Final Fantasy XII", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:13,series:"FinalFantasy13", year:"13", name:"Final Fantasy XIII", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:14,series:"FinalFantasy14", year:"14", name:"Final Fantasy XIV", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:15,series:"FinalFantasy15", year:"15", name:"Final Fantasy XV", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:16,series:"FinalFantasy16", year:"16", name:"Final Fantasy XVI", main:"true", device:"ファミリーコンピューター", explanation:"ATBゲージ初実装" },
  { id:17,series:"FinalFantasyothers",        year:"0",  name:"その他",  main:"true", device:"ファミリーコンピューター", explanation:"その他" },
];

app.get("/ff_add", (req, res) => {
  let maxid = finalfantasy.length ? Math.max(...finalfantasy.map(item => item.id)) : 0;
  let id = maxid + 1;
  let series = req.query.series;
  let year=req.query.year;
  let name = req.query.name;
  let main= req.query.main;
  let device= req.query.device;
  let explanation= req.query.explanation;
  let newdata = { id: id, series: series,year: year, name: name ,main: main, device: device,explanation: explanation};
  finalfantasy.push( newdata );
  res.redirect('/public/ff_add.html');
});

// Read
app.get("/ff", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const maindata=finalfantasy.filter(item =>item.main === "true");
  res.render('ff_db1', { data: maindata });
});

// 1. 中間ページ
app.get("/ff/:year", (req, res) => {
  const year = req.params.year;
  const seriesdata = finalfantasy.filter(item => item.series === year);
  res.render('ff_db2', { data: seriesdata });
});

// 2. 詳細ページ
app.get("/ff/:series/:year", (req, res) => {
  const series = req.params.series;
  const year = req.params.year;
  const detail = finalfantasy.find(item => item.series === series && item.year === year);
  res.render('ff_detail', { data: detail });
});

// Delete
app.get("/ff/delete/:year", (req, res) => {
  const year = req.params.year;
  finalfantasy = finalfantasy.filter(item => item.year !== year);
  res.redirect('/' );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = finalfantasy[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  finalfantasy[req.params.number].code = req.body.code;
  finalfantasy[req.params.number].name = req.body.name;
  finalfantasy[req.params.number].change = req.body.change;
  finalfantasy[req.params.number].passengers = req.body.passengers;
  finalfantasy[req.params.number].distance = req.body.distance;
  console.log( finalfantasy );
  res.redirect('/keiyo2' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
