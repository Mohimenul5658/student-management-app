# StudentHub — Student Management App

A responsive React app for adding, viewing, searching, editing, and deleting student records. Student records are saved in the browser with LocalStorage.

## Run locally

1. Install [Node.js](https://nodejs.org/) if you do not already have it.
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm run dev` and open the local address Vite prints.

To create a production build, run `npm run build`.

## GitHub submission

Create a new empty repository on GitHub, then run these commands from this folder (replace the URL with your repository URL):

```bash
git init
git add .
git commit -m "Build student management app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/student-management-app.git
git push -u origin main
```

## Features

- Add students with name, email, phone number, and department
- Search the directory by student name
- Edit or delete a student
- Show the total number of students
- Keep records in LocalStorage after refreshing the page
- Responsive layout for desktop, tablet, and mobile
