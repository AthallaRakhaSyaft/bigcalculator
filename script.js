let currentInput = ""; // Untuk menyimpan input dari user
let resultDisplayed = false;

// Fungsi untuk menambahkan angka ke display
function appendNumber(number) {
    if (resultDisplayed) {
        currentInput = ""; // Reset input jika hasil baru saja ditampilkan
        resultDisplayed = false;
    }
    currentInput += number;
    updateDisplay();
}

// Fungsi untuk menambahkan operator
function appendOperator(operator) {
    if (resultDisplayed) {
        resultDisplayed = false;
    }
    if (currentInput === "") return; // Cegah operator di awal
    if (isOperator(currentInput.slice(-1))) return; // Cegah operator berturut-turut
    currentInput += operator;
    updateDisplay();
}

// Fungsi untuk menghitung hasil
function calculate() {
    if (isOperator(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1); // Hapus operator terakhir jika ada
    }
    try {
        const result = eval(currentInput); // Menggunakan eval dengan validasi
        currentInput = result.toString();
        resultDisplayed = true;
        updateDisplay();
    } catch (e) {
        currentInput = "Error";
        resultDisplayed = true;
        updateDisplay();
    }
}

// Fungsi untuk membersihkan display
function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

// Fungsi untuk menghapus karakter terakhir
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Fungsi untuk memperbarui display
function updateDisplay() {
    document.getElementById("result").value = currentInput || "0";
}

// Fungsi untuk memeriksa apakah karakter adalah operator
function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

 // Nilai tukar tetap (contoh nilai tukar)
 const exchangeRates = {
    "USD": {
        "EUR": 0.85,
        "GBP": 0.75,
        "INR": 75.0,
        "IDR": 14500.0,
    },
    "EUR": {
        "USD": 1.18,
        "GBP": 0.88,
        "INR": 88.0,
        "IDR": 17000.0,
    },
    "GBP": {
        "USD": 1.33,
        "EUR": 1.14,
        "INR": 105.0,
        "IDR": 22500.0,
    },
    "INR": {
        "USD": 0.013,
        "EUR": 0.011,
        "GBP": 0.0095,
        "IDR": 210.0,
    },
    "IDR": {
        "USD": 0.000069,
        "EUR": 0.000058,
        "GBP": 0.000044,
        "INR": 0.0047,
    }
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("error").innerText = "Please enter a valid amount.";
        document.getElementById("result").innerText = "";
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById("error").innerText = "The currencies must be different.";
        document.getElementById("result").innerText = "";
        return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    if (rate) {
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        document.getElementById("error").innerText = "";
    } else {
        document.getElementById("error").innerText = "Conversion rate not available.";
        document.getElementById("result").innerText = "";
    }
}

const conversionRates = {
    length: {
        meters: 1,
        kilometers: 0.001,
        centimeters: 100,
        millimeters: 1000
    },
    weight: {
        kilograms: 1,
        grams: 1000,
        pounds: 2.20462,
        ounces: 35.274
    },
    temperature: {
        Celsius: {
            Fahrenheit: (value) => (value * 9/5) + 32,
            Kelvin: (value) => value + 273.15
        },
        Fahrenheit: {
            Celsius: (value) => (value - 32) * 5/9,
            Kelvin: (value) => (value - 32) * 5/9 + 273.15
        },
        Kelvin: {
            Celsius: (value) => value - 273.15,
            Fahrenheit: (value) => (value - 273.15) * 9/5 + 32
        }
    },
    volume: {
        liters: 1,
        milliliters: 1000,
        gallons: 3.78541,  // 1 gallon = 3.78541 liters
    }
};

        function changeUnitType() {
            const unitType = document.getElementById("unit-type").value;
            document.getElementById("length-conversion").style.display = "none";
            document.getElementById("weight-conversion").style.display = "none";
            document.getElementById("temperature-conversion").style.display = "none";
            document.getElementById("volume-conversion").style.display = "none";

            if (unitType === "length") {
                document.getElementById("length-conversion").style.display = "block";
            } else if (unitType === "weight") {
                document.getElementById("weight-conversion").style.display = "block";
            } else if (unitType === "temperature") {
                document.getElementById("temperature-conversion").style.display = "block";
            } else if (unitType === "volume") {
                document.getElementById("volume-conversion").style.display = "block";
            }
        }

        function convert() {
            const unitType = document.getElementById("unit-type").value;
            let fromUnit, toUnit, value;

            // Collect the value based on the selected unit type
            if (unitType === "length") {
                value = parseFloat(document.getElementById("length-value").value);
                fromUnit = document.getElementById("length-from").value;
                toUnit = document.getElementById("length-to").value;
            } else if (unitType === "weight") {
                value = parseFloat(document.getElementById("weight-value").value);
                fromUnit = document.getElementById("weight-from").value;
                toUnit = document.getElementById("weight-to").value;
            } else if (unitType === "temperature") {
                value = parseFloat(document.getElementById("temperature-value").value);
                fromUnit = document.getElementById("temperature-from").value;
                toUnit = document.getElementById("temperature-to").value;
            } else if (unitType === "volume") {
                value = parseFloat(document.getElementById("volume-value").value);
                fromUnit = document.getElementById("volume-from").value;
                toUnit = document.getElementById("volume-to").value;
            }

            // Validation for valid numeric input
            if (isNaN(value)) {
                document.getElementById("error").innerText = "Please enter a valid number.";
                document.getElementById("result").innerText = "";
                return;
            }

            let result;

            if (unitType === "temperature") {
                result = conversionRates.temperature[fromUnit][toUnit](value);
            } else {
                result = value * (conversionRates[unitType][toUnit] / conversionRates[unitType][fromUnit]);
            }

            // Display the result
            document.getElementById("result").innerText = `Converted Value: ${result}`;
            document.getElementById("error").innerText = "";
        }

        function calculateDiscount() {
            const originalPrice = parseFloat(document.getElementById("original-price").value);
            const discountPercentage = parseFloat(document.getElementById("discount-percentage").value);

            if (isNaN(originalPrice) || isNaN(discountPercentage)) {
                document.getElementById("error").innerText = "Please enter valid numbers.";
                document.getElementById("result").innerText = "";
                return;
            }

            if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage > 100) {
                document.getElementById("error").innerText = "Please enter valid price and discount values.";
                document.getElementById("result").innerText = "";
                return;
            }

            const discountAmount = (originalPrice * discountPercentage) / 100;
            const finalPrice = originalPrice - discountAmount;

            document.getElementById("result").innerText = `Discount Amount: $${discountAmount.toFixed(2)}`;
            document.getElementById("error").innerText = "";
        }

        function calculateLoan() {
            const loanAmount = parseFloat(document.getElementById("loan-amount").value);
            const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100 / 12; // Monthly interest rate
            const loanTerm = parseInt(document.getElementById("loan-term").value) * 12; // Loan term in months

            if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
                document.getElementById("error").innerText = "Please enter valid values for loan amount, interest rate, and loan term.";
                document.getElementById("result").innerText = "";
                return;
            }

            const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
            const totalPayment = monthlyPayment * loanTerm;
            const totalInterest = totalPayment - loanAmount;

            document.getElementById("result").innerHTML = `
                Monthly Payment: $${monthlyPayment.toFixed(2)} <br>
                Total Payment: $${totalPayment.toFixed(2)} <br>
                Total Interest: $${totalInterest.toFixed(2)}
            `;
            document.getElementById("error").innerText = "";
        }

        function calculate() {
            const hex1 = document.getElementById("hex1").value.trim();
            const hex2 = document.getElementById("hex2").value.trim();
            const operation = document.getElementById("operation").value;

            // Clear previous results or errors
            document.getElementById("error").innerText = "";
            document.getElementById("result").innerText = "";

            if (!isValidHex(hex1) || !isValidHex(hex2)) {
                document.getElementById("error").innerText = "Please enter valid hexadecimal numbers.";
                return;
            }

            // Convert hex to decimal
            const num1 = parseInt(hex1, 16);
            const num2 = parseInt(hex2, 16);

            let result;
            switch (operation) {
                case "add":
                    result = num1 + num2;
                    break;
                case "subtract":
                    result = num1 - num2;
                    break;
                case "multiply":
                    result = num1 * num2;
                    break;
                case "divide":
                    if (num2 === 0) {
                        document.getElementById("error").innerText = "Cannot divide by zero.";
                        return;
                    }
                    result = num1 / num2;
                    break;
            }

            // Convert result back to hexadecimal
            const hexResult = result.toString(16).toUpperCase();
            document.getElementById("result").innerText = `Result: ${hexResult}`;
        }

        // Function to validate hexadecimal input
        function isValidHex(value) {
            const regex = /^[0-9A-Fa-f]+$/;
            return regex.test(value);
        }

        function calculateFuelCost() {
            const distance = parseFloat(document.getElementById("distance").value);
            const fuelConsumption = parseFloat(document.getElementById("fuel-consumption").value);
            const fuelPrice = parseFloat(document.getElementById("fuel-price").value);

            // Clear previous results or errors
            document.getElementById("error").innerText = "";
            document.getElementById("result").innerText = "";

            if (isNaN(distance) || isNaN(fuelConsumption) || isNaN(fuelPrice)) {
                document.getElementById("error").innerText = "Please enter valid numbers for all fields.";
                return;
            }

            // Calculate the fuel cost
            const fuelRequired = (distance / 100) * fuelConsumption;  // Fuel required in liters
            const totalCost = fuelRequired * fuelPrice;  // Total fuel cost

            // Display the result
            document.getElementById("result").innerText = `Total Fuel Cost: $${totalCost.toFixed(2)}`;
        }

        function calculateEfficiency() {
            const distance = parseFloat(document.getElementById("distance").value);
            const fuelConsumed = parseFloat(document.getElementById("fuel-consumed").value);

            // Clear previous results or errors
            document.getElementById("error").innerText = "";
            document.getElementById("result").innerText = "";

            if (isNaN(distance) || isNaN(fuelConsumed)) {
                document.getElementById("error").innerText = "Please enter valid numbers for both fields.";
                return;
            }

            // Calculate the fuel efficiency (kilometers per liter)
            const efficiency = distance / fuelConsumed;

            // Display the result
            document.getElementById("result").innerText = `Fuel Efficiency: ${efficiency.toFixed(2)} km/L`;
        }

        function calculateUnitPrice() {
            const totalPrice = parseFloat(document.getElementById("total-price").value);
            const quantity = parseFloat(document.getElementById("quantity").value);

            // Clear previous results or errors
            document.getElementById("error").innerText = "";
            document.getElementById("result").innerText = "";

            if (isNaN(totalPrice) || isNaN(quantity) || quantity <= 0) {
                document.getElementById("error").innerText = "Please enter valid numbers for total price and quantity.";
                return;
            }

            // Calculate the unit price
            const unitPrice = totalPrice / quantity;

            // Display the result
            document.getElementById("result").innerText = `Unit Price: ${unitPrice.toFixed(2)} per item`;
        }

        function generateSubjectInputs() {
            const subjectCount = parseInt(document.getElementById("subject-count").value);
            const subjectsContainer = document.getElementById("subjects-container");
            subjectsContainer.innerHTML = ""; // Clear previous inputs

            if (isNaN(subjectCount) || subjectCount <= 0) {
                document.getElementById("error").innerText = "Please enter a valid number of subjects.";
                return;
            }

            for (let i = 1; i <= subjectCount; i++) {
                const subjectDiv = document.createElement("div");

                const subjectNameInput = document.createElement("input");
                subjectNameInput.type = "text";
                subjectNameInput.placeholder = `Enter subject ${i} name`;
                subjectNameInput.id = `subject-name-${i}`;

                const subjectGradeInput = document.createElement("input");
                subjectGradeInput.type = "number";
                subjectGradeInput.placeholder = `Enter grade for subject ${i} (0-4 scale)`;
                subjectGradeInput.id = `subject-grade-${i}`;
                subjectGradeInput.min = 0;
                subjectGradeInput.max = 4;

                subjectsContainer.appendChild(subjectNameInput);
                subjectsContainer.appendChild(subjectGradeInput);
            }
        }

        function calculateGPA() {
            const subjectCount = parseInt(document.getElementById("subject-count").value);
            let totalGradePoints = 0;
            let validGrades = 0;

            for (let i = 1; i <= subjectCount; i++) {
                const grade = parseFloat(document.getElementById(`subject-grade-${i}`).value);

                if (isNaN(grade) || grade < 0 || grade > 4) {
                    document.getElementById("error").innerText = "Please enter valid grades (0-4) for each subject.";
                    return;
                }

                totalGradePoints += grade;
                validGrades++;
            }

            if (validGrades === 0) {
                document.getElementById("error").innerText = "Please enter grades for at least one subject.";
                return;
            }

            const gpa = totalGradePoints / validGrades;
            document.getElementById("result").innerText = `Your GPA is: ${gpa.toFixed(2)}`;
            document.getElementById("error").innerText = "";
        }

        // Automatically generate subject inputs when subject count changes
        document.getElementById("subject-count").addEventListener("input", generateSubjectInputs);

        function calculateHealthMetrics() {
            const weight = parseFloat(document.getElementById("weight").value);
            const height = parseFloat(document.getElementById("height").value);

            if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
                document.getElementById("error").innerText = "Please enter valid weight and height.";
                document.getElementById("result").innerText = "";
                return;
            }

            // BMI Calculation (BMI = weight / (height in meters)^2)
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);

            // Ideal Weight Calculation (for height in meters)
            const idealWeightLow = 18.5 * (heightInMeters * heightInMeters);
            const idealWeightHigh = 24.9 * (heightInMeters * heightInMeters);

            // Display Results
            let bmiCategory = "";
            if (bmi < 18.5) {
                bmiCategory = "Underweight";
            } else if (bmi >= 18.5 && bmi < 24.9) {
                bmiCategory = "Normal weight";
            } else if (bmi >= 25 && bmi < 29.9) {
                bmiCategory = "Overweight";
            } else {
                bmiCategory = "Obesity";
            }

            document.getElementById("result").innerHTML = `
                <p>BMI: ${bmi.toFixed(2)} (${bmiCategory})</p>
                <p>Ideal Weight Range: ${idealWeightLow.toFixed(2)} kg - ${idealWeightHigh.toFixed(2)} kg</p>
            `;
            document.getElementById("error").innerText = "";
        }

        function calculateSalesTax() {
            const price = parseFloat(document.getElementById("price").value);
            const taxRate = parseFloat(document.getElementById("tax-rate").value);

            if (isNaN(price) || price <= 0 || isNaN(taxRate) || taxRate < 0) {
                document.getElementById("error").innerText = "Please enter valid price and tax rate.";
                document.getElementById("result").innerText = "";
                return;
            }

            // Calculate the sales tax and total price
            const salesTax = (price * taxRate) / 100;
            const totalPrice = price + salesTax;

            document.getElementById("result").innerHTML = `
                <p>Sales Tax: $${salesTax.toFixed(2)}</p>
                <p>Total Price: $${totalPrice.toFixed(2)}</p>
            `;
            document.getElementById("error").innerText = "";
        }

        function calculateSavings() {
            const initialAmount = parseFloat(document.getElementById("initial-amount").value);
            const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
            const years = parseInt(document.getElementById("years").value);
            const monthlyContribution = parseFloat(document.getElementById("monthly-contribution").value);

            // Validate input values
            if (isNaN(initialAmount) || initialAmount <= 0 || isNaN(interestRate) || interestRate < 0 || isNaN(years) || years <= 0 || isNaN(monthlyContribution) || monthlyContribution < 0) {
                document.getElementById("error").innerText = "Please enter valid values for all fields.";
                document.getElementById("result").innerText = "";
                return;
            }

            // Calculate future savings with compound interest formula
            let totalAmount = initialAmount;
            const monthlyRate = interestRate / 12;
            const totalMonths = years * 12;

            // Apply monthly contributions and interest
            for (let i = 0; i < totalMonths; i++) {
                totalAmount += monthlyContribution;
                totalAmount *= (1 + monthlyRate);
            }

            document.getElementById("result").innerHTML = `
                <p>Future Savings: $${totalAmount.toFixed(2)}</p>
            `;
            document.getElementById("error").innerText = "";
        }
