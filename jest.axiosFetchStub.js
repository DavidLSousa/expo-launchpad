// Stub that replaces axios/lib/adapters/fetch in the Jest environment.
// Expo's polyfilled ReadableStream causes "Cannot cancel a stream that already has a reader"
// when axios tries to detect fetch support at module load time.
// By replacing this module with a no-op, axios falls back to the http adapter (safe in Node).
module.exports = null;
