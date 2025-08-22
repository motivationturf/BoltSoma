import React, { useState } from 'react';
import { 
  BookOpen, 
  Calculator, 
  Microscope, 
  Code, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Target,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Award,
  Star,
  Clock,
  Brain
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import ReactMarkdown from 'react-markdown';
import Logo from '../ui/Logo';

interface InteractiveLessonContentProps {
  subject: string;
  lessonId: string;
  sectionData: any;
  onComplete: () => void;
  isGuest?: boolean;
}

export function InteractiveLessonContent({ 
  subject, 
  lessonId, 
  sectionData, 
  onComplete, 
  isGuest = false 
}: InteractiveLessonContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);

  // Interactive lesson content for different subjects and topics
  const lessonContent = {
    'computer-studies': {
      'programming-basics': {
        title: 'Programming Fundamentals',
        description: 'Learn the basics of programming and computational thinking',
        gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
        lightGradient: 'from-cyan-50 via-blue-50 to-indigo-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Programming?',
            content: 'Programming is like giving instructions to a computer in a language it understands.',
            examples: [
              { icon: '🤖', text: 'Teaching a computer to solve problems step by step' },
              { icon: '📱', text: 'Creating apps and websites that people use daily' },
              { icon: '🎮', text: 'Building games and interactive experiences' },
              { icon: '🏦', text: 'Automating tasks in businesses and organizations' }
            ],
            chisomoAdvice: '🦅 Programming is like teaching someone to fly! You break down complex movements into simple, clear instructions. In Zambia, programmers create mobile banking apps, agricultural management systems, and educational platforms like this one!'
          },
          {
            type: 'concept-explanation',
            title: 'Variables - Data Containers',
            content: 'Variables are like labeled boxes that store information.',
            codeExample: {
              language: 'python',
              code: `# Creating variables
student_name = "Chisomo"
age = 16
grade = 11
is_present = True

# Using variables
print(f"Hello {student_name}!")
print(f"You are {age} years old")`,
              explanation: 'Variables help us store and reuse information throughout our program.'
            },
            practice: {
              question: 'Create a variable called "school" and assign it the value "Lusaka High School"',
              answer: 'school = "Lusaka High School"',
              hint: 'Remember: variable_name = "value" for text (strings)'
            },
            chisomoAdvice: '🦅 Variables are like the different compartments in my nest - each one holds something specific and important! Just like I organize twigs, leaves, and food in different spots, programmers organize data in variables.'
          },
          {
            type: 'text-lesson',
            title: 'Understanding Data Types',
            content: `In programming, different types of information are stored in different ways. Think of data types as different containers for different kinds of things.

**String (Text)**
Strings are sequences of characters - letters, numbers, symbols, or spaces. They're always enclosed in quotes.

Examples:
• "Hello, Zambia!"
• "Lusaka is the capital"
• "Grade 11 Computer Studies"

**Integer (Whole Numbers)**
Integers are whole numbers without decimal points. They can be positive, negative, or zero.

Examples:
• 42 (age)
• -10 (temperature below zero)
• 0 (starting point)

**Float (Decimal Numbers)**
Floats are numbers with decimal points, used for precise measurements.

Examples:
• 3.14159 (pi)
• 98.6 (body temperature in Fahrenheit)
• 15.5 (distance in kilometers)

**Boolean (True/False)**
Booleans represent yes/no, on/off, true/false values.

Examples:
• True (student is present)
• False (assignment not submitted)

**Lists (Collections)**
Lists store multiple items in a single variable, like a shopping list.

Examples:
• ["apple", "banana", "orange"] (fruits)
• [1, 2, 3, 4, 5] (numbers)
• ["Lusaka", "Ndola", "Kitwe"] (Zambian cities)`,
            chisomoAdvice: '🦅 Data types are like different types of prey I hunt! Fish need to be caught differently than small mammals, and each requires different storage methods. Similarly, text needs quotes, numbers don\'t, and lists use square brackets. Understanding the right type for the right job makes programming much easier!'
          },
          {
            type: 'text-lesson',
            title: 'Control Structures: Making Decisions',
            content: `Programs need to make decisions and repeat actions. Control structures help us control the flow of our program.

**If Statements - Making Decisions**
If statements let programs make choices based on conditions.

Basic structure:
if condition:
    # do something
elif another_condition:
    # do something else
else:
    # do this if nothing else matches

Real example:
temperature = 25
if temperature > 30:
    print("It's hot today!")
elif temperature > 20:
    print("Nice weather!")
else:
    print("It's cool today")

**Loops - Repeating Actions**
Loops help us repeat code without writing it multiple times.

For loops (when you know how many times):
for i in range(5):
    print(f"Count: {i}")

While loops (repeat until condition is false):
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

**Functions - Organizing Code**
Functions are reusable blocks of code that perform specific tasks.

def greet_student(name, grade):
    return f"Hello {name}, welcome to Grade {grade}!"

# Using the function
message = greet_student("Chisomo", 11)
print(message)`,
            chisomoAdvice: '🦅 Control structures are like my hunting strategies! I use "if" statements to decide which prey to chase based on conditions like size and distance. I use loops when I need to search the same area repeatedly. Functions are like my different flying techniques - I have one for soaring, one for diving, and one for landing. Each serves a specific purpose and can be used whenever needed!'
          }
        ]
      },
      'database-intro': {
        title: 'Introduction to Databases',
        description: 'Learn what databases are and why they are important.',
        gradient: 'from-blue-600 via-cyan-600 to-indigo-600',
        lightGradient: 'from-blue-50 via-cyan-50 to-indigo-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is a Database?',
            content: 'A database is an organized collection of data, generally stored and accessed electronically from a computer system. Databases help us store, manage, and retrieve information efficiently.',
            examples: [
              { icon: '🗄️', text: 'Storing student records in a school' },
              { icon: '💳', text: 'Banking systems managing accounts' },
              { icon: '📚', text: 'Library catalogues for books' }
            ],
            chisomoAdvice: '🦅 Databases help keep information organized and easy to find, just like how I organize food in my nest!'
          },
          {
            type: 'text-lesson',
            title: 'Types of Databases',
            content: `There are different types of databases:

**Relational Databases**: Store data in tables (like Excel). Examples: MySQL, PostgreSQL, SQLite.

**NoSQL Databases**: Store data in flexible formats (documents, key-value, graphs). Examples: MongoDB, Redis.

**Cloud Databases**: Hosted online, accessible anywhere. Examples: Firebase, AWS DynamoDB.`,
            chisomoAdvice: '🦅 Just as I use different techniques for different prey, there are different databases for different needs!'
          }
        ]
      },
      'sql-basics': {
        title: 'SQL Basics',
        description: 'Learn to query databases using SQL commands.',
        gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
        lightGradient: 'from-cyan-50 via-blue-50 to-indigo-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is SQL?',
            content: 'SQL (Structured Query Language) is a language used to communicate with relational databases. It helps you create, read, update, and delete data.',
            examples: [
              { icon: '💬', text: 'Asking the database for information' },
              { icon: '✏️', text: 'Adding or changing records' }
            ],
            chisomoAdvice: '🦅 SQL is like my call to other eagles – it helps me get the information I need!'
          },
          {
            type: 'text-lesson',
            title: 'Basic SQL Commands',
            content: `Here are some common SQL commands:

**SELECT**: Get data from a table
    SELECT * FROM students;

**INSERT**: Add new data
    INSERT INTO students (name, age) VALUES ('Chisomo', 16);

**UPDATE**: Change existing data
    UPDATE students SET age = 17 WHERE name = 'Chisomo';

**DELETE**: Remove data
    DELETE FROM students WHERE name = 'Chisomo';
`,
            chisomoAdvice: '🦅 With these commands, you can manage all the information in your database, just like I manage my food supply!'
          }
        ]
      },
      'database-design': {
        title: 'Database Design',
        description: 'Design efficient database structures.',
        gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
        lightGradient: 'from-indigo-50 via-blue-50 to-cyan-50',
        steps: [
          {
            type: 'introduction',
            title: 'Why Design Matters',
            content: 'Good database design makes it easy to store, find, and update information. Poor design can lead to confusion and errors.',
            examples: [
              { icon: '🗂️', text: 'Organizing student data by class and grade' },
              { icon: '🔗', text: 'Linking books to authors in a library' }
            ],
            chisomoAdvice: '🦅 A well-built nest is safe and strong – just like a well-designed database!'
          },
          {
            type: 'text-lesson',
            title: 'Tables, Keys, and Relationships',
            content: `**Tables**: Store data in rows and columns.

**Primary Key**: A unique identifier for each row (e.g., student ID).

**Foreign Key**: A reference to a primary key in another table (e.g., linking a book to its author).

**Relationships**: Connect tables (one-to-many, many-to-many).`,
            chisomoAdvice: '🦅 Relationships in databases are like connections in my eagle family – they help everything work together!'
          }
        ]
      }
    },
    'mathematics': {
      'basic-arithmetic': {
        title: 'Basic Arithmetic Operations',
        description: 'Learn addition, subtraction, multiplication, and division',
        gradient: 'from-blue-600 via-purple-600 to-pink-600',
        lightGradient: 'from-blue-50 via-purple-50 to-pink-50',
        steps: [
          {
            type: 'introduction',
            title: 'Welcome to Arithmetic!',
            content: 'Arithmetic operations are the basic building blocks of mathematics. They help us solve everyday problems like:',
            examples: [
              { icon: '🛒', text: 'Calculating the total cost of items when shopping' },
              { icon: '💰', text: 'Counting money and making change' },
              { icon: '📏', text: 'Measuring distances and quantities' },
              { icon: '⏰', text: 'Working with time and schedules' }
            ],
            chisomoAdvice: '🦅 Arithmetic is like my daily flight calculations! Just as I calculate wind speed, distance to prey, and energy needed for hunting, you use arithmetic daily - from counting kwacha at the market to calculating distances between cities like Lusaka and Ndola!'
          },
          {
            type: 'text-lesson',
            title: 'Addition and Subtraction',
            content: `Addition and subtraction are fundamental operations that help us combine and separate quantities.

**Addition (+)**
Addition combines two or more numbers to find their total.

Basic addition facts:
• 5 + 3 = 8
• 12 + 7 = 19
• 25 + 15 = 40

Properties of addition:
• Commutative: 5 + 3 = 3 + 5
• Associative: (2 + 3) + 4 = 2 + (3 + 4)
• Identity: Any number + 0 = that number

Real-world examples:
• If you have 15 kwacha and earn 25 more, you have 15 + 25 = 40 kwacha
• A bus travels 120 km to Ndola and 80 km further to Kitwe: 120 + 80 = 200 km total

**Subtraction (-)**
Subtraction finds the difference between numbers or removes a quantity.

Basic subtraction facts:
• 8 - 3 = 5
• 19 - 7 = 12
• 40 - 15 = 25

Properties of subtraction:
• Not commutative: 8 - 3 ≠ 3 - 8
• Identity: Any number - 0 = that number
• Inverse of addition: If 5 + 3 = 8, then 8 - 3 = 5

Real-world examples:
• You have 50 kwacha and spend 20 kwacha: 50 - 20 = 30 kwacha remaining
• A journey of 200 km with 75 km completed: 200 - 75 = 125 km remaining

**Adding and Subtracting Larger Numbers**
Use column method for multi-digit numbers:

Example: 347 + 256
  347
+ 256
-----
  603

Example: 523 - 187
  523
- 187
-----
  336

**Word Problems**
Practice with real situations:

1. A school has 245 students in Grade 10 and 198 students in Grade 11. How many students total?
   Answer: 245 + 198 = 443 students

2. A farmer harvested 850 kg of maize and sold 320 kg. How much remains?
   Answer: 850 - 320 = 530 kg`,
            chisomoAdvice: '🦅 Addition and subtraction are like managing my energy reserves! When I catch prey, I add to my energy stores. When I fly long distances, I subtract energy. Understanding these operations helps me survive, just like they help you manage money, time, and resources in daily life!'
          },
          {
            type: 'text-lesson',
            title: 'Multiplication and Division',
            content: `Multiplication and division help us work with groups and equal parts efficiently.

**Multiplication (×)**
Multiplication is repeated addition - adding the same number multiple times.

Basic multiplication facts:
• 3 × 4 = 12 (same as 3 + 3 + 3 + 3)
• 7 × 6 = 42
• 9 × 8 = 72

Properties of multiplication:
• Commutative: 3 × 4 = 4 × 3
• Associative: (2 × 3) × 4 = 2 × (3 × 4)
• Identity: Any number × 1 = that number
• Zero property: Any number × 0 = 0

Multiplication table patterns:
• 2 times table: 2, 4, 6, 8, 10, 12...
• 5 times table: 5, 10, 15, 20, 25, 30...
• 10 times table: 10, 20, 30, 40, 50, 60...

Real-world examples:
• 6 packets of biscuits with 8 biscuits each: 6 × 8 = 48 biscuits
• A classroom has 5 rows of 7 desks: 5 × 7 = 35 desks
• Working 8 hours per day for 5 days: 8 × 5 = 40 hours

**Division (÷)**
Division splits a number into equal groups or finds how many times one number fits into another.

Basic division facts:
• 12 ÷ 3 = 4 (12 split into 3 equal groups)
• 42 ÷ 7 = 6
• 72 ÷ 8 = 9

Properties of division:
• Not commutative: 12 ÷ 3 ≠ 3 ÷ 12
• Identity: Any number ÷ 1 = that number
• Inverse of multiplication: If 3 × 4 = 12, then 12 ÷ 3 = 4

Types of division:
• Exact division: 15 ÷ 3 = 5 (no remainder)
• Division with remainder: 17 ÷ 3 = 5 remainder 2

Real-world examples:
• 48 students divided into 6 equal groups: 48 ÷ 6 = 8 students per group
• 150 kwacha shared equally among 5 people: 150 ÷ 5 = 30 kwacha each
• 84 books arranged on 7 shelves: 84 ÷ 7 = 12 books per shelf

**Long Division**
For larger numbers, use the long division method:

Example: 156 ÷ 12
    13
   ----
12 | 156
     12
     ---
      36
      36
      ---
       0

**Word Problems**
Practice with real situations:

1. A bus can carry 45 passengers. How many passengers can 8 buses carry?
   Answer: 45 × 8 = 360 passengers

2. 144 oranges are packed equally into 12 boxes. How many oranges per box?
   Answer: 144 ÷ 12 = 12 oranges per box`,
            chisomoAdvice: '🦅 Multiplication and division are like my hunting strategies! When I see a flock of birds, I multiply to estimate the total (5 groups of 8 birds = 40 birds). When I need to share food with my family, I divide equally. These operations help me make quick decisions, just like they help you solve everyday problems efficiently!'
          }
        ]
      },
      'algebra-intro': {
        title: 'Introduction to Algebra',
        description: 'Discover the world of variables and algebraic expressions',
        gradient: 'from-green-600 via-emerald-600 to-teal-600',
        lightGradient: 'from-green-50 via-emerald-50 to-teal-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Algebra?',
            content: 'Algebra is like arithmetic with a mystery! Instead of just numbers, we use letters (variables) to represent unknown values.',
            examples: [
              { icon: '🔍', text: 'Finding unknown values in equations' },
              { icon: '📈', text: 'Describing patterns and relationships' },
              { icon: '🧮', text: 'Solving real-world problems systematically' },
              { icon: '🎯', text: 'Making predictions and calculations' }
            ],
            chisomoAdvice: '🦅 Algebra is like tracking prey I can\'t see yet! Just as I use clues like footprints and sounds to find hidden animals, algebra uses variables and equations to find hidden numbers. Algebra helps us solve problems like calculating loan payments, determining crop yields, or planning construction projects in Zambia!'
          },
          {
            type: 'text-lesson',
            title: 'Variables and Expressions',
            content: `Variables are letters that represent unknown numbers. Algebraic expressions combine variables with numbers and operations.

**Understanding Variables**
Variables are like empty boxes waiting to be filled:

• x, y, z are common variable names
• Variables can represent any number
• The same variable always represents the same value in one problem

Examples:
• Let x = the number of students in a class
• Let y = the cost of one textbook
• Let t = time in hours

**Algebraic Expressions**
Expressions combine variables, numbers, and operations:

Simple expressions:
• x + 5 (a number plus 5)
• 3y (3 times a number)
• 2x - 7 (twice a number minus 7)
• x² + 4 (a number squared plus 4)

Complex expressions:
• 2x + 3y - 5 (combining multiple variables)
• 4(x + 2) (using parentheses for grouping)
• x² + 2x + 1 (quadratic expression)

**Evaluating Expressions**
To evaluate means to find the value when variables have specific numbers:

If x = 3, evaluate 2x + 5:
• 2x + 5
• 2(3) + 5
• 6 + 5
• 11

If a = 4 and b = 2, evaluate 3a - b:
• 3a - b
• 3(4) - 2
• 12 - 2
• 10

**Terms and Coefficients**
Understanding the parts of expressions:

In the expression 5x + 3y - 2:
• Terms: 5x, 3y, and -2
• Coefficients: 5 (coefficient of x), 3 (coefficient of y)
• Constant: -2 (the number without a variable)
• Variables: x and y

**Like Terms**
Terms with the same variable can be combined:

Like terms:
• 3x and 5x can combine to 8x
• 2y and -4y can combine to -2y
• 7 and 3 can combine to 10

Unlike terms (cannot be combined):
• 3x and 5y (different variables)
• x² and x (different powers)
• 4xy and 3x (different variable combinations)

**Simplifying Expressions**
Combine like terms to make expressions simpler:

Example 1: 3x + 5x - 2
• Combine like terms: (3 + 5)x - 2
• Result: 8x - 2

Example 2: 4y + 3 - 2y + 7
• Group like terms: (4y - 2y) + (3 + 7)
• Result: 2y + 10

**Real-World Applications**
Algebra helps solve practical problems:

• If textbooks cost 25 kwacha each, the cost for x textbooks is 25x
• If a bus travels at 60 km/h for t hours, distance = 60t
• If you save s kwacha per month for 12 months, total savings = 12s`,
            chisomoAdvice: '🦅 Variables are like the different types of prey I hunt - I don\'t always know exactly what I\'ll catch, but I can plan my strategy! Just as I might think "if I catch x fish and y small mammals, I\'ll have enough food for z days," algebra lets you work with unknown quantities to solve real problems. Master this, and you\'ll soar through more complex mathematics!'
          }
        ]
      },
      'geometry': {
        title: 'Geometry Fundamentals',
        description: 'Explore shapes, angles, and spatial relationships',
        gradient: 'from-yellow-600 via-orange-600 to-pink-600',
        lightGradient: 'from-yellow-50 via-orange-50 to-pink-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Geometry?',
            content: 'Geometry is the study of shapes, sizes, and the properties of space. It helps us understand the world around us, from building houses to designing roads.',
            examples: [
              { icon: '📏', text: 'Measuring land for farming or construction' },
              { icon: '🏠', text: 'Designing houses and buildings' },
              { icon: '⚽', text: 'Understanding the shape of a football field' }
            ],
            chisomoAdvice: '🦅 Geometry is like planning my flight path! I use angles and distances to soar efficiently and land safely. In Zambia, geometry helps engineers build bridges and surveyors measure land.'
          },
          {
            type: 'text-lesson',
            title: 'Basic Shapes and Properties',
            content: `**2D Shapes**: Square, rectangle, triangle, circle
• Perimeter: Distance around a shape
• Area: Space inside a shape

**3D Shapes**: Cube, cuboid, sphere, cylinder
• Volume: Space inside a 3D object

**Angles**: Measured in degrees (°)
• Right angle: 90°
• Acute angle: Less than 90°
• Obtuse angle: More than 90° but less than 180°

**Real-world examples:**
• Calculating the area of a maize field
• Measuring the volume of a water tank
• Using a protractor to check angles in carpentry`,
            chisomoAdvice: '🦅 Knowing shapes and angles helps me build a strong nest and spot prey from afar! Geometry is everywhere in nature and human life.'
          }
        ]
      },
      'trigonometry': {
        title: 'Trigonometry Basics',
        description: 'Study triangles and circular functions',
        gradient: 'from-pink-600 via-red-600 to-purple-600',
        lightGradient: 'from-pink-50 via-red-50 to-purple-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Trigonometry?',
            content: 'Trigonometry is the study of relationships between the sides and angles of triangles. It is used in navigation, engineering, and science.',
            examples: [
              { icon: '⛰️', text: 'Measuring the height of a mountain using angles' },
              { icon: '📐', text: 'Calculating distances across rivers' },
              { icon: '🦅', text: 'Eagles use angles to dive at prey accurately' }
            ],
            chisomoAdvice: '🦅 I use trigonometry every time I swoop down to catch food! Pilots and engineers in Zambia use it to plan safe flights and build strong structures.'
          },
          {
            type: 'text-lesson',
            title: 'Sine, Cosine, and Tangent',
            content: `**Right Triangle**: Has one 90° angle

**Sides:**
• Hypotenuse: Longest side
• Opposite: Side opposite the angle
• Adjacent: Side next to the angle

**Trigonometric Ratios:**
• Sine (sin) = Opposite / Hypotenuse
• Cosine (cos) = Adjacent / Hypotenuse
• Tangent (tan) = Opposite / Adjacent

**Example:**
If a tree casts a 5m shadow and the angle of elevation of the sun is 30°:
• tan(30°) = height / 5
• height = 5 × tan(30°) ≈ 2.89m

**Applications:**
• Surveying land
• Building roofs
• Navigating by stars`,
            chisomoAdvice: '🦅 Trigonometry helps me judge distances and angles perfectly. It\'s a powerful tool for solving real-world problems!'
          }
        ]
      },
      'statistics': {
        title: 'Statistics and Probability',
        description: 'Analyze data and understand probability',
        gradient: 'from-green-600 via-blue-600 to-indigo-600',
        lightGradient: 'from-green-50 via-blue-50 to-indigo-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Statistics?',
            content: 'Statistics is the science of collecting, analyzing, and interpreting data. Probability helps us predict the likelihood of events.',
            examples: [
              { icon: '📊', text: 'Surveying students to find the most popular subject' },
              { icon: '🎲', text: 'Calculating the chance of rolling a 6 on a die' },
              { icon: '🌧️', text: 'Predicting the chance of rain in Lusaka' }
            ],
            chisomoAdvice: '🦅 I use statistics to decide where to hunt! If I see more fish in one river, I\'ll go there more often. Zambian farmers use statistics to predict crop yields and plan harvests.'
          },
          {
            type: 'text-lesson',
            title: 'Data, Averages, and Probability',
            content: `**Data Collection:**
• Surveys, experiments, observations

**Types of Data:**
• Qualitative: Descriptions (favorite color)
• Quantitative: Numbers (test scores)

**Averages:**
• Mean: Add all values, divide by number of values
• Median: Middle value when data is ordered
• Mode: Most frequent value

**Probability:**
• Probability = (Number of favorable outcomes) / (Total outcomes)
• Example: Probability of picking a red sweet from a bag of 5 red and 3 blue = 5/8

**Applications:**
• Predicting exam results
• Planning business sales
• Weather forecasting`,
            chisomoAdvice: '🦅 Understanding data helps me make smart choices. Statistics and probability help you make informed decisions in school, business, and daily life!'
          }
        ]
      }
    },
    'sciences': {
      'scientific-method': {
        title: 'The Scientific Method',
        description: 'Learn how scientists investigate and understand the natural world',
        gradient: 'from-green-600 via-emerald-600 to-teal-600',
        lightGradient: 'from-green-50 via-emerald-50 to-teal-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is the Scientific Method?',
            content: 'The scientific method is a systematic way of learning about the world around us.',
            examples: [
              { icon: '🔍', text: 'Making observations about natural phenomena' },
              { icon: '❓', text: 'Asking questions about what we observe' },
              { icon: '🧪', text: 'Conducting experiments to test ideas' },
              { icon: '📊', text: 'Analyzing data to draw conclusions' }
            ],
            chisomoAdvice: '🦅 The scientific method is like my hunting process! I observe the environment, ask questions about prey behavior, test different hunting strategies, and learn from the results. Zambian scientists use this method to study everything from crop diseases to wildlife conservation in our national parks!'
          },
          {
            type: 'text-lesson',
            title: 'Steps of the Scientific Method',
            content: `The scientific method follows a logical sequence of steps that help scientists understand the natural world.

**Step 1: Observation**
Scientists begin by carefully observing the world around them.

Examples of observations:
• Plants grow taller when placed near windows
• Some materials float while others sink
• Birds migrate at certain times of year
• Water boils at different temperatures at different altitudes

Good observations are:
• Detailed and specific
• Measurable when possible
• Recorded accurately
• Made using multiple senses

**Step 2: Question**
Based on observations, scientists ask specific questions.

Examples of scientific questions:
• Why do plants grow toward light?
• What determines whether an object floats?
• How do birds know when to migrate?
• Why does water boil at different temperatures?

Good scientific questions:
• Can be tested through experiments
• Are specific and focused
• Have measurable outcomes
• Lead to further investigation

**Step 3: Hypothesis**
A hypothesis is an educated guess that answers the question.

Characteristics of a good hypothesis:
• Based on existing knowledge
• Testable through experiments
• Specific and measurable
• Can be proven right or wrong

Examples:
• "Plants grow toward light because they need light for photosynthesis"
• "Objects with lower density than water will float"
• "Birds migrate based on changes in daylight hours"

**Step 4: Experiment**
Design and conduct tests to check if the hypothesis is correct.

Elements of a good experiment:
• Control group: The standard for comparison
• Experimental group: The group being tested
• Variables: Factors that can change
• Constants: Factors kept the same

Example experiment:
Question: Do plants grow better with fertilizer?
Hypothesis: Plants with fertilizer will grow taller
Control: Plants with no fertilizer
Experimental: Plants with fertilizer
Variable: Amount of fertilizer
Constants: Same light, water, soil, temperature

**Step 5: Data Collection and Analysis**
Record observations and measurements during the experiment.

Types of data:
• Quantitative: Numbers and measurements (height, weight, temperature)
• Qualitative: Descriptions and observations (color, texture, behavior)

Data analysis includes:
• Creating tables and graphs
• Calculating averages
• Looking for patterns
• Comparing results

**Step 6: Conclusion**
Determine whether the hypothesis was supported or not.

A good conclusion:
• States whether hypothesis was supported
• Explains what the data shows
• Discusses possible sources of error
• Suggests further experiments

**Step 7: Communication**
Share results with other scientists and the public.

Methods of communication:
• Scientific papers and journals
• Conferences and presentations
• Reports and summaries
• Educational materials

**The Cycle Continues**
Science is an ongoing process:
• New questions arise from conclusions
• Other scientists repeat experiments
• Theories develop from multiple studies
• Knowledge builds over time`,
            chisomoAdvice: '🦅 The scientific method is like perfecting my hunting techniques over generations! Eagles observe prey patterns, form hypotheses about the best hunting strategies, test these strategies, analyze the results, and pass successful techniques to their young. This systematic approach has made eagles master hunters, just like the scientific method helps humans master understanding of the natural world!'
          }
        ]
      },
      'physics': {
        title: 'Physics Fundamentals',
        description: 'Explore the laws of motion, energy, and forces that govern our universe',
        gradient: 'from-blue-700 via-indigo-700 to-purple-700',
        lightGradient: 'from-blue-50 via-indigo-50 to-purple-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Physics?',
            content: 'Physics is the study of matter, energy, and the interactions between them. It helps us understand how things move, why objects fall, and how electricity works.',
            examples: [
              { icon: '⚡', text: 'Understanding how electricity powers homes in Lusaka' },
              { icon: '🚲', text: 'Explaining how a bicycle moves and stops' },
              { icon: '🏀', text: 'Predicting the path of a thrown basketball' }
            ],
            chisomoAdvice: '🦅 Physics helps me soar through the sky! By understanding air currents and forces, I can glide long distances with little effort. Zambian engineers use physics to build safe bridges and roads.'
          }
        ]
      },
      'chemistry': {
        title: 'Chemistry Essentials',
        description: 'Discover the building blocks of matter and chemical reactions',
        gradient: 'from-pink-600 via-red-600 to-yellow-600',
        lightGradient: 'from-pink-50 via-red-50 to-yellow-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Chemistry?',
            content: 'Chemistry is the study of substances, their properties, and how they interact to form new substances. It explains everything from cooking food to cleaning water.',
            examples: [
              { icon: '🧪', text: 'Mixing chemicals in a school lab' },
              { icon: '🍲', text: 'Cooking nshima and observing changes in maize meal' },
              { icon: '💧', text: 'Purifying water for safe drinking' }
            ],
            chisomoAdvice: '🦅 Chemistry is like mixing the right ingredients for a strong nest! Zambian farmers use chemistry to improve soil and grow healthy crops.'
          }
        ]
      },
      'biology': {
        title: 'Biology: Life Science',
        description: 'Learn about living things, their structure, and how they interact with the environment',
        gradient: 'from-green-700 via-lime-600 to-emerald-600',
        lightGradient: 'from-green-50 via-lime-50 to-emerald-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Biology?',
            content: 'Biology is the study of living organisms, from tiny bacteria to giant trees and animals. It helps us understand health, farming, and the environment.',
            examples: [
              { icon: '🌱', text: 'Growing maize and learning about plant life cycles' },
              { icon: '🦓', text: 'Studying wildlife in Zambia\'s national parks' },
              { icon: '🧬', text: 'Understanding how diseases spread and how to prevent them' }
            ],
            chisomoAdvice: '🦅 Biology teaches me about my prey and my environment. Zambian doctors and farmers use biology to keep people and animals healthy.'
          }
        ]
      },
      'environmental-science': {
        title: 'Environmental Science',
        description: 'Understand how humans interact with the environment and how to protect it',
        gradient: 'from-teal-600 via-green-600 to-blue-600',
        lightGradient: 'from-teal-50 via-green-50 to-blue-50',
        steps: [
          {
            type: 'introduction',
            title: 'What is Environmental Science?',
            content: 'Environmental science studies how people, animals, and plants interact with their surroundings. It helps us solve problems like pollution and climate change.',
            examples: [
              { icon: '🌍', text: 'Protecting the Zambezi River from pollution' },
              { icon: '🌳', text: 'Planting trees to prevent soil erosion' },
              { icon: '♻️', text: 'Recycling waste in Lusaka' }
            ],
            chisomoAdvice: '🦅 Protecting the environment keeps my home safe! Zambians can help by conserving water, planting trees, and reducing waste.'
          }
        ]
      }
    },
    'religious-education': {
      'world-religions': {
        title: 'World Religions',
        description: 'Explore the major religions of the world and their impact on society.',
        steps: [
          {
            type: 'introduction',
            title: 'What is Religion?',
            content: 'Religion is a system of beliefs, practices, and values that help people understand life\'s big questions.',
            examples: [
              { icon: '🙏', text: 'Providing meaning and purpose in life' },
              { icon: '🤝', text: 'Building communities and social connections' },
              { icon: '📖', text: 'Offering moral and ethical guidance' },
              { icon: '🕊️', text: 'Bringing comfort during difficult times' }
            ],
            chisomoAdvice: '🦅 Religion is like the ancient wisdom passed down through generations of eagles! Just as we have instinctive knowledge about migration, hunting, and survival, humans have developed religious traditions to guide them through life\'s journey. Zambia is home to many religious traditions, with Christianity being predominant, alongside traditional African religions and other faiths.'
          },
          {
            type: 'text-lesson',
            title: 'Major World Religions',
            content: `The world\'s major religions share common themes while maintaining unique characteristics and traditions.

**Christianity**
Founded: ~30 CE by Jesus Christ
Followers: ~2.4 billion worldwide
Holy Book: The Bible (Old and New Testaments)

Core Beliefs:
• Jesus Christ is the Son of God and savior
• Trinity: Father, Son, and Holy Spirit
• Salvation through faith in Jesus
• Love for God and neighbor
• Eternal life after death

Major Denominations:
• Catholic Church (largest)
• Protestant churches (Lutheran, Methodist, Baptist, etc.)
• Orthodox churches (Eastern, Russian, etc.)

In Zambia:
• Majority religion (~95% of population)
• Declared a "Christian nation" in 1991
• Many denominations present
• Influences education, politics, and culture

**Islam**
Founded: ~610 CE by Prophet Muhammad
Followers: ~1.8 billion worldwide
Holy Book: The Quran

Core Beliefs (Five Pillars):
• Shahada: Declaration of faith
• Salah: Five daily prayers
• Zakat: Charitable giving
• Sawm: Fasting during Ramadan
• Hajj: Pilgrimage to Mecca

Major Branches:
• Sunni Islam (~85% of Muslims)
• Shia Islam (~15% of Muslims)

In Zambia:
• Small but present community
• Mosques in major cities
• Peaceful coexistence with other faiths

**Hinduism**
Founded: No single founder, evolved over thousands of years
Followers: ~1.2 billion worldwide
Holy Books: Vedas, Upanishads, Bhagavad Gita

Core Beliefs:
• Dharma: Righteous living
• Karma: Law of cause and effect
• Samsara: Cycle of rebirth
• Moksha: Liberation from rebirth cycle
• Multiple paths to the divine

Major Traditions:
• Vaishnavism (worship of Vishnu)
• Shaivism (worship of Shiva)
• Shaktism (worship of the Divine Mother)

**Buddhism**
Founded: ~500 BCE by Siddhartha Gautama (Buddha)
Followers: ~500 million worldwide
Holy Books: Tripitaka, various sutras

Core Beliefs (Four Noble Truths):
• Life contains suffering
• Suffering is caused by desire/attachment
• Suffering can end
• The Eightfold Path leads to enlightenment

The Eightfold Path:
• Right understanding, intention, speech, action
• Right livelihood, effort, mindfulness, concentration

Major Branches:
• Theravada Buddhism
• Mahayana Buddhism
• Vajrayana Buddhism

**Judaism**
Founded: ~2000 BCE with Abraham
Followers: ~15 million worldwide
Holy Book: Torah (part of Hebrew Bible/Tanakh)

Core Beliefs:
• Monotheism: One God
• Covenant between God and Jewish people
• Torah as divine revelation
• Importance of ethical living
• Messiah will come in the future

Major Movements:
• Orthodox Judaism
• Conservative Judaism
• Reform Judaism

**Traditional African Religions**
Origins: Ancient, varied by region and tribe
Followers: Hundreds of millions across Africa
Holy Books: Oral traditions, no single text

Common Elements:
• Supreme Creator God
• Ancestor veneration
• Spirit world interaction
• Community-centered worship
• Connection to nature and land

In Zambia:
• Traditional beliefs of various ethnic groups
• Often blended with Christianity
• Respect for ancestors and elders
• Seasonal and life-cycle ceremonies

**Common Themes Across Religions**
Despite differences, most religions share:
• Belief in something greater than ourselves
• Moral and ethical guidelines
• Community worship and fellowship
• Rituals and ceremonies
• Concern for others and social justice
• Search for meaning and purpose
• Practices for spiritual growth`,
            chisomoAdvice: '🦅 World religions are like the different flight patterns eagles use across the globe! While we all share the same sky and the same goal of survival, different eagle species have developed unique techniques suited to their environments. Similarly, different cultures have developed religious traditions suited to their needs, yet all seeking to understand life\'s deeper meanings. In Zambia, we see this beautiful diversity in how different communities express their faith while living together in harmony!'
          }
        ]
      },
      'ethics': {
        title: 'Ethics and Moral Principles',
        description: 'Explore moral principles and how we make decisions about right and wrong.',
        steps: [
          {
            type: 'introduction',
            title: 'What is Ethics?',
            content: 'Ethics is the study of what is right and wrong. It helps us make good choices in life, from how we treat others to how we act in our communities.',
            examples: [
              { icon: '⚖️', text: 'Deciding to return lost money you found' },
              { icon: '🤝', text: 'Helping a classmate in need' },
              { icon: '🌍', text: 'Caring for the environment' }
            ],
            chisomoAdvice: '🦅 Ethics is like the rules I follow to survive and thrive. In Zambia, ethical choices help build strong families and communities.'
          }
        ]
      },
      'philosophy': {
        title: 'Philosophy and Big Questions',
        description: 'Examine fundamental questions about existence, knowledge, and reality.',
        steps: [
          {
            type: 'introduction',
            title: 'What is Philosophy?',
            content: 'Philosophy is the love of wisdom. Philosophers ask big questions about life, the universe, and everything in it.',
            examples: [
              { icon: '🤔', text: 'Wondering why we exist' },
              { icon: '💡', text: 'Thinking about what is true or false' },
              { icon: '📚', text: 'Studying the ideas of great thinkers' }
            ],
            chisomoAdvice: '🦅 Asking questions helps me learn and adapt. Zambian leaders and elders use philosophy to guide their decisions.'
          }
        ]
      },
      'cultural-studies': {
        title: 'Cultural Studies',
        description: 'Learn about diverse cultural practices and beliefs in Zambia and beyond.',
        steps: [
          {
            type: 'introduction',
            title: 'Understanding Culture',
            content: 'Culture is the way of life shared by a group of people. It includes language, food, music, traditions, and beliefs.',
            examples: [
              { icon: '🌍', text: 'Celebrating traditional ceremonies in Zambia' },
              { icon: '🎶', text: 'Listening to local music and songs' },
              { icon: '🍲', text: 'Enjoying nshima and other Zambian foods' }
            ],
            chisomoAdvice: '🦅 Every eagle has its own way of living, just like every culture is unique. Respecting different cultures makes our world richer.'
          }
        ]
      },
      'critical-thinking': {
        title: 'Critical Thinking Skills',
        description: 'Develop analytical and reasoning skills for making sound judgments.',
        steps: [
          {
            type: 'introduction',
            title: 'What is Critical Thinking?',
            content: 'Critical thinking means analyzing information carefully and making reasoned decisions. It helps us solve problems and avoid mistakes.',
            examples: [
              { icon: '🧠', text: 'Checking facts before believing a rumor' },
              { icon: '🔍', text: 'Asking questions to understand a problem' },
              { icon: '📊', text: 'Comparing options before making a choice' }
            ],
            chisomoAdvice: '🦅 I use critical thinking to find the best hunting spots. In Zambia, students use it to succeed in school and life.'
          }
        ]
      }
    }
  };

  // Get the correct lesson content based on subject and lessonId
  const getCurrentLessonContent = () => {
    const subjectContent = lessonContent[subject as keyof typeof lessonContent];
    if (!subjectContent) return lessonContent['computer-studies']['programming-basics'];
    
    const topicContent = subjectContent[lessonId as keyof typeof subjectContent];
    if (!topicContent) {
      // Return first available topic for the subject
      const firstTopicKey = Object.keys(subjectContent)[0];
      return subjectContent[firstTopicKey as keyof typeof subjectContent];
    }
    
    return topicContent;
  };

  const currentLessonContent = getCurrentLessonContent();
  const currentStepData = currentLessonContent.steps[currentStep];

  const handleStepComplete = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);
    
    if (currentStep < currentLessonContent.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setUserInputs({ ...userInputs, [key]: value });
  };

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'introduction':
        return (
          <div className="space-y-6">
            <div className={`bg-gradient-to-br ${currentLessonContent.lightGradient} border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{currentStepData.content}</h3>
              {/* Only render examples grid if examples exist and are non-empty */}
              {Array.isArray(currentStepData.examples) && currentStepData.examples.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {currentStepData.examples.map((example: any, index: number) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{example.icon}</span>
                        <span className="text-gray-800 font-medium">{example.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <Logo className="h-8 w-8" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Wisdom</h4>
                    <p className="text-amber-800">{currentStepData.chisomoAdvice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'concept-explanation':
        return (
          <div className="space-y-6">
            <div className={`bg-gradient-to-br ${currentLessonContent.lightGradient} border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{currentStepData.content}</h3>
              
              {currentStepData.codeExample && (
                <div className="bg-gray-900 rounded-lg p-6 mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-4">
                    <Code className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-medium">{currentStepData.codeExample.language}</span>
                  </div>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                    {currentStepData.codeExample.code}
                  </pre>
                  <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-700">
                    <p className="text-gray-300 text-sm">{currentStepData.codeExample.explanation}</p>
                  </div>
                </div>
              )}

              {currentStepData.practice && (
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-cyan-900 mb-4">Practice Exercise</h4>
                  <p className="text-cyan-800 mb-3">{currentStepData.practice.question}</p>
                  <textarea
                    placeholder="Write your code here..."
                    value={userInputs[`step-${currentStep}`] || ''}
                    onChange={(e) => handleInputChange(`step-${currentStep}`, e.target.value)}
                    className="w-full px-4 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono shadow-sm"
                    rows={3}
                  />
                  
                  {showHint && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <p className="text-yellow-800 text-sm">{currentStepData.practice.hint}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 mt-4">
                    <Button
                      onClick={() => setShowHint(!showHint)}
                      variant="outline"
                      size="sm"
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 transform hover:scale-105 transition-all duration-200"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </Button>
                    
                    <Button
                      onClick={handleStepComplete}
                      size="sm"
                      className="transform hover:scale-105 transition-all duration-200"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {currentStepData.chisomoAdvice && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-lg p-4 shadow-sm mt-4">
                  <div className="flex items-start space-x-3">
                    <Logo className="h-8 w-8" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Wisdom</h4>
                      <p className="text-amber-800">{currentStepData.chisomoAdvice}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'text-lesson':
        return (
          <div className="space-y-6">
            <div className={`bg-gradient-to-br ${currentLessonContent.lightGradient} border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{currentStepData.content}</ReactMarkdown>
              </div>

              {currentStepData.chisomoAdvice && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-lg p-6 mt-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🦅</div>
                    <div>
                      <h4 className="font-bold text-lg text-amber-900 mb-3">Chisomo's Wisdom</h4>
                      <p className="text-amber-800 leading-relaxed">{currentStepData.chisomoAdvice}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Button
                  onClick={handleStepComplete}
                  className="w-full transform hover:scale-105 transition-all duration-200"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Continue to Next Step
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`bg-gradient-to-br ${currentLessonContent.lightGradient} border border-gray-200 rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{currentStepData.title}</h3>
            <p className="text-gray-700">{currentStepData.content}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with gradient and 3D effects */}
      <div className={`bg-gradient-to-r ${currentLessonContent.gradient} rounded-xl p-6 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
              <p className="text-white/90">Step {currentStep + 1} of {currentLessonContent.steps.length}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/80 mb-1">Progress</div>
            <div className="text-2xl font-bold">
              {Math.round(((currentStep + 1) / currentLessonContent.steps.length) * 100)}%
            </div>
          </div>
        </div>
        
        {/* Progress bar with 3D effect */}
        <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${((currentStep + 1) / currentLessonContent.steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      {renderStepContent()}

      {/* Navigation with 3D effects */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="border-gray-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {currentLessonContent.steps.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${
                index === currentStep ? 'bg-blue-600 scale-125 shadow-lg' :
                completedSteps.has(index) ? 'bg-green-500 shadow-md' :
                'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <Button
          onClick={handleStepComplete}
          className={`bg-gradient-to-r ${currentLessonContent.gradient} hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
        >
          {currentStep === currentLessonContent.steps.length - 1 ? 'Complete Lesson' : 'Next Step'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Eagle encouragement with enhanced styling */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex items-start space-x-4">
          <Logo className="text-4xl animate-bounce" />
          <div className="text-white">
            <h4 className="font-bold text-lg mb-2">Chisomo's Encouragement</h4>
            <p className="text-amber-100">
              {currentStep === 0 && "Welcome to this interactive lesson! Take your time to understand each concept - like an eagle learning to soar, patience and practice lead to mastery."}
              {currentStep > 0 && currentStep < currentLessonContent.steps.length - 1 && "You're making excellent progress! Keep up the great work - every step forward is like gaining altitude in flight!"}
              {currentStep === currentLessonContent.steps.length - 1 && "Almost there! You're about to complete this lesson - spread your wings and soar to the finish!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}