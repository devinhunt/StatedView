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
    
    var simpleView = new SimpleView();
    var nestedView = new NestedView();
    
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
    
    return 'Tests done.';
};
}).call(this);