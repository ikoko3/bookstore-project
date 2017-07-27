 var insertRequest = new XMLHttpRequest();
        var xhr = new XMLHttpRequest();
        document.getElementById("InsertButton").addEventListener("click", function () {
            if (document.getElementById("priceBox").value < 0) {
                informArea.innerHTML = "<font color='red'>Price can't be negative </font>";
            } else {
                var myBook = new book(document.getElementById("nameTextBox").value, document.getElementById("authorTextBox").value, document.getElementById("genreSelection").value, document.getElementById("priceBox").value, 0);

                var jBook = "book=" + JSON.stringify(myBook);
                xhr.open("POST", "books.php", true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(jBook);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        var successDiv = document.createElement("div");
                        var node;
                        if (response.apiCallAction.failed == false) {
                            successDiv.setAttribute("class", "alert");
                            node = document.createTextNode("Book Has Been Added Succefully");

                        } else {
                            console.error(response.apiCallAction.message);
                            successDiv.setAttribute("class", "alert fail");
                            node = document.createTextNode("This book couldn't be added");
                        }
                        var successAlert = document.createElement("span");
                        successAlert.setAttribute("class", "closebtn");
                        successAlert.setAttribute("onclick", "this.parentElement.style.display='none';");
                        var xButton = document.createTextNode("x");
                        successDiv.appendChild(node);
                        successAlert.appendChild(xButton);
                        successDiv.appendChild(successAlert);
                        document.getElementById("informArea").appendChild(successDiv);

                        var close = document.getElementsByClassName("closebtn");
                        var i;
                        for (i = 0; i < close.length; i++) {
                            close[i].onclick = function () {
                                var div = this.parentElement;
                                div.style.opacity = "0";
                                setTimeout(function () {
                                    div.style.display = "none";
                                }, 600);
                            }
                        }
                    }
                }
            }
        });