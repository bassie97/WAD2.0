function updateCart(length) {
    for (var i = 0; i < length; i++) {
        var product = localStorage.getItem(localStorage.key(i));
        console.log(product);
    }
}

function kek(){
    if(localStorage.getItem() != ''){
        var total = amount * price;

        var tableRef = document.getElementById('cart').getElementsByTagName('tbody')[0];

        var newRow   = tableRef.insertRow(tableRef.rows.length);

        var newCell  = newRow.insertCell(0);
        var newText  = document.createTextNode(snack);
        newCell.appendChild(newText);

        newCell  = newRow.insertCell(1);
        newText  = document.createTextNode(amount);
        newCell.appendChild(newText);

        newCell  = newRow.insertCell(2);
        newText  = document.createTextNode(price);
        newCell.appendChild(newText);

        newCell  = newRow.insertCell(3);
        newText  = document.createTextNode(total.toFixed(2));
        newCell.appendChild(newText);

        prices.push(total);

    }
    totalPrice();
}

function totalPrice(){
    sum = 0;
    for(var i = 0; i < prices.length; i++){
        sum += prices[i];
    }
    document.getElementById('total').innerHTML = sum.toFixed(2) ;
}

function addToCart(snack, price, id){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        var amount = document.getElementById(id).value;
        if(localStorage.getItem(id) == null){
            localStorage.setItem(id, [snack, amount, price, (amount * price).toFixed(2)]);
        }else {
            localStorage.removeItem(id);
            localStorage.setItem(id, [snack, amount, price, (amount * price).toFixed(2)]);
        }
        updateCart(localStorage.length);

    } else {
        // Sorry! No Web Storage support..
        alert("No Web Storage support")
    }
}