//Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){
	//get form variables
	var site_name=document.getElementById('site_name').value;
	var site_url=document.getElementById('site_url').value;
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
	//Prevent form from submiting
	e.preventDefault();
}