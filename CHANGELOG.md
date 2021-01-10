## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2021-01-05

## Added

 - Added an abstract type `StrategyReposity` for specific key generation.
 - Added a class `UUIDRepository`, which generate UUID as key.

## Modified

 - Changed return type of `create(key: K, value: V)` from `boolean` to `K` (now returns the key).

## [1.0.0] - 2021-01-05

### Added

 - First release, with only a main class `Repository` and two helper types `Predicate` and `Updater`.
