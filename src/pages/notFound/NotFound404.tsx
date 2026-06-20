import { FC } from 'react';
import styles from './NotFoundPage.module.css';

export const NotFound404: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 480 320"
    width="480"
    height="320"
    aria-label="Иллюстрация 404 — потерянный астронавт"
    className={styles.svg}
  >
    {/* Звёзды */}
    {[
      [30, 25],
      [80, 60],
      [55, 100],
      [130, 15],
      [170, 80],
      [210, 30],
      [260, 55],
      [320, 20],
      [370, 70],
      [410, 25],
      [450, 55],
      [15, 145],
      [100, 170],
      [155, 130],
      [295, 140],
      [430, 110],
      [460, 160],
    ].map(([cx, cy], i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={i % 3 === 0 ? 2 : 1.5}
        fill="#3C241C"
        opacity={0.35}
      />
    ))}

    {/* Планета (большая) */}
    <ellipse cx="370" cy="210" rx="80" ry="80" fill="#E0D1BB" />
    {/* Кратеры */}
    <circle cx="345" cy="195" r="12" fill="#B7CEE4" opacity="0.5" />
    <circle cx="390" cy="230" r="8" fill="#B7CEE4" opacity="0.4" />
    <circle cx="360" cy="240" r="5" fill="#B7CEE4" opacity="0.4" />
    {/* Кольцо планеты */}
    <ellipse
      cx="370"
      cy="210"
      rx="110"
      ry="22"
      fill="none"
      stroke="#3C241C"
      strokeWidth="6"
      opacity="0.2"
    />
    <ellipse
      cx="370"
      cy="210"
      rx="110"
      ry="22"
      fill="none"
      stroke="#3C241C"
      strokeWidth="2"
      opacity="0.35"
    />

    {/* Маленькая планета */}
    <circle cx="70" cy="230" r="30" fill="#E0D1BB" opacity="0.7" />
    <circle cx="58" cy="222" r="7" fill="#B7CEE4" opacity="0.5" />
    <circle cx="80" cy="240" r="4" fill="#B7CEE4" opacity="0.4" />

    {/* Астронавт — тело */}
    <g transform="translate(195, 100) rotate(-15, 40, 80)">
      {/* Скафандр-туловище */}
      <rect x="22" y="55" width="36" height="44" rx="12" fill="#E0D1BB" />
      {/* Шлем */}
      <circle cx="40" cy="42" r="22" fill="#E0D1BB" />
      {/* Визор */}
      <ellipse cx="40" cy="42" rx="14" ry="13" fill="#B7CEE4" opacity="0.8" />
      <ellipse cx="36" cy="39" rx="4" ry="3" fill="white" opacity="0.5" />
      {/* Левая рука */}
      <rect
        x="5"
        y="60"
        width="18"
        height="10"
        rx="5"
        fill="#E0D1BB"
        transform="rotate(25, 14, 65)"
      />
      {/* Правая рука */}
      <rect
        x="57"
        y="58"
        width="18"
        height="10"
        rx="5"
        fill="#E0D1BB"
        transform="rotate(-20, 66, 63)"
      />
      {/* Левая нога */}
      <rect
        x="24"
        y="96"
        width="13"
        height="22"
        rx="6"
        fill="#E0D1BB"
        transform="rotate(10, 30, 107)"
      />
      {/* Правая нога */}
      <rect
        x="40"
        y="96"
        width="13"
        height="22"
        rx="6"
        fill="#E0D1BB"
        transform="rotate(-10, 47, 107)"
      />
      {/* Детали скафандра */}
      <rect
        x="32"
        y="65"
        width="16"
        height="10"
        rx="3"
        fill="#B7CEE4"
        opacity="0.6"
      />
      {/* Контуры */}
      <circle
        cx="40"
        cy="42"
        r="22"
        fill="none"
        stroke="#3C241C"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <rect
        x="22"
        y="55"
        width="36"
        height="44"
        rx="12"
        fill="none"
        stroke="#3C241C"
        strokeWidth="1.5"
        opacity="0.3"
      />
    </g>

    {/* Верёвка/трос от астронавта */}
    <path
      d="M 248 175 Q 295 190 330 200"
      fill="none"
      stroke="#3C241C"
      strokeWidth="1.5"
      strokeDasharray="4 3"
      opacity="0.4"
    />
  </svg>
);
