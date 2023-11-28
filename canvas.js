      // Function to update iframe height based on window width
      function updateIframeHeight() {
        var iframe = document.getElementById('myIframe');
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        console.log(isMobile, navigator.userAgent)
        if (isMobile) {
            iframe.width = '360rem'
        } else {
            iframe.width = (windowWidth < 550 || isMobile) ? '450rem' : '650rem';
        }

        // Set the iframe height to 650rem if window width is more than 650px, otherwise set it to 450rem
        iframe.height = (windowWidth < 550 || isMobile) ? '450rem' : '650rem';
    }

    // Initial call to set the initial height
    updateIframeHeight();

    // Event listener for window resize
    window.addEventListener('resize', updateIframeHeight);