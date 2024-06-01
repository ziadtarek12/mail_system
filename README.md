# Project Title: Email Client Application

This project is an email client application developed using Django for the backend and JavaScript for the frontend. The application allows users to send, receive, and archive emails. Users can also view their inbox, sent mailbox, and archive.

## Code Structure

The codebase is divided into two main parts: the backend (Django) and the frontend (JavaScript).

### Backend (Django)

The Django backend is responsible for handling HTTP requests, managing database operations, and serving the frontend files. The main components of the backend are:

- `models.py`: This file contains the Django models for the User and Email objects. The User model represents the users of the email client, while the Email model represents the emails themselves. Each model defines fields and behaviors of the data that will be stored in the database.

- `views.py`: This file contains the Django views for handling HTTP requests. Each view function takes a web request and returns a web response. The views interact with the models to retrieve data from the database, and pass this data to a template to be rendered and displayed to the user. The views also handle form submission data from the frontend and perform appropriate actions such as creating new emails or updating the status of existing emails.

- `urls.py`: This file contains URL patterns for the Django application. Each URL pattern is associated with a view, which Django will call when the matching URL is requested.

- `settings.py`: This file contains configurations for the Django application, such as database settings, installed apps, middleware classes, and more.

- `manage.py`: This is a command-line utility that lets you interact with the Django project in various ways. It is used to start the server, run tests, create migrations, and more.

The Django backend communicates with the frontend through HTTP responses and requests, sending and receiving JSON data that is processed by the JavaScript code on the frontend.

### Frontend (JavaScript)

The frontend is written in JavaScript and is responsible for user interactions. The main JavaScript file is `inbox.js`, which contains the following components:

- Event Listeners: These are set up for the buttons that switch between different views (inbox, sent, archived, compose). By default, the inbox view is loaded.
- `compose_email(email, reply)` Function: This function displays the compose email view. It clears out any existing values in the composition fields and, if the function is called as a reply, it pre-fills the fields with relevant information.
- `load_mailbox(mailbox)` Function: This function displays the specified mailbox view and fetches the relevant emails from the server.
- `Email(id)` Function: This function fetches and displays a specific email by its ID. It also marks the email as read.

## Installation

To run this project locally, you need to have Python 3.8 or later and Django 3.2 or later installed on your machine. After cloning the repository, you can install Django and run the server using the following commands:

```bash
pip install django
python manage.py runserver
```

## Preview 
[Link of hosted site](https://ziadomar.pythonanywhere.com/login?next=/)