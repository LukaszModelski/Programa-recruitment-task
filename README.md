# Angular-Developer

## Code source
Code example comes from Angular tutorial: [Tour of Heroes](https://angular.io/tutorial)<br>
Live editor version: https://stackblitz.com/angular/jxqeenxxvqm <br>
Direct link: https://angular.io/generated/zips/toh-pt6/toh-pt6.zip

## User tasks

### Hero age

- As a User I want to be able to store the hero's age
  - age is a positive integer number
  - a hero must be at least 18 years old, and cannot be older that 500 years
    - validation required
    - show a red message next to the age edit control
  - age isn't presented on the list of heroes
  - the age value is optional
  
### Hero experience

- As a User I want to see the hero's experience on the hero's details screen
  - the hero's level is presented below the hero's age input
  - there are following experience values:
    - junior for age below 100
    - professional for age >=100 and <250
    - expert for age >=250
    - undetermined for empty age
    
### Messages section
- As a User I don't want to see the messages section on the production environment
  - keep it for development only
  
### Navbar buttons
- As a User I want the current navigation button to be highlighted
  - for route `/dashboard` button Dashboard should be highlighted
  - for route `/heroes` button Heroes should be highlighted
  - for other routes no navigation button should be highlighted

### Hero search
- As a User I want the search results to appear after at least two characters typed

- As a User I want the search results' style to be dependent on the hero's experience
  - green text color for junior
  - black text color for professional
  - blue text color for expert
  - gray text color for undetermined

### Heroes list
- As a User I want to see the hero's age and experience on heroes list

- As a User I want to see the total number of heroes below the list
  - just below the list a paragraph should appear
  - content: "Total number of heroes is: x."

### changes in progress
- As a User I want the unsaved data to be protected 
  - all route changing operations (like nav bar or back button) should check for unsaved data
  - checking should work for changing details and adding new hero
  - the simple confirmation message should be displayed, like so: "Your data could be lost, are you sure? (yes/no)"
  - when user chooses 'yes', route change can go on
  - when user chooses 'no', route change should be canceled

## Refactoring tasks

### Model driven forms
- please refactor all forms to be model driven

### observable and async
- please refactor lists to expose observable to template, and use `async` pipe to get the value

### SCSS
- please refactor the code to use SCSS instead of CSS

## Technical tasks

### ng lint
- command `ng lint` does not work, please fix the problem

### code coverage
- unit test code coverage analytics does not work, please fix problem
- `ng test -cc` should produce code coverage report
- **all your code should be reasonably covered by unit and protractor tests**
