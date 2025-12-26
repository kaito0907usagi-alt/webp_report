"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let finalfantasy = [
  { id:1, series:"FinalFantasyI", year:"1987-12",  name:"Final Fantasy",    main:"true", device:"ファミリーコンピューター", explanation:"FFシリーズ初タイトル" },
  { id:2, series:"FinalFantasyII", year:"1988-12",  name:"Final Fantasy II", main:"true", device:"ファミリーコンピューター", explanation:"熟練度システム" },
  { id:3, series:"FinalFantasyIII", year:"1990-04",  name:"Final Fantasy III",main:"true", device:"ファミリーコンピューター", explanation:"初のジョブシステム" },
  { id:4, series:"FinalFantasyIV", year:"1991-07",  name:"Final Fantasy IV", main:"true", device:"スーパーファミリーコンピューター", explanation:"ATB初実装" },
  { id:5, series:"FinalFantasyV", year:"1992-12",  name:"Final Fantasy V",  main:"true", device:"スーパーファミリーコンピューター", explanation:"ジョブとアビリティ" },
  { id:6, series:"FinalFantasyVI", year:"1994-04",  name:"Final Fantasy VI", main:"true", device:"スーパーファミリーコンピューター", explanation:"魔石システム" },
  { id:7, series:"FinalFantasyVII", year:"1997-01",  name:"Final Fantasy VII",main:"true", device:"PS", explanation:"初の3Dグラフィック" },
  { id:8, series:"FinalFantasyVIII", year:"1999-02",  name:"Final Fantasy VIII",main:"true",device:"PS", explanation:"ジャンクションシステム" },
  { id:9, series:"FinalFantasyIX", year:"2000-07",  name:"Final Fantasy IX", main:"true", device:"PS", explanation:"PS最後のタイトル" },
  { id:10,series:"FinalFantasyX", year:"2001-07", name:"Final Fantasy X", main:"true", device:"PS2", explanation:"PS2での初タイトル" },
  { id:11,series:"FinalFantasyXI", year:"2002-05", name:"Final Fantasy XI", main:"true", device:"PS2", explanation:"初のMMO" },
  { id:12,series:"FinalFantasyXII", year:"2006-03", name:"Final Fantasy XII", main:"true", device:"PS2", explanation:"ガンビット" },
  { id:13,series:"FinalFantasyXIII", year:"2009-12", name:"Final Fantasy XIII", main:"true", device:"PS3", explanation:"オプティマシステム" },
  { id:14,series:"FinalFantasyXIV", year:"2010-09", name:"Final Fantasy XIV", main:"true", device:"PS5", explanation:"大失敗のMMO" },
  { id:15,series:"FinalFantasyXV", year:"2016-11", name:"Final Fantasy XV", main:"true", device:"PS4", explanation:"オープンワールド初実装" },
  { id:16,series:"FinalFantasyXVI", year:"2023-06", name:"Final Fantasy XVI", main:"true", device:"PS5", explanation:"初の完全アクションタイトル" },
  { id:17,series:"FinalFantasyothers",year:"2025-09",  name:"FINALFANTASYTACTICS THE IVALICE CHRONICLES",  main:"false", device:"PS5", explanation:"タクティカルRPGの金字塔" },
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
  let select =req.query.submit_btn;
  if(select==="1"){
    res.redirect('/ff');
  }else if(select==="0"){
    res.redirect('/ff/'+series);
  }else{
  res.redirect('/public/ff_add.html');
  }
});

// Read
app.get("/ff", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const maindata=finalfantasy.filter(item =>item.main === "true");
  res.render('ff_db1', { data: maindata });
});

// Edit
app.get("/ff/edit/:year", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const year = req.params.year;
  const detail = finalfantasy.find(item=> item.year ===  year );
  res.render('ff_edit', {data: detail} );
});

// Update
app.post("/ff/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = finalfantasy.findIndex(item => item.id === id);
  if (idx !== -1) {
    const series =req.body.series;
    const year =req.body.year;
    finalfantasy[idx].series = req.body.series;
    finalfantasy[idx].year = req.body.year;
    finalfantasy[idx].name = req.body.name;
    if (req.body.main === "true") {
      finalfantasy[idx].main = "true";
    } else {
      finalfantasy[idx].main = "false";
    }
    finalfantasy[idx].device = req.body.device;
    finalfantasy[idx].explanation = req.body.explanation;

    let select = req.body.submit_btn;
    if (select === "1") {
      res.redirect('/ff');
    } else if (select === "0") {
      res.redirect('/ff/' + series);
    } else {
      res.redirect('/ff/' + series + '/' + year); 
    }
}
  
});

// Delete
app.get("/ff/delete/:series/:year/:select", (req, res) => {
  const series =req.params.series;
  const year =req.params.year;
  const select =req.params.select;
  const targetid =finalfantasy.findIndex(item => item.year === year);
  if(targetid!== -1){
  finalfantasy.splice( targetid, 1 );
  }
  if(select ==1){
  res.redirect('/ff/'+series );
}else{
  res.redirect('/ff');
}
});

// 1. 中間ページ
app.get("/ff/:series", (req, res) => {
  const series = req.params.series;
  const seriesdata = finalfantasy.filter(item => item.series === series);
  res.render('ff_db2', { data: seriesdata });
});

// 2. 詳細ページ
app.get("/ff/:series/:year", (req, res) => {
  const series = req.params.series;
  const year = req.params.year;
  const detail = finalfantasy.find(item => item.series === series && item.year === year);
  res.render('ff_detail', { data: detail });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
