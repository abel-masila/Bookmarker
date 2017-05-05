//Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){
	//get form variables
	var site_name=document.getElementById('site_name').value;
	var site_url=document.getElementById('site_url').value;

	if(!validateForm(site_name,site_url)){
		return false;
	}
	var bookmark={
		name:site_name,
		url:site_url
	};
	
	/*
	//Test Local storage
	localStorage.setItem('test','Hello world!');
	console.log(localStorage.getItem('test'));
	ocalStorage.removeItem('test');
	console.log(localStorage.getItem('test'));*/

	//Test if Bookmarks is  null
	if(localStorage.getItem('bookmarks')===null){
		var bookmarks= [];
		//Add to Array
		bookmarks.push(bookmark);
		//Save to localstorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	} else{
		//Get bookmarks from localStorage
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		//Add Bookmark to array
		bookmarks.push(bookmark);
		//Re-set it back to localStorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	//Refetch bookmarks
	fetchBookmarks();
	//Prevent form from submiting
	e.preventDefault();
}

//Delete bookmarks
function deleteBookmark(url){
	//Get bookmarks from localStorage
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	for(var i=0;i<bookmarks.length;i++){
		if(bookmarks[i].url==url){
			//Remove from Array
			bookmarks.splice(1,1)
		}
	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	//Refetch bookmarks
	fetchBookmarks();
}

//Fetch Bookmarks
function fetchBookmarks(){
	//Get bookmarks from localStorage
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	//Get output id
	var bookmarkResults=document.getElementById('BookmarkResults');
	//Build Output
	bookmarkResults.innerHTML='';
	for(var i=0;i<bookmarks.length;i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;

		bookmarkResults.innerHTML+='<div class="well">'+
									'<h3>' + name+ 
									' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
									' <a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')"  href="#">Delete</a> '+
									'</h3>'+
									'</div';
	}

}

function validateForm(){

	if(!site_name || !site_url){
		alert("Please fill in the form");
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!site_url.match(regex)){
		alert("Invalid URL");
		return false;
	}
	return true;
}