### **Task: Create a React Application for Portfolio & Blog (Deployable on GitHub Pages)**

#### **General Requirements:**
- The application should be deployable on GitHub Pages.  
- Design should be **lightweight**, **retro-style**, with **minimal dark colors**.  
- Navigation Bar with the following links:  
  - **Home**  
  - **Projects**  
  - **Blogs**  
  - **About**  
- **Data Management:**  
  - The application should allow **easy addition of new data** (projects, blog posts, social links, etc.).  
  - Consider using **JSON files, Markdown files**, or **CMS integration** (like Netlify CMS or Contentlayer) for content management.  
  - Adding, updating, or removing data should not require changing the code.  

---

#### **Page Specifications:**

### **1. Home Page:**  
- **Title** and **introductory content** at the top.  
- **Latest Projects Section:**  
  - Displays a list of recent projects.  
  - Each project card should include:  
    - Project preview image  
    - Project name  
    - Project description  
    - Tags  
    - “View Project” button  
- **Recent Blogs Section:**  
  - Displays a list of recent blog posts.  
  - Each blog item should include:  
    - Blog title  
    - Date  
    - Blog post preview  
    - “Read more” button  
- **Footer:**  
  - Buttons for social links: GitHub, LinkedIn, Twitter  
  - **Easily extendable** to add new links.  

---

### **2. Projects Page:**  
- **Title** and **general content** at the top.  
- **List of projects** (same structure as the home page project section):  
  - Project preview image  
  - Project name  
  - Description  
  - Tags  
  - “View Project” button  

---

### **3. Blogs Page:**  
- **Title** and **general content** at the top.  
- **List of blog posts** (same structure as the home page blog section):  
  - Blog title  
  - Date  
  - Preview text  
  - “Read more” button  

---

### **4. About Page:**  
- Should include the following:  
  - Profile picture  
  - Name field  
  - Location  
  - Bio section  
  - Skills list  
  - Experience section  
  - Education section  
  - Certificates (supporting multiple formats)  

---

### **5. Project Detail Page:**  
Each project detail page should contain:  
- Project title  
- Project preview image  
- Tags  
- Project overview  
- Technologies used  
- Features  
- Links (e.g., GitHub, live demo)  
- Additional relevant details  

---

#### **How to Easily Add Data:**  
- Use **JSON or Markdown files** for storing project and blog data.  
- Create a **content folder** where you can add new files without modifying components.  
- For dynamic content fetching, consider tools like:  
  - **Contentlayer**: For Markdown content with easy data management.  
  - **Netlify CMS**: For a user-friendly interface to manage content.  
  - **Strapi (optional)**: If you want a headless CMS with more features.  
