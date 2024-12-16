// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog', href: '#', subLinks: [
            { text: 'all', href: '/catalog/all' },
            { text: 'top selling', href: '/catalog/top' },
            { text: 'search', href: '/catalog/search' },
        ]
    },
    {
        text: 'orders', href: '#', subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account', href: '#', subLinks: [
            { text: 'profile', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];


// 1. Select and cache the <main> element in a variable named mainEl.
let mainEl = document.querySelector("main");

//2. Set the background color of mainEl to the value stored in the --main-bg CSS custom property; Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.

mainEl.style.backgroundColor = 'var(--main-bg)';

//3. Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; 
// pick whichever one that you think works best in this situation.
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;

//4. Add a class of flex-ctr to mainEl.
//Hint: Use the Element.classList API.
mainEl.classList.add('flex-ctr');

//PART 2:
// 1. Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.

let topMenuEl = document.querySelector("#top-menu")
//console.log(topMenuEl);
//2.
topMenuEl.style.height = "100%";

//3.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'

//4. 
topMenuEl.classList.add('flex-around');

//PART3/
//1.
//2.
//3.
//4.
for (let i = 0; i < menuLinks.length; i++) {
    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", menuLinks[i].href)
    linkElement.textContent = (menuLinks[i].text);
    topMenuEl.appendChild(linkElement);
    //console.log(linkElement);
}

//PART3: Creating the submenu
//1. Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
let subMenuEl = document.getElementById("sub-menu");
//console.log("subMenuEl Element: ", subMenuEl )
//2.
subMenuEl.style.height = "100%";

//3.
topMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

//4.
subMenuEl.classList.add('flex-around');

//setting position properties
//1.
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

//Adding Menu Interaction
//Select and cache the all of the <a> elements inside of 
// topMenuEl in a variable named topMenuLinks.
let topMenuLinks = topMenuEl.querySelectorAll("#top-menu a");
let submenuLinks = {};

/*2. Attach a delegated 'click' event listener to topMenuEl.
The first line of code of the event listener function should call the event object's preventDefault() method.
The second line of code of the function should immediately return if the element clicked was not an <a> element.
Log the content of the <a> to verify the handler is working.*/

topMenuEl.addEventListener("click", function(event) {
    event.preventDefault();
    if(!event.target.matches("a")) {
      return;
    }
    const z = event.target;
    
    topMenuLinks.forEach((link) => {
      link.classList.remove("active");
    });

    z.classList.toggle("active");
    //console.log(z); //clicking ABOUT, CATALOG, etc. will log about, catalog, etc. when a link is clicked. 
    // Clicking anywhere other than on a link should do nothing.
    
    //Part 5: Adding Submenu Interaction

    const clickedLinkObject = menuLinks.find((linkObject) => linkObject.text === z.textContent);
    //searching through the array, and checking to see if text property matches the text content of the element z from earlier.
 
    if (clickedLinkObject && clickedLinkObject.subLinks) {
      if (submenuLinks[clickedLinkObject.text]) {
        subMenuEl.style.top = "0";  
        subMenuEl.innerHTML = ''; 
        submenuLinks[clickedLinkObject.text] = false;
      } else {
        subMenuEl.style.top = "100%"; 
        buildSubmenu(clickedLinkObject.subLinks);
        submenuLinks[clickedLinkObject.text] = true;
      }
    } else {
      subMenuEl.style.top = "0";
      subMenuEl.innerHTML = ''; 
    }
  
    if (event.target.textContent === "about") {
      mainEl.innerHTML = "<h1>About</h1>";
    } else {
      mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
    }
    // Log the content of the <a> to verify the handler is working.
    //console.log("Clicked link text: ", event.target.textContent);
})

function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = '';
    for (let link of subLinks) {
      let subLinkElement = document.createElement("a");
      subLinkElement.setAttribute("href", link.href);
      subLinkElement.textContent = link.text;
      subMenuEl.appendChild(subLinkElement);
    }
  }
  
  subMenuEl.addEventListener("click", (event) => {
    event.preventDefault();
    if(!event.target.matches("a")) {
      return;
    }
    subMenuEl.style.top = "0";
    topMenuLinks.forEach((link) => {
      link.classList.remove("active");
    });
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
  
    // Log the content of the <a> to verify the handler is working.
    console.log("Clicked link text: ", event.target.textContent);
  })
