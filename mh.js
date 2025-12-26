"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

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

app.get("/mh_add", (req, res) => {
  let maxid = mh.length ? Math.max(...mh.map(item => item.id)) : 0;
  let id = maxid + 1;
  let name = req.query.name;
  let species= req.query.species;
  let week= req.query.week;
  let resist= req.query.resist;
  let invalid=req.query.invalid;
  let newdata = { id: id, name: name ,species: species, week:week,resist:resist,invalid:invalid};
  mh.push( newdata );
  let select =req.query.submit_btn;
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
  const maindata=mh;
  res.render('mh_db1', { data: maindata });
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



app.listen(8080, () => console.log("Example app listening on port 8080!"));
