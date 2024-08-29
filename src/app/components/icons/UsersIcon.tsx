const UserIcon = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
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
        d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z"
        fill="#AEAEAE"
      />
      <path
        d="M12.35 16.01C9.62 15.91 4 17.27 4 20V22H13.54C11.07 19.24 12.31 16.11 12.35 16.01Z"
        fill="#AEAEAE"
      />
      <path
        d="M21.43 20.02C21.79 19.43 22 18.74 22 18C22 15.79 20.21 14 18 14C15.79 14 14 15.79 14 18C14 20.21 15.79 22 18 22C18.74 22 19.43 21.78 20.02 21.43L22.59 24L24 22.59L21.43 20.02ZM18 20C16.9 20 16 19.1 16 18C16 16.9 16.9 16 18 16C19.1 16 20 16.9 20 18C20 19.1 19.1 20 18 20Z"
        fill="#AEAEAE"
      />
    </svg>
  );
  
  export default UserIcon;
  