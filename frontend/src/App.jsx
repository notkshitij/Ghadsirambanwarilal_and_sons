import React from 'react';
import './App.css';

// Elegant classical corner filigree ornament
const CornerOrnament = ({ className }) => (
  <svg 
    className={`corner-ornament ${className}`} 
    viewBox="0 0 200 200" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="0.8"
    strokeLinecap="round"
  >
    {/* Main scroll lines */}
    <path d="M 200,0 C 170,15 140,20 115,10 C 95,2 80,15 90,28 C 100,40 120,32 125,20 C 130,8 110,2 100,10" />
    <path d="M 180,0 C 155,20 135,25 110,40 C 90,52 80,70 92,85 C 104,97 122,88 126,75 C 130,62 112,52 100,60" />
    <path d="M 200,35 C 175,55 155,50 135,70 C 115,88 110,110 122,122 C 134,134 152,120 152,105 C 152,90 132,85 125,95" />
    <path d="M 150,0 C 130,25 110,45 85,65 C 65,80 55,102 68,118 C 80,132 100,120 102,105 C 104,90 85,80 75,90" />
    <path d="M 200,75 C 175,100 155,115 130,135 C 110,150 102,172 115,188 C 128,202 148,190 148,175 C 148,160 128,150 120,160" strokeWidth="0.6" />

    {/* Leaves outlines & details */}
    {/* Leaf 1 */}
    <path d="M 145,8 C 152,15 152,25 142,28 C 132,30 128,20 135,12 C 140,5 142,5 145,8 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M 135,12 L 142,28" strokeWidth="0.4" opacity="0.5" />
    {/* Leaf 2 */}
    <path d="M 120,25 C 128,32 126,42 116,42 C 106,42 104,32 112,28 C 118,24 119,24 120,25 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M 112,28 L 116,42" strokeWidth="0.4" opacity="0.5" />
    {/* Leaf 3 */}
    <path d="M 152,48 C 158,58 152,68 142,65 C 132,62 135,50 145,46 C 150,43 151,44 152,48 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M 145,46 L 142,65" strokeWidth="0.4" opacity="0.5" />
    {/* Leaf 4 */}
    <path d="M 108,55 C 115,65 110,75 100,72 C 90,69 92,57 102,53 C 106,50 107,51 108,55 Z" fill="currentColor" fillOpacity="0.08" />
    {/* Leaf 5 */}
    <path d="M 135,80 C 142,90 136,102 126,98 C 116,94 118,82 128,78 C 132,75 134,76 135,80 Z" fill="currentColor" fillOpacity="0.08" />
    
    {/* Small flower accents / buds */}
    <circle cx="125" cy="20" r="2.5" fill="currentColor" fillOpacity="0.2" />
    <circle cx="126" cy="75" r="2.5" fill="currentColor" fillOpacity="0.2" />
    <circle cx="152" cy="105" r="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="102" cy="105" r="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="148" cy="175" r="2.5" fill="currentColor" fillOpacity="0.2" />

    {/* Elegant branching lines */}
    <path d="M 100,10 C 85,2 70,5 60,15" strokeWidth="0.5" />
    <path d="M 122,122 C 110,135 95,140 85,150" strokeWidth="0.5" />
  </svg>
);

export default function App() {
  return (
    <div className="splash-container">
      {/* Background shadow overlays */}
      <div className="shadow-overlay" />

      {/* Realistic blurred leaf branch shadow overlay */}
      <svg className="organic-shadow-svg" viewBox="0 0 500 500" fill="black">
        <path d="M -50,-50 C 50,50 150,120 220,180 C 250,210 290,260 320,310" stroke="black" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M 60,60 C 20,70 -10,95 -20,120 C -25,145 0,165 30,150 C 60,135 75,100 80,75 Z" />
        <path d="M 60,60 C 80,30 110,10 135,15 C 160,20 165,50 145,75 C 125,100 90,105 75,90 Z" />
        <path d="M 120,120 C 80,140 50,170 45,195 C 40,220 70,235 95,215 C 120,195 135,160 140,135 Z" />
        <path d="M 120,120 C 140,90 175,70 200,75 C 225,80 230,110 205,135 C 180,160 150,165 135,150 Z" />
        <path d="M 180,180 C 140,200 110,230 105,255 C 100,280 130,295 155,275 C 180,255 195,220 200,195 Z" />
        <path d="M 180,180 C 200,150 235,130 260,135 C 285,140 290,170 265,195 C 240,220 210,225 195,210 Z" />
        <path d="M 240,240 C 200,260 170,290 165,315 C 160,340 190,355 215,335 C 240,315 255,280 260,255 Z" />
        <path d="M 240,240 C 260,210 295,190 320,195 C 345,200 350,230 325,255 C 300,280 270,285 255,270 Z" />
      </svg>

      {/* Ornate corners */}
      <CornerOrnament className="corner-tr" />
      {/* Rotated corner for bottom left */}
      <CornerOrnament className="corner-bl" style={{ transform: 'rotate(180deg)' }} />

      {/* Main Branding Section */}
      <div className="branding-wrap">
        
        {/* Customized high-fidelity dandelion logo SVG */}
        <svg
          className="dandelion-logo-svg"
          viewBox="55 25 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFEFDD" />
              <stop offset="30%" stopColor="#E8C9A0" />
              <stop offset="60%" stopColor="#C6A076" />
              <stop offset="100%" stopColor="#4A301D" />
            </linearGradient>
          </defs>

          {/* RIGHT DANDELION (Larger, tilted right) */}
          {/* Stem */}
          <path
            d="M 113,180 C 111,148 119,118 138,88"
            stroke="url(#goldGradient)"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* 7 rays (comb) */}
          <path
            d="M 138,88 C 127,73 114,66 98,68
               M 138,88 C 131,69 121,56 108,50
               M 138,88 C 137,66 130,50 121,41
               M 138,88 C 143,67 143,51 138,39
               M 138,88 C 149,71 155,59 157,48
               M 138,88 C 153,79 163,70 169,59
               M 138,88 C 157,89 174,89 186,84"
            stroke="url(#goldGradient)"
            strokeWidth="4.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* LEFT DANDELION (Smaller, tilted left) */}
          {/* Stem */}
          <path
            d="M 103,136 C 106,126 103,110 95,92"
            stroke="url(#goldGradient)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* 5 rays (comb) */}
          <path
            d="M 95,92 C 85,93 72,99 63,106
               M 95,92 C 86,83 75,76 66,70
               M 95,92 C 90,74 83,63 76,54
               M 95,92 C 97,75 99,63 95,52
               M 95,92 C 103,79 109,72 116,68"
            stroke="url(#goldGradient)"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Brand Name */}
        <h1 className="brand-name gold-gradient-text">
          Ghadsiram
        </h1>

        {/* Tagline Separator & Text */}
        <div className="tagline-container">
          <div className="tagline-diamond">✦</div>
          <div className="tagline-line left"></div>
          <span className="tagline-text">Banwarilal & Sons</span>
          <div className="tagline-line right"></div>
          <div className="tagline-diamond">✦</div>
        </div>

        {/* Bottom Decorative Separator */}
        <svg className="bottom-separator-svg" viewBox="0 0 200 20" fill="none">
          <defs>
            <linearGradient id="lineFadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c6a076" stopOpacity="0" />
              <stop offset="100%" stopColor="#c6a076" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="lineFadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c6a076" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#c6a076" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Tapering Lines */}
          <path d="M 10 10 L 85 10" stroke="url(#lineFadeLeft)" strokeWidth="0.85" />
          <path d="M 115 10 L 190 10" stroke="url(#lineFadeRight)" strokeWidth="0.85" />
          
          {/* Center Ornate Diamond Diamond */}
          <polygon points="100,5 104,10 100,15 96,10" fill="url(#goldGradient)" />
          {/* Accent tines */}
          <path d="M 96,10 L 92,10 M 104,10 L 108,10" stroke="url(#goldGradient)" strokeWidth="0.85" />
          <circle cx="90" cy="10" r="0.85" fill="url(#goldGradient)" />
          <circle cx="110" cy="10" r="0.85" fill="url(#goldGradient)" />
        </svg>

      </div>
    </div>
  );
}
