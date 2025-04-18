# Alert snippet

This is an alert message I need to be rendering as Markdown. This alert can be inserted in any markdown page to provide reusable information.

- Alert 1
- Alert 2

This snippet is very big and should also have some code inside it.

```js
console.log("Hello, world!");
```

Below is a recursive snippet (i.e. the alert snippet is calling itself). It should not render anything

**recursive-alert** should NOT APPEAR below

---

::snippet{name='recursive-alert'}
::

---
