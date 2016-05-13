```
 _    _           _____ _    _ _____ _____ 
| |  | |   /\    / ____| |  | |_   _|_   _|
| |__| |  /  \  | (___ | |__| | | |   | |  
|  __  | / /\ \  \___ \|  __  | | |   | |  
| |  | |/ ____ \ ____) | |  | |_| |_ _| |_ 
|_|  |_/_/    \_\_____/|_|  |_|_____|_____|

```

# ~ Hashii ~

Easily parse and format hashtags. No dependencies, no headaches.

## Installation

```
npm install hashii
```

## Using Hashii

Getting Hashii up and running is simple, the only requirement is that you pass the constructor an object containing the name of your custom Hashii attribute, using the 'ref' object property (element reference).

```js

var Hashii = require('hashii');

var languages = new Hashii({ref: 'languages'});

```

Now just set your custom Hashii key onto the HTML element (form, textarea, input) that you would like to scrape for hashtags and you're good to go!

```html

<!--
  Hashi attribute syntax
  hashii:[key name]
  ex: hashii:posts, hashii:comments, hashii:blog...
-->

<form hashii:languages>
    <input type="text" />
    <input type="text" />
    <textarea></textarea>
</form>

```

## Getting Your Hashtags

Once you are ready to consume the collected hashtags, just call the $tags() method on your Hashii variable and your tags will be returned to you in your desired format.

```js
// <form hashii:languages>/ ... /</form>

var languages = new Hashii({ref: 'languages'});

languages.$tags();

/* Default return format */
["PHP", "Ruby", "Python"]
```

By default, Hashii will return a single array of the parsed hashtags **without** the '#' symbol. Below are the configuarable defaults for your Hashii instance.

## Defaults

```js
var defaults = {
    ref: '', // *required
    format: '[]',
    includeHash: false
};
```

## Alternative Configuration Options

If you would like to receive JSON ('{}') rather than an array ('[]'), all you need to do is pass a few options to the Hashii constructor to override the above defaults.

```js
/* Request a JSON object with the '#' symbol included this time */
var languages = new Hashii({
    ref: 'languages',
    format: '{}',
    includeHash: true
});

/* result */
{"0":"#PHP","1":"#Ruby","2":"#Python"}
```

## Hooking Onto Elements

There are two ways that you can use Hashii. The first way is to hook the hashii:[key name] attribute onto your ***entire*** form within the <form> tag like the example below. This method will gather hashtags from every input and/or textarea within that form.

```html
<!-- Scrapes every input/textarea within this form -->
<form hashii:languages>
    <input type="text" />
    <input type="text" />
    <textarea></textarea>
</form>
```

The second way Hashii can be used is to place the hashii:[key name] onto a ***single*** field whether inside a form or just an input field on it's own like so:

```html
<!-- Will only parse this field for hashtags -->
<input name="languages" type="text" hashii:languages />
```

## Reference Methods

Hashii offers a few methods to call on that can return configuration information about your Hashii instance for your reference or any other use.

```js
/* Examples */

// Cache the element synced with your instance
var elem = lang.$element();

// Inspect your instances configuration, etc...
console.log(lang.$settings());
```

* .$element()  // returns DOM element hashii:[key name] is on
* .$defaults() // returns Hashii default object for reference
* .$settings() // returns your instance configuration

## Versioning

This repo uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/JoshuaCoquelle/Hashii/tags).

## Authors

* **Joshua Coquelle** - [JoshuaCoquelle](https://github.com/JoshuaCoquelle)

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details