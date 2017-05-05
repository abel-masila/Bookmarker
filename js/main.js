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
	
	//Test Local storage
	
	//Prevent form from submiting
	e.preventDefault();
}