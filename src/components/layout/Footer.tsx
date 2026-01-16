import Link from 'next/link';

const footerLinks = {
  services: [
    { name: 'השתלת שיער', href: '/hair-transplant' },
    { name: 'טיפולי שיער', href: '/hair-treatments' },
    { name: 'דרמטולוגיה', href: '/dermatology' },
    { name: 'אסתטיקה', href: '/aesthetics' },
  ],
  info: [
    { name: 'אודות', href: '/about' },
    { name: 'גלריה', href: '/gallery' },
    { name: 'בלוג', href: '/blog' },
    { name: 'שאלות נפוצות', href: '/faq' },
  ],
  contact: [
    { name: 'צור קשר', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark-blue text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">ד״ר רימה לאופר</h3>
            <p className="text-gray-300 text-sm">
              מומחית לרפואת עור והשתלות שיער.
              מרפאה מתקדמת בתל אביב.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">שירותים</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-4">מידע</h4>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">צור קשר</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>טלפון: 03-1234567</li>
              <li>אימייל: info@dr-rimma.com</li>
              <li>תל אביב, ישראל</li>
            </ul>
            <Link
              href="/contact"
              className="inline-block mt-4 btn-gold"
            >
              קביעת תור
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ד״ר רימה לאופר. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
