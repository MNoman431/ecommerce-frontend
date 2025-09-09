import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../../redux/admin/ApiInstance';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<string>('loading');
  const [retries, setRetries] = useState<number>(0);
  const navigate = useNavigate();

  const check = async () => {
    if (!sessionId) {
      setStatus('error');
      setTimeout(() => navigate('/payment/failed'), 2000);
      return;
    }

    try {
      const response = await axiosInstance.get(`/payment/verify-session?session_id=${sessionId}`);
      const paymentStatus = response.data.status;

      if (paymentStatus === 'paid') {
        setStatus('success');
        setTimeout(() => navigate('/thank-you'), 2000);
      } else if (paymentStatus === 'unpaid' && retries < 3) {
        setRetries(prev => prev + 1);
        setTimeout(check, 2000);
      } else {
        setStatus('error');
        setTimeout(() => navigate('/payment/failed'), 2000);
      }
    } catch (error) {
      console.error('Error verifying payment session:', error);
      setStatus('error');
      setTimeout(() => navigate('/payment/failed'), 2000);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      {status === 'loading' && (
        <>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Verifying your payment...</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we confirm your payment status.</p>
        </>
      )}
      {status === 'success' && (
        <>
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400">Your order has been placed successfully.</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Redirecting to order confirmation...</p>
        </>
      )}
      {status === 'error' && (
        <>
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Payment Verification Failed</h2>
          <p className="text-gray-600 dark:text-gray-400">We couldn't verify your payment status.</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Redirecting to payment failed page...</p>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
