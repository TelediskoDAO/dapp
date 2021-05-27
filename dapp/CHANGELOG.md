# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.2] 2021-05-27

Empty release to test the new update process.

## [0.9.1] 2021-05-27

### Added

- Add "App info" in settings to: manually check for updates, reset app data.

### Changed

- Add confirm button to reset app data.

## [0.9.0] 2021-05-27

### Added

- New logic to handle service worker.

### Changed

- Add failsafe mechanism in case a bogus release is installed.
- Manage runtime errors in the new `core` module.

### Fixed

- Installation process for Safari

## [0.8.2] 2021-05-18

### Fixed

- Fix regression bug that would save the current time but on the next month.

## [0.8.1] 2021-05-12

### Fixed

- iOS devices can now add a new time entry.
- iOS devices display the "install" icon in the main page.

## [0.8.0] 2021-03-19

### Changed

- New icon, splash screen, and default color.

## [0.7.3] 2021-02-23

### Fixed

- Fix regression bug, creating a new duration shows end date again.

### Fixed

- Fix styles filename issue.

## [0.7.1] 2021-02-23

### Fixed

- Remove SCSS to simplify and fix build pipeline.

## [0.7.0] 2021-02-23

### Added

- Integration with ethereum-enabled browsers with detection of network and address.
- Integration with test ERC-20 TelediskoTaler.
- New view for displaying and selling tokens.

### Changed

- Remove the "keep tracking" checkbox from the Time Tracking page.

## [0.6.0] 2021-01-12

### Added

- Add a new view in Reports, showing work that has been done but not approved yet

### Changed

- Edit a duration allows to not specify an end, by doing so, the app goes straight to time tracking

### Fixed

- Fix blank screen on Firefox
- Remove SCSS from Svelte components

## [0.5.2] 2020-11-26

### Fixed

- Regression bug on mark task as "Done"

## [0.5.1] 2020-11-26

### Fixed

- Fix SQL error when marking a task as "Done"

## [0.5.0] 2020-11-26

### Added

- New navigation sidebar to quickly move around the app.
- Header shows the name of the current page.
- Data is refreshed every minute.
- Button to manually refresh the data.
- New report page shows
- "Time tracking" screen has a new button to toggle the visibility of done tasks.
- New "Report" screen shows time sheets yet to be tokenized.

### Changed

- Current task is now in the new sidebar.
- "Time tracking" shows only tasks to do.
- Accepted tasks are now in the new "reports" screen.

### Fixed

- Preload icon font should fix the flickering of the icons.

## [0.4.3] 2020-11-17

### Fixed

- Timeline view: durations that are across multiple days are now displayed correctly.
- Task view: restore total time for task.

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
