document.addEventListener('DOMContentLoaded', () => {

	var grab = document.getElementById.bind(document);
	var slides = document.getElementsByClassName('item');

	//set up and obtain the api data
	var newsRequest = new XMLHttpRequest();
	var apiURL = 'http://www.freecodecamp.com/news/hot';

	newsRequest.open('GET', apiURL);
	newsRequest.send();

	newsRequest.onload = function() {
		if (newsRequest.status >=200 && newsRequest.status <= 400) {
			console.log('success rec\'d: ' + newsRequest.responseText);
			populate(JSON.parse(newsRequest.responseText));
	  }
		else console.log('fail... rec\'d: '  + newsRequest.responseText);
	}

	//populate with the top 10 news stories based on the desired field
	function populate(data) {
		for (var i = 0; i < 10; i++)
			populateSlide(slides[i], data[i]);
	}

	//helper function that populates a single slide element
	function populateSlide(slide, entry) {
		//use the image field, or the author.picture if it doesn't exist
		if (entry.image) slide.getElementsByTagName('img')[0].src = entry.image;
		else slide.getElementsByTagName('img')[0].src = entry.author.picture;

		//now load the text fields
		slide.getElementsByTagName('h1')[0].textContent = entry.headline;
		slide.getElementsByClassName('auth')[0].textContent = 'by ' + entry.author.username;
		slide.getElementsByClassName('rank')[0].textContent = entry.rank;
		slide.getElementsByClassName('time')[0].textContent = entry.timePosted;
	}

});
