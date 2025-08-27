'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
//modalCloseBtn.addEventListener("click", testimonialsModalFunc);
//overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
// Generic Filter Function
const filterFunc = (selectedValue, filterItems) => {
    filterItems.forEach(item => {
        const category = item.dataset.category.toLowerCase();
        if (selectedValue === "all" || selectedValue === category) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
};

// Generic select and filter handler
function setupSelectFilter({
    selectElement,
    selectItems,
    selectValueElement,
    filterButtons,
    filterItems,
    isDataAttr = false
}) {
    let lastClickedBtn = filterButtons[0];

    selectElement.addEventListener("click", () => {
        elementToggleFunc(selectElement);
    });

    selectItems.forEach(item => {
        item.addEventListener("click", () => {
            const selectedValue = isDataAttr
                ? item.getAttribute(item.getAttributeNames().find(attr => attr.startsWith("data-select-item")))
                : item.innerText.toLowerCase();

            selectValueElement.innerText = item.innerText;
            elementToggleFunc(selectElement);
            filterFunc(selectedValue, filterItems);
        });
    });

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedValue = isDataAttr
                ? btn.getAttribute(btn.getAttributeNames().find(attr => attr.startsWith("data-filter-btn")))
                : btn.innerText.toLowerCase();

            selectValueElement.innerText = btn.innerText;
            filterFunc(selectedValue, filterItems);
            lastClickedBtn.classList.remove("active");
            btn.classList.add("active");
            lastClickedBtn = btn;
        });
    });
}

// Initialize for Projects
setupSelectFilter({
    selectElement: document.querySelector("[data-select]"),
    selectItems: document.querySelectorAll("[data-select-item]"),
    selectValueElement: document.querySelector("[data-select-value]"),
    filterButtons: document.querySelectorAll("[data-filter-btn]"),
    filterItems: document.querySelectorAll("[data-filter-item]")
});

// Initialize for Certifications
setupSelectFilter({
    selectElement: document.querySelector("[data-select1]"),
    selectItems: document.querySelectorAll("[data-select-item1]"),
    selectValueElement: document.querySelector("[data-select-value1]"),
    filterButtons: document.querySelectorAll("[data-filter-btn1]"),
    filterItems: document.querySelectorAll("[data-filter-item]"),
    isDataAttr: true
});



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.addEventListener("keydown", function (e) {
    // F12 or Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
    }
});
