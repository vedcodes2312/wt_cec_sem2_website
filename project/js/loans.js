$(document).ready(function() {
    // Calculate EMI
    function calculateEMI(principal, rate, tenure) {
        rate = rate / (12 * 100); // Monthly interest rate
        tenure = tenure * 12; // Total months
        return (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    }

    // Get interest rate based on loan type
    function getInterestRate(type) {
        switch(type) {
            case 'personal': return 12;
            case 'home': return 8.5;
            case 'business': return 15;
            case 'education': return 9;
            default: return 10;
        }
    }

    // Handle loan calculation
    $('#loanForm').submit(function(e) {
        e.preventDefault();
        
        const loanType = $('#loanType').val();
        const amount = parseFloat($('#loanAmount').val());
        const tenure = parseInt($('#tenure').val());
        const income = parseFloat($('#income').val());

        // Validate input
        if (!amount || !tenure || !income) {
            alert('Please fill in all required fields');
            return;
        }

        // Check eligibility
        if (amount > income * 10) {
            alert('Loan amount exceeds eligible limit based on your income');
            return;
        }

        const interestRate = getInterestRate(loanType);
        const emi = calculateEMI(amount, interestRate, tenure);
        const totalAmount = emi * tenure * 12;
        const totalInterest = totalAmount - amount;

        // Update EMI details
        $('#monthlyEmi').text('₹' + emi.toFixed(2));
        $('#interestRate').text(interestRate + '%');
        $('#totalInterest').text('₹' + totalInterest.toFixed(2));
        $('#totalAmount').text('₹' + totalAmount.toFixed(2));
        $('#emiDetails').show();
    });

    // Handle loan application
    $('#applyLoan').click(function() {
        $(this).prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Processing...');

        setTimeout(() => {
            alert('Loan application submitted successfully! Our team will contact you shortly.');
            $('#loanForm')[0].reset();
            $('#emiDetails').hide();
            $(this).prop('disabled', false).text('Apply Now');
        }, 2000);
    });
});