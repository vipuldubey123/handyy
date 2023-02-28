function loco() {
    gsap.registerPlugin(ScrollTrigger);


    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        getDirection: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}


function mainPageAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page1",
            scroller: '#main',
            start: "top top",
            scrub: 1,
            pin: true,
            // markers: true

        }
    });

    tl
        .to(".main-img img", {
            scale: .5,
            borderRadius: '10px',
            ease: Power1,
        }, 'same')
        .to(".txt>h1", {
            top: '-18%',
            opacity: 0,
            ease: Power1
        }, 'same')
        .to(".small-txt h4,h5", {
            x: '300%',
            opacity: 0,
            ease: Power1
        }, 'same')


}

function horizontalScrollProducts() {

    let sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
        xPercent: -100 * (sections.length - 4),
        ease: "none",
        scrollTrigger: {
            trigger: "#page3",
            scroller: '#main',
            start: 'top 15%',
            pin: true,
            scrub: 1,
            // markers:true,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + document.querySelector(".trend-prod").offsetWidth,
        }
    });
}


function ProductCardSeq() {

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page3",
            scroller: '#main',
            start: "top 35%",
            end: "top 40%",
            // scrub: 1,
            // markers: true
        }
    })

    tl2.to(".prod-card", {
        position: 'relative',
        ease: Power1,
        stagger: .1
    })

    tl2.to(".desc-txt", {
        display: 'flex',
        ease: Power1,
        stagger: .1,
        delay: -1.5,
    }, 'samesame')

}

function search() {
    let searchBox = document.querySelector('#search');
    let links = document.querySelectorAll('.part2 a')

    searchBox.addEventListener('focusin', function () {
        searchBox.style.width = '40vw'
        links.forEach(function (a) {
            a.classList.add('hide')
        })
    })

    searchBox.addEventListener('focusout', function () {
        searchBox.style.width = '20vw'
        // links.style.opacity = '0'
        links.forEach(function (a) {
            a.classList.remove('hide')
        })
    })
}


function bestSellAnim() {
    let cont = document.querySelector('.bestSell-cont');
    let movable = document.querySelector('.bestSell-img-cont')

    cont.addEventListener('mousemove', function (dets) {

        let dimen = cont.getBoundingClientRect();

        const left = (dimen.width / 2 - dets.clientX) / 10 + 'px';
        const top = (dimen.height / 2 - dets.clientY) / 10 + 'px';

        movable.style.left = left;
        movable.style.top = top;



    })
}




function footerScroll() {


    gsap.to(".footer-cover-parallax", {

        scrollTrigger: {
            trigger: ".footer-cover-parallax",
            scroller: "#main",
            scrub: true,
            // markers: true,

        },
        height: "100vh",

    })
}

function eyeBall() {
    var balls = document.getElementsByClassName("ball");
    document.addEventListener('mousemove', function (e) {


        var x = e.clientX * 100 / window.innerWidth + "%";
        var y = e.clientY * 100 / window.innerHeight + "%";

        for (var i = 0; i < 2; i++) {
            balls[i].style.left = x;
            balls[i].style.top = y;
            balls[i].style.transform = "translate(-" + x + ",-" + y + ")";
        }
    })
}

function CircleMoving() {

    var circle = document.querySelector("#moving-circle");

    document.body.addEventListener("mousemove", function (dets) {

        circle.style.left = `${dets.pageX}px`;
        circle.style.top = `${dets.pageY}px`;

    })


}




function circleBigSolidBG() {

    var ReqElem = document.querySelectorAll(".reqElem")
    var circle = document.querySelector('#moving-circle');


    for (let i = 0; i < ReqElem.length; i++) {

        ReqElem[i].addEventListener('mousemove', function (info) {

            circle.style.transform = 'scale(4)';
            circle.style.backgroundColor = 'white';

        })

        ReqElem[i].addEventListener('mouseleave', function (info) {


            circle.style.transform = 'scale(1)';
            circle.style.backgroundColor = 'transparent';
            circle.style.border = ' 2px solid #fff';



        })

    }
}

function pageClose() {
    let prod_btn = document.querySelector('#product-page-close');
    let prod_page = document.querySelector('#products-page')

    let account_btn = document.querySelector('#account-page-close')
let accountPage = document.querySelector('.acc-main')


    prod_btn.addEventListener('click', function () {
        prod_page.style.display = 'none';
    })

    account_btn.addEventListener('click', function () {
        accountPage.style.display = 'none';
    })

}



function productClickShow() {
    // let arr = [
    //     { img: "./assets/images/product_images/flower_vase.webp", name: 'Yellow flower vase', price: '25000', discount: '2500', off: '80', pddesc: '' },
    //     { img: '', name: '', price: '', discount: '', off: '', pddesc: '' },
    //     { img: '', name: '', price: '', discount: '', off: '', pddesc: '' },
    //     { img: '', name: '', price: '', discount: '', off: '', pddesc: '' },
    //     { img: '', name: '', price: '', discount: '', off: '', pddesc: '' },
    //     { img: '', name: '', price: '', discount: '', off: '', pddesc: '' },
    //     { img: '', name: '', price: '', discount: '', off: '', pddesc: '' },
    //     { img: '', name: '', price: '', discount: '', off: '', pddesc: '' },
    //     { img: '', name: '', price: '', discount: '', off: '', pddesc: '' },
    // ]

    // let clutter = "";
    // arr.forEach(function (elem, idx) {

    //     clutter += ` <div id="product-page-close" class="close-btn">

    //     <i class="ri-close-line"></i>
    // </div>
    //  <div id="product-card">
    //     <div id="left">
    //         <div class="pd-wishlist">
    //             <i class="ri-heart-line"></i>
    //             <p>Add to wishlist</p>
    //         </div>
    //         <div id="product-img">
    //             <img src=${elem.img} alt="">
    //         </div>
    //     </div>
    //     <div id="right">

    //         <div class="product-name-rat">
    //             <h2>${elem.name} </h2>
    //             <div class="rating">
    //                 <div class="star">
    //                     <i class="ri-star-fill"></i>
    //                     <i class="ri-star-fill"></i>
    //                     <i class="ri-star-fill"></i>
    //                     <i class="ri-star-fill"></i>
    //                     <i class="ri-star-half-fill"></i>
    //                 </div>
    //                 <div class="rating-no">
    //                     <h5>4.6/5.0</h5>
    //                 </div>
    //             </div>
    //         </div>

    //         <div class="product-price">
    //             <div class="discount">
    //                 <p>upto ${elem.off} % off</p>
    //             </div>
    //             <div class="price">
    //                 <h3>₹${elem.discount}</h3>
    //                 <h4>₹${elem.price}</h4>
    //             </div>

    //         </div>

    //         <div class="product-desc">
    //             <p>${elem.pddesc}</p>
    //         </div>

    //         <div class="quantity">
    //             <p>Quantity</p>
    //             <div class="qty">
    //                 <a href="#"><i class="ri-subtract-line"></i></a>
    //                 <p>0</p>
    //                 <a href=""><i class="ri-add-line"></i></a>
    //             </div>
    //         </div>

    //         <div class="action-buttons">
    //             <a id="buy" href="">Buy now</a>
    //             <a id="cart" href="">Add to cart <span><i class="ri-shopping-cart-fill"></i></span></a>
    //         </div>

    //         <div class="last">
    //             <p>
    //                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti id facilis veritatis,
    //                 magni minus qui quos at saepe laudantium.
    //             </p>
    //         </div>

    //     </div>
    // </div> `
    // });

    // document.querySelector('#products-page').innerHTML = clutter;

    let productPage = document.querySelector('#products-page')
    let card = document.querySelectorAll('.prod-card');
    let card2 = document.querySelectorAll('.bestSell-cards');


    


    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', function () {

            // productPage.style.display = 'flex'
        })

    }

}

// function accountClickShow() {

//     let acc = document.querySelector('.account-login-signup')

//     let accPage = document.querySelector('.acc-main')

//     acc.addEventListener('click', function () {

//         accPage.style.display = 'flex'
//     })
// }


function cartCounter() {
   
    
    
}

function loginSignup() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });


}








if (window.innerWidth < 600) {
    loco();
    mainPageAnimation();
    ProductCardSeq();
    search();
    productClickShow();
    bestSellAnim();
    footerScroll();
    CircleMoving();
    circleBigSolidBG();
    pageClose();
    cartCounter();
    loginSignup();
    accountClickShow();
}

else {
    loco();
    mainPageAnimation();
    horizontalScrollProducts();
    ProductCardSeq();
    productClickShow();
    search();
    bestSellAnim();
    footerScroll();
    eyeBall();
    CircleMoving();
    circleBigSolidBG();
    pageClose();
    cartCounter();
    loginSignup();
    accountClickShow();
}