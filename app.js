"use strict";

const { name } = require("ejs");
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect('/public/main.html');
});

//1.FF
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
  { id:18,series:"FinalFantasyVII",year:"2020-04",name:"Final FantasyVII REMAKE",main:"false",device:"PS4 PS5 PC",explanation:"FF7リメイクプロジェクト第一作目"}
];

app.get("/ff/create",(req,res)=>{
  res.redirect("/public/ff_add.html");
});

app.post("/ff_add", (req, res) => {
  let maxid = finalfantasy.length ? Math.max(...finalfantasy.map(item => item.id)) : 0;
  let id = maxid + 1;
  let series = req.body.series;
  let year=req.body.year;
  let name = req.body.name;
  let main= req.body.main;
  let device= req.body.device;
  let explanation= req.body.explanation;
  let newdata = { id: id, series: series,year: year, name: name ,main: main, device: device,explanation: explanation};
  finalfantasy.push( newdata );
  let select =req.body.submit_btn;
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
app.get("/ff/edit/:name", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const name = req.params.name;
  const detail = finalfantasy.find(item=> item.name ===  name );
  res.render('ff_edit', {data: detail} );
});

// Update
app.post("/ff/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = finalfantasy.findIndex(item => item.id === id);
  if (idx !== -1) {
    const series =req.body.series;
    const name =req.body.name;
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
      res.redirect('/ff/' + series + '/' + name); 
    }
}
  
});

// Delete
app.get("/ff/delete/:series/:name/:select", (req, res) => {
  const series =req.params.series;
  const name =req.params.name;
  const select =req.params.select;
  const targetid =finalfantasy.findIndex(item => item.name === name);
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
app.get("/ff/:series/:name", (req, res) => {
  const series = req.params.series;
  const name = req.params.name;
  const detail = finalfantasy.find(item => item.series === series && item.name === name);
  res.render('ff_detail', { data: detail });
});

//2.monsterhunter

let mh = [
  { id: 1, name: "ディノバルド", species: "獣竜種", week: ["水"], resist: ["雷"], invalid: ["火"] },
  { id: 2, name: "ジンオウガ", species: "牙竜種", week: ["氷"], resist: ["火","龍"], invalid: ["雷"] },
  { id: 3, name: "ミラボレアス", species: "古龍種", week: ["龍"], resist: ["水","雷","氷"], invalid: [] },
  { id: 4, name: "イャンガルルガ", species: "鳥竜種", week: ["水"], resist: ["氷"], invalid: ["火","雷"] },
  { id: 5, name: "ブラントドス", species: "魚竜種", week: ["火"], resist: ["水"], invalid: ["氷","龍"] },
  { id: 6, name: "リオレウス希少種", species: "飛竜種", week: ["水"], resist: ["氷"], invalid: ["火","龍"] },
  { id: 7, name: "ラージャン", species: "牙獣種", week: ["氷"], resist: ["水"], invalid: ["火","雷","龍"] },
  { id: 8, name: "レーシェン", species: "遺存種", week: ["火"], resist: ["氷"], invalid: ["水"] },
  { id: 9, name: "イヴェルカーナ", species: "古龍種", week: ["火"], resist: ["水"], invalid: ["氷"] },
];

app.get("/mh/create",(req,res)=>{
  res.redirect("/public/mh_add.html");
});

app.post("/mh_add", (req, res) => {
  let maxid = mh.length ? Math.max(...mh.map(item => item.id)) : 0;
  let id = maxid + 1;
  let name = req.body.name;
  let species= req.body.species;
  let week= req.body.week;
  let resist= req.body.resist;
  let invalid=req.body.invalid;
  let newdata = { id: id, name: name ,species: species, week:week,resist:resist,invalid:invalid};
  mh.push( newdata );
  let select =req.body.submit_btn;
  if(select==="1"){
    res.redirect('/mh');
  }else if(select==="0"){
    res.redirect('/mh/'+species);
  }else{
  res.redirect('/public/mh_add.html');
  }
});

// Read
app.get("/mh", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  let specieslist =["牙竜種","鳥竜種","獣竜種","魚竜種","飛竜種","牙獣種","古龍種","遺存種"];
  res.render('mh_db1', { data: specieslist });
});

// Edit
app.get("/mh/edit/:name", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const name = req.params.name;
  const detail = mh.find(item=> item.name ===  name );
  res.render('mh_edit', {data: detail} );
});

// Update
app.post("/mh/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = mh.findIndex(item => item.id === id);
  if (idx !== -1) {
    const species =req.body.species;
    const name=req.body.name;
    mh[idx].species = req.body.species;
    mh[idx].name = req.body.name;
    mh[idx].week = req.body.week;
    mh[idx].resist = req.body.resist;
    mh[idx].invalid=req.body.invalid;
    let select = req.body.submit_btn;
    if (select === "1") {
      res.redirect('/mh');
    } else if (select === "0") {
      res.redirect('/mh/' + species);
    } else {
      res.redirect('/mh/' + species + '/' + name); 
    }
}
  
});

// Delete
app.get("/mh/delete/:species/:name/:select", (req, res) => {
  const species =req.params.species;
  const name =req.params.name;
  const select =req.params.select;
  const targetid =mh.findIndex(item => item.name === name);
  if(targetid!== -1){
  mh.splice( targetid, 1 );
  }
  if(select ==1){
  res.redirect('/mh/'+species );
}else{
  res.redirect('/mh');
}
});

// 1. 中間ページ
app.get("/mh/:species", (req, res) => {
  const species = req.params.species;
  const speciesdata = mh.filter(item => item.species === species);
  res.render('mh_db2', { data: speciesdata });
});

// 2. 詳細ページ
app.get("/mh/:species/:name", (req, res) => {
  const species = req.params.species;
  const name = req.params.name;
  const detail = mh.find(item => item.species === species && item.name === name);
  res.render('mh_detail', { data: detail });
});

// 3.persona
let persona = [
  { id: 1, name: "ジャアクフロスト", arcana: "愚者", week: ["光"], resist: [], invalid: ["火"], reflection: ["闇"], absorption: ["氷"], example: ["キングフロスト","ジャックランタン", "ジャックフロスト"] },
  { id: 2, name: "スルト", arcana: "魔術師", week: ["氷"], resist: [], invalid: [], reflection: [], absorption: ["火"], example:[ "ジャターユ", "ソロネ"] },
  { id: 3, name: "スカアハ", arcana: "女教皇", week: ["火"], resist: ["風","光"], invalid: ["氷"], reflection: [], absorption: [], example: ["ガルーダ", "ガブリエル"] },
  { id: 4, name: "アリラト", arcana: "女帝", week: ["火","闇"], resist: ["風"], invalid: ["氷"], reflection: ["斬", "打"], absorption: [], example:[ "サンダルフォン","スサノオ"] },
  { id: 5, name: "オーディン", arcana: "皇帝", week: ["風"], resist: [], invalid: [], reflection: [], absorption: ["雷"], example:[ "セイテンタイセイ", "クヴァンダ"] },
  { id: 6, name: "コウリュウ", arcana: "法王", week: [], resist: [], invalid: ["光"], reflection: ["雷",], absorption: [], example: ["ゲンブ", "セイリュウ", "ビャッコ", "スザク"] },
  { id: 7, name: "キュベレ", arcana: "恋愛", week: ["雷"], resist: ["火","光"], invalid: ["氷"], reflection: [], absorption: [], example: ["トランペッター","ガブリエル"] },
  { id: 8, name: "トール", arcana: "戦車", week: ["風"], resist: [], invalid: ["打","雷"], reflection: [], absorption: [], example: ["だいそうじょう", "クヴァンダ"] },
  { id: 9, name: "メルキセデク", arcana: "正義", week: ["風"], resist: [], invalid: [], reflection: ["打","光"], absorption: [], example: ["バロン", "キクリヒメ"] },
  { id: 10, name: "アラハバキ", arcana: "隠者", week: ["打","氷","闇"], resist: ["光"], invalid: [], reflection: ["斬", "貫"], absorption: [], example: ["カーリー", "ラファエル"] },
  { id: 11, name: "ノルン", arcana: "運命", week: ["雷"], resist: [], invalid: ["火"], reflection: ["氷"], absorption: ["風"], example: ["アトロポス", "ラケシス","クロト"] },
  { id: 12, name: "ジークフリード", arcana: "剛毅", week: ["闇"], resist: ["打"], invalid: ["斬","光"], reflection: [], absorption: [], example: ["ヘカトンケイル", "ミシャグジさま"] },
  { id: 13, name: "マダ", arcana: "刑死者", week: ["氷","風","光"], resist: ["打","雷"], invalid: ["闇"], reflection: [], absorption: ["火"], example: ["ガネーシャ", "ヴァスキ", "ハヌマーン", "ナーガラシャ"] },
  { id: 14, name: "アリス", arcana: "死神", week: ["光"], resist: [], invalid: [], reflection: ["闇"], absorption: [], example: ["リリム", "ティターニア", "ナルキッソス", "ピクシー"] },
  { id: 15, name: "ビャッコ", arcana: "節制", week: ["火"], resist: [], invalid: ["氷"], reflection: ["雷"], absorption: [], example: ["アトロポス", "ラファエル"] },
  { id: 16, name: "ベルゼブブ", arcana: "悪魔", week: ["火","光"], resist: [], invalid: ["打","雷","風"], reflection: ["闇"], absorption: [], example: ["バアル・ゼブル", "アバドン", "リリス", "パズス", "サキュバス", "インキュバス"] },
  { id: 17, name: "マーラ", arcana: "塔", week: ["氷","光"], resist: [], invalid: [], reflection: [], absorption: ["打","火","闇"], example: ["アティス", "モト", "パズス", "インキュバス", "クヴァンダ"] },
  { id: 18, name: "ルシフェル", arcana: "星", week: [], resist: ["斬", "打", "貫"], invalid: [], reflection: [], absorption: ["光", "闇"], example: ["スサノオ", "マザーハーロット"] },
  { id: 19, name: "サンダルフォン", arcana: "月", week: ["闇"], resist: ["雷"], invalid: ["斬"], reflection: ["光"], absorption: [], example: ["キュベレ", "マザーハーロット"] },
  { id: 20, name: "アスラおう", arcana: "太陽", week: ["風"], resist: [], invalid: ["打","光"], reflection: [], absorption: ["火"], example: ["ギリメカラ", "ヴィシュヌ", "セイテンタイセイ", "ビシャモンテン","アタバク","ラクシャーサ"] },
  { id: 21, name: "メサイア", arcana: "審判", week: [], resist: ["火", "氷", "雷", "風"], invalid: [], reflection: ["光","闇"], absorption: [], example: ["オルフェウス", "タナトス"] },
  { id: 22, name: "メタトロン", arcana: "永劫", week: ["雷", "闇"], resist: ["氷"], invalid: ["火", "風", "光"], reflection: [], absorption: [], example: ["ウリエル", "ラファエル", "ガブリエル", "ミカエル"] }
];

app.get("/persona/create",(req,res)=>{
  res.redirect("/public/persona_add.html");
});

app.post("/persona_add", (req, res) => {
  let maxid = persona.length ? Math.max(...persona.map(item => item.id)) : 0;
  let id = maxid + 1;
  let name = req.body.name;
  let arcana = req.body.arcana;
  let week = req.body.week;
  let resist = req.body.resist;
  let invalid = req.body.invalid;
  let reflection = req.body.reflection;
  let absorption = req.body.absorption;
  let example = req.body.example;
  let newdata = { id: id,name: name, arcana:  arcana ,week: week, resist: resist,invalid: invalid,reflection:reflection,absorption:absorption,example:example};
  persona.push( newdata );
  let select =req.body.submit_btn;
  if(select==="1"){
    res.redirect('/persona');
  }else if(select==="0"){
    res.redirect('/persona/'+arcana);
  }else{
  res.redirect('/public/persona_add.html');
  }
});

// Read
app.get("/persona", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  let arcanalist=["愚者", "魔術師", "女教皇", "女帝", "皇帝", "法王", "恋愛", "戦車", "正義", "隠者", "運命", "剛毅", "刑死者", "死神", "節制", "悪魔", "塔", "星", "月", "太陽", "審判", "永劫"];
  res.render('persona_db1',{data:arcanalist});
});

// Edit
app.get("/persona/edit/:name", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const name = req.params.name;
  const detail = persona.find(item=> item.name ===  name );
  res.render('persona_edit', {data: detail} );
});

// Update
app.post("/persona/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = persona.findIndex(item => item.id === id);
  if (idx !== -1) {
    const arcana =req.body.arcana;
    const name =req.body.name;
    persona[idx].arcana = req.body.arcana;
    persona[idx].name = req.body.name;
    persona[idx].week = req.body.week;
    persona[idx].resist = req.body.resist;
    persona[idx].invalid = req.body.invalid;
    persona[idx].reflection=req.body.reflection;
    persona[idx].absorption = req.body.absorption;
    persona[idx].example = req.body.example;

    let select = req.body.submit_btn;
    if (select === "1") {
      res.redirect('/persona');
    } else if (select === "0") {
      res.redirect('/persona/' + arcana);
    } else {
      res.redirect('/persona/' + arcana + '/' + name); 
    }
}
  
});

// Delete
app.get("/persona/delete/:arcana/:name/:select", (req, res) => {
  const arcana =req.params.arcana;
  const name =req.params.name;
  const select =req.params.select;
  const targetid =persona.findIndex(item => item.name === name);
  if(targetid!== -1){
  persona.splice( targetid, 1 );
  }
  if(select ==1){
  res.redirect('/persona/'+arcana );
}else{
  res.redirect('/persona');
}
});

// 1. 中間ページ
app.get("/persona/:arcana", (req, res) => {
  const arcana = req.params.arcana;
  const personadata = persona.filter(item => item.arcana === arcana);
  res.render('persona_db2', { data: personadata });
});

// 2. 詳細ページ
app.get("/persona/:arcana/:name", (req, res) => {
  const arcana = req.params.arcana;
  const name = req.params.name;
  const detail = persona.find(item => item.arcana === arcana && item.name === name);
  res.render('persona_detail', { data: detail });
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
