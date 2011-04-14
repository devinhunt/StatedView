statedview.js for backbone.js
=============================

statedview.js adds a simple, event triggered state machine to Backbone.View. This
allows relatively complex UI behavior to be easily modeled and modified without the need
for event handlers and state booleans ('var isOpen') all over the place.

By extending Backbone.StatedView rathar then Backbone.View you gain `state` which 
is the current state the view is in and `states` which is a hash that 
described the state graph for this view. It is a hash of

    {
        'event selector': {
            'startState' : 'endState'
            'startState2' : 'endState2'
        },
        'event2 selector2': {
            'startState2' : 'endState2'
            'startState3' : 'endState3'
        }
    }

and so on. 

A trigger event - like `click .closeButton` for example - is captured 
automatically and the matched against its state map. If a match for the
current state is found, the view is updated to the end state and a 
method of the same name is called, allowing you to act of the transition. 

## Current version

... was written in a couple of hours. Only tested with jQuery 1.5 and the latest underscore.js / backbone.js. Feedback appreciated. 