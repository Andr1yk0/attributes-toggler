var AttributeToggler = (function () {
    var elements = [];
    var trigger = 'click';
    var eventNamespace = '.toggler';
    var triggerAliaces = {
        hover:'mouseenter'+eventNamespace+' mouseleave'+eventNamespace
    };
    var init = function (options) {
        if(elements.length>0){
            stop();
        }
        var all = $('[data-toggle]');
        all.each(function (i,e) {
            var event = $(e).data('toggle-trigger');
            if(triggerAliaces.hasOwnProperty(event)){
                event = triggerAliaces[event];
            }
            var newEl = {
                domEl:$(e),
                attrName:$(e).data('toggle'),
                trigger:event?event:trigger,
                value:$(e).data('toggle-value')
            };
            if($(e).attr('data-toggle-part')){
                newEl.part = $(e).attr('data-toggle-part');
            }
            elements.push(newEl);
        });
        
        $.each(elements,function (i,obj) {
            _toggle(obj)
        })
    };

    var stop = function () {
        $.each(elements, function (i,el) {
            $(el.domEl).off(eventNamespace);
        });
        elements = [];
    };

    var getElements = function () {
      return elements
    };
    
    var _toggle = function (obj) {
        $(obj.domEl).on(obj.trigger+eventNamespace, function () {
            var el = $(this);
            var newVal = el.attr('data-toggle-value');
            if(!newVal){
                el.attr('data-toggle-value',obj.value)
                newVal = obj.value;
            }
            el.attr('data-toggle-value',el.attr(obj.attrName)).attr(obj.attrName,newVal);
        })
    };

    return {
        getElements:getElements,
        init:init,
        stop:stop
    }
})();
