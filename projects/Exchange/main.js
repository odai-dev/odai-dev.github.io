// تعريف مصفوفة تحتوي على العملات وأسعار الصرف الخاصة بها
const currencies = [
    { name: "الريال اليمني", code: "YER", rate: 530.00 },
    { name: "الدولار الأمريكي", code: "USD", rate: 1.00 },
    { name: "اليورو", code: "EUR", rate: 0.85 },
    { name: "الجنيه البريطاني", code: "GBP", rate: 0.75 },
    { name: "ويسترن يونيون", code: "WU", rate: 1.00 },
    { name: "الريال السعودي", code: "SAR", rate: 3.75 },
    { name: "الدرهم الإماراتي", code: "AED", rate: 3.67 },
    { name: "الريال العماني", code: "OMR", rate: 0.39 },
    { name: "الدينار الأردني", code: "JOD", rate: 0.71 },
    { name: "الجنيه المصري", code: "EGP", rate: 30.00 },
    { name: "الدينار العراقي", code: "IQD", rate: 1300.00 },
    { name: "الدينار الجزائري", code: "DZD", rate: 135.00 },
    { name: "الدينار البحريني", code: "BHD", rate: 0.38 },
    { name: "الدينار الكويتي", code: "KWD", rate: 0.31 },
    { name: "الليرة اللبنانية", code: "LBP", rate: 15000.00 },
    { name: "الريال القطري", code: "QAR", rate: 3.64 },
    { name: "الليرة السورية", code: "SYP", rate: 13000.00 },
    { name: "الجنيه السوداني", code: "SDG", rate: 600.00 },
    { name: "الدينار التونسي", code: "TND", rate: 3.10 },
    { name: "الشيكل الفلسطيني", code: "ILS", rate: 3.60 },
    { name: "الفرنك الجيبوتي", code: "DJF", rate: 177.00 },
    { name: "الفرنك القمري", code: "KMF", rate: 460.00 },
    { name: "الدينار الليبي", code: "LYD", rate: 4.90 },
    { name: "الدرهم المغربي", code: "MAD", rate: 10.00 },
    { name: "الأوقية الموريتانية", code: "MRU", rate: 40.00 },
    { name: "الشلن الصومالي", code: "SOS", rate: 570.00 },
    { name: "الدولار الأسترالي", code: "AUD", rate: 1.30 },
    { name: "الين الياباني", code: "JPY", rate: 150.00 },
    { name: "الفرنك السويسري", code: "CHF", rate: 0.90 },
    { name: "الدولار الكندي", code: "CAD", rate: 1.35 },
    { name: "اليوان الصيني", code: "CNY", rate: 7.10 },
    { name: "الروبل الروسي", code: "RUB", rate: 93.00 },
    { name: "البيزو المكسيكي", code: "MXN", rate: 17.00 },
    { name: "الريال البرازيلي", code: "BRL", rate: 5.00 },
    { name: "البيزو التشيلي", code: "CLP", rate: 880.00 },
    { name: "الروبية الهندية", code: "INR", rate: 83.00 },
    { name: "دولار هونغ كونغ", code: "HKD", rate: 7.80 },
    { name: "الكرونا السويدية", code: "SEK", rate: 10.50 },
    { name: "الوون الكوري الجنوبي", code: "KRW", rate: 1300.00 },
    { name: "الدولار السنغافوري", code: "SGD", rate: 1.35 },
    { name: "الكرونة النرويجية", code: "NOK", rate: 10.20 },
    { name: "الراند الجنوب أفريقي", code: "ZAR", rate: 19.00 },
    { name: "الليرة التركية", code: "TRY", rate: 30.00 }
];

// طباعة مصفوفة العملات في وحدة التحكم
console.log('Currencies array:', currencies);

// دالة لتحميل العملات من التخزين المحلي إذا كانت موجودة
function loadCurrenciesFromStorage() {
    const storedCurrencies = localStorage.getItem('currencies');
    if (storedCurrencies) {
        const parsedCurrencies = JSON.parse(storedCurrencies);
        parsedCurrencies.forEach(updatedCurrency => {
            const currency = currencies.find(c => c.code === updatedCurrency.code);
            if (currency) {
                currency.rate = updatedCurrency.rate;
            }
        });
    }
}

// استدعاء دالة تحميل العملات عند تحميل الصفحة
loadCurrenciesFromStorage();

// الحصول على القوائم المنسدلة للعملات
const fromCurrencyDropdown = document.getElementById('from-currency');
const toCurrencyDropdown = document.getElementById('to-currency');

// التحقق من وجود القوائم المنسدلة وإضافة الخيارات إليها
if (fromCurrencyDropdown && toCurrencyDropdown) {
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency.code;
        optionFrom.textContent = `${currency.name} (${currency.code})`;
        fromCurrencyDropdown.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency.code;
        optionTo.textContent = `${currency.name} (${currency.code})`;
        toCurrencyDropdown.appendChild(optionTo);
    });
} else {
    console.warn('Currency dropdown elements not found in the DOM.');
}

// إضافة مستمع حدث لزر التحويل بين العملات
// يتحقق من صحة المدخلات ويقوم بحساب المبلغ المحول
const exchangeBtn = document.getElementById('exchange-btn');
if (exchangeBtn) {
    exchangeBtn.replaceWith(exchangeBtn.cloneNode(true));
    exchangeBtn.addEventListener('click', () => {
        const fromCurrency = fromCurrencyDropdown.value;
        const toCurrency = toCurrencyDropdown.value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (isNaN(amount) || amount <= 0) {
            document.getElementById('result').textContent = "Please enter a valid amount.";
            document.getElementById('result').style.color = 'red';
            return;
        }

        if (fromCurrency === toCurrency) {
            document.getElementById('result').textContent = "Please select different currencies.";
            document.getElementById('result').style.color = 'red';
            return;
        }

        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            document.getElementById('result').textContent = "User not logged in.";
            document.getElementById('result').style.color = 'red';
            return;
        }

        const fromRate = currencies.find(currency => currency.code === fromCurrency).rate;
        const toRate = currencies.find(currency => currency.code === toCurrency).rate;
        const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);

        if (!loggedInUser.balances[fromCurrency] || loggedInUser.balances[fromCurrency] < amount) {
            document.getElementById('result').textContent = `Insufficient balance in ${fromCurrency}.`;
            document.getElementById('result').style.color = 'red';
            return;
        }

        loggedInUser.balances[fromCurrency] -= amount;

        if (!loggedInUser.balances[toCurrency]) {
            loggedInUser.balances[toCurrency] = 0;
        }
        loggedInUser.balances[toCurrency] += parseFloat(convertedAmount);

        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.email === loggedInUser.email);
        if (userIndex !== -1) {
            users[userIndex].balances = loggedInUser.balances;
            localStorage.setItem('users', JSON.stringify(users));
        }

        const balancesList = document.getElementById('balances-list');
        balancesList.innerHTML = '';
        for (const [currency, balance] of Object.entries(loggedInUser.balances)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${currency}: ${balance.toFixed(2)}`;
            balancesList.appendChild(listItem);
        }

        document.getElementById('result').textContent = `Successfully exchanged ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}.`;
        document.getElementById('result').style.color = 'green';
    });
} else {
    console.warn('Exchange button not found in the DOM.');
}

// إضافة مستمع حدث لتحميل الصفحة وإعداد الأحداث الأخرى
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    loginBtn?.addEventListener('click', (event) => {
        event.preventDefault(); 

        const loginForm = document.getElementById('login-form');
        const email = loginForm.querySelector('#email').value;
        const password = loginForm.querySelector('#password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            document.getElementById('auth-section').style.display = 'none';
            const userInfoSection = document.getElementById('user-info');
            userInfoSection.style.display = 'block';

            document.getElementById('actions-container').style.display = 'flex';

            document.getElementById('user-name').textContent = user.username;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('account-number').textContent = user.accountNumber;

            const balancesList = document.getElementById('balances-list');
            balancesList.innerHTML = '';
            for (const [currency, balance] of Object.entries(user.balances)) {
                const listItem = document.createElement('li');
                listItem.textContent = `${currency}: ${currency} ${balance.toFixed(2)}`;
                balancesList.appendChild(listItem);
            }

            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        } else {
            document.getElementById('login-error').textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
        }
    });

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', () => {
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('actions-container').style.display = 'none';
        document.getElementById('auth-section').style.display = 'block';
    });

    const signupBtn = document.getElementById('signup-btn');
    signupBtn?.addEventListener('click', (event) => {
        event.preventDefault();

        const signupForm = document.getElementById('signup-form');
        const username = signupForm.querySelector('#new-username').value;
        const email = signupForm.querySelector('#email').value;
        const password = signupForm.querySelector('#new-password').value;

        if (username && email && password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.email === email)) {
                document.getElementById('signup-success').textContent = "البريد الإلكتروني موجود بالفعل.";
                return;
            }


            const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

          
            const balances = {
                YER: Math.floor(Math.random() * 100001),
                SAR: Math.floor(Math.random() * 100001),
                USD: Math.floor(Math.random() * 100001)
            };

            users.push({ username, email, password, accountNumber, balances });
            localStorage.setItem('users', JSON.stringify(users));

            document.getElementById('signup-success').textContent = "تم إنشاء الحساب بنجاح!";
            setTimeout(() => {
                document.getElementById('signup-success').textContent = "";
                document.getElementById('show-login').click();
            }, 2000);
        } else {
            document.getElementById('signup-success').textContent = "يرجى ملء جميع الحقول.";
        }
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const responsiveMenu = document.querySelector('nav.menu');

        if (menuToggle && responsiveMenu) {
            menuToggle.addEventListener('click', () => {
                responsiveMenu.classList.toggle('active');
            });

           
            document.addEventListener('click', (event) => {
                if (!responsiveMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    responsiveMenu.classList.remove('active');
                }
            });
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    populateExchangeRates();
});

// إضافة مستمع حدث لزر التحويل المالي
// يتحقق من صحة المدخلات ويقوم بإجراء التحويل المالي
document.getElementById('transfer-btn').addEventListener('click', () => {
    const recipientUsername = document.getElementById('recipient-username').value.trim();
    const transferAmount = parseFloat(document.getElementById('transfer-amount').value);

    if (!recipientUsername || isNaN(transferAmount) || transferAmount <= 0) {
        document.getElementById('transfer-result').textContent = "يرجى إدخال اسم مستخدم صحيح ومبلغ صالح.";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const recipient = users.find(user => user.username === recipientUsername);

    if (!recipient) {
        document.getElementById('transfer-result').textContent = "المستخدم المستلم غير موجود.";
        return;
    }

    document.getElementById('transfer-result').textContent = `تم إرسال ${transferAmount} إلى ${recipientUsername} بنجاح!`;
    document.getElementById('transfer-result').style.color = 'green';

    document.getElementById('money-transfer-form').reset();
});

// إضافة مستمع حدث لزر التحويل بين العملات
// يتحقق من صحة المدخلات ويقوم بحساب المبلغ المحول
document.getElementById('exchange-btn').addEventListener('click', () => {
    const fromCurrency = fromCurrencyDropdown.value;
    const toCurrency = toCurrencyDropdown.value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = "Please enter a valid amount.";
        document.getElementById('result').style.color = 'red';
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById('result').textContent = "Please select different currencies.";
        document.getElementById('result').style.color = 'red';
        return;
    }

    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        document.getElementById('result').textContent = "User not logged in.";
        document.getElementById('result').style.color = 'red';
        return;
    }

    const fromRate = currencies.find(currency => currency.code === fromCurrency).rate;
    const toRate = currencies.find(currency => currency.code === toCurrency).rate;
    const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);

    if (!loggedInUser.balances[fromCurrency] || loggedInUser.balances[fromCurrency] < amount) {
        document.getElementById('result').textContent = `Insufficient balance in ${fromCurrency}.`;
        document.getElementById('result').style.color = 'red';
        return;
    }

    loggedInUser.balances[fromCurrency] -= amount;

    if (!loggedInUser.balances[toCurrency]) {
        loggedInUser.balances[toCurrency] = 0;
    }
    loggedInUser.balances[toCurrency] += parseFloat(convertedAmount);

    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === loggedInUser.email);
    if (userIndex !== -1) {
        users[userIndex].balances = loggedInUser.balances; 
        localStorage.setItem('users', JSON.stringify(users));
    }

    const balancesList = document.getElementById('balances-list');
    balancesList.innerHTML = '';
    for (const [currency, balance] of Object.entries(loggedInUser.balances)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${currency}: ${balance.toFixed(2)}`;
        balancesList.appendChild(listItem);
    }

    document.getElementById('result').textContent = `Successfully exchanged ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}.`;
    document.getElementById('result').style.color = 'green';
});

// دالة لملء جدول أسعار الصرف في واجهة المستخدم
function populateExchangeRates() {
    console.log('Populating exchange rates...');
    const tableBody = document.querySelector('#exchange-rates-table tbody');
    if (!tableBody) {
        console.error('Exchange rates table body not found!');
        return;
    }

    tableBody.innerHTML = ''; 

    currencies.slice(0, 5).forEach(currency => { 
        console.log('Adding currency:', currency);
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = currency.name;
        row.appendChild(nameCell);

        const codeCell = document.createElement('td');
        codeCell.textContent = currency.code;
        row.appendChild(codeCell);

        const rateCell = document.createElement('td');
        rateCell.textContent = currency.rate.toFixed(2);
        row.appendChild(rateCell);

        tableBody.appendChild(row);
    });
}

// استدعاء دالة ملء أسعار الصرف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded.');
    loadCurrenciesFromStorage(); 
    populateExchangeRates();
});

// إضافة مستمع حدث للتنقل بين الحقول باستخدام الأسهم
document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        const inputs = Array.from(document.querySelectorAll('input, textarea'));
        const currentIndex = inputs.indexOf(activeElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % inputs.length;
            inputs[nextIndex].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + inputs.length) % inputs.length;
            inputs[prevIndex].focus();
        }
    }
});


