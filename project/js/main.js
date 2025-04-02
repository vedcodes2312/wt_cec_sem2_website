$(document).ready(function() {
    // Load configuration from XML
    $.ajax({
        url: 'data/config.xml',
        dataType: 'xml',
        success: function(data) {
            // Parse company info
            const companyName = $(data).find('company > name').text();
            const supportEmail = $(data).find('support > email').text();
            const supportPhone = $(data).find('support > phone').text();
            
            // Update footer information
            $('.company-name').text(companyName);
            $('.support-email').text(supportEmail);
            $('.support-phone').text(supportPhone);
            
            // Store rates in localStorage for other pages
            const goldRate = $(data).find('goldRate').text();
            const fdRates = {};
            $(data).find('fdRates > months').each(function() {
                fdRates[$(this).attr('value')] = $(this).text();
            });
            
            localStorage.setItem('goldRate', goldRate);
            localStorage.setItem('fdRates', JSON.stringify(fdRates));
        },
        error: function() {
            console.error('Failed to load configuration');
        }
    });

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Initialize popovers
    $('[data-bs-toggle="popover"]').popover();

    // Get Started button click handler with smooth scroll
    $('#getStarted').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#services').offset().top
        }, 1000);
    });

    // Add floating back to top button
    const backToTop = $('<button>')
        .addClass('btn btn-primary position-fixed bottom-0 end-0 m-3 rounded-circle')
        .html('<i class="bi bi-arrow-up"></i>')
        .css({
            width: '50px',
            height: '50px',
            display: 'none',
            'z-index': 1000
        })
        .click(function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
        });

    $('body').append(backToTop);

    // Show/hide back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    // Animate cards on scroll
    $(window).scroll(function() {
        $('.card').each(function() {
            const cardPosition = $(this).offset().top;
            const scrollPosition = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            if (scrollPosition + windowHeight > cardPosition) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    });

    // Add loading spinner
    $(document).ajaxStart(function() {
        $('#loadingSpinner').show();
    }).ajaxStop(function() {
        $('#loadingSpinner').hide();
    });

    // Currency formatter
    window.formatCurrency = function(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Show welcome message with custom modal
    if (!localStorage.getItem('welcomed')) {
        const welcomeModal = `
            <div class="modal fade" id="welcomeModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Welcome to PayEase India!</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>Experience the future of digital banking with India's most trusted fintech platform.</p>
                            <div class="features-list">
                                <div class="feature-item mb-2">
                                    <i class="bi bi-phone text-primary"></i>
                                    <span>Instant UPI Payments</span>
                                </div>
                                <div class="feature-item mb-2">
                                    <i class="bi bi-graph-up text-success"></i>
                                    <span>Smart Investments</span>
                                </div>
                                <div class="feature-item mb-2">
                                    <i class="bi bi-shield-check text-info"></i>
                                    <span>Secure Insurance</span>
                                </div>
                                <div class="feature-item">
                                    <i class="bi bi-cash-coin text-warning"></i>
                                    <span>Quick Loans</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(welcomeModal);
        
        setTimeout(function() {
            new bootstrap.Modal('#welcomeModal').show();
            localStorage.setItem('welcomed', 'true');
        }, 1000);
    }

    // Add theme switcher
    const themeSwitcher = $('<div>')
        .addClass('position-fixed top-0 end-0 m-3')
        .html(`
            <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-palette"></i> Theme
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" data-theme="light">Light</a></li>
                    <li><a class="dropdown-item" href="#" data-theme="dark">Dark</a></li>
                </ul>
            </div>
        `);

    $('body').append(themeSwitcher);

    // Handle theme switching
    $('.dropdown-item').click(function(e) {
        e.preventDefault();
        const theme = $(this).data('theme');
        $('body').attr('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    $('body').attr('data-bs-theme', savedTheme);
});