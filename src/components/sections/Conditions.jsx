import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useConfig } from '@/contexts/ConfigContext';

const conditions = [
  'إعادة التأهيل بعد السكتة الدماغية وإعادة التعلم المعرفي',
  'مرض باركنسون - تنظيم الحركة والمزاج',
  'الاضطرابات العصبية (التصلب المتعدد، إصابات الدماغ)',
  'إصابات العظام مع التأثير السلوكي',
  'مشاكل الحركة المرتبطة بالخوف والقلق',
  'العلاج بعد الجراحة (استبدال المفاصل، الكسور)'
];

const SectionTitle = ({ children }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
  >
    {children}
  </motion.h2>
);

const ConditionsSection = () => {
  const { images } = useConfig();
  
  return (
    <section id="conditions" className="py-16 md:py-24 bg-secondary/30" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle dir="rtl">الحالات التي نعالجها</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {conditions.map((condition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-reverse space-x-3 p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <span className="text-lg text-foreground" dir="rtl">{condition}</span>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <img
            className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-lg shadow-lg"
            alt="مريض يخضع لجلسة علاج طبيعي"
            src={images.conditionsImage}
          />
          <p className="mt-4 text-muted-foreground text-sm" dir="rtl">
            توضيح لتقنيات العلاج الطبيعي في العمل.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConditionsSection;
