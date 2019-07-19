function revealFunction() {
    let div = document.getElementsByClassName('reveal')[0];
    let btn = document.getElementsByClassName('reveal-btn')[0];
    if (div.style.display !== 'block') {
        div.style.display = 'block';
        btn.innerHTML = 'Click to Hide';
    } else {
        div.style.display = 'none';
        btn.innerHTML = 'Click to Reveal';
    }
}