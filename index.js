var postlist = document.getElementById("root");
var lastPage;

var req = new XMLHttpRequest();
var data;
var posts = [];
req.open("GET", "https://fullopportunities.com/wp-json/wp/v2/posts?per_page=10");
req.onload = function() {
    if(req.status >= 200 && req.status < 400) {
        data = JSON.parse(req.responseText);
        console.log(data)
        for(var i = 0; i < 10; i++) {
            var tmp = {
                id: data[i].id,
                title: data[i].title.rendered,
                content: stripHtml(data[i].excerpt.rendered)
            }
            console.log(tmp);
            posts.push(tmp);
        }
        var str;
        postlist.innerHTML = "";
        for(var i = 0; i < 10; i++) {
            str = '<div class = "post"> <a id="'+posts[i].id+'" class = "post-title">'+posts[i].title+'</a> <p class="post-desc">'+posts[i].content+'</p><button class="read" id="" onclick="loadPost('+posts[i].id+')">Read More</button></div>'
            postlist.innerHTML += str;
            lastPage = window.location.href;
        }
    } else {
        console.log("Error");
    }
}
function loadAll() {
    req.send();
}

var cont;
function loadPost(id) {
    var postReq = new XMLHttpRequest();
    postReq.open("GET", "https://fullopportunities.com/wp-json/wp/v2/posts/"+id);
    postReq.onload = function() {
        if(req.status >= 200 && req.status < 400) {
            cont = JSON.parse(postReq.responseText);
            var title = cont.title.rendered;
            var desc = stripHtml(cont.content.rendered);
            postlist.innerHTML = '<div class="post"><a class = "back" href="'+lastPage+'"><< BACK</a><a class = "post-title">'+title+'</a><p class="post-desc">'+desc+'</p></div>'
        } else {
            console.log("ERROR");
        }
    }
    postReq.send();
}

function stripHtml(html){
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

loadAll();