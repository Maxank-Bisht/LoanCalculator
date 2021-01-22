document.getElementById('loan-form').addEventListener('submit', function (e) {
    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loader').style.display = 'block';

    setTimeout(calculateResult, 2000);
    e.preventDefault();
});

function calculateResult(e) {
   
    //UI vars
    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthyPay = document.getElementById('monthly-payment');
    const UItotalPay = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');
    
    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    //Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        UImonthyPay.value = monthly.toFixed(2);
        UItotalPay.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show results
        document.getElementById('results').style.display = 'block';
        //hide loader
        document.getElementById('loader').style.display = 'none';
    } else {
        showError('Please Check Your Numbers!');
    }
}
function showError(message) {
    //hide results
    document.getElementById('results').style.display = 'none';
    //hide loader
    document.getElementById('loader').style.display = 'none';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'alert alert-danger';
    messageDiv.appendChild(document.createTextNode(message));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(messageDiv, heading);

    setTimeout(clearError, 2000);
}
function clearError() {
    document.querySelector('.alert').remove();
}