import React, { useState } from 'react';

function TransactionForm({ onDeposit, onWithdraw, onAddInterest, onBankFee, setErrorMessage, balance }) {
    // I’m setting up the state for deposit, withdrawal, and interest rate.
   const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [interestRate, setInterestRate] = useState(3); // Default interest rate of 3%

  // Here, I'm handling deposit submission.
  const handleDepositSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // I’m converting the deposit amount to a float and trimming any extra spaces.
    const amount = parseFloat(depositAmount.trim());
       
    // If the amount is invalid or less than or equal to 0, I’ll show an error.
     if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid positive number for deposit.');
    } else {
     // If everything looks fine, I’m calling onDeposit (the function from the parent) to update the balance.
       onDeposit(amount);
      setDepositAmount(''); // Clearing the deposit input field
      setErrorMessage(''); // Clearing any existing error messages
    }
  };

  // Handle withdraw submission
  const handleWithdrawSubmit = (e) => {
    e.preventDefault(); // Preventing the default form submission
    
    // I’m parsing the withdrawal amount to make sure it’s a valid number.
    const amount = parseFloat(withdrawAmount.trim());
  
    console.log("Parsed Withdraw Amount:", amount);  // Debugging the parsed value
  
    // If the amount is invalid (NaN) or less than or equal to 0, I’ll show an error.
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid amount to withdraw. Amount must be greater than 0.");
    } else if (amount > balance) { // Checking if the amount exceeds balance
      setErrorMessage("Insufficient funds for withdrawal.");
    } else {
      onWithdraw(amount);  // Call onWithdraw with the valid amount
      setWithdrawAmount('');  // Clearing the withdrawal input field
      setErrorMessage('');  
    }
  };

  // Handle interest submission
  const handleInterestSubmit = (e) => {
    e.preventDefault(); // Prevents default behavior
    onAddInterest(interestRate); // Calling the onAddInterest function to apply interest to the balance
  };

  return (
    <div className="transaction-form">
      <div className="form-group"> {/* Deposit Form */}
        <h3>Deposit</h3>
        <form onSubmit={handleDepositSubmit}>
          <input
            type="number"
            placeholder="Deposit Amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)} // Updates the deposit amount as the user types
          />
          <button type="submit">Deposit</button>
        </form>
      </div>

      <div className="form-group">
        <h3>Withdraw</h3> {/* Withdraw Form */}
      <form onSubmit={handleWithdrawSubmit}>
          <input
            type="number"
            placeholder="Withdraw Amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)} // Updates the withdraw amount as the user types
          />
          <button type="submit">Withdraw</button>
        </form>
      </div>

      <div className="form-group">
        <h3>Add Interest</h3> {/* Interest Form */}
        <form onSubmit={handleInterestSubmit}>
          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)} // Updates interest rate as the user types
          />
          <button type="submit">Add Interest</button>
        </form>
      </div>

      <div className="form-group">
        <h3>Bank Fee</h3> {/* Bank Fee Form */}
         <form onSubmit={(e) => { e.preventDefault(); onBankFee(); }}>
          <input
            type="text"
            value="Charge Bank Fee"
            disabled
            className="disabled-input"
          />
          <button type="submit" className="btn btn-warning">£5</button>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;


