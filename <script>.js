<script>
  // Currency formatting function
  function formatCurrency(inputElement) {
    const value = parseFloat(inputElement.value.replace(/[^\d.]/g, '')) || 0;
    const formattedCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);

    inputElement.value = formattedCurrency;
  }

  // Function to adjust house-fill height based on equity input
  function adjustHouseFill() {
    const equityInput = document.getElementById('equity-real');
    const houseFill = document.getElementById('house-fill');

    const equityValue = equityInput.value.trim();

    houseFill.style.transition = 'height 0.5s ease'; // Ease effect for smooth transition

    if (equityValue === '' || equityValue === '$0') {
      houseFill.style.height = '0px';
    } else {
      houseFill.style.height = '50px';
    }
  }

 function countUpEquity() {
  const equityInput = document.getElementById('equity-real');
  const houseFill = document.getElementById('house-fill');

  let currentEquity = 0;
  const targetEquity = 300000;
  const speed = 1000; // Speed of count-up animation in milliseconds

  const increment = targetEquity / speed;

  const timer = setInterval(() => {
    currentEquity += increment;
    equityInput.value = Math.ceil(currentEquity);

    if (currentEquity >= targetEquity) {
      clearInterval(timer);
      formatCurrency(equityInput); // Format the value as currency when count-up reaches 300,000
      adjustHouseFill();
      calculateBoost(); // Trigger calculation for Boost
      calculatePurchasePower(); // Trigger calculation for Purchase Power
      calculateBankLoan(); // Trigger calculation for Bank Loan
      calculateBoostSpan(); // Trigger calculation for Boost Span (add this line)

    }

    adjustHouseFill();
  }, 1);
}

  document.addEventListener('DOMContentLoaded', function() {
    // Attach currency formatting to the equity-real input
    const equityInput = document.getElementById('equity-real');

    equityInput.addEventListener('input', function() {
      formatCurrency(this);
      adjustHouseFill();
      // Additional actions or calculations related to this input can go here
    });

    countUpEquity(); // Initiates count-up animation for equity-real field
  });
</script>

<!-- Script to set Downpayments Divider to 3 and calculate Boost -->
<script>
  function calculateBoost() {
    const equity = parseFloat(document.getElementById('equity-real').value.replace(/[^0-9.]/g, '')) || 0;
    const downpaymentsDivider = parseFloat(document.getElementById('downpayments-divider').value) || 3;

    const boostValue = isNaN(equity) ? 0 : (equity / downpaymentsDivider);
    document.getElementById('boost').innerText = `$${boostValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    calculatePurchasePower();
  }

  function initializeBoostCalculation() {
    const equityInput = document.getElementById('equity-real');
    const downpaymentsDividerInput = document.getElementById('downpayments-divider');

    function calculateAndDisplayBoost() {
      calculateBoost();
    }

    equityInput.addEventListener('input', calculateAndDisplayBoost);
    downpaymentsDividerInput.addEventListener('input', calculateAndDisplayBoost);

    calculateBoost(); // Initial calculation on page load
  }

  document.addEventListener('DOMContentLoaded', initializeBoostCalculation);
</script>

  <!-- Script to set Boost Multiple to 10 on load -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const boostMultipleInput = document.getElementById('boost-multiple');

      boostMultipleInput.value = '10';
      boostMultipleInput.disabled = true; // Disable the field to prevent changes
    });
  </script>

  <!-- Script to calculate and display Purchase Power -->
<script>
  function calculatePurchasePower() {
    const boost = parseFloat(document.getElementById('boost').innerText.replace(/[^0-9.]/g, '')) || 0;
    const boostMultiple = parseFloat(document.getElementById('boost-multiple').value) || 10;
    const savings = parseFloat(document.getElementById('savings').value.replace(/[^\d.]/g, '')) || 0;
    const equity = parseFloat(document.getElementById('equity-real').value.replace(/[^\d.]/g, '')) || 0;

    const recalculatedPurchasePower = (equity * boostMultiple) + (savings * 10) - boost;

    const purchasePowerFormatted = '$' + recalculatedPurchasePower.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('purchase-power').innerText = purchasePowerFormatted;
  }

  document.addEventListener('DOMContentLoaded', function() {
    calculatePurchasePower();

    const equityInput = document.getElementById('equity-real');
    const savingsInput = document.getElementById('savings');

    equityInput.addEventListener('input', calculatePurchasePower);
    savingsInput.addEventListener('input', calculatePurchasePower);
  });
</script>

  <!-- Script to calculate and display Purchase Power including Savings -->
  <script>
  function calculatePurchasePower() {
    const boost = parseFloat(document.getElementById('boost').innerText.replace(/[^0-9.]/g, '')) || 0;
    const boostMultiple = parseFloat(document.getElementById('boost-multiple').value) || 10;
    const savings = parseFloat(document.getElementById('savings').value.replace(/[^\d.]/g, '')) || 0;

    const purchasePowerValue = (boost * boostMultiple) + (savings * 10);
    const purchasePowerFormatted = '$' + purchasePowerValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.getElementById('purchase-power').innerText = purchasePowerFormatted;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const savingsInput = document.getElementById('savings');

    if (savingsInput) {
      savingsInput.addEventListener('input', function() {
        let value = this.value.replace(/[^\d.]/g, '');
        value = value ? parseFloat(value.replace(/,/g, '')) : 0;
        const formattedValue = '$' + value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/^\$/, '');
        this.value = formattedValue;
        calculatePurchasePower();
      });
    }
  });
</script>

<!-- Script for Bank Loan Calculation -->
<script>
  function calculateBankLoan() {
    const boost = parseFloat(document.getElementById('boost').innerText.replace(/[^0-9.]/g, '')) || 0;
    const savings = parseFloat(document.getElementById('savings').value.replace(/[^\d.]/g, '')) || 0;
    const purchasePower = parseFloat(document.getElementById('purchase-power').innerText.replace(/[^0-9.]/g, '')) || 0;
    
    const recalculatedBankLoan = purchasePower - boost - savings; // Updated calculation to subtract savings

    const formattedBankLoan = '$' + recalculatedBankLoan.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('bank-loan').innerText = formattedBankLoan;
  }

  document.addEventListener('DOMContentLoaded', function() {
    calculateBankLoan(); // Initial calculation on page load

    const equityInput = document.getElementById('equity-real');
    const savingsInput = document.getElementById('savings');

    equityInput.addEventListener('input', () => {
      calculatePurchasePower(); // Update Purchase Power when equity input changes
      calculateBankLoan(); // Recalculate Bank Loan when equity input changes
    });

    savingsInput.addEventListener('input', () => {
      calculateBankLoan(); // Recalculate Bank Loan when savings input changes
    });

    // Add an event listener to recalculate bank loan when boost or boost-multiple changes
    const boostElement = document.getElementById('boost');
    const boostMultipleInput = document.getElementById('boost-multiple');
    
    boostElement.addEventListener('DOMSubtreeModified', calculateBankLoan);
    boostMultipleInput.addEventListener('input', calculateBankLoan);
  });
</script>

<!-- Script to calculate and display Boost Span -->
<script>
  function calculateBoostSpan() {
    const equity = parseFloat(document.getElementById('equity-real').value.replace(/[^0-9.]/g, '')) || 0;
    const boostSpan = document.getElementById('boost-span');
    const boostValue = isNaN(equity) ? 0 : (equity / 3); // Calculating 1/3 of equity

    boostSpan.innerText = `$${boostValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  document.addEventListener('DOMContentLoaded', function() {
    calculateBoostSpan(); // Initial calculation on page load

    const equityInput = document.getElementById('equity-real');

    equityInput.addEventListener('input', calculateBoostSpan); // Recalculate on equity input changes
  });
</script>