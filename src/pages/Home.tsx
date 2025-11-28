import React, { useState } from "react";
import "./Home.css";

/**
 * Home.tsx
 * - Option A: matches the SK Tours style from screenshots
 * - Uses local images (paths included below)
 *
 * Place the images at the exact paths used here or update src paths.
 */

type PackageItem = {
  id: number;
  title: string;
  image: string;
  price?: string;
  days?: string;
  short?: string;
};

const SAMPLE_PACKAGES: PackageItem[] = [
  {
    id: 1,
    title: "Oceania Cruises",
    image: "/mnt/data/Screenshot 2025-11-20 095926.png",
    price: "₹ 25,000",
    days: "07 Days",
    short: "Luxury cruise package with meals & excursions",
  },
  {
    id: 2,
    title: "Royal Caribbean",
    image: "/mnt/data/Screenshot 2025-11-20 095910.png",
    price: "₹ 30,000",
    days: "10 Days",
    short: "Family-friendly cruise with entertainment",
  },
  {
    id: 3,
    title: "Star Cruises",
    image: "/mnt/data/Screenshot 2025-11-20 095823.png",
    price: "₹ 20,000",
    days: "05 Days",
    short: "Short getaway cruise package",
  },
  {
    id: 4,
    title: "Goa Getaway",
    image: "/mnt/data/Screenshot 2025-11-20 095754.png",
    price: "₹ 10,000",
    days: "03 Days",
    short: "Sun, sand & sea beach package",
  },
  {
    id: 5,
    title: "MICE Conference",
    image: "/mnt/data/Screenshot 2025-11-20 095713.png",
    price: "Contact for Price",
    days: "Custom",
    short: "Corporate MICE events & venue management",
  },
];

export default function Home(): JSX.Element {
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(
    null
  );
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [leftMenuOpen, setLeftMenuOpen] = useState(true);

  function openBooking(pkgItem: PackageItem) {
    setSelectedPackage(pkgItem);
    setShowBookingForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeBooking() {
    setShowBookingForm(false);
    setSelectedPackage(null);
  }

  return (
    <div className="sk-root">
      {/* Top header */}
      <header className="sk-header">
        <div className="sk-header-inner">
          <div className="sk-logo">
            <img
              src="/mnt/data/Screenshot 2025-11-20 095926.png"
              alt="SK Tours Logo"
              className="sk-logo-img"
            />
          </div>

          <nav className="sk-nav">
            <ul>
              <li>Home</li>
              <li>Tours ▾</li>
              <li>MICE ▾</li>
              <li>Trade tours ▾</li>
              <li>Flights</li>
              <li>Hotel</li>
              <li>Visa</li>
              <li>Insurance</li>
              <li>Contact us</li>
            </ul>
          </nav>

          <div className="sk-login">Login ▾</div>
        </div>
      </header>

      {/* Page title bar */}
      <div className="sk-titlebar">
        <h1>SK Tours — Home</h1>
      </div>

      <main className="sk-container">
        {/* Left menu */}
        <aside className={`sk-left ${leftMenuOpen ? "open" : "closed"}`}>
          <div className="left-toggle" onClick={() => setLeftMenuOpen(!leftMenuOpen)}>
            {leftMenuOpen ? "◀" : "▶"}
          </div>

          {leftMenuOpen && (
            <>
              <div className="sk-left-box">
                <h3 className="sk-left-title">Cruise</h3>
                <ul className="sk-left-list">
                  <li>Avalon Waterways</li>
                  <li>Carnival Cruise Line</li>
                  <li>Celebrity Cruise Line</li>
                  <li>Celestyal Cruises</li>
                  <li>Costa Cruises</li>
                  <li>Crystal Cruise Liner</li>
                  <li>Disney Cruise Line</li>
                  <li>Dream Cruise</li>
                  <li>Holland America</li>
                  <li>Jalesh Cruise</li>
                  <li>MSC Cruises</li>
                  <li>Norwegian Cruise Line</li>
                  <li>Oceania Cruises</li>
                  <li className="active">Star Cruises</li>
                </ul>
              </div>

              <div className="sk-left-box">
                <h3 className="sk-left-title">Quick Links</h3>
                <ul className="sk-left-list">
                  <li>Home</li>
                  <li>About MICE</li>
                  <li>Sample Package</li>
                  <li>Enquiry Form</li>
                  <li>Our Clients</li>
                </ul>
              </div>
            </>
          )}
        </aside>

        {/* Main content */}
        <section className="sk-main">
          {/* Promo / large hero strip (keeps similar to screenshot) */}
          <div className="hero-strip">
            <div className="hero-content">
              <h2>Plan your next trip with SK Tours</h2>
              <p>
                We offer Tours, Cruises, Flights, Visa assistance, Hotels and MICE
                solutions — tailored packages for groups & families.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => alert("Enquiry clicked")}>
                  Enquiry Now
                </button>
                <button className="btn-secondary" onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>
                  View Packages
                </button>
              </div>
            </div>
          </div>

          {/* Quick boxes (Tours / Cruise / Visa / MICE) */}
          <div className="quick-grid">
            <div className="quick-card">
              <div className="quick-title">Tours</div>
              <div className="quick-body">Domestic & International packages</div>
            </div>
            <div className="quick-card">
              <div className="quick-title">Cruise</div>
              <div className="quick-body">Popular cruise lines and routes</div>
            </div>
            <div className="quick-card">
              <div className="quick-title">Visa</div>
              <div className="quick-body">Visa consultancy for many countries</div>
            </div>
            <div className="quick-card">
              <div className="quick-title">MICE</div>
              <div className="quick-body">Corporate events & conferences</div>
            </div>
          </div>

          {/* Packages grid */}
          <h3 className="section-title">Popular Packages</h3>
          <div className="packages-grid">
            {SAMPLE_PACKAGES.map((pkg) => (
              <article key={pkg.id} className="pkg-card">
                <div className="pkg-img-wrap">
                  <img src={pkg.image} alt={pkg.title} className="pkg-img" />
                </div>

                <div className="pkg-body">
                  <h4 className="pkg-title">{pkg.title}</h4>
                  <p className="pkg-short">{pkg.short}</p>
                </div>

                <div className="pkg-footer">
                  <div className="pkg-meta">
                    <span className="pkg-days">{pkg.days}</span>
                    <span className="pkg-price">{pkg.price}</span>
                  </div>

                  <div className="pkg-actions">
                    <button className="btn-red" onClick={() => alert(`Enquiry for ${pkg.title}`)}>
                      Enquiry
                    </button>
                    <button className="btn-red-outline" onClick={() => openBooking(pkg)}>
                      Book
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Testimonials / Why choose us */}
          <section className="why-section">
            <div className="why-left">
              <h3>Why choose SK Tours?</h3>
              <ul>
                <li>Trusted travel partner — 20+ years experience</li>
                <li>End-to-end packages (travel, stay, transfers)</li>
                <li>Competitive pricing & group discounts</li>
                <li>Dedicated MICE & corporate services</li>
              </ul>
            </div>

            <div className="why-right">
              <h3>Customer Testimonials</h3>
              <div className="testimonial">
                “Excellent planning and support — made our company event effortless.”
                <div className="t-author">— R. Sharma</div>
              </div>
            </div>
          </section>
        </section>
      </main>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <div className="cta-inner">
          <div>
            <h3>Ready to travel?</h3>
            <p>Tell us where you want to go — we'll handle the rest.</p>
          </div>
          <div>
            <button className="btn-primary" onClick={() => alert("Contact form")}>Contact Us</button>
          </div>
        </div>
      </div>

      {/* Booking form overlay (simple) */}
      {showBookingForm && selectedPackage && (
        <div className="booking-overlay" role="dialog" aria-modal="true">
          <div className="booking-panel">
            <div className="booking-header">
              <h3>Booking: {selectedPackage.title}</h3>
              <button className="close-btn" onClick={closeBooking}>✕</button>
            </div>

            <form
              className="booking-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Booking submitted (demo)");
                closeBooking();
              }}
            >
              <div className="form-row">
                <label>Name</label>
                <input placeholder="Full name" required />
                <label>Cell No</label>
                <input placeholder="Mobile number" required />
              </div>

              <div className="form-row">
                <label>Email</label>
                <input placeholder="Email address" required />
                <label>No of People</label>
                <input placeholder="e.g. 2" />
              </div>

              <div className="form-row">
                <label>Departure Date</label>
                <input type="date" />
                <label>Cabin / Room Type</label>
                <select defaultValue="">
                  <option value="">Select</option>
                  <option>Interior</option>
                  <option>Ocean View</option>
                  <option>Balcony</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">Book</button>
                <button type="button" className="btn-cancel" onClick={closeBooking}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
