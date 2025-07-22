import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      access_key: '369bfd14-4168-403c-96c1-c6c158a0cea0', 
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('✅ Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('❌ An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="contact-form" onSubmit={onSubmit}>
        <div className="row gx-3 gy-4">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                name="name"
                placeholder="Name *"
                className="form-control"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Your Email</label>
              <input
                name="email"
                placeholder="Email *"
                className="form-control"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                name="subject"
                placeholder="Subject *"
                className="form-control"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label className="form-label">Your message</label>
              <textarea
                name="message"
                placeholder="Your message *"
                rows={4}
                className="form-control"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="send">
              <button
                className={`px-btn w-100 ${loading ? 'disabled' : ''}`}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={4000} />
    </>
  );
}
