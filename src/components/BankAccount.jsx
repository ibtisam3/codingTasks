import React, { useState } from 'react';
import TransactionForm from './TransactionForm';

function BankAccount() {
  const [balance, setBalance] = useState(200);  // Starting balance of 200
  const [errorMessage, setErrorMessage] = useState('');  // State to hold error messages

  // Handle deposit functionality
  const handleDeposit = (amount) => {
    if (amount > 0) {
      setBalance(balance + amount);// If the amount is positive, I’ll update the balance and clear any error message
       setErrorMessage('');
    } else { // If the deposit is invalid (<= 0), I’ll show an error message
    setErrorMessage('Deposit amount must be positive.');
    }
  };

  // Handle withdrawal functionality
  const handleWithdraw = (amount) => {
    // making sure the amount is a valid number before proceeding
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid amount to withdraw.');
    } else if (amount > balance) { // Checking if amount exceeds the balance
      setErrorMessage('Insufficient funds for withdrawal.'); //show this error if it does
    } else {
      // If everything is valid, I’ll reduce the balance by the withdrawal amount
      setBalance(balance - amount);
      setErrorMessage('');  // Clear any existing error message
    }
  };

  // Handle adding interest functionality
  const handleAddInterest = (rate) => {

   // Calculate the interest based on the current balance and the given interest rate
   const interest = (balance * rate) / 100;
    setBalance(balance + interest);  // Updating the balance with interest
    setErrorMessage(''); // Clear any existing error message
  };

  // Handle charging bank fee functionality
  const handleBankFee = () => {
    const fee = 5;  // Fixed £5 fee
    const newBalance = balance - fee; // Calculating new balance after the fee
    if (newBalance < 0) {
      setBalance(newBalance);
      setErrorMessage('You have gone into overdraft! Please contact your bank.'); //error message if overdraft
    } else {
      setBalance(newBalance); //updating the balance
      setErrorMessage('');
    }
  };

  return (
    <div className="App">
      <h2>Current Balance: £{balance.toFixed(2)}</h2>

      {/* Error message displayed at the top */}
      <div className={`error-message ${errorMessage ? 'show' : ''}`}>
        {errorMessage}
      </div>

      <TransactionForm
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        onAddInterest={handleAddInterest}
        onBankFee={handleBankFee}
        setErrorMessage={setErrorMessage}
        balance={balance}  // Passing the balance to TransactionForm
      />
    </div>
  );
}

export default BankAccount;


