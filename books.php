<?php
include "classes.inc";

$connectstr_dbhost = '';
$connectstr_dbname = 'bookstoredb';
$connectstr_dbusername = '';
$connectstr_dbpassword = '';

$res =new response();
$res->DBConnection->name="DB Connection";
foreach ($_SERVER as $key => $value) {
    if (strpos($key, "MYSQLCONNSTR_localdb") !== 0) {
        continue;
    }
    $connectstr_dbhost = preg_replace("/^.*Data Source=(.+?);.*$/", "\\1", $value);
    $connectstr_dbusername = preg_replace("/^.*User Id=(.+?);.*$/", "\\1", $value);
    $connectstr_dbpassword = preg_replace("/^.*Password=(.+?)$/", "\\1", $value);
}

$link = mysqli_connect($connectstr_dbhost, $connectstr_dbusername, $connectstr_dbpassword,$connectstr_dbname);
if (!$link) {
	$res->DBConnection->failed=true;
	$res->DBConnection->message="failed to connect to DB";
    exit;
}
	$res->DBConnection->failed=false;
	$res->DBConnection->message="connected to the DB";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$res->apiCallAction->name="InsertBook";
	$myvar = $_POST['book'];
	$obj = json_decode($myvar);
	$sql = "insert into books(author,title,genre,price) values ('".$obj->author."','".$obj->title."','".$obj->genre."',".$obj->price.");";
	if ($link->query($sql) === TRUE) {
		$res->apiCallAction->failed=false;
		$res->apiCallAction->message = "New record created successfully";
	} else {
		$res->apiCallAction->failed=true;
		$res->apiCallAction->message = "Error: " . $sql . "<br>" . $link->error;
	}

} else if($_SERVER['REQUEST_METHOD'] === 'GET'){
	$keyword = $_GET['keyword'];
	$res->apiCallAction->name="getBooks";
	$sql = "select * from books where title like '%".$keyword."%'";
	$result = $link->query($sql);
	if ($result->num_rows > 0) {
		// output data of each row
		$booksArr = array();
		$i = 0;
		while($row = $result->fetch_assoc()) {
			$myBook = new book();
			$myBook->id=$row["id"];
			$myBook->title=$row["title"];
			$myBook->genre=$row["genre"];
			$myBook->author=$row["author"];
			$myBook->price=$row["price"];
			$booksArr[$i] = $myBook;
			$i++;
		}
		$res->booksArray = $booksArr;
		
		$res->apiCallAction->failed=false;
		$res->apiCallAction->message = "Books Read successfully";
	} else {
		$res->apiCallAction->failed=true;
		$res->apiCallAction->message = "0 results";
		echo "0 results";
	}

}
$jres = json_encode($res);
echo $jres;

$link->close();
?>