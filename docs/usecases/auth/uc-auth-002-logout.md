# UC-AUTH-002: Đăng xuất hệ thống

**Module**: Authentication
**Actor**: Staff / Admin
**Priority**: Critical
**Last Updated**: 2026-03-31

## Precondition

- User is currently logged in with a valid session (staff or admin role)

## Main Flow

1. User clicks "Đăng xuất" button in the sidebar bottom area
2. System clears the user role state (sets to null)
3. System renders the Login screen
4. All protected routes become inaccessible

## Alternative Flows

None.

## Exception Flows

None.

## Postcondition

- User session is terminated
- Login screen is displayed
- No protected content is accessible without re-authentication

## Business Rules

- BR-001: Logout resets all role state, requiring fresh login
