const currentDate = document.querySelector(".monthYear");
const daysTag = document.querySelector(".days");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY',
    'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(), // Day of the week of the 1st
        lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
        lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth()
            && currentYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    const totalDays = firstDayOfMonth + lastDateOfMonth;
    const nextDays = totalDays <= 35 ? (35 - totalDays) : (42 - totalDays);

    for (let i = 1; i <= nextDays; i++) {
        liTag += `<li class="inactive">${i}</li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
};

renderCalendar();


const images = [
    'drawables/image3.png', 
    'drawables/image4.png',
    'drawables/image5.png',
    // change placeholder
    'drawables/placeholder1.jpg', 
    'drawables/placeholder2.jpg',
    'drawables/placeholder3.jpg',   
    'drawables/placeholder4.jpg'
    // add more images if needed
];

const galleryImages = document.querySelectorAll('.imageSliderImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

prevButton.addEventListener('click', showNextImages);   
nextButton.addEventListener('click', showPrevImages);

function showPrevImages() {
    // change src link to name of the last src in the list.
  if (images[2] !== "drawables/placeholder4.jpg") {
    const firstImage = images.shift();
    images.push(firstImage);
    updateImages();
  }
}

function showNextImages() {
  if (images[0] !== "drawables/image3.png") {
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
