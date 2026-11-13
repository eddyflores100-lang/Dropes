# Contributing

Thanks for contributing to Dropes.

## Development

Follow the Node.js and package-manager versions documented in README. Install from the lockfile and run the available lint/type checks and production build before submitting changes.

## Pull requests

- Keep changes focused and responsive across mobile and desktop.
- Preserve the explicit prototype/demo status unless real backend functionality has been implemented and tested.
- Do not put secrets in browser code or `VITE_*` variables.
- Do not represent a local cart as a persisted order or a demo checkout as a completed payment.
- For future checkout work, require server-side price validation, payment-provider webhooks, idempotency and explicit order-state handling.

Describe the change, verification commands, manual test steps and known limitations.
