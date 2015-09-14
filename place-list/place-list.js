requirejs.config({
    paths: {
        jquery: ['../lib/js/jquery-1.11.3.min'],
        'picker' : ['../lib/datetimepicker/picker'],
        'picker-date' : ['../lib/datetimepicker/picker.date'],
        'picker-time' : ['../lib/datetimepicker/picker.time'],
        'CoverLayer': ['../common/js/CoverLayer']
    }
});

require( [ 'jquery', 'picker-date', 'picker-time' ], function ( $, pickerDate, pickerTime ) {

    $( function () {
        var $mod = $( ".mod-price-ticket" );

        // 星期选择
        $mod.on("click",".week li",function(){
            var $this = $(this);
            $this.toggleClass("selected");
        });

        // 增加条目
        $mod.on( "click", ".add", function ( e ) {
            e.preventDefault();

            var $li = $mod.find( ".places .row:last" );
            var $new = $li.clone();
            $new.insertAfter( $li );

            $new.find( ".time-picker" ).pickatime({
                clear : '清空',
                format : 'HH:i',
                formatSubmit : 'HH:i',
                interval : 30 // 设置时间间隔值
            });
        } );

        // 减少条目
        $mod.on( "click", ".close", function ( e ) {
            e.preventDefault();

            $( this ).closest( "li" ).remove();

        } );

        // 开放时间选择
        $mod.find( ".time-picker" ).pickatime({
            clear : '清空',
            format : 'HH:i',
            formatSubmit : 'HH:i',
            interval : 30 // 设置时间间隔值
        });


    } )

} );