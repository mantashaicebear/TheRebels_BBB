import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { motion } from 'framer-motion';
import './SheFunds.css';

// Color palette
const colors = {
    primaryPurple: '#C599B6',
    secondaryPink: '#E6B2BA',
    accentPeach: '#FAD0C4',
    backgroundCream: '#FFF7F3',
  };

// Main Dashboard Component
const CalculatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('expense');
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };
  
  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, delay: 0.3 } }
  };
  
  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="calculator-dashboard" style={{ backgroundColor: colors.backgroundCream, width: '101%' }}>
      <motion.div 
        className="dashboard-header"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >

    <header className="p-4 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.accentPeach, padding: '1rem' , alignContent: 'center'}}>
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigateTo('home')}
        >
          <h1>Financial Planning Tools</h1>
          <p>Take control of your financial future with our easy-to-use calculators</p>
        </div>
      </header>
        
      </motion.div>
      
      <motion.div 
        className="quick-tips"
        initial="hidden"
        animate="visible"
        variants={staggerCards}
      >
        <motion.div className="tip-card" variants={cardAnimation}>
          <h3>Budgeting Tip</h3>
          <p>Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings & debt repayment.</p>
        </motion.div>
        <motion.div className="tip-card" variants={cardAnimation}>
          <h3>Investing Tip</h3>
          <p>Start early! Even small amounts benefit from compound interest over time.</p>
        </motion.div>
        <motion.div className="tip-card" variants={cardAnimation}>
          <h3>Saving Tip</h3>
          <p>Set up automatic transfers to your savings account on payday.</p>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="calculator-tabs"
        initial="hidden"
        animate="visible"
        variants={slideUp}

      >
        <button 
          className={activeTab === 'expense' ? 'active' : ''} 
          onClick={() => setActiveTab('expense')}
        >
          Expense Tracker
        </button>
        
        <button 
          className={activeTab === 'savings' ? 'active' : ''} 
          onClick={() => setActiveTab('savings')}
        >
          Savings Goal
        </button>
        
        <button 
          className={activeTab === 'investment' ? 'active' : ''} 
          onClick={() => setActiveTab('investment')}
        >
          Investment Return
        </button>
      </motion.div>
      
      <motion.div 
        className="calculator-container"
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 'expense' && <ExpenseTracker />}
        {activeTab === 'savings' && <SavingsCalculator />}
        {activeTab === 'investment' && <InvestmentCalculator />}
      </motion.div>
    </div>
  );
};

// Expense Tracker Component
const ExpenseTracker = () => {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState([
    { category: 'Housing', amount: 1500, color: '#C599B6' },
    { category: 'Food', amount: 600, color: '#E6B2BA' },
    { category: 'Transportation', amount: 400, color: '#FAD0C4' },
    { category: 'Utilities', amount: 300, color: '#FFF7F3' },
    { category: 'Entertainment', amount: 200, color: '#C599B6' }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [balance, setBalance] = useState(0);
  
  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setBalance(income - totalExpenses);
  }, [income, expenses]);
  
  const handleAddExpense = () => {
    if (newCategory && newAmount) {
      const colors = ['#C599B6', '#E6B2BA', '#FAD0C4', '#FFF7F3'];
      const newExpense = {
        category: newCategory,
        amount: parseFloat(newAmount),
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setExpenses([...expenses, newExpense]);
      setNewCategory('');
      setNewAmount('');
    }
  };
  
  const handleReset = () => {
    setExpenses([
      { category: 'Housing', amount: 0, color: '#C599B6' },
      { category: 'Food', amount: 0, color: '#E6B2BA' },
      { category: 'Transportation', amount: 0, color: '#FAD0C4' },
      { category: 'Utilities', amount: 0, color: '#FFF7F3' }
    ]);
  };
  
  const updateExpense = (index, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].amount = parseFloat(value) || 0;
    setExpenses(updatedExpenses);
  };
  
  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };
  
  return (
    <motion.div 
      className="expense-tracker"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="calculator-grid">
        <div className="input-section">
          <h2>Monthly Budget</h2>
          <div className="form-group">
            <label>Monthly Income ($)</label>
            <input 
              type="number" 
              value={income} 
              onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              min="0"
            />
          </div>
          
          <h3>Expenses</h3>
          {expenses.map((expense, index) => (
            <motion.div 
              key={index} 
              className="expense-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="expense-color" style={{ backgroundColor: expense.color }}></div>
              <div className="expense-category">{expense.category}</div>
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => updateExpense(index, e.target.value)}
                min="0"
              />
              <button className="remove-btn" onClick={() => removeExpense(index)}>×</button>
            </motion.div>
          ))}
          
          <div className="add-expense">
            <input
              type="text"
              placeholder="Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              min="0"
            />
            <button onClick={handleAddExpense}>Add</button>
          </div>
          
          <motion.div 
            className="balance-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="balance-label">Remaining Balance:</div>
            <div className={`balance-amount ${balance < 0 ? 'negative' : 'positive'}`}>
              ${balance.toFixed(2)}
            </div>
          </motion.div>
          
          <button className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
        
        <div className="chart-section">
          <h3>Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenses.filter(expense => expense.amount > 0)}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                dataKey="amount"
                nameKey="category"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {expenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={expenses.filter(expense => expense.amount > 0)}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              <Bar dataKey="amount">
                {expenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

// Savings Goal Calculator
const SavingsCalculator = () => {
  const [goalAmount, setGoalAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [interestRate, setInterestRate] = useState(2);
  const [timeNeeded, setTimeNeeded] = useState(0);
  const [savingsData, setSavingsData] = useState([]);
  
  useEffect(() => {
    calculateSavings();
  }, [goalAmount, monthlyContribution, interestRate]);
  
  const calculateSavings = () => {
    const rate = interestRate / 100 / 12;
    let months = 0;
    let currentSavings = 0;
    const data = [];
    
    // If interest rate is zero, simple division
    if (interestRate === 0) {
      months = Math.ceil(goalAmount / monthlyContribution);
    } else {
      // Calculate through iteration for visualization purposes
      while (currentSavings < goalAmount && months < 600) { // Cap at 50 years
        months++;
        currentSavings += monthlyContribution;
        currentSavings *= (1 + rate);
        
        if (months % 3 === 0 || months === 1) {
          data.push({
            month: months,
            savings: currentSavings
          });
        }
      }
    }
    
    setTimeNeeded(months);
    setSavingsData(data);
  };
  
  const progressPercentage = Math.min(100, (monthlyContribution * timeNeeded / goalAmount) * 100);
  
  return (
    <motion.div 
      className="savings-calculator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="calculator-grid">
        <div className="input-section">
          <h2>Savings Goal Calculator</h2>
          
          <div className="form-group">
            <label>Savings Goal Amount ($)</label>
            <input 
              type="number" 
              value={goalAmount} 
              onChange={(e) => setGoalAmount(Math.max(1, parseFloat(e.target.value) || 0))}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>Monthly Contribution ($)</label>
            <input 
              type="number" 
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(Math.max(1, parseFloat(e.target.value) || 0))}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>Annual Interest Rate (%)</label>
            <input 
              type="number" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
              min="0"
              step="0.1"
            />
          </div>
          
          <div className="results-container">
            <div className="result-item">
              <div className="result-label">Time Required:</div>
              <div className="result-value">
                {timeNeeded > 600 ? 'Over 50 years' : 
                  `${Math.floor(timeNeeded / 12)} years, ${timeNeeded % 12} months`}
              </div>
            </div>
          </div>
          
          <div className="progress-container">
            <h4>Progress Toward Goal</h4>
            <div className="progress-bar-container">
              <motion.div 
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              ></motion.div>
            </div>
            <div className="progress-label">{progressPercentage.toFixed(1)}%</div>
          </div>
        </div>
        
        <div className="chart-section">
          <h3>Savings Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={savingsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Months', position: 'insideBottomRight', offset: -10 }} 
              />
              <YAxis 
                label={{ value: 'Savings ($)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Savings']} />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stroke="#C599B6" 
                fill="#E6B2BA" 
                fillOpacity={0.8} 
              />
              <ReferenceLine y={goalAmount} stroke="#FAD0C4" strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

const InvestmentCalculator = () => {
  const [principal, setPrincipal] = useState(5000);
  const [interestRate, setInterestRate] = useState(7);
  const [years, setYears] = useState(10);
  const [interestType, setInterestType] = useState('compound');
  const [futureValue, setFutureValue] = useState(0);
  const [growthData, setGrowthData] = useState([]);
  
  useEffect(() => {
    calculateInvestment();
  }, [principal, interestRate, years, interestType]);
  
  const calculateInvestment = () => {
    const rate = interestRate / 100;
    let result = 0;
    const data = [];
    
    if (interestType === 'simple') {
      result = principal * (1 + rate * years);
      
      for (let i = 0; i <= years; i++) {
        data.push({
          year: i,
          value: principal * (1 + rate * i)
        });
      }
    } else {
      result = principal * Math.pow(1 + rate, years);
      
      for (let i = 0; i <= years; i++) {
        data.push({
          year: i,
          value: principal * Math.pow(1 + rate, i)
        });
      }
    }
    
    setFutureValue(result);
    setGrowthData(data);
  };
  
  return (
    <motion.div 
      className="investment-calculator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="calculator-grid">
        <div className="input-section">
          <h2>Investment Return Calculator</h2>
          
          <div className="form-group">
            <label>Initial Investment ($)</label>
            <input 
              type="number" 
              value={principal} 
              onChange={(e) => setPrincipal(Math.max(1, parseFloat(e.target.value) || 0))}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>Annual Interest Rate (%)</label>
            <input 
              type="number" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
              min="0"
              step="0.1"
            />
          </div>
          
          <div className="form-group">
            <label>Investment Period (Years)</label>
            <input 
              type="number" 
              value={years} 
              onChange={(e) => setYears(Math.max(1, parseInt(e.target.value) || 0))}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>Interest Type</label>
            <div className="toggle-container">
              <button 
                className={interestType === 'simple' ? 'active' : ''} 
                onClick={() => setInterestType('simple')}
              >
                Simple Interest
              </button>
              <button 
                className={interestType === 'compound' ? 'active' : ''} 
                onClick={() => setInterestType('compound')}
              >
                Compound Interest
              </button>
            </div>
          </div>
          
          <div className="results-container">
            <motion.div 
              className="result-item highlight"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="result-label">Future Value:</div>
              <div className="result-value">${futureValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</div>
            </motion.div>
            
            <div className="result-item">
              <div className="result-label">Total Interest Earned:</div>
              <div className="result-value">${(futureValue - principal).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</div>
            </div>
          </div>
        </div>
        
        <div className="chart-section">
          <h3>Investment Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={growthData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} 
              />
              <YAxis 
                label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Investment Value" 
                stroke="#C599B6" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculatorDashboard;