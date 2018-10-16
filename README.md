# HTML2Image

Convert any HTML you have into an image with ease!

### Example Usage

Use the `<x-html2image>` tag and put any html you want to print to an image inside.

```
  <x-html2image>
    <style>
      h1 {
        font-style: italic;
      }
    </style>
    <h1>Hello World!</h1>
  </x-html2image>
```

Add something that will trigger the download of your image

```
  <button id="button">Save Your Image</button>
```

Lastly, add in some Javascript to call the toImage function

```
  var button = document.getElementById('button');
  button.addEventListener('click', function() {
    button.style.display = 'none';
    let myElement = document.querySelector('x-html2image');
    myElement.toImage();
    button.style.display = 'block';
  });
```


## Contributing

Feel free to open up a pull request!
