# ~ Hashii ~

Easily parse and format hashtags to send with AJAX requests. No dependencies, no headaches.

## Installation
```
npm install hashii
```

## Using Hashii

Getting Hashii up and running is simple, the only requirement is that you pass the constructor an object containing the name of your custom Hashii attribute, using the 'ref' object property (element reference).

```js
/*
 * Hashi attribute syntax
 * hashii:[key name]
 * ex: hashii:posts, hashii:comments, hashii:blog
 */

var comments = new Hashii({ ref: 'comments' });

<form hashii:comments>
    <input type="text" name="title" value="title"/>
    <textarea name="comment" rows="10" cols="50"></textarea>
</form>
```
That's all you need!

By default, Hashii will return a single array of the parsed hashtags **without** the '#' symbol. Below are the configuarable defaults for your Hashii instance.

```js
/* Default return format */
["PHP", "Ruby", "Python"]
```

## Defaults
```js
var defaults = {
    ref: '', // *required
    format: '[]',
    includeHash: false
};
```

## Alternative Configuration Options

If you would like to consume JSON rather than an array, all you need to do is pass a few more options to your Hashii constructor to override the above defaults.

```js
/* Expect a JSON object with the '#' symbol included this time */
var languages = new Hashii({
    ref: 'languages',
    format: '{}',
    includeHash: true
});

/* result */
{"0":"#PHP","1":"#Ruby","2":"#Python"}
```

There are two ways that you can use Hashii. The first way is to hook the hashii:[key name] attribute onto your entire form within the <form> tag like the example below. This method will gather hashtags from every input and/or textarea within that form.

```html
<!-- Scrapes all input/textareas within form -->
<form hashii:posts><!-- /*fields*/ --></form>
````

The second way Hashii can be used is to place the hashii:[key name] onto a single field whether inside a form or just an input field on it's own like so:

```html
<!-- Will only parse this field for hashtags -->
<input type="text" name="bands" hashii:bands />
```

Once you have created your Hashii instance, you can return your hashtags collection by calling $tags() on your instance:

```js
var bands = new Hashii({ ref: 'bands' });

/* Remember to use parens when calling $tags() */
console.log(bands.$tags());

// returns
["zeppelin", "hendrix", "sabbath"]

````

## Console accessors
Hashii offers a few instance keys to call on that can return configuration information about your Hashii instance for reference.

* hashii.$element // returns DOM element hashii:[key name] is on
* hashii.$defaults // returns Hashii default object for reference
* hashii.$settings // returns your instance configuration

## Versioning

This repo uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/JoshuaCoquelle/Hashii/tags). 

## Authors

* **Joshua Coquelle** - [JoshuaCoquelle](https://github.com/JoshuaCoquelle)

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details