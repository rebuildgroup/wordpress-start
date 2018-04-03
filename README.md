# wordpress-start
Wordpress + Sage Theme + Base Plugins

* [Fork Method](https://education.github.com/guide/forks)
* [Sandboxing Method](https://education.github.com/guide/sandboxing)

## Quick Start Guide

1. Fork this Repository.
2. Clone to your local development environment root.
3. Complete Theme Setup.
4. Run WordPress' Famous 5-Minute Installation.
4. Work on Exercises.
5. Commit your work.
6. Submit Pull Request.
7. Dance.


## Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| PHP >= 5.4.x    | `php -v`     | [php.net](http://php.net/manual/en/install.php) |
| Node.js >= 4.5  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.8.10  | `gulp -v`    | `npm install -g gulp` |
| Bower >= 1.3.12 | `bower -v`   | `npm install -g bower` |

For more installation notes, refer to the [Install gulp and Bower](#install-gulp-and-bower) section in this document.

## Features

* [gulp](http://gulpjs.com/) build script that compiles both Sass and Less, checks for JavaScript errors, optimizes images, and concatenates and minifies files
* [Bower](http://bower.io/) for front-end package management
* [asset-builder](https://github.com/austinpray/asset-builder) for the JSON file based asset pipeline
* [Bootstrap](http://getbootstrap.com/)
* [BrowserSync](http://www.browsersync.io/) for keeping multiple browsers and devices synchronized while testing, along with injecting updated CSS and JS into your browser while you're developing


## Theme installation

Install Sage by copying the project into a new folder within your WordPress themes directory.

Make sure [Composer](https://getcomposer.org/download/) has been installed before moving on.

Install Sage using Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```shell
# @ example.com/site/web/app/themes/
$ composer create-project roots/sage your-theme-name 8.5.4
```

## Plugins

| Name                      | Plugin Link
| ------------------------- | ------------- |
| All-in-One WP Migration   |
| Custom Post Type UI       |
| Advanced Custom Fields    | [nodejs.org](http://nodejs.org/)
| Beaver Builder            | [php.net](http://php.net/manual/en/install.php)

### Available gulp commands

* `gulp` — Compile and optimize the files in your assets directory
* `gulp watch` — Compile assets when file changes are made
* `gulp --production` — Compile assets for production (no source maps).



## [Sage](https://roots.io/sage/)

Sage is a WordPress starter theme based on HTML5 Boilerplate, gulp, Bower, and Bootstrap Sass, that will help you make better themes.

* Source: [https://github.com/roots/sage](https://github.com/roots/sage)
* Homepage: [https://roots.io/sage/](https://roots.io/sage/)
* Documentation: [https://roots.io/sage/docs/](https://roots.io/sage/docs/)
* Twitter: [@rootswp](https://twitter.com/rootswp)
* Newsletter: [Subscribe](http://roots.io/subscribe/)
* Forum: [https://discourse.roots.io/](https://discourse.roots.io/)


## Rebuild Group

Keep track of development and Rebuild Group news.

* Participate on the [Roots Discourse](https://discourse.roots.io/)
* Follow [@rootswp on Twitter](https://twitter.com/rootswp)
* Read and subscribe to the [Roots Blog](https://roots.io/blog/)
* Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
* Listen to the [Roots Radio podcast](https://roots.io/podcast/)