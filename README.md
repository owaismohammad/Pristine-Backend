# Pristine Backend

The Pristine backend is a Node.js application that handles water classification, user authentication, and data management. It uses Express.js for the API, MongoDB for the database, and integrates a machine learning model to classify water images as clean or unclean.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

Pristine is a platform that allows users to upload or capture images of water for purity classification. The backend is responsible for managing user accounts, processing water images using a machine learning model, and returning the classification results (clean or unclean).

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Water Classification**: Machine learning integration for analyzing water images.
- **RESTful API**: Endpoints for handling user data, image uploads, and classification results.
- **MongoDB Database**: For storing user information and classification records.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication**

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/owaismohammad/Pristine-Backend.git
