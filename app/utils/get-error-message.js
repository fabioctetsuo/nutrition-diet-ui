export function getErrorMessage(errorPayload) {
  let errorMessage = 'Ocorreu um erro inesperado';
  try {
    errorMessage = errorPayload.errors[0].message;
  } catch (e) {
    if (errorPayload.payload &&
      errorPayload.payload.errors &&
      errorPayload.payload.errors.length > 0) {
      errorMessage = errorPayload.payload.errors[0].message;
    } else if (errorPayload.message) {
      errorMessage = errorMessage.concat(': ').concat(errorPayload.message);
    }
  }
  return errorMessage;
  
}