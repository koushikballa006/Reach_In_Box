const EmailIcon = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
    <svg
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M21.2 7.5H6.8C5.81 7.5 5.009 8.31 5.009 9.3L5 20.1C5 21.09 5.81 21.9 6.8 21.9H21.2C22.19 21.9 23 21.09 23 20.1V9.3C23 8.31 22.19 7.5 21.2 7.5ZM21.2 11.1L14 15.6L6.8 11.1V9.3L14 13.8L21.2 9.3V11.1Z"
        fill="#AEAEAE"
      />
    </svg>
  );
  
  export default EmailIcon;
  