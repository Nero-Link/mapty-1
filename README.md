<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![pull][pull-requests-shield]][pull-requests-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://mapty-by-pawanjs.netlify.app/">
    <img src="./src/images/logo.png" alt="Logo" width="100px" height="50px">
  </a>

  <h3 align="center">Mapty</h3>

  <p align="center">
   A Map application made with JavaScript to store workouts.
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://mapty-by-pawanjs.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/PawanJS/mapty/issues">Report Bug</a>
    ·
    <a href="https://github.com/PawanJS/mapty/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://mapty-by-pawanjs.netlify.app/)

Mapty is a vanilla JavaScript application that interacts with the Leaflet library and display Map. This app uses modern JavaScript tools, such as Webpack to bundle the modules, and Babel to convert ES6, ES7 and ES8 back to ES5. The user can add workouts for running and cycling and these are stored via local storage.

### Built With

This app is built with pure vanilla JavaScript along with HTML and SCSS. It uses webpack as module bundler and NPM as package manager.

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [SCSS](https://sass-lang.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [Webpack](https://webpack.js.org/)
- [NPM](https://www.npmjs.com/)

<!-- GETTING STARTED -->

## Getting Started

To get started with project just simply fork this repo or download locally on your System.

To get a local copy up and running follow these simple example steps.

### Prerequisites

Start with the latest version of NPM to avoid any errors:

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get Leaflet library [Leaflet](https://leafletjs.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/PawanJS_/mapty.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->

## Usage

1. Add workouts near to your Geo location.

2. Add workouts to bookmarks to view it later.

3. Click on workouts to see it's location.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/PawanJS/mapty/issues) for a list of proposed features (and known issues).

### Proposed features

1. Ability to edit a workout.

2. Ability to delete a workout.

3. Ability to delete all workouts.

4. Ability to sort workouts by a certain field (e.g. distance).

5. Re-build Running and Cycling objects coming from Local Storage.

6. More realistic error and confirmation messages.

7. Ability to position the map to show all workouts.

8. Ability to draw lines and shapes instead of just points.

9. Geocode location from coordinates (“Run in Shoghi, Shimla).

10. Display weather data for workout time and place.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Pawan JS - [Say Hie](https://www.pawanjs.xyz/#contact)

Project Link: [https://github.com/PawanJS/mapty](https://github.com/PawanJS/mapty)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Img Shields](https://shields.io)
- [Netlify](https://www.netlify.com/)
- [Webpack](https://webpack.js.org/)
- [Google Fonts](https://fonts.google.com/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/PawanJS/mapty?color=green&style=for-the-badge
[contributors-url]: https://github.com/PawanJS/mapty/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PawanJS/mapty?style=for-the-badge
[forks-url]: https://github.com/PawanJS/mapty/network/members
[pull-requests-shield]: https://img.shields.io/github/issues-pr/PawanJS/mapty?style=for-the-badge
[pull-requests-url]: https://github.com/PawanJS/mapty/pulls
[issues-shield]: https://img.shields.io/bitbucket/issues/PawanJS/mapty?style=for-the-badge
[issues-url]: https://github.com/PawanJS/mapty/issues
[license-shield]: https://img.shields.io/apm/l/vim-mode?label=LICENSE&style=for-the-badge
[license-url]: https://github.com/PawanJS/mapty/blob/master/LICENSE.txt
[product-screenshot]: ./src/images/screenshot.jpg
