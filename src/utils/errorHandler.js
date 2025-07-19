// src/utils/errorHandler.js
// Centralized error handling utility for meaningful user messages

/**
 * Enhanced error logging for debugging unknown errors
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred (e.g., 'login', 'signup', 'datastore')
 */
export const logErrorDetails = (error, context = 'unknown') => {
  // Safety check for undefined/null error
  if (!error) {
    console.error(`Null/undefined error in ${context} - this should not happen`);
    return;
  }

  console.error(`Error in ${context}:`, {
    code: error.code || 'NO_CODE',
    message: error.message || 'NO_MESSAGE',
    name: error.name || 'NO_NAME',
    stack: error.stack || 'NO_STACK',
    context,
    timestamp: new Date().toISOString(),
    fullError: error,
    errorConstructor: error.constructor?.name || 'UNKNOWN_CONSTRUCTOR',
    errorKeys: Object.keys(error || {}),
    stringified: JSON.stringify(error, Object.getOwnPropertyNames(error || {})),
    errorType: typeof error,
    isErrorObject: error instanceof Error,
  });
};

/**
 * Get user-friendly error message for authentication errors
 * @param {Error} error - The error object
 * @returns {Object} - { title, message } for user display
 */
export const getAuthErrorMessage = (error) => {
  // Safety check for null/undefined error
  if (!error) {
    console.error('getAuthErrorMessage called with null/undefined error');
    return {
      title: "Authentication Error",
      message: "An unexpected authentication issue occurred. Please try again or restart the app."
    };
  }

  logErrorDetails(error, 'authentication');
  
  let title = "Sign In Failed";
  let message = "We couldn't sign you in right now. Please try again.";
  
  // Get error code safely
  const errorCode = error.code || '';
  const errorMessage = error.message || '';
  
  if (errorCode === 'UserNotConfirmedException') {
    title = "Email Verification Required";
    message = "Your account needs to be verified. Please check your email and click the verification link. If you didn't receive the email, check your spam folder or try signing up again.";
  } else if (errorCode === 'NotAuthorizedException') {
    title = "Invalid Credentials";
    message = "The email or password you entered is incorrect. Please double-check your credentials and try again.";
  } else if (errorCode === 'UserNotFoundException') {
    title = "Account Not Found";
    message = "No account exists with this email address. Would you like to create a new account instead?";
  } else if (errorCode === 'InvalidParameterException') {
    title = "Invalid Email Format";
    message = "Please enter a valid email address (e.g., yourname@example.com) and try again.";
  } else if (errorCode === 'TooManyRequestsException') {
    title = "Too Many Attempts";
    message = "You've made too many sign-in attempts. Please wait a few minutes before trying again, or reset your password if you've forgotten it.";
  } else if (errorCode === 'LimitExceededException') {
    title = "Rate Limit Exceeded";
    message = "Too many requests from this device. Please wait 15 minutes before trying again.";
  } else if (errorCode === 'PasswordResetRequiredException') {
    title = "Password Reset Required";
    message = "Your password needs to be reset. Please use the 'Forgot Password' option to set a new password.";
  } else if (errorCode === 'UserNotVerifiedException') {
    title = "Account Not Verified";
    message = "Your account hasn't been verified yet. Please check your email for the verification link and try again.";
  } else if (errorCode === 'InvalidUserPoolConfigurationException') {
    title = "Service Configuration Error";
    message = "There's a temporary issue with our authentication service. Please try again in a few minutes.";
  } else if (errorCode === 'InternalErrorException') {
    title = "Service Temporarily Unavailable";
    message = "Our authentication service is temporarily experiencing issues. Please try again in a few minutes.";
  } else if (errorCode === 'ResourceNotFoundException') {
    title = "Service Configuration Error";
    message = "Authentication service configuration issue. Please contact support if this problem persists.";
  }
  // Network and connectivity errors
  else if (errorCode === 'NetworkError' || errorMessage.includes('network') || errorMessage.includes('Network') || errorMessage.includes('fetch') || errorMessage.includes('timeout')) {
    title = "Connection Problem";
    message = "Unable to connect to our servers. Please check your internet connection and try again.";
  }
  // Amplify-specific errors
  else if (errorMessage.includes('Amplify') || errorMessage.includes('amplify')) {
    title = "Authentication Service Error";
    message = "There's an issue with the authentication service. Please try restarting the app or contact support.";
  }
  // Generic fallback with enhanced information
  else {
    const errorDetails = errorCode ? `(Error: ${errorCode})` : '';
    const networkHint = !isOnline() ? " It looks like you're offline - please check your internet connection." : "";
    title = "Unexpected Error";
    message = `Something unexpected happened during sign in${errorDetails}. Please try again${networkHint} If the problem continues, please restart the app or contact support.`;
  }
  
  return { title, message };
};

/**
 * Get user-friendly error message for signup errors
 * @param {Error} error - The error object
 * @returns {Object} - { title, message } for user display
 */
export const getSignupErrorMessage = (error) => {
  // Safety check for null/undefined error
  if (!error) {
    console.error('getSignupErrorMessage called with null/undefined error');
    return {
      title: "Signup Error",
      message: "An unexpected signup issue occurred. Please try again or restart the app."
    };
  }

  logErrorDetails(error, 'signup');
  
  let title = "Signup Failed";
  let message = "We couldn't create your account. Please try again.";
  
  // Get error code and message safely
  const errorCode = error.code || '';
  const errorMessage = error.message || '';
  
  if (errorCode === 'UsernameExistsException') {
    title = "Account Already Exists";
    message = "An account with this email already exists. Try logging in instead or use a different email address.";
  } else if (errorCode === 'InvalidPasswordException') {
    title = "Password Requirements Not Met";
    message = "Your password doesn't meet our security requirements. Please ensure it has at least 8 characters with a mix of letters, numbers, and symbols.";
  } else if (errorCode === 'InvalidParameterException') {
    title = "Invalid Information";
    message = "Please check that all fields are filled out correctly. Make sure your email is valid and password meets requirements.";
  } else if (errorCode === 'LimitExceededException') {
    title = "Too Many Attempts";
    message = "You've made too many signup attempts. Please wait a few minutes before trying again.";
  } else if (errorCode === 'CodeDeliveryFailureException') {
    title = "Email Delivery Issue";
    message = "We couldn't send the verification email. Please check that your email address is correct and try again.";
  } else if (errorCode === 'InvalidEmailRoleAccessPolicyException') {
    title = "Email Service Issue";
    message = "There's a temporary issue with our email service. Please try again in a few minutes.";
  } else if (errorCode === 'NotAuthorizedException') {
    title = "Account Creation Not Allowed";
    message = "Account creation is currently not available. Please try again later or contact support.";
  } else if (errorCode === 'InternalErrorException') {
    title = "Service Temporarily Unavailable";
    message = "Our signup service is temporarily experiencing issues. Please try again in a few minutes.";
  }
  // Network and connectivity errors
  else if (errorCode === 'NetworkError' || errorMessage.includes('network') || errorMessage.includes('Network') || errorMessage.includes('fetch') || errorMessage.includes('timeout')) {
    title = "Connection Problem";
    message = "Unable to connect to our servers. Please check your internet connection and try again.";
  }
  // DataStore specific errors
  else if (errorMessage.includes('DataStore') || errorMessage.includes('datastore')) {
    title = "Profile Creation Issue";
    message = "Your account was created but there was an issue setting up your profile. Please try logging in - if that doesn't work, contact support.";
  }
  // Amplify-specific errors
  else if (errorMessage.includes('Amplify') || errorMessage.includes('amplify')) {
    title = "Signup Service Error";
    message = "There's an issue with the signup service. Please try restarting the app or contact support.";
  }
  // Generic fallback
  else {
    const errorDetails = errorCode ? `(Error: ${errorCode})` : '';
    const networkHint = !isOnline() ? " It looks like you're offline - please check your internet connection." : "";
    title = "Unexpected Error";
    message = `Something unexpected happened during account creation${errorDetails}. Please try again${networkHint} If the problem continues, please restart the app or contact support.`;
  }
  
  return { title, message };
};

/**
 * Get user-friendly error message for DataStore errors
 * @param {Error} error - The error object
 * @param {string} operation - What operation was being performed (e.g., 'loading bands', 'loading portfolio')
 * @returns {string} - User-friendly error message
 */
export const getDataStoreErrorMessage = (error, operation = 'loading data') => {
  // Safety check for null/undefined error
  if (!error) {
    console.error('getDataStoreErrorMessage called with null/undefined error');
    return `Unable to complete ${operation} - unexpected error occurred`;
  }

  logErrorDetails(error, 'datastore');
  
  let message = `Unable to complete ${operation} right now`;
  
  // Get error properties safely
  const errorMessage = error.message || '';
  const errorCode = error.code || '';
  
  if (errorMessage.includes('Network') || errorMessage.includes('network') || errorMessage.includes('fetch')) {
    message = 'Connection issue - please check your internet and try again';
  } else if (errorMessage.includes('Unauthorized') || errorMessage.includes('unauthorized')) {
    message = 'Authentication issue - please try logging in again';
  } else if (errorMessage.includes('DataStore') || errorMessage.includes('datastore')) {
    message = 'Database sync issue - trying to reconnect automatically';
  } else if (errorMessage.includes('GraphQL') || errorMessage.includes('graphql')) {
    message = 'Server communication issue - please try again';
  } else if (errorCode === 'ConfigError') {
    message = 'App configuration issue - please restart the app';
  } else if (errorMessage.includes('timeout')) {
    message = 'Connection timeout - please try again';
  } else if (errorMessage.includes('Amplify') || errorMessage.includes('amplify')) {
    message = 'App configuration issue - please restart the app';
  } else if (errorMessage) {
    message = `Service issue: ${errorMessage}`;
  }
  
  return message;
};

/**
 * Check if device is online (basic check)
 * @returns {boolean} - Whether device appears to be online
 */
export const isOnline = () => {
  return navigator.onLine !== false; // Default to true if navigator.onLine is undefined
};

/**
 * Generic error boundary for catching unhandled errors
 * @param {Error} error - The error object
 * @param {string} context - Where the error occurred
 * @returns {Object} - { title, message } for user display
 */
export const getGenericErrorMessage = (error, context = 'performing this action') => {
  // Safety check for null/undefined error
  if (!error) {
    console.error('getGenericErrorMessage called with null/undefined error');
    return {
      title: "Unexpected Error",
      message: `An unexpected issue occurred while ${context}. Please try again or restart the app.`
    };
  }

  logErrorDetails(error, context);
  
  const errorMessage = error.message || '';
  const isNetworkIssue = !isOnline() || 
    errorMessage.includes('network') || 
    errorMessage.includes('Network') || 
    errorMessage.includes('fetch') || 
    errorMessage.includes('timeout');
  
  if (isNetworkIssue) {
    return {
      title: "Connection Problem",
      message: "Please check your internet connection and try again."
    };
  }
  
  return {
    title: "Something Went Wrong",
    message: `We encountered an issue while ${context}. Please try again or restart the app if the problem persists.`
  };
};
