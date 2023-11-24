import { galleryItems } from './gallery-items.js';

console.log(galleryItems);
const gallery = document.querySelector('.gallery');
const fragment = document.createDocumentFragment();

galleryItems.forEach(element => {
    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = element.preview;
    img.setAttribute(`data-${'source'}`, element.original);
    img.alt = element.description;
    const a = document.createElement('a');
    a.classList.add('gallery__link');
    a.href = element.original;
    a.appendChild(img);
    const li = document.createElement('li');
    li.classList.add('gallery__item');
    li.appendChild(a);
    fragment.appendChild(li);
});

gallery.appendChild(fragment);
gallery.addEventListener('click', function (ev) { 
    ev.preventDefault();
    if (ev.target.classList.contains('gallery__image')) {
        fullSize(ev);
    }
    // console.log(ev.target.dataset.source);
    console.log(ev.currentTarget);
});

let instance; // Оголошуємо змінну за межами функцій

function fullSize(ev) {
    const img = ev.target;
    img.src = ev.target.dataset.source;
    img.id = 'modal';
    instance = basicLightbox.create(`
        <div class="modal">
            ${img.outerHTML}
        </div>
    `);

    instance.show() 
    const modal = document.querySelector('.modal');
   // console.log(modal);
    document.addEventListener('keydown', modalKeyDown);
     instance.element().addEventListener('click', modalKeyDown);
}

function modalKeyDown(ev) {
  // console.log(ev.type);
    if ((ev.code === 'Escape') || (ev.type === 'click')) { 
        document.removeEventListener('keydown', modalKeyDown);
        instance.element().removeEventListener('click', modalKeyDown);
        instance.close();
        
    }
}
