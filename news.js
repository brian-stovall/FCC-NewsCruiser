document.addEventListener('DOMContentLoaded', () => {
	var newsRequest = new XMLHttpRequest();
	var apiURL = 'http://www.freecodecamp.com/news/hot';

	newsRequest.open('GET', apiURL);
	newsRequest.send();

	newsRequest.onload = function() {
		if (newsRequest.status >=200 && newsRequest.status <= 400) {
			console.log('success rec\'d: ' + newsRequest.responseText);
			populate(newsRequest.responseText);
	  }
		else console.log('fail... rec\'d: '  + newsRequest.responseText);
	}

	//populate with the top 10 news stories based on the desired field
	function populate() {
	}
});
