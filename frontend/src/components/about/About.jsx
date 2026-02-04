// components/about/About.jsx
import React from 'react'

export default function About() {

  const fadeUp = {
    animation: 'fadeUp 0.8s ease forwards'
  }

  const container = {
    maxWidth: '1100px',
    margin: 'auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333'
  }

  const section = {
    marginBottom: '60px'
  }

  const lightSection = {
    ...section,
    background: '#f5f5f5',
    padding: '30px',
    borderRadius: '12px'
  }

  const header = {
    textAlign: 'center',
    marginBottom: '60px'
  }

  const featureGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  }

  const card = {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  }

  const footer = {
    background: '#fd6415',
    color: '#fff',
    textAlign: 'center',
    padding: '30px',
    borderRadius: '12px'
  }

  return (
    <div style={container}>

      {/* Keyframes */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Header */}
      <section style={{ ...header, ...fadeUp }}>
        <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>
          About BLOG App
        </h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          A modern blogging platform where you can share your thoughts, ideas,
          and stories with the world.
        </p>
      </section>

      {/* Mission */}
      <section style={{ ...lightSection, ...fadeUp }}>
        <h2>Our Mission</h2>
        <p style={{ lineHeight: '1.8' }}>
          We believe everyone has a story to tell. This site empowers creators,
          writers, and thinkers to share content with a global audience.
          Creating, editing, and sharing blogs should be simple and accessible.
        </p>
      </section>

      {/* Features */}
      <section style={{ ...section, ...fadeUp }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Key Features
        </h2>

        <div style={featureGrid}>
          {[
            ['Easy to Use', 'Simple and intuitive interface for creating posts'],
            ['Community', 'Connect and engage with other writers'],
            ['Fast & Reliable', 'Fast performance and reliable uptime'],
            ['Categories', 'Organize posts by Tech, Music, Sports, Movies, Fashion']
          ].map(([title, text]) => (
            <div
              key={title}
              style={card}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h3>{title}</h3>
              <p style={{ color: '#666' }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ ...lightSection, ...fadeUp }}>
        <h2>Technology Stack</h2>

        <div style={featureGrid}>
          <div>
            <h4>Frontend</h4>
            <ul>
              <li>React</li>
              <li>CSS</li>
              <li>Axios</li>
            </ul>
          </div>

          <div>
            <h4>Backend</h4>
            <ul>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>JWT Authentication</li>
            </ul>
          </div>

          <div>
            <h4>Database</h4>
            <ul>
              <li>MongoDB</li>
            </ul>
          </div>

          <div>
            <h4>Features</h4>
            <ul>
              <li>CRUD Operations</li>
              <li>Comments</li>
              <li>User Authentication</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ ...footer, ...fadeUp }}>
        <h2>Get in Touch</h2>
        <p style={{ fontSize: '18px' }}>sahiljangid321@gmail.com</p>
      </section>

    </div>
  )
}
