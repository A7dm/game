(function () {
 let gold =50
let health = 100
let xp = 0
let inv=["عصا خشبية"]
let cweapon =0
let fight;
let monsterHealth=0;
let monster = document.querySelector("#monsters")
let cave = document.querySelector('.cave')
let sdodge = 0;

let button1= document.querySelector('#button1')
let button2= document.querySelector('#button2')
let button3= document.querySelector('#button3')


let monsterHealthText=document.querySelector("#monsterhealthtext");
let monsterName =document.querySelector("#monsterName");


let goldText = document.querySelector('#goldText')
let healthText = document.querySelector('#healthText');
let xpText = document.querySelector('#xpText');

let text=document.querySelector("#text");


//الاسلحة
const weapons = [{
  name:"عصا خشبية", power:5} ,
{name:"مضرب",power:30},
{name:"سكين",power:50},
{name:"سيف",power:100}];

const monsters = [{
  name:"سلايم",
  level:2,
  health:15
},{
  name:"مستذئب",
  level:8,
  health:60
},{
  name:"التنين",
  level:20,
  health:300
}
]





//الاماكن
const locations = [{
  name:"store",
  buttonText:["شراء  10 من الصحة (مقابل 10 ذهب)"," شراء سلاح (مقابل 30 ذهب)","العودة الى المدينة"],
  buttonFunction:[buyHealth,buyWeapon,goTown],
  text:text.innerText="لقد دخلت الى المتجر هل تود شراء شئ ام النظر فحسب ثم العودة الى المدينة" ,
  url:"img/store.png"
},{
  name:"town",
  buttonText:["أذهب الى المتجر","ادخل الكهف","قاتل التنين"],
  buttonFunction:[goToStore,goToCave,fightDragon],
  text:text.innerHTML="انت الان في المدينة ماذا تحب ان تفعل",
   url:"img/town.jpg"
},{
  name:"cave",
  buttonText:["قاتل السلايم","قاتل المستذئب","عد الى المدينة"],
  buttonFunction:[fightSlime,fightWolf,goTown],
  text:text.innerHTML="لقد دخلت الكهف ورآيت اكثر من وحش امامك هل ستحاول هزيمة أحدهم ام ستهرب من الكهف",
  url:"img/cave.jpg"
},{
  name:"fight",
  buttonText:["هاجم","تفادي","اهرب"],
  buttonFunction:[attck,dodge,goTown],
  text:text.innerHTML="انت تواجه وحشا"
},{
  name:"killmonster",
  buttonText:["عد الى المدينة","عد الي المدينة","عد الى المدينة"],
  buttonFunction:[goTown,goTown,goTown],
  text:text.innerHTML="لقد مات الوحش وكسبت بعض من الخبزة ووجدت بعض الذهب"
},{
  name:"youlose",
  buttonText:["إعادة","إعادة","إعادة"],
    buttonFunction:[goTown,goTown,goTown],
    text:text.innerHTML="لقد مت وفشلت في مهمتك"
},{
  name:"youwin",
 buttonText:["إعادة","إعادة","إعادة"],
  buttonFunction:[goTown,goTown,goTown],
  text:text.innerHTML="لقد انجزت مهمتك بنجاح والان يمكنك مغادرة المدينة مرتاح البال"
},{
}
];




function start (location) {
  monster.style.display='none'
  button1.innerText=location.buttonText[0]
  button2.innerText=location.buttonText[1]
  button3.innerText=location.buttonText[2]

  button1.onclick=location.buttonFunction[0]
  button2.onclick=location.buttonFunction[1]
  button3.onclick=location.buttonFunction[2];
  cave.style["backgroundImage"] = `url('${location.url}')`;


  text.innerHTML=location.text
};


function goToStore () {
  start(locations[0]);
}

function goTown(){
  text.style.color='white';
  start(locations[1])
}

function goToCave () {
start(locations[2])
}


// المتجر
function buyHealth () {
  if (gold >= 10) {
    gold-= 10
    health += 10
    goldText.innerHTML=gold
    healthText.innerHTML=health
  } else (text.innerHTML="ليس لديك عدد كافي من الذهب")
}

function buyWeapon (){
  if(cweapon < weapons.length-1) {
if (gold >= 30) {
  cweapon += 1 
  let newWeapon = weapons[cweapon].name
  inv.push(newWeapon)
  gold-= 30
  goldText.innerHTML = gold
  text.innerHTML=`لقد اشتريت ${newWeapon} , لديك الان ${inv}`
}else {(text.innerHTML="ليس لديك عدد كافي من الذهب")}
} else {
text.innerHTML="لديك اقوى سلاح بالفعل"
button2.innerHTML="بيع سلاح (مقابل 15 ذهب)"
button2.onclick=sellWeapon;
}}

function sellWeapon () {
  if (inv.length >1) {
    gold+= 15
    goldText.innerHTML=gold;
    let sell =inv.shift()
    text.innerHTML=`لقد بعت ${sell}, تبقى لديك ${inv}`
  } else {text.innerHTML="لم يتبقى لديك إلا سلاح واحد ام تحب القتال بيدك؟"}
}





// المتعلقة بالقتال
function fights (level){
  start(locations[3])
monster.style.display='block'
monsterName.innerHTML=monsters[level].name
monsterHealth = monsters[level].health
monsterHealthText.innerHTML=monsterHealth


}

function fightSlime () {
  fight =0
  fights(fight);
  cave.style["backgroundImage"] = `url('img/cave.jpg')`
}

function fightWolf(){
  fight=1
  fights(fight)
}
function fightDragon () {
fight=2
  fights(fight)
  cave.style["backgroundImage"] = `url('img/dragon.png')`
}

function attck(){
text.innerHTML="الوحش يهاجم وانت تهاجم",
monsterHealth-= Math.floor(Math.random()*xp)+1 +weapons[cweapon].power + sdodge
monsterHealthText.innerHTML=monsterHealth
health -= monsters[fight].level
healthText.innerHTML=health
sdodge =0
text.style.color='white';
if( health<=0){
youLose();
}else if(monsterHealth<=0){
  killMonster();
} 
}

function dodge () {
if(fight === 0){
  if(xp===0) {
    if(randomNumber () <= 1){
      text.innerHTML="لقد فشلت في التفادي"
      health-=2
      healthText.innerHTML=health;
      sdodge = 0;
      text.style.color='red';
      if(health <=0){
        youLose();
      }


    } else {
      text.innerHTML="لقد نجحت في التفادي ضربتك القادمة سوف تكون اقوى"
      text.style.color='green';
       sdodge = 2;
    }
  } else if (xp <= 4) {
    if(randomNumber () === 0){
      text.innerHTML="لقد فشلت في التفادي"
      health-=2
      healthText.innerHTML=health;
      sdodge =0
       text.style.color='red';

       if(health <=0){
        youLose();
      }
    } else {
      text.innerHTML="لقد نجحت في التفادي ضربتك القادمة سوف تكون اقوى"
      text.style.color='green';
       sdodge = 2;
    }
  } else {text.innerHTML="لقد نجحت في التفادي ضربتك القادمة سوف تكون اقوى"
    text.style.color='green';
       sdodge = 2;}



} else if (fight===1){
if (xp <= 4){
  if(randomNumber() >=4) {
     text.innerHTML="لقد فشلت في التفادي"
      health-=10
      healthText.innerHTML=health;
      sdodge =0
       text.style.color='red';
       if(health <=0){
        youLose();
      }
  } else {text.innerHTML="لقد نجحت في التفادي ضربتك القادمة سوف تكون اقوى"
    text.style.color='green';
       sdodge = 8;}
} else if (xp >= 5 && xp<= 8) {
  if(randomNumber() < 3){
    text.innerHTML="لقد فشلت في التفادي"
      health-=10
      healthText.innerHTML=health;
      sdodge =0
       text.style.color='red';
       if(health <=0){
        youLose();
      }
  } else {text.innerHTML="لقد نجحت في التفادي ضربتك القادمة سوف تكون اقوى"
    text.style.color='green';
       sdodge = 6}
} else if (xp > 8) {
  if(randomNumber() ===0) {
    text.innerHTML="لقد فشلت في التفادي"
      health-=10
      healthText.innerHTML=health;
      sdodge =0
       text.style.color='red';
       if(health <=0){
        youLose();
      }
  } else {text.innerHTML="لقد نجحت في التفادي ضربتك القادمة سوف تكون اقوى"
    text.style.color='green';
       sdodge = 6}
}


} else if (fight===2) {
  if (xp <=20){
     text.innerHTML="لقد فشلت في التفادي"
      health-=10
      healthText.innerHTML=health;
      sdodge =0
       text.style.color='red';
       if(health <=0){
        youLose();}
  } else if (xp > 20 && xp <= 28) {
    if(randomNumber() >= 4) {
       text.innerHTML="لقد فشلت في التفادي"
      health-=10
      healthText.innerHTML=health;
      sdodge =0
       text.style.color='red';
       if(health <=0){
        youLose();}
    } else {text.innerHTML="لقد نجحت في التفادي ضربتك القادمة سوف تكون اقوى"
      text.style.color='green';
       sdodge = 10}
  } else if (xp > 28) {
    if(randomNumber() <=2) {
       text.innerHTML="لقد فشلت في التفادي"
      health-=10
      healthText.innerHTML=health;
      sdodge =0
       text.style.color='red';
       if(health <=0){
        youLose();}
  } else {text.innerHTML="لقد نجحت في التفادي ضربتك القادمة سوف تكون اقوى"
     text.style.color='green';
       sdodge = 8}

} }





//text.innerHTML=`لقد تفاديت الهجوم من ${monsters[fight].name}`
}
function killMonster (){
  if(fight<2){
  gold+= Math.floor(monsters[fight].level*6.7);
 goldText.innerHTML=gold;
xp += monsters[fight].level;
xpText.innerHTML=xp
  start(locations[4]);} else {
    youWin();
  }
}

function youLose () {
  gold = 50
  health=100
  xp=0
  xpText.innerHTML=xp
  healthText.innerHTML=health
  goldText.innerHTML=gold

  start(locations[5])
  cave.style["backgroundImage"] = `url('img/lose.jpg')`
}

function youWin () {
  gold = 50
  health=100
  xp=0
  xpText.innerHTML=xp
  healthText.innerHTML=health
  goldText.innerHTML=gold
  start(locations[6])
}





button1.onclick=goToStore;
button2.onclick=goToCave;
button3.onclick=fightDragon;
text.innerHTML="اهلا بك في لقد وصلت الان الى القرية ولديك مهمة واحدة وهي قتل التنين ٫ فهل تريد البدء بها فورا ام تريد فعل شئ اخر اولا"
cave.style["backgroundImage"] = `url('img/town.jpg')`




function randomNumber () {
  let randomNum = Math.floor(Math.random()*10)
  return randomNum
}


let randomNum = randomNumber();

})();



