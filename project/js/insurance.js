$(document).ready(function() {
    // Show/hide vehicle fields based on insurance type
    $('#insuranceType').change(function() {
        if ($(this).val() === 'vehicle') {
            $('#vehicleFields').show();
        } else {
            $('#vehicleFields').hide();
        }
    });

    // Calculate premium
    $('#insuranceForm').submit(function(e) {
        e.preventDefault();
        
        const type = $('#insuranceType').val();
        const age = parseInt($('#age').val());
        const coverage = parseInt($('#coverage').val());
        const vehicleType = $('#vehicleType').val();

        // Validate input
        if (!age || !coverage) {
            alert('Please fill in all required fields');
            return;
        }

        if (age < 18 || age > 70) {
            alert('Age must be between 18 and 70 years');
            return;
        }

        // Calculate premium based on type
        let monthlyPremium = 0;
        switch(type) {
            case 'life':
                monthlyPremium = (coverage * 0.0004) + (age * 10);
                break;
            case 'health':
                monthlyPremium = (coverage * 0.0003) + (age * 15);
                break;
            case 'vehicle':
                const vehicleRate = vehicleType === '2wheeler' ? 0.0002 : 0.0003;
                monthlyPremium = coverage * vehicleRate;
                break;
        }

        // Update premium details
        $('#monthlyPremium').text('₹' + monthlyPremium.toFixed(2));
        $('#annualPremium').text('₹' + (monthlyPremium * 12).toFixed(2));
        $('#coverageDisplay').text('₹' + coverage.toLocaleString());
        $('#premiumDetails').show();
    });

    // Handle buy insurance
    $('#buyInsurance').click(function() {
        $(this).prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Processing...');

        setTimeout(() => {
            alert('Insurance policy created successfully! Policy documents will be sent to your email.');
            $('#insuranceForm')[0].reset();
            $('#premiumDetails').hide();
            $(this).prop('disabled', false).text('Buy Now');
        }, 2000);
    });
});