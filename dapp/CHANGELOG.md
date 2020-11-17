# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [0.4.2] 2020-11-17

### Fixed

- Update total time spent on the task every 10 seconds.

## [0.4.1] 2020-11-17

### Added

- Add new "tier" information to the task.

### Changed

- If logged in, jump directly to "tasks to do".

### Fixed

- When updating, download the new assets first, then ask to reload

## [0.4.0] 2020-11-05

### Added

- Tasks are now grouped by project.
- Add new "timeline" view.

### Changed

- Task list is now more compact and shows less information.

### Fixed

- Fast double click/tap on play button doesn't break time tracking anymore.

## [0.3.0] 2020-09-10

### Added

- Add bar showing the active task. The bar hides when scrolling.
- Add button to mark task as "done".
- Cachebusting for cache preload.
- Notification to update app when new version is out.

### Changed

- Task list now allows to navigate through tasks that are "To Do", "Done", and "Approved".
- Tasks in backlog are now integrated in a more generic "To Do" page, displaying both new tasks and tasks that are in progress.

### Fixed

- Bug in service worker update routine.

## [0.2.0] 2020-09-08

### Added

- Enable PWA so the dApp is installable on iOS, Android.
- Create logo and splash assets.

## [0.0.1] 2020-07-29

### Added

- Initial UI.
- Authenticate to Odoo.
- Display list of tasks.
- Time Tracking on tasks.
- CRUD on durations.
