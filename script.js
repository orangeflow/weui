// Validate Phone Number
function validatePhoneNumber(phone, phoneInputElement) {
  if (!phoneInputElement) return false;
  
  const phoneDigits = phone.replace(/\s/g, '');
  const isValid = phoneDigits.length >= 11;
  
  if (phoneInputElement.parentElement && phoneInputElement.parentElement.parentElement) {
    if (isValid) {
      phoneInputElement.parentElement.parentElement.style.borderColor = '#165dff';
    } else {
      phoneInputElement.parentElement.parentElement.style.borderColor = '#c5c5c5';
    }
  }
  
  return isValid;
}

// Update Create Account Button State
function updateCreateAccountButton(phoneInputElement, agreementCheckboxElement, createAccountBtnElement) {
  if (!phoneInputElement || !agreementCheckboxElement || !createAccountBtnElement) return;
  
  const phoneDigits = phoneInputElement.value.replace(/\s/g, '');
  const isPhoneValid = phoneDigits.length >= 11;
  const isAgreementChecked = agreementCheckboxElement.checked;
  
  if (isPhoneValid && isAgreementChecked) {
    createAccountBtnElement.disabled = false;
    createAccountBtnElement.style.opacity = '1';
  } else {
    createAccountBtnElement.disabled = true;
    createAccountBtnElement.style.opacity = '0.6';
  }
}

// Show Account Exists Modal
function showAccountExistsModal(maskOverlayElement, accountExistsModalElement) {
  if (!maskOverlayElement || !accountExistsModalElement) return;
  
  maskOverlayElement.style.display = 'block';
  accountExistsModalElement.style.display = 'block';
  
  // 添加淡入動畫
  maskOverlayElement.style.opacity = '0';
  accountExistsModalElement.style.opacity = '0';
  
  setTimeout(() => {
    maskOverlayElement.style.transition = 'opacity 0.3s ease';
    accountExistsModalElement.style.transition = 'opacity 0.3s ease';
    maskOverlayElement.style.opacity = '1';
    accountExistsModalElement.style.opacity = '1';
  }, 10);
}

// Close Modal Handler
function closeModal(maskOverlayElement, accountExistsModalElement) {
  if (!maskOverlayElement || !accountExistsModalElement) return;
  
  maskOverlayElement.style.transition = 'opacity 0.3s ease';
  accountExistsModalElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  maskOverlayElement.style.opacity = '0';
  accountExistsModalElement.style.opacity = '0';
  accountExistsModalElement.style.transform = 'translateY(100%)';
  
  setTimeout(() => {
    maskOverlayElement.style.display = 'none';
    accountExistsModalElement.style.display = 'none';
    accountExistsModalElement.style.transform = 'translateY(0)';
  }, 300);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  console.log('頁面加載完成');
  
  // DOM Elements - Get all elements after DOM is loaded
  const backBtn = document.getElementById('backBtn');
  const phoneInput = document.getElementById('phoneInput');
  const clearBtn = document.getElementById('clearBtn');
  const agreementCheckbox = document.getElementById('agreementCheckbox');
  const createAccountBtn = document.getElementById('createAccountBtn');
  const maskOverlay = document.getElementById('maskOverlay');
  const accountExistsModal = document.getElementById('accountExistsModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const loginNowBtn = document.getElementById('loginNowBtn');
  const agreementLink = document.querySelector('.agreement-link');
  
  // Back Button Click Handler
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      console.log('返回按鈕被點擊');
      // 添加點擊動畫效果
      this.classList.add('button-clicked');
      setTimeout(() => {
        this.classList.remove('button-clicked');
        // 這裡可以添加實際的返回邏輯
        alert('返回上一頁');
      }, 200);
    });
  }
  
  // Phone Input Handler
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // 只允許數字和空格
      let value = e.target.value.replace(/[^\d\s]/g, '');
      
      // 格式化電話號碼（每4位數字後加空格）
      value = value.replace(/\s/g, '');
      let formatted = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += ' ';
        }
        formatted += value[i];
      }
      
      e.target.value = formatted;
      
      // 顯示/隱藏清除按鈕
      if (clearBtn) {
        if (formatted.trim().length > 0) {
          clearBtn.style.display = 'flex';
          clearBtn.classList.add('visible');
        } else {
          clearBtn.style.display = 'none';
          clearBtn.classList.remove('visible');
        }
      }
      
      // 驗證電話號碼格式
      validatePhoneNumber(formatted, phoneInput);
      
      // 更新按鈕狀態
      updateCreateAccountButton(phoneInput, agreementCheckbox, createAccountBtn);
    });
    
    // Phone Input Focus Handler
    phoneInput.addEventListener('focus', function() {
      if (this.parentElement && this.parentElement.parentElement) {
        this.parentElement.parentElement.style.borderColor = '#165dff';
        this.parentElement.parentElement.style.boxShadow = '0 0 0 2px rgba(22, 93, 255, 0.1)';
      }
    });
    
    phoneInput.addEventListener('blur', function() {
      if (this.parentElement && this.parentElement.parentElement) {
        this.parentElement.parentElement.style.borderColor = '#c5c5c5';
        this.parentElement.parentElement.style.boxShadow = 'none';
      }
    });
    
    // 添加鍵盤事件
    phoneInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && createAccountBtn && !createAccountBtn.disabled) {
        createAccountBtn.click();
      }
    });
  }
  
  // Clear Button Handler
  if (clearBtn && phoneInput) {
    clearBtn.addEventListener('click', function() {
      phoneInput.value = '';
      phoneInput.focus();
      if (clearBtn) {
        clearBtn.style.display = 'none';
        clearBtn.classList.remove('visible');
      }
      validatePhoneNumber('', phoneInput);
      
      // 添加點擊動畫
      this.classList.add('button-clicked');
      setTimeout(() => {
        this.classList.remove('button-clicked');
      }, 200);
      
      // 更新按鈕狀態
      updateCreateAccountButton(phoneInput, agreementCheckbox, createAccountBtn);
    });
  }
  
  // Agreement Checkbox Handler
  if (agreementCheckbox) {
    agreementCheckbox.addEventListener('change', function() {
      console.log('協議複選框狀態:', this.checked);
      
      // 更新按鈕狀態
      updateCreateAccountButton(phoneInput, agreementCheckbox, createAccountBtn);
      
      // 添加動畫反饋
      const checkboxCustom = document.querySelector('.checkbox-custom');
      if (checkboxCustom) {
        checkboxCustom.style.transform = 'scale(0.9)';
        setTimeout(() => {
          checkboxCustom.style.transform = 'scale(1)';
        }, 150);
      }
    });
  }
  
  // Agreement Link Click Handler
  if (agreementLink) {
    agreementLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('點擊了服務條款鏈接');
      alert('打開服務條款頁面');
    });
  }
  
  // Create Account Button Handler
  if (createAccountBtn && phoneInput && agreementCheckbox) {
    createAccountBtn.addEventListener('click', function() {
      // 添加點擊動畫
      this.classList.add('button-clicked');
      
      const phoneDigits = phoneInput.value.replace(/\s/g, '');
      const isPhoneValid = phoneDigits.length >= 11;
      const isAgreementChecked = agreementCheckbox.checked;
      
      if (!isPhoneValid) {
        alert('請輸入有效的手機號碼');
        this.classList.remove('button-clicked');
        return;
      }
      
      if (!isAgreementChecked) {
        alert('請先同意服務條款');
        this.classList.remove('button-clicked');
        return;
      }
      
      console.log('創建賬戶按鈕被點擊');
      console.log('手機號碼:', phoneInput.value);
      
      // 模擬 API 調用
      setTimeout(() => {
        this.classList.remove('button-clicked');
        
        // 模擬賬戶已存在的情況
        showAccountExistsModal(maskOverlay, accountExistsModal);
      }, 500);
    });
  }
  
  // Close Modal Handler
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
      console.log('關閉模態框');
      closeModal(maskOverlay, accountExistsModal);
    });
  }
  
  // Click on mask to close modal
  if (maskOverlay) {
    maskOverlay.addEventListener('click', function() {
      closeModal(maskOverlay, accountExistsModal);
    });
  }
  
  // Login Now Button Handler
  if (loginNowBtn) {
    loginNowBtn.addEventListener('click', function() {
      console.log('立即登錄按鈕被點擊');
      
      // 添加點擊動畫
      this.classList.add('button-clicked');
      
      setTimeout(() => {
        this.classList.remove('button-clicked');
        closeModal(maskOverlay, accountExistsModal);
        alert('跳轉到登錄頁面');
      }, 200);
    });
  }
  
  // 初始化按鈕狀態
  updateCreateAccountButton(phoneInput, agreementCheckbox, createAccountBtn);
  
  // 添加觸摸反饋（移動端）
  const interactiveElements = [
    backBtn,
    clearBtn,
    createAccountBtn,
    agreementCheckbox,
    closeModalBtn,
    loginNowBtn
  ];
  
  interactiveElements.forEach(element => {
    if (element) {
      element.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
      });
      
      element.addEventListener('touchend', function() {
        setTimeout(() => {
          this.style.opacity = '1';
        }, 150);
      });
    }
  });
  
  // 導出一些有用的函數供調試使用
  window.debugFigma = {
    showModal: function() {
      showAccountExistsModal(maskOverlay, accountExistsModal);
    },
    closeModal: function() {
      closeModal(maskOverlay, accountExistsModal);
    },
    validatePhone: function(phone) {
      return validatePhoneNumber(phone, phoneInput);
    },
    updateButton: function() {
      updateCreateAccountButton(phoneInput, agreementCheckbox, createAccountBtn);
    }
  };
});

// 添加視覺反饋函數
function addVisualFeedback(element, type = 'pulse') {
  if (!element) return;
  
  if (type === 'pulse') {
    element.style.animation = 'buttonPulse 0.3s ease';
    setTimeout(() => {
      element.style.animation = '';
    }, 300);
  }
}

