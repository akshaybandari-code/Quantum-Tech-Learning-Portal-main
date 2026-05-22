# Quantum-Tech-Learning-Portal

A modern quantum computing learning platform with user authentication and account management.

## 🌟 Features

- **User Authentication**: Sign in with email and ID
- **Account Creation**: Easy registration for new users
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Email Integration**: Automated email notifications using EmailJS
- **API Integration**: Uses GoREST API for user data management
- **Password Management**: Show/hide password toggle for security

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Styling**: Font Awesome icons, Backdrop blur effects
- **APIs**:
  - [GoREST](https://gorest.co.in/) - User data management
  - [EmailJS](https://www.emailjs.com/) - Email notifications
- **Design**: Glass-morphism UI with backdrop blur

## 📁 Project Structure

```
Term2-main/
├── pp.html       # Main HTML file (Sign in & Account Creation UI)
├── pp.js         # JavaScript functionality
└── README.md     # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API and CDN resources)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/edharanagasaimanohar-lgtm/Quantum-Tech-Learning-Portal.git
```

2. Navigate to the project folder:
```bash
cd Quantum-Tech-Learning-Portal
```

3. Open `pp.html` in your web browser:
```bash
# On Windows
start pp.html

# On macOS
open pp.html

# On Linux
xdg-open pp.html
```

## 📝 Usage

1. **Sign In**: Enter your email and ID to access the portal
2. **Create Account**: Click "Create account" to register as a new user
3. **Email Notifications**: Receive automated emails for account activities

## 🔧 Configuration

To customize the portal, update these values in `pp.js`:

```javascript
let GOREST_TOKEN = "your-gorest-api-token";
let EMAIL_SERVICE_ID = "your-emailjs-service-id";
let EMAIL_TEMPLATE_ID = "your-emailjs-template-id";
let EMAIL_PUBLIC_KEY = "your-emailjs-public-key";
```

## 📚 API References

- **GoREST API**: https://gorest.co.in/public/v2/users
- **EmailJS API**: https://api.emailjs.com/api/v1.0/email/send

## 🎨 UI Features

- Glass-morphism design with backdrop blur
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Dark-themed interface with cyan accents
- Font Awesome icon integration

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

- **edharanagasaimanohar-lgtm**
- GitHub: [edharanagasaimanohar-lgtm](https://github.com/edharanagasaimanohar-lgtm)

## 🤝 Contributing

Contributions are welcome! Feel free to fork, make changes, and create pull requests.

## 📧 Contact

For questions or suggestions, please reach out via email or GitHub issues.

---

**Happy Learning! 🚀 Welcome to the Quantum Computing Portal**
