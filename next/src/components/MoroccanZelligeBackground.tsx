'use client';

export default function MoroccanZelligeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-25 dark:opacity-15">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Authentic Moroccan Zellige Pattern - Classic Star and Cross Tessellation */}
          <pattern id="authentic-zellige" x="0" y="0" width="200" height="173.2" patternUnits="userSpaceOnUse">
            {/* Central 8-pointed star (traditional Moroccan motif) */}
            <g className="animate-zellige-pulse" style={{ transformOrigin: '100px 86.6px' }}>
              <path
                d="M100 36.6 L107.5 56.6 L122.5 48.3 L115 68.3 L130 76.6 L115 84.9 L122.5 104.9 L107.5 96.6 L100 116.6 L92.5 96.6 L77.5 104.9 L85 84.9 L70 76.6 L85 68.3 L77.5 48.3 L92.5 56.6 Z"
                fill="#C1272D"
                stroke="#8B0000"
                strokeWidth="0.5"
              />
              {/* Inner octagon */}
              <path
                d="M100 76.6 L105 81.6 L105 91.6 L100 96.6 L95 91.6 L95 81.6 Z"
                fill="#006233"
                stroke="#004d26"
                strokeWidth="0.3"
              />
            </g>

            {/* Surrounding kite/diamond tiles (typical zellige filler) */}
            <path d="M100 16.6 L115 36.6 L100 36.6 Z" fill="#E67E50" stroke="#b85a3c" strokeWidth="0.5" className="animate-zellige-fade" />
            <path d="M100 16.6 L85 36.6 L100 36.6 Z" fill="#4A90E2" stroke="#3674b8" strokeWidth="0.5" className="animate-zellige-fade-delay-1" />
            
            <path d="M100 136.6 L115 116.6 L100 116.6 Z" fill="#4A90E2" stroke="#3674b8" strokeWidth="0.5" className="animate-zellige-fade-delay-2" />
            <path d="M100 136.6 L85 116.6 L100 116.6 Z" fill="#E67E50" stroke="#b85a3c" strokeWidth="0.5" className="animate-zellige-fade-delay-3" />

            {/* Cross-shaped tiles (classic zellige element) */}
            <g opacity="0.8">
              <path d="M130 76.6 L145 66.6 L145 86.6 Z" fill="#006233" stroke="#004d26" strokeWidth="0.5" />
              <path d="M70 76.6 L55 66.6 L55 86.6 Z" fill="#006233" stroke="#004d26" strokeWidth="0.5" />
            </g>

            {/* Small square tiles at intersections */}
            <rect x="48" y="30" width="7" height="7" fill="#C9BCA8" stroke="#a89886" strokeWidth="0.3" />
            <rect x="145" y="30" width="7" height="7" fill="#C9BCA8" stroke="#a89886" strokeWidth="0.3" />
            <rect x="48" y="116" width="7" height="7" fill="#C9BCA8" stroke="#a89886" strokeWidth="0.3" />
            <rect x="145" y="116" width="7" height="7" fill="#C9BCA8" stroke="#a89886" strokeWidth="0.3" />

            {/* Elongated hexagon tiles (traditional zellige shape) */}
            <path 
              d="M50 56.6 L60 48.3 L70 56.6 L70 66.6 L60 74.9 L50 66.6 Z" 
              fill="#E67E50" 
              stroke="#b85a3c" 
              strokeWidth="0.5"
              className="animate-zellige-float"
            />
            <path 
              d="M130 96.6 L140 88.3 L150 96.6 L150 106.6 L140 114.9 L130 106.6 Z" 
              fill="#4A90E2" 
              stroke="#3674b8" 
              strokeWidth="0.5"
              className="animate-zellige-float"
              style={{ animationDelay: '0.5s' }}
            />
          </pattern>

          {/* Secondary pattern - smaller traditional tiles */}
          <pattern id="zellige-secondary" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="24" height="24" fill="#C1272D" opacity="0.3" stroke="#8B0000" strokeWidth="0.5" />
            <rect x="26" y="26" width="24" height="24" fill="#006233" opacity="0.3" stroke="#004d26" strokeWidth="0.5" />
            <circle cx="25" cy="25" r="8" fill="#E67E50" opacity="0.4" stroke="#b85a3c" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Main zellige pattern */}
        <rect width="100%" height="100%" fill="url(#authentic-zellige)" className="animate-zellige-slide" />
        
        {/* Overlay with secondary pattern */}
        <rect width="100%" height="100%" fill="url(#zellige-secondary)" opacity="0.15" className="animate-zellige-slide-reverse" />

        {/* Traditional Moroccan border elements */}
        <g className="animate-zellige-spin-slow" style={{ transformOrigin: '300px 200px' }}>
          <path
            d="M300 160 L310 175 L325 170 L320 185 L335 190 L320 195 L325 210 L310 205 L300 220 L290 205 L275 210 L280 195 L265 190 L280 185 L275 170 L290 175 Z"
            fill="none"
            stroke="#C1272D"
            strokeWidth="1.5"
            opacity="0.2"
          />
        </g>

        <g className="animate-zellige-spin-reverse" style={{ transformOrigin: '950px 550px' }}>
          <path
            d="M950 510 L960 525 L975 520 L970 535 L985 540 L970 545 L975 560 L960 555 L950 570 L940 555 L925 560 L930 545 L915 540 L930 535 L925 520 L940 525 Z"
            fill="none"
            stroke="#006233"
            strokeWidth="1.5"
            opacity="0.2"
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes zellige-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.03);
            opacity: 1;
          }
        }

        @keyframes zellige-fade {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes zellige-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes zellige-slide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 86.6px); }
        }

        @keyframes zellige-slide-reverse {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50px, -43.3px); }
        }

        @keyframes zellige-spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes zellige-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-zellige-pulse {
          animation: zellige-pulse 6s ease-in-out infinite;
        }

        .animate-zellige-fade {
          animation: zellige-fade 4s ease-in-out infinite;
        }

        .animate-zellige-fade-delay-1 {
          animation: zellige-fade 4s ease-in-out infinite 1s;
        }

        .animate-zellige-fade-delay-2 {
          animation: zellige-fade 4s ease-in-out infinite 2s;
        }

        .animate-zellige-fade-delay-3 {
          animation: zellige-fade 4s ease-in-out infinite 3s;
        }

        .animate-zellige-float {
          animation: zellige-float 8s ease-in-out infinite;
        }

        .animate-zellige-slide {
          animation: zellige-slide 60s linear infinite;
        }

        .animate-zellige-slide-reverse {
          animation: zellige-slide-reverse 80s linear infinite;
        }

        .animate-zellige-spin-slow {
          animation: zellige-spin-slow 40s linear infinite;
        }

        .animate-zellige-spin-reverse {
          animation: zellige-spin-reverse 35s linear infinite;
        }
      `}</style>

      <style jsx>{`
        @keyframes zellige-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes zellige-fade {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @keyframes zellige-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes zellige-slide {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }

        @keyframes zellige-slide-reverse {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-30px) translateY(-30px); }
        }

        @keyframes zellige-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes zellige-spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes zellige-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-zellige-pulse {
          animation: zellige-pulse 4s ease-in-out infinite;
        }

        .animate-zellige-fade {
          animation: zellige-fade 3s ease-in-out infinite;
        }

        .animate-zellige-fade-delay-1 {
          animation: zellige-fade 3s ease-in-out infinite 0.5s;
        }

        .animate-zellige-fade-delay-2 {
          animation: zellige-fade 3s ease-in-out infinite 1s;
        }

        .animate-zellige-fade-delay-3 {
          animation: zellige-fade 3s ease-in-out infinite 1.5s;
        }

        .animate-zellige-rotate {
          animation: zellige-rotate 60s linear infinite;
          transform-origin: center;
        }

        .animate-zellige-slide {
          animation: zellige-slide 40s linear infinite;
        }

        .animate-zellige-slide-reverse {
          animation: zellige-slide-reverse 50s linear infinite;
        }

        .animate-zellige-float {
          animation: zellige-float 5s ease-in-out infinite;
        }

        .animate-zellige-spin-slow {
          animation: zellige-spin-slow 30s linear infinite;
        }

        .animate-zellige-spin-reverse {
          animation: zellige-spin-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
