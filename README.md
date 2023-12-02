NetGlobal
=========

NetGlobal is a Next.js application developed in JavaScript, designed to provide a comprehensive solution for managing bank accounts from around the world through a unified dashboard. This repository serves as a central hub for all project-related information, features, and guidelines.

Features
--------

### Supabase Integration

-   NetGlobal leverages [Supabase](https://supabase.io/) for database management and data integration. It offers a seamless experience for storing and retrieving user data securely.

### Google Authentication

-   User authentication is powered by Google OAuth, ensuring a reliable and secure login process. Developers can extend and customize authentication flows as needed.

### Stripe Payment Integration

-   NetGlobal utilizes [Stripe](https://stripe.com/) for payment processing and subscription management. Developers can manage subscription plans, payments, and billing flows with ease.

Styling with Tailwind CSS and DaisyUI
-------------------------------------

-   The application's user interface is crafted using [Tailwind CSS](https://tailwindcss.com/) and enhanced with [DaisyUI](https://daisyui.com/) components. This combination allows for efficient styling and responsive design.

Getting Started
---------------

To get started with NetGlobal on your local development environment, follow these steps:

1.  Clone this repository to your local machine:

    bashCopy code

    `git clone <repository-url>`

2.  Install project dependencies:

    bashCopy code

    `cd NetGlobal
    npm install`

3.  Configure Environment Variables:

    -   Copy the example environment variables file:

        bashCopy code

        `cp .env.example .env.local`

    -   Update the `.env.local` file with your specific configuration values, including Supabase credentials, Google OAuth settings, and Stripe API keys.

4.  Start the development server:

    bashCopy code

    `npm run dev`

5.  Access the application in your browser at [http://localhost:3000](http://localhost:3000/).


License
-------

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE).

