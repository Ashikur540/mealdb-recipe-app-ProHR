# Tailus Feedus Website

A feature-rich meal website that allows users to explore meals, search recipes, and manage their cart with account synchronization. The task includes resolving bugs, optimizing functionalities, and adding new features to enhance the user experience.

## Features

**Core Functionality**

- Explore Meals: View meals with detailed information and interactive modals.
- Search Meals: Search meals by name or ingredients with combined search functionality.
- Add to Cart: Add meals to the cart, with cart data synced to the database when logged in.
- Authentication

## Bug Fixes

- Meal Searching:
  Fixed search functionality by syncing input value with state, optimizing logic, and enabling API-based searches using useQuery. Added proper loading and empty states for better UX.

- Meal Modal:
  - Fixed the modal not closing issue by implementing a custom hook.
  - Optimized modal behavior with a dedicated "View Recipe" button.
  - Enhanced the modal to display complete meal details with proper loading.
  - Un optimized code

## Added Features

**User Authentication:**

- Integrated Firebase for authentication (Google Login and Email-Password).

**Recipe Categories Page:**

- Added a dedicated page for exploring recipes by categories.

**Enhanced Cart Management:**

- Users can delete items from their cart with changes auto-synced to their account.

**Responsive Design:**

- Improved responsiveness for all pages across devices.

**Core Web Vitals Optimization:**
-Enhanced performance with an LCP of 0.6 (screenshot attached).

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/Ashikur540/mealdb-recipe-app-ProHR.git
   cd [project-folder]

   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Copy env from the env.example file. I provided there all the variables.Create your own `.env.local` file and paste there.

4. Finally run dev server:

   ```
   npm run dev

   ```

## Bug Resolutions

1. **Search Issues**
   Problem: Search functionality was not working.
   Solution:

   - Synced input value with state using the value prop.
   - Removed unnecessary variables and optimized the logic.
   - Integrated useQuery with the API from http-kit to handle searches.

2. Modal Behavior
   Problem: Modal wasn't closing after opening. Besides, Modal didn’t display all meal details.
   Solution:

   - Created a custom hook to handle modal state for a smoother experience.
   - Added a "View Recipe" button to view details.
   - Implemented loading states and completed the meal details display.

3. Responsive: The card was not responsive across device sizes . I fixed them

## Performance (Core Web Vitals):

![performance](https://i.ibb.co.com/hD7r64X/meal-performence-ss.png)

### Total Working Time:

Around 20-22 Hours

## Live Demo and Repository

Live Demo: [Live Link](https://tailus-fedus-meal-app.web.app)

GitHub Repository: [GitHub Link](https://github.com/Ashikur540/mealdb-recipe-app-ProHR)

# Consideration:

Please consider my late submit for the assignment because of my misunderstanding of the deadline i delayed to submit this assignment.
Another thing,

> In deployed site auto sync feature of local cart to users account is not working due to firebase issue. In local dev server this feature works perfectly. Because of the deadline passed i could not able to fix the issue. Please consider my hark work and dedication to the assignment.
