// App State Management
const AppState = {
  currentPage: 'welcome',
  phoneNumber: '',
  countryCode: '+086',
  countryFlag: '🇨🇳',
  isSignup: true,
  verificationCode: '',
  agreementAccepted: false
};

// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show target page
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
    AppState.currentPage = pageId;
  }
}

// Back button handler
document.addEventListener('click', function(e) {
  if (e.target.closest('.back-button')) {
    const backBtn = e.target.closest('.back-button');
    const backTo = backBtn.getAttribute('data-back');
    if (backTo) {
      showPage(backTo);
    }
  }
});

// Welcome Page - Use event delegation or ensure DOM is loaded
function initWelcomePage() {
  const signupBtn = document.getElementById('signupBtn');
  const loginLinkBtn = document.getElementById('loginLinkBtn');
  
  if (signupBtn) {
    // Use event delegation to handle clicks on button and its children
    signupBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Signup button clicked', e.target);
      AppState.isSignup = true;
      showPage('phone-signup');
    });
    
    // Also handle click on the span inside
    const span = signupBtn.querySelector('span');
    if (span) {
      span.style.pointerEvents = 'none'; // Let clicks pass through to button
    }
  } else {
    console.error('signupBtn not found');
  }
  
  if (loginLinkBtn) {
    loginLinkBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Login link clicked');
      AppState.isSignup = false;
      showPage('phone-login');
    });
  } else {
    console.error('loginLinkBtn not found');
  }
}

// Phone Input Formatting
function formatPhoneNumber(value) {
  let digits = value.replace(/\D/g, '');
  let formatted = '';
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += ' ';
    }
    formatted += digits[i];
  }
  return formatted;
}

// Phone Input - Signup
const phoneInputSignup = document.getElementById('phoneInputSignup');
const clearBtnSignup = document.getElementById('clearBtnSignup');
const agreementCheckboxSignup = document.getElementById('agreementCheckboxSignup');
const createAccountBtn = document.getElementById('createAccountBtn');

if (phoneInputSignup) {
  phoneInputSignup.addEventListener('input', function(e) {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    AppState.phoneNumber = formatted.replace(/\s/g, '');
    
    // Show/hide clear button
    if (formatted.trim().length > 0) {
      clearBtnSignup.style.display = 'flex';
    } else {
      clearBtnSignup.style.display = 'none';
    }
    
    updateCreateAccountButton();
  });

  phoneInputSignup.addEventListener('focus', function() {
    this.parentElement.parentElement.style.borderColor = '#165dff';
    this.parentElement.parentElement.style.boxShadow = '0 0 0 2px rgba(22, 93, 255, 0.1)';
  });

  phoneInputSignup.addEventListener('blur', function() {
    this.parentElement.parentElement.style.borderColor = '#c5c5c5';
    this.parentElement.parentElement.style.boxShadow = 'none';
  });
}

if (clearBtnSignup) {
  clearBtnSignup.addEventListener('click', function() {
    phoneInputSignup.value = '';
    AppState.phoneNumber = '';
    clearBtnSignup.style.display = 'none';
    updateCreateAccountButton();
    phoneInputSignup.focus();
  });
}

if (agreementCheckboxSignup) {
  agreementCheckboxSignup.addEventListener('change', function() {
    AppState.agreementAccepted = this.checked;
    updateCreateAccountButton();
  });
}

function updateCreateAccountButton() {
  const phoneDigits = AppState.phoneNumber.replace(/\s/g, '');
  const isValid = phoneDigits.length >= 11 && AppState.agreementAccepted;
  
  if (createAccountBtn) {
    createAccountBtn.disabled = !isValid;
    createAccountBtn.style.opacity = isValid ? '1' : '0.6';
  }
}

if (createAccountBtn) {
  createAccountBtn.addEventListener('click', function() {
    const phoneDigits = AppState.phoneNumber.replace(/\s/g, '');
    
    if (phoneDigits.length < 11) {
      alert('請輸入有效的手機號碼');
      return;
    }
    
    if (!AppState.agreementAccepted) {
      alert('請先同意服務條款');
      return;
    }
    
    // Simulate API call - check if account exists
    setTimeout(() => {
      // Randomly show account exists modal or proceed to verification
      if (Math.random() > 0.5) {
        showAccountExistsModal();
      } else {
        showPage('verify-code');
        updateCodePhoneNumber();
      }
    }, 500);
  });
}

// Phone Input - Login
const phoneInputLogin = document.getElementById('phoneInputLogin');
const clearBtnLogin = document.getElementById('clearBtnLogin');
const loginBtn = document.getElementById('loginBtn');

if (phoneInputLogin) {
  phoneInputLogin.addEventListener('input', function(e) {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    AppState.phoneNumber = formatted.replace(/\s/g, '');
    
    if (formatted.trim().length > 0) {
      clearBtnLogin.style.display = 'flex';
    } else {
      clearBtnLogin.style.display = 'none';
    }
    
    updateLoginButton();
  });

  phoneInputLogin.addEventListener('focus', function() {
    this.parentElement.parentElement.style.borderColor = '#165dff';
    this.parentElement.parentElement.style.boxShadow = '0 0 0 2px rgba(22, 93, 255, 0.1)';
  });

  phoneInputLogin.addEventListener('blur', function() {
    this.parentElement.parentElement.style.borderColor = '#c5c5c5';
    this.parentElement.parentElement.style.boxShadow = 'none';
  });
}

if (clearBtnLogin) {
  clearBtnLogin.addEventListener('click', function() {
    phoneInputLogin.value = '';
    AppState.phoneNumber = '';
    clearBtnLogin.style.display = 'none';
    updateLoginButton();
    phoneInputLogin.focus();
  });
}

function updateLoginButton() {
  const phoneDigits = AppState.phoneNumber.replace(/\s/g, '');
  const isValid = phoneDigits.length >= 11;
  
  if (loginBtn) {
    loginBtn.disabled = !isValid;
    loginBtn.style.opacity = isValid ? '1' : '0.6';
  }
}

if (loginBtn) {
  loginBtn.addEventListener('click', function() {
    const phoneDigits = AppState.phoneNumber.replace(/\s/g, '');
    
    if (phoneDigits.length < 11) {
      alert('請輸入有效的手機號碼');
      return;
    }
    
    showPage('verify-code');
    updateCodePhoneNumber();
  });
}

// Country Selector
const countrySelector = document.getElementById('countrySelector');
const countrySelectorLogin = document.getElementById('countrySelectorLogin');

function openCountrySelect() {
  showPage('country-select');
}

if (countrySelector) {
  countrySelector.addEventListener('click', openCountrySelect);
}

if (countrySelectorLogin) {
  countrySelectorLogin.addEventListener('click', openCountrySelect);
}

// Country Selection Page
const countrySearchInput = document.getElementById('countrySearchInput');
const countryList = document.getElementById('countryList');
const emptyState = document.getElementById('emptyState');

const countries = [
  { name: 'China', code: '+086', flag: '🇨🇳' },
  { name: 'United States', code: '+001', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+044', flag: '🇬🇧' },
  { name: 'Japan', code: '+081', flag: '🇯🇵' },
  { name: 'Korea', code: '+082', flag: '🇰🇷' },
  { name: 'Singapore', code: '+065', flag: '🇸🇬' },
  { name: 'Australia', code: '+061', flag: '🇦🇺' },
  { name: 'Canada', code: '+001', flag: '🇨🇦' }
];

function renderCountries(filter = '') {
  const filtered = countries.filter(country => 
    country.name.toLowerCase().includes(filter.toLowerCase()) ||
    country.code.includes(filter)
  );
  
  if (filtered.length === 0) {
    countryList.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    countryList.style.display = 'block';
    emptyState.style.display = 'none';
    
    countryList.innerHTML = filtered.map(country => `
      <div class="country-item" data-code="${country.code}" data-flag="${country.flag}">
        <div class="country-flag-item">${country.flag}</div>
        <div class="country-info">
          <div class="country-name">${country.name}</div>
          <div class="country-code-item">${country.code}</div>
        </div>
      </div>
    `).join('');
    
    // Add click handlers
    countryList.querySelectorAll('.country-item').forEach(item => {
      item.addEventListener('click', function() {
        AppState.countryCode = this.getAttribute('data-code');
        AppState.countryFlag = this.getAttribute('data-flag');
        
        // Update country selectors
        if (countrySelector) {
          countrySelector.innerHTML = `
            <div class="flag-icon">${AppState.countryFlag}</div>
            <span class="country-code">${AppState.countryCode}</span>
          `;
        }
        if (countrySelectorLogin) {
          countrySelectorLogin.innerHTML = `
            <div class="flag-icon">${AppState.countryFlag}</div>
            <span class="country-code">${AppState.countryCode}</span>
          `;
        }
        
        // Go back to previous page
        showPage(AppState.isSignup ? 'phone-signup' : 'phone-login');
      });
    });
  }
}

if (countrySearchInput) {
  countrySearchInput.addEventListener('input', function(e) {
    renderCountries(e.target.value);
  });
  
  countrySearchInput.addEventListener('focus', function() {
    this.parentElement.style.borderColor = '#165dff';
  });
  
  countrySearchInput.addEventListener('blur', function() {
    this.parentElement.style.borderColor = '#c5c5c5';
  });
}

// Initialize country list
if (countryList) {
  renderCountries();
}

// Verification Code Page
const codeInputs = document.querySelectorAll('.code-input');
const verifyCodeBtn = document.getElementById('verifyCodeBtn');
const resendCodeLink = document.getElementById('resendCodeLink');
const resendBtn = document.getElementById('resendBtn');

function updateCodePhoneNumber() {
  const codePhoneNumber = document.getElementById('codePhoneNumber');
  if (codePhoneNumber) {
    codePhoneNumber.textContent = `We've sent the code to ${AppState.countryCode}${AppState.phoneNumber}`;
  }
}

if (codeInputs.length > 0) {
  codeInputs.forEach((input, index) => {
    input.addEventListener('input', function(e) {
      const value = e.target.value.replace(/\D/g, '');
      e.target.value = value;
      
      if (value && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
      
      updateVerificationCode();
    });
    
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        codeInputs[index - 1].focus();
      }
    });
    
    input.addEventListener('paste', function(e) {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      pasted.split('').forEach((char, i) => {
        if (codeInputs[i]) {
          codeInputs[i].value = char;
        }
      });
      updateVerificationCode();
      if (codeInputs[pasted.length]) {
        codeInputs[pasted.length].focus();
      }
    });
  });
}

function updateVerificationCode() {
  AppState.verificationCode = Array.from(codeInputs).map(input => input.value).join('');
  const isValid = AppState.verificationCode.length === 6;
  
  if (verifyCodeBtn) {
    verifyCodeBtn.disabled = !isValid;
    verifyCodeBtn.style.opacity = isValid ? '1' : '0.6';
  }
}

if (verifyCodeBtn) {
  verifyCodeBtn.addEventListener('click', function() {
    if (AppState.verificationCode.length !== 6) {
      alert('請輸入完整的驗證碼');
      return;
    }
    
    // Simulate verification
    setTimeout(() => {
      // Randomly show error or success
      if (Math.random() > 0.3) {
        // Success
        if (AppState.isSignup) {
          showPage('success');
        } else {
          showPage('success');
        }
      } else {
        // Error - show resend option
        alert('驗證碼錯誤，請重新輸入');
        resendCodeLink.style.display = 'block';
        codeInputs.forEach(input => input.value = '');
        codeInputs[0].focus();
        updateVerificationCode();
      }
    }, 500);
  });
}

if (resendBtn) {
  resendBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('驗證碼已重新發送');
    resendCodeLink.style.display = 'none';
    codeInputs.forEach(input => input.value = '');
    codeInputs[0].focus();
    updateVerificationCode();
  });
}

// Terms Link
const termsLink = document.getElementById('termsLink');
if (termsLink) {
  termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    showPage('terms');
  });
}

// Success Page
const goToHomeBtn = document.getElementById('goToHomeBtn');
if (goToHomeBtn) {
  goToHomeBtn.addEventListener('click', function() {
    // Reset state
    AppState.phoneNumber = '';
    AppState.verificationCode = '';
    AppState.agreementAccepted = false;
    
    // Clear inputs
    if (phoneInputSignup) phoneInputSignup.value = '';
    if (phoneInputLogin) phoneInputLogin.value = '';
    if (agreementCheckboxSignup) agreementCheckboxSignup.checked = false;
    codeInputs.forEach(input => input.value = '');
    
    showPage('welcome');
  });
}

// Modal Functions
function showAccountExistsModal() {
  const modal = document.getElementById('accountExistsModal');
  const mask = document.getElementById('maskOverlay');
  
  if (modal && mask) {
    mask.style.display = 'block';
    modal.style.display = 'block';
    
    setTimeout(() => {
      mask.style.transition = 'opacity 0.3s ease';
      modal.style.transition = 'opacity 0.3s ease';
      mask.style.opacity = '1';
      modal.style.opacity = '1';
    }, 10);
  }
}

function closeModal() {
  const modal = document.getElementById('accountExistsModal');
  const mask = document.getElementById('maskOverlay');
  
  if (modal && mask) {
    mask.style.transition = 'opacity 0.3s ease';
    modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    mask.style.opacity = '0';
    modal.style.opacity = '0';
    modal.style.transform = 'translateY(100%)';
    
    setTimeout(() => {
      mask.style.display = 'none';
      modal.style.display = 'none';
      modal.style.transform = 'translateY(0)';
    }, 300);
  }
}

const closeModalBtn = document.getElementById('closeModalBtn');
const loginNowBtn = document.getElementById('loginNowBtn');
const maskOverlay = document.getElementById('maskOverlay');

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (loginNowBtn) {
  loginNowBtn.addEventListener('click', function() {
    closeModal();
    AppState.isSignup = false;
    showPage('phone-login');
    if (phoneInputLogin) {
      phoneInputLogin.value = AppState.phoneNumber;
    }
  });
}

if (maskOverlay) {
  maskOverlay.addEventListener('click', closeModal);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  console.log('App initialized');
  
  // Initialize welcome page
  initWelcomePage();
  
  showPage('welcome');
  updateCreateAccountButton();
  updateLoginButton();
  updateVerificationCode();
});

