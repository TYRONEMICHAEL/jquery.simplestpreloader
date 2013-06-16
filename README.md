# jquery.simplestpreloader

<p class="tagline">World's easiest and smallest jQuery image preloader plugin  based on promises.</p>

[TyroneMichael/jquery.simplestpreloader](https://github.com/TyroneMichael/jquery.simplestpreloader)

<!-- demo -->

## Install

Grab the source file:

+ [jquery.simplestpreloader.min.js](https://github.com/TyroneMichael/jquery.simplestpreloader/blob/master/jquery.simplestpreloader.min.js)
+ [jquery.simplestpreloader.js](https://github.com/TyroneMichael/jquery.simplestpreloader/blob/master/jquery.simplestpreloader.js)

## Usage

``` js
  // Declare an array populated with the urls of the images you wish to load
  var imageUrlsToLoad = ["http://placekitten.com/200/300", "http://placekitten.com/1500/1500", "http://placekitten.com/200/300"], "http://resource.does.not.exist.co.za", "http://placekitten.com/200/300"];

  // Initiate preload
  var preloader = $(images).simplestImagePreloader();
  
  // All images have loaded successfully
  preloader.done(function() {
    // All images have been loaded successfully
    // Do something
  });
  
  // Getting progress of images being loaded
  preloader.progress(function(progress) {
    // Number of images loaded successfully
    numComplete = progress.complete;
    // Percentage done
    percentage = progress.percentage;
  });

  // Something went wrong
  preloader.fail(function (promises) {
    var failedImages = [],
      index = 0;
    $.each(promises, function() {
      if(this.state() === "rejected") {
        failedImages.push(imageUrlsToLoad[index]);
      }
      index += 1;
    });
  });

  // Continue even if images failed to load
  preloader.always(function () {
    // Some images might have failed to load
  });
```