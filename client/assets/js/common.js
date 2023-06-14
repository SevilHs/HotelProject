let header=document.querySelector('header')

function scrollFunction() {
    if (document.body.scrollTop > 110 || document.documentElement.scrollTop > 110) {
        header.style.position="fixed"
        header.style.backgroundColor="#222"
        header.style.padding="30px 0"
    } else {
        header.style.position = 'absolute';
        header.style.backgroundColor="transparent"
        header.style.padding="40px 0"
    }
}

window.onscroll = function () { scrollFunction() }
