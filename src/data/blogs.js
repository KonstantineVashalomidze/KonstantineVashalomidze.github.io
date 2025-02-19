export const blogs = [
  {
    id: 1,
    title: "The Return of Retro Web Design",
    date: "2024-01-01",
    excerpt: "Exploring the resurgence of retro web design aesthetics...",
    content: `
# The Return of Retro Web Design

In recent years, we've seen a fascinating trend in web design: the return of retro aesthetics.

![Retro Design Example](https://via.placeholder.com/800x400)
*Example of a retro-inspired web design*

## Why Retro?

* Simple and clear layouts
* High contrast for better readability
* Distinctive personality
* Nostalgic appeal

## Implementation Example

Here's how you can create a retro-style button:

\`\`\`css
.retro-button {
  background: white;
  border: 2px solid #2d334a;
  padding: 8px 16px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
}

.retro-button:hover {
  background: #2d334a;
  color: white;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
}
\`\`\`

![Button Example](https://via.placeholder.com/400x100)
*Our retro button in action*

## Code Implementation

Here's a React component example:

\`\`\`jsx
function RetroButton({ children }) {
  return (
    <button className="retro-button">
      {children}
    </button>
  );
}
\`\`\`

Remember, the key is to balance retro aesthetics with modern usability!
    `
  },
  {
    id: 2,
    title: "Building with React in 2024",
    date: "2024-01-15",
    excerpt: "Modern React development practices and patterns...",
    content: `
# Building with React in 2024

React continues to evolve, and with it, our development practices. Let's explore the current best practices and patterns.

## Current Best Practices

1. Functional Components
2. Custom Hooks
3. State Management
4. Performance Optimization

## Code Examples

\`\`\`javascript
function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data
  }, []);
  
  return (
    <div className="retro-container">
      {/* Component content */}
    </div>
  );
}
\`\`\`

Stay tuned for more updates!
    `
  }
]; 