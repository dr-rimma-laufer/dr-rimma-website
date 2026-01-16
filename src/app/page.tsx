import Link from 'next/link';

// Services data
const services = [
  {
    title: 'השתלת שיער',
    description: 'השתלת שיער בשיטת FUE המתקדמת ביותר לתוצאות טבעיות ומרשימות',
    href: '/hair-transplant',
  },
  {
    title: 'טיפולי שיער',
    description: 'מגוון טיפולים לחיזוק ושיקום השיער: PRP, מזותרפיה, לייזר ותרופות',
    href: '/hair-treatments',
  },
  {
    title: 'דרמטולוגיה',
    description: 'אבחון וטיפול במחלות עור שונות על ידי מומחית בתחום',
    href: '/dermatology',
  },
  {
    title: 'אסתטיקה',
    description: 'טיפולים אסתטיים מתקדמים לשיפור מראה העור והפנים',
    href: '/aesthetics',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section relative bg-dark-blue text-white flex items-center">
        <div className="container-custom py-16 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              ד״ר רימה לאופר
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              מומחית לרפואת עור והשתלות שיער
            </p>
            <p className="text-lg text-gray-400 mb-8">
              מרפאה מתקדמת בתל אביב המציעה מגוון טיפולים
              מקצועיים בתחום הדרמטולוגיה והשתלות שיער
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-gold">
                קביעת תור
              </Link>
              <Link href="/about" className="btn-outline border-white text-white hover:bg-white hover:text-dark-blue">
                קראו עוד
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            השירותים שלנו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gold transition-all"
              >
                <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              אודות ד״ר רימה לאופר
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              ד״ר רימה לאופר היא מומחית בכירה לרפואת עור והשתלות שיער עם ניסיון
              של שנים רבות בתחום. המרפאה מציעה טיפולים מתקדמים ומקצועיים תוך
              שימוש בטכנולוגיות החדשניות ביותר.
            </p>
            <Link href="/about" className="btn-gold">
              קראו עוד
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gold text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            מוכנים להתחיל?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            צרו קשר עוד היום לקביעת פגישת ייעוץ
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-gold px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            קביעת תור
          </Link>
        </div>
      </section>
    </>
  );
}
