<?php

$con = mysqli_connect('localhost','root','','kroketweb');

if($con) {
}
else {
    echo "Connection failed.";
}
if(isset($_POST['submit'])) {
    if (isset($_POST['name']) && isset($_POST['street']) && isset($_POST['city']) && isset($_POST['phone'])) {
        $name = mysqli_real_escape_string($con, $_POST['name']);
        $street = mysqli_real_escape_string($con, $_POST['street']);
        $city = mysqli_real_escape_string($con, $_POST['city']);
        $phone = mysqli_real_escape_string($con, $_POST['phone']);
        $items = mysqli_real_escape_string($con, $_POST['items']);
        $price = mysqli_real_escape_string($con, $_POST['price']);
        $sql = "INSERT INTO `persons` (`PersonID`, `Name`, `Street`, `City`, `Phone`) 
                        VALUES (NULL, '$name', '$street', '$city', '$phone');";

        $resultSet = mysqli_query($con, $sql);
        $id = mysqli_insert_id($con);

        $sql = "INSERT INTO `orders` (`OrderID`, `PersonID`, `Items`, `Price`) VALUES (NULL , '$id', '$items ', '$price');";
        $resultSet = mysqli_query($con, $sql);

        if (!$resultSet) {
            die('Invalid query: ' . mysqli_error($con));
        }

    }
}
mysqli_close($con);

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Welkom bij KroketWeb - Bestel je vette hap online</title>
  <link href="css/default.css" rel="stylesheet" type="text/css"/>
    <script src="js/main.js"></script>
    <script src="js/validations.js"></script>
    <script>
window.onload = function(){
    updateCart();

    addItemsToHiddenField();

}
    </script>
</head>

<body>
<script>

</script>
  <div class="top"> <img src="images/logo.jpg" alt=""> </div>


  <div class="left">
    <span class="sponsortitle"> Menu </span>
    <ul class="nav-list">
      <li><a href="index.html">Home</a></li>
      <li><a href="assortiment.php">Assortiment</a></li>
      <li class="active"><a href="afrekenen.php">Afrekenen</a></li>
    </ul>
  </div>


<div class="middle">
 <h3>Afrekenen</h3>
 <form>
 <fieldset>
   <legend>Inhoud winkelwagen</legend>
     <table id="cart">
         <thead >
         <tr>
             <th>Artikel</th>
             <th>Aantal</th>
             <th>Prijs per stuk</th>
             <th>Totaalprijs</th>
         </tr>
         </thead>
         <tbody>
         </tbody>
         <tfoot>
         <tr><td>Totaal: </td><td id="total"></td></tr>
         </tfoot>

     </table>
  </fieldset>

  <br/>



 <form action="#" method="POST">





</form>
     <form action="#" method="POST">
         <legend>Bezorggegevens</legend>
         <input type="hidden" id="items" name="items" value="">
         <input type="hidden" id="price" name="price" value="">
         <table>
             <tr>
                 <td>Naam</td>
                 <td><input type="text" id="name" name="name" size="20" onblur="validateName()"></td>
             </tr>

             <tr>
                 <td>Straat + nr</td>
                 <td><input type="text" id="street" name="street" size="20" onblur="validateStreet()"></td>
             </tr>

             <tr>
                 <td>Plaats</td>
                 <td><input type="text" id="city" name="city" size="20" onblur="validateCity()"></td>
             </tr>

             <tr>
                 <td>Telefoonnummer</td>
                 <td><input type="text" id="phone" maxlength=10 name="phone" onblur="validatePhone()"></td>
             </tr>
         </table>

         <input type="submit" name="submit"  value="submit" onclick="clearSessionStorage()">

     </form>
     <?php

     if(isset($_POST['submit'])) {
         echo "Bestelling geplaatst";
     }

     ?>
</div>



<div class="right">
  <span class="sponsortitle"> Sponsors </span>
    <aside>
        <nav class = "sponsorlist">
            <a href="http://www.remia.nl">Lemia: Vool de lekkelste flietsaus</a>
            <br>
            <a href="http://www.mola.nl">Mola snacks: eerlijk en lekker</a>
            <br>
            <a href="http://www.arts.nl">Sonya Backer: Snacken is gezond</a>
        </nav>
    </aside>
</div>

</body></html>

