const imageContainer = document.getElementById('imageContainer');
const loadingMessage = document.getElementById("loadingMessage");
const pageCounter = document.getElementById('pageCounter');
const zoomSlider = document.getElementById("zoomSlider");
const zoomInput = document.getElementById("zoomInput");

document.getElementById('fileInput').addEventListener('change', async function(event) {
	const file = event.target.files[0];
	if (!file) return; // verify that at least one file exists
	loadingMessage.style.opacity = "1";
	
	const totalPages = await loadBook(file);
	console.log(`'${file.name}' loaded with ${totalPages} pages. Happy reading! =)`);

	setTimeout(() => {
		loadingMessage.style.opacity = "0";
	}, 500);

	// Set up zooming after images are loaded
	setupZoom(totalPages);
   
	// Page counter logic
	imageContainer.addEventListener('scroll', function() {
		setPageCounter(totalPages);
	});
});


async function loadBook(file) {
	const zip = new JSZip();
	const zipData = await file.arrayBuffer();
	const contents = await zip.loadAsync(zipData);
   
	// ensure it is a valid type
	const imageFiles = Object.keys(contents.files) 
		.filter(filename => filename.match(/\.(jpg|jpeg|png|gif)$/i))
		.sort();
	
	imageContainer.innerHTML = '';
	const totalPages = imageFiles.length;
	let pagesLoaded = 1;
   
	for (const filename of imageFiles) {
		const imgData = await contents.files[filename].async('blob');
		const imgUrl = URL.createObjectURL(imgData);

		const img = document.createElement('img');
		img.src = imgUrl;
		imageContainer.appendChild(img);
		
		loadingMessage.textContent = `Loading... (${pagesLoaded} / ${totalPages})`; // update loading message
		pagesLoaded += 1;
	}
	
	return totalPages;
}


function setPageCounter(pageCount) {
	const imageHeight = imageContainer.querySelector('img')?.height || 0;
	const padding = 5; // 5px padding between images
	const totalHeight = imageHeight + padding;
	const scrollPosition = imageContainer.scrollTop;
	const currentPage = Math.floor(scrollPosition / totalHeight) + 1;
	pageCounter.textContent = `Page ${currentPage} / ${pageCount}`;
}


// Function to update zoom
function updateZoom(value, pageCount) {
	const images = document.querySelectorAll("#imageContainer img");
	
	images.forEach(img => {
		// Update the maxHeight to reflect the zoom level
		img.style.maxHeight = `${value}vh`;
	});
	
	setPageCounter(pageCount);
}


function setupZoom(pageCount) {
	const images = document.querySelectorAll("#imageContainer img");
	let zoomLevel = zoomSlider.value || 100; // Default zoom level at 100%

	// Initialize with the default zoom level
	updateZoom(zoomLevel, pageCount);

	// Slider event listener
	zoomSlider.addEventListener("input", function () {
		const value = parseInt(zoomSlider.value);
		zoomInput.value = value; // Sync the input box with the slider
		updateZoom(value, pageCount);
	});

	// Input event listener
	zoomInput.addEventListener("input", function () {
		const value = parseInt(zoomInput.value);
		if (value >= 60 && value <= 160) {
			zoomSlider.value = value; // Sync the slider with the input box
			updateZoom(value, pageCount);
		} else {
			// Reset to last valid zoom level if input is out of bounds
			zoomInput.value = zoomLevel;
		}
	});
}