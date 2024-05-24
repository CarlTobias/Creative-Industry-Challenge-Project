const images = [
    '/drawables/image3.png', 
    '/drawables/image4.png',
    '/drawables/image5.png',
    // change placeholder
    '/drawables/placeholder1.jpg', 
    '/drawables/placeholder2.jpg',
    '/drawables/placeholder3.jpg',   
    '/drawables/placeholder4.jpg'
    // add more images if needed
];

const galleryImages = document.querySelectorAll('.imageSliderImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

prevButton.addEventListener('click', showNextImages);   
nextButton.addEventListener('click', showPrevImages);

function showPrevImages() {
    // change src link to name of the last src in the list.
  if (images[2] !== "/drawables/placeholder4.jpg") {
    const firstImage = images.shift();
    images.push(firstImage);
    updateImages();
  }
}

function showNextImages() {
  if (images[0] !== "/drawables/image3.png") {
    const lastImage = images.pop();
    images.unshift(lastImage);
    updateImages();
  }
}

function updateImages() {
    galleryImages.forEach((img, index) => {
        img.src = images[index];
    });
}

updateImages();