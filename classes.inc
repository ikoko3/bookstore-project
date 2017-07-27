<?php
class response{
	var $text;
	var $DBConnection;
	var $booksArray;
	var $apiCallAction;
	
	function __construct()
   {
		$DBConnection = new action();
		$apiCallAction = new action();
   }
}

class book{
	var $id;
	var $title;
	var $author;
	var $genre;
	var $price;
	
	function __construct()
   {

   }
}

class action{
	var $name;
	var $failed;
	var $message;
	
	function __construct( )
   {
		
   }
}

?>