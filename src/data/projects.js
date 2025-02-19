export const projects = [
  {
    id: 1,
    title: "Virtual Arena - Article Sharing Platform",
    description: "A virtual arena is a platform that allows users to share articles with each other. It has planty features like creating articles, liking, commenting, and much more.",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQFWpqX41FetKQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1734354280961?e=1740607200&v=beta&t=9axusXqe6fZ8YLXyNHxC8ykDx63LvQxj1_IbUrgF3QY",
    gallery: [
      {
        id: 1,
        url: "https://media.licdn.com/dms/image/v2/D4D2DAQFWpqX41FetKQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1734354280961?e=1740607200&v=beta&t=9axusXqe6fZ8YLXyNHxC8ykDx63LvQxj1_IbUrgF3QY",
        caption: "Article Details"
      },
    ],
    tags: ["React", "Spring Boot", "Material-UI", "MongoDB", "Redux Toolkit", "Swagger", "CI/CD"],
    overview: "Developed a full-stack article-sharing platform with secure JWT authentication, email verification, and role-based access control. Created a responsive UI with features like infinite scroll, nested comments, and social sharing. Integrated MongoDB for data persistence and Redux Toolkit for state management, deploying the application on Render with CI/CD pipelines.",
    features: [
      "Responsive Design",
      "Pagination",
      "Blog Creation",
      "User Profile",
      "Article Like / Dislike",
      "Article Comment",
      "Article Share",
      "Article edit",
      "Article delete",
      "Article Create",
      "Nested comments section with replies",
      "Authentication",
      "Password Change",
      "Email Verification",
      "Complex Queries for Feed",

    ],
    technologies: ["React 18", "Material-UI (MUI)", "Redux Toolkit", "Draft.js", "React Router v6", "Axios", "date-fns", "React Toastify", "Spring Boot 3.3.5", "Java 17", "MongoDB", "Spring Security with JWT", "SpringDoc OpenAPI", ],
    github: "https://github.com/virtual-arena-platform",
    demo: "https://virtual-arena-frontend.onrender.com/"
  },
  {
    id: 2,
    title: "Financial Instruments Platform",
    description: "This is the application that I was working during my internship at devexperts",
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQEQe5ijw42qvA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1734355568283?e=1740610800&v=beta&t=32pe4Lu8DBKWQIC8_dI3jOzUBN7lmguWcvUVgUt_F2M",
    tags: ["Spring Boot", "react", "WebSocket", "RxJava", "jwt", "docker", "REST"],
    overview: "Built a scalable, real-time financial data application. Implemented WebSocket communication for live data streaming and chat functionality. Designed JWT-based authentication and optimized performance with an LRU cache for popular data access.",
    features: [
      "Real-time data about financial instruments that can be subscribed / unsubscribed",
      "Real-time chat between users",
      "Highly scalable",
      "Configured to optimize queries for users which are most active",
      "LRU cache implementation for fast data fetching for most famous instruments",
      "3 service communication",
      "Mock data generation",
      "Responsive design",
    ],
    technologies: ["Spring Boot", "react", "WebSocket", "RxJava", "jwt", "docker", "REST"],
    github: "https://github.com/financial-instruments-platform",
    demo: "https://financial-instruments-platform-frontend.onrender.com/register"
  },
  {
    id: 3,
    title: "Storage Management System",
    description: "Designed a storage management system using Java and Neo4j, featuring data analysis charts, substring search, and user registration.",
    image: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img_2.png",
    gallery: [
      {
        id: 1,
        url: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img.png",
        caption: "Data Table View"
      },
      {
        id: 2,
        url: "https://github.com/KonstantineVashalomidze/storage-management/raw/main/src/main/resources/demo/img_1.png",
        caption: "Smart Search Functionality"
      },
      {
        id: 3,
        url: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img_2.png",
        caption: "Graph Visualization"
      },
      {
        id: 4,
        url: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img_3.png",
        caption: "Custom Calendar Integration"
      },
      {
        id: 5,
        url: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img_4.png",
        caption: "Time Based Analytics"
      },
      {
        id: 6,
        url: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img_5.png",
        caption: "Product Performance Analysis"
      },
      {
        id: 7,
        url: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img_6.png",
        caption: "Profitability Analysis"
      },
      {
        id: 8,
        url: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img_7.png",
        caption: "Supplier Performance"
      },
      {
        id: 9,
        url: "https://raw.githubusercontent.com/KonstantineVashalomidze/storage-management/main/src/main/resources/demo/img_8.png",
        caption: "Inventory Management"
      },
    ],
    tags: ["Core Java", "Neo4j", "JGraphX", "JFreeChart", "Swing"],
    overview: "A sophisticated warehouse management system built with Java Swing and Neo4j, featuring custom UI components and advanced data visualization capabilities.",
    features: [
      "Custom Table View: Sophisticated data presentation with responsive design",
      "Advanced Search: Real-time substring search across all data fields",
      "Dynamic Filtering: Customizable dropdown filters for efficient data navigation",
      "Fullscreen Mode: Responsive resize functionality for optimal viewing",
      "Interactive node-based data representation",
      "Detailed node information panel",
      "Real-time graph manipulation",
      "Connected data visualization",
      "Custom Calendar Integration: Time period selection for sales analysis, Intuitive date range picker",
      "Performance Metrics: Total sales over time,Top 10 best-selling products (by units), Top 10 most profitable products, Average delivery time per supplier, Stock level analysis (current vs. minimal)",
      "Security: Custom-built authentication system, User registration with validation, Secure login interface, Role-based access control"
    ],
    technologies: ["Spring Boot", "react", "WebSocket", "RxJava", "jwt", "docker", "REST"],
    github: "https://github.com/KonstantineVashalomidze/storage-management",
    demo: "https://github.com/KonstantineVashalomidze/storage-management"
  }
]; 