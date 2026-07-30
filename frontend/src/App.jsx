import React from 'react';
import './App.css';



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



      {/* Main Branding Section */}
      <div className="branding-wrap">
        
        {/* Exact dandelion mark, extracted from the approved reference artwork */}
        <img
          src="/flowers.png"
          alt="Ghadsiram flowers mark"
          className="dandelion-logo-svg"
          draggable="false"
        />

        {/* Brand Name */}
        <h1 className="brand-name gold-gradient-text">
          GHADSIRAM
        </h1>

        {/* Tagline Separator & Text */}
        <div className="tagline-container">
          <div className="tagline-rule-left">
            <span className="tagline-arrow">◄</span>
            <div className="tagline-line-bar left-bar"></div>
          </div>
          <span className="tagline-text">Banwarilal &amp; Sons</span>
          <div className="tagline-rule-right">
            <div className="tagline-line-bar right-bar"></div>
            <span className="tagline-arrow">►</span>
          </div>
        </div>

        {/* Bottom Decorative Separator */}
        <div className="bottom-separator">
          <div className="sep-line sep-line-left"></div>
          <div className="sep-ornament">
            <div className="sep-dot"></div>
            <div className="sep-diamond"></div>
            <div className="sep-dot"></div>
          </div>
          <div className="sep-line sep-line-right"></div>
        </div>

      </div>
    </div>
  );
}
