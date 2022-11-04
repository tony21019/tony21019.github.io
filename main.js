const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close")
/*=============== SHOW MENU ===============*/
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add("show-menu")
    })
}
/*============== MENU HIDDEN ===============*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove("show-menu")
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll(".nav-link")
function linkAction() {
    const navMenu = document.getElementById("nav-menu")
    // When user clicks on each nav link, the menu class is removed
    navMenu.classList.remove("show-menu")
}
navLinks.forEach(n => n.addEventListener('click', linkAction))
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
window.addEventListener('scroll', navHighLighter)

function navHighLighter() {
    // get current scroll position
    let scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 60,
            sectionId = current.getAttribute('id')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
        }
        else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
/*=============== PORTFOLIO ITEM FILTER ===============*/
const filter = document.querySelector(".portfolio-filter-inner"),
    filterBtn = filter.children,
    totalFilterBtn = filterBtn.length,
    portfolioItems = document.querySelectorAll('.portfolio-item')
totalPortfolioItems = portfolioItems.length

for (let i = 0; i < totalFilterBtn; i++) {
    filterBtn[i].addEventListener('click', function () {
        filter.querySelector('.active').classList.remove('active')
        this.classList.add('active')

        const filterValue = this.getAttribute("data-filter")
        for (let k = 0; k < totalPortfolioItems; k++) {
            if (filterValue == portfolioItems[k].getAttribute('data-category')) {
                portfolioItems[k].classList.add('show')
                portfolioItems[k].classList.remove('hide')
            }
            else {
                portfolioItems[k].classList.add('hide')
                portfolioItems[k].classList.remove('show')
            }
            if (filterValue == 'all') {
                portfolioItems[k].classList.add('show')
                portfolioItems[k].classList.remove('hide')
            }
        }
    })
}
/*=============== THEME/DISPLAY CUSTOMIZATION ===============*/
const theme = document.querySelector("#theme-button")
const themeMenu = document.querySelector(".customize-theme")
const fontSizes = document.querySelectorAll('.choose-size span')
const colorPallete = document.querySelectorAll('.choose-color span')
let root = document.querySelector(':root')
const bg1 = document.querySelector('.bg-1')
const bg2 = document.querySelector('.bg-2')
// open menu
const openThemeMenu = () => {
    themeMenu.style.display = 'grid'
}
// close menu
const closeThemeMenu = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeMenu.style.display = 'none'
    }
}
theme.addEventListener("click", openThemeMenu)
themeMenu.addEventListener("click", closeThemeMenu)

/*===== FONTS =====*/

// Remove class active
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active')
    })
}
fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelector()
        let fontSize
        size.classList.toggle('active')
        if (size.classList.contains('font-size-1')) {
            fontSize = '13px'
        }
        else if (size.classList.contains('font-size-2')) {
            fontSize = '14.5px'
        }
        else if (size.classList.contains('font-size-3')) {
            fontSize = '16px'
        }
        else if (size.classList.contains('font-size-4')) {
            fontSize = '17.5px'
        }
        else if (size.classList.contains('font-size-5')) {
            fontSize = '19px'
        }
        // change font size
        document.querySelector('html').style.fontSize = fontSize
    })
})
/*===== PRIMARY COLORS =====*/
//Remove active class
const removeColorSelector = () => {
    colorPallete.forEach(ColorPicked => {
        ColorPicked.classList.remove('active')
    })
}

colorPallete.forEach(color => {
    color.addEventListener("click", () => {
        let primaryHue
        removeColorSelector()
        if (color.classList.contains('color-1')) {
            primaryHue = 252
        }
        else if (color.classList.contains('color-2')) {
            primaryHue = 52
        }
        else if (color.classList.contains('color-3')) {
            primaryHue = 352
        }
        else if (color.classList.contains('color-4')) {
            primaryHue = 152
        }
        else if (color.classList.contains('color-5')) {
            primaryHue = 202
        }
        color.classList.add('active')
        root.style.setProperty('--primary-color-hue', primaryHue)
    })
})
/*===== THEME BACKGROUNDS =====*/
let lightLightness
let whiteLightness
let darkLightness

// Change the theme
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightLightness)
    root.style.setProperty('--white-color-lightness', whiteLightness)
    root.style.setProperty('--dark-color-lightness', darkLightness)
}
bg1.addEventListener('click', () => {

    darkLightness = '17%'
    whiteLightness = '100%'
    lightLightness = '92%'
    // add active class
    bg1.classList.add('active')
    // remove active class from the others
    bg2.classList.remove('active')
    changeBG()
})
bg2.addEventListener('click', () => {
    darkLightness = '95%'
    whiteLightness = '20%'
    lightLightness = '15%'

    // add active class
    bg2.classList.add('active')
    // remove active class from the others
    bg1.classList.remove('active')
    changeBG()
})

/*===== EMAIL =====*/
function validate() {
    let name = document.querySelector('.name')
    let email = document.querySelector('.email')
    let msg = document.querySelector('.msg')
    let sendMail = document.querySelector('.send')

    sendMail.addEventListener('click', (e) => {
        e.preventDefault()
        if (name.value == '' || email.value == '' || msg.value == '') {
            emptyError()
        } else {
            sendEmail(name.value, email.value, msg.value)
            success()
            document.getElementById('form').reset()
        }
    })
}

validate();

function sendEmail(name, email, msg) {
    emailjs.send("service_hyss0pw", "template_s035qtq", {
        to_name: name,
        from_name: email,
        message: msg,
    });
}

function emptyError() {
    swal({
        title: "Oh No...",
        text: "Fields cannot be empty!",
        icon: "error",
    });
}

function success() {
    swal({
        title: "Email Sent",
        text: "I will contact you within 48 hours.",
        icon: "success",
    });
}