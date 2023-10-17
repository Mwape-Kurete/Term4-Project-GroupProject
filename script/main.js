window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const backgroundColor = scrollPosition > 50 ? 'black' : 'white'; 
    document.body.style.backgroundColor = backgroundColor;
});
