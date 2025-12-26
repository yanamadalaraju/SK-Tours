import React, { useState, useEffect } from 'react';
import Header from '@/components/Header'; 

const Alert = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    // Set launch date to exactly 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    launchDate.setHours(0, 0, 0, 0); // Set to midnight for exact 30 days

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000);
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        
        setTimeLeft({
          days: days,
          hours: hours,
          minutes: minutes
        });
      } else {
        // Timer finished
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every minute (60,000 milliseconds)
    const timer = setInterval(calculateTimeLeft, 60000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format numbers with leading zeros for display
  const formatTime = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div style={styles.container}>
          <div style={styles.card}>
            {/* Simple Header */}
            <div style={styles.header}>
              <div style={styles.iconCircle}>
                <span style={styles.iconText}>✨</span>
              </div>
            </div>

            {/* Main Content */}
            <div style={styles.content}>
              <h1 style={styles.title}>Launching Soon</h1>
              <p style={styles.subtitle}>Something Exceptional is Coming</p>
              
              <div style={styles.messageBox}>
                <p style={styles.message}>
                  <strong>Exciting Update:</strong><br />
                  We're thrilled to announce that this section is currently in its final stages of development. 
                  Our team is putting the finishing touches to deliver a premium experience that exceeds expectations.
                </p>
              </div>

              {/* Countdown Section */}
              <div style={styles.countdownSection}>
                <div style={styles.countdownTitle}>Launch Timeline</div>
                <div style={styles.countdownContainer}>
                  <div style={styles.countdownItem}>
                    <div style={styles.countdownNumber}>{formatTime(timeLeft.days)}</div>
                    <div style={styles.countdownLabel}>Days</div>
                  </div>
                  <div style={styles.countdownSeparator}>:</div>
                  <div style={styles.countdownItem}>
                    <div style={styles.countdownNumber}>{formatTime(timeLeft.hours)}</div>
                    <div style={styles.countdownLabel}>Hours</div>
                  </div>
                  <div style={styles.countdownSeparator}>:</div>
                  <div style={styles.countdownItem}>
                    <div style={styles.countdownNumber}>{formatTime(timeLeft.minutes)}</div>
                    <div style={styles.countdownLabel}>Minutes</div>
                  </div>
                </div>
                <p style={styles.countdownNote}>
                  Estimated launch: {timeLeft.days > 0 
                    ? `${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''}, ${timeLeft.hours} hour${timeLeft.hours !== 1 ? 's' : ''}`
                    : 'Today!'}
                </p>
              </div>

              {/* Progress Status */}
              <div style={styles.statsContainer}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>Final Phase</div>
                  <div style={styles.statLabel}>Development</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>Premium</div>
                  <div style={styles.statLabel}>Quality</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>
                    {timeLeft.days > 0 ? `${timeLeft.days}d ${timeLeft.hours}h` : 'Launching!'}
                  </div>
                  <div style={styles.statLabel}>ETA</div>
                </div>
              </div>

              {/* Key Features Preview */}
              <div style={styles.featuresSection}>
                <h3 style={styles.featuresTitle}>What to Expect:</h3>
                <ul style={styles.featuresList}>
                  {['Premium curated tour experiences', 'Seamless booking process', 'Exclusive travel packages', '24/7 customer support'].map((feature, index) => (
                    <li key={index} style={styles.featureItem}>
                      <span style={styles.checkmark}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simple Footer */}
              <div style={styles.footer}>
                <div style={styles.signature}>
                  <span>Crafting exceptional travel experiences for you</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Simple inline styles
const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  },
  card: {
    maxWidth: '700px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  iconCircle: {
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #f0f4ff',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
  },
  iconText: {
    fontSize: '48px',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6b7280',
    margin: '0 0 30px 0',
    fontWeight: '500',
  },
  messageBox: {
    background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf2ff 100%)',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '30px',
    border: '1px solid #e0e7ff',
  },
  message: {
    color: '#374151',
    lineHeight: '1.7',
    margin: '0',
    fontSize: '16px',
  },
  countdownSection: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '30px',
    border: '1px solid #e2e8f0',
  },
  countdownTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '20px',
  },
  countdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  countdownItem: {
    textAlign: 'center',
    minWidth: '80px',
  },
  countdownNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: '5px',
    fontFamily: 'monospace',
  },
  countdownLabel: {
    fontSize: '14px',
    color: '#64748b',
  },
  countdownSeparator: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#94a3b8',
    marginBottom: '15px',
  },
  countdownNote: {
    fontSize: '14px',
    color: '#64748b',
    fontStyle: 'italic',
    margin: '0',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px',
  },
  statItem: {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
  statValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '6px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  featuresSection: {
    backgroundColor: '#fefce8',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '30px',
    border: '1px solid #fde68a',
    textAlign: 'left',
  },
  featuresTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#92400e',
    marginBottom: '15px',
  },
  featuresList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  featureItem: {
    padding: '8px 0',
    color: '#854d0e',
    fontSize: '15px',
    position: 'relative',
    paddingLeft: '24px',
    display: 'flex',
    alignItems: 'center',
  },
  checkmark: {
    position: 'absolute',
    left: '0',
    color: '#65a30d',
    fontWeight: 'bold',
    marginRight: '8px',
  },
  footer: {
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0',
  },
  signature: {
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
  },
} as const;

export default Alert;