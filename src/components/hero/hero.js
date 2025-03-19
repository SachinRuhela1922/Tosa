// File: tosa/src/components/hero/hero.js

class TosaHero extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // Get attributes (props) from the user
        const imageUrl = this.getAttribute("image") || "https://via.placeholder.com/600x400";
        const title = this.getAttribute("title") || "Welcome to Tosa!";
        const description = this.getAttribute("description") || "This is a customizable hero section.";
        const height = this.getAttribute("height") || "400px"; // Default height
        const btn1Text = this.getAttribute("btn1-text") || "Get Started";
        const btn1Link = this.getAttribute("btn1-link") || "#";
        const btn2Text = this.getAttribute("btn2-text") || "Learn More";
        const btn2Link = this.getAttribute("btn2-link") || "#";

        this.shadowRoot.innerHTML = `
            <style>
                .hero {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: ${height};
                    padding: 40px;
                    background: #f8f9fa;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    max-width: 1200px;
                    margin: auto;
                    gap: 20px;
                }
                .hero-content {
                    max-width: 50%;
                    flex: 1;
                }
                .hero-title {
                    font-size: 2.5rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .hero-description {
                    font-size: 1.2rem;
                    color: #555;
                    margin-bottom: 20px;
                }
                .hero-buttons {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                .hero-buttons a {
                    text-decoration: none;
                    padding: 10px 20px;
                    font-size: 1rem;
                    border-radius: 5px;
                    font-weight: bold;
                    display: inline-block;
                    text-align: center;
                }
                .btn-primary {
                    background: #007bff;
                    color: white;
                }
                .btn-secondary {
                    background: #6c757d;
                    color: white;
                }
                .hero-image {
                    flex: 1;
                    max-width: 50%;
                    text-align: center;
                }
                .hero-image img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 10px;
                }
                
                /* Responsive Design */
                @media (max-width: 900px) {
                    .hero {
                        flex-direction: column;
                        text-align: center;
                        height: auto;
                        padding: 20px;
                    }
                    .hero-content, .hero-image {
                        max-width: 100%;
                    }
                    .hero-buttons {
                        justify-content: center;
                    }
                    .hero-title {
                        font-size: 2rem;
                    }
                    .hero-description {
                        font-size: 1rem;
                    }
                    .hero-buttons a {
                        width: 100%;
                        max-width: 200px;
                    }
                }
            </style>

            <div class="hero">
                <div class="hero-content">
                    <h1 class="hero-title">${title}</h1>
                    <p class="hero-description">${description}</p>
                    <div class="hero-buttons">
                        <a href="${btn1Link}" class="btn-primary">${btn1Text}</a>
                        <a href="${btn2Link}" class="btn-secondary">${btn2Text}</a>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="${imageUrl}" alt="Hero Image">
                </div>
            </div>
        `;
    }
}

customElements.define("tosa-hero", TosaHero);
