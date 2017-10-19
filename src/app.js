const {ActivityIndicator, Button, Composite, ScrollView, TextView, ImageView, ui} = require('tabris');


var feedback = {
  "1": {point: 3, content: "以后做题遇到已知三角形并且两边相等的话，要首先想到”等边对等角“哦"},
  2: {point: 3, content: "做题时请多想想想想自己要用到的结论或定理与已知条件之间的关联"},
  "3": {point: 1, content: "“角平分线”顾名思义，就是可以把一个角分成两个相等小角的线，既然知道大角的角度，也就知道平分后两个小角的角度了"},
  "4": {point: 3, content: "等边对等角，等角对等边，这俩兄弟非常常用，一定要多考虑哟"}
}

var logic = {
  "1": {type: "item", content: "urlOfItemHere", next: "101"},
  "101": {type: "agent", content: "Hi，帮我看下这道题该怎么证明呀？", next: "100"},
  "100": {type: "choice", passage: "给你一些提示吧，", content:[
    {text: "△ABC是个三角形呢", next: "201", feedback: "1", disabled: false},
    {text: "△ABC中，AB=AC呢", next: "301", disabled: false},
    {text: "△ABC中，∠A=36°呢", next: "401", feedback: "1", disabled: true},
    {text: "BD是∠ABC的角平分线呢", next: "501", feedback: "1", disabled: true}
  ]},
  "201": {type: "agent", content: "嗯？有什么奇怪的？不过只是一个普通的三角形而已呀……", next: "203"},
  "203": {type: "choice", passage: "这个很重要啦，是因为", content: [
    {text: "三角形的内角和是180°", next: "601", disabled: false},
    {text: "三角形两边之和大于第三边，两边之差小于第三边", next: "701", feedback: 2, disabled: true},
    {text: "三角形的外角等于另外两内角的和", next: "701", feedback: 2, disabled: true},
    {text: "sorry 我再想想……", next: "100", penalty: 1, disabled: false}
  ]},
  "301": {type: "agent", content: "嗯，等边对等角，所以∠ABC=∠C了。", next: "302"},
  "302": {type: "choice", passage: "那么", content: [
    {text: "∠A是多少度呢？", next: "311", disabled: true},
    {text: "∠ABD是多少度呢？", next: "321", disabled: false},
    {text: "∠DBC是多少度呢？", next: "331", disabled: true},
    {text: "sorry 我再想想……", next: "203", disabled: false}
  ]},
  "311": null,
  "321": {type: "agent", next: "322", content: "因为BD是∠ABC的平分线，∠A又是36°，所以∠ABC是72°，再所以∠ABD就是36°了。"},
  "322": {type: "choice", passage: "所以有没有发现∠ABD", content: [
    {text: "和∠A的关系呢？", next: "3211", disabled: false},
    {text: "和∠DBC的关系呢？", next: "3221", disabled: true},
    {text: "和∠ABC的关系呢？", next: "3221", disabled: true},
    {text: "sorry 我再想想……", next: "302", disabled: false}
  ]},
  "331": null,
  "401": null,
  "501": null,
  "601": {type: "agent", content: "哦哦，内角和是180°，而且∠A=36°，所以∠ABC+∠C就是180°-36°=144°了。可是知道这个又有什么用呢？", next: "602"},
  "602": {type: "choice", passage: "可别忘了", content: [
    {text: "BD是∠ABC的角平分线", next: "801", disabled: false},
    {text: "AB=AC", next: "901", disabled: true},
    {text: "sorry 我再想想……", next: "203", penalty: 1, disabled: false}
  ]},
  "701": null,
  "801": {type: "agent", content: "BD是角平分线，所以∠ABD=1/2∠ABC，∠DBC=1/2∠ABC，可我还是不明白这与∠ABC+∠C=144°有什么关联", next: "802"},
  "802": {type: "choice", passage: "关联就是", content: [
    {text: "AB=AC", next: "1001", disabled: false},
    {text: "我也不知道哪里有关联", next: "602", penalty: 2, feedback: "1", disabled: false}
  ]},
  "901": null,
  "1001": {type: "agent", content: "哦对对，AB=AC，等边对等角，所以∠ABC=∠C，刚刚已经知道这两个角相加是144°了，所以这两个角各72°。那然后呢？", next: "1002"},
  "1002": {type: "choice", passage: "", content: [
    {text: "既然∠ABC=72°了……", next: "1101", disabled: false},
    {text: "既然∠C=72°了……", next: "1201", disabled: true},
    {text: "然后我也不知道了……", next: "1301", penalty: 2, feedback: "3", disabled: true}
  ]},
  "1101": {type: "agent", content: "∠ABC=72°……哦，这还有BD平分∠ABC呢，所以∠ABD=∠DBC=36°了", next: "1102"},
  "1102": {type: "choice", passage: "所以", content: [
    {text: "∠A=∠ABD", next: "1401", disabled: false},
    {text: "∠A=∠BDC", next: "1501", disabled: true},
    {text: "∠C=2∠ABD", next: "1601", disabled: true},
    {text: "∠C=2∠BDC", next: "1701", disabled: true},
    {text: "sorry 我再想想", next: "1002", penalty: 1, disabled: false}
  ]},
  "1201": null,
  "1301": null,
  "1401": {type: "agent", content: "嗯，这个我也知道啦，然后呢？", next: "1402"},
  "1402": {type: "choice", passage: "然后", content: [
    {text: "还有然后嘛？", next: "1801", disabled: false},
    {text: "就证明完了呀", next: "1801", disabled: false},
    {text: "sorry 我再想想", next: "1102", penalty: 1, feedback: "4", disabled: false}
  ]},
  "1501": null,
  "1601": null,
  "1701": null,
  "1801": {type: "agent", content: "这怎么讲？", next: "1802"},
  "1802": {type: "choice", passage: "你考虑一下", content: [
    {text: "AB和AC的关系", next: "1901", disabled: false},
    {text: "AB和AD的关系", next: "2001", disabled: false},
    {text: "AD和DC的关系", next: "2101", disabled: false},
    {text: "AD和DB的关系", next: "2201", disabled: false},
    {text: "sorry 我再想想", next: "1402", penalty: 1, feedback: "4", disabled: false}
  ]},
  "1901": {type: "agent", content: "AB=AC呀，这个是已知条件", next: "1802", penalty: 2},
  "2001": {type: "agent", content: "看不出来AB和AD有什么关系呀……", next: "1802", penalty: 2},
  "2101": {type: "agent", content: "看不出来AD和DC有什么关系呀……", next: "1802", penalty: 2},
  "2201": {type: "agent", content: "对对，等角对等边，所以AD=DB了，这样只要能证明DB=BC就好了", next: "2202"},
  "2202": {type: "choice", passage: "要证明DB=BC，只需要通过", content: [
    {text: "BD是角ABC的角平分线", naxt: "2301", disabled: false},
    {text: "∠ABC=∠C", next: "2401", disabled: false},
    {text: "三角形的内角和是180°", next: "2501", disabled: false},
    {text: "三角形的外角等于不相邻两内角的和", next: "2601", disabled: false}
  ]}
}


ui.contentView.background = '#eee';
ui.statusBar.background = '#000';

var stars = 8;

var navbar = new Composite({elevation:2, bottom: 0, centerX: 0, width: 420, height: 45, background: "#fff"})
  .append(new TextView({id: "trustScale", text: "信任度：", font: "18px", left: 16, centerY: 0}))
  .append(new TextView({id: "trustStars", text: "★★★★★★★★", font: "18px", left: "#trustScale 5", centerY: 0, textColor: "#00ff00"}))
  // .append(new Button({text: "题目", right: 16, centerY: 0}).on("select", insertImageAgain))
  .appendTo(ui.contentView);

var sv = new ScrollView({
  left:0, right: 0, top: 100, bottom: 45
}).appendTo(ui.contentView);

function loop(kid) {
  var entity = logic[kid];
  if (entity.type === "agent") {
    sv.append(createTextView(entity.content, "left"));
    var inter = setInterval(function(){
      skipNext(entity);
      window.clearInterval(inter);
    }, 500);
    return 0;
  }
  else if (entity.type === "choice") {
    sv.append(createChooseBox(entity));
    return 0;
  }
  else if (entity.type === "item") {
    ui.contentView.append(createImageView("fit"));
    var inter = setInterval(function(){
      skipNext(entity);
      window.clearInterval(inter);
    }, 500);
    return 0;
  }
  return 0;
}

function skipNext(entity) {
  stateIndex = entity.next;
  return loop(stateIndex);
}

function createTextView(text, position) {
  var s = new ScrollView({top: 'prev() 12', elevation: 2,
  background: "#fff",class: 'talkingdata'});

  var txt = new TextView({
    text: text,
    font: "20px",
    width: 350,
    lineSpacing: 1,
    markupEnabled: true,
  })
  if (position === "left") {
    s.left = 16;
    s.background = "#3CA553";
    txt.textColor = "#fff";
  }
  else {
    s.right = 16;
  }
  s.append(txt);
  return s;
}

function createChooseBox(entity) {
  var c = new Composite({id: "checkbox", elevation:5, top: 'prev() 16', centerX: 0, width: 400, background: "#fff"})
    .append(
      new TextView({
        id: "passage",
        text: entity.passage,
        background: "#fff",
        width: 400,
        height: 50,
        font: "20px",
        lineSpacing: 1.5,
        markupEnabled: true,
        alignment: "center"}));
  for (var i=0;i<entity.content.length;i++){
    var t = new Button({id: "option" + i, "text": entity.content[i].text, top: 'prev()', background: "#f2f2f2", width: 400, height: 65, font: "20px", alignment: "left"})
      .on("select", makeChoice, {index: i});
    if (entity.content[i].disabled) {
      t.enabled = false;
    }
    c.append(t);
  }
  return c;
}

function createImageView(scaleMode) {
  var t = new ImageView({
    image: 'https://i.imgur.com/i476a6Q.png',
    background: '#eee',
    scaleMode: scaleMode,
    top: 16, centerX: 0, width: 400, height: 100
  });
  return t;
}

function insertImageAgain() {
  var cb = sv.children().first("#checkbox");
  var t = createImageView("fit");
  if (cb.visible) {
    t.bottom = "#checkbox 16";
    t.top = "-1";
    t.appendTo(sv);
  }
  var inter = setInterval(function(){
    t.dispose();
    window.clearInterval(inter);
  }, 5000);
}

function makeChoice() {
  var i = this.index;
  var entity = logic[stateIndex].content[i]

  logic[stateIndex].content[i].disabled = true;
  sv.children().first("#checkbox").dispose();
  sv.append(createTextView(logic[stateIndex].passage + entity.text, "right"));
  if (entity.penalty) {
    navbar.children().first("#trustStars").text = navbar.children().first("#trustStars").text.slice(entity.penalty);
    if (navbar.children().first("#trustStars") < 5) {
      navbar.children().first("#trustStars").textColor = "#FFA500";
    }
    else if (navbar.children().first("#trustStars") < 3) {
      navbar.children().first("#trustStars").textColor = "#FF0000";
    }
  }
  var inter = setInterval(function(){
    console.log(stateIndex);
    stateIndex = logic[stateIndex].content[i].next;
    loop(stateIndex);
    window.clearInterval(inter);
  }, 1000);
}

var stateIndex = "1"

loop(stateIndex);
