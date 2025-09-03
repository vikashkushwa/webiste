// ===== SMOOTH SCROLLING =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step-item, .benefit-card, .ai-feature, .comparison-card, .story-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ===== WHATSAPP BUTTON TRACKING =====
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track WhatsApp clicks
            trackWhatsAppClick();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // ===== PRICING CALCULATOR =====
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        createPricingCalculator();
    }

    // ===== RESTAURANT BENEFITS CALCULATOR =====
    const commissionSection = document.querySelector('.commission-comparison');
    if (commissionSection) {
        createCommissionCalculator();
    }

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ===== FORM VALIDATION =====
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', validateForm);
    });

    // ===== SCROLL TO TOP BUTTON =====
    createScrollToTopButton();
});

// ===== FUNCTIONS =====

function trackWhatsAppClick() {
    // You can integrate with Google Analytics or other tracking services here
    console.log('WhatsApp button clicked');
    
    // Show success message
    showNotification('Redirecting to WhatsApp...', 'success');
}

function createPricingCalculator() {
    const pricingSection = document.querySelector('.pricing');
    if (!pricingSection) return;

    const calculatorHTML = `
        <div class="pricing-calculator fancy">
            <div class="calculator-header">
                <div class="badge"><i class="fas fa-calculator"></i> Savings Calculator</div>
                <h4>Calculate Your Savings</h4>
                <p class="sub">Compare other platforms vs VK Solutions (₹5 platform fee)</p>
            </div>
            <div class="calculator-inputs">
                <div class="input-group">
                    <label for="orderAmount">Order Amount (₹)</label>
                    <input type="number" id="orderAmount" placeholder="500" min="0">
                </div>
                <div class="input-group">
                    <label for="otherCommission">Other Platform Commission (%)</label>
                    <select id="otherCommission">
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                        <option value="30" selected>30%</option>
                        <option value="35">35%</option>
                        <option value="40">40%</option>
                    </select>
                </div>
            </div>
            <div class="delivery-note">
                <span class="badge-equal"><i class="fas fa-truck"></i> Delivery</span>
                <span class="equal-sign">=</span>
                <span class="badge-equal other">Same on both</span>
                <p>Delivery charges are typically similar across platforms, so we compare only platform fees.</p>
            </div>
            <button class="btn btn-primary" onclick="calculateSavings()">Calculate Savings</button>
            <div class="calculator-results" id="calculatorResults"></div>
        </div>
    `;

    const pricingCard = pricingSection.querySelector('.pricing-card');
    if (pricingCard) {
        pricingCard.insertAdjacentHTML('afterend', calculatorHTML);
    }
}

function createCommissionCalculator() {
    const commissionSection = document.querySelector('.commission-comparison');
    if (!commissionSection) return;

    const calculatorHTML = `
        <div class="commission-calculator fancy">
            <div class="calculator-header">
                <div class="badge"><i class="fas fa-chart-line"></i> Restaurant Calculator</div>
                <h4>Calculate Your Restaurant Savings</h4>
                <p class="sub">Estimate monthly and annual savings with VK Solutions</p>
            </div>
            <div class="calculator-inputs">
                <div class="input-group">
                    <label for="monthlyOrders">Monthly Orders</label>
                    <input type="number" id="monthlyOrders" placeholder="100" min="0">
                </div>
                <div class="input-group">
                    <label for="avgOrderValue">Average Order Value (₹)</label>
                    <input type="number" id="avgOrderValue" placeholder="500" min="0">
                </div>
                <div class="input-group">
                    <label for="otherCommissionRate">Other Platform Commission (%)</label>
                    <select id="otherCommissionRate">
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                        <option value="30" selected>30%</option>
                        <option value="35">35%</option>
                        <option value="40">40%</option>
                    </select>
                </div>
            </div>
            <div class="delivery-note small">
                <i class="fas fa-info-circle"></i>
                Delivery fees are paid by customers and don't reduce your revenue; comparison focuses on platform charges.
            </div>
            <button class="btn btn-primary" onclick="calculateRestaurantSavings()">Calculate Monthly Savings</button>
            <div class="calculator-results" id="restaurantCalculatorResults"></div>
        </div>
    `;

    commissionSection.insertAdjacentHTML('beforeend', calculatorHTML);
}

function calculateSavings() {
    const orderAmount = parseFloat(document.getElementById('orderAmount').value) || 0;
    const otherCommission = parseFloat(document.getElementById('otherCommission').value) || 0;
    
    if (orderAmount <= 0) {
        showNotification('Please enter a valid order amount', 'error');
        return;
    }

    const otherPlatformFee = (orderAmount * otherCommission) / 100;
    const vkPlatformFee = 5;

    const otherTotal = orderAmount + otherPlatformFee;
    const vkTotal = orderAmount + vkPlatformFee;
    const savings = otherTotal - vkTotal;

    const savingsPercent = otherTotal > 0 ? (savings / otherTotal) * 100 : 0;

    const resultsHTML = `
        <div class="results-savings">
            <div class="savings-badge">
                <i class="fas fa-piggy-bank"></i>
                <div>
                    <div class="label">You Save</div>
                    <div class="amount">₹${savings.toFixed(2)}</div>
                </div>
            </div>
            <div class="progress">
                <div class="bar" style="width:${Math.max(0, Math.min(100, savingsPercent))}%;"></div>
            </div>
            <div class="percent">${savingsPercent.toFixed(1)}% less vs others</div>
        </div>
        <div class="results-grid">
            <div class="result-item">
                <h5>Other Platform</h5>
                <p>Commission: ₹${otherPlatformFee.toFixed(2)}</p>
                <p>Total to Pay: ₹${otherTotal.toFixed(2)}</p>
            </div>
            <div class="result-item">
                <h5>VK Solutions</h5>
                <p>Platform Fee: ₹${vkPlatformFee.toFixed(2)}</p>
                <p>Total to Pay: ₹${vkTotal.toFixed(2)}</p>
            </div>
        </div>
    `;

    document.getElementById('calculatorResults').innerHTML = resultsHTML;
}

function calculateRestaurantSavings() {
    const monthlyOrders = parseFloat(document.getElementById('monthlyOrders').value) || 0;
    const avgOrderValue = parseFloat(document.getElementById('avgOrderValue').value) || 0;
    const otherCommissionRate = parseFloat(document.getElementById('otherCommissionRate').value) || 0;
    
    if (monthlyOrders <= 0 || avgOrderValue <= 0) {
        showNotification('Please enter valid values', 'error');
        return;
    }

    const monthlyRevenue = monthlyOrders * avgOrderValue;
    const otherPlatformCommission = (monthlyRevenue * otherCommissionRate) / 100;
    const vkPlatformFees = monthlyOrders * 5;
    const monthlySavings = otherPlatformCommission - vkPlatformFees;
    const annualSavings = monthlySavings * 12;

    const resultsHTML = `
        <div class="results-savings">
            <div class="savings-badge">
                <i class="fas fa-sack-dollar"></i>
                <div>
                    <div class="label">Monthly Savings</div>
                    <div class="amount">₹${monthlySavings.toFixed(2)}</div>
                </div>
            </div>
            <div class="sub-amount">Annual Savings: <strong>₹${annualSavings.toFixed(2)}</strong></div>
        </div>
        <div class="results-grid">
            <div class="result-item">
                <h5>Monthly Revenue</h5>
                <p>₹${monthlyRevenue.toFixed(2)}</p>
            </div>
            <div class="result-item">
                <h5>Other Platform</h5>
                <p>Monthly Commission: ₹${otherPlatformCommission.toFixed(2)}</p>
            </div>
            <div class="result-item">
                <h5>VK Solutions</h5>
                <p>Monthly Platform Fees: ₹${vkPlatformFees.toFixed(2)}</p>
            </div>
        </div>
    `;

    document.getElementById('restaurantCalculatorResults').innerHTML = resultsHTML;
}

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(255, 107, 53, 0.3)';
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = '#3498db';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function validateForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    if (isValid) {
        showNotification('Form submitted successfully!', 'success');
        form.reset();
    } else {
        showNotification('Please fill in all required fields', 'error');
    }
}

// ===== ADDITIONAL CSS FOR CALCULATORS =====
const calculatorStyles = `
    <style>
        .pricing-calculator,
        .commission-calculator {
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            margin-top: 30px;
            text-align: center;
        }

        .fancy { position: relative; overflow: hidden; }
        .fancy::after {
            content: '';
            position: absolute;
            width: 140px; height: 140px;
            right: -40px; top: -40px;
            background: radial-gradient(circle at center, rgba(255,107,53,0.18), transparent 60%);
            border-radius: 50%;
            pointer-events: none;
        }

        .calculator-header .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 999px;
            background: #f8f9fa;
            color: #ff6b35;
            font-weight: 700;
            box-shadow: 0 8px 18px rgba(0,0,0,0.08);
            margin-bottom: 8px;
        }

        .calculator-header h4 { margin-bottom: 6px; color: #333; }
        .calculator-header .sub { color: #5a5f6a; margin-bottom: 10px; }

        .calculator-inputs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        .input-group { text-align: left; }
        .input-group label { display: block; margin-bottom: 8px; color: #333; font-weight: 600; }
        .input-group input, .input-group select {
            width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 12px; font-size: 1rem;
            transition: border-color 0.3s ease, box-shadow 0.3s ease; background: #fff;
        }
        .input-group input:focus, .input-group select:focus {
            outline: none; border-color: #667eea; box-shadow: 0 0 0 4px rgba(102,126,234,0.15);
        }

        .delivery-note { display: inline-flex; align-items: center; gap: 10px; justify-content: center; background: #f8f9fa; padding: 10px 14px; border-radius: 50px; border: 1px dashed #ddd; margin: 5px 0 15px; }
        .delivery-note.small { border-radius: 12px; padding: 10px 12px; display: flex; gap: 10px; text-align: left; }
        .badge-equal { display: inline-flex; align-items: center; gap: 6px; background: #eaf7ff; color: #0d6efd; padding: 6px 10px; border-radius: 999px; font-size: 0.9rem; font-weight: 700; }
        .badge-equal.other { background: #eaf7ea; color: #2b8a3e; }
        .equal-sign { font-weight: 800; color: #999; }
        .delivery-note p { margin: 0 0 0 8px; color: #666; font-size: 0.95rem; }

        .calculator-results { margin-top: 20px; }

        .results-savings { margin-bottom: 16px; }
        .savings-badge { display: inline-flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 999px; background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: #fff; font-weight: 800; box-shadow: 0 12px 28px rgba(255,107,53,0.35); }
        .savings-badge .label { font-size: 0.85rem; opacity: 0.95; }
        .savings-badge .amount { font-size: 1.2rem; }
        .progress { height: 10px; background: #eef1f6; border-radius: 999px; overflow: hidden; margin: 10px auto; max-width: 420px; }
        .progress .bar { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); box-shadow: inset 0 0 8px rgba(255,255,255,0.2); }
        .percent { color: #5a5f6a; font-weight: 600; }

        .results-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 16px; }
        .result-item { background: #f8f9fa; padding: 20px; border-radius: 15px; text-align: center; }
        .result-item h5 { margin-bottom: 8px; font-size: 1rem; color: #333; }
        .result-item p { margin-bottom: 5px; font-size: 0.92rem; color: #5a5f6a; }

        @media (max-width: 768px) { .calculator-inputs { grid-template-columns: 1fr; } .results-grid { grid-template-columns: 1fr; } }
    </style>
`;

// Inject calculator styles
document.head.insertAdjacentHTML('beforeend', calculatorStyles);
