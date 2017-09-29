function updateCart() {
    console.log("asdasdfasdfasdfasdsf");
    var amountOfRows = sessionStorage.length;
    var tableRef = document.getElementById('cart').getElementsByTagName('tbody')[0];

    //remove all table rows
    for(var i=tableRef.rows.length;i>0;i--) {
        tableRef.deleteRow(i-1);
    }

    //add all products in cart to table
    for(var i = 0; i < amountOfRows; i++){
        var product = sessionStorage.getItem(sessionStorage.key(i)).split(',');

        console.log("adding row for: " + product[0]);

        var newRow   = tableRef.insertRow(tableRef.rows.length);

        //snack column
        var newCell  = newRow.insertCell(0);
        var newText  = document.createTextNode(product[0]);
        newCell.appendChild(newText);
        //prijs column
        newCell  = newRow.insertCell(1);
        newText  = document.createTextNode(product[1]);
        newCell.appendChild(newText);
        //amount column
        newCell  = newRow.insertCell(2);
        newText  = document.createTextNode(product[2]);
        newCell.appendChild(newText);
        //total column
        newCell  = newRow.insertCell(3);
        newText  = document.createTextNode(product[3]);
        newCell.appendChild(newText);

        document.getElementById('total').innerHTML = totalPrice();
    }

}

function addItemsToHiddenField(){
    var items = ''
    if(document.getElementById('items')){
        for(var i = 0; i < sessionStorage.length; i++){
            if(i == 0){
                items += sessionStorage.getItem(sessionStorage.key(i)).split(',')[0];
            }else {
                items += ", " + sessionStorage.getItem(sessionStorage.key(i)).split(',')[0];
            }
        }
        document.getElementById('items').value = items;
        document.getElementById('price').value = totalPrice();
    }
}

function emptyCart() {
    sessionStorage.clear();
    updateCart();
    console.log("session store cleared!");
}

function totalPrice(){
    sum = 0;
    for(var i = 0; i < sessionStorage.length; i++){
        sum += parseFloat(sessionStorage.getItem(sessionStorage.key(i)).split(',')[3]);
    }
    return sum.toFixed(2) ;
}

function addToCart(snack, price, id){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        var amount = document.getElementById(id).value;
        if(amount == '' || amount == 0 ){
            //remove product form sessionStorage
            console.log("removing: " + id);
            sessionStorage.removeItem(id);
        } else {
            //add or replace product with new amount
            if(sessionStorage.getItem(id) == null) {
                console.log("adding new item");
                sessionStorage.setItem(id, [snack, amount, price, (amount * price).toFixed(2)]);
            } else {
                console.log("replace with new amount");
                sessionStorage.removeItem(id);
                sessionStorage.setItem(id, [snack, amount, price, (amount * price).toFixed(2)]);
            }
        }
        console.log(sessionStorage);
        updateCart();

    } else {
        // Sorry! No Web Storage support..
        alert("No Web Storage support")
    }
}

function clearSessionStorage() {
    sessionStorage.clear();
}
