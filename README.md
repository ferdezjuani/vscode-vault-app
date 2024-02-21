<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">VSCode Vault 🚀</h3>

  <p align="center">
    VSCode Vault is an application where you can import your VSCode extensions and share them! ⚛
    <br />
    <a href="https://vscode-vault-app.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/ferdezjuani/vscode-vault-app/issues">Report Bug or Request Feature</a>
    ·
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="https://github.com/ferdezjuani/vscode-vault-app/assets/63978504/58874342-9dd3-4ff0-9b12-5e6d4f094391" />

In my daily life as software developer I have asked many times to my teammates "hey, what's that extension?!". 

So here we are! :smile:

Just run the command in you local terminal, copy the name of the extensions and paste on the VSCode Vault`s form!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* Nextjs
* Nodejs
* Express
* MongoDB

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* <a href="https://uploadthing.com/">Upload Thing</a> SECRET and PROJECTID
* MongoDB`s collection as:
  ```js
      const VaultSchema = mongoose.Schema(
        {
          name: { type: String, required: [true, "Name is required"] },
          extensions: {
            type: [String],
            required: [true, "Extensions are required"],
          },
          image: { type: String, required: false },
        },
        { timestamps: true }
        );
      
        const Vault = mongoose.model("Vault", VaultSchema);
      
      module.exports = Vault;
      }
  ```
  

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ferdezjuani/vscode-vault-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Configure you .env vars! (see .env file)
   
5. Run the project
   ```js
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Juani Fernández - [@ferdezjuani](https://twitter.com/ferdezjuani) - dev.ferdezjuani@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
