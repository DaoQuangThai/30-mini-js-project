const images = document.querySelectorAll('.store-img');
const lightboxContainer = document.querySelector('.lightbox-container');
const item = document.querySelector('.lightbox-item');
const closeIcon = document.querySelector('.lightbox-close');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');

const imageList = [];
let counter = 0;

// add all image to arr
images.forEach(image => imageList.push(image.src));

images.forEach(image => {
  image.addEventListener('click', e => {
    // show modal
    lightboxContainer.classList.add('show');
    // get src
    let src = e.target.src;
    counter = imageList.indexOf(src);

    //  không cần thiết nữa vì phía trên đã get cái absolute path
    // console.log(`../url(${src})`);
    item.style.background = `url(${src}) center/cover fixed no-repeat`;
  });
});

// modal image slider
btnLeft.addEventListener('click', () => {
  counter--;
  if (counter < 0) {
    counter = imageList.length - 1;
  }
  item.style.background = `url(${imageList[counter]}) center/cover fixed no-repeat`;
});

btnRight.addEventListener('click', () => {
  counter++;
  if (counter > imageList.length - 1) {
    counter = 0;
  }
  item.style.background = `url(${imageList[counter]}) center/cover fixed no-repeat`;
});

// close modal
closeIcon.addEventListener('click', () => {
  lightboxContainer.classList.remove('show');
});
