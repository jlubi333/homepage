---
title: The Tower of Hanoi
publishDate: 2016-07-07
---

The [Tower of Hanoi][tower-wikipedia] is a fun mathematical puzzle involving
moving rings on three pegs.

![The Tower of Hanoi puzzle with eight rings.][hanoi]

The game starts with a set of rings stacked one atop the other in decreasing
size on the left-most peg. The goal of the game is to move all of the rings
from the left-most peg to the right-most peg. The only restriction is that you
cannot place a larger ring on top of a smaller ring. If you want to try it out
yourself, [here][game] is a link to an online version of the game.

In the bottom-left of the game window, you will see that the game displays the
minimum number of moves needed to complete the puzzle for a given number of
rings. This is actually a very fun question to explore!

## The Minimum Number of Moves

Let's let \\(M(n)\\) denote the minimum number of moves to solve the Tower of
Hanoi puzzle with \\(n\\) rings. Assuming that the interactive game I linked to
is accurate (trust me, it is---and we'll prove it later!), we can create the
following table:

| \\(n\\) | \\(M(n)\\) |
|---------|------------|
| 3       | 7          |
| 4       | 15         |
| 5       | 31         |
| 6       | 63         |
| 7       | 127        |
| 8       | 255        |

If you've ever worked with binary numbers in computer science, the column for
\\(M(n)\\) should jump out to you. It suggests the formula \\(M(n) = 2^n -
1\\) (the powers of two minus one). But why would this be? Is there a deeper
mathematical link between the powers of two and the Towers of Hanoi?

Of course there is! Why else would I be showing you this? First, let's come up
with a way to solve the Tower of Hanoi optimally, and from there, we can count
how many moves we take.

Let's first lay down some basic ideas. We know that \\(M(n)\\) will give us the
optimal moves for a stack of size \\(n.\\) In fact, \\(n\\) can be any natural
number: \\(12\\), \\(7\\), \\(143\\), or even \\(0\\) (\\(M(0) = 0\\) because
it takes zero moves to move zero rings!). This means that a stack of size, say,
\\(n - 1\\) will be solvable in \\(M(n-1)\\) moves. We now have all the
background understanding that we need to find some sort of formula for
\\(M(n).\\)

I encourage you to think about how you would solve the Towers of Hanoi! What
strategies might you employ? Is there a way to simplify the problem?

Before I give you the solution, let me give you one more hint. In situations
like these, mathematicians tend to ask themselves the following question: how
can I reduce this complex problem into a smaller, more managable one? In this
case, consider how one might reduce a puzzle of size \\(n\\) into a puzzle of
size \\(n - 1.\\)

## The Solution

Our goal is to come up with a way to reduce a puzzle of size \\(n\\) into one of
size \\(n - 1.\\) If we can do that, we can actually solve a puzzle of any size!

Consider the concrete example where \\(n = 5.\\) If we can find a way to express
this in terms of \\(n - 1\\), then we will only need to solve the puzzle where
\\(n = 5 - 1 = 4.\\) But to solve a puzzle of size \\(4\\), we will only need to
solve a puzzle of size \\(3\\) and use our special reduction rule we came up
with! And to solve a puzzle of size \\(3\\) we must solve one of size \\(2\\),
and so on and so forth until we are left with a puzzle of size zero. But we know
how to solve a puzzle of size zero: there is nothing to do! That is, \\(M(0) =
0.\\)

Equipped with this knowledge, let's try to come up with the reduction rule. Here
is my solution:

1. From the starting position, move the stack of size \\(n-1\\) that is above
   the largest ring from the left pole to the middle pole. This will take \\(
   M(n - 1) \\)  moves, because it is equivalent to a puzzle of size \\(n -
   1\\): we are moving a tower of \\(n - 1\\) rings from one pole to the next.
   Note that one can simply ignore the largest ring and pretend as if it were
   not there---it will not at all interfere with the process of moving the
   smaller rings because it is larger than all of the other rings, and therefore
   any ring can be placed on it as if it were the normal base of the puzzle.
1. Transfer the largest ring from the left pole to the right pole. This will
   take \\(1\\) move.
1. Transfer the stack of size \\(n - 1\\) from the middle pole to the right
   pole. In a similar manner to the first step, this will take \\(M(n - 1)\\)
   moves.


Adding up all the moves from each step gives us:

\\[
M(n) = M(n - 1) + 1 + M(n - 1) = 2M(n - 1) + 1
\\]
with \\(M(0) = 0.\\)

This will give us the correct answer for any value of \\(n\\), but it is not in
explicit form. Rather, we must compute the value for \\(M(n)\\) *recursively*.
In other words, to calculuate (for example) \\(M(100)\\), we must calculuate
\\(M(99)\\), and to calculuate \\(M(99)\\), we must calculuate \\(M(98)\\), and
so on and so forth. That's a huge number of computations for one simple answer!
Using this recursive formula (formally known as a [recurrence
relation][recurrence-relation]), can we come up with a better, explicit formula
for \\(M(n)\\)?

Based on the previous leading questions that I've asked you in this blog post,
I'm sure that you know the answer.

## An Explicit Formula for \\(M(n)\\)

Let's try messing around with our recurrence relation to see if we can come up
with an explicit formula.

\\[
\begin{align}
M(n) &= 2M(n-1) + 1 \\\
M(0) &&= 0 \\\
M(1) &= 2M(0) + 1 &= 1 \\\
M(2) &= 2M(1) + 1 = 2(1) + 1 &= 3 \\\
M(3) &= 2M(2) + 1 = 2(3) + 1 &= 7 \\\
M(4) &= 2M(3) + 1 = 2(7) + 1 &= 15 \\\
M(5) &= 2M(4) + 1 = 2(15) + 1 &= 31 \\\
M(6) &= 2M(5) + 1 = 2(31) + 1 &= 63
\end{align}
\\]

This strengthens our initial, unproved conjecture that \\(M(n) = 2^n - 1.\\) But
can we prove it? <span>(Once again, you know the answer.)</span>{: .mutter}

We will use the technique of [mathematical induction][mathematical-induction] to
prove this. First, we will prove that our formula works for our "base case" of
\\(n = 0\\):

\\[
\begin{align}
M(0) &= 0 \\\
2^0 - 1 &= 0 \quad \checkmark
\end{align}
\\]

Now we will let \\(n\\) take on any value \\(k.\\) This is our hypothesis step.

\\[
M(k) \stackrel{?}{=} 2^k - 1
\\]

And finally we shall prove that if our formula holds for \\(n = k\\), it will
hold for \\(n = k + 1.\\) This is our induction step.

\\[
\begin{align}
M(k + 1) &= 2M(k) + 1 \\\
&= 2(2^k - 1) + 1 \\\
&= 2(2^k - 1) + 1 \\\
&= 2 \cdot 2^k - 2 + 1 \\\
&= 2^{k + 1} - 1 \quad\quad\quad \checkmark
\end{align}
\\]

And so, our formula holds! Because we proved it the formula to be true for \\(n
= 0\\) and we proved that if it works for \\(k\\), it will work for \\(k + 1\\),
we have proved that it will work for all natural numbers!

Note that the base case is very important, because if it did not hold, then our
hypothesis would be useless. Our hypothesis relies on the fact that there is a
base case. Without the base case, the hypothesis means nothing!

For example, even if I somehow proved the statement "If my name is John, then my
eyes are blue" to be true, it would be completely useless. My name is Justin, so
even if this hypothesis were true, it would tell you nothing about the color of
my eyes. In this statement, my name being John acts in a very similar way to the
base case of our inductive proof.

## Conclusion

In this blog post, we went from intuitively conjecturing the minimum number of
moves to solve the Tower of Hanoi puzzle with an arbitrary number of rings to
finding a recursive and explicit solution to the problem. But this is not the
end of the Tower of Hanoi problem! There are a few natural extensions that may
be interesting to pursue.

- What happens if there are more than three pegs?
- For what values of \\(n\\) is \\(M(n)\\) defined? Can we extend this
  definition to include, say, negative numbers? Fractions? Real numbers?
- What happens if the rings are sized differently than in the original problem?

I don't know the answers to these questions, but these are just a few extensions
that immediately came to my mind when thinking about the problem. There may be
no solution to these problems, or infinitely many! Have fun toying around with
them.

That is the true spirit of mathematics, after all!

[tower-wikipedia]: https://en.wikipedia.org/wiki/Tower_of_Hanoi
[game]: https://www.mathsisfun.com/games/towerofhanoi.html
[recurrence-relation]: https://en.wikipedia.org/wiki/Recurrence_relation
[mathematical-induction]: https://en.wikipedia.org/wiki/Mathematical_induction

[hanoi]: https://upload.wikimedia.org/wikipedia/commons/0/07/Tower_of_Hanoi.jpeg "::Wikimedia Commons"
