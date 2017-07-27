document.getElementById("clearButton").addEventListener("click", removeBooks
		);
		
		function removeBooks(){
			var nodeList = document.getElementById("resultArea").childNodes;
			list = document.getElementById("resultArea");
			for(var i=0;i<nodeList.length;i++){
				removeBook(nodeList[i].childNodes[0]);
			}
		}
		
		function removeBook(childDiv){
            
			childDiv.style.animationPlayState = "running";
			var div = childDiv.parentElement;
			setTimeout(function(){div.remove();}, 350);
		}
	
        var getBooksRequest = new XMLHttpRequest();
        document.getElementById("searchButton").addEventListener("click", function () {
            getBooksRequest.open("GET", "books.php?keyword=" + document.getElementById("bookKeyWord").value, true);
            getBooksRequest.send(null);
            getBooksRequest.onreadystatechange = function () {
                if (getBooksRequest.readyState === XMLHttpRequest.DONE && getBooksRequest.status === 200) {
                    
					var response = JSON.parse(getBooksRequest.responseText);
					var booksArray = response.booksArray;
					removeBooks();
					for(var j = 0; j<booksArray.length;j++){
						var book = booksArray[j];
						var bookBox = document.createElement("div");
						bookBox.setAttribute("class", "bookBox");
						var bookInfo = document.createElement("div");
						bookInfo.setAttribute("class", "newBook");
						var node = document.createTextNode("Book: "+book.title+" by "+book.author+", price: "+book.price+", id("+book.id+"),genre : "+book.genre);
						bookInfo.appendChild(node);
						var x = document.createElement("span");
                        x.setAttribute("class", "closebtn");
                        x.setAttribute("onclick", "this.parentElement.style.display='none';");
						var xButton = document.createTextNode("x");
						x.appendChild(xButton);
						bookInfo.appendChild(x);
						bookBox.appendChild(bookInfo);
						document.getElementById("resultArea").appendChild(bookBox);
					}
					
					var close = document.getElementsByClassName("closebtn");
                        var i;
                        for (i = 0; i < close.length; i++) {
							
							
                            close[i].onclick = function(){
								var childDiv = this.parentElement;
								console.log(childDiv);
								childDiv.style.animationPlayState = "running";
								var div = childDiv.parentElement;
								setTimeout(function(){div.remove();}, 350);
							}
                        }
						
                }
            }
        });