import { footerData } from "../../../data/footerData";

// Simple SVG icons for demo; replace with lucide-react or your icon set as needed
const icons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.631.771-1.631 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.46 6c-.79.35-1.64.59-2.53.69a4.48 4.48 0 001.97-2.48 9.03 9.03 0 01-2.83 1.08A4.48 4.48 0 0016.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .35.04.7.11 1.03C7.69 9.36 4.07 7.64 1.64 4.97c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65a4.48 4.48 0 01-2.03-.56v.06c0 2.12 1.51 3.89 3.52 4.29-.37.1-.76.16-1.16.16-.28 0-.55-.03-.82-.08.55 1.71 2.16 2.96 4.07 2.99A8.99 8.99 0 012 19.54 12.72 12.72 0 008.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0022.46 6z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.3h-3v-4.5c0-1.07-.93-2-2-2s-2 .93-2 2v4.5h-3v-9h3v1.3c.41-.61 1.47-1.3 2.5-1.3 1.93 0 3.5 1.57 3.5 3.5v5.5z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.415.59.22 1.012.484 1.456.929.444.445.709.866.929 1.456.175.457.359 1.257.415 2.427.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.415 2.427-.22.59-.484 1.012-.929 1.456-.445.444-.866.709-1.456.929-.457.175-1.257.359-2.427.415-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.415-.59-.22-1.012-.484-1.456-.929-.444-.445-.709-.866-.929-1.456-.175-.457-.359-1.257-.415-2.427-.058-1.266-.07-1.65-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.97.415-2.427.22-.59.484-1.012.929-1.456.445-.444.866-.709 1.456-.929.457-.175 1.257-.359 2.427-.415 1.266-.058 1.65-.07 4.85-.07zm0-2.2c-3.259 0-3.667.012-4.941.071-1.276.059-2.146.25-2.89.534-.782.299-1.445.7-2.108 1.363-.663.663-1.064 1.326-1.363 2.108-.284.744-.475 1.614-.534 2.89-.059 1.274-.071 1.682-.071 4.941s.012 3.667.071 4.941c.059 1.276.25 2.146.534 2.89.299.782.7 1.445 1.363 2.108.663.663 1.326 1.064 2.108 1.363.744.284 1.614.475 2.89.534 1.274.059 1.682.071 4.941.071s3.667-.012 4.941-.071c1.276-.059 2.146-.25 2.89-.534.782-.299 1.445-.7 2.108-1.363.663-.663 1.064-1.326 1.363-2.108.284-.744.475-1.614.534-2.89.059-1.274.071-1.682.071-4.941s-.012-3.667-.071-4.941c-.059-1.276-.25-2.146-.534-2.89-.299-.782-.7-1.445-1.363-2.108-.663-.663-1.326-1.064-2.108-1.363-.744-.284-1.614-.475-2.89-.534-1.274-.059-1.682-.071-4.941-.071zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.004 2.003c-5.523 0-10 4.477-10 10 0 1.771.464 3.467 1.345 4.97l-1.421 5.21 5.34-1.404c1.47.805 3.132 1.223 4.736 1.223 5.523 0 10-4.477 10-10s-4.477-10-10-10zm5.197 14.803c-.236.665-1.37 1.273-1.885 1.357-.479.078-1.093.111-1.755-.111-.404-.13-1.023-.334-1.768-.657-3.11-1.34-5.15-4.515-5.305-4.733-.153-.218-1.27-1.693-1.27-3.234 0-1.54.81-2.297 1.096-2.59.286-.292.62-.366.826-.366.206 0 .413.002.594.011.192.009.447-.072.7.531.253.603.857 2.087.934 2.237.077.15.128.329.026.547-.101.218-.152.352-.305.54-.153.188-.32.418-.456.561-.136.143-.278.299-.12.587.158.288.701 1.156 1.504 1.874.803.718 1.487.943 1.775 1.052.288.109.456.091.624-.054.168-.145.719-.837.911-1.124.192-.287.384-.239.65-.143.267.096 1.692.799 1.981.943.289.144.481.215.552.337.072.122.072.703-.164 1.368z" />
    </svg>
  ),
  flickr: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="6.5" cy="12" r="4.5" />
      <circle cx="17.5" cy="12" r="4.5" />
    </svg>
  ),
};

const Footer = () => {
  const {
    contactHeadline,
    contactDesc,
    getInTouchLabel,
    location,
    quickLinks,
    socialLinks,
    copyright,
    logo,
  } = footerData;

  return (
    <footer className="bg-[#172544] pt-20 pb-8 text-white font-mono">
      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-16">
        <div className="md:max-w-[50%]">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {contactHeadline}
          </h2>
        </div>
        <div className="flex flex-col md:items-end">
          <p className="text-gray-300 mb-6 max-w-md">{contactDesc}</p>
          <button className="bg-primary hover:bg-primary-hover text-gray-900 font-bold px-7 py-3 rounded transition-colors flex items-center gap-2 max-w-[220px]">
            {getInTouchLabel}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr className="border-gray-700 mb-12" />
      {/* Footer Main */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        {/* Logo */}
        <div className="mb-8 md:mb-0">
          <div className="bg-white text-gray-900 font-bold text-lg px-8 py-6 rounded shadow inline-block tracking-wider">
            {logo.text}
          </div>
        </div>
        {/* Location */}
        <div className="mb-8 md:mb-0">
          <div className="text-gray-400 text-xs mb-2">LOCATION</div>
          <div className="text-gray-200 text-sm">
            {location.address}
            <br />
            {location.city}
          </div>
        </div>
        {/* Quick Links */}
        <div className="mb-8 md:mb-0">
          <div className="text-gray-400 text-xs mb-2">QUICK LINKS</div>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((link, idx) =>
              link.highlight ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="bg-primary hover:bg-primary-hover text-gray-900 px-3 py-1 rounded font-bold transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-200 hover:text-primary px-2 py-1 transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
        {/* Social Links */}
        <div>
          <div className="text-gray-400 text-xs mb-2">FOLLOW ME</div>
          <div className="flex gap-2">
            {socialLinks.map((social) =>
              social.highlight ? (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-primary hover:bg-primary-hover text-gray-900 p-2 rounded transition-colors"
                  aria-label={social.label}
                >
                  {icons[social.icon]}
                </a>
              ) : (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-200 hover:text-primary p-2 rounded transition-colors"
                  aria-label={social.label}
                >
                  {icons[social.icon]}
                </a>
              )
            )}
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-12 text-center text-gray-400 text-xs">{copyright}</div>
    </footer>
  );
};

export default Footer;