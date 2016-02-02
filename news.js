document.addEventListener('DOMContentLoaded', () => {

	var grab = document.getElementById.bind(document);
	var newsCarousel = grab('newsCarousel');
	var sortPopularity = grab('sortByPopularity');
	var sortTime = grab('sortByTime');

	var slides = document.getElementsByClassName('item');

	//set up and obtain the api data
	var newsRequest = new XMLHttpRequest();
	var apiURL = 'http://www.freecodecamp.com/news/hot';

	//store the JSON retreived from the API
	var data;

	newsRequest.open('GET', apiURL);
	newsRequest.send();

	newsRequest.onload = function() {
		if (newsRequest.status >=200 && newsRequest.status <= 400) {
			console.log('success rec\'d: ' + newsRequest.responseText);
			data = (JSON.parse(newsRequest.responseText));
			populate();
	  }
		else console.log('fail... rec\'d: '  + newsRequest.responseText);
	}

	//sort the data by popularity or time posted
	function sortData(sortfield) {
		if (sortfield === 'popularity')
			data = data.sort( (cur, prev) => {return prev.rank - cur.rank;});
		else
			data = data.sort( (cur, prev) => {return prev.timePosted - cur.timePosted;});
	}

	//populate with the top 10 news stories based on the desired field
	function populate() {
		sortData('popularity');

		for (var i = 0; i < 10; i++)
			populateSlide(slides[i], data[i]);

	//make the carousel controls visible
	var controls = document.getElementsByClassName('carousel-control');
	for (i = 0; i < controls.length; i++)
		controls[i].style.visibility='visible';

  //start the carousel
	$('#newsCarousel').carousel({interval:false});
	
	}

	//helper function that populates a single slide element
	function populateSlide(slide, entry) {
		//use the image field, or the author.picture if it doesn't exist
		if (entry.image) slide.getElementsByTagName('img')[0].src = entry.image;
		else slide.getElementsByTagName('img')[0].src = entry.author.picture;

		//now load the text fields
		slide.getElementsByTagName('h1')[0].textContent = entry.headline;
		slide.getElementsByClassName('auth')[0].textContent = 'by ' + entry.author.username;
		slide.getElementsByClassName('rank')[0].textContent = entry.rank + ' upvotes';
		slide.getElementsByClassName('time')[0].textContent = 
			new Date(entry.timePosted).toDateString();

		//make the links
		slide.getElementsByClassName('articleLink')[0].href = entry.link;
		slide.getElementsByClassName('profileLink')[0].href = 'http://www.freecodecamp/' 
			+ entry.author.username;
	}

});
