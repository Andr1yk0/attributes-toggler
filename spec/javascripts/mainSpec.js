describe('AttributeToggler', function () {
    var defaultTrigger = 'click';
    var eventNamespace = '.toggler';
    jasmine.getFixtures().fixturesPath = 'base/spec/javascripts/fixtures';


   it('tests are ready', function () {
       expect(AttributeToggler).toBeDefined();
       expect(loadFixtures).toBeDefined();
       loadFixtures('toggleClassOnDefault.html');
       expect($('#toggleClassOnDefault')).toExist();
   });

   it('can find elements by attribute and prepare them', function () {
        loadFixtures('toggleClassOnDefault.html');
        AttributeToggler.init();
        var expectVal = {
            domEl:$('#toggleClassOnDefault'),
            trigger: defaultTrigger,
            attrName: 'class',
            value: 'two'
        };
        expect(AttributeToggler.getElements()[0]).toEqual(expectVal)
   });


   
   it('can toggle attributes by click', function () {
       loadFixtures('toggleClassOnDefault.html');
       AttributeToggler.init();
       var $toggleClassOnDefault = $('#toggleClassOnDefault');
       expect($toggleClassOnDefault).toHaveClass('one');

       $toggleClassOnDefault.trigger('click');
       expect($toggleClassOnDefault).toHaveClass('two');

       $toggleClassOnDefault.trigger('click');
       expect($toggleClassOnDefault).toHaveClass('one');
   });

   it('can toggle attributes by hover', function () {
       loadFixtures('toggleHrefOnHover.html');
       AttributeToggler.init();
       var $toggleHrefOnHover = $('#toggleHrefOnHover');
       expect(AttributeToggler.getElements()[0].trigger).toEqual('mouseenter'+eventNamespace+' mouseleave'+eventNamespace);


       expect($toggleHrefOnHover.attr('href')).toEqual('one');
       $toggleHrefOnHover.trigger('mouseenter');
       expect($toggleHrefOnHover.attr('href')).toEqual('two');

       $toggleHrefOnHover.trigger('mouseleave');
       expect($toggleHrefOnHover.attr('href')).toEqual('one');
   });

    it('can stop toggling for all elements', function () {
        loadFixtures('toggleClassOnDefault.html','toggleHrefOnHover.html');
        AttributeToggler.init();
        var $toggleClassOnDefault = $('#toggleClassOnDefault'), $toggleHrefOnHover = $('#toggleHrefOnHover');
        $toggleClassOnDefault.trigger('click');
        $toggleHrefOnHover.trigger('mouseenter');
        expect($toggleClassOnDefault).toHaveClass('two');
        expect($toggleHrefOnHover.attr('href')).toEqual('two');

        $toggleClassOnDefault.trigger('click');
        $toggleHrefOnHover.trigger('mouseleave');
        expect($toggleClassOnDefault).toHaveClass('one');
        expect($toggleHrefOnHover.attr('href')).toEqual('one');

        AttributeToggler.stop();
        $toggleClassOnDefault.trigger('click');
        $toggleHrefOnHover.trigger('mouseenter');
        expect($toggleClassOnDefault).toHaveClass('one');
        expect($toggleHrefOnHover.attr('href')).toEqual('one');
    });
    
    // it('can toggle part of attribute', function () {
    //     loadFixtures('toggleOneClass.html');
    //     AttributeToggler.init();
    //     var $toogleOneClass = $('#toggleOneClass');
    //     expect($toogleOneClass).toHaveClass('active one');
    //     $toogleOneClass.trigger('click');
    //     expect($toogleOneClass).toHaveClass('active two');
    // })

});
