define( 'CoverLayer', ['jquery'], function ( $ ) {

    /**
    * options 的配置参数
    *
    * layers : Array 包含各个层的配置对象，每个对象包含如下属性（每个对象为layer）
    * layer.tpl : String 目标元素的selector
    * layer.closeTrigger : String 触发关闭的元素的selector
    *
    * zIndex : int 各个层的z-index的起始值
    **/
    function CoverLayer ( options ) {
        this.options = options;
        this.doc = $( document );
        this.win = $( window );
        this.showIndex = -1;

        var layersLen = this.options.layers.length;

        if ( !layersLen ) {
            return;
        }

        for( var i = 0; i != layersLen; i++ ) {
           var layer = this.options.layers[i];
           layer.tpl = $( layer.tpl );
        }

        this.options.zIndex = this.options.zIndex || 1000;

        this._init();
    }

    /**
     * 初始化
     * @private
     */
    CoverLayer.prototype._init = function () {

        // 插入遮罩层
        var $covLayerBack = $( ".cover-layer-back" );
        if ( 0 === $covLayerBack.length ) {
            $covLayerBack = $( "<div class='cover-layer-back'></div>" );
            $('body').append( $covLayerBack );
        }

        $covLayerBack.css({
            'position' : 'fixed',
            'left' : 0,
            'top' : 0,
            'background-color' : '#000',
            'opacity' : '0.3'
        });

        $covLayerBack.hide();

        this.covLayerBack = $covLayerBack;

        // 触发关闭元素的时间处理
        var length = this.options.layers.length;
        var self = this;
        for ( var i = 0; i != length; i++ ) {
            var layer = this.options.layers[i];

            if ( layer.closeTrigger ) {
                (function ( index ) {
                    layer.tpl.on( "click", layer.closeTrigger, function (e) {
                        e.preventDefault();

                        index > 0 ? self.showLayer( index - 1 ) : self.closeAll() ;
                    } );
                })(i);

            }
        }
    };

    /**
     * 弹出层定位
     * @param layer
     * @param docWidth
     * @param docHeight
     * @param zIndex
     * @private
     */
    CoverLayer.prototype._posLayer = function ( layer, zIndex ) {
        var left, top;
        var docWidth = this.doc.width();
        var layerHeight = layer.tpl.height(), winHeight = this.win.height(), winScrollTop = this.doc.scrollTop();
        left = ( docWidth - layer.tpl.width() ) / 2;
        left = left < 0 ? 0 : left;

        if ( layerHeight < winHeight ) {
            top = ( (winHeight - layerHeight) / 2 ) + winScrollTop;
        } else {
            top = winScrollTop;
        }

        layer.tpl.css( {
            'position': 'absolute',
            'left' : left,
            'top' : top,
            'z-index' : zIndex
        } );
    };

    /**
     * 展示某一层
     * @param layerIndex 要展示的层的索引
     */
    CoverLayer.prototype.showLayer = function ( layerIndex ) {
        var length = this.options.layers.length;
        if ( layerIndex < 0 || layerIndex > length - 1 )
            return;

        var docWidth = this.doc.width();
        var docHeight = this.doc.height();
        var layer, i;

        // 目标层及之前的层
        for ( i = 0; i <= layerIndex; i++ ) {
            layer = this.options.layers[i];
            var zIndex = i == layerIndex ? this.options.zIndex + i +1 : this.options.zIndex + i;

            this._posLayer( layer, zIndex );
            layer.tpl.show();
        }

        // 背景层
        this.covLayerBack.css({
            'z-index': this.options.zIndex + layerIndex,
            'width': docWidth,
            'height': docHeight
        });
        this.covLayerBack.show();

        // 目标层之后的层
        for ( i = layerIndex + 1; i < length; i++ ) {
            this.options.layers[i].tpl.hide();
        }
    };

    /**
     * 展示第一层
     */
    CoverLayer.prototype.show = function () {
        this.showLayer(0);
    };

    /**
     * 关闭弹出层
     */
    CoverLayer.prototype.closeAll = function () {
        var length = this.options.layers.length;
        for ( var i = 0; i != length; i++ ) {
            this.options.layers[i].tpl.hide();
        }

        this.covLayerBack.hide();
    };

    return CoverLayer;

} );