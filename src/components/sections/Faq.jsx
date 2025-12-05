import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'هل الجلسة مجانية فعلاً؟',
    answer:
      'نعم، الجلسة الأولى مجانية تماماً وتشمل تقييم صحي شامل، خطة علاج شخصية، ونصائح عملية يمكنك تطبيقها فوراً في المنزل.',
  },
  {
    question: 'ماذا يحدث بعد الحجز؟',
    answer:
      'بعد حجز الجلسة المجانية، سنتواصل معك خلال 24 ساعة لتأكيد الموعد وإرسال تفاصيل الموقع. في الجلسة، سيقوم المعالج بتقييم حالتك وتطوير خطة علاج مخصصة.',
  },
  {
    question: 'كم تستغرق الجلسة وهل هي مؤلمة؟',
    answer:
      'الجلسة المجانية تستغرق 45-60 دقيقة وهي مصممة لتكون مريحة وآمنة تماماً. نركز على التقدم التدريجي دون إزعاج غير ضروري.',
  },
  {
    question: 'هل أحتاج إلى إحالة من طبيب؟',
    answer:
      'لا حاجة لإحالة طبية للجلسة المجانية. يمكنك حجز موعد مباشرة معنا. بعض شركات التأمين قد تتطلب إحالة للجلسات المدفوعة.',
  },
  {
    question: 'ما هي الحالات التي تعالجونها؟',
    answer:
      'نتخصص في آلام الظهر والرقبة، آلام المفاصل، إعادة التأهيل بعد الجراحة، السكتة الدماغية، مرض باركنسون، وإصابات الرياضة. نقدم أيضاً علاجات للأطفال وكبار السن.',
  },
  {
    question: 'هل يمكنني الحصول على العلاج في المنزل؟',
    answer:
      'نعم، نقدم جلسات منزلية مريحة في جميع أنحاء دبي. هذا مفيد بشكل خاص للمرضى الذين يواجهون صعوبة في التنقل أو يفضلون التعافي في بيئتهم المنزلية.',
  },
  {
    question: 'هل المعالجون معتمدون ومؤهلون؟',
    answer:
      'جميع معالجينا حاصلون على شهادات دولية معتمدة ولديهم سنوات من الخبرة. نحن معتمدون من الهيئات الصحية الرسمية ومؤمنون طبياً.',
  },
  {
    question: 'كم تكلفة الجلسات بعد المجانية؟',
    answer:
      'تختلف التكلفة حسب نوع العلاج وعدد الجلسات المطلوبة. نقدم خطط علاج مرنة وأسعار تنافسية. يمكنك مناقشة التكلفة خلال الجلسة المجانية.',
  },
  {
    question: 'هل تقبلون التأمين الصحي؟',
    answer:
      'نعم، نتعامل مع معظم شركات التأمين الصحي الرائدة في الإمارات. يمكننا مساعدتك في التحقق من التغطية التأمينية قبل بدء العلاج.',
  },
  {
    question: 'أين تقع العيادة؟',
    answer:
      'عيادتنا تقع في كنت للرعاية الصحية، مبنى نشوان – 208C شارع المنخول – فوق بنك الإمارات دبي الوطني – الرفاع – دبي. يمكنك الوصول إلينا بسهولة بالسيارة أو المترو.',
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

const FaqSection = () => (
  <section id="faq" className="py-16 md:py-24 bg-secondary/30" dir="rtl">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle dir="rtl">الأسئلة الشائعة</SectionTitle>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-xl border border-primary/10"
      >
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border-b border-border last:border-b-0 rounded-md overflow-hidden transition-all hover:shadow-md bg-background/50 hover:bg-background"
            >
              <AccordionTrigger className="text-md sm:text-lg font-medium text-start px-6 py-4 flex justify-between items-center w-full hover:text-accent" dir="rtl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed px-6 pb-4 pt-2 text-sm sm:text-base" dir="rtl">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
