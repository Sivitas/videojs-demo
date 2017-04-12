# videojs-demo

Hosted at <https://sivitas.github.io/videojs-demo/>

Autoplay and muted video demo with preroll ad using Google IMA SDK
Muted so it support mobile autoplay

## Current Issues
1. Clicking the `next` button while ad is playing will load next video but break the ad. Ad will not play on second video and will throw an error on third video ([ticket](https://github.com/googleads/videojs-ima/issues/354))
  * If you pause then play on the second video, the ad plays
  * Eventually the ad will 'fix' itself after 2-3 videos from the first 'skip'
2. Adding the query param `?vpaid=1` will load a vpaid ad which does not autoplay on mobile phones ([ticket](https://github.com/googleads/videojs-ima/issues/341))