const SectionSpacer = ({ height = "10vh", className = "" }) => {
  return (
    <div 
      className={`section-spacer ${className}`}
      style={{ 
        minHeight: height,
        background: 'transparent',
        position: 'relative',
        zIndex: 1
      }}
    />
  );
};

export default SectionSpacer;
