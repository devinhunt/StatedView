// Simple tests for stated view 

(function() {
    
window.StatedViewTests = function() {
    
    function assert(pass, msg) {
        console.debug((pass ? 'PASS: ' : 'FAIL: ') + msg);
    }
    
    /**
     * Test simple state transition
     */
    var SimpleView = Backbone.StatedView.extend({
        
        tagName: 'div',
        className: 'test-elt',
        
        state: 'off',
        states: {
            'click': {
                'off' : 'on',
                'on' : 'off'
            }
        },
        
        on : function() {
        },
        
        off : function() {
        },
    });
    
    /**
     * Test simple state transition
     */
    var NestedView = Backbone.StatedView.extend({
        
        tagName: 'div',
        className: 'test-elt',
        template: _.template('<div class="inner"></div>'),
        
        state: 'off',
        states: {
            'click .inner': {
                'off' : 'on',
                'on' : 'off'
            }
        },
        
        render: function() {
            $(this.el).html(this.template());
            return this;
        }, 
        
        on : function() {
        },
        
        off : function() {
        },
    });
    
    var SpaceShuttleView = Backbone.StatedView.extend({
        tagName: 'div',
        className: 'test-elt',
        template: _.template('<div class="fuelup"></div><div class="launch"></div><div class="abort"></div><div class="reset"></div>'),
        
        state: 'pad',
        states: {
            'click .fuelup': {
                'pad' : 'fueled',
            },
            'click .launch': {
                'fueled' : 'launch',
            },
            'click .abort': {
                'pad' : 'abort',
                'fueled' : 'abort',
                'launch' : 'abort'
            },
            'click .reset': {
                'launch' : 'pad',
                'abort' : 'pad'
            },
        },
        
        render: function() {
            $(this.el).html(this.template());
            return this;
        }, 
        
        pad : function() {
        },
        
        fueled : function() {
        },
        
        launch : function() {
        },
        
        abort : function() {
        },
        
    });
    
    var simpleView = new SimpleView();
    var nestedView = new NestedView();
    var shuttleView = new SpaceShuttleView();
    
    console.log("-------- Starting Simple Test --------");
    $(simpleView.el).trigger('click');
    assert(simpleView.state == 'on', 'Click moved the view into the "on" state. ');
    $(simpleView.el).trigger('click');
    assert(simpleView.state == 'off', 'Click moved the view into the "off" state. ');
    $(simpleView.el).trigger('click');
    assert(simpleView.state == 'on', 'Click moved the view back into the "on" state. ');
    
    console.log("-------- Starting Nested Element Test --------");
    nestedView.render();
    $('.inner', nestedView.el).trigger('click');
    assert(nestedView.state == 'on', 'Click moved the view into the "on" state. ');
    $('.inner', nestedView.el).trigger('click');
    assert(nestedView.state == 'off', 'Click moved the view into the "off" state. ');
    $('.inner', nestedView.el).trigger('click');
    assert(nestedView.state == 'on', 'Click moved the view back into the "on" state. ');
    
    console.log("-------- Starting Complex State Graph Test --------");
    shuttleView.render();
    assert(shuttleView.state == 'pad', 'Space shuttle is on the pad');
    $('.fuelup', shuttleView.el).trigger('click');
    assert(shuttleView.state == 'fueled', 'Space shuttle has fuel');
    $('.launch', shuttleView.el).trigger('click');
    assert(shuttleView.state == 'launch', 'Space shuttle is ready for launch');
    $('.reset', shuttleView.el).trigger('click');
    assert(shuttleView.state == 'pad', 'Space shuttle has been reset');
    $('.fuelup', shuttleView.el).trigger('click');
    $('.launch', shuttleView.el).trigger('click');
    $('.abort', shuttleView.el).trigger('click');
    assert(shuttleView.state == 'abort', 'Space shuttle successfully aborted');
    
    return 'Tests done.';
};
}).call(this);