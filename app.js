/* globals videojs */
(function() {
  'use strict';

  var player = videojs('main', {
    autoplay: true,
    muted: true,
    preload: 'auto',
    controls: 1
  });

  var options = {
    id: 'main',
    prerollTimeout: 3000,
    timeout: 3000
  };
  var queryParams = {};

  var ads = {
    doubleclick: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=',
    vpaid: 'https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=is&c=23&pl=VAST&pli=14432293&PluID=0&pos=8834&ord=%5Btimestamp%5D&cim=1'
  };
  var videos = [
    'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
    'http://techslides.com/demos/sample-videos/small.mp4',
    'https://mtc.cdn.vine.co/r/videos/84C4E2C3DD1357938356432023552_574449b2afd.25.1.F040A49F-C8B2-4EC1-8F9F-6525F1365103.mp4?versionId=eweULi8mnxy8zDTuJ4FfkWl4ZeVpOm7r'
    ];
  var videoIndex = 0;
  var activeAd = ads.doubleclick;

  // api
  window.loadNext = loadNext;
  window.loadPrev = loadPrev;

  // init
  _exctractQueryParams();
  _createEventHandlers();
  _init();

  // api fns
  function loadNext() {
    videoIndex++;
    if (videoIndex >= videos.length) { videoIndex = 0; }
    _loadVideo(videos[videoIndex], activeAd);
  }
  function loadPrev() {
    videoIndex--;
    if (videoIndex < 0) { videoIndex = videos.length-1; }
    _loadVideo(videos[videoIndex], activeAd);
  }
  // private
  function _createAdEventHandlers() {
    // TODO
    player.ima.startFromReadyCallback();
  }
  function _createEventHandlers() {
    // auto advance to next video on video end
    player.on('ended', function() {
      loadNext();
    });
  }
  function _exctractQueryParams() {
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    hashes.forEach(function(hash) {
      hash = hash.split('=');
      queryParams[hash[0]] = hash[1];
    });
  }
  function _loadVideo(video, ad) {
    player.ima.setContentWithAdTag(video, ad, false);
    player.ima.requestAds();
  }
  function _init() {
    if (queryParams.vpaid === '1') { activeAd = ads.vpaid; }

    player.ima(options, _createAdEventHandlers);
    player.ima.initializeAdDisplayContainer();

    _loadVideo(videos[0], activeAd);
  }
}());
