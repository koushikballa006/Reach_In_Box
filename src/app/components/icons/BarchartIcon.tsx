const BarchartIcon = ({
    className = '',
    style = {},
    fill = '#AEAEAE'
  }: {
    className?: string;
    style?: React.CSSProperties;
    fill?: string;
  }) => (
    <svg
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path d="M9.33317 11.2857H4.6665V24.1191H9.33317V11.2857Z" fill={fill} />
      <path d="M23.3332 15.9524H18.6665V24.1191H23.3332V15.9524Z" fill={fill} />
      <path d="M16.3332 5.45239H11.6665V24.1191H16.3332V5.45239Z" fill={fill} />
    </svg>
  );
  
  export default BarchartIcon;
  