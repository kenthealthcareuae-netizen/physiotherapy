import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Activity, Home, Users, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Heart className="w-10 h-10 text-red-500" />,
    title: 'تخفيف الألم الفوري',
    description:
      'تقنيات متقدمة لتخفيف الألم المزمن والحاد مع نتائج فورية وطويلة المدى.',
  },
  {
    icon: <Activity className="w-10 h-10 text-green-500" />,
    title: 'خطط شخصية مخصصة',
    description:
      'برامج علاج مصممة خصيصاً لحالتك الصحية وأهدافك الشخصية لضمان أفضل النتائج.',
  },
  {
    icon: <Users className="w-10 h-10 text-blue-500" />,
    title: 'فريق خبراء معتمد',
    description:
      'معالجون طبيعيون معتمدون دولياً مع سنوات من الخبرة في أحدث تقنيات العلاج.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-purple-500" />,
    title: 'معدات حديثة متطورة',
    description:
      'أحدث الأجهزة والتقنيات الطبية لضمان علاج فعال وآمن في بيئة مريحة.',
  },
  {
    icon: <Home className="w-10 h-10 text-orange-500" />,
    title: 'مرونة في المواعيد',
    description:
      'جلسات في العيادة أو في المنزل مع مواعيد مرنة تناسب جدولك اليومي.',
  },
  {
    icon: <Brain className="w-10 h-10 text-indigo-500" />,
    title: 'متابعة مستمرة',
    description:
      'تقييمات دورية ومتابعة مستمرة لتتبع التقدم وضمان تحقيق أهدافك العلاجية.',
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

const ServicesSection = () => (
  <section id="services" className="py-16 md:py-24 bg-background" dir="rtl">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle dir="rtl">ماذا يميز خدماتنا؟</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm border border-primary/20">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-primary" dir="rtl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground" dir="rtl">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Free Session Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 p-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg text-center text-white shadow-2xl"
      >
        <Heart className="w-12 h-12 mx-auto mb-4 text-white" />
        <h3 className="text-2xl font-semibold mb-4" dir="rtl">ماذا تشمل الجلسة المجانية؟</h3>
        <div className="grid md:grid-cols-3 gap-6 text-right" dir="rtl">
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-bold mb-2">تقييم صحي شامل</h4>
            <p className="text-sm">فحص دقيق لحالتك الصحية وتحديد احتياجاتك العلاجية</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-bold mb-2">خطة علاج شخصية</h4>
            <p className="text-sm">برنامج علاج مخصص لأهدافك الصحية مع جدول زمني واضح</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-bold mb-2">نصائح عملية فورية</h4>
            <p className="text-sm">إرشادات وتدريبات يمكنك تطبيقها فوراً في المنزل</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 p-8 bg-gradient-to-r from-primary/80 to-accent/80 rounded-lg text-center text-white shadow-lg"
      >
        <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-white" />
        <h3 className="text-2xl font-semibold mb-2" dir="rtl">مستعدون لدعمك في كل خطوة</h3>
        <p className="text-lg" dir="rtl">
          استعد استقلالك وثقتك مع برامج العلاج الطبيعي المتخصصة - رعاية شاملة، خطط شخصية، ونتائج قابلة للقياس يقدمها خبراء دبي الرائدون.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
