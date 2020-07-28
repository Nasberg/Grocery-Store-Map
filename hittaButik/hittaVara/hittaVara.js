let secs = {
  "sec0": {
    "title": "Frukt & Grönt",
    "loca": 1,
    "desc": [
    {
      "title": "Lök",
      "price": 5.99,
      "logo": "../../bilder/lok.jpg"
    },
    {
      "title": "Paprika",
      "price": 8.99,
      "logo": "../../bilder/paprika.jpg"
    },
    {
      "title": "Sallad",
      "price": 9.99,
      "logo": "../../bilder/sallad.jpg"
    },
    {
      "title": "Gurka",
      "price": 6.99,
      "logo": "../../bilder/gurka.jpg"
    },
    {
      "title": "Tomat",
      "price": 7.99,
      "logo": "../../bilder/tomat.jpg"
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
        "logo": "../../bilder/havregryn.jpg"
      },
      {
        "title": "Ris",
        "price": 21.99,
        "logo": "../../bilder/ris.jpeg"
      },
      {
        "title": "Pasta",
        "price": 23.99,
        "logo": "../../bilder/pasta.jpg"
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
        "logo": "../../bilder/cocacola.png"
      },
      {
        "title": "Coca Cola Light",
        "price": 18.99,
        "logo": "../../bilder/cocacolalight.png"
      },
      {
        "title": "Coca Cola Zero",
        "price": 18.99,
        "logo": "../../bilder/cocacolazero.png"
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

function chooseSec(num) {
  let secul = document.querySelector("#secul");
  let sec = "sec" + num;
  let ulx = document.querySelector("#ulx");
  while (secul.firstChild) {
    secul.removeChild(secul.firstChild);
  }
  secul.textContent = secs[sec].title;
  secul.style.backgroundColor = "white";
  secul.style.color = "black";
  ulx.style.display = "block";

  let secdesc = secs[sec].desc;
  for (let e = 0; e < secdesc.length; e++) {
    let newli = document.createElement("li");
    let newbtn = document.createElement("button");
    for (let i = 0; i < 3; i++) {
      let newp = document.createElement("p");
      if (i == 0) {
        newp.setAttribute("class", "st");
        newp.textContent = secdesc[e].title;
      }
      else if (i == 1) {
        newp.setAttribute("class", "slo");
        newp.textContent = "Hylla " + secs[sec].loca;
      }
      else {
        newp.setAttribute("class", "sp");
        newp.textContent = secdesc[e].price + " kr";
      }
      newbtn.appendChild(newp);
    }

    let newimg = document.createElement("img");
    newimg.setAttribute("class", "spic");
    newimg.src = secdesc[e].logo;
    newbtn.appendChild(newimg);

    newbtn.style.color = "black";
    newbtn.addEventListener("mouseover", function() {
      newbtn.style.backgroundColor = "black";
      newbtn.style.color = "white";
    });
    if (e % 2 != 0) {
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

    newbtn.setAttribute("onclick", 'showSecbox(' + num + ', ' + e + ')');

    newli.appendChild(newbtn);
    secul.appendChild(newli);
  }
}

function showSecbox(secnum, descnum) {
  let box = document.querySelector("#secbox");
  let title = document.querySelector("#sectitle");
  let loca = document.querySelector("#secloca");
  let price = document.querySelector("#secprice");
  let totprice = document.querySelector("#totprice");
  let secpic = document.querySelector("#secpic");
  let sec = "sec" + secnum;

  title.textContent = secs[sec].desc[descnum].title;
  loca.textContent = "Hylla " + secs[sec].loca;
  price.textContent = secs[sec].desc[descnum].price + " kr";
  totprice.textContent = secs[sec].desc[descnum].price + " kr";
  secpic.src = secs[sec].desc[descnum].logo;
  box.style.display = "block";

  let numbox = document.querySelector("#numbox");
  numbox.value = 1;
  numbox.addEventListener("mouseup", updatePrice);
  numbox.addEventListener("keyup", updatePrice);

  let vara = document.querySelector("#vara");
  vara.value = "";
  hideUl();

  function updatePrice() {
    totprice.textContent = Math.round(secs[sec].desc[descnum].price * numbox.value * 100) / 100 + " kr";
  }
}

function hideSec() {
  let cho = document.querySelector("#secbox");
  cho.style.display = "none";
  document.querySelector("#totprice").textContent = "";
}

function hideUl() {
  let secul = document.querySelector("#secul");
  let ulx = document.querySelector("#ulx");
  while (secul.firstChild) {
    secul.removeChild(secul.firstChild);
  }

  secul.textContent = "";
  secul.style.backgroundColor = "black";
  ulx.style.display = "none";
}

function searchVara() {
  let vara = document.querySelector("#vara").value;
  let filter = vara.toUpperCase();
  let secul = document.querySelector("#secul");
  let ulx = document.querySelector("#ulx");
  while (secul.firstChild) {
    secul.removeChild(secul.firstChild);
  }

  secul.textContent = "SÖKRESULTAT";
  secul.style.backgroundColor = "white";
  secul.style.color = "black";
  ulx.style.display = "block";

  let c = 0;
  for (let i1 = 0; i1 < Object.keys(secs).length; i1++) {
    for (let i2 = 0; i2 < secs["sec" + i1].desc.length; i2++) {
      let cho = secs["sec" + i1];
      let chodesc = cho.desc[i2];
      let choup = chodesc.title.toUpperCase();
      if (choup.includes(filter)) {
        if (filter == "") {
          hideUl();
        }
        else {
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

          newbtn.setAttribute("onclick", 'showSecbox(' + i1 + ', ' + i2 + ')');

          newli.appendChild(newbtn);
          secul.appendChild(newli);
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
    secul.appendChild(newli);
  }
}
