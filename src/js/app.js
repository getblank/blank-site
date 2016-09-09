"use strict";
import React from "react";
import ReactDOM from "react-dom";
import Dialog from "./components/Dialog";
import SubscribeFormContainer from "./containers/SubscribeFormContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from "react-redux";
import { BLANK_URI } from "./const";
import store from "./store";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#26A69A",
        accent1Color: "#009688",
    },
});

let cMap = {
    "blank-dialog": Dialog,
    "subscribe-form": SubscribeFormContainer,
};

let state = store.getState();
for (let id of Object.keys(cMap)) {
    let e = document.getElementById(id);
    if (e == null) { continue }
    if (e.hasAttribute("data-auth") && (state.user == null || !state.user.APIKey)) { continue }
    ReactDOM.render(getThemedComponent(id), e);
}

function getThemedComponent(id) {
    let title = document.getElementById("title") || {};
    return <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            {React.createElement(cMap[id], { "title": title.innerHTML }) }
        </Provider>
    </MuiThemeProvider>;
}

//Menus
// document.addEventListener("click", e => {
//     let t = e.target;
//     while (t) {
//         let cl = t.className || "";
//         if (t.tagName === "UL" && cl.indexOf("menu") >= 0) {
//             return;
//         }
//         if (cl.indexOf("menu-opened") >= 0) {
//             return;
//         }
//         t = t.parentNode;
//     }
//     let menuState = store.getState().menus || {};
//     for (let m of Object.keys(menuState)) {
//         if (menuState[m]) {
//             store.dispatch(closeAllMenu());
//             return;
//         }
//     }
// });

// let menuToggles = document.querySelectorAll("[data-menu]");
// for (let i = 0; i < menuToggles.length; i++) {
//     let t = menuToggles[i];
//     let menu = t.getAttribute("data-menu");
//     let focusElement, focusElementId = t.getAttribute("data-focus");
//     if (focusElementId) {
//         focusElement = document.getElementById(focusElementId);
//     }
//     t.addEventListener("click", e => {
//         e.preventDefault();
//         e.stopPropagation();
//         focusElement && focusElement.focus();
//         store.dispatch(showMenu(menu));
//     });
// }

// let nav = document.getElementById("nav");
// store.subscribe(() => {
//     let state = store.getState();
//     if (state.menus.sidenav) {
//         nav.classList.add("opened-menu");
//     } else {
//         nav.classList.remove("opened-menu");
//     }
// });


//Legacy APP.JS
var last_known_scroll_position;
document.addEventListener("DOMContentLoaded", function (event) {
    initNav();
    initLightbox();
});

function initNav() {
    var ticking = false, maxScrolledPosition = 100, navbar = document.getElementById("navbar");
    window.addEventListener('scroll', updateScrollPosition);
    setInterval(updateScrollPosition, 200);

    var navLinks = document.querySelectorAll("[data-active-until]"), navLinkEndElements = [], navLinkStartElements = [];
    for (var i = 0; i < navLinks.length; i++) {
        var endId = navLinks[i].getAttribute("data-active-until");
        var endEl = document.getElementById(endId);
        navLinkEndElements.push(endEl || null);
        var startId = navLinks[i].getAttribute("data-active-after");
        var startEl = document.getElementById(startId);
        navLinkStartElements.push(startEl || null);
    }

    function updateScrollPosition() {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                checkScrolledClass(last_known_scroll_position);
                if (navbar.className.indexOf("blog") < 0) {
                    updateActiveLink();
                }
                ticking = false;
            });
        }
        ticking = true;
    }

    function checkScrolledClass(scrollPosition) {
        if (scrollPosition < maxScrolledPosition) {
            if (navbar.className.indexOf("expand") < 0) {
                navbar.classList.add("expand");
            }
        } else {
            if (navbar.className.indexOf("expand") >= 0 && navbar.className.indexOf("no-expand") < 0) {
                navbar.classList.remove("expand");
            }
        }
    }

    function updateActiveLink() {
        var found = false;
        for (var i = 0; i < navLinks.length; i++) {
            if (!found && isLinkActive(navLinkEndElements[i], navLinkStartElements[i])) {
                found = true;
                navLinks[i].classList.add("active");
            } else {
                navLinks[i].classList.remove("active");
            }
        }
    }

    function isLinkActive(endEl, startEl) {
        if (endEl == null) {
            return false;
        }
        if (startEl) {
            var sRect = startEl.getBoundingClientRect();
            if (sRect.top > (window.innerHeight || document.documentElement.clientHeight)) {
                return false;
            }
        }
        var rect = endEl.getBoundingClientRect();
        return rect.top >= (window.innerHeight || document.documentElement.clientHeight) / 2;
    }
}

function initLightbox() {
    var imgGroups = {}, currentGroup = [], currentUrl = "", lb, lbClose, lbBack, lbImgWrapper, lbImg;

    lb = document.getElementById("lightbox");
    if (lb == null) {
        return;
    }
    lbBack = lb.children[0];
    lbClose = lb.children[1];
    lbImgWrapper = lb.children[2];
    lbImg = lbImgWrapper.children[0];
    lbBack.addEventListener("click", prevImg);
    lb.addEventListener("click", hideLightbox);
    lbClose.addEventListener("click", hideLightbox);
    lbImg.addEventListener("click", nextImg);
    var images = document.querySelectorAll("[data-lb-url]");
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        var fullUrl = img.getAttribute("data-lb-url"),
            group = img.getAttribute("data-lb-group") || i.toString();
        if (fullUrl) {
            imgGroups[group] = imgGroups[group] || [];
            imgGroups[group].push(fullUrl);
            img.addEventListener("click", showLightbox.bind(this, group, fullUrl));
        }
    }

    setInterval(function () {
        if (window.innerWidth / window.innerHeight > 1.75) {
            lb.classList.add("v");
        } else {
            lb.classList.remove("v");
        }
    }, 300);

    function showLightbox(groupName, url) {
        lb.classList.remove("hidden");
        currentGroup = imgGroups[groupName];
        currentUrl = url || currentGroup[0];
        lbBack.style.visibility = currentGroup.length > 1 ? "visible" : "hidden";
        lbBack.style.visibility = currentGroup.length > 1 ? "visible" : "hidden";
        lbImg.setAttribute("src", currentUrl);
        document.addEventListener("keydown", keyDownHandler);
        disableScroll();
    }

    function hideLightbox() {
        lb.classList.add("hidden");
        currentUrl = "";
        lbImg.setAttribute("src", currentUrl);
        document.removeEventListener("keydown", keyDownHandler);
        enableScroll();
    }

    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function keyDownHandler(e) {
        if (e.keyCode === 27) {
            hideLightbox();
        }
        if (e.keyCode === 37) {
            prevImg(e);
        }
        if (e.keyCode === 39) {
            nextImg(e);
        }
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }


    function disableScroll() {
        window.addEventListener('DOMMouseScroll', preventDefault);
        window.addEventListener("wheel", preventDefault); // modern standard
        window.addEventListener("mousewheel", preventDefault); // older browsers, IE
        document.addEventListener("mousewheel", preventDefault); // older browsers, IE
        window.addEventListener("touchmove", preventDefault); // mobile
    }

    function enableScroll() {
        window.removeEventListener('DOMMouseScroll', preventDefault);
        window.removeEventListener("wheel", preventDefault);
        window.removeEventListener("mousewheel", preventDefault);
        document.removeEventListener("mousewheel", preventDefault);
        window.removeEventListener("touchmove", preventDefault);
    }

    function nextImg(e) {
        e.stopPropagation();
        var currentIndex = currentGroup.indexOf(currentUrl);
        if (currentIndex + 1 >= currentGroup.length) {
            currentIndex = -1;
        }
        currentUrl = currentGroup[currentIndex + 1];
        lbImg.setAttribute("src", currentUrl);
    }

    function prevImg(e) {
        e.stopPropagation();
        var nextIndex = currentGroup.indexOf(currentUrl) - 1;
        if (nextIndex < 0) {
            nextIndex = currentGroup.length - 1;
        }
        currentUrl = currentGroup[nextIndex];
        lbImg.setAttribute("src", currentUrl);
    }
}

function isElementInViewport(el) {
    if (typeof el === "string") {
        el = document.getElementById(el);
    }
    if (el == null) {
        return false;
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function scrollIntoView(eleID) {
    var e = document.getElementById(eleID);
    if (!!e && e.scrollIntoView) {
        e.scrollIntoView();
    }
}

function parseForm(form) {
    var res = {};
    for (var i = 0; i < form.elements.length; i++) {
        if (!form.elements[i].name) {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'tel':
                    case 'email':
                        res[form.elements[i].name] = form.elements[i].value;
                        break;
                    case 'checkbox':
                        res[form.elements[i].name] = !!form.elements[i].checked;
                        break;
                    case 'radio':
                        if (form.elements[i].checked) {
                            res[form.elements[i].name] = form.elements[i].value;
                        }
                        break;
                }
                break;
            case 'TEXTAREA':
            case 'SELECT':
                res[form.elements[i].name] = form.elements[i].value;
                break;
        }
    }
    return res;
}

function clearForm(form) {
    var res = {};
    for (var i = form.elements.length - 1; i >= 0; i--) {
        if (!form.elements[i].name) {
            continue;
        }
        var r = [];
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'checkbox':
                        form.elements[i].checked = false;
                        break;
                    case 'radio':
                        // if (r.indexOf(form.elements[i].name) < 0) {
                        //     r.push(form.elements[i].name);
                        //     form.elements[i].checked = true;
                        // } else {
                        //     form.elements[i].checked = false;
                        // }
                        break;
                    default:
                        form.elements[i].value = "";
                        break;
                }
                break;
            case 'TEXTAREA':
            case 'SELECT':
                form.elements[i].value = "";
                break;
        }
    }
    return res;
}

function showNotification(text, error) {
    var container = document.getElementById("notifications");
    var n = document.createElement("div");
    n.className = "notification" + (error ? " error" : "");
    n.innerHTML = "<div>" + text + "</div>";
    container.appendChild(n);
    setTimeout(function () {
        n.classList.add("show");
        setTimeout(function () {
            n.classList.remove("show");
            setTimeout(function () {
                container.removeChild(n);
            }, 400);
        }, 5000);
    }, 100);
}