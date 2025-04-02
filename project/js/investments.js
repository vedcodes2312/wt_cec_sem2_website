$(document).ready(function() {
    // Load configuration from XML
    $.ajax({
        url: 'data/config.xml',
        dataType: 'xml',
        success: function(data) {
            // Get investment rates
            const goldRate = parseFloat($(data).find('goldRate').text());
            const minSIP = parseFloat($(data).find('minSIP').text());
            
            // Update minimum SIP amount
            $('.sip-amount').attr('min', minSIP);
            
            // Add gold rate display
            $('.gold-rate').text(`Current Rate: ₹${goldRate}/gram`);
            
            // Update FD rates
            $(data).find('fdRates > months').each(function() {
                const months = $(this).attr('value');
                const rate = $(this).text();
                $(`.fd-rate-${months}`).text(`${rate}% p.a.`);
            });
        }
    });

    // Sample portfolio data
    const portfolio = [];

    // Display portfolio with enhanced UI
    function displayPortfolio() {
        const tbody = $('#portfolioList');
        tbody.empty();

        if (portfolio.length === 0) {
            tbody.append(`
                <tr>
                    <td colspan="4" class="text-center py-4">
                        <div class="text-muted">
                            <i class="bi bi-inbox-fill fs-1"></i>
                            <p class="mt-2">No investments yet</p>
                        </div>
                    </td>
                </tr>
            `);
            return;
        }

        portfolio.forEach(investment => {
            const row = `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <i class="bi ${getInvestmentIcon(investment.type)} me-2"></i>
                            ${investment.type}
                        </div>
                    </td>
                    <td>₹${investment.amount.toLocaleString()}</td>
                    <td>${formatDate(investment.date)}</td>
                    <td>
                        <span class="badge bg-success">
                            <i class="bi bi-check-circle me-1"></i>
                            Active
                        </span>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });

        // Add portfolio summary
        updatePortfolioSummary();
    }

    // Get investment icon
    function getInvestmentIcon(type) {
        if (type.includes('Gold')) return 'bi-coin text-warning';
        if (type.includes('SIP')) return 'bi-graph-up text-success';
        return 'bi-bank text-primary';
    }

    // Format date
    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-IN', options);
    }

    // Update portfolio summary
    function updatePortfolioSummary() {
        const total = portfolio.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
        const summary = `
            <div class="card mt-4">
                <div class="card-body">
                    <h5 class="card-title">Portfolio Summary</h5>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <div class="text-muted">Total Investments</div>
                            <div class="h4">₹${total.toLocaleString()}</div>
                        </div>
                        <div class="col-md-4">
                            <div class="text-muted">Active Investments</div>
                            <div class="h4">${portfolio.length}</div>
                        </div>
                        <div class="col-md-4">
                            <div class="text-muted">Last Investment</div>
                            <div class="h4">${portfolio.length ? formatDate(portfolio[0].date) : '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('#portfolioSummary').html(summary);
    }

    // Handle Digital Gold investment with enhanced validation
    $('.invest-gold').click(function() {
        const amount = $(this).closest('.card-body').find('.gold-amount').val();
        
        if (!amount || amount < 1) {
            showError('Please enter a valid amount');
            return;
        }

        // Show confirmation modal
        showConfirmation('Digital Gold', amount, () => {
            processInvestment(this, 'Digital Gold', amount);
        });
    });

    // Handle SIP investment with enhanced validation
    $('.invest-sip').click(function() {
        const amount = $(this).closest('.card-body').find('.sip-amount').val();
        
        if (!amount || amount < 500) {
            showError('Minimum SIP amount is ₹500');
            return;
        }

        // Show confirmation modal
        showConfirmation('Mutual Fund SIP', amount, () => {
            processInvestment(this, 'Mutual Fund SIP', amount);
        });
    });

    // Handle Fixed Deposit with enhanced validation
    $('.invest-fd').click(function() {
        const amount = $(this).closest('.card-body').find('.fd-amount').val();
        const duration = $(this).closest('.card-body').find('.fd-duration').val();
        
        if (!amount || amount < 1000) {
            showError('Minimum FD amount is ₹1,000');
            return;
        }

        // Show confirmation modal
        showConfirmation(`Fixed Deposit (${duration} months)`, amount, () => {
            processInvestment(this, `Fixed Deposit (${duration} months)`, amount);
        });
    });

    // Process investment
    function processInvestment(button, type, amount) {
        $(button).prop('disabled', true)
            .html('<span class="spinner-border spinner-border-sm"></span> Processing...');

        // Simulate API call
        setTimeout(() => {
            portfolio.unshift({
                type: type,
                amount: parseFloat(amount),
                date: new Date().toISOString().split('T')[0]
            });

            displayPortfolio();
            $(button).prop('disabled', false).text('Invest Now');
            $(button).closest('.card-body').find('input').val('');
            
            showSuccess('Investment successful!');
        }, 1500);
    }

    // Show error message
    function showError(message) {
        const toast = `
            <div class="toast align-items-center text-white bg-danger border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-exclamation-circle me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        showToast(toast);
    }

    // Show success message
    function showSuccess(message) {
        const toast = `
            <div class="toast align-items-center text-white bg-success border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-check-circle me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        showToast(toast);
    }

    // Show toast
    function showToast(toast) {
        const toastContainer = $('.toast-container');
        toastContainer.append(toast);
        const toastElement = new bootstrap.Toast(toastContainer.children().last()[0]);
        toastElement.show();
    }

    // Show confirmation modal
    function showConfirmation(type, amount, callback) {
        const modal = `
            <div class="modal fade" id="confirmInvestment">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Confirm Investment</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>Please confirm your investment details:</p>
                            <div class="mb-3">
                                <strong>Type:</strong> ${type}
                            </div>
                            <div class="mb-3">
                                <strong>Amount:</strong> ₹${parseFloat(amount).toLocaleString()}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="confirmButton">Confirm Investment</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        $('#confirmInvestment').remove();
        
        // Add new modal
        $('body').append(modal);
        
        // Show modal
        const modalElement = new bootstrap.Modal('#confirmInvestment');
        modalElement.show();
        
        // Handle confirmation
        $('#confirmButton').click(function() {
            modalElement.hide();
            callback();
        });
    }

    // Initialize portfolio display
    displayPortfolio();

    // Add toast container
    $('body').append('<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
});