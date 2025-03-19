// File: sato/src/components/navbar/navbar.js

class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        // Get props from attributes
        const bgcolor = this.getAttribute("bgcolor") || "#333";
        const textcolor = this.getAttribute("textcolor") || "white";
        const logoText = this.getAttribute("logo") || "Sato"; // User-defined logo text
        const links = this.getAttribute("links")
            ? JSON.parse(this.getAttribute("links"))
            : [
                { name: "Home", url: "#" },
                { name: "About", url: "#" },
                { name: "Services", url: "#" },
                { name: "Contact", url: "#" },
              ];

        // Generate dynamic menu items
        const menuItems = links
            .map((link) => `<li><a href="${link.url}">${link.name}</a></li>`)
            .join("");

        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 20px;
                    background-color: ${bgcolor};
                    color: ${textcolor};
                    position: relative;
                }
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: ${textcolor};
                }
                .menu {
                    display: flex;
                    list-style: none;
                    gap: 15px;
                    margin: 0;
                    padding: 0;
                }
                .menu li a {
                    color: ${textcolor};
                    text-decoration: none;
                    font-size: 1rem;
                }
                .menu li a:hover {
                    text-decoration: underline;
                }

                /* Hamburger Menu */
                .menu-toggle {
                    display: none;
                    flex-direction: column;
                    cursor: pointer;
                }
                .bar {
                    width: 25px;
                    height: 3px;
                    background-color: ${textcolor};
                    margin: 4px 0;
                    transition: 0.3s;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .menu-toggle {
                        display: flex;
                    }
                    .menu {
                        display: none;
                        flex-direction: column;
                        width: 100%;
                        position: absolute;
                        top: 50px;
                        left: 0;
                        background-color: ${bgcolor};
                        text-align: center;
                        padding: 10px 0;
                    }
                    .menu.active {
                        display: flex;
                    }
                }
            </style>
            <nav>
                <div class="logo">${logoText}</div>
                <div class="menu-toggle">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                <ul class="menu">
                    ${menuItems}
                </ul>
            </nav>
        `;
    }

    addEventListeners() {
        const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
        const menu = this.shadowRoot.querySelector('.menu');

        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}

customElements.define("tosa-navbar", Navbar);
