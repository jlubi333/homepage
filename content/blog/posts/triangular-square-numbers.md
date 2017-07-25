---
title: Triangular-Square Numbers
publishDate: 2016-08-08
---

I recently saw [a video][matt-parker-video] by the excellent Matt Parker posing
a puzzle: is 36 the only triangular-square number? Watch the video, try it out
for yourself (if you want), and come back here to see my solution (if you want)!

## My Solution

We start with the equation:

\\[
n^2 = \frac{m (m + 1)}{2}
\\]

Rewriting:

\\[
2n^2 = m^2 + m
\\]

Now we will make the right-hand side a perfect square (by completing the
square):

\\[
\begin{align}
2n^2 &= m^2 + m + \frac{1}{4} - \frac{1}{4} \\\
2n^2 &= \left(m + \frac{1}{2}\right)^2 - \frac{1}{4} \\\
2n^2 + \frac{1}{4} &= \left(m + \frac{1}{2}\right)^2
\end{align}
\\]

However, the \\(+1/2\\) does not lend itself very well to finding integer
solutions. As such, we will let:

\\[
\begin{align}
x &= n \\\
y &= 2\left(m + \frac{1}{2}\right)
\end{align}
\\]

And so:

\\[
\begin{align}
\frac{1}{4}y^2 &= \frac{1}{4} \left[ 2\left(m + \frac{1}{2}\right) \right]^2 \\\
&= \frac{1}{4} \cdot 4 \cdot \left(m + \frac{1}{2}\right)^2 \\\
&= \left(m + \frac{1}{2}\right)^2
\end{align}
\\]

Now \\((x, y)\\) will be an integer solution to the equation:

\\[
2x^2 + \frac{1}{4} = \frac{1}{4}y^2
\\]

Moving the variables to the left and eliminating fractions, we get:

\\[
\begin{align}
2x^2 - \frac{1}{4}y^2 &= -\frac{1}{4} \\\
8x^2 - y^2 &= -1 \\\
y^2 - 8x^2 &= 1
\end{align}
\\]

By inspection, we see that the smallest such solution to this is \\(y = 3, x =
1\\) (other than the trivial solution \\(y = 1, x = 0\\)). Keep this in mind.

*(\\(y^2 - 8x^2 = 1\\) is called a [Pell equation][pell], by the way,
because it is of the form \\(a^2 - Db^2 = 1\\).)*

Note that this equation is a difference of squares. Recall that \\(a^2 - b^2 =
(a + b)(a - b)\\). In this case, \\(a^2 = y^2\\) and \\(b^2 = 8x^2\\). So, we
have:

\\[
y^2 - 8x^2 = \left(y + x\sqrt{8}\right)\left(y - x\sqrt{8}\right)
\\]

We know that our solution (y = 3, x = 1) works, so let us now plug it in:

\\[
\left(y + x\sqrt{8}\right)\left(y - x\sqrt{8}\right) = \left(3 +
1\sqrt{8}\right)\left(3 - 1\sqrt{8}\right) = 1
\\]

Fortunately for us, all of this is just equal to \\(1\\). For all integers
\\(k\\), \\(1^k\\) is equal to \\(1\\), so we can raise \\(\left(3 +
1\sqrt{8}\right)\left(3 - 1\sqrt{8}\right)\\) to the power of any non-negative
integer \\(k\\) and our equation will still hold. This allows us to find all
values (not just one) for \\(y\\) and \\(x\\) such that our equation holds.

\\[
\begin{align}
\left(y + x\sqrt{8}\right)\left(y - x\sqrt{8}\right)
    &= \left[\left(3 + \sqrt{8}\right)\left(3 - \sqrt{8}\right)\right]^k
    = 1^k = 1 \\\
\left(y + x\sqrt{8}\right)\left(y - x\sqrt{8}\right)
    &= \left(3 + \sqrt{8}\right)^k \left(3 - \sqrt{8}\right)^k
\end{align}
\\]

Because \\(y\\) and \\(x\\) are integers, we see that the first term of the left
side must be equal to the first term of the right side, and the second term of
the left side must be equal to the second term of the right side. This leaves us
with a system of two equations:

\\[
\\begin{align}
y + x\sqrt{8} &= \left(3 + \sqrt{8}\right)^k \\\
y - x\sqrt{8} &= \left(3 - \sqrt{8}\right)^k
\end{align}
\\]

Subtracting the two equations (to eliminate \\(y\\)) yields:

\\[
\begin{align}
2x\sqrt{8} &= \left(3 + \sqrt{8}\right)^k - \left(3 - \sqrt{8}\right)^k \\\
x &= \frac{\left(3 + \sqrt{8}\right)^k - \left(3 - \sqrt{8}\right)^k}{2\sqrt{8}}
\end{align}
\\]

Adding the two equations (to eliminate \\(x\sqrt{8}\\)) yields:

\\[
\begin{align}
2y = \left(3 + \sqrt{8}\right)^k + \left(3 - \sqrt{8}\right)^k \\\
y = \frac{\left(3 + \sqrt{8}\right)^k + \left(3 - \sqrt{8}\right)^k}{2}
\end{align}
\\]

Now we will substitute \\(x\\) and \\(y\\) into our equations that relate to
\\(n\\) and \\(m\\).

\\[
\begin{align}
x &= n, \\\
\therefore n &= x; \\\
y &= 2\left(m + \frac{1}{2}\right), \\\
\therefore m &= \frac{y - 1}{2}.
\end{align}
\\]

This finally leaves us with:

\\[
\begin{align}
n &= \frac{\left(3 + \sqrt{8}\right)^k - \left(3 - \sqrt{8}\right)^k}{2\sqrt{8}}
\\\
m &= \frac{\left(3 + \sqrt{8}\right)^k + \left(3 - \sqrt{8}\right)^k - 2}{4}
\end{align}
\\]

for any non-negative integer \\(k\\). ☺

## Interactive Formula

[Here][interactive] is an interactive version of the formula above using the
wondrous [Desmos graphing calculator][desmos]. Slide \\(k\\) around to see the
different values of \\(n\\) and \\(m\\)!

[matt-parker-video]: https://www.youtube.com/watch?v=Gh8h8MJFFdI
[pell]: http://mathworld.wolfram.com/PellEquation.html
[interactive]: https://www.desmos.com/calculator/y1eft0kvwx
[desmos]: https://www.desmos.com/
