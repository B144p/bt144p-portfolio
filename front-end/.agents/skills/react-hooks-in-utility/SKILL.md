# Skill: React Hooks Hidden in Utility Functions

## Problem

A utility function that internally calls a hook, but is named without the `use` prefix, will silently violate Rules of Hooks when called conditionally in JSX.

```tsx
// BAD — calls a hook inside, but looks like a plain function
export const breakpointCheck = ({ mode, breakpoint }) => {
  const windowWidth = useWindowWidth(); // hidden hook
  return eval(windowWidth + mode + breakpoint);
};

// Crashes when called inside a conditional branch:
{loading ? (
  <Skeleton />
) : (
  <div style={{ paddingTop: breakpointCheck({ mode: "<=", breakpoint: 768 }) ? "2rem" : "0" }} />
)}
```

**Error**: `Uncaught Error: Rendered fewer hooks than expected.`

React tracks hook call order per render. When `loading` is `true`, `breakpointCheck` is skipped → the `useState`/`useEffect` inside the hidden hook aren't called → count mismatches → crash.

## Fix Option 1: Make the utility pure (preferred when reactivity isn't needed)

Read the raw value directly instead of going through a hook:

```tsx
// GOOD — pure function, safe to call anywhere
export const breakpointCheck = ({ mode, breakpoint }: Props): boolean => {
  return eval(window.innerWidth + mode + breakpoint);
};
```

Trade-off: not reactive to window resize. Acceptable for layout decisions made at render time (values are still correct on each render and after navigation).

## Fix Option 2: Rename to `useXxx` and hoist to component top level

If reactivity on resize is required, the function must become a proper hook:

```tsx
// Rename to signal it's a hook
export const useBreakpointCheck = ({ mode, breakpoint }: Props): boolean => {
  const windowWidth = useWindowWidth();
  return eval(windowWidth + mode + breakpoint);
};

// Call unconditionally at the top of the component:
const isSmall = useBreakpointCheck({ mode: "<=", breakpoint: EBreakpoints.sm });

return loading ? <Skeleton /> : <div style={{ paddingTop: isSmall ? "2rem" : "0" }} />;
```

## Rule of Thumb

If a function calls any hook (`useState`, `useEffect`, `useRef`, etc.), it **must**:
1. Be named `useXxx`
2. Only be called at the top level of a component or another hook — never inside conditions, loops, or callbacks

A function called inside JSX props or conditional branches **cannot** call hooks.
