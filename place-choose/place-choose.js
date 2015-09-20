requirejs.config({
  paths: {
    'jquery' : ['../lib/js/jquery-1.11.3.min']
  }
});

require([ 'jquery' ], function ( $ ){
  $(function(){
    var $modPlaceChoose = $( '.mod-place-choose' );
    var $placeTimes = $modPlaceChoose.find( '.place-time' );
    var $date = $modPlaceChoose.find( '.place-choose .date li' );

    //遍历每一个 place的li
    var $place = $modPlaceChoose.find( '.place-time .place li').not( '.title,.disable' );
    $place.each(function () {
      var $this = $(this);
      var $placeTime = $this.closest(".place-time");
      var triggerIndex = $placeTimes.index( $placeTime );
      var currentIndex = $date.eq( triggerIndex );

      var date = currentIndex.find( '.day' ).text();
      var place = $this.prevAll( '.title').text();
      $this.data( "date", date );
      $this.data( "place", place );
    });

    //星期 点击
    $modPlaceChoose.on( 'click', '.place-choose .date li', function (){
      var $this = $(this);
      if ( !$this.hasClass( 'selected' ) ){
        $this.siblings().removeClass( 'selected' );
        $this.addClass( 'selected' );
      }

      //相应的场地转换列表
      var triggerIndex = $this.index();
      var $placeTime = $modPlaceChoose.find( '.place-time' );
      var currentIndex = $placeTime.eq( triggerIndex );

      $placeTime.removeClass( 'selected' );
      currentIndex.addClass( 'selected' );
    });

    //场地 点击
    $modPlaceChoose.on( 'click', '.place-choose .place li', function (){
      var $this = $(this);

      $this.not( '.title,.disable').toggleClass("selected");
      detail();
    });

    var $detail = $modPlaceChoose.find( '.order .detail' );
    var $val = $modPlaceChoose.find( '.account-val .val' );
    var detail = function () {
      var total = 0;

      $detail.empty();
      $place.filter( ".selected").each(function(){
        var $this = $(this);
        var date = $this.data( 'date');
        var hour = $this.data( 'start-time' );
        var place = $this.data( 'place' );
        var price = $this.text();

        $detail.append(
          '<ul>' +
          '<li class="date">2015-<em>' + date + '</em></li>' +
          '<li class="hour">' + hour + '</li>' +
          '<li class="place">' + place + '</li> ' +
          '<li class="price">￥<em>' + price + '</em></li> ' +
          '</ul>'
        );

        price = parseInt( price );
        total += price;
      });

      //金额总数
      $val.text( total.toFixed(1) );
    };

    //数字 提示输入
    var $teleVal = $modPlaceChoose.find( '.order .telephone');
    $modPlaceChoose.on( 'keyup', '.order .telephone', function( ){
      var teleVal = $teleVal.val( );
      if( isNaN( teleVal ) ){

        $modPlaceChoose.find('.tele-tips').css( 'display', 'block' );
        teleVal = teleVal.substr( 0 , teleVal.length-1 );
        setTimeout( function(){
          $modPlaceChoose.find('.tele-tips').css( 'display', 'none' );
        }, 1000 );
      }
      $teleVal.val( teleVal );
    });
  })
});