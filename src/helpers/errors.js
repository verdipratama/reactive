export function getError(res) {
  if (!res) {
    return '';
  }

  if (res.error && res.error.error && res.error.error.detail) {
    return res.error.error.detail;
  }
  if (res.error && res.error.error && res.error.error.message) {
    return res.error.error.message;
  } else if (res.data && res.data.error && res.data.error.detail) {
    return res.data.error.detail;
  } else if (res.error && res.error.data) {
    return res.error.data;
  } else if (res.data && res.data.message) {
    return res.data.message;
  } else if (res.data && res.data.data) {
    return res.data.data;
  }

  return '';
}
