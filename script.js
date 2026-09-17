

const pages = [...document.querySelectorAll('.page')];
const dots = document.getElementById('pageDots');
const pageLabel = document.getElementById('pageLabel');
const photoViewer = document.getElementById('photoViewer');
const fullPhoto = document.getElementById('fullPhoto');
const closePhotoViewer = document.getElementById('closePhotoViewer');
const labels = ['الغلاف', 'رسالة من القلب', 'الصورة الأولى', 'الصورة الثانية', 'الصورة الثالثة', 'يوم لا يُنسى', 'النهاية'];
let currentPage = 0;

pages.forEach((page, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.ariaLabel = labels[index];
    dot.addEventListener('click', () => showPage(index));
    dots.appendChild(dot);
});

function showPage(index) {
    currentPage = Math.max(0, Math.min(pages.length - 1, index));
    pages.forEach((page, pageIndex) => {
        page.style.transform = pageIndex < currentPage ? 'rotateY(-180deg)' : 'rotateY(0deg)';
        page.style.zIndex = pageIndex < currentPage ? pageIndex : pages.length - pageIndex;
    });
    [...dots.children].forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentPage));
    pageLabel.textContent = labels[currentPage];
}

document.getElementById('nextPage').addEventListener('click', () => showPage(currentPage + 1));
document.getElementById('prevPage').addEventListener('click', () => showPage(currentPage - 1));
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') showPage(currentPage - 1);
    if (event.key === 'ArrowLeft') showPage(currentPage + 1);
});
document.querySelectorAll('.memory-photo').forEach((photo) => {
    const openPhoto = () => {
        fullPhoto.src = photo.src;
        fullPhoto.alt = photo.alt;
        photoViewer.showModal();
    };
    photo.addEventListener('click', openPhoto);
    photo.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openPhoto();
        }
    });
});
closePhotoViewer.addEventListener('click', () => photoViewer.close());
photoViewer.addEventListener('click', (event) => {
    if (event.target === photoViewer) photoViewer.close();
});
showPage(0);