//Run once DOM is ready for JavaScript to execute
$(document).ready(function(){
  generateGrid();
  labelGrid();

  compSetBoard();
});

//Generate the battleship board grid
function generateGrid() {
  var markup='';
  var letter='A';
  var number='1';
  for(i=0; i<10; i++) {
    markup += '<tr>'
    for(j=0; j<11; j++) {
      if(j==0){
        if(number == ':'){
          number='10';
          markup+= '<td id="' + number + '"class="square"></td>';
        }
        else{
          markup+= '<td id="' + j.toString() + number + '"class="square"></td>';
        }
      }
      else{
        markup += '<td id="' + letter + number + '" class="square"></td>';
        letter=incrementChar(letter);
      }
    }
    markup += '</tr>'
    //letter=incrementChar(letter);
    letter='A';
    number=incrementChar(number);
  }
  $('.battleship-grid').append(markup);
}

//Label the fixed portions of battleship grid
function labelGrid(){
  var letter='A';
  var number='1';
  for(i=0; i<10; i++){
    insertText('0' + letter, letter);

    if(i==9){
      insertText('10', '10');
    }
    else{
      insertText('0' + number, number);
    }
    letter=incrementChar(letter);
    number=incrementChar(number);
  }
}

//Increments the letter for the square ID (ex: A0, A1, B2, etc...)
function incrementChar(letter) {
  return String.fromCharCode(letter.charCodeAt(0) + 1)
}

//Set grid text based on square ID
function insertText(id, letter){
    document.getElementById(id).innerHTML=letter;
}

//Random number generator for computer ship placements & direction
function getRandomNumber(min, max){
  return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
}

//Random letter generator for computer ship placements
function getRandomLetter(){
  return randomLetter=('ABCDEFGHIJ').split('')[(Math.floor(Math.random() * 10 ))];
}

//Random location generator for computer ship placements
function getRandomLocation(){
  var letter=getRandomLetter();
  var number=getRandomNumber(1,10);
  var pos=letter + number;
  return pos;
}

//Random direction generator for possible computer ship placements
function getRandomDirection(letter, number){
  //Direction to place - 1 up, 2 right, 3 down, 4 left
  var dir=0;

  /* Checking if randomized location is on the border of the grid */
  //If in first row, ship cannot be placed up
  if(number===1){
    if(letter==='A'){
      //If also in column A, ship cannot be placed left
      dir=getRandomNumber(2,3);
    }
    else if(letter==='J'){
      //If also in column J, ship cannot be placed right
      dir=getRandomNumber(3,4);
    }
    else{
      dir=getRandomNumber(2,4);
    }
  }
  //If in column A, ship cannot be placed left
  else if(letter==='A'){
    //If also in last row, ship cannot be placed down
    if(number===10){
      dir=getRandomNumber(1,2);
    }
    else{
      dir=getRandomNumber(1,3);
    }
  }
  //If in column J, ship cannot be placed right
  else if(letter==='J'){
    //If also in last row, ship cannot be placed down
    if(number===10){
      dir=getRandomNumber(1,2);
      if(dir===2){
        dir=4;
      }
    }
    else{
      dir=getRandomNumber(1,3);
      if(dir===2){
        dir=4;
      }
    }
  }
  //If location is not on border, ship can be in any direction
  else{
    dir=getRandomNumber(1,4);
  }
  return dir;
}

//Place the ships according to ship type(size)
function setShip(size){
  var pos=getRandomLocation();
  var letterA='A';
  var letter=pos[0];
  var number=pos[1];
  var dir=getRandomDirection(letter, number);

  //Set ship based on orientation
  switch(dir){
    case 1:
        if(number<size){
          return false;
        }
        for(i=0; i<size; i++){
          if(document.getElementById(pos).getAttribute('data')==='occupied'){
            return false;
          }
          pos=letter + String.fromCharCode(pos.charCodeAt(1) - 1);
        }
        //5 Spaces can be occupied
        pos=letter + number;
        for(j=0; j<size; j++){
          document.getElementById(pos).setAttribute('data','occupied');
          document.getElementById(pos).innerHTML='X';
          pos=letter + String.fromCharCode(pos.charCodeAt(1) - 1);
        }
        break;
    case 2:
        if(letter>(String.fromCharCode(letterA.charCodeAt(0) + (size-1)))){
          return false;
        }
        for(i=0; i<size; i++){
          if(document.getElementById(pos).getAttribute('data')==='occupied'){
            return false;
          }
          pos=String.fromCharCode(pos.charCodeAt(0) + 1) + number;
        }
        //5 Spaces can be occupied
        pos=letter + number;
        console.log("Size: " + size);

        for(j=0; j<size; j++){
          document.getElementById(pos).setAttribute('data','occupied');
          document.getElementById(pos).innerHTML='X';
          pos=String.fromCharCode(pos.charCodeAt(0) + 1) + number;
          console.log("After: " + pos);

        }
        break;
    case 3:
        if(number>size){
          return false;
        }
        for(i=0; i<size; i++){
          if(document.getElementById(pos).getAttribute('data')==='occupied'){
            return false;
          }
          pos=letter + String.fromCharCode(pos.charCodeAt(1) + 1);

        }
        //5 Spaces can be occupied
        pos=letter + number;
        for(j=0; j<size; j++){
          document.getElementById(pos).setAttribute('data','occupied');
          document.getElementById(pos).innerHTML='X';
          pos=letter + String.fromCharCode(pos.charCodeAt(1) + 1);
        }
        break;
    case 4:
        if(letter<(String.fromCharCode(letterA.charCodeAt(0) + (size-1)))){
          return false;
        }
        for(i=0; i<size; i++){
          if(document.getElementById(pos).getAttribute('data')==='occupied'){
            return false;
          }
          pos=String.fromCharCode(pos.charCodeAt(0) - 1) + number;
        }
        //5 Spaces can be occupied
        pos=letter + number;
        for(j=0; j<size; j++){
          document.getElementById(pos).setAttribute('data','occupied');
          document.getElementById(pos).innerHTML='X';
          pos=String.fromCharCode(pos.charCodeAt(0) - 1) + number;
        }
        break;
    default:
    return false;
  }
  return true;
}

//Computer set ships in random locations
function compSetBoard(){
  placeCarrier();
  placeBattleShip();
  placeCruiser();
  placeCruiser();
  placeDestroyer();
}

//5 Spaces
function placeCarrier(){
  var result=false;
  while(!result){
    result=setShip(5);
  }
}

//4 Spaces
function placeBattleShip(){
  var result=false;
  while(!result){
    result=setShip(4);
  }
}

//3 Spaces
function placeCruiser(){
  var result=false;
  while(!result){
    result=setShip(3);
  }
}

//2 Spaces
function placeDestroyer(){
  var result=false;
  while(!result){
    result=setShip(2);
  }
}
