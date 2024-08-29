const ListIcon = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
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
        d="M5 17H9V13H5V17ZM5 22H9V18H5V22ZM5 12H9V8H5V12ZM10 17H23V13H10V17ZM10 22H23V18H10V22ZM10 8V12H23V8H10Z"
        fill="#AEAEAE"
      />
    </svg>
  );
  
  export default ListIcon;
  