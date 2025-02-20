export const blogs = [
  {
    id: 1,
    title: "Code Commenting Ethics: When Over-Documentation Hurts Development",
    date: "2024-12-19",
    excerpt: "Striking the right balance between clarity and clutter in your codebase. Learn when comments help and when they hinder development.",
    content: `
# Code Commenting Ethics: When Over-Documentation Hurts Development
### *Striking the right balance between clarity and clutter in your codebase.*

## Introduction

*"Comment your code!"* It's advice every developer has heard at some point in their career. Good comments can be a lifesaver—offering clarity in legacy code, 
and providing context for collaborators. But what happens when this advice is taken too far? When comments are scattered everywhere, explaining the obvious, or worse, contradicting
the code itself, they stop being helpful and start becoming a source of misunderstanding.

Over-documentation is a silent productivity killer. It slows down debugging, confuses new team members, and can even create a false sense of security in the codebase. In this 
article, we'll determine the ethics of code commenting, how over-documentation hurts development, and the principles for striking the perfect balance between clarity and mess.

## The Role of Comments in Code

Programmers use comments not only to explain their code's purpose but also to simplify the understanding process of complex or challenging parts, provide context for decisions, and improve collaboration 
among team members. Comments act as a form of documentation, serving as a guide for future developers—or even the original author—to understand and modify the code efficiently.

Remember, your audience isn't the compiler; it's other human beings. Just because your program compiles doesn't mean it's comprehensible to someone else. 
Write your code as if it's meant to be read, understood, and improved by another person.

## Over-documentation: Issues and Consequences

In today's world, information is everywhere—whether it's scrolling through endless posts on Reddit, diving into a company's huge internal wiki, 
or managing emails with attachments. While having access to so much information might seem like an advantage, it often creates a problem: too much of it can make things harder, not easier.

Information overload overwhelms individuals, can lead to cognitive fatigue, stress and unproductivity. The mental exhaustion caused by this results in decreased efficiency. Such large documentations also 
introduces confusion and misinformation. When many people add information in different places, it will be most likely that some of it may conflict or be incorrect.

## Striking the Right Balance

Finding the sweet spot between under- and over-documentation is very important for a productive and maintainable codebase. The first principle is understanding that **comments should explain the _why_ of the code, not the _what_.**

Here's an example of good vs. bad commenting:

\`\`\`java
// Correct: Explaining the reasoning behind a decision
// We use a hash map here to ensure constant time complexity lookups for larger datasets.
Map<String, User> userCache = new HashMap<>();

// Incorrect: Commenting obvious behavior
// This loop iterates over the list of users
for (User user : userList) {
    // Some processing logic
}
\`\`\`

Sometimes it is better to **avoid comments altogether**. Here's an example:

\`\`\`java
// Redundant: Restating what the code does
counter = counter + 1;  // Increment the counter by 1

// Better: Avoid unnecessary restatement
counter++;
\`\`\`

Another key principle is to **keep comments concise and specific**:

\`\`\`python
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
\`\`\`

## Conclusion

Striking the balance between over-and under-documentation is important for a well-maintained and efficient codebase. Over-documentation can lead to confusion, inefficiency and 
unnecessary cognitive load, while too little documentation can make codebase difficult to maintain and understand. So dear fellow developers please spend some time while making documentation this will change 
life towards good!
    `
  }, 
  {
    id: 2,
    title: "",
    date: "2025-02-20"
  }
];