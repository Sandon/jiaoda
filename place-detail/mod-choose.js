(function ( $ ) {
    $( function () {
        var $mod = $( ".mod-choose" );
        var $items = $mod.find( ".item" );

        $mod.on( "mouseenter", ".item", function () {
            $items.removeClass( "selected" );
            $( this ).addClass( "selected" );
        } )
    } );
})( jQuery );