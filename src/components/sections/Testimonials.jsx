import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, UserCircle, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'أ.م - مريض آلام الظهر',
    quote:
      'بعد 6 أشهر من الألم المستمر، استعدت حركتي الطبيعية خلال 3 أسابيع فقط. الفريق متخصص جداً والنتائج مذهلة.',
  },
  {
    name: 'ف.ع - مريضة إعادة تأهيل',
    quote:
      'بعد الجلطة الدماغية، لم أتوقع أن أعود للمشي مرة أخرى. شكراً لفريق كنت الذي أعاد لي الأمل والاستقلالية.',
  },
  {
    name: 'م.ع - والد طفل',
    quote:
      'طفلي البالغ من العمر 5 سنوات تحسن بشكل كبير في التوازن والحركة. المعالجون صبورون ومتفهمون لاحتياجات الأطفال.',
  },
  {
    name: 'س.أ - مريضة آلام المفاصل',
    quote:
      'آلام الركبة التي عانيت منها لسنوات اختفت تماماً. الجلسة المجانية كانت مفيدة جداً لمعرفة خطة العلاج المناسبة.',
  },
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

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle dir="rtl">ماذا يقول مرضانا</SectionTitle>
        {/* Limit the max width so two columns look balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-full"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-reverse space-x-4 p-4">
                    <UserCircle className="w-12 h-12 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                      <Quote className="w-8 h-8 text-accent/50 mb-2" />
                      <p className="text-foreground italic mb-4 leading-relaxed" dir="rtl">
                        "{t.quote}"
                      </p>
                      <p className="font-semibold text-primary" dir="rtl">– {t.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Credentials and Accreditation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-primary mb-8" dir="rtl">شهاداتنا واعتمادنا</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-blue-800 mb-2" dir="rtl">معالجون مرخصون وذوو خبرة</h4>
              <p className="text-sm text-blue-700" dir="rtl">معالجونا الطبيعيون مرخصون مهنياً ولديهم سنوات من الخبرة السريرية في إعادة التأهيل وإدارة الألم واستعادة الحركة</p>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-bold text-green-800 mb-2" dir="rtl">مرافق حديثة ورعاية شخصية</h4>
              <p className="text-sm text-green-700" dir="rtl">نستخدم أحدث المعدات ونضع خطط علاج مخصصة لكل مريض، مما يضمن علاجاً آمناً وفعالاً</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
