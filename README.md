# VotingApp

A full-stack Voting Application providing a secure, user-friendly way to create, participate in, and view polls.

Full stack working link :-
https://biprajitpaul5555.github.io/votingapp_frontend/##/
## 🚀 Features

- **User Authentication**  
  - Register, login, and logout functionality.  
  - Secured using [Passport.js](http://www.passportjs.org/).

- **Poll Management**  
  - Authenticated users can create, edit, and delete polls.  
  - Each poll can have multiple options.  
  - Ability for users to add options to polls (optional).

- **Voting & Results**  
  - Authenticated and guest users can vote on polls.  
  - Real-time, aggregate results with interactive charts (e.g., Chart.js).

- **Poll Browsing & Sharing**  
  - View all polls with pagination.  
  - Share poll links directly with others.  
  - Filter/sort polls by creation date, popularity, or author.

## 🏗️ Project Structure

```
.
├── app/
│   ├── config/          # Passport config
│   ├── mongo/
│   │   ├── polls.js     # Poll schema
│   │   └── user.js      # User schema
│   ├── routes/
│   │   ├── auth.js      # Authentication routes
│   │   ├── addpolls.js  # Poll creation/editing/voting
│   │   └── home.js      # Home page & listing
│   ├── static/
│   │   ├── dev/         # Source: Pug, SCSS, JS
│   │   └── dist/        # Compiled assets
│   └── views/           # Pug templates
├── server.js            # Express app entry point
├── package.json
└── README.md            # This file
```

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/modaksutirtha/Votingapp.git
   cd Votingapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (create a `.env` file in base folder):
   ```
   MONGO_URI=mongodb://localhost:27017/votingapp
   SESSION_SECRET=your_secret_here
   ```

4. **Run in development**
   ```bash
   npm start
   ```

5. **Access the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Usage Guide

- **Register/login** via local credentials (and optionally social providers).
- **Create a poll**: fill in title, options, and submit.
- **Share your poll**: copy the URL and send to others.
- **Vote**: select an option and submit.
- **View results**: check the chart to see live vote counts.
- **Manage polls**: authenticated users can delete or update their own polls.

## 🧩 Dependencies

- **Backend**: Node.js, Express, MongoDB, Mongoose, Passport.js  
- **Frontend**: Pug templates, SCSS, vanilla JS (or frameworks like Chart.js)  
- **Dev tooling**: Gulp for build pipeline

## ✅ Contributing

Feel free to open issues or submit pull requests! Suggestions for improvements and new features are welcome.

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push (`git push origin feature/my-feature`)  
5. Open a Pull Request

## 📄 License

This project is released under the MIT License. See [LICENSE](LICENSE) for full details.
