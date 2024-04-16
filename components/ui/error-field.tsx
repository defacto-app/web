import React from 'react'; 
import PropTypes from 'prop-types';

interface ErrorFieldProps {
  error?: string; 
  className?: string; 
}

const ErrorField: React.FC<ErrorFieldProps> = ({ error, className }) => {
  return (
    <div className={className}>
      {error && (
        <div className={`text-red-500 text-xs font-semibold inline rounded-sm`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ErrorField;

ErrorField.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
};
