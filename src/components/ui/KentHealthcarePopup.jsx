import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Shield, Star } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useConfig } from '@/contexts/ConfigContext';

const KentHealthcarePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', problem: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  
  const { toast } = useToast();
  const { emailjsConfig } = useConfig();
  const popupRef = useRef(null);
  const timerRef = useRef(null);

  // Constants for engagement triggers
  const DELAY_TIME = 15000; // 15 seconds
  const SCROLL_TRIGGER = 0.3; // 30% scroll depth
  const EXIT_INTENT_THRESHOLD = 10; // Mouse near top of screen

  // Session storage keys
  const STORAGE_KEYS = {
    SHOWN_INITIAL: 'khPopupShownInitial',
    DISMISSED: 'khPopupDismissed',
    EXIT_SHOWN: 'khPopupExitShown',
    SESSION_START: 'khPopupSessionStart'
  };

  // Initialize popup state from session storage
  useEffect(() => {
    const sessionStart = sessionStorage.getItem(STORAGE_KEYS.SESSION_START);
    if (!sessionStart) {
      sessionStorage.setItem(STORAGE_KEYS.SESSION_START, Date.now().toString());
    }

    const shownInitial = sessionStorage.getItem(STORAGE_KEYS.SHOWN_INITIAL) === 'true';
    const dismissed = sessionStorage.getItem(STORAGE_KEYS.DISMISSED) === 'true';
    const exitShown = sessionStorage.getItem(STORAGE_KEYS.EXIT_SHOWN) === 'true';

    setHasShownInitial(shownInitial);
    setIsDismissed(dismissed);
    setHasShownExit(exitShown);
  }, []);

  // Time tracking
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollDepth = scrollTop / scrollHeight;
      setScrollDepth(currentScrollDepth);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Engagement trigger logic
  useEffect(() => {
    const shouldShowInitial = 
      !hasShownInitial && 
      !isDismissed && 
      (timeOnPage >= DELAY_TIME / 1000 || scrollDepth >= SCROLL_TRIGGER);

    if (shouldShowInitial) {
      showPopup();
      setHasShownInitial(true);
      sessionStorage.setItem(STORAGE_KEYS.SHOWN_INITIAL, 'true');
    }
  }, [timeOnPage, scrollDepth, hasShownInitial, isDismissed]);

  // Exit intent detection (desktop)
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= EXIT_INTENT_THRESHOLD && isDismissed && !hasShownExit) {
        showPopup();
        setHasShownExit(true);
        sessionStorage.setItem(STORAGE_KEYS.EXIT_SHOWN, 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isDismissed, hasShownExit]);

  // Mobile back-button exit intent with History API
  useEffect(() => {
    let isInitialized = false;

    const initializeHistoryAPI = () => {
      if (!isInitialized) {
        // Push initial dummy state to intercept first back-button press
        window.history.pushState({ popupIntercepted: true }, '', window.location.href);
        isInitialized = true;
      }
    };

    const handlePopState = (event) => {
      // Check if user dismissed popup AND exit-intent not shown yet
      if (isDismissed && !hasShownExit) {
        // Show exit-intent popup
        showPopup();
        setHasShownExit(true);
        sessionStorage.setItem(STORAGE_KEYS.EXIT_SHOWN, 'true');
        
        // Push new state to allow normal exit on next back-button press
        window.history.pushState({ popupIntercepted: true }, '', window.location.href);
      }
      // If conditions not met, allow normal navigation (don't push state)
    };

    // Initialize History API on mount
    initializeHistoryAPI();
    
    // Add event listener
    window.addEventListener('popstate', handlePopState);
    
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDismissed, hasShownExit]);

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      // Clean up any history manipulation when component unmounts
      // This ensures no interference with navigation after component is gone
      if (window.history.state && window.history.state.popupIntercepted) {
        // Remove our dummy state if it exists
        window.history.back();
      }
    };
  }, []);

  const showPopup = () => {
    setIsVisible(true);
  };

  const hidePopup = () => {
    setIsVisible(false);
    
    // Only mark as dismissed if it's the initial popup
    // Exit-intent popup dismissal should allow normal navigation
    if (!hasShownExit) {
      setIsDismissed(true);
      sessionStorage.setItem(STORAGE_KEYS.DISMISSED, 'true');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: 'خطأ في البيانات',
        description: 'الاسم ورقم الهاتف مطلوبان',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Capture tracking data
      const gclid = localStorage.getItem('gclid') || new URLSearchParams(window.location.search).get('gclid');
      const utmParams = {
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        utm_term: new URLSearchParams(window.location.search).get('utm_term'),
        utm_content: new URLSearchParams(window.location.search).get('utm_content')
      };

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          phone: formData.phone,
          email: 'N/A - Popup Form',
          subject: 'Lead from Popup Form',
          message: `FORM METHOD: Kent Healthcare Popup

LEAD DETAILS:
Name: ${formData.name}
Phone: ${formData.phone}
Problem: ${formData.problem || 'N/A'}

TRACKING DATA:
GCLID: ${gclid || 'N/A'}
UTM Source: ${utmParams.utm_source || 'N/A'}
UTM Campaign: ${utmParams.utm_campaign || 'N/A'}
Page URL: ${window.location.href}
Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })}`,
          gclid: gclid || 'N/A',
          utm_source: utmParams.utm_source || 'N/A',
          utm_campaign: utmParams.utm_campaign || 'N/A'
        },
        emailjsConfig.publicKey
      );

      // Analytics tracking
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          'event': 'popup_form_submission',
          'form_type': 'kent_healthcare_popup',
          'lead_name': formData.name,
          'lead_phone': formData.phone,
          'lead_problem': formData.problem || 'N/A',
          'gclid': gclid || localStorage.getItem('gclid'),
          'utm_source': utmParams.utm_source,
          'utm_campaign': utmParams.utm_campaign,
          'conversion_value': 0,
          'timestamp': new Date().toISOString()
        });
      }

      // Google Ads conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          'send_to': 'AW-16614033926/29hRCIHVqasbEIaUmPI9',
          'value': 0,
          'currency': 'AED',
          'transaction_id': new Date().toISOString(),
          'gclid': gclid || localStorage.getItem('gclid')
        });
      }

      // Meta Pixel
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          event: 'fb_lead',
          content_name: 'Popup Form Submission',
          content_category: 'Healthcare',
          value: 0,
          currency: 'AED',
          gclid: gclid || localStorage.getItem('gclid')
        });
      }

      toast({
        title: 'تم إرسال طلبك بنجاح!',
        description: 'سنتواصل معك قريباً لتأكيد موعدك',
        variant: 'default'
      });

      // Hide popup and prevent all future popups after successful submission
      setIsVisible(false);
      setIsDismissed(true);
      setHasShownExit(true);
      sessionStorage.setItem(STORAGE_KEYS.DISMISSED, 'true');
      sessionStorage.setItem(STORAGE_KEYS.EXIT_SHOWN, 'true');
      
      // Redirect after success
      setTimeout(() => {
        window.location.href = emailjsConfig.redirectUrl;
      }, 1500);

    } catch (error) {
      console.error('Popup form submission error:', error);
      toast({
        title: 'خطأ في الإرسال',
        description: 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              hidePopup();
            }
          }}
        >
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={hidePopup}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-teal-600">
                  العرض ينتهي خلال: 72 ساعة
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                احصل على جلسة علاج طبيعي مجانية
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                تقييم شامل وخطة علاج مخصصة – بدون أي التزامات
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">موثق من مرضانا</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="اسمك الكامل"
                    required
                    disabled={isSubmitting}
                    className="w-full"
                    dir="rtl"
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="رقم هاتفك"
                    required
                    disabled={isSubmitting}
                    className="w-full"
                    dir="ltr"
                    style={{ direction: 'ltr', textAlign: 'left' }}
                  />
                </div>

                <div>
                  <Textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    placeholder="اختياري – أخبرنا بالمشكلة الصحية إذا أردت"
                    rows={3}
                    disabled={isSubmitting}
                    className="w-full resize-none"
                    dir="rtl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'احجز جلستك المجانية'}
                </Button>

                {/* Privacy Note */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3 h-3" />
                  <span>نحترم خصوصيتك؛ معلوماتك سرية</span>
                </div>

                {/* Quick completion note */}
                <p className="text-xs text-center text-gray-500">
                  لن يأخذ منك سوى 30 ثانية
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KentHealthcarePopup;
