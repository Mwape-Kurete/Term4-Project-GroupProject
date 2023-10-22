window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const body = document.body;

    if (scrollPosition > 50) {
        body.style.backgroundColor = '#1A1A1A';
        document.querySelectorAll('h1').forEach(function(h1) {
            h1.style.color = 'white'; 
        });
    } else {
        body.style.backgroundColor = 'white'; 
        document.querySelectorAll('h1').forEach(function(h1) {
            h1.style.color = '#2C475A'; 
        });
    }
});

// IMPLEMENTING tmdB movie api 

