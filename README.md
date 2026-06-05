# Oikodomos

**Developer Tools Marketplace / Extension Discovery Platform**
Web Frameworks Capstone Project

---

## Project Overview

Oikodomos is a web application that helps developers discover, browse, 
and organize useful extensions and tools in a unified location. Instead of 
searching each separate marketplace independently, users can compare and 
explore tools from a variety of developer ecosystems through a single interface. 
It allows users to see which developer ecosystems support which extensions, so 
they can choose the platform that best suits their specific needs.

The platform brings together extensions from multiple developer ecosystems, 
including VS Code, JetBrains IDEs, Unreal Engine, Unity, web browsers, and 
LLM-assisted development platforms. The purpose of this project is to demonstrate 
a full-stack web application architecture using:

This project serves as a portfolio-ready example of structured, maintainable, 
web application development.

---

## Features

- Browse a curated catalog of developer tools and extensions
- Compare tools across multiple development ecosystems
- Search for extensions by name or description
- Filter by category, environment, and price
- Sort search results
- View detailed information for individual listings

---

## Technology Stack

- Node.js
- Express.js
- EJS
- MySQL
- Docker
- HTML5 / CSS3

---

## Architecture

This project follows the MVC (Model-View-Controller) design pattern and 
uses server-side rendering (SSR) through Express and EJS templates.

Key architectural components include:

- MVC architecture
- Server-Side Rendering (SSR)
- MySQL database integration
- REST-style API endpoints
- Secure session-based state management

---

## Setup

### Prerequisites

- Node.js
- npm
- Docker Desktop
- MySQL Workbench

### Database Setup

1. Start the Docker containers.
2. Connect to the local MySQL instance.
3. Run the provided schema script, located in app/db/schema.sql.
4. Run the provided seed script, located in app/db/seed.sql.