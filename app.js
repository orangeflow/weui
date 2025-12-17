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
  
  console.log('Initializing welcome page...');
  console.log('signupBtn:', signupBtn);
  console.log('loginLinkBtn:', loginLinkBtn);
  
  if (signupBtn) {
    // Remove any existing event listeners by cloning the button
    const newSignupBtn = signupBtn.cloneNode(true);
    signupBtn.parentNode.replaceChild(newSignupBtn, signupBtn);
    const signupBtnRef = document.getElementById('signupBtn');
    
    // Use event delegation to handle clicks on button and its children
    signupBtnRef.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Signup button clicked', e.target, e.currentTarget);
      AppState.isSignup = true;
      showPage('phone-signup');
    });
    
    // Also handle click on the span inside
    const span = signupBtnRef.querySelector('span');
    if (span) {
      span.style.pointerEvents = 'none'; // Let clicks pass through to button
    }
    
    // Ensure button is clickable
    signupBtnRef.style.pointerEvents = 'auto';
    signupBtnRef.style.position = 'relative';
    signupBtnRef.style.zIndex = '10';
  } else {
    console.error('signupBtn not found');
  }
  
  if (loginLinkBtn) {
    loginLinkBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Login link clicked', e.target);
      AppState.isSignup = false;
      showPage('phone-login');
    });
    
    // Ensure link is clickable
    loginLinkBtn.style.pointerEvents = 'auto';
    loginLinkBtn.style.position = 'relative';
    loginLinkBtn.style.zIndex = '10';
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
// DOM elements will be accessed in DOMContentLoaded
let phoneInputSignup, clearBtnSignup, agreementCheckboxSignup, createAccountBtn;

function initPhoneInputSignup() {
  phoneInputSignup = document.getElementById('phoneInputSignup');
  clearBtnSignup = document.getElementById('clearBtnSignup');
  agreementCheckboxSignup = document.getElementById('agreementCheckboxSignup');
  createAccountBtn = document.getElementById('createAccountBtn');

  if (phoneInputSignup) {
  phoneInputSignup.addEventListener('input', function(e) {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    AppState.phoneNumber = formatted.replace(/\s/g, '');
    
    // Show/hide clear button
    if (clearBtnSignup) {
      if (formatted.trim().length > 0) {
        clearBtnSignup.style.display = 'flex';
      } else {
        clearBtnSignup.style.display = 'none';
      }
    }
    
    updateCreateAccountButton();
  });

  phoneInputSignup.addEventListener('focus', function() {
    if (this.parentElement && this.parentElement.parentElement) {
      this.parentElement.parentElement.style.borderColor = '#165dff';
      this.parentElement.parentElement.style.boxShadow = '0 0 0 2px rgba(22, 93, 255, 0.1)';
    }
  });

  phoneInputSignup.addEventListener('blur', function() {
    if (this.parentElement && this.parentElement.parentElement) {
      this.parentElement.parentElement.style.borderColor = '#c5c5c5';
      this.parentElement.parentElement.style.boxShadow = 'none';
    }
  });

  if (clearBtnSignup) {
    clearBtnSignup.addEventListener('click', function() {
      if (phoneInputSignup) {
        phoneInputSignup.value = '';
        phoneInputSignup.focus();
      }
      AppState.phoneNumber = '';
      if (clearBtnSignup) {
        clearBtnSignup.style.display = 'none';
      }
      updateCreateAccountButton();
    });
  }

  if (agreementCheckboxSignup) {
    agreementCheckboxSignup.addEventListener('change', function() {
      AppState.agreementAccepted = this.checked;
      updateCreateAccountButton();
    });
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
  }
}

function updateCreateAccountButton() {
  const phoneDigits = AppState.phoneNumber.replace(/\s/g, '');
  const isValid = phoneDigits.length >= 11 && AppState.agreementAccepted;
  
  if (createAccountBtn) {
    createAccountBtn.disabled = !isValid;
    createAccountBtn.style.opacity = isValid ? '1' : '0.6';
  }
}

// Phone Input - Login
// DOM elements will be accessed in DOMContentLoaded
let phoneInputLogin, clearBtnLogin, loginBtn;

function initPhoneInputLogin() {
  phoneInputLogin = document.getElementById('phoneInputLogin');
  clearBtnLogin = document.getElementById('clearBtnLogin');
  loginBtn = document.getElementById('loginBtn');

  if (phoneInputLogin) {
  phoneInputLogin.addEventListener('input', function(e) {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    AppState.phoneNumber = formatted.replace(/\s/g, '');
    
    if (clearBtnLogin) {
      if (formatted.trim().length > 0) {
        clearBtnLogin.style.display = 'flex';
      } else {
        clearBtnLogin.style.display = 'none';
      }
    }
    
    updateLoginButton();
  });

  phoneInputLogin.addEventListener('focus', function() {
    if (this.parentElement && this.parentElement.parentElement) {
      this.parentElement.parentElement.style.borderColor = '#165dff';
      this.parentElement.parentElement.style.boxShadow = '0 0 0 2px rgba(22, 93, 255, 0.1)';
    }
  });

  phoneInputLogin.addEventListener('blur', function() {
    if (this.parentElement && this.parentElement.parentElement) {
      this.parentElement.parentElement.style.borderColor = '#c5c5c5';
      this.parentElement.parentElement.style.boxShadow = 'none';
    }
  });

  if (clearBtnLogin) {
    clearBtnLogin.addEventListener('click', function() {
      if (phoneInputLogin) {
        phoneInputLogin.value = '';
        phoneInputLogin.focus();
      }
      AppState.phoneNumber = '';
      if (clearBtnLogin) {
        clearBtnLogin.style.display = 'none';
      }
      updateLoginButton();
    });
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
  }
}

function updateLoginButton() {
  const phoneDigits = AppState.phoneNumber.replace(/\s/g, '');
  const isValid = phoneDigits.length >= 11;
  
  if (loginBtn) {
    loginBtn.disabled = !isValid;
    loginBtn.style.opacity = isValid ? '1' : '0.6';
  }
}

// Country Selector
// DOM elements will be accessed in DOMContentLoaded
let countrySelector, countrySelectorLogin, countrySearchInput, countryList, emptyState;

function openCountrySelect() {
  showPage('country-select');
}

function initCountrySelector() {
  countrySelector = document.getElementById('countrySelector');
  countrySelectorLogin = document.getElementById('countrySelectorLogin');

  if (countrySelector) {
    countrySelector.addEventListener('click', openCountrySelect);
  }

  if (countrySelectorLogin) {
    countrySelectorLogin.addEventListener('click', openCountrySelect);
  }
}

// Country Selection Page
function initCountrySelection() {
  countrySearchInput = document.getElementById('countrySearchInput');
  countryList = document.getElementById('countryList');
  emptyState = document.getElementById('emptyState');

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
  if (!countryList || !emptyState) return;
  
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
      if (this.parentElement) {
        this.parentElement.style.borderColor = '#165dff';
      }
    });
    
    countrySearchInput.addEventListener('blur', function() {
      if (this.parentElement) {
        this.parentElement.style.borderColor = '#c5c5c5';
      }
    });
  }

  // Initialize country list
  if (countryList) {
    renderCountries();
  }
}

// Verification Code Page
// DOM elements will be accessed in DOMContentLoaded
let codeInputs, verifyCodeBtn, resendCodeLink, resendBtn;

function initVerificationCode() {
  codeInputs = document.querySelectorAll('.code-input');
  verifyCodeBtn = document.getElementById('verifyCodeBtn');
  resendCodeLink = document.getElementById('resendCodeLink');
  resendBtn = document.getElementById('resendBtn');
}

function updateCodePhoneNumber() {
  const codePhoneNumber = document.getElementById('codePhoneNumber');
  if (codePhoneNumber) {
    codePhoneNumber.textContent = `We've sent the code to ${AppState.countryCode}${AppState.phoneNumber}`;
  }
}

function initCodeInputs() {
  if (!codeInputs || codeInputs.length === 0) return;
  
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
      // Fix: Check if pasted.length is within bounds before accessing
      const nextIndex = Math.min(pasted.length, codeInputs.length - 1);
      if (codeInputs[nextIndex]) {
        codeInputs[nextIndex].focus();
      } else if (codeInputs.length > 0 && pasted.length >= codeInputs.length) {
        // If all inputs are filled, focus on the last one
        codeInputs[codeInputs.length - 1].focus();
      }
    });
  });
}

function updateVerificationCode() {
  if (!codeInputs || codeInputs.length === 0) return;
  
  AppState.verificationCode = Array.from(codeInputs).map(input => input.value).join('');
  const isValid = AppState.verificationCode.length === 6;
  
  if (verifyCodeBtn) {
    verifyCodeBtn.disabled = !isValid;
    verifyCodeBtn.style.opacity = isValid ? '1' : '0.6';
  }
}

function initVerifyCodeButton() {
  if (!verifyCodeBtn) return;
  
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
        if (resendCodeLink) {
          resendCodeLink.style.display = 'block';
        }
        codeInputs.forEach(input => input.value = '');
        if (codeInputs[0]) {
          codeInputs[0].focus();
        }
        updateVerificationCode();
      }
    }, 500);
  });
}

function initResendButton() {
  if (!resendBtn) return;
  
  resendBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('驗證碼已重新發送');
    if (resendCodeLink) {
      resendCodeLink.style.display = 'none';
    }
    codeInputs.forEach(input => input.value = '');
    if (codeInputs[0]) {
      codeInputs[0].focus();
    }
    updateVerificationCode();
  });
}

// Terms Link
// DOM elements will be accessed in DOMContentLoaded
let termsLink, goToHomeBtn;

function initTermsLink() {
  termsLink = document.getElementById('termsLink');
  if (termsLink) {
    termsLink.addEventListener('click', function(e) {
      e.preventDefault();
      showPage('terms');
    });
  }
}

// Success Page
function initSuccessPage() {
  goToHomeBtn = document.getElementById('goToHomeBtn');
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
      if (codeInputs && codeInputs.length > 0) {
        codeInputs.forEach(input => input.value = '');
      }
      
      showPage('welcome');
    });
  }
}

// Modal Functions
// DOM elements will be accessed in DOMContentLoaded
let closeModalBtn, loginNowBtn, maskOverlay, accountExistsModal;

function showAccountExistsModal() {
  if (!accountExistsModal || !maskOverlay) return;
  
  maskOverlay.style.display = 'block';
  accountExistsModal.style.display = 'block';
  
  setTimeout(() => {
    maskOverlay.style.transition = 'opacity 0.3s ease';
    accountExistsModal.style.transition = 'opacity 0.3s ease';
    maskOverlay.style.opacity = '1';
    accountExistsModal.style.opacity = '1';
  }, 10);
}

function closeModal() {
  if (!accountExistsModal || !maskOverlay) return;
  
  maskOverlay.style.transition = 'opacity 0.3s ease';
  accountExistsModal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  maskOverlay.style.opacity = '0';
  accountExistsModal.style.opacity = '0';
  accountExistsModal.style.transform = 'translateY(100%)';
  
  setTimeout(() => {
    maskOverlay.style.display = 'none';
    accountExistsModal.style.display = 'none';
    accountExistsModal.style.transform = 'translateY(0)';
  }, 300);
}

function initModal() {
  closeModalBtn = document.getElementById('closeModalBtn');
  loginNowBtn = document.getElementById('loginNowBtn');
  maskOverlay = document.getElementById('maskOverlay');
  accountExistsModal = document.getElementById('accountExistsModal');

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
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  console.log('App initialized');
  
  // Initialize all components
  initWelcomePage();
  initPhoneInputSignup();
  initPhoneInputLogin();
  initCountrySelector();
  initCountrySelection();
  initVerificationCode();
  initCodeInputs();
  initVerifyCodeButton();
  initResendButton();
  initTermsLink();
  initSuccessPage();
  initModal();
  
  showPage('welcome');
  updateCreateAccountButton();
  updateLoginButton();
  updateVerificationCode();
});

