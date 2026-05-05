import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

const XIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const socials = [
  { href: 'https://github.com/atimlaa', icon: FaGithub, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/aryan-timla/', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com/AryanTimla', icon: XIcon, label: 'X' },
  { href: 'https://discord.gg/jPtRHXGr', icon: FaDiscord, label: 'Discord' },
  { href: 'https://www.instagram.com/aryan_timla/', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/aryan.timla/', icon: FaFacebook, label: 'Facebook' },
];

const inputClass =
  'w-full bg-white/5 border border-white/10 focus:border-red-500/60 rounded-lg p-3 text-gray-300 placeholder-gray-600 outline-none transition-colors duration-300 text-sm';

const FORM_ENDPOINT = 'https://getform.io/f/8b5e41f0-2843-4cf6-b4d8-d10697e27cb3';
const EMPTY = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('message', form.message);

    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data });
      if (res.ok) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div name='contact' className='w-full min-h-screen bg-[#0a192f] text-gray-300 py-32 flex items-center'>
      {/* Toast notification */}
      <AnimatePresence>
        {(status === 'success' || status === 'error') && (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border text-sm font-mono ${
              status === 'success'
                ? 'bg-[#0d2a1f] border-green-500/40 text-green-300'
                : 'bg-[#2a0d0d] border-red-500/40 text-red-300'
            }`}
          >
            {status === 'success' ? (
              <>
                <HiCheckCircle size={20} className='text-green-400 shrink-0' />
                Message sent! I'll get back to you soon.
              </>
            ) : (
              <>
                <HiXCircle size={20} className='text-red-400 shrink-0' />
                Something went wrong. Please try again.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className='max-w-[1000px] mx-auto px-8 w-full'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-16'
        >
          <p className='text-red-400 font-mono mb-2 text-sm tracking-wider'>04. get in touch</p>
          <h2 className='text-4xl font-bold text-[#ccd6f6]'>
            Contact
            <span className='block h-[3px] bg-red-500 mt-3 w-16' />
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-14'>
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <p className='text-[#8892b0] leading-relaxed'>
              I'm currently open to new opportunities. Whether you have a
              question, a project idea, or just want to say hi — my inbox is
              always open!
            </p>
            <p className='text-[#8892b0]'>
              Or reach me directly at:{' '}
              <a
                href='mailto:aryantimla@gmail.com'
                className='text-red-400 hover:underline underline-offset-4'
              >
                aryantimla@gmail.com
              </a>
            </p>

            <div className='flex flex-wrap gap-3 pt-2'>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='p-3 bg-white/5 border border-white/10 hover:border-red-500/50 hover:text-red-400 rounded-lg transition-all duration-300'
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className='space-y-4'>
              <input
                className={inputClass}
                type='text'
                placeholder='Your Name'
                name='name'
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className={inputClass}
                type='email'
                placeholder='Your Email'
                name='email'
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                className={`${inputClass} resize-none`}
                name='message'
                rows='6'
                placeholder='Your Message'
                value={form.message}
                onChange={handleChange}
                required
              />
              <button
                type='submit'
                disabled={status === 'loading'}
                className='w-full border border-red-500 text-red-400 py-3 rounded-lg hover:bg-red-500/10 transition-all duration-300 font-mono text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
