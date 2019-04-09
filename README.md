# Object-Fit Polyfill

Since Internet Explorer 11 doesn't support the CSS object-fit property, I wrote this JavaScript polyfill in an attempt to resolve the issue. If you don't know what object-fit is used for, you can check out the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).

## Example Usage

```
var objectFit = new ObjectFitPolyfill('.hero-video');
```

### Prerequisites

In order to run the app locally and make changes, you'll need to install some development dependencies. They are outlined in the **package.json** file and can be installed by running the following command in the root of this directory after you've installed [Node.js](https://nodejs.org/) and NPM on your machine.

```
npm install
```

### Installed Packages

Here's a list of packages that will be added to the **node_modules** directory after running the previous command.

* babel-core
* babel-preset-env
* del
* gulp
* gulp-babel
* gulp-concat
* gulp-uglify
* run-sequence

## Building the Project for Development

In order to build the files under the **src** directory and output them into the **dist** directory, run this command.

```
gulp
```

## Organization

[Sagepath](http://www.sagepath.com/)

## Author

**Dave Maynard** - [GitHub](https://github.com/dmaynard24)