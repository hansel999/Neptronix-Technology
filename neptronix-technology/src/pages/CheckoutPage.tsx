import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LockClosedIcon,
  TruckIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

type Step = 'shipping' | 'payment' | 'review';
type PaymentMethod = 'esewa' | 'khalti' | 'credit_card' | 'cod';
type GatewayStep = 'idle' | 'redirect' | 'pin' | 'processing' | 'success' | 'failed';

const ESEWA_CONFIG = {
  name: 'eSewa',
  color: '#60bb46',
  textColor: 'white',
  bg: 'bg-[#60bb46]',
  border: 'border-[#60bb46]',
  ring: 'focus:ring-[#60bb46]',
  logo: (
    <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="6" fill="#60bb46"/>
      <text x="10" y="27" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="white">e</text>
      <text x="26" y="27" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="white">Sewa</text>
    </svg>
  ),
  tagline: 'Nepal\'s most trusted digital wallet',
  pinLabel: 'eSewa MPIN',
  pinPlaceholder: 'Enter your 4-digit MPIN',
  demoPin: '1234',
  accentClass: 'text-[#60bb46]',
  buttonClass: 'bg-[#60bb46] hover:bg-[#4ea836] text-white',
  lightBg: 'bg-green-50',
  lightBorder: 'border-green-200',
};

const KHALTI_CONFIG = {
  name: 'Khalti',
  color: '#5c2d91',
  textColor: 'white',
  bg: 'bg-[#5c2d91]',
  border: 'border-[#5c2d91]',
  ring: 'focus:ring-[#5c2d91]',
  logo: (
    <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="6" fill="#5c2d91"/>
      <circle cx="18" cy="20" r="8" fill="#f1592a"/>
      <text x="32" y="27" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="white">Khalti</text>
    </svg>
  ),
  tagline: 'Digital payment for Nepal',
  pinLabel: 'Khalti MPIN',
  pinPlaceholder: 'Enter your 4-digit MPIN',
  demoPin: '1234',
  accentClass: 'text-[#5c2d91]',
  buttonClass: 'bg-[#5c2d91] hover:bg-[#4a2275] text-white',
  lightBg: 'bg-purple-50',
  lightBorder: 'border-purple-200',
};

// ── Gateway Payment Modal ──
const GatewayModal: React.FC<{
  gateway: 'esewa' | 'khalti';
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}> = ({ gateway, amount, onSuccess, onClose }) => {
  const config = gateway === 'esewa' ? ESEWA_CONFIG : KHALTI_CONFIG;
  const [step, setStep] = useState<GatewayStep>('redirect');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');

  const handleProceed = () => {
    if (!mobile || mobile.length < 10) { setMobileError('Enter a valid 10-digit mobile number'); return; }
    setMobileError('');
    setStep('pin');
  };

  const handleVerify = () => {
    if (pin.length < 4) { setPinError('Enter your 4-digit MPIN'); return; }
    if (pin !== config.demoPin) { setPinError('Incorrect MPIN. Use demo PIN: 1234'); return; }
    setPinError('');
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  const handleSuccess = () => { onSuccess(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className={`${config.bg} px-5 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {config.logo}
          </div>
          {step !== 'processing' && step !== 'success' && (
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="p-5">
          {/* Amount */}
          <div className={`${config.lightBg} ${config.lightBorder} border rounded-lg px-4 py-3 mb-5 flex items-center justify-between`}>
            <span className="text-sm text-gray-600 font-medium">Amount to Pay</span>
            <span className={`text-xl font-bold ${config.accentClass}`}>Rs.{amount.toLocaleString()}</span>
          </div>

          {/* Step: redirect — enter mobile */}
          {step === 'redirect' && (
            <>
              <p className="text-sm text-gray-500 mb-4">{config.tagline}</p>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registered Mobile Number</label>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setMobileError(''); }}
                placeholder="98XXXXXXXX"
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${config.ring} ${mobileError ? 'border-red-400' : 'border-gray-300'}`}
              />
              {mobileError && <p className="text-red-500 text-xs mt-1">{mobileError}</p>}
              <button onClick={handleProceed} className={`w-full mt-4 py-3 rounded-lg font-bold text-sm ${config.buttonClass} transition-colors`}>
                Continue
              </button>
            </>
          )}

          {/* Step: pin entry */}
          {step === 'pin' && (
            <>
              <div className={`${config.lightBg} rounded-lg p-3 mb-4 text-xs ${config.accentClass} font-medium`}>
                Demo Mode — Use MPIN: <strong>1234</strong>
              </div>
              <p className="text-sm text-gray-500 mb-1">Sending to: <strong className="text-gray-800">{mobile}</strong></p>
              <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">{config.pinLabel}</label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setPinError(''); }}
                placeholder={config.pinPlaceholder}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm tracking-widest focus:outline-none focus:ring-2 ${config.ring} ${pinError ? 'border-red-400' : 'border-gray-300'}`}
              />
              {pinError && <p className="text-red-500 text-xs mt-1">{pinError}</p>}
              <button onClick={handleVerify} className={`w-full mt-4 py-3 rounded-lg font-bold text-sm ${config.buttonClass} transition-colors`}>
                Confirm Payment
              </button>
              <button onClick={() => setStep('redirect')} className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700">
                ← Back
              </button>
            </>
          )}

          {/* Step: processing */}
          {step === 'processing' && (
            <div className="text-center py-6">
              <ArrowPathIcon className={`h-12 w-12 ${config.accentClass} animate-spin mx-auto mb-4`} />
              <p className="font-semibold text-gray-800">Processing Payment…</p>
              <p className="text-sm text-gray-500 mt-1">Please do not close this window</p>
            </div>
          )}

          {/* Step: success */}
          {step === 'success' && (
            <div className="text-center py-4">
              <div className={`w-16 h-16 rounded-full ${config.lightBg} flex items-center justify-center mx-auto mb-4`}>
                <CheckCircleIcon className={`h-10 w-10 ${config.accentClass}`} />
              </div>
              <p className="text-lg font-bold text-gray-900 mb-1">Payment Successful!</p>
              <p className="text-sm text-gray-500 mb-1">Rs.{amount.toLocaleString()} paid via {config.name}</p>
              <p className="text-xs text-gray-400 mb-5">Txn ID: {config.name.toUpperCase()}-{Date.now().toString().slice(-8)}</p>
              <button onClick={handleSuccess} className={`w-full py-3 rounded-lg font-bold text-sm ${config.buttonClass} transition-colors`}>
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const { state: cartState, getSelectedItems, clearCart } = useCart();
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const buyNowData = (location.state as any)?.buyNow;
  const isBuyNow = !!buyNowData;
  const selectedItems = isBuyNow
    ? [{ product: buyNowData.product, quantity: buyNowData.quantity, selected: true }]
    : (() => { const raw = getSelectedItems(); return raw.length > 0 ? raw : cartState.items; })();
  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 150;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const [shippingData, setShippingData] = useState({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    email: authState.user?.email || '',
    phone: authState.user?.phone || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nepal',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
  const [cardData, setCardData] = useState({ cardNumber: '', cardName: '', expiry: '', cvv: '' });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [gatewayOpen, setGatewayOpen] = useState(false);
  const [gatewayPaid, setGatewayPaid] = useState(false);

  const steps: { key: Step; label: string; icon: React.ElementType }[] = [
    { key: 'shipping', label: 'Shipping', icon: TruckIcon },
    { key: 'payment', label: 'Payment', icon: CreditCardIcon },
    { key: 'review', label: 'Review', icon: CheckCircleIcon },
  ];

  const validateShipping = () => {
    const errors: Record<string, string> = {};
    if (!shippingData.firstName) errors.firstName = 'Required';
    if (!shippingData.lastName) errors.lastName = 'Required';
    if (!shippingData.email) errors.email = 'Required';
    if (!shippingData.phone) errors.phone = 'Required';
    if (!shippingData.street) errors.street = 'Required';
    if (!shippingData.city) errors.city = 'Required';
    if (!shippingData.state) errors.state = 'Required';
    if (!shippingData.zipCode) errors.zipCode = 'Required';
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingSubmit = () => {
    if (validateShipping()) setCurrentStep('payment');
  };

  const handlePaymentSubmit = () => {
    setCurrentStep('review');
  };

  const handlePlaceOrder = () => {
    if ((paymentMethod === 'esewa' || paymentMethod === 'khalti') && !gatewayPaid) {
      setGatewayOpen(true);
      return;
    }
    finalizeOrder();
  };

  const finalizeOrder = async () => {
    try {
      const orderPayload = {
        items: selectedItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shipping: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          email: shippingData.email,
          phone: shippingData.phone,
          street: shippingData.street,
          city: shippingData.city,
          state: shippingData.state,
          zipCode: shippingData.zipCode,
          country: shippingData.country,
          notes: shippingData.notes,
        },
        payment: { method: paymentMethod },
        subtotal,
        shippingCost: shipping,
        tax,
        total,
      };
      const data = await ordersAPI.place(orderPayload);
      const newOrderId = data?.order?._id ?? data?.order?.id ?? ('NTX-' + Date.now().toString().slice(-8));
      setOrderId(newOrderId);
    } catch {
      setOrderId('NTX-' + Date.now().toString().slice(-8));
    } finally {
      setOrderPlaced(true);
      if (!isBuyNow) clearCart();
    }
  };

  const handleGatewaySuccess = () => {
    setGatewayOpen(false);
    setGatewayPaid(true);
    finalizeOrder();
  };

  const paymentMethodLabel = () => {
    if (paymentMethod === 'esewa') return 'eSewa';
    if (paymentMethod === 'khalti') return 'Khalti';
    if (paymentMethod === 'credit_card') return 'Credit / Debit Card';
    return 'Cash on Delivery';
  };

  if (cartState.items.length === 0 && !isBuyNow && !orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
        <div className="bg-white shadow-sm p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
          <Link to="/products" className="text-[#2874f0] hover:underline font-medium">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
        <div className="bg-white shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircleIcon className="h-10 w-10 text-[#388e3c]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-500 text-sm mb-1">Thank you for shopping with Neptronix Technology.</p>
          <p className="text-xs text-gray-400 mb-4">Paid via <strong>{paymentMethodLabel()}</strong></p>
          <div className="bg-[#f1f3f6] rounded p-4 mb-5">
            <p className="text-xs text-gray-500 mb-1">Order ID</p>
            <p className="text-lg font-bold text-gray-900">{orderId}</p>
          </div>
          <p className="text-xs text-gray-400 mb-6">
            A confirmation will be sent to {shippingData.email}.
          </p>
          <div className="space-y-3">
            <Link to="/account" className="block w-full bg-[#2874f0] text-white py-3 rounded font-bold hover:bg-[#1a65de]">
              View Order
            </Link>
            <Link to="/products" className="block w-full border border-gray-200 text-gray-700 py-3 rounded font-medium hover:bg-gray-50">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      {/* Gateway Modal */}
      {gatewayOpen && (paymentMethod === 'esewa' || paymentMethod === 'khalti') && (
        <GatewayModal
          gateway={paymentMethod}
          amount={total}
          onSuccess={handleGatewaySuccess}
          onClose={() => setGatewayOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Secure Checkout</h1>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => {
            const currentIdx = steps.findIndex(s => s.key === currentStep);
            const isDone = currentIdx > index;
            const isActive = currentStep === step.key;
            return (
              <React.Fragment key={step.key}>
                <div className={`flex items-center ${isActive ? 'text-[#2874f0]' : isDone ? 'text-[#388e3c]' : 'text-gray-400'}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                    isActive ? 'border-[#2874f0] bg-blue-50' : isDone ? 'border-[#388e3c] bg-green-50' : 'border-gray-300'
                  }`}>
                    {isDone ? <CheckCircleIcon className="h-5 w-5" /> : <step.icon className="h-4 w-4" />}
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:block">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-10 sm:w-20 h-0.5 mx-2 ${isDone ? 'bg-[#388e3c]' : 'bg-gray-300'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* ── Shipping Step ── */}
            {currentStep === 'shipping' && (
              <div className="bg-white rounded shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'firstName', label: 'First Name', type: 'text', half: true },
                    { name: 'lastName', label: 'Last Name', type: 'text', half: true },
                    { name: 'email', label: 'Email', type: 'email', half: true },
                    { name: 'phone', label: 'Phone', type: 'tel', half: true },
                    { name: 'street', label: 'Street Address', type: 'text', half: false },
                    { name: 'city', label: 'City', type: 'text', half: true },
                    { name: 'state', label: 'State/Province', type: 'text', half: true },
                    { name: 'zipCode', label: 'Zip Code', type: 'text', half: true },
                    { name: 'country', label: 'Country', type: 'text', half: true },
                  ].map(field => (
                    <div key={field.name} className={field.half ? '' : 'sm:col-span-2'}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        value={(shippingData as Record<string, string>)[field.name]}
                        onChange={e => setShippingData(prev => ({ ...prev, [field.name]: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#2874f0] focus:border-transparent text-sm ${shippingErrors[field.name] ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      {shippingErrors[field.name] && <p className="text-red-500 text-xs mt-0.5">{shippingErrors[field.name]}</p>}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                    <textarea
                      value={shippingData.notes}
                      onChange={e => setShippingData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2874f0] text-sm"
                      placeholder="Special delivery instructions…"
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <Link to="/cart" className="text-sm text-gray-500 hover:text-gray-700">← Back to Cart</Link>
                  <button onClick={handleShippingSubmit} className="bg-[#2874f0] hover:bg-[#1a65de] text-white px-8 py-2.5 rounded font-bold text-sm">
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* ── Payment Step ── */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Payment Method</h2>

                <div className="space-y-3 mb-6">
                  {/* eSewa */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'esewa' ? 'border-[#60bb46] bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value="esewa" checked={paymentMethod === 'esewa'} onChange={() => setPaymentMethod('esewa')} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${paymentMethod === 'esewa' ? 'border-[#60bb46]' : 'border-gray-300'}`}>
                      {paymentMethod === 'esewa' && <div className="w-2.5 h-2.5 rounded-full bg-[#60bb46]" />}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-[#60bb46] rounded px-2 py-1">
                        <span className="text-white font-bold text-sm tracking-wide">eSewa</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">eSewa</p>
                        <p className="text-xs text-gray-500">Nepal's leading digital wallet</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">Popular</span>
                  </label>

                  {/* Khalti */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'khalti' ? 'border-[#5c2d91] bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value="khalti" checked={paymentMethod === 'khalti'} onChange={() => setPaymentMethod('khalti')} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${paymentMethod === 'khalti' ? 'border-[#5c2d91]' : 'border-gray-300'}`}>
                      {paymentMethod === 'khalti' && <div className="w-2.5 h-2.5 rounded-full bg-[#5c2d91]" />}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-[#5c2d91] rounded px-2 py-1 flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#f1592a]" />
                        <span className="text-white font-bold text-sm">Khalti</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Khalti</p>
                        <p className="text-xs text-gray-500">Fast & secure digital payments</p>
                      </div>
                    </div>
                  </label>

                  {/* Credit / Debit Card */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-[#2874f0] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value="credit_card" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${paymentMethod === 'credit_card' ? 'border-[#2874f0]' : 'border-gray-300'}`}>
                      {paymentMethod === 'credit_card' && <div className="w-2.5 h-2.5 rounded-full bg-[#2874f0]" />}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <CreditCardIcon className="h-8 w-8 text-[#2874f0]" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Credit / Debit Card</p>
                        <p className="text-xs text-gray-500">Visa, Mastercard, AMEX</p>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${paymentMethod === 'cod' ? 'border-orange-400' : 'border-gray-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-orange-100 rounded p-1.5">
                        <span className="text-lg">💵</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Cash on Delivery</p>
                        <p className="text-xs text-gray-500">Pay when you receive your order</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Card fields */}
                {paymentMethod === 'credit_card' && (
                  <div className="border-t pt-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" value={cardData.cardNumber}
                        onChange={e => setCardData(p => ({ ...p, cardNumber: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2874f0] text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input type="text" placeholder="Full Name" value={cardData.cardName}
                        onChange={e => setCardData(p => ({ ...p, cardName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2874f0] text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                        <input type="text" placeholder="MM/YY" value={cardData.expiry}
                          onChange={e => setCardData(p => ({ ...p, expiry: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2874f0] text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input type="password" placeholder="•••" value={cardData.cvv}
                          onChange={e => setCardData(p => ({ ...p, cvv: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2874f0] text-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {/* eSewa/Khalti info banners */}
                {paymentMethod === 'esewa' && (
                  <div className="mt-2 border border-green-200 bg-green-50 rounded-lg p-3 flex items-start gap-2 text-sm text-green-800">
                    <ShieldCheckIcon className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#60bb46]" />
                    <span>You'll be redirected to eSewa to complete payment securely. Demo MPIN: <strong>1234</strong></span>
                  </div>
                )}
                {paymentMethod === 'khalti' && (
                  <div className="mt-2 border border-purple-200 bg-purple-50 rounded-lg p-3 flex items-start gap-2 text-sm text-purple-800">
                    <ShieldCheckIcon className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#5c2d91]" />
                    <span>You'll be redirected to Khalti to complete payment securely. Demo MPIN: <strong>1234</strong></span>
                  </div>
                )}

                <div className="mt-5 flex items-center text-xs text-gray-500 mb-5">
                  <LockClosedIcon className="h-4 w-4 mr-1.5" />
                  Your payment information is encrypted and secure
                </div>

                <div className="flex justify-between items-center">
                  <button onClick={() => setCurrentStep('shipping')} className="text-sm text-gray-500 hover:text-gray-700">← Back to Shipping</button>
                  <button onClick={handlePaymentSubmit} className="bg-[#2874f0] hover:bg-[#1a65de] text-white px-8 py-2.5 rounded font-bold text-sm">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* ── Review Step ── */}
            {currentStep === 'review' && (
              <div className="space-y-4">
                <div className="bg-white rounded shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-5">Order Review</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Shipping Address</h3>
                      <div className="text-sm text-gray-800 space-y-0.5">
                        <p className="font-semibold">{shippingData.firstName} {shippingData.lastName}</p>
                        <p>{shippingData.street}</p>
                        <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                        <p>{shippingData.country}</p>
                        <p className="text-gray-500">{shippingData.phone}</p>
                        <p className="text-gray-500">{shippingData.email}</p>
                      </div>
                      <button onClick={() => setCurrentStep('shipping')} className="text-[#2874f0] text-xs mt-2 hover:underline">Edit</button>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Payment Method</h3>
                      <div className="flex items-center gap-2">
                        {paymentMethod === 'esewa' && <div className="bg-[#60bb46] rounded px-2 py-0.5"><span className="text-white font-bold text-xs">eSewa</span></div>}
                        {paymentMethod === 'khalti' && <div className="bg-[#5c2d91] rounded px-2 py-0.5 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f1592a]"/><span className="text-white font-bold text-xs">Khalti</span></div>}
                        {paymentMethod === 'credit_card' && <CreditCardIcon className="h-5 w-5 text-[#2874f0]" />}
                        {paymentMethod === 'cod' && <span className="text-base">💵</span>}
                        <p className="text-sm font-semibold text-gray-800">{paymentMethodLabel()}</p>
                      </div>
                      <button onClick={() => setCurrentStep('payment')} className="text-[#2874f0] text-xs mt-2 hover:underline">Edit</button>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Order Items</h3>
                  <div className="divide-y divide-gray-100">
                    {selectedItems.map(item => (
                      <div key={item.product.id} className="flex items-center py-3 gap-3">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-contain border border-gray-100 rounded p-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm flex-shrink-0">Rs.{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button onClick={() => setCurrentStep('payment')} className="text-sm text-gray-500 hover:text-gray-700">← Back to Payment</button>
                  <button
                    onClick={handlePlaceOrder}
                    className={`px-8 py-3 rounded font-bold text-sm flex items-center gap-2 transition-colors ${
                      paymentMethod === 'esewa' ? 'bg-[#60bb46] hover:bg-[#4ea836] text-white'
                      : paymentMethod === 'khalti' ? 'bg-[#5c2d91] hover:bg-[#4a2275] text-white'
                      : 'bg-[#fb641b] hover:bg-[#e85d18] text-white'
                    }`}
                  >
                    <LockClosedIcon className="h-4 w-4" />
                    {paymentMethod === 'esewa' ? 'Pay with eSewa'
                      : paymentMethod === 'khalti' ? 'Pay with Khalti'
                      : `Place Order — Rs.${total.toLocaleString()}`}
                    {(paymentMethod === 'esewa' || paymentMethod === 'khalti') && (
                      <span className="font-normal text-xs opacity-90">— Rs.{total.toLocaleString()}</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded shadow-sm p-5 sticky top-20">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Price Details</h2>
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {selectedItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">{item.product.name} ×{item.quantity}</span>
                    <span className="font-medium flex-shrink-0">Rs.{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span>Rs.{shipping}</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between font-bold text-base text-gray-900">
                  <span>Total</span>
                  <span>Rs.{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-gray-400 gap-1">
                <ShieldCheckIcon className="h-4 w-4" />
                Secure checkout · SSL encrypted
              </div>
              {/* Accepted payments */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Accepted payments</p>
                <div className="flex items-center gap-2">
                  <div className="bg-[#60bb46] rounded px-2 py-0.5"><span className="text-white font-bold text-xs">eSewa</span></div>
                  <div className="bg-[#5c2d91] rounded px-2 py-0.5 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f1592a]"/><span className="text-white font-bold text-xs">Khalti</span></div>
                  <div className="border border-gray-200 rounded px-2 py-0.5"><span className="text-gray-600 text-xs font-medium">CARD</span></div>
                  <span className="text-sm">💵</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
