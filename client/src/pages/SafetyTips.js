import React from 'react';
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaMobileAlt } from 'react-icons/fa';

const SafetyTips = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaShieldAlt /> Safety Tips</h1>
        <p>Stay safe while buying and selling on 2street</p>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaCheckCircle style={{ color: '#2e7d32' }} />
          Best Practices
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>1. Meet in Public Places</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Always meet in a public, well-lit area on campus. Common meeting spots include 
            coffee shops, libraries, or campus cafeterias during daytime hours.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>2. Inspect Items Before Buying</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Take your time to thoroughly inspect the item before making a purchase. Test 
            electronics, check for damages, and ensure all components are included as described.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>3. Verify Seller Information</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Only use official USM email addresses (@student.usm.my). Check the seller's profile 
            and other listings to verify legitimacy.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>4. Use Secure Payment Methods</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            For high-value items, consider using secure payment methods. Always count money in 
            person and use cash for low-value transactions.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>5. Trust Your Instincts</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            If something feels off or too good to be true, it probably is. Don't hesitate to 
            walk away from a deal if you feel uncomfortable.
          </p>
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #fbc02d' }}>
        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaExclamationTriangle style={{ color: '#fbc02d' }} />
          Warning Signs
        </h2>
        
        <ul style={{ color: '#666', lineHeight: '2', paddingLeft: '20px' }}>
          <li>Sellers pressuring you to meet in isolated locations</li>
          <li>Requests for advance payment before seeing the item</li>
          <li>Price too good to be true without explanation</li>
          <li>Reluctance to show or test the item in person</li>
          <li>Unusual payment requests (e.g., gift cards, cryptocurrency)</li>
          <li>Seller avoiding video calls or providing vague contact information</li>
        </ul>
      </div>

      <div className="card" style={{ background: '#e8f5e9', borderLeft: '4px solid #2e7d32' }}>
        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaMobileAlt style={{ color: '#2e7d32' }} />
          Reporting Issues
        </h2>
        
        <p style={{ marginBottom: '10px', color: '#666', lineHeight: '1.6' }}>
          If you encounter a suspicious listing or have a safety concern:
        </p>
        
        <ul style={{ color: '#666', lineHeight: '2', paddingLeft: '20px', marginBottom: '20px' }}>
          <li>Use the "Report" button on the listing</li>
          <li>Provide detailed information about the issue</li>
          <li>Contact campus security if you feel threatened</li>
          <li>Save all communications with the other party</li>
        </ul>

        <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>
          Remember: Your safety is our top priority. When in doubt, report it!
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <p style={{ marginBottom: '10px' }}>
          <strong>Emergency Contact:</strong> Campus Security
        </p>
        <p style={{ color: '#666' }}>
          If you encounter an emergency during a transaction, call campus security immediately.
        </p>
      </div>
    </div>
  );
};

export default SafetyTips;

