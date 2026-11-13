# Security Policy

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting / Security Advisories feature when available. Otherwise contact AliceLabs through its published business contact channel. Do not publish exploit details or customer data in public issues.

Include the affected version, reproduction steps, impact and a safe proof of concept.

## Current product boundary

Dropes is documented as a storefront prototype. Do not treat its local cart or demonstration checkout as a real order or payment system. Never commit API keys, payment credentials, customer information or secrets. Any future payment flow must be implemented and validated server-side, including provider webhooks and order-state verification.
