
/* tableau [rangée][place] */
let tabRow = new Array(8);
for (var i = 0; i < 8; i++) {
    tabRow[i] = new Array(9);
}
/* (TEST) places déjà occupées */
let tabTaken = [
    tabRow[0][2] = 'OCCUPE',
    tabRow[0][4] = 'OCCUPE',
    tabRow[0][7] = 'OCCUPE',
    tabRow[0][8] = 'OCCUPE',
    tabRow[1][5] = 'OCCUPE',
    tabRow[1][3] = 'OCCUPE',
    tabRow[2][7] = 'OCCUPE',
    tabRow[2][6] = 'OCCUPE',
    tabRow[2][8] = 'OCCUPE'
];
/* bool si réservation effectuée */
let resaOk;

/* affichage du tableau */
function displayTabRow(){
    let y = 0;
    let z = 0;
    while(y < tabRow.length){
        $('#layout').append('<span class="bg-primary text-white">rang '+y+' |</span>&nbsp;');
        while(z < tabRow[y].length){
            if(tabRow[y][z] != null){
                $('#layout').append('[ <span class="text-danger">X</span> ]&nbsp;');
                z++;
            }else{
                $('#layout').append('[ <span class="text-success">'+z+'</span> ]&nbsp;');
                z++;
            }
        }
        z = 0;
        y++;
        $('#layout').append('<br>');
    }
}
/* choix du rang */
function chooseRow(){
    let row = prompt('choisir une rangée (ex : 0)');
    console.log('rangée : '+row);
    return row;
}
/* choix nb places */
function chooseNbSeats(){
    let seats = prompt('choisir le nombre de sièges (ex : 2)');
    console.log('Nb places : '+seats);
    return seats;
}
/* check rang et nb places */
function checkNbEmpty(myRow){
    let num = 0;
    for(let i = 0; i < 9; i++) {
        if( tabRow[myRow][i] == null ){
            num++;
        }
    }
    return num;
}
/* choix des sièges */
function chosenSeats(nbSeats){
    let bool = false;
    while(bool == false){
        let seats = prompt('choisir les '+nbSeats+' places (ex : 4 5 6)');
        seats.split(' ').forEach(function(item){
            let pattern = new RegExp("[0-9]");
            if( pattern.test(item) ){
                return bool = true;
            }else{
                alert('Saisie incorrecte des sièges : des chiffres sont attendus');
            }
        });
        
        if(bool == true){
            return seats.split(' ');
        }
    }
}

//----------------------------
setTimeout(function(){
    while(resaOk != true){
        let myRow = chooseRow();
        let nbSeats = chooseNbSeats();
    
        if( nbSeats <= checkNbEmpty(myRow) ){
            console.log('Nb places OK : '+nbSeats+'/'+checkNbEmpty(myRow)+' dispo');
            console.table(tabRow);
            displayTabRow();
            //choisir les places
            let tabResa = chosenSeats(nbSeats);
            console.table(tabResa);

            if(tabResa.length == nbSeats){
                for(let i = 0; i < tabRow[myRow].length; i++){
                    while( tabRow[myRow][tabResa[i]] != null ){
                        alert('Siège '+tabResa[i]+' indisponible');
                        tabResa = chosenSeats(nbSeats);
                        i = 0;
                    }
                }
                console.table(tabResa);
                //insérer résa dans tabRow
                for(let i = 0; i < tabResa.length; i++){
                    tabRow[myRow][tabResa[i]] = 'OCCUPE';
                }
                let resa = confirm('Réservation enregistrée ! Souhaitez-vous en faire une autre ?');
                $('#layout').empty();
                if(resa == false){
                    console.table(tabRow);
                    resaOk = true;
                    displayTabRow();
                }
            }else{
                alert('Nombre de sièges différent de celui renseigné ('+nbSeats+')');
                $('#layout').empty();
            }
        }
        else{
            console.log('Pas assez de places : '+nbSeats+'/'+checkNbEmpty(myRow)+' dispo');
            alert('Choisir une autre rangée ('+checkNbEmpty(myRow)+' places dans la rangée '+myRow+')');
        }
    
    }
}, 500);




//--------------

    

