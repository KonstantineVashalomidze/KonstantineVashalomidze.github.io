# Code Commenting Ethics: When Over-Documentation Hurts Development
### _Striking the right balance between clarity and clutter in your codebase._

# Table of Contents

[Introduction](#introduction)

[The Role of Comments in Code](the-role-of-comments-in-code)

[Over-documentation: Issues and Consequences](#over-documentation-issues-and-consequences)

[Striking the Right Balance](#striking-the-right-balance)

[Conclusion](#conclusion)

## Introduction

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*“Comment your code!”* It’s advice every developer has heard at some point in their career. Good comments can be a lifesaver—offering clarity in legacy code, 
and providing context for collaborators. But what happens when this advice is taken too far? When comments are scattered everywhere, explaining the obvious, or worse, contradicting
the code itself, they stop being helpful and start becoming a source of misunderstanding. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Over-documentation](https://doakio.com/blog/the-dark-side-of-over-documentation-why-less-can-be-more/) is a silent productivity killer. It slows down debugging, confuses new team members, and can even create a false sense of security in the codebase. In this 
article, we’ll determine the ethics of code commenting, how over-documentation hurts development, and the principles for striking the perfect balance between clarity and mess.

## The Role of Comments in Code

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Programmers use comments not only to explain their code's purpose but also to simplify the understanding process of complex or challenging parts, provide context for decisions, and improve collaboration 
among team members. Comments act as a form of documentation, serving as a guide for future developers—or even the original author—to understand and modify the code efficiently. 
[Documenting code](https://blog.codacy.com/code-documentation) and explaining it clearly is exactly why writing well-structured, readable code with meaningful comments is so important. Programs often outlive 
the expectations of their creators, sometimes persisting long after the original developer has moved on. Eventually, someone else will have to maintain the program, and they need to be able to understand how
it works. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Remember, your audience isn’t the compiler; it’s other human beings. Just because your program compiles doesn’t mean it’s comprehensible to someone else. 
Write your code as if it’s meant to be read, understood, and improved by another person.

## Over-documentation: Issues and Consequences

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In today’s world, information is everywhere—whether it’s scrolling through endless posts on Reddit, diving into a company’s huge internal wiki, 
or managing emails with attachments. While having access to so much information might seem like an advantage, it often creates a problem: too much of it can make things harder, not easier. While documentation
is important for keeping records, and organizational purposes, large documentation brings significant challenges. One such issue is the difficulty of shifting through huge amounts of information to find relevant
and essential details. Such big data makes it more challenging to identify critical information and thus make decisions. Information overload overwhelms individuals, can led to 
[cognitive fatigue](https://www.medicalnewstoday.com/articles/cognitive-fatigue), stress and unproductivity. The mental exhaustion caused by this results in decreased efficency. Such large documentations also 
introduces confusion and misinformation. When many people add information in different places, it will be most likely that some of it may conflict or be incorrect. This makes it hard to know what's true and what
isn't, which, once again, leads to making mistakes or bad decisions. And that's not all, over-documenting rises significant privacy concerns. In the digital era, the huge number of data and collection of 
information increase risk of teft, and unauthorized access to the resource. The more information documented and stored, the greater the vulnerabilty to security threats. 

## Striking the Right Balance

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Finding the sweet spot between under- and over-documentation is very important for a productive and maintainable codebase. Too little documentation can leave developers 
guessing at the purpose of a piece of code, while doing it too much can drawn them in unnecessary details and significantly slow down the development process. To keep the balance one should understnad how to 
use comments effectively, keeping them focuesd, concise and relevant.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The first principle is understanding that **comments should explain the _why_ of the code, not the _what_.** The code itself should be clear enough to determine _what_ it does. If the code is difficult to understand
at first glance, the real issue might lie with the code itself, not the lack of comments. A good developer should aim to write code that speaks for itself, and comments should only be used to clarify decisions
or assumptions that are not immediately obvious (like pre / post conditions for certain operations). 

```java
// Correct: Explaining the reasoning behind a decision
// We use a hash map here to ensure constant time complexity lookups for larger datasets.
Map<String, User> userCache = new HashMap<>();

// Incorrect: Commenting obvious behavior
// This loop iterates over the list of users
for (User user : userList) {
    // Some processing logic
}
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In first example, the comment has meaningful context for the choice of data structure based on performance consideration. The second example just restates what's 
already obvious. Thus first comment is correct one.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sometimes it is better to just **avoid comment at all.** Comments that simply restate the code, add noise to the codebase without offering any value. For instance, a comment
stating _"increment the counter"_ on the line that increments a counter is unnecessary. This not only floats around into the codebase and wasetes space but also gets the focus of the reader and thus wasting time.

```java
// Redundant: Restating what the code does
counter = counter + 1;  // Increment the counter by 1

// Better: Avoid unnecessary restatement
counter++;
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The third one is to **keep them concise and specific.** While comments should provide essential context, they should also be concise. Avoid long explanations that could overwhelm
readers. A comment should be focused on explaining the reasoning behind a decision or clarifying complex logic, not on offering full history lesson. :D

```java
# Bad: Overly detailed explanation for a simple decision
# The reason we are using a list here instead of a dictionary is that
# dictionaries have a higher memory overhead, and lists are much more 
# efficient when we only need to store sequential data without requiring 
# key-based lookups. We don't need to perform lookups in this case, so a 
# list is the better choice. A list is simpler, more memory-efficient, 
# and is faster when iterating through the elements.

data = [1, 2, 3]  

# Good: Concise and relevant comment
data = [1, 2, 3]  # Use a list for memory efficiency, no need for key-based lookups

```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next one is to use comments to **explain complex logic.** Sometimes and very often a code may involve complex non-intuitive logic. In this cases, comments are real gems. Explain 
the approach, assumptions or trade-offs. However be careful, if a piece of code is too complicated to explain in a comment, it's worth considering whether it can be simplified or 
[refactored](https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672).

```java

// Bad: No explanation of why this approach is used
int result = (a * b) / c; 

// Good: Explaining the reasoning behind complex logic
// The division by 'c' here is intentionally done after multiplication to avoid 
// rounding errors that can occur with floating-point division before multiplication.
int result = (a * b) / c;

```
For example in above the second comment adds value by explaining why the order of operations was chosen. This helps future developers who may encounter similar issues with floating point precsion.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;One of the most commong problem with over-documentation is failling to **update comments** as the code evolves. A comment that once made sense may no longer be accurate if the 
code changes. This can lead to misleading information and cause confusion. Always make sure that comments are updated whenever the corresponding code is modified.
```java

# Old comment reflecting outdated code logic
# This function adds two numbers together and returns the result.
def add_numbers(a, b):
    return a - b  # Error! The operation should be addition, not subtraction.
    
# Fixed comment and code
# This function subtracts two numbers and returns the result.
def add_numbers(a, b):
    return a - b

```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last rule in our list is to **use documentation for high-level concepts.** Inline comments are as important as high-level documentations. High-level documentations should be 
used to explain overall design decisions, the architecture, behavior and pre / post conditions. This can be done in documentation files, class-level comments, or docstrings, depending on the language.

```java

/**
 * Class that handles user authentication.
 * This class verifies user credentials and manages session tokens.
 */
public class AuthService {
    
}


```

## Conclusion

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Striking the balance between over-and under-documenation is important for a well-maintained and efficient codbase. Over-documenation can lead to confusion, inneficiency and 
unnecessary cognitive load, while too little documentation can make codebase difficult to maintain and understand. So dear fellow developers please spend some time while making documentation this will change 
life thwards good! 

Author Konstantine Vashalomidze
19.12.2024

