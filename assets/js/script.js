initSmoothScrolling();

function initSmoothScrolling() {

    
    var duration = 400;
    
    var pageUrl = location.hash
        ? stripHash(location.href)
        : location.href
    ;
    
    delegatedLinkHijacking();

    var sideNavItems = document.querySelectorAll('.list-s1 li a');
    var sideNav = document.querySelector('.chapters>ul');
    var sideNavToggle = document.querySelector('.list-s1__toggle');

    sideNavToggle.addEventListener('click', function(e) {
        if(!e.target.classList.contains('open')) {
            e.target.classList.add('open');
            sideNav.classList.add('open');
        }
        else {
            e.target.classList.remove('open');
            sideNav.classList.remove('open');
        }
    }, false);
    
    function delegatedLinkHijacking() {
        document.body.addEventListener('click', onClick, false);
        
        function onClick(e) {
            if (!isInPageLink(e.target))
                return;
            
            e.stopPropagation();
            e.preventDefault();

            [].forEach.call(sideNavItems, function(a) {
                a.classList.remove('active');
            });

            e.target.classList.add('active');

            // when using mobile, toggle the open class and adjust the offset for the scroll
            if(sideNavToggle.classList.contains('open')) {
                sideNavToggle.classList.remove('open');
                sideNav.classList.remove('open');
                var offset = -25;
            }
            
            jump(e.target.hash, {
                duration: duration,
                offset: typeof offset != 'undefined' ? offset : 0,
                callback: function() {
                    setFocus(e.target.hash);
                }
            });
        }
    }

    function isInPageLink(n) {
        return n.tagName.toLowerCase() === 'a' 
            && n.hash.length > 0
            && stripHash(n.href) === pageUrl
        ;
    }
        
    function stripHash(url) {
        return url.slice(0, url.lastIndexOf('#'));
    }

    // Adapted from:
    // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
    function setFocus(hash) {
        var element = document.getElementById(hash.substring(1));

        if (element) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }

            element.focus();
        }
    }

}
