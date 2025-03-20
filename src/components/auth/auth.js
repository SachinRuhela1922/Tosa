class TosaAuth extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <style>
    #auth-container {
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 5px;
    text-align: center;
  }
  
  #auth-forms input {
    width: 90%;
    margin: 10px 0;
    padding: 8px;
  }
  
  #auth-forms button {
    width: 100%;
    padding: 10px;
    background: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  #toggle-auth {
    margin-top: 10px;
  }
  
    </style>
      <div id="auth-container">
        <div id="auth-forms">
          <h2 id="auth-title">Login</h2>
          <input type="text" id="auth-name" placeholder="Name (for Signup)" style="display:none;">
          <input type="email" id="auth-email" placeholder="Email">
          <input type="password" id="auth-password" placeholder="Password">
          <button id="auth-button">Login</button>
          <p id="toggle-auth">Don't have an account? <a href="#">Signup</a></p>
        </div>
      </div>
    `;

    // 📌 Backend & Redirect URL from attributes
    this.backendURL = this.getAttribute("backend-url") || "http://localhost:5000/auth";
    this.redirectURL = this.getAttribute("redirect-url") || "dashboard.html";
    
    this.isLogin = true;
    this.initEvents();
  }

  initEvents() {
    const authTitle = this.querySelector("#auth-title");
    const authName = this.querySelector("#auth-name");
    const authButton = this.querySelector("#auth-button");
    const toggleAuth = this.querySelector("#toggle-auth");

    authButton.addEventListener("click", () => this.handleAuth());
    toggleAuth.addEventListener("click", (e) => {
      e.preventDefault();
      this.isLogin = !this.isLogin;
      authTitle.textContent = this.isLogin ? "Login" : "Signup";
      authName.style.display = this.isLogin ? "none" : "block";
      authButton.textContent = this.isLogin ? "Login" : "Signup";
      toggleAuth.innerHTML = this.isLogin 
        ? `Don't have an account? <a href="#">Signup</a>` 
        : `Already have an account? <a href="#">Login</a>`;
    });
  }

  async handleAuth() {
    const name = this.querySelector("#auth-name").value;
    const email = this.querySelector("#auth-email").value;
    const password = this.querySelector("#auth-password").value;

    const endpoint = this.isLogin ? "/login" : "/signup";
    const body = this.isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${this.backendURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert(`${this.isLogin ? "Login" : "Signup"} Successful!`);
        window.location.href = this.redirectURL;
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Auth Error:", error);
    }
  }
}

customElements.define("tosa-auth", TosaAuth);
