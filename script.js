function setPageCounter(pageCount) {
	const container = document.getElementById('imageContainer');
	
	const imageHeight = container.querySelector('img')?.height || 0;
	const padding = 5; // 5px padding between images
	const totalHeight = imageHeight + padding;
	const scrollPosition = container.scrollTop;
	const currentPage = Math.floor(scrollPosition / totalHeight) + 1;
	document.getElementById('pageCounter').textContent = `Page ${currentPage} / ${pageCount}`;
}

document.getElementById('fileInput').addEventListener('change', async function(event) {
	const file = event.target.files[0];
	if (!file) return;
   
	const zip = new JSZip();
	const zipData = await file.arrayBuffer();
	const contents = await zip.loadAsync(zipData);
   
	const imageFiles = Object.keys(contents.files)
	  .filter(filename => filename.match(/\.(jpg|jpeg|png|gif)$/i))
	  .sort();


	const container = document.getElementById('imageContainer');
	container.innerHTML = '';
   
	const totalPages = imageFiles.length;
   
	for (const filename of imageFiles) {
		const imgData = await contents.files[filename].async('blob');
		const imgUrl = URL.createObjectURL(imgData);

		const img = document.createElement('img');
		img.src = imgUrl;
		container.appendChild(img);
	}


	// Set up zooming after images are loaded
	setupZoom(totalPages);
   
	// Page counter logic
	container.addEventListener('scroll', function() {
		setPageCounter(totalPages);
	});
});


function setupZoom(pageCount) {
	const images = document.querySelectorAll("#imageContainer img");
	const zoomSlider = document.getElementById("zoomSlider");
	const zoomInput = document.getElementById("zoomInput");
	let zoomLevel = zoomSlider.value || 100; // Default zoom level at 100%

	// Function to update zoom
	function updateZoom(value) {
		zoomLevel = value;
		images.forEach(img => {
			// Update the maxHeight to reflect the zoom level
			img.style.maxHeight = `${zoomLevel}vh`;
		});
		setPageCounter(pageCount);
	}

	// Slider event listener
	zoomSlider.addEventListener("input", function () {
		const value = parseInt(zoomSlider.value);
		zoomInput.value = value; // Sync the input box with the slider
		updateZoom(value);
	});

	// Input event listener
	zoomInput.addEventListener("input", function () {
		const value = parseInt(zoomInput.value);
		if (value >= 60 && value <= 160) {
			zoomSlider.value = value; // Sync the slider with the input box
			updateZoom(value);
		} else {
			// Reset to last valid zoom level if input is out of bounds
			zoomInput.value = zoomLevel;
		}
	});

	// Initialize with the default zoom level
	updateZoom(zoomLevel);
}