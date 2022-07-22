async function include(file) {
    const response = await fetch(file);
    return await response.text();
}

const files = document.querySelectorAll('[data-component]');

files.forEach(async file => {
    file.innerHTML = await include(`./views/${file.dataset['component']}.html`);
    if (file.dataset['component'] === 'youtube__main') {
        Filter();
    } else {
        const input = document.querySelector('.youtube__heading-search_text input');
        const del = document.querySelector('.youtube__heading-search_text-delete');
        const override = document.querySelector('.override');
        input.onfocus = function() {
            if (!this.previousElementSibling) this.before(Img('./assets/images/header/search.svg'));
            this.parentElement.style.borderColor = '#065fd4';
        }
        input.onblur = function() {
            this.previousElementSibling.remove();
            this.parentElement.style.borderColor = 'var(--border-clr)';
        }
        input.oninput = function() {
            this.value ? override.style.zIndex = -1 : override.style.zIndex = 1;
        }
        del.onclick = _ => (input.value = '', input.focus(), override.style.zIndex = 1);
    }
});

const aside = document.querySelector('.youtube__aside');
const info = [
    ['./assets/images/aside/kabab.svg', ''],
    ['./assets/images/aside/home-active.svg', "Home"],
    ['./assets/images/aside/explore.svg', "Explore"],
    ['./assets/images/aside/shorts.svg', "Shorts"],
    ['./assets/images/aside/subscribes.svg', "Subscriptions"],
    ['./assets/images/aside/library.svg', "Library"],
]
info.forEach(item => aside.appendChild(A(item[0], item[1])));

const blur = document.querySelector('.blur');
let aside__a = document.querySelectorAll('.youtube__aside a:not(:first-child)');
const itema = document.querySelector('a.item:nth-child(1)');
const even = function(e) {
    e.preventDefault();
    const logo = document.querySelector('.youtube__heading-logo');
    const a = logo.cloneNode();
    a.innerHTML = logo.innerHTML;
    
    itema.parentElement.style.width = itema.parentElement.style.width === "15rem" ? "4.5rem" : "15rem";
    if (itema.parentElement.style.width === "15rem") {
        itema.appendChild(a);
        blur.style.zIndex = '3';
    } else {
        itema.removeChild(itema.children[1]);
        blur.style.zIndex = '-3';
    }
        
    const info = [
        ['/assets/images/aside/history.svg', "history"],
        ['/assets/images/aside/my_videos.svg', "your videos"],
        ['/assets/images/aside/later.svg', "watch later"],
        ['/assets/images/aside/like.svg', "Liked videos"],
        ['/assets/images/aside/down.svg', "Show more"],
        ['/assets/images/aside/game.svg', "Gaming"],
        ['/assets/images/aside/live.svg', "Live"],
        ['/assets/images/aside/sports.svg', "Sports"],
        ['/assets/images/aside/settings.svg', "Settings"],
        ['/assets/images/aside/report.svg', "Report"],
        ['/assets/images/aside/help.svg', "Help"],
        ['/assets/images/aside/feedback.svg', "Send feedback"],
    ]
    if (itema.classList.toggle('click')) {
        info.forEach(item => {
            aside.appendChild(A(item[0], item[1]));
        })
    } else {
        info.forEach(item => {
            (document.querySelector(`.item > img[src='${'http://' + window.location.host + item[0]}']`) || document.querySelector(`.item > img[src='${'http://' + window.location.host + item[0].replace('.svg', '-active.svg')}']`)).parentElement.remove();
        })
    }
    
    aside__a = document.querySelectorAll('.youtube__aside a:not(:first-child)');
    aside__a.forEach(a => {
        a.classList.toggle('active');
        a.onclick = function() {
            aside__a.forEach(a => {
                a.children[0].src = a.children[0].src.replace('-active', '');
            })
            this.children[0].src = this.children[0].src.replace('.svg', '-active.svg');
            return false;
        }
    })
};
document.querySelector('.youtube__aside a').onclick = _ => false;
blur.onclick = even;
itema.onclick = even;

aside__a.forEach(a => {
    a.onclick = function() {
        aside__a.forEach(a => {
            a.children[0].src = a.children[0].src.replace('-active', '');
        })
        this.children[0].src = this.children[0].src.replace('.svg', '-active.svg');
        return false;
    }
})

const nav = document.querySelector('.youtube__nav');
nav.appendChild(Nav('All', 'active'));
nav.appendChild(Nav('JavaScript'));
nav.appendChild(Nav('Python'));
nav.appendChild(Nav('Website'));
nav.appendChild(Nav('Calculus'));

const lis = document.querySelectorAll('.youtube__nav li');
lis.forEach(li => {
    li.onclick = function() {
        lis.forEach(li => {
            li.removeAttribute('class');
        })
        this.classList = 'active';
    }
})

window.onclick = e => {
    if (!e.target.hasAttribute('onclick')) {
        document.querySelectorAll(`.youtube__heading-icons_icon img`).forEach(img => {
            img.src = img.src.replace('-active', '');
        })
    }
}

// Functions
function Nav(text, className="") {
    const li = document.createElement('li');
    li.innerText = text;
    li.className = className;
    li.addEventListener('click', Filter);
    return li;
}

function Img(src, className="") {
    const img = document.createElement('img');
    img.src = src;
    img.className = className;
    img.style = arguments[2];
    return img;
}

function A(src, text="", className="") {
    let a = document.createElement('a');
    a.className = 'item';
    a.href = '.';
    if (className) a.classList.add(className);
    a.appendChild(Img(src, "", "width: 1rem;height: 1rem"));
    if (text) {
        let p = document.createElement('p');
        p.innerText = text;
        a.appendChild(p);
    }
    return a;
}

async function Filter(target="All") {
    if ( target === "All" || this.innerText === "All") document.querySelectorAll('div.item').forEach(item => item.style.display = 'block');
    else{
        document.querySelectorAll('div.item').forEach(item => item.style.display = 'none');
        document.querySelectorAll(`#${this.innerText}`).forEach(item => item.style.display = 'block');
    }
}

function omar(e) {
    document.querySelectorAll(`.${e.parentElement.className}`).forEach(div => {
        div.firstElementChild.src = div.firstElementChild.src.replace('-active', '');
    })
    e.src = e.src.includes("-active") ? e.src.replace('-active', '') : e.src.replace('.svg', '-active.svg');
}

/**
 * api github content file
 * https://raw.githubusercontent.com/OmarJouied/{repo}/main/{path}
 * https://raw.githubusercontent.com/OmarJouied/elzero/main/index.html
 */

// let res = new XMLHttpRequest();
// res.open('GET', 'https://raw.githubusercontent.com/OmarJouied/kasper/main/index.html');
// res.send();

// console.log(res);
// setTimeout(() => {
//     console.log(res.response.replace('\n', '').match(/<head>\.+<\/head>|\n/gi)[0]);
//     // document.head.innerHTML = res.response.match(/(?=<head>).+(?=<\/head>)/im);
// }, 1000);
