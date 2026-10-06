/* =====================================================
   AUTOLITE
   COMPLETE INTERACTIVE JAVASCRIPT
===================================================== */

"use strict";


/* =====================================================
   DOM HELPERS
===================================================== */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =====================================================
   STORAGE
===================================================== */

const STORAGE = {

    theme: "autolite_theme",

    enquiries: "autolite_enquiries",

    favorites: "autolite_favorites",

    newsletter: "autolite_newsletter"

};


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader = $("#pageLoader");

    setTimeout(() => {

        loader?.classList.add("loaded");

    }, 600);

});


/* =====================================================
   HEADER
===================================================== */

const header = $("#header");

function handleHeaderScroll() {

    if (!header) return;

    header.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

}

window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

menuToggle?.addEventListener("click", () => {

    const isOpen =
        navLinks?.classList.toggle("open");

    document.body.classList.toggle(
        "menu-open",
        !!isOpen
    );

    menuToggle.classList.toggle(
        "active",
        !!isOpen
    );

    const icon =
        menuToggle.querySelector("i");

    if (icon) {

        icon.className =
            isOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";

    }

});


$$(".navlinks a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks?.classList.remove("open");

        document.body.classList.remove(
            "menu-open"
        );

        menuToggle?.classList.remove(
            "active"
        );

        const icon =
            menuToggle?.querySelector("i");

        if (icon) {

            icon.className =
                "fa-solid fa-bars";

        }

    });

});


/* =====================================================
   THEME
===================================================== */

const themeToggle = $("#themeToggle");

function updateThemeIcon() {

    const icon =
        themeToggle?.querySelector("i");

    if (!icon) return;

    const light =
        document.body.classList.contains(
            "light-theme"
        );

    icon.className =
        light
            ? "fa-solid fa-moon"
            : "fa-solid fa-sun";

}


function applySavedTheme() {

    const theme =
        localStorage.getItem(
            STORAGE.theme
        );

    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }

    updateThemeIcon();

}


themeToggle?.addEventListener("click", () => {

    document.body.classList.toggle(
        "light-theme"
    );

    const theme =
        document.body.classList.contains(
            "light-theme"
        )
            ? "light"
            : "dark";

    localStorage.setItem(
        STORAGE.theme,
        theme
    );

    updateThemeIcon();

    showToast(
        theme === "light"
            ? "Light theme enabled."
            : "Dark theme enabled."
    );

});

applySavedTheme();


/* =====================================================
   SEARCH PANEL
===================================================== */

const searchToggle = $("#searchToggle");
const searchPanel = $("#searchPanel");
const closeSearch = $("#closeSearch");
const searchInput = $("#searchInput");

searchToggle?.addEventListener("click", () => {

    searchPanel?.classList.toggle("open");

    if (
        searchPanel?.classList.contains(
            "open"
        )
    ) {

        setTimeout(() => {

            searchInput?.focus();

        }, 300);

    }

});


closeSearch?.addEventListener("click", () => {

    searchPanel?.classList.remove("open");

    if (searchInput) {

        searchInput.value = "";

    }

    filterCars();

});


searchInput?.addEventListener(
    "input",
    filterCars
);


searchInput?.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            searchInput.value = "";

            filterCars();

            searchPanel?.classList.remove(
                "open"
            );

        }

    }
);


/* =====================================================
   CAR DATA
===================================================== */

const carData = {

    "Mercedes AMG GT": {

        price: "₹2.75 Cr",

        image:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=90",

        specs: [

            ["577 HP", "Power"],

            ["AWD", "Drive"],

            ["3.1s", "0–100 km/h"]

        ],

        description:
            "The Mercedes-AMG GT combines grand-touring luxury with serious performance, delivering an unmistakable AMG character and a refined premium cabin."

    },


    "BMW M8 Competition": {

        price: "₹2.44 Cr",

        image:
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=90",

        specs: [

            ["617 HP", "Power"],

            ["AWD", "Drive"],

            ["3.0s", "0–100 km/h"]

        ],

        description:
            "The BMW M8 Competition brings together executive luxury and high-performance engineering with a powerful V8 and intelligent all-wheel drive."

    },


    "Audi RS7": {

        price: "₹1.68 Cr",

        image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=90",

        specs: [

            ["591 HP", "Power"],

            ["Quattro", "Drive"],

            ["3.4s", "0–100 km/h"]

        ],

        description:
            "The Audi RS7 combines dramatic styling, advanced technology and quattro all-wheel drive."

    },


    "Porsche 911 Carrera": {

        price: "₹2.05 Cr",

        image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90",

        specs: [

            ["379 HP", "Power"],

            ["RWD", "Drive"],

            ["4.0s", "0–100 km/h"]

        ],

        description:
            "The Porsche 911 Carrera balances everyday usability with iconic sports-car performance."

    },


    "Lamborghini Huracán": {

        price: "₹4.00 Cr",

        image:
            "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=90",

        specs: [

            ["631 HP", "Power"],

            ["AWD", "Drive"],

            ["2.9s", "0–100 km/h"]

        ],

        description:
            "The Lamborghini Huracán delivers dramatic Italian styling and an unmistakable supercar experience."

    },


    "Ferrari 296 GTB": {

        price: "₹6.20 Cr",

        image:
            "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=90",

        specs: [

            ["819 HP", "Power"],

            ["RWD", "Drive"],

            ["2.9s", "0–100 km/h"]

        ],

        description:
            "The Ferrari 296 GTB combines a high-performance hybrid powertrain with compact proportions and Ferrari character."

    },


    "Mercedes S-Class": {

        price: "₹1.80 Cr",

        image:
            "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1400&q=90",

        specs: [

            ["429 HP", "Power"],

            ["AWD", "Drive"],

            ["4.8s", "0–100 km/h"]

        ],

        description:
            "The Mercedes-Benz S-Class focuses on sophisticated comfort, advanced technology and refined luxury."

    },


    "Bentley Continental GT": {

        price: "₹5.90 Cr",

        image:
            "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=90",

        specs: [

            ["542 HP", "Power"],

            ["AWD", "Drive"],

            ["4.0s", "0–100 km/h"]

        ],

        description:
            "The Bentley Continental GT blends handcrafted luxury with powerful grand-touring performance."

    }

};


/* =====================================================
   CAR FILTER
===================================================== */

const carCards =
    $$(".car-card");

const filterButtons =
    $$(".filter");

const carCount =
    $("#carCount");

const emptyCars =
    $("#emptyCars");

let activeFilter = "all";


function filterCars() {

    const searchTerm =
        searchInput?.value
            .trim()
            .toLowerCase() || "";

    let visibleCount = 0;


    carCards.forEach(card => {

        const brand =
            card.dataset.brand
                ?.toLowerCase() || "";

        const name =
            card.dataset.name
                ?.toLowerCase() || "";

        const category =
            card.dataset.category
                ?.toLowerCase() || "";


        const matchesBrand =
            activeFilter === "all" ||
            brand === activeFilter;


        const matchesSearch =
            !searchTerm ||
            name.includes(searchTerm) ||
            brand.includes(searchTerm) ||
            category.includes(searchTerm);


        const visible =
            matchesBrand &&
            matchesSearch;


        card.classList.toggle(
            "hidden",
            !visible
        );


        if (visible) {

            visibleCount++;

        }

    });


    if (carCount) {

        carCount.textContent =
            visibleCount;

    }


    emptyCars?.classList.toggle(
        "show",
        visibleCount === 0
    );

}


/* =====================================================
   FILTER BUTTONS
===================================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            activeFilter =
                button.dataset.filter ||
                "all";


            filterCars();

        }
    );

});


/* =====================================================
   FAVORITES
===================================================== */

function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem(
                STORAGE.favorites
            ) || "[]"
        );

    } catch {

        return [];

    }

}


function saveFavorites(
    favorites
) {

    localStorage.setItem(
        STORAGE.favorites,
        JSON.stringify(favorites)
    );

}


function setupFavorites() {

    const favorites =
        getFavorites();


    $$(".heart-btn").forEach(
        button => {

            const card =
                button.closest(
                    ".car-card"
                );

            const carName =
                card?.dataset.name;


            if (!carName) return;


            if (
                favorites.includes(
                    carName
                )
            ) {

                button.classList.add(
                    "favorited"
                );

                button.textContent =
                    "♥";

            }


            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const current =
                        getFavorites();


                    const index =
                        current.indexOf(
                            carName
                        );


                    if (index === -1) {

                        current.push(
                            carName
                        );

                        button.classList.add(
                            "favorited"
                        );

                        button.textContent =
                            "♥";


                        showToast(
                            `${carName} added to favorites.`
                        );

                    } else {

                        current.splice(
                            index,
                            1
                        );

                        button.classList.remove(
                            "favorited"
                        );

                        button.textContent =
                            "♡";


                        showToast(
                            `${carName} removed from favorites.`
                        );

                    }


                    saveFavorites(current);

                }
            );

        }
    );

}

setupFavorites();


/* =====================================================
   MODAL
===================================================== */

const detailsModal =
    $("#detailsModal");

const modalImage =
    $("#modalImage");

const modalTitle =
    $("#modalTitle");

const modalPrice =
    $("#modalPrice");

const modalSpecs =
    $("#modalSpecs");

const modalDescription =
    $("#modalDescription");

const modalEnquiryBtn =
    $("#modalEnquiryBtn");


function openCarModal(
    carName
) {

    const data =
        carData[carName];


    if (!data) {

        showToast(
            "Vehicle information unavailable."
        );

        return;

    }


    if (modalImage) {

        modalImage.style.backgroundImage =
            `url("${data.image}")`;

    }


    if (modalTitle) {

        modalTitle.textContent =
            carName;

    }


    if (modalPrice) {

        modalPrice.textContent =
            data.price;

    }


    if (modalDescription) {

        modalDescription.textContent =
            data.description;

    }


    if (modalSpecs) {

        modalSpecs.innerHTML =
            data.specs
                .map(
                    spec => `
                        <div class="modal-spec">
                            <strong>
                                ${escapeHTML(spec[0])}
                            </strong>

                            <span>
                                ${escapeHTML(spec[1])}
                            </span>
                        </div>
                    `
                )
                .join("");

    }


    if (modalEnquiryBtn) {

        modalEnquiryBtn.dataset.car =
            carName;

    }


    detailsModal?.classList.add(
        "open"
    );

    detailsModal?.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeCarModal() {

    detailsModal?.classList.remove(
        "open"
    );

    detailsModal?.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


$$("[data-details]").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                openCarModal(
                    button.dataset.car
                );

            }
        );

    }
);


$$("[data-close-modal]").forEach(
    button => {

        button.addEventListener(
            "click",
            closeCarModal
        );

    }
);


$(".modal-backdrop")?.addEventListener(
    "click",
    closeCarModal
);


/* =====================================================
   MODAL ENQUIRY
===================================================== */

modalEnquiryBtn?.addEventListener(
    "click",
    () => {

        const car =
            modalEnquiryBtn.dataset.car;

        closeCarModal();

        const carSelect =
            $("#car");


        if (
            carSelect &&
            car
        ) {

            const option =
                [...carSelect.options]
                    .find(
                        item =>
                            item.textContent.trim()
                            === car
                    );


            if (option) {

                carSelect.value =
                    option.textContent;

            }

        }


        $("#contact")?.scrollIntoView({
            behavior: "smooth"
        });


        setTimeout(
            () => {

                $("#name")?.focus();

            },
            700
        );

    }
);


/* =====================================================
   FORM
===================================================== */

const enquiryForm =
    $("#enquiryForm");

const nameInput =
    $("#name");

const emailInput =
    $("#email");

const phoneInput =
    $("#phone");

const messageInput =
    $("#message");

const messageCount =
    $("#messageCount");


function updateCharacterCount() {

    if (
        !messageInput ||
        !messageCount
    ) return;

    messageCount.textContent =
        messageInput.value.length;

}

messageInput?.addEventListener(
    "input",
    updateCharacterCount
);

updateCharacterCount();


/* =====================================================
   VALIDATION
===================================================== */

function setFieldError(
    input,
    errorElement,
    message
) {

    input?.classList.add(
        "invalid"
    );

    if (errorElement) {

        errorElement.textContent =
            message;

    }

}


function clearFieldError(
    input,
    errorElement
) {

    input?.classList.remove(
        "invalid"
    );

    if (errorElement) {

        errorElement.textContent =
            "";

    }

}


function validateName() {

    const value =
        nameInput?.value.trim() || "";

    if (value.length < 2) {

        setFieldError(
            nameInput,
            $("#nameError"),
            "Please enter your name."
        );

        return false;

    }

    clearFieldError(
        nameInput,
        $("#nameError")
    );

    return true;

}


function validateEmail() {

    const value =
        emailInput?.value.trim() || "";

    const valid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(value);


    if (!valid) {

        setFieldError(
            emailInput,
            $("#emailError"),
            "Enter a valid email address."
        );

        return false;

    }


    clearFieldError(
        emailInput,
        $("#emailError")
    );

    return true;

}


function validatePhone() {

    const value =
        phoneInput?.value.trim() || "";

    const valid =
        /^[0-9]{10}$/.test(value);


    if (!valid) {

        setFieldError(
            phoneInput,
            $("#phoneError"),
            "Enter a valid 10-digit number."
        );

        return false;

    }


    clearFieldError(
        phoneInput,
        $("#phoneError")
    );

    return true;

}


nameInput?.addEventListener(
    "blur",
    validateName
);

emailInput?.addEventListener(
    "blur",
    validateEmail
);

phoneInput?.addEventListener(
    "blur",
    validatePhone
);


/* =====================================================
   PHONE
===================================================== */

phoneInput?.addEventListener(
    "input",
    () => {

        phoneInput.value =
            phoneInput.value
                .replace(/\D/g, "")
                .slice(0, 10);

    }
);


/* =====================================================
   ENQUIRIES STORAGE
===================================================== */

function getEnquiries() {

    try {

        return JSON.parse(
            localStorage.getItem(
                STORAGE.enquiries
            ) || "[]"
        );

    } catch {

        return [];

    }

}


function saveEnquiries(
    enquiries
) {

    localStorage.setItem(
        STORAGE.enquiries,
        JSON.stringify(enquiries)
    );

}


/* =====================================================
   FORM SUBMIT
===================================================== */

enquiryForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const valid =
            validateName() &&
            validateEmail() &&
            validatePhone();


        if (!valid) {

            const invalid =
                $(".invalid");

            invalid?.focus();

            invalid?.classList.add(
                "shake"
            );


            setTimeout(
                () => {

                    invalid?.classList.remove(
                        "shake"
                    );

                },
                400
            );


            showToast(
                "Please correct the highlighted fields."
            );

            return;

        }


        const formData =
            new FormData(
                enquiryForm
            );


        const now =
            new Date();


        const enquiry = {

            id:
                `AL-${Date.now()
                    .toString()
                    .slice(-6)}`,

            name:
                String(
                    formData.get("name") || ""
                ).trim(),

            email:
                String(
                    formData.get("email") || ""
                ).trim(),

            phone:
                String(
                    formData.get("phone") || ""
                ).trim(),

            car:
                String(
                    formData.get("car") || ""
                ),

            message:
                String(
                    formData.get("message") || ""
                ).trim(),

            date:
                now.toISOString(),

            readableDate:
                formatDate(now)

        };


        const enquiries =
            getEnquiries();


        enquiries.unshift(
            enquiry
        );


        saveEnquiries(
            enquiries
        );


        enquiryForm.reset();

        updateCharacterCount();

        renderEnquiries();

        updateDashboard();


        showToast(
            "Enquiry saved successfully."
        );


        $("#enquiries")?.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =====================================================
   DATE
===================================================== */

function formatDate(date) {

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    ).format(date);

}


/* =====================================================
   RENDER ENQUIRIES
===================================================== */

function renderEnquiries() {

    const table =
        $("#enquiryTable");


    if (!table) return;


    const enquiries =
        getEnquiries();


    if (!enquiries.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="text-align:center;padding:35px;"
                >

                    No enquiries yet.

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        enquiries
            .map(
                enquiry => `

                    <tr>

                        <td>
                            ${escapeHTML(
                                enquiry.id
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                enquiry.name
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                enquiry.email
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                enquiry.phone
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                enquiry.car
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                enquiry.readableDate ||
                                formatDate(
                                    new Date(
                                        enquiry.date
                                    )
                                )
                            )}
                        </td>

                        <td>

                            <button
                                class="delete-row"
                                data-delete-id="${escapeHTML(
                                    enquiry.id
                                )}"
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                `
            )
            .join("");


    $$(".delete-row", table)
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteEnquiry(
                            button.dataset.deleteId
                        );

                    }
                );

            }
        );

}


/* =====================================================
   DELETE
===================================================== */

function deleteEnquiry(id) {

    if (
        !window.confirm(
            "Delete this enquiry?"
        )
    ) return;


    const enquiries =
        getEnquiries()
            .filter(
                enquiry =>
                    enquiry.id !== id
            );


    saveEnquiries(
        enquiries
    );


    renderEnquiries();

    updateDashboard();


    showToast(
        "Enquiry deleted."
    );

}


$("#deleteAllBtn")
    ?.addEventListener(
        "click",
        () => {

            const enquiries =
                getEnquiries();


            if (!enquiries.length) {

                showToast(
                    "There are no enquiries."
                );

                return;

            }


            if (
                !window.confirm(
                    "Delete ALL saved enquiries?"
                )
            ) return;


            localStorage.removeItem(
                STORAGE.enquiries
            );


            renderEnquiries();

            updateDashboard();


            showToast(
                "All enquiries deleted."
            );

        }
    );


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    const enquiries =
        getEnquiries();


    const total =
        $("#totalEnquiries");

    const latestCar =
        $("#latestCar");

    const latestDate =
        $("#latestDate");


    if (total) {

        total.textContent =
            enquiries.length;

    }


    if (!enquiries.length) {

        if (latestCar) {

            latestCar.textContent =
                "—";

        }

        if (latestDate) {

            latestDate.textContent =
                "—";

        }

        return;

    }


    const latest =
        enquiries[0];


    if (latestCar) {

        latestCar.textContent =
            latest.car || "—";

    }


    if (latestDate) {

        latestDate.textContent =
            latest.readableDate ||
            formatDate(
                new Date(
                    latest.date
                )
            );

    }

}


renderEnquiries();

updateDashboard();


/* =====================================================
   CSV EXPORT
===================================================== */

$("#exportBtn")
    ?.addEventListener(
        "click",
        () => {

            const enquiries =
                getEnquiries();


            if (!enquiries.length) {

                showToast(
                    "No enquiries available."
                );

                return;

            }


            const headers = [

                "ID",
                "Name",
                "Email",
                "Phone",
                "Vehicle",
                "Message",
                "Date"

            ];


            const rows =
                enquiries.map(
                    enquiry => [

                        enquiry.id,

                        enquiry.name,

                        enquiry.email,

                        enquiry.phone,

                        enquiry.car,

                        enquiry.message,

                        enquiry.readableDate

                    ]
                );


            const csv = [

                headers
                    .map(csvEscape)
                    .join(","),

                ...rows.map(
                    row =>
                        row
                            .map(csvEscape)
                            .join(",")
                )

            ].join("\n");


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href = url;


            link.download =
                `autolite-enquiries-${new Date()
                    .toISOString()
                    .slice(0, 10)}.csv`;


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );


            showToast(
                "Enquiries exported as CSV."
            );

        }
    );


/* =====================================================
   COUNTERS
===================================================== */

const counters =
    $$(".counter");


function animateCounter(
    counter
) {

    const target =
        Number(
            counter.dataset.target || 0
        );


    const duration =
        1500;


    const start =
        performance.now();


    function update(
        current
    ) {

        const progress =
            Math.min(
                (current - start) /
                    duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        counter.textContent =
            Math.floor(
                target * eased
            );


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            counter.textContent =
                target;

        }

    }


    requestAnimationFrame(
        update
    );

}


/* =====================================================
   REVEAL
===================================================== */

const revealElements =
    $$(".reveal");


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(
        element =>
            observer.observe(
                element
            )
    );

} else {

    revealElements.forEach(
        element =>
            element.classList.add(
                "visible"
            )
    );

}


/* =====================================================
   COUNTER OBSERVER
===================================================== */

if (
    "IntersectionObserver"
    in window
) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );


                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .4
            }
        );


    counters.forEach(
        counter =>
            counterObserver.observe(
                counter
            )
    );

}


/* =====================================================
   ACTIVE NAV
===================================================== */

const sections =
    $$("main section[id]");

const navigationLinks =
    $$(".navlinks a");


if (
    "IntersectionObserver"
    in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;


                            navigationLinks
                                .forEach(
                                    link => {

                                        link.classList.toggle(
                                            "active",
                                            link.getAttribute(
                                                "href"
                                            ) ===
                                            `#${id}`
                                        );

                                    }
                                );

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            sectionObserver.observe(
                section
            )
    );

}


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    $("#backTop");


function updateBackTop() {

    backTop?.classList.toggle(
        "show",
        window.scrollY > 600
    );

}


window.addEventListener(
    "scroll",
    updateBackTop,
    {
        passive: true
    }
);


backTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCarModal();

            searchPanel?.classList.remove(
                "open"
            );

            navLinks?.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(
    message,
    icon = "✓"
) {

    const toast =
        $("#toast");

    const toastMessage =
        $("#toastMessage");

    const toastIcon =
        $("#toastIcon");


    if (!toast) return;


    if (toastMessage) {

        toastMessage.textContent =
            message;

    }


    if (toastIcon) {

        toastIcon.textContent =
            icon;

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3500
        );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   IMAGE FALLBACK
===================================================== */

$$("img").forEach(
    image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity =
                    "0";

            }
        );

    }
);


/* =====================================================
   INITIAL FILTER
===================================================== */

filterCars();

updateBackTop();


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%c AUTOLITE ",
    "background:#d9ad4b;color:#050a10;font-weight:bold;padding:6px 12px;"
);

console.log(
    "Premium Automotive Experience"
);
