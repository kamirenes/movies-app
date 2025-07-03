export function sendSuccess(res, data) {
  res.status(200).json(data);
}

export function sendError(res, error) {
  const status = error.status || 500;
  const message = error.message || "Unexpected server error";
  res.status(status).json({ status, message });
}
