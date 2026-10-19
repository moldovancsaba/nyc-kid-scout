# Release notes

## New Features

Added Class Scout NY repository orientation, a source map, local build/preview guidance and assistant configuration boundaries.

## Fixed Bugs

Replaced the generic Lovable welcome with the app's observed identity and implemented scope. Documented generated catalog data, browser-local saves, demo account controls and simulated checkout confirmation.

## Known Issues

Clean install is blocked on main by a stale lockfile. The separate [draft lockfile repair](https://github.com/moldovancsaba/nyc-kid-scout/pull/1) passes install/build/preview but exposes lint/dependency findings tracked in [issue #2](https://github.com/moldovancsaba/nyc-kid-scout/issues/2). Checkout does not reserve, charge or email. Provider contacts, ratings, prices and event data are demo/generated fixtures. Account settings and chat are not a verified durable account system. Live assistant operation depends on separately hosted services and credentials. The example test does not provide workflow coverage. See the [delivery issue](https://github.com/moldovancsaba/mvp-factory-control/issues/927) for exact command outcomes and baseline findings.

## Future Roadmap

Verify catalog identity and operational intent before presenting real-world listings. Scope actual account, reservation, payment and email work separately; add meaningful workflow coverage and verify the connected assistant before claiming production readiness.

This welcome repair changes documentation and matching About metadata only. Application source, package manifest, default-branch lockfile and deployment configuration are unchanged. The candidate lockfile is deliberately unmerged pending the recorded baseline follow-up. Rollback by reverting the documentation commit and restoring the previously empty About description.
