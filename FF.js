const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let finalfantasy = [
  { id:1, code:"FF1", name:"Final Fantasy"},
  { id:2, code:"FF2", name:"Final Fantasy II"},
  { id:3, code:"FF3", name:"Final Fantasy III"},
  { id:4, code:"FF4", name:"Final Fantasy IV"},
  { id:5, code:"FF5", name:"Final Fantasy V"},
  { id:6, code:"FF6", name:"Final Fantasy VI"},
  { id:7, code:"FF7", name:"Final Fantasy VII"},
  { id:8, code:"FF8", name:"Final Fantasy VIII"},
  { id:9, code:"FF9", name:"Final Fantasy IX"},
  { id:10, code:"FF10", name:"Final Fantasy X"},
  { id:11, code:"FF11", name:"Final Fantasy XI"},
  { id:12, code:"FF12", name:"Final Fantasy XII"},
  { id:13, code:"FF13", name:"Final Fantasy XIII"},
  { id:14, code:"FF14", name:"Final Fantasy XIV"},
  { id:15, code:"FF15", name:"Final Fantasy XV"},
  { id:16, code:"FF16", name:"Final Fantasy XVI"},
  { id:17, code:"", name:"その他"},
];

app.get("/ff", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: finalfantasy });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
