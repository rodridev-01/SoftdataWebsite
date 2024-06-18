function openNav(){
    'use strict';
    const sidepanel=document.getElementById('mySidepanel');
    if(sidepanel){
        sidepanel.style.left=0;
    }else{
        console.error('error:side panel not found')
    }
}

function closeNav(){
    'use strict';
    const sidepanel=document.getElementById('mySidepanel');
    if(sidepanel){
        sidepanel.style.left='-320px';
    }else{
        console.error('error:side panel not found')
    }
}
// portfolio gallary tab
function open_img(evt, cityName){
    let i, tabcontent, tablinks;

    //hide all tab content
    tabcontent = document.getElementsByClassName('tabcontent');
    for(i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none"
    }

    //remove active class from all tab links
    tablinks = document.getElementsByClassName('tablinks');
    for(i = 0; i < tablinks.length; i++){
        tablinks[i].classList.remove("active")
    }

    // show the selected tab content and mark the corresponding tab link asa active
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add('active');
}
    


$('.sliderlogo').slick({
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 5,
    sliderToScroll: 1,
    reponsive:[{
        breakpoint:1024,
        settings:{
            slidesToShow: 4,
            sliderToScroll: 1,
            infinite: true,
            dots: false,
        }
    },
    {
        breakpoint:600,
        settings:{
            slidesToShow:2,
            sliderToScroll:1
        }
    },
    ]
});
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});