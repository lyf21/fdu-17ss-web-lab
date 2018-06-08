<?php
//Fill this place

//****** Hint ******
//connect database and fetch data here
$dbms='mysql';     //数据库类型
$host='localhost'; //数据库主机名
$dbName='travel';    //使用的数据库
$user='root';      //数据库连接用户名
$pass='';          //对应的密码
$dsn="$dbms:host=$host;dbname=$dbName";


try {
    $pdo = new PDO($dsn, $user, $pass); //初始化一个PDO对象
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$sql1 = "SELECT * FROM continents";
	$result1 = $pdo->query($sql1);	//发送一条 MySQL 查询
	$sql2 = "SELECT * FROM countries";
	$result2 = $pdo->query($sql2);	//发送一条 MySQL 查询
	
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 14</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	-->
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    
    

    <link rel="stylesheet" href="css/captions.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.css" />    

</head>

<body>
    <?php include 'header.inc.php'; ?>


    <!-- Page Content -->
    <main class="container">
        <div class="panel panel-default">
          <div class="panel-heading">Filters</div>
          <div class="panel-body">
            <form action="Lab10.php" method="get" class="form-horizontal">	<!-- 这里自己以get方式把数据交给自己执行 -->
              <div class="form-inline">
              <select name="continent" class="form-control">
                <option value="0">Select Continent</option>
                <?php
			
                //Fill this place

                //****** Hint ******
                //display the list of continents

                while($row = $result1->fetch()) {	//从$result中取出一行作为关联数组
                  echo '<option value=' . $row['ContinentCode'] . '>' . $row['ContinentName'] . '</option>';
                }

                ?>
			
              </select>     
              
              <select name="country" class="form-control">
                <option value="0">Select Country</option>
                <?php 
                //Fill this place

                //****** Hint ******
                /* display list of countries */ 
				while($row = $result2->fetch()) {	//从$result中取出一行作为关联数组
                  echo '<option value=' . $row['ISO'] . '>' . $row['CountryName'] . '</option>';
                }
                ?>
              </select>    
              <input type="text"  placeholder="Search title" class="form-control" name="title">
              <button type="submit" class="btn btn-primary">Filter</button>
              </div>
            </form>

          </div>
        </div>     
                                    

		<ul class="caption-style-2">
            <?php 
            //Fill this place

            //****** Hint ******
            /* use while loop to display images that meet requirements ... sample below ... replace ???? with field data
            <li>
              <a href="detail.php?id=????" class="img-responsive">
                <img src="images/square-medium/????" alt="????">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>????</p>
                  </div>
                </div>
              </a>
            </li>        
            */ 			
			if(isset($_GET['continent']) && $_GET["continent"] != "0"){		//大坑！$_GET["continent"]返回的是字符串，类型不相同无法比较？
				if(isset($_GET['country']) && $_GET["country"] != "0"){
					$sql3 = "SELECT * FROM imagedetails WHERE ContinentCode = '".$_GET['continent']."' AND CountryCodeISO = '".$_GET['country']."'";
				}else{
					$sql3 = "SELECT * FROM imagedetails WHERE ContinentCode = '".$_GET['continent']."'";
				}
			}else{
				if(isset($_GET['country']) && $_GET["country"] != "0"){
					$sql3 = "SELECT * FROM imagedetails WHERE CountryCodeISO = '".$_GET['country']."'";
				}else{
					$sql3 = "SELECT * FROM imagedetails";
				}
			}
			
			$result3 = $pdo->query($sql3);
			while($row = $result3->fetch()) {	//从$result中取出一行作为关联数组
                echo '<li>
              <a href="detail.php?id='.$row["ImageID"].'" class="img-responsive">
                <img src="images/square-medium/'.$row["Path"].'" alt="'.$row["Title"].'">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>'.$row["Description"].'</p>
                  </div>
                </div>
              </a>
            </li>';
            }
			
			    
			$pdo = null;
			} catch (PDOException $e) {
			die ("Error!: " . $e->getMessage() . "<br/>");
			}
            ?>
       </ul>       

      
    </main>
    
    <footer>
        <div class="container-fluid">
                    <div class="row final">
                <p>Copyright &copy; 2017 Creative Commons ShareAlike</p>
                <p><a href="#">Home</a> / <a href="#">About</a> / <a href="#">Contact</a> / <a href="#">Browse</a></p>
            </div>            
        </div>
        

    </footer>


        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</body>

</html>