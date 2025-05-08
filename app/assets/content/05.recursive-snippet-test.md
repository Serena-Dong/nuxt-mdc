# Recursive snippet content

## Section 1: Recursive snippet calling itself

The following snippet is a snippet that contains itself as a snippet. It should only render once, ignoring the recursive part

---

::snippet{name='recursive-alert'}
::

---

## Section 2: Calling a snippet that calls a recursive snippet

Here we call, the `recursive-nested` snippet, which calls the `recursive-calendar` snippet, which calls the `recursive-nested` snippet again.

This is a test to see if the recursive part is ignored.

::snippet{name='recursive-nested' style='border: 1px solid black;'}
::
