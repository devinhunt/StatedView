// statedview.js
// (c) 2010 Devin Hunt, Lyst Inc. 

(function() {
    /**
     * StatedView
     * StatedView provides simple state machine support allowing complex UI
     * interaction to be modeled in simple dictionary.
     * The states are stored in this.states which is a hash of
     *
     * {
     *   'state1': {
     *     'eventname', 'state2',
     *     'eventname selector', 'state3'
     *   },
     *   'state2': {
     *     'eventname', 'state1',
     *   }
     * }
     *
     * The first state is the state the view starts in. 
     *
     * Stated view automatically matches this finite state paths and 
     * follow them. When a state is arrived at, it call a function
     * of the same name in the Stated View object.
     */
    
    var eventSplitter = /^(\w+)\s*(.*)$/;
     
    Backbone.StatedView = function(options) {
        this._configure(options || {});
        this._ensureElement();
        this.delegateEvents();
        this.delegateState();
        this.initialize(options);
    };

    _.extend(Backbone.StatedView.prototype, Backbone.View.prototype, {
        delegateState: function(states) {
            if(! (states || (states = this.states))) return;
            
            var _this = this;
            
            function stateDispatch(event) {
                var key = event.data;
                var stateMap = states[key];
                var newState = stateMap[_this.state];
                if(newState) {
                    _this.state = newState;
                    _this[newState](event);
                }
            }
            
            $(this.el).unbind();
            var firstState = undefined;
            
            for(var key in states) {
                var match = key.match(eventSplitter);
                var eventName = match[1];
                var selector = match[2];
                var stateMap = states[key];
                
                if(selector === '') {
                    $(this.el).bind(eventName, key, stateDispatch);
                } else {
                    $(this.el).delegate(selector, eventName, key, stateDispatch);
                }
            }
        }
    });
    
    Backbone.StatedView.extend = Backbone.View.extend;
    
}).call(this);