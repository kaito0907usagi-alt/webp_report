"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

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
  res.render('persona_db1');
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
