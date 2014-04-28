[![Build Status](https://api.travis-ci.org/Wisembly/bloader.js.svg)](http://travis-ci.org/Wisembly/bloader.js)

# Bloader

## Quick start
To start using the loader, you can use the builds from the ````build/```` directory.
You'll find both minified and raw versions of the code.
You'll also find a file for inline HTML. It's very useful since Bloader works as standalone (no jQuery etc).

Anyway, it's lightweight, 1kb.

## How to use
* App or first page loading with inline code
````
// Insert the code from build/bloader.min.html

<div id='loading-bar'></div>

<script type='text/javascript'>
    // As the instance doesn't exist, it creates a new one
    var bloader = window.Bloader.getInstance('app:loading');
    bloader.start();
</script>
````

Then, when your app is loaded

````
// If you need to get your bloader instance again because you're somewhere else, you can do
var bloader = window.Bloader.getInstance('app:loading');

// And then call
bloader.complete();
````

* Page loading
It works the exact same way, except you don't have to use JavaScript in your HTML.
You can get the code from ````build/bloader.min.js````
````
var bloader = window.Bloader.getInstance('app:loading');
bloader.start();
bloader.complete();
````

* Set a custom progress
To set a custom progress, once the loader is started, you can use the ````set```` method
````
bloader.set(50);
````

## Statuses and progress
When you start the loader, it sets a ````data-status```` attribute to ````started````.
When you complete the loader, the progress goes to 100, the attribute ````data-status```` changes and becomes ````completed```` for a duration of 1 second.
Then it becomes ````ended```` and the progress is set back to 0.

## Configuration

You have two ways of setting your own config
````
bloader.setConfig({ autoIncrement: false });
````
Or
````
var bloader = window.Bloader.getInstance('app:loading', { autoIncrement: false });
````

Default values are
````
{
    el: 'loading-bar',        // ID of the loading bar
    statusEl: 'loading-bar',  // ID of the element you want the statuses on
    autoIncrement: true       // Auto increments the loading bar randomly
}
````

## Available methods

* ````start````         to start the loader
* ````set````           to set the loader to a custom progress
* ````complete````      to complete the loader, which sets the progress to 100
* ````getStatus````     returns the current status. ````null````, ````started````, ````completed````, ````ended````
* ````getProgress````   returns the current progress as a percentage (0..100)
* ````setConfig````     sets a new config
* ````getConfig````     returns the current config

## Build
To build the scripts, please install locally gulp using, and then the packages.
````
npm install -g gulp
npm install
````

You're now able to run the build process, using
````
// Launch all the builds
gulp

// Launch the CSS build
gulp styles

// Launch the JavaScripts build
gulp scripts
````

## Test
The test suite will run in all the browsers that are available on your computer.
To run the test suite, after you ran ````npm install```` just launch
````
npm test
````
