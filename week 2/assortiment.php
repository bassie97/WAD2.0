<?php
  $con = mysqli_connect('localhost','root','','kroketweb');

  if($con)
      echo "Connection established.";
  else
      echo "Connection failed.";

  $getAllSnacksQuery = "SELECT * FROM product";
  $resultSet = mysqli_query($con, $getAllSnacksQuery);



?>

<!DOCTYPE html>
<html> 
  <head>
  <meta charset="UTF-8"/>
  <title>Welkom bij KroketWeb - Bestel je vette hap online</title>
  <link href="css/default.css" rel="stylesheet" type="text/css"/>
  <script src="js/main.js"></script>
  </head>

  <body>
    <div class="top"> <img src="images/logo.jpg" alt=""> </div>


  <div class="left">
    <span class="sponsortitle"> Menu </span>
    <ul class="nav-list">
      <li><a href="index.php">Home</a></li>
      <li class="active"><a href="assortiment.php">Assortiment</a></li>
      <li><a href="afrekenen.php">Afrekenen</a></li>
    </ul>
  </div>

<div class="middle">
 <h3>Overzicht producten</h3>





<div id="berichtenNavigatie">
</div>
<table>

<tr>
  <th>Product</th>
  <th>Prijs (euro)</th>
  <th>Op voorraad</th>
  <th>Bestelling</th>
</tr>

    <?php
    while ($row = mysqli_fetch_assoc($resultSet)){
        $id = $row["id"];
        $omschrijving = $row["omschrijving"];
        $prijs = $row["prijs"];
        $voorraad = $row["voorraad"];
    ?>
    <tr>
        <td><?php echo $omschrijving; ?></td>
        <td><?php echo $prijs; ?></td>
        <td><?php echo $voorraad; ?></td>

        
        <td><input id="1" type="text" size="3" onblur="addToCart('testproduct', 10.0, this.id)"/></td>
    </tr>

    <?php
    }
    ?>

</table>

<form>
<table>
  <tr>
  <td>Producten per pagina</td>

  <td><select name="getpage">
        <option value=" "> </option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
  </select></td>

  <td><b>1</b> | 2 | 3 | ...</td>
  </tr>
</table>
</form>

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


  <h3>Inhoud winkelmandje</h3>
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
</div>

</body>
</html>
