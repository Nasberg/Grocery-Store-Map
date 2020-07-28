let secs = {
  "sec0": {
    "title": "Frukt & Grönt",
    "loca": 1,
    "desc": [
    {
      "title": "Lök",
      "price": 5.99,
      "logo": "../bilder/lok.jpg"
    },
    {
      "title": "Paprika",
      "price": 8.99,
      "logo": "../bilder/paprika.jpg"
    },
    {
      "title": "Sallad",
      "price": 9.99,
      "logo": "../bilder/sallad.jpg"
    },
    {
      "title": "Gurka",
      "price": 6.99,
      "logo": "../bilder/gurka.jpg"
    },
    {
      "title": "Tomat",
      "price": 7.99,
      "logo": "../bilder/tomat.jpg"
    }
    ]
  },
  "sec1": {
    "title": "Torrvaror",
    "loca": 2,
    "desc": [
      {
        "title": "Havregryn",
        "price": 19.99,
        "logo": "../bilder/havregryn.jpg"
      },
      {
        "title": "Ris",
        "price": 21.99,
        "logo": "../bilder/ris.jpeg"
      },
      {
        "title": "Pasta",
        "price": 23.99,
        "logo": "../bilder/pasta.jpg"
      }
    ]
  },
  "sec2": {
    "title": "Läsk",
    "loca": 3,
    "desc": [
      {
        "title": "Coca Cola",
        "price": 18.99,
        "logo": "../bilder/cocacola.png"
      },
      {
        "title": "Coca Cola Light",
        "price": 18.99,
        "logo": "../bilder/cocacolalight.png"
      },
      {
        "title": "Coca Cola Zero",
        "price": 18.99,
        "logo": "../bilder/cocacolazero.png"
      },
      {
        "title": "Fanta Orange",
        "price": 18.99
      },
      {
        "title": "Fanta Lemon",
        "price": 18.99
      },
      {
        "title": "Fanta Exotic",
        "price": 18.99
      },
      {
        "title": "Fanta Orange Zero",
        "price": 18.99
      },
      {
        "title": "Sprite",
        "price": 18.99
      },
      {
        "title": "Sprite Zero",
        "price": 18.99
      },
      {
        "title": "Pepsi",
        "price": 16.99
      }
    ]
  }
};

let listCo = {};

let listnum = 0;

function newList() {
  let person = prompt("LÄGG TILL LISTA", "Lista " + (listnum + 1));
  while (person == "") {
    alert("Skriv in ett namn");
    let personerr = prompt("LÄGG TILL LISTA", "Namn");
    person = personerr;
  }
  if (person != null) {
    let listhub = document.querySelector("#listhub");

    let newdiv = document.createElement("div");

    newdiv.setAttribute("class", "listdivs");
    newdiv.setAttribute("id", "ld" + listnum);

    let newtitle = document.createElement("div");

    newtitle.setAttribute("class", "listt");
    newtitle.setAttribute("id", "ti" + listnum);
    newtitle.textContent = person;

    let bytdiv = document.createElement("div");
    let bytbtn = document.createElement("button");

    bytdiv.setAttribute("class", "bytdiv");
    bytbtn.setAttribute("class", "bytbtn");
    bytbtn.setAttribute("id", "bytbtn" + listnum)
    bytbtn.setAttribute("onclick", "changeName(" + listnum + ")");
    bytbtn.textContent = "Byt namn";
    bytdiv.appendChild(bytbtn);

    let newadd = document.createElement("div");
    let addbtn = document.createElement("button");

    newadd.setAttribute("class", "newadd");
    addbtn.setAttribute("class", "addbtn");
    addbtn.setAttribute("id", "addbtn" + listnum);
    addbtn.setAttribute("onclick", "addVara(" + listnum + ")");
    addbtn.textContent = "Lägg till vara";
    newadd.appendChild(addbtn);

    let newx = document.createElement("div");
    let xbtn = document.createElement("button");

    newx.setAttribute("class", "listx");
    xbtn.setAttribute("class", "listbtn");
    xbtn.setAttribute("onclick", "delList(" + listnum + ")");
    xbtn.textContent = "X";
    newx.appendChild(xbtn);

    newdiv.appendChild(newtitle);
    newdiv.appendChild(bytdiv);
    newdiv.appendChild(newadd);
    newdiv.appendChild(newx);
    listhub.appendChild(newdiv);

    let titleinput = document.querySelector("#ti" + listnum);

    listCo[listnum] = {};
    listCo[listnum].title = titleinput.textContent;
    listCo[listnum].items = {};

    listnum++;
  }
}

function changeName(num) {
  let ti = document.querySelector("#ti" + num);
  let person = prompt("BYT NAMN", ti.textContent);
  while (person == "") {
    alert("Skriv in ett namn");
    let personerr = prompt("BYT NAMN", ti.textContent);
    person = personerr;
  }
  if (person != null) {
    ti.textContent = person;
  }
}

function delList(num) {
  let wait = confirm("Är du säker att du vill ta bort listan?");
  if (wait) {
    let list = document.querySelector("#ld" + num);
    list.remove();

    delete listCo[num];
  }
}

function addVara(varanum) {
  let searchul = document.querySelector("#searchul");

  while (searchul.firstChild) {
    searchul.removeChild(searchul.firstChild);
  }

  let varahub = document.querySelector("#varahub");

  let varatitle = document.querySelector("#varatitle");
  let ti = document.querySelector("#ti" + varanum);

  varatitle.textContent = ti.textContent;

  let searchinput = document.querySelector("#searchinput");

  searchinput.value = "";
  searchinput.setAttribute("onkeyup", "searchVara(" + varanum + ")");
  searchinput.setAttribute("onclick", "searchVara(" + varanum + ")");

  totvaraprice(varanum);

  varahub.style.display = "grid";
}

function hideVara() {
  let varahub = document.querySelector("#varahub");
  let varalisthub = document.querySelector("#varalisthub");

  while (varalisthub.firstChild) {
    varalisthub.removeChild(varalisthub.firstChild);
  }

  varahub.style.display = "none";
}

function searchVara(searchnum) {
  let searchinput = document.querySelector("#searchinput").value;
  let filter = searchinput.toUpperCase();
  let searchul = document.querySelector("#searchul");
  while (searchul.firstChild) {
    searchul.removeChild(searchul.firstChild);
  }

  let c = 0;
  for (let i1 = 0; i1 < Object.keys(secs).length; i1++) {
    for (let i2 = 0; i2 < secs["sec" + i1].desc.length; i2++) {
      let cho = secs["sec" + i1];
      let chodesc = cho.desc[i2];
      let choup = chodesc.title.toUpperCase();
      if (choup.includes(filter)) {
        if (filter != "") {
          let newli = document.createElement("li");
          let newbtn = document.createElement("button");
          for (let i = 0; i < 3; i++) {
            let newp = document.createElement("p");
            if (i == 0) {
              newp.setAttribute("class", "st");
              newp.textContent = chodesc.title;
            }
            else if (i == 1) {
              newp.setAttribute("class", "slo");
              newp.textContent = "Hylla " + cho.loca;
            }
            else {
              newp.setAttribute("class", "sp");
              newp.textContent = chodesc.price + " kr";
            }
            newbtn.appendChild(newp);
          }

          let newimg = document.createElement("img");
          newimg.setAttribute("class", "spic");
          newimg.src = chodesc.logo;
          newbtn.appendChild(newimg);

          newbtn.style.color = "black";
          newbtn.addEventListener("mouseover", function() {
            newbtn.style.backgroundColor = "black";
            newbtn.style.color = "white";
          });
          if (c % 2 != 0) {
            newbtn.style.backgroundColor = "white";
            newbtn.addEventListener("mouseout", function() {
              newbtn.style.backgroundColor = "white";
              newbtn.style.color = "black";
            });
          }
          else {
            newbtn.style.backgroundColor = "cyan";
            newbtn.addEventListener("mouseout", function() {
              newbtn.style.backgroundColor = "cyan";
              newbtn.style.color = "black";
            });
          }

          newbtn.setAttribute("onclick", "addToList(" + searchnum + "," + i1 + "," + i2 + ")");

          newli.appendChild(newbtn);
          searchul.appendChild(newli);
          c++;
        }
      }
    }
  }
  if (c == 0 && filter != "") {
    let newli = document.createElement("li");
    let newbtn = document.createElement("button");
    let newp = document.createElement("p");
    newp.setAttribute("class", "st");
    newp.textContent = "Inga sökresultat hittades";
    newbtn.appendChild(newp);
    newbtn.style.color = "black";
    newbtn.style.backgroundColor = "cyan";
    newli.appendChild(newbtn);
    searchul.appendChild(newli);
  }
}

let addc = 0;

function addToList(addnum, section, vara) {
  let selvara = secs["sec" + section].desc[vara];

  let searchul = document.querySelector("#searchul");

  while (searchul.firstChild) {
    searchul.removeChild(searchul.firstChild);
  }

  let varalisthub = document.querySelector("#varalisthub");

  let newdiv = document.createElement("div");

  newdiv.setAttribute("class", "addtodiv");
  newdiv.setAttribute("id", "atd" + addc);

  let titlediv = document.createElement("div");
  let title = document. createElement("p");

  titlediv.setAttribute("class", "titlediv");
  title.setAttribute("class", "vt");
  title.textContent = selvara.title;
  titlediv.appendChild(title);

  let addtox = document.createElement("div");
  let xbtn = document.createElement("button");

  addtox.setAttribute("class", "addtox");
  addtox.setAttribute("onclick", "delAddto(" + addnum + "," + addc + ")");
  xbtn.textContent = "X";
  addtox.appendChild(xbtn);

  let imgdiv = document.createElement("div");
  let addtoimg = document.createElement("img");

  imgdiv.setAttribute("class", "imgdiv");
  addtoimg.setAttribute("class", "addtoimg");
  addtoimg.setAttribute("src", selvara.logo);
  imgdiv.appendChild(addtoimg);

  let addtoprice = document.createElement("div");

  addtoprice.setAttribute("class", "addtoprice");
  addtoprice.textContent = selvara.price + " kr";

  let inputdiv = document.createElement("div");
  let addtoinput = document.createElement("input");

  inputdiv.setAttribute("class", "addtoinputdiv");
  addtoinput.setAttribute("class", "addtoinput");
  addtoinput.setAttribute("id", "ati" + addc);
  addtoinput.setAttribute("type", "number");
  addtoinput.setAttribute("min", "1");
  addtoinput.setAttribute("value", "1");
  addtoinput.setAttribute("onclick", 'updatePrice(' + section + ',' + vara + ',' + addnum + ',' + addc + ')');
  addtoinput.setAttribute("onkeyup", 'updatePrice(' + section + ',' + vara + ',' + addnum + ',' + addc + ')');

  inputdiv.appendChild(addtoinput);

  let addtototprice = document.createElement("div");

  addtototprice.setAttribute("class", "addtototprice");
  addtototprice.setAttribute("id", "tp" + addc);
  addtototprice.textContent = "SUMMA: " + selvara.price + " kr";

  newdiv.appendChild(titlediv);
  newdiv.appendChild(imgdiv);
  newdiv.appendChild(addtoprice);
  newdiv.appendChild(inputdiv);
  newdiv.appendChild(addtototprice);
  newdiv.appendChild(addtox);
  varalisthub.appendChild(newdiv);

  listCo[addnum].items[addc] = {};
  listCo[addnum].items[addc].title = selvara.title;
  listCo[addnum].items[addc].amount = 1;
  listCo[addnum].items[addc].price = selvara.price;

  let searchinput = document.querySelector("#searchinput");

  searchinput.value = "";

  let addbtn = document.querySelector("#addbtn" + addnum);

  addbtn.setAttribute("onclick", "showAllVara(" + addnum + ")");

  totvaraprice(addnum);

  addc++;
}

function updatePrice(secnum, secvaranum, listnum, varanum) {
  let ati = document.querySelector("#ati" + varanum);
  let totprice = document.querySelector("#tp" + varanum);

  let selvara = secs["sec" + secnum].desc[secvaranum];

  totprice.textContent = "SUMMA: " + Math.floor(selvara.price * ati.value * 100) / 100 + " kr";

  listCo[listnum].items[varanum].amount = parseInt(ati.value);

  totvaraprice(listnum);
}

function totvaraprice(tvpnum) {
  let totprice = document.querySelector("#totvaraprice");
  let listentries = Object.entries(listCo[tvpnum].items);
  let sum = 0;

  for (e of listentries) {
    if (!(isNaN(e[1].amount))) {
      sum += Math.floor(e[1].price * e[1].amount * 100) / 100;
    }
  }

  totprice.textContent = "TOTALT: " + Math.floor(sum * 100) / 100 + " kr";
}

function showAllVara(shownum) {
  let listentries = Object.entries(listCo[shownum].items);

  if (listentries.length == 0) {
    addVara(shownum);
  }
  else {
    for (let i = 0; i < listentries.length; i++) {
      for (let i1 = 0; i1 < Object.keys(secs).length; i1++) {
        for (let i2 = 0; i2 < secs["sec" + i1].desc.length; i2++) {
          let cho = secs["sec" + i1];
          let chodesc = cho.desc[i2];
          if (chodesc.title == listentries[i][1].title) {
            let varalisthub = document.querySelector("#varalisthub");

            let newdiv = document.createElement("div");

            newdiv.setAttribute("class", "addtodiv");
            newdiv.setAttribute("id", "atd" + listentries[i][0]);

            let titlediv = document.createElement("div");
            let title = document. createElement("p");

            titlediv.setAttribute("class", "titlediv");
            title.setAttribute("class", "vt");
            title.textContent = chodesc.title;
            titlediv.appendChild(title);

            let addtox = document.createElement("div");
            let xbtn = document.createElement("button");

            addtox.setAttribute("class", "addtox");
            addtox.setAttribute("onclick", "delAddto(" + shownum + "," + listentries[i][0] + ")");
            xbtn.textContent = "X";
            addtox.appendChild(xbtn);

            let imgdiv = document.createElement("div");
            let addtoimg = document.createElement("img");

            imgdiv.setAttribute("class", "imgdiv");
            addtoimg.setAttribute("class", "addtoimg");
            addtoimg.setAttribute("src", chodesc.logo);
            imgdiv.appendChild(addtoimg);

            let addtoprice = document.createElement("div");

            addtoprice.setAttribute("class", "addtoprice");
            addtoprice.textContent = chodesc.price + " kr";

            let inputdiv = document.createElement("div");
            let addtoinput = document.createElement("input");

            inputdiv.setAttribute("class", "addtoinputdiv");
            addtoinput.setAttribute("class", "addtoinput");
            addtoinput.setAttribute("id", "ati" + listentries[i][0]);
            addtoinput.setAttribute("type", "number");
            addtoinput.setAttribute("min", "1");
            addtoinput.setAttribute("value", listentries[i][1].amount);
            addtoinput.setAttribute("onclick", 'updatePrice(' + i1 + ',' + i2 + ',' + shownum + ',' + listentries[i][0] + ')');
            addtoinput.setAttribute("onkeyup", 'updatePrice(' + i1 + ',' + i2 + ',' + shownum + ',' + listentries[i][0] + ')');

            inputdiv.appendChild(addtoinput);

            let addtototprice = document.createElement("div");

            addtototprice.setAttribute("class", "addtototprice");
            addtototprice.setAttribute("id", "tp" + listentries[i][0]);
            addtototprice.textContent = "SUMMA: " + Math.floor(chodesc.price * listentries[i][1].amount * 100) / 100 + " kr";

            newdiv.appendChild(titlediv);
            newdiv.appendChild(imgdiv);
            newdiv.appendChild(addtoprice);
            newdiv.appendChild(inputdiv);
            newdiv.appendChild(addtototprice);
            newdiv.appendChild(addtox);
            varalisthub.appendChild(newdiv);

            let varahub = document.querySelector("#varahub");

            let varatitle = document.querySelector("#varatitle");
            let ti = document.querySelector("#ti" + shownum);

            varatitle.textContent = ti.textContent;

            let searchinput = document.querySelector("#searchinput");

            searchinput.value = "";
            searchinput.setAttribute("onkeyup", "searchVara(" + shownum + ")");
            searchinput.setAttribute("onclick", "searchVara(" + shownum + ")");

            totvaraprice(shownum);

            varahub.style.display = "grid";
          }
        }
      }
    }
  }
}

function delAddto(listnum, atnum) {
  let wait = confirm("Är du säker att du vill ta bort varan?");
  if (wait) {
    let list = document.querySelector("#atd" + atnum);
    list.remove();

    delete listCo[listnum].items[atnum];

    totvaraprice(listnum);
  }
}
