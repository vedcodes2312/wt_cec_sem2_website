$(document).ready(function() {
    // Sample transaction data
    const transactions = [
        { date: '2024-03-15', upiId: 'john@upi', amount: 1000, status: 'Success' },
        { date: '2024-03-14', upiId: 'mary@upi', amount: 500, status: 'Success' },
        { date: '2024-03-13', upiId: 'sam@upi', amount: 2000, status: 'Failed' }
    ];

    // Populate transactions table
    function displayTransactions() {
        const tbody = $('#transactionsList');
        tbody.empty();

        transactions.forEach(transaction => {
            const row = `
                <tr>
                    <td>${transaction.date}</td>
                    <td>${transaction.upiId}</td>
                    <td>₹${transaction.amount}</td>
                    <td><span class="badge ${transaction.status === 'Success' ? 'bg-success' : 'bg-danger'}">${transaction.status}</span></td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // Handle UPI payment form submission
    $('#upiForm').submit(function(e) {
        e.preventDefault();
        
        const upiId = $('#upiId').val();
        const amount = $('#amount').val();
        const note = $('#note').val();

        // Validate input
        if (!upiId || !amount) {
            alert('Please fill in all required fields');
            return;
        }

        if (!upiId.includes('@')) {
            alert('Please enter a valid UPI ID');
            return;
        }

        // Simulate payment processing
        $('#upiForm button').prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Processing...');

        setTimeout(function() {
            // Add new transaction to list
            transactions.unshift({
                date: new Date().toISOString().split('T')[0],
                upiId: upiId,
                amount: parseFloat(amount),
                status: 'Success'
            });

            // Update display
            displayTransactions();

            // Reset form
            $('#upiForm')[0].reset();
            $('#upiForm button').prop('disabled', false).text('Pay Now');

            // Show success message
            alert('Payment successful!');
        }, 2000);
    });

    // Initialize transactions display
    displayTransactions();
});