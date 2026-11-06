// Year 3, Semester 1: imported from the supplied notes/YEAR 3 folder.
// Short labels are used where no verified unit code is available in the files.
export type Course = {id:string;code:string;title:string;category:string;lecturer:string;initials:string;color:string;progress:number;topics:number;materials:number;description:string;year:number;semester:number};
export type Topic = {id:string;courseId:string;title:string;minutes:number;objectives:string[];sections:{heading:string;text:string}[];takeaway:string;sources:string[]};
export type Resource = {id:string;courseId:string;title:string;url:string;format:string};
export const courses:Course[] = [
  {
    "id": "sqa",
    "code": "SQA",
    "title": "Software Quality Assurance",
    "category": "Computer Science",
    "lecturer": "Uploaded lecture notes",
    "initials": "SQ",
    "color": "mint",
    "progress": 0,
    "year": 3,
    "semester": 1,
    "topics": 9,
    "materials": 3,
    "description": "Study software quality, quality planning, reviews, testing, metrics and CASE tools."
  },
  {
    "id": "aoop",
    "code": "SSE 2105",
    "title": "Advanced Object-Oriented Programming",
    "category": "Computer Science",
    "lecturer": "Uploaded lecture notes",
    "initials": "SS",
    "color": "lavender",
    "progress": 0,
    "year": 3,
    "semester": 1,
    "topics": 8,
    "materials": 8,
    "description": "Develop Java foundations, object-oriented design, control structures, methods and robust programs."
  },
  {
    "id": "cbp",
    "code": "SSE 2302",
    "title": "Component-Based Programming",
    "category": "Computer Science",
    "lecturer": "Uploaded lecture notes",
    "initials": "SS",
    "color": "peach",
    "progress": 0,
    "year": 3,
    "semester": 1,
    "topics": 6,
    "materials": 16,
    "description": "Component Based Software Engineering: reusable components, explicit interfaces and dependable integration."
  },
  {
    "id": "dba",
    "code": "SBT 2301",
    "title": "Database Systems Administration",
    "category": "Computer Science",
    "lecturer": "Uploaded lecture notes",
    "initials": "SB",
    "color": "blue",
    "progress": 0,
    "year": 3,
    "semester": 1,
    "topics": 8,
    "materials": 1,
    "description": "Administer database environments, access, backup, recovery, transactions and performance."
  },
  {
    "id": "sys",
    "code": "COM 312",
    "title": "System Programming",
    "category": "Computer Science",
    "lecturer": "Uploaded lecture notes",
    "initials": "CO",
    "color": "yellow",
    "progress": 0,
    "year": 3,
    "semester": 1,
    "topics": 10,
    "materials": 11,
    "description": "Explore Linux, system software, processes, communication and operating-system services."
  },
  {
    "id": "daa",
    "code": "SPC 2302",
    "title": "Design and Analysis of Algorithms",
    "category": "Computer Science",
    "lecturer": "Uploaded lecture notes",
    "initials": "SP",
    "color": "rose",
    "progress": 0,
    "year": 3,
    "semester": 1,
    "topics": 8,
    "materials": 3,
    "description": "Prove correctness and analyze algorithms using divide and conquer, greedy methods, dynamic programming and graphs."
  },
  {
    "id": "ai",
    "code": "SPC 2303",
    "title": "Artificial Intelligence",
    "category": "Computer Science",
    "lecturer": "Uploaded lecture notes",
    "initials": "SP",
    "color": "mint",
    "progress": 0,
    "year": 3,
    "semester": 1,
    "topics": 9,
    "materials": 11,
    "description": "Study AI foundations, intelligent agents, search, knowledge representation, reasoning, game playing, learning, natural language and planning."
  }
];
export const topics:Topic[] = [
  {
    "id": "sqa-introduction",
    "courseId": "sqa",
    "title": "Introduction to software quality assurance",
    "minutes": 5,
    "objectives": [
      "Define software quality and quality assurance",
      "Distinguish quality assurance from quality control"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Software quality describes how well a software product meets specified requirements and user needs. Software quality assurance (SQA) is the planned, systematic work used to build confidence that software processes and products satisfy those requirements."
      },
      {
        "heading": "Key concepts",
        "text": "Quality assurance focuses on preventing defects through suitable processes, standards, training and reviews. Quality control evaluates products through activities such as inspection and testing. A defect is a flaw in an artefact; a failure is observable incorrect behaviour during execution. Good processes reduce risk, while product checks provide evidence of what was actually built."
      },
      {
        "heading": "Worked example and solution",
        "text": "A university fee portal must calculate balances correctly, protect student information and remain usable during registration. The team defines acceptance criteria, reviews the design and agrees coding standards before implementation. Testers then check balance calculations and access permissions. The preventive activities are QA; evaluating the resulting portal is QC."
      },
      {
        "heading": "Key terms",
        "text": "Quality: fitness for requirements and use. QA: systematic confidence-building activities. QC: product evaluation. Defect: a flaw. Failure: incorrect behaviour observed during use."
      },
      {
        "heading": "Revision questions",
        "text": "1. Explain QA and QC with one activity for each.\n2. How can a defect exist without causing an observed failure?\n3. Give three quality requirements for a university portal."
      }
    ],
    "takeaway": "Plan quality into the process, then collect evidence that the product meets its requirements.",
    "sources": [
      "sqa-software-quality-assurance-complete-notes"
    ]
  },
  {
    "id": "sqa-quality-models",
    "courseId": "sqa",
    "title": "Software quality factors and models",
    "minutes": 5,
    "objectives": [
      "Describe functional and nonfunctional quality",
      "Turn a quality factor into a measurable requirement"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A program can produce the correct answer and still be difficult to use, slow or costly to maintain. Quality models organize these different concerns so that a team can evaluate more than functional correctness."
      },
      {
        "heading": "Key concepts",
        "text": "Common factors include reliability, usability, efficiency, maintainability, portability and security. The supplied product-quality chapter introduces ISO/IEC 9126 and ISO/IEC 25010. It distinguishes product quality from process quality, with process models including CMMI. Quality factors can conflict: extra validation may improve robustness while adding execution cost. Select measures that reflect actual user needs rather than treating every factor as equally important."
      },
      {
        "heading": "Worked example and solution",
        "text": "Replace “the portal should be fast” with a testable target such as “95% of timetable requests should finish within two seconds under the agreed test load”. Record the environment and workload; a timing result without those conditions is hard to interpret."
      },
      {
        "heading": "Key terms",
        "text": "Reliability: consistent operation under stated conditions. Maintainability: ease of making changes. Portability: ease of moving environments. Metric: a defined measurement."
      },
      {
        "heading": "Revision questions",
        "text": "1. Give an example of a quality trade-off.\n2. Write a measurable usability requirement.\n3. Why is correctness alone insufficient?"
      }
    ],
    "takeaway": "Use quality factors to make expectations explicit, measurable and relevant to users.",
    "sources": [
      "sqa-software-quality-assurance-complete-notes"
    ]
  },
  {
    "id": "sqa-planning",
    "courseId": "sqa",
    "title": "Quality planning, standards and the SQA plan",
    "minutes": 5,
    "objectives": [
      "Describe the purpose of an SQA plan",
      "Identify responsibilities and quality records"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A quality plan explains how a particular project will meet its quality objectives. It makes responsibilities, checks, evidence and escalation routes clear before work is delivered."
      },
      {
        "heading": "Key concepts",
        "text": "An SQA plan covers project scope, applicable standards, review and testing activities, roles, schedules, configuration management, defect reporting and records. A standard states required expectations; a procedure describes how an activity is carried out. Audits compare actual practice and evidence with the agreed process."
      },
      {
        "heading": "Worked example and solution",
        "text": "For an examination system, the plan assigns design review to another developer, requires approval of grading rules, schedules integration tests and records defects with severity and ownership. Release requires evidence that the agreed acceptance criteria are satisfied."
      },
      {
        "heading": "Key terms",
        "text": "SQA plan: project quality arrangements. Standard: an agreed requirement. Procedure: a repeatable method. Audit: an evidence-based compliance check."
      },
      {
        "heading": "Revision questions",
        "text": "1. List five sections of an SQA plan.\n2. Distinguish a standard from a procedure.\n3. What evidence should be kept for a release decision?"
      }
    ],
    "takeaway": "A useful quality plan gives each quality activity an owner and produces reviewable evidence.",
    "sources": [
      "sqa-software-quality-assurance-complete-notes"
    ]
  },
  {
    "id": "sqa-reviews",
    "courseId": "sqa",
    "title": "Reviews, inspections and software audits",
    "minutes": 5,
    "objectives": [
      "Compare walkthroughs, inspections and audits",
      "Explain how early reviews prevent rework"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Static evaluation examines software artefacts without executing the program. Requirements, designs, code and test plans can all be reviewed before defects reach users."
      },
      {
        "heading": "Key concepts",
        "text": "A walkthrough is commonly led by the author to explain an artefact and gather feedback. An inspection is a structured peer review with preparation, defined roles, defect logging and follow-up. An audit checks adherence to specified standards or processes. Review the work against explicit criteria and track corrections to closure."
      },
      {
        "heading": "Worked example and solution",
        "text": "Before coding fee calculations, reviewers inspect the requirement “late payment incurs a penalty”. They find that the rate, start date and exemptions are missing. Resolving these ambiguities now prevents incompatible implementations and unreliable tests later."
      },
      {
        "heading": "Key terms",
        "text": "Static evaluation: checking without execution. Inspection: formal peer defect detection. Walkthrough: author-led examination. Audit trail: records showing what was checked and decided."
      },
      {
        "heading": "Revision questions",
        "text": "1. How does an inspection differ from testing?\n2. Suggest a requirements review checklist.\n3. Why is follow-up necessary after a review?"
      }
    ],
    "takeaway": "Find defects in the earliest artefact where they can be recognized and corrected.",
    "sources": [
      "sqa-software-quality-assurance-complete-notes"
    ]
  },
  {
    "id": "sqa-testing",
    "courseId": "sqa",
    "title": "Verification, validation and software testing",
    "minutes": 5,
    "objectives": [
      "Distinguish verification from validation",
      "Choose suitable test levels and design techniques"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Verification asks whether development outputs satisfy their specified inputs. Validation asks whether the resulting system meets intended user needs. Testing executes software to reveal failures and provide evidence about behaviour."
      },
      {
        "heading": "Key concepts",
        "text": "Unit tests target small pieces of code; integration tests examine interactions; system tests examine the complete system; acceptance tests evaluate agreed user requirements. Black-box techniques include equivalence partitioning and boundary value analysis. White-box techniques use internal structure. Regression testing checks that changes have not broken previously working behaviour."
      },
      {
        "heading": "Worked example and solution",
        "text": "If a mark must be an integer between 0 and 100, test valid classes and invalid classes, then boundaries such as -1, 0, 1, 99, 100 and 101. Checking only 50 misses the errors that often appear at the edges."
      },
      {
        "heading": "Key terms",
        "text": "Test case: inputs, conditions and expected result. Regression: checking existing behaviour after change. Boundary value: an input at or close to a limit."
      },
      {
        "heading": "Revision questions",
        "text": "1. Give a validation activity for a student portal.\n2. Design boundary tests for a minimum password length.\n3. Explain why passing tests cannot prove the absence of all defects."
      }
    ],
    "takeaway": "Use complementary test techniques and connect every expected result to a requirement.",
    "sources": [
      "sqa-software-quality-assurance-complete-notes"
    ]
  },
  {
    "id": "sqa-defects-metrics",
    "courseId": "sqa",
    "title": "Defect management, metrics and improvement",
    "minutes": 5,
    "objectives": [
      "Record and prioritize defects",
      "Interpret quality measurements in context"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Defect management turns a reported problem into a reproducible, assigned and verified correction. Metrics help a team understand trends and decide where improvement is needed."
      },
      {
        "heading": "Key concepts",
        "text": "A useful defect report includes environment, steps to reproduce, expected and actual behaviour, evidence, severity and status. Severity measures impact; priority reflects the order in which work should be done. Track reopened defects, escaped defects and defect trends, but interpret figures alongside scope and reporting effort. Root cause analysis identifies conditions that allowed a problem to occur."
      },
      {
        "heading": "Worked example and solution",
        "text": "After a release, several rounding errors are found in fee calculations. Fixing each report helps users, but investigating the common cause reveals inconsistent numeric handling. A shared calculation routine, design guidance and boundary tests address the underlying cause."
      },
      {
        "heading": "Key terms",
        "text": "Severity: impact. Priority: urgency or work order. Defect density: defects per defined size measure. Root cause: an underlying contributing reason."
      },
      {
        "heading": "Revision questions",
        "text": "1. Write a reproducible bug report.\n2. Can a low-severity defect have high priority? Explain.\n3. Why can raw defect counts mislead?"
      }
    ],
    "takeaway": "Use defect evidence to improve both the current product and the process that produces it.",
    "sources": [
      "sqa-software-quality-assurance-complete-notes"
    ]
  },
  {
    "id": "sqa-configuration-case",
    "courseId": "sqa",
    "title": "Configuration management and CASE tools",
    "minutes": 5,
    "objectives": [
      "Explain baselines and change control",
      "Describe how CASE tools support quality"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Configuration management keeps software artefacts identifiable and controlled as they change. Computer-aided software engineering (CASE) tools support development activities and help keep related artefacts consistent."
      },
      {
        "heading": "Key concepts",
        "text": "Identify configuration items such as source code, requirements, tests and release packages. Establish baselines, review change requests, record approved changes and verify the release configuration. CASE support can include modelling, requirements traceability, code analysis, testing and documentation. Tools assist a defined process; their output still requires human evaluation."
      },
      {
        "heading": "Worked example and solution",
        "text": "A lecturer reports that quiz answers changed unexpectedly. A versioned baseline identifies the released questions and answer key. Change history shows who approved the update, and traceability connects the changed requirement to its tests."
      },
      {
        "heading": "Key terms",
        "text": "Configuration item: an artefact under control. Baseline: an agreed reference version. Change control: reviewing and authorizing changes. CASE: computer-aided software engineering."
      },
      {
        "heading": "Revision questions",
        "text": "1. What belongs in a release baseline?\n2. How does traceability help assess a change?\n3. Name two CASE tool activities and the quality benefit of each."
      }
    ],
    "takeaway": "Controlled changes and traceable artefacts make quality evidence dependable.",
    "sources": [
      "sqa-case-tool"
    ]
  },
  {
    "id": "sqa-testing-methods",
    "courseId": "sqa",
    "title": "Black-box, white-box and grey-box testing",
    "minutes": 5,
    "objectives": [
      "Compare testing approaches",
      "Design cases using both requirements and program structure"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The supplied SQA chapter on testing methods distinguishes black-box, white-box and grey-box approaches by the knowledge used to design tests."
      },
      {
        "heading": "Key concepts",
        "text": "Black-box tests derive expected behaviour from the specification without requiring internal implementation knowledge. White-box tests use control flow and implementation structure, for example statement and branch coverage. Grey-box testing uses partial internal knowledge. Coverage helps identify untested structure but does not establish that all requirements or possible inputs are correct."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a fee calculator applies a discount when a student is eligible and the balance is positive.\n\nSolution: specification-based cases check eligible and ineligible students, zero balance and invalid inputs. Structure-based cases also exercise both outcomes of each branch. Check calculated amounts against the stated rule, not only whether each line executed."
      },
      {
        "heading": "Key terms",
        "text": "Black box: specification-focused testing. White box: structure-focused testing. Grey box: testing using some implementation knowledge. Branch coverage: exercised decision outcomes."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare the information used in the three approaches.\n2. Why is full statement coverage insufficient?\n3. Design boundary cases for a discount threshold."
      }
    ],
    "takeaway": "Combine behavioural checks with structural evidence; neither alone establishes complete quality.",
    "sources": [
      "sqa-software-quality-assurance-complete-notes"
    ]
  },
  {
    "id": "sqa-testing-tools",
    "courseId": "sqa",
    "title": "Testing tools and automation",
    "minutes": 5,
    "objectives": [
      "Describe the role of test frameworks",
      "Explain fixtures, assertions and test isolation"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The supplied tools chapter introduces Jtest, JUnit, JWalk, PowerMock and TestNG. Their common purpose is to support repeatable evaluation; selecting a tool still requires understanding the test objective."
      },
      {
        "heading": "Key concepts",
        "text": "A test framework organizes test execution and reports outcomes. Assertions compare observed results with expectations. Fixtures prepare known conditions. Mocks or substitutes can isolate dependencies, but excessive substitution can hide integration failures. Automated tests should be repeatable and their expected values should come from the requirements rather than duplicating the implementation."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a balance service depends on a payment gateway.\n\nSolution: a unit test supplies a controlled gateway result and asserts the balance calculation. A separate integration test verifies the real gateway contract. A passing isolated test alone cannot show that the real connection works."
      },
      {
        "heading": "Key terms",
        "text": "Assertion: a checked expectation. Fixture: prepared test conditions. Mock: a controlled substitute. Test suite: a collection of tests. Regression suite: checks retained across changes."
      },
      {
        "heading": "Revision questions",
        "text": "1. What makes a useful assertion?\n2. When can mocks hide a defect?\n3. Which checks belong in both unit and integration testing?"
      }
    ],
    "takeaway": "Automate meaningful checks and keep evidence of real component interactions.",
    "sources": [
      "sqa-software-quality-assurance-complete-notes"
    ]
  },
  {
    "id": "aoop-introduction",
    "courseId": "aoop",
    "title": "Object-oriented programming fundamentals",
    "minutes": 5,
    "objectives": [
      "Explain classes, objects and messages",
      "Compare structured and object-oriented programming"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Object-oriented programming organizes a program around objects that combine state and behaviour. A class defines a common structure; an object is a particular instance of that class."
      },
      {
        "heading": "Key concepts",
        "text": "Attributes store state and methods define operations. Encapsulation keeps representation behind an interface. Abstraction presents essential behaviour while hiding detail. Inheritance derives a specialized class from an existing one. Polymorphism allows a common operation to behave differently for different object types."
      },
      {
        "heading": "Worked example and solution",
        "text": "A Student class can hold a name and registration number and provide an enrol() method. Two Student objects have separate state even though they use the same class definition. A private balance field changed through payFees() protects rules that direct public changes could bypass."
      },
      {
        "heading": "Key terms",
        "text": "Class: a type definition. Object: an instance. Attribute: stored state. Method: behaviour. Encapsulation: controlled access to representation."
      },
      {
        "heading": "Revision questions",
        "text": "1. Distinguish a class from an object.\n2. Identify state and behaviour for a library book.\n3. Explain one benefit and one cost of OO design."
      }
    ],
    "takeaway": "Model related state and behaviour together, and make object responsibilities clear.",
    "sources": [
      "aoop-lesson-1-introduction-to-oop"
    ]
  },
  {
    "id": "aoop-java",
    "courseId": "aoop",
    "title": "Java foundations and program structure",
    "minutes": 5,
    "objectives": [
      "Describe the Java compilation and execution process",
      "Recognize data types, variables and operators"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Java source is compiled into bytecode that runs on a Java Virtual Machine. A compatible runtime on each platform executes the bytecode, which supports Java’s platform-independent approach."
      },
      {
        "heading": "Key concepts",
        "text": "A basic program contains a class, a main method, statements and blocks. Primitive types hold values such as int, double and boolean; reference types refer to objects. Variables may be local, instance or static. Constants can be declared with final; static final is commonly used for class constants. Distinguish syntax errors, runtime errors and logic errors."
      },
      {
        "heading": "Worked example and solution",
        "text": "public class Hello { public static void main(String[] args) { int units = 7; System.out.println(units); } }\n\nThe compiler checks the program structure and produces Hello.class. The JVM executes main. An incorrect arithmetic expression can compile successfully while still producing a logic error."
      },
      {
        "heading": "Key terms",
        "text": "JVM: Java Virtual Machine. Bytecode: compiled JVM instructions. Local variable: a variable in a method or block. Static field: class-level state."
      },
      {
        "heading": "Revision questions",
        "text": "1. Describe source → bytecode → execution.\n2. Give one syntax, runtime and logic error.\n3. Compare instance and static variables."
      }
    ],
    "takeaway": "Understand both program structure and execution before building larger Java classes.",
    "sources": [
      "aoop-lesson-2-introduction-to-java"
    ]
  },
  {
    "id": "aoop-control",
    "courseId": "aoop",
    "title": "Java control structures",
    "minutes": 5,
    "objectives": [
      "Select conditions and loops for a task",
      "Trace a program’s control flow"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Control structures determine the order in which statements run. Selection chooses a path, while iteration repeats a block under a stated condition."
      },
      {
        "heading": "Key concepts",
        "text": "Use if/else for conditions and switch for suitable discrete alternatives. A for loop suits counted iteration; while checks its condition before each pass; do/while runs its body at least once. break exits a loop or switch and continue moves to the next loop iteration. Carefully define initialization, condition and update."
      },
      {
        "heading": "Worked example and solution",
        "text": "To sum marks in an array, initialize total to 0, visit each mark once and add it. When counting from 0 to length - 1, using i <= length attempts an out-of-bounds access. A trace table of i and total exposes this boundary error."
      },
      {
        "heading": "Key terms",
        "text": "Selection: choosing execution paths. Iteration: repetition. Loop invariant: a property preserved across iterations. Sentinel: a special value that ends input."
      },
      {
        "heading": "Revision questions",
        "text": "1. When is do/while appropriate?\n2. Trace a for loop that prints 1 through 5.\n3. How can a loop become infinite?"
      }
    ],
    "takeaway": "Trace conditions and loop boundaries explicitly to prevent hidden flow errors.",
    "sources": [
      "aoop-lesson-3-java-control-structures"
    ]
  },
  {
    "id": "aoop-methods-arrays",
    "courseId": "aoop",
    "title": "Java methods and arrays",
    "minutes": 5,
    "objectives": [
      "Define methods with parameters and return values",
      "Use arrays safely"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A method packages an operation behind a name and parameter list. An array stores a fixed-length sequence of values of a common element type."
      },
      {
        "heading": "Key concepts",
        "text": "A method declaration states modifiers, return type, name and parameters. Arguments supply values when a method is called. Java passes argument values by value; for objects, that value is a reference. Arrays use zero-based indexes and expose their size through length. Separate computation from input/output to make methods reusable and easier to test."
      },
      {
        "heading": "Worked example and solution",
        "text": "static int sum(int[] marks) { int total = 0; for (int mark : marks) total += mark; return total; }\n\nFor {40, 60, 80}, the return value is 180. Computing an average needs a check for an empty array and an appropriate numeric type to avoid unwanted integer division."
      },
      {
        "heading": "Key terms",
        "text": "Parameter: an input variable in a method declaration. Argument: a supplied value. Return value: a method result. Index: an element position."
      },
      {
        "heading": "Revision questions",
        "text": "1. Distinguish parameters and arguments.\n2. Write a method to find a nonempty array’s maximum.\n3. Explain why index length is invalid."
      }
    ],
    "takeaway": "Use small methods with clear contracts, and check array boundaries and empty inputs.",
    "sources": [
      "aoop-lesson-4-java-functions-and-arrays"
    ]
  },
  {
    "id": "aoop-objects-classes",
    "courseId": "aoop",
    "title": "Objects, constructors and access control",
    "minutes": 5,
    "objectives": [
      "Create objects using constructors",
      "Apply access modifiers and data hiding"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The supplied sixth topic develops objects and classes in Java. A class combines fields, constructors and methods; an object supplies the particular state on which its instance methods operate."
      },
      {
        "heading": "Key concepts",
        "text": "A constructor initializes a new instance and has the class name with no return type. The this reference identifies the current instance. Access modifiers control where members may be used: private restricts a member to its declaring class, while public exposes it more widely. Keep internal fields private when updates must preserve rules and offer methods that validate changes."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a Student stores marks and computes a grade.\n\nSolution: initialize the name in the constructor, store marks in an instance array and expose a method that rejects values outside 0 to 100. A computeAverage() method handles an empty array explicitly. This follows the supplied grade-management assignment’s separation into data and methods."
      },
      {
        "heading": "Key terms",
        "text": "Constructor: an instance initializer. Field: a class member that stores state. this: a reference to the current object. Access modifier: a declaration controlling visibility."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare a constructor and a method.\n2. Why hide the marks array?\n3. Design class responsibilities for the supplied grade-management assignment."
      }
    ],
    "takeaway": "Construct valid objects and preserve their invariants through controlled operations.",
    "sources": [
      "aoop-sse-2105-lecture-notes-topic-1-6"
    ]
  },
  {
    "id": "aoop-inheritance",
    "courseId": "aoop",
    "title": "Inheritance, interfaces and polymorphism",
    "minutes": 5,
    "objectives": [
      "Distinguish inheritance from composition",
      "Explain overriding and interface-based behaviour"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Inheritance expresses an is-a relationship, allowing a subclass to specialize a superclass. Composition expresses a has-a relationship by building an object from other objects."
      },
      {
        "heading": "Key concepts",
        "text": "Java classes extend one superclass and may implement multiple interfaces. An overridden instance method provides subclass-specific behaviour and is selected at runtime through dynamic dispatch. Overloading uses the same method name with different parameter lists. Use an interface when callers should depend on a capability rather than a concrete implementation."
      },
      {
        "heading": "Worked example and solution",
        "text": "An interface Shape declares area(). Circle and Rectangle implement different calculations. A variable of type Shape can refer to either object, and shape.area() invokes the relevant implementation. A Student that has a Timetable should usually contain one rather than extend Timetable."
      },
      {
        "heading": "Key terms",
        "text": "Superclass: a base class. Subclass: a derived class. Override: replace inherited instance behaviour. Interface: a contract of operations. Composition: an object contains other objects."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare overriding and overloading.\n2. Explain dynamic dispatch with Shape.\n3. Give an inappropriate inheritance relationship and improve it."
      }
    ],
    "takeaway": "Depend on clear interfaces and use inheritance only when the substitutability relationship makes sense.",
    "sources": [
      "aoop-sse-2105-lecture-notes-topic-1-6"
    ]
  },
  {
    "id": "aoop-exceptions",
    "courseId": "aoop",
    "title": "Exceptions and robust object-oriented programs",
    "minutes": 5,
    "objectives": [
      "Explain exception propagation and handling",
      "Use cleanup and input validation appropriately"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Exceptions represent exceptional conditions that interrupt normal control flow. Handling them at an appropriate boundary helps a program respond predictably and protect its state."
      },
      {
        "heading": "Key concepts",
        "text": "A try block contains code that may fail; catch handles a matching exception; finally provides cleanup where needed. Try-with-resources manages AutoCloseable resources. Java distinguishes checked and unchecked exceptions. Validate expected input errors directly and avoid catching exceptions merely to hide failures. Use specific error messages and retain useful diagnostic information."
      },
      {
        "heading": "Worked example and solution",
        "text": "A marks importer may encounter a missing file or a value such as “absent” where a number is expected. File access and numeric conversion need appropriate handling. Reject invalid records with a clear reason; do not silently record zero and make the result look valid."
      },
      {
        "heading": "Key terms",
        "text": "Exception: an exceptional condition. Propagation: passing a failure up the call stack. Checked exception: one subject to compiler handling rules. Resource: something requiring release."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why is catching every exception and doing nothing harmful?\n2. What is the role of finally?\n3. How would you report one invalid record in a batch import?"
      }
    ],
    "takeaway": "Handle failures deliberately and keep invalid data from becoming apparently successful results.",
    "sources": [
      "aoop-sse-2105-lecture-notes-topic-1-6"
    ]
  },
  {
    "id": "aoop-gui-database",
    "courseId": "aoop",
    "title": "GUI and database programming: outline extension",
    "minutes": 5,
    "objectives": [
      "Relate events and components to object-oriented design",
      "Describe database CRUD operations"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The uploaded course outline extends beyond the introductory topic notes to GUI programming and Java database connections. This revision overview identifies those later syllabus areas; use the outline and lecturer material for their detailed treatment."
      },
      {
        "heading": "Key concepts",
        "text": "A graphical interface uses components organized in containers, and event handlers respond to user actions. Keep interface code separate from validation and persistence logic. Database CRUD means create, read, update and delete. JDBC uses a connection, prepared statements and result handling; close resources and handle failures. The outline also names Java applets as a historical syllabus topic."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a registration form saves a student.\n\nSolution: the event handler reads inputs, a validation method checks them, and a data-access method uses parameterized SQL. A database failure should leave the form available with a clear message rather than claiming the record was saved."
      },
      {
        "heading": "Key terms",
        "text": "Component: a GUI control. Container: an organizer of controls. Event handler: an action callback. JDBC: Java Database Connectivity. CRUD: create, read, update and delete."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why separate GUI and database logic?\n2. What does each CRUD operation do?\n3. Why use prepared statements?\n4. Which later outline topics require further lecturer material?"
      }
    ],
    "takeaway": "Connect interface actions to validated operations and report persistence outcomes accurately.",
    "sources": [
      "aoop-sse2105-course-outline"
    ]
  },
  {
    "id": "cbp-overview",
    "courseId": "cbp",
    "title": "Component-based software engineering overview",
    "minutes": 5,
    "objectives": [
      "Define a software component",
      "Explain development for reuse and development with reuse"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Component-based software engineering builds systems by selecting and composing reusable components. A component provides functionality through an explicit interface and can be developed and deployed with a degree of independence."
      },
      {
        "heading": "Key concepts",
        "text": "Development for reuse creates components intended for multiple contexts. Development with reuse assembles existing components into a new system. Benefits can include reduced effort and use of proven functionality, while limitations include interface mismatch, dependency constraints, licensing and limited control over evolution."
      },
      {
        "heading": "Worked example and solution",
        "text": "An e-learning application can compose authentication, document storage and quiz services. The team specifies the expected interface of each service before connecting it. Replacing storage is easier when callers use a small stable adapter rather than vendor-specific calls everywhere."
      },
      {
        "heading": "Key terms",
        "text": "Component: a unit of composition with explicit interfaces. Reuse: use of existing assets. Dependency: a required external capability. Composition: connecting parts into a system."
      },
      {
        "heading": "Revision questions",
        "text": "1. Distinguish a component from an arbitrary source file.\n2. Compare development for and with reuse.\n3. List three risks of using an existing component."
      }
    ],
    "takeaway": "Reuse works best when responsibilities, interfaces and dependencies are explicit.",
    "sources": [
      "cbp-lesson-1-component-based-software-engineering-overview"
    ]
  },
  {
    "id": "cbp-fundamentals",
    "courseId": "cbp",
    "title": "Component characteristics, interfaces and models",
    "minutes": 5,
    "objectives": [
      "Identify component characteristics",
      "Explain provided and required interfaces"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A component’s public contract describes what it offers and what it requires. Internal implementation can change independently when the public contract remains compatible."
      },
      {
        "heading": "Key concepts",
        "text": "Useful characteristics include encapsulation, composability, replaceability and independent deployment where supported. A provided interface exposes services; a required interface describes dependencies. A component model defines rules for interfaces, communication, deployment and lifecycle, helping components cooperate consistently."
      },
      {
        "heading": "Worked example and solution",
        "text": "A Payment component provides collectPayment() and requires a BankGateway interface. A test gateway can implement the required interface during development. Publishing the function name alone is insufficient: the contract must also state accepted inputs, outcomes and failure behaviour."
      },
      {
        "heading": "Key terms",
        "text": "Provided interface: offered operations. Required interface: needed operations. Contract: agreed observable behaviour. Component model: conventions and mechanisms for composing components."
      },
      {
        "heading": "Revision questions",
        "text": "1. Draw provided and required interfaces for a notification component.\n2. Why does a signature alone not define a complete contract?\n3. What makes replacement safe?"
      }
    ],
    "takeaway": "A component boundary includes behavioural expectations as well as operation names.",
    "sources": [
      "cbp-lesson-2-component-fundamentals-characteristics-and-models"
    ]
  },
  {
    "id": "cbp-selection",
    "courseId": "cbp",
    "title": "Component discovery, evaluation and selection",
    "minutes": 5,
    "objectives": [
      "Evaluate a candidate against requirements",
      "Identify compatibility and lifecycle risks"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Selecting an existing component involves more than finding a feature match. The team must assess whether the component will fit the system and remain supportable over time."
      },
      {
        "heading": "Key concepts",
        "text": "Define functional requirements, quality constraints, environment and interface expectations. Evaluate candidate functionality, documentation, compatibility, reliability evidence, security, licensing, support and update practices. A small prototype can reveal integration problems before a commitment is made. Record compromises where the system requirements are adapted to available components."
      },
      {
        "heading": "Worked example and solution",
        "text": "Two PDF viewer components both display documents. One is too large for students on limited mobile data; the other has a smaller package but lacks the needed accessibility controls. A selection matrix makes these trade-offs visible instead of choosing solely on feature count."
      },
      {
        "heading": "Key terms",
        "text": "Candidate: a possible component. Qualification: checking fitness for intended use. Compatibility: ability to cooperate. Total cost: acquisition, integration, operation and maintenance effort."
      },
      {
        "heading": "Revision questions",
        "text": "1. Prepare five evaluation criteria for a document viewer.\n2. Why use a prototype?\n3. What evidence supports a reliability claim?"
      }
    ],
    "takeaway": "Select components using explicit requirements and practical evidence of fit.",
    "sources": [
      "cbp-lecture-3-component-based-software-engineering"
    ]
  },
  {
    "id": "cbp-composition",
    "courseId": "cbp",
    "title": "Component composition, adaptation and integration",
    "minutes": 5,
    "objectives": [
      "Describe common interface mismatches",
      "Explain adapters and integration testing"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Composition connects components to achieve a larger responsibility. Even components that provide the right functions may disagree about data, calling conventions or interaction order."
      },
      {
        "heading": "Key concepts",
        "text": "An adapter translates between an expected and an existing interface. Wrappers can isolate vendor-specific details. Consider data formats, synchronous versus asynchronous calls, error handling, ordering and resource ownership. Integration tests exercise the boundaries, including unavailable services and malformed responses."
      },
      {
        "heading": "Worked example and solution",
        "text": "One component returns a date as day/month/year while another expects an ISO-style representation. An adapter validates and converts the date once at the boundary. Guessing the interpretation of 03/04 can silently corrupt data, so the source format must be explicit."
      },
      {
        "heading": "Key terms",
        "text": "Adapter: a translator between interfaces. Wrapper: a boundary around an implementation. Glue code: connection logic. Integration test: a test of interactions."
      },
      {
        "heading": "Revision questions",
        "text": "1. Give a data mismatch and a protocol mismatch.\n2. When does an adapter add too much complexity?\n3. Test an unavailable payment provider."
      }
    ],
    "takeaway": "Make mismatches visible and resolve them at well-defined integration boundaries.",
    "sources": [
      "cbp-lecture-4-component-based-software-engineering"
    ]
  },
  {
    "id": "cbp-architecture",
    "courseId": "cbp",
    "title": "Component architecture and middleware",
    "minutes": 5,
    "objectives": [
      "Explain the role of connectors and middleware",
      "Assess coupling in component architectures"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A component architecture describes responsibilities, connections and deployment arrangements. Connectors define how components interact, while middleware supplies shared communication or infrastructure services."
      },
      {
        "heading": "Key concepts",
        "text": "Interactions may use direct calls, events, messaging or remote service requests. Keep components cohesive and reduce unnecessary coupling. Remote calls introduce latency, partial failure and serialization concerns that local calls do not share. Architecture should explain data ownership, communication contracts and failure handling."
      },
      {
        "heading": "Worked example and solution",
        "text": "After enrolment, a service publishes an event that a notification component consumes. Enrolment can succeed even if email is temporarily unavailable, provided delivery is retried and duplicate messages are handled. This design trades immediate coordination for looser coupling."
      },
      {
        "heading": "Key terms",
        "text": "Connector: an interaction mechanism. Middleware: supporting communication infrastructure. Coupling: dependence between components. Cohesion: how closely a component’s responsibilities belong together."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare direct calls with event-based interaction.\n2. What extra failures occur in a distributed call?\n3. Why must duplicate events be considered?"
      }
    ],
    "takeaway": "Choose interactions that fit the required consistency, performance and failure behaviour.",
    "sources": [
      "cbp-lecture-5-component-based-software-engineering"
    ]
  },
  {
    "id": "cbp-quality-evolution",
    "courseId": "cbp",
    "title": "Component testing, deployment and evolution",
    "minutes": 5,
    "objectives": [
      "Plan tests at component and system boundaries",
      "Explain version compatibility and safe evolution"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A component may work in isolation while failing in a particular composition. Testing and release practices therefore need to cover both its own behaviour and its use within the system."
      },
      {
        "heading": "Key concepts",
        "text": "Test the component contract, edge cases, dependency failures and integration paths. Record versions and deployment configuration so a build is reproducible. Evaluate backwards compatibility before upgrading a dependency. Stage a release, monitor the relevant behaviour and retain a practical recovery path when an upgrade causes problems."
      },
      {
        "heading": "Worked example and solution",
        "text": "A library update changes a method’s default ordering. Unit tests of the application’s own calculations still pass, but a transcript integration test reveals the changed order. Pinning known versions and testing the contract helps catch this before deployment."
      },
      {
        "heading": "Key terms",
        "text": "Version: an identifiable release. Compatibility: preservation of expected interactions. Regression test: checking earlier behaviour after change. Deployment configuration: runtime arrangements."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why are component unit tests insufficient for a whole application?\n2. What makes an upgrade breaking?\n3. List information needed to reproduce a release."
      }
    ],
    "takeaway": "Treat component changes as system changes and verify the contracts the system relies on.",
    "sources": [
      "cbp-component-based-system-engineering-cbse-condensed-to-10-lessons"
    ]
  },
  {
    "id": "dba-role",
    "courseId": "dba",
    "title": "Database administration and the DBA role",
    "minutes": 5,
    "objectives": [
      "Explain database administration responsibilities",
      "Distinguish logical and physical administration tasks"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Database systems administration keeps a database available, secure, consistent and recoverable. The DBA manages the database environment as well as the data structures used by applications."
      },
      {
        "heading": "Key concepts",
        "text": "Responsibilities include installation, configuration, user management, storage planning, monitoring, backup, recovery and performance tuning. Logical concerns include schemas, constraints and privileges; physical concerns include storage layout, files, memory and capacity. Administrative changes should be documented and tested before broad use."
      },
      {
        "heading": "Worked example and solution",
        "text": "A university database has separate responsibilities for registration, examinations and finance. The DBA provides appropriate access, monitors capacity and prepares recovery procedures so a disk failure does not make student records unrecoverable."
      },
      {
        "heading": "Key terms",
        "text": "DBA: database administrator. DBMS: database management system. Instance: a running database environment. Schema: the logical organization of database objects."
      },
      {
        "heading": "Revision questions",
        "text": "1. List five DBA responsibilities.\n2. Compare logical and physical administration.\n3. Why must administrative changes be recorded?"
      }
    ],
    "takeaway": "Administration is continuous stewardship of availability, integrity, security and recovery.",
    "sources": [
      "dba-database-systems-administration"
    ]
  },
  {
    "id": "dba-install-storage",
    "courseId": "dba",
    "title": "Database installation, configuration and storage",
    "minutes": 5,
    "objectives": [
      "Plan a database environment",
      "Explain storage and capacity considerations"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A dependable database installation begins with workload and recovery requirements. Configuration connects those requirements to the resources and operating environment available."
      },
      {
        "heading": "Key concepts",
        "text": "Check software prerequisites, supported environment, storage capacity, memory, accounts and connectivity. Organize data and log storage according to the chosen DBMS. Estimate growth and monitor remaining capacity. Separate development and production responsibilities, and keep configuration information sufficient to rebuild the environment."
      },
      {
        "heading": "Worked example and solution",
        "text": "A registration workload grows sharply at semester start. Planning must include expected concurrent sessions, transaction volume and room for logs and backups. A database with enough space for tables can still stop accepting writes if its log storage fills."
      },
      {
        "heading": "Key terms",
        "text": "Data file: stored database pages. Log: records used to support transaction recovery. Capacity planning: estimating resource demand. Configuration: selected operational settings."
      },
      {
        "heading": "Revision questions",
        "text": "1. What should be checked before installation?\n2. Why plan capacity for logs as well as data?\n3. Which configuration details belong in recovery documentation?"
      }
    ],
    "takeaway": "Plan storage and configuration for operation, growth and restoration.",
    "sources": [
      "dba-database-systems-administration"
    ]
  },
  {
    "id": "dba-security",
    "courseId": "dba",
    "title": "Users, roles, privileges and database security",
    "minutes": 5,
    "objectives": [
      "Distinguish authentication and authorization",
      "Apply least privilege to database access"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Authentication establishes an identity; authorization determines which actions that identity may perform. Database security uses both controls alongside auditing and protection of stored information."
      },
      {
        "heading": "Key concepts",
        "text": "Assign privileges to roles that match responsibilities rather than granting broad administrator access. Separate application accounts from personal administrator accounts. Review grants, remove obsolete access and protect credentials. Parameterized statements address injection risks in application queries; they do not replace database privileges."
      },
      {
        "heading": "Worked example and solution",
        "text": "A marks clerk may enter marks for assigned work but should not alter finance records or grant new roles. A reporting account may read approved views while lacking update permission. If the reporting credentials leak, the restricted privileges reduce the possible impact."
      },
      {
        "heading": "Key terms",
        "text": "Role: a named set of permissions. Privilege: an allowed operation. Least privilege: only the access required. Audit: a record of relevant actions."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare authentication and authorization.\n2. Design roles for a small library database.\n3. Why should an application avoid using a DBA account?"
      }
    ],
    "takeaway": "Use narrowly scoped roles and verify access with the account that will actually run the task.",
    "sources": [
      "dba-database-systems-administration"
    ]
  },
  {
    "id": "dba-backup-recovery",
    "courseId": "dba",
    "title": "Backup, recovery and disaster planning",
    "minutes": 5,
    "objectives": [
      "Compare backup and recovery",
      "Explain recovery objectives and restore testing"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A backup is a recoverable copy of data and required supporting information. Recovery restores service after damage, loss or another disruption; a backup is useful only when the recovery process works."
      },
      {
        "heading": "Key concepts",
        "text": "Backup strategies may combine full backups, incremental changes and transaction logs, depending on DBMS capabilities. The recovery point objective concerns acceptable data loss; the recovery time objective concerns acceptable outage duration. Retain protected copies and test restoration in a suitable separate environment. Document the order and prerequisites of recovery steps."
      },
      {
        "heading": "Worked example and solution",
        "text": "A full backup taken on Sunday may require later change backups and logs to recover to Thursday morning. Restoring only Sunday’s copy loses the intervening work. A restoration exercise reveals whether the required files, keys, accounts and instructions are actually available."
      },
      {
        "heading": "Key terms",
        "text": "RPO: acceptable data-loss window. RTO: target time to restore service. Full backup: a complete selected data copy. Restore test: verification that recovery can be performed."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why is a successful backup job not proof of recoverability?\n2. Compare RPO and RTO.\n3. What should a recovery exercise verify?"
      }
    ],
    "takeaway": "Design backups around recovery needs, and prove the plan with restoration tests.",
    "sources": [
      "dba-database-systems-administration"
    ]
  },
  {
    "id": "dba-transactions",
    "courseId": "dba",
    "title": "Transactions, concurrency and integrity",
    "minutes": 5,
    "objectives": [
      "Describe ACID properties",
      "Explain locking, isolation and deadlocks"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A transaction groups related operations into a logical unit of work. Concurrent access needs coordination so that each transaction preserves the database’s rules."
      },
      {
        "heading": "Key concepts",
        "text": "Atomicity gives all-or-nothing outcomes; consistency preserves defined constraints; isolation controls the effects of concurrent work; durability preserves committed changes. Locks and other concurrency mechanisms regulate access. A deadlock occurs when transactions wait cyclically for resources. Isolation choices affect both anomalies and concurrency."
      },
      {
        "heading": "Worked example and solution",
        "text": "Transferring 1,000 between accounts requires a debit and a credit. If only the debit commits, the operation breaks its intended invariant. A transaction groups both updates. If two transfers lock accounts in opposite orders, consistent lock ordering can reduce deadlock risk."
      },
      {
        "heading": "Key terms",
        "text": "Commit: make a transaction’s results durable. Rollback: undo an uncommitted transaction. Deadlock: cyclic waiting. Constraint: a rule enforced on data."
      },
      {
        "heading": "Revision questions",
        "text": "1. Explain each ACID property using a transfer.\n2. How can concurrent updates lose work?\n3. Give one strategy to reduce deadlocks."
      }
    ],
    "takeaway": "Use transactions and constraints to preserve business rules even when users work concurrently.",
    "sources": [
      "dba-database-systems-administration"
    ]
  },
  {
    "id": "dba-performance",
    "courseId": "dba",
    "title": "Monitoring, maintenance and performance tuning",
    "minutes": 5,
    "objectives": [
      "Identify common database bottlenecks",
      "Use measurements to guide tuning"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Database tuning improves a measured workload while preserving correctness and operational requirements. Begin by establishing which resource or query actually limits performance."
      },
      {
        "heading": "Key concepts",
        "text": "Monitor query duration, execution plans, wait conditions, storage use, memory, I/O and concurrent activity. Indexes can accelerate suitable lookups but consume space and add update cost. Maintain relevant statistics and review query design. Change one factor at a time where practical, then compare against a repeatable baseline."
      },
      {
        "heading": "Worked example and solution",
        "text": "A transcript query repeatedly scans a large results table for one student. An appropriate index may reduce the rows examined. Measure the plan and timing before and after the change, and check the effect on results entry because each insert must maintain the index."
      },
      {
        "heading": "Key terms",
        "text": "Execution plan: the strategy chosen for a query. Index: an auxiliary access structure. Baseline: reference measurements. Bottleneck: the limiting resource or step."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why measure before adding an index?\n2. Give one index benefit and one cost.\n3. What makes a before/after comparison meaningful?"
      }
    ],
    "takeaway": "Tune the observed workload using evidence, and include maintenance and write costs.",
    "sources": [
      "dba-database-systems-administration"
    ]
  },
  {
    "id": "dba-upgrades",
    "courseId": "dba",
    "title": "Database upgrades, migration and fallback",
    "minutes": 5,
    "objectives": [
      "Plan an upgrade with verification and recovery",
      "Distinguish migration from routine configuration"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The supplied administration notes cover moving a database environment forward while protecting existing data and applications. An upgrade changes software versions; a migration may also change platforms, formats or deployment arrangements."
      },
      {
        "heading": "Key concepts",
        "text": "Check compatibility, estimate downtime and rehearse the process on a representative environment. Back up required data and configuration, define verification steps and establish a feasible fallback. Compare row counts and important business totals, check application queries and verify permissions. A completed installer alone does not prove the database is ready."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a university updates its DBMS before registration.\n\nSolution: rehearse with a restored copy, run representative enrolment and transcript operations, record the expected outage and test the fallback procedure. After migration, verify key totals and access under actual application roles before reopening service."
      },
      {
        "heading": "Key terms",
        "text": "Upgrade: a software version change. Migration: moving data or environment. Fallback: a prepared return to an acceptable prior state. Verification: checking required results."
      },
      {
        "heading": "Revision questions",
        "text": "1. What should a rehearsal establish?\n2. Why may fallback require more than reinstalling old software?\n3. List checks after a migration."
      }
    ],
    "takeaway": "Treat an upgrade as a controlled data and application change with a tested recovery path.",
    "sources": [
      "dba-database-systems-administration"
    ]
  },
  {
    "id": "dba-index-architecture",
    "courseId": "dba",
    "title": "Database architectures, clustering and indexes",
    "minutes": 5,
    "objectives": [
      "Compare deployment and availability arrangements",
      "Explain how B+ tree indexes support queries"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The supplied notes connect DBMS selection and architecture to clustering, hardware, cloud deployment and index structures. These choices support different workload, availability and cost requirements."
      },
      {
        "heading": "Key concepts",
        "text": "Separate the application’s logical database requirements from its physical deployment. A cluster coordinates multiple nodes according to the selected DBMS design; it does not remove the need for backup. B+ tree indexes organize keys in a balanced search structure and link leaf entries for ordered traversal. Index benefit depends on selectivity, query shape and maintenance cost."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a query retrieves students with registration numbers in a range.\n\nSolution: an appropriate ordered index can locate the start and scan matching leaf entries. A query returning almost every row may instead favor a scan. Inspect the execution plan rather than assuming the presence of an index guarantees its use."
      },
      {
        "heading": "Key terms",
        "text": "Cluster: coordinated database nodes. Selectivity: how narrowly a condition filters rows. B+ tree: a balanced ordered index structure. Query optimizer: a component that chooses an execution plan."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why is clustering different from backup?\n2. How does an ordered index support a range query?\n3. Why might an optimizer choose a scan?"
      }
    ],
    "takeaway": "Choose architecture and access structures against the actual workload and recovery needs.",
    "sources": [
      "dba-database-systems-administration"
    ]
  },
  {
    "id": "sys-introduction",
    "courseId": "sys",
    "title": "Introduction to systems programming",
    "minutes": 5,
    "objectives": [
      "Distinguish system and application software",
      "Explain the role of operating-system interfaces"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Systems programming develops software close to the operating environment, including translators, loaders, utilities and code that uses operating-system services directly."
      },
      {
        "heading": "Key concepts",
        "text": "Application software serves end-user tasks, while system software supports program execution and manages machine resources. System programs must understand data representation, execution, files and resource ownership. A system call is a controlled request for an operating-system service; a library function may wrap one or more such calls."
      },
      {
        "heading": "Worked example and solution",
        "text": "A file-copy utility repeatedly reads bytes and writes them to another file. It must handle errors, partial operations and cleanup as well as the normal path. The operating system mediates access to storage so the program does not directly control the hardware."
      },
      {
        "heading": "Key terms",
        "text": "System software: software supporting the computing environment. System call: an OS service request. Utility: a supporting program. Resource: a managed capability such as a file handle."
      },
      {
        "heading": "Revision questions",
        "text": "1. Give four examples of system software.\n2. Compare a library call with a system call.\n3. Why does resource cleanup matter?"
      }
    ],
    "takeaway": "Systems programs coordinate with the operating environment and must handle its constraints explicitly.",
    "sources": [
      "sys-systems-programing-lesson-1"
    ]
  },
  {
    "id": "sys-linux",
    "courseId": "sys",
    "title": "Linux foundations and the systems toolbox",
    "minutes": 5,
    "objectives": [
      "Explain kernel and user-space responsibilities",
      "Recognize compilation and debugging tools"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The first two COM 312 lessons introduce Linux history and design, the kernel, libraries, utilities, system calls and the programming toolbox. User programs request kernel-managed services through defined interfaces."
      },
      {
        "heading": "Key concepts",
        "text": "The kernel manages resources such as processes, memory and devices. Libraries provide reusable interfaces, and shells and utilities support interaction. The GCC pipeline preprocesses, compiles, assembles and links. Tools in the supplied notes include gcc, gdb, NASM, readelf, objdump, od, nm, ldd and ldconfig, each addressing a different part of building or inspecting programs."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a C program compiles but fails to link.\n\nSolution: distinguish a source error from a missing symbol or library at the linking stage. Inspect the relevant symbols and linker inputs, then use a debugger for execution-time faults. Choosing the tool depends on which stage failed."
      },
      {
        "heading": "Key terms",
        "text": "Kernel: the privileged operating-system core. User space: the environment for ordinary programs. Compiler: a source translator. Debugger: a tool for inspecting execution."
      },
      {
        "heading": "Revision questions",
        "text": "1. Name the four GCC stages in order.\n2. Compare kernel and library responsibilities.\n3. Which tool category helps inspect a runtime crash?"
      }
    ],
    "takeaway": "Identify the failing stage and use the Linux tool that exposes the needed evidence.",
    "sources": [
      "sys-systems-programing-lesson-1"
    ]
  },
  {
    "id": "sys-translators",
    "courseId": "sys",
    "title": "Language processors, assemblers and compilers",
    "minutes": 5,
    "objectives": [
      "Compare assemblers, compilers and interpreters",
      "Describe translation stages"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Language processors transform or execute program representations. An assembler translates assembly language; a compiler translates a source language into a target form; an interpreter executes the represented operations through an interpreting environment."
      },
      {
        "heading": "Key concepts",
        "text": "Translation can involve lexical analysis, parsing, semantic checks, intermediate representation and code generation. Assemblers resolve mnemonics, labels and address information. A symbol table records identifiers and relevant attributes. A two-pass assembler can first establish symbol locations and then generate code using the completed table."
      },
      {
        "heading": "Worked example and solution",
        "text": "An assembly jump may refer to a label defined later in the source. The first pass records where labels belong. The second pass can encode the jump target. Without a strategy for forward references, the translator does not yet know the required address."
      },
      {
        "heading": "Key terms",
        "text": "Symbol table: recorded identifier information. Token: a lexical unit. Object code: translated code awaiting further preparation where required. Forward reference: use before definition."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare an assembler and a compiler.\n2. Why use two passes?\n3. What information belongs in a symbol table?"
      }
    ],
    "takeaway": "Translation connects program meaning to executable representation through organized stages.",
    "sources": [
      "sys-systems-programming-lesson-2"
    ]
  },
  {
    "id": "sys-linkers-loaders",
    "courseId": "sys",
    "title": "Linkers, loaders and program execution",
    "minutes": 5,
    "objectives": [
      "Distinguish linking from loading",
      "Explain relocation and external symbol resolution"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Separately translated modules must be connected and prepared for execution. A linker combines modules and resolves references; a loader arranges the program in memory for execution."
      },
      {
        "heading": "Key concepts",
        "text": "External symbols connect references in one module to definitions elsewhere. Relocation adjusts address-dependent information for the assigned location. Static linking includes selected code in the linked result, while dynamic linking defers some connections to shared libraries. Exact behaviour depends on the operating system and executable format."
      },
      {
        "heading": "Worked example and solution",
        "text": "main refers to a helper function compiled in another file. The linker connects that reference to the helper’s definition. When the program is placed at a different memory location, address-dependent references must remain valid through the platform’s relocation and loading mechanisms."
      },
      {
        "heading": "Key terms",
        "text": "Linker: connects translated modules. Loader: prepares execution in memory. Relocation: address adjustment. External symbol: a name resolved outside its defining module."
      },
      {
        "heading": "Revision questions",
        "text": "1. What is an unresolved external symbol?\n2. Compare linking and loading.\n3. Give a benefit and a constraint of shared libraries."
      }
    ],
    "takeaway": "Execution requires correctly connected modules and valid runtime addresses.",
    "sources": [
      "sys-systems-programming-lesson-2"
    ]
  },
  {
    "id": "sys-filesystems",
    "courseId": "sys",
    "title": "Linux filesystems, inodes and shell scripting",
    "minutes": 5,
    "objectives": [
      "Describe the Unix directory hierarchy and inodes",
      "Connect shell operations with file APIs"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The third systems lesson covers the Linux directory tree, Unix/POSIX filesystem concepts, file support in the kernel and shell scripting. Pathnames identify entries in a directory hierarchy rooted at /."
      },
      {
        "heading": "Key concepts",
        "text": "An inode stores filesystem metadata and references to file contents; a directory associates names with filesystem objects. Paths may be absolute or relative. Permissions regulate access and depend on the operation and containing directories. A shell expands commands, redirects streams and composes programs through pipes. Scripts should handle spaces, failed commands and expected input carefully."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a script processes lecture files whose names contain spaces.\n\nSolution: preserve each pathname as a single argument through appropriate quoting, check whether file operations succeeded and distinguish the current working directory from an absolute path. Splitting a pathname on spaces can make a valid file appear missing."
      },
      {
        "heading": "Key terms",
        "text": "Inode: filesystem metadata and content references. Path: a location expressed through names. Directory: name-to-object associations. Redirection: connecting a command’s input/output to another source."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare an inode and a filename.\n2. Give an absolute and a relative path.\n3. Why must shell scripts preserve argument boundaries?"
      }
    ],
    "takeaway": "Understand file identity, naming and access separately when working with Linux files.",
    "sources": [
      "sys-systems-programming-lesson-3"
    ]
  },
  {
    "id": "sys-files",
    "courseId": "sys",
    "title": "File operations, signals and resource handling",
    "minutes": 5,
    "objectives": [
      "Explain file descriptors and partial I/O",
      "Describe safe cleanup around errors and signals"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "System-level I/O uses handles or descriptors to refer to open resources. Robust programs handle failure, interruptions and partial progress rather than assuming each request completes fully."
      },
      {
        "heading": "Key concepts",
        "text": "A POSIX-style file sequence uses open, read/write and close. A read can return fewer bytes than requested or reach end-of-file; a write can make partial progress. Signals notify processes of events and require careful handling under the platform’s restrictions. Release owned resources on all appropriate exit paths."
      },
      {
        "heading": "Worked example and solution",
        "text": "A copy loop reads a block, then continues writing until all bytes from that block have been written. It checks error results and closes both descriptors on completion or failure. Counting every request as a full block would corrupt the copied file when an operation completes partially."
      },
      {
        "heading": "Key terms",
        "text": "Descriptor: a process reference to an open resource. EOF: end-of-file. Partial write: fewer bytes written than requested. Signal: an asynchronous process notification."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why must a copy loop track bytes actually written?\n2. Distinguish EOF from an I/O error.\n3. What resources must be released when setup fails halfway?"
      }
    ],
    "takeaway": "Use actual return values and clear ownership rules for reliable low-level operations.",
    "sources": [
      "sys-systems-programming-lesson-3"
    ]
  },
  {
    "id": "sys-processes",
    "courseId": "sys",
    "title": "Processes and process control",
    "minutes": 5,
    "objectives": [
      "Distinguish a process from a program",
      "Describe process creation and termination"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A program is stored instructions; a process is an executing instance with runtime state and resources. Operating systems manage process creation, scheduling, waiting and termination."
      },
      {
        "heading": "Key concepts",
        "text": "Process state includes execution context, address space and resource references. In a POSIX-style model, fork creates a child process, exec replaces the executing program image and wait collects child termination status. These calls have distinct roles. Check failures and distinguish parent and child control paths."
      },
      {
        "heading": "Worked example and solution",
        "text": "A command shell starts a child, arranges its input/output, runs the requested program and waits when appropriate. If it never collects finished children, process-management records can accumulate. A forked child is not automatically running a different program; exec performs that replacement."
      },
      {
        "heading": "Key terms",
        "text": "PID: process identifier. Parent/child: a process creation relationship. Context: execution state. Exit status: a recorded termination result."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare a program and a process.\n2. Explain fork, exec and wait separately.\n3. Why should a parent inspect a child’s exit status?"
      }
    ],
    "takeaway": "Track which process owns each action and resource throughout creation and termination.",
    "sources": [
      "sys-systems-programming-lesson-4-1",
      "sys-systems-programming-lesson-4"
    ]
  },
  {
    "id": "sys-ipc",
    "courseId": "sys",
    "title": "Inter-process communication",
    "minutes": 5,
    "objectives": [
      "Compare pipes, messages and shared memory",
      "Explain synchronization needs in communication"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Processes coordinate through inter-process communication (IPC). The mechanism chosen affects data flow, coupling, performance and failure behaviour."
      },
      {
        "heading": "Key concepts",
        "text": "Pipes provide byte-stream communication; message queues preserve message-oriented exchange; shared memory exposes a common region to participating processes. Shared data requires synchronization to prevent races. Blocking operations can wait for data or capacity, while nonblocking operations require the program to handle unavailable progress explicitly."
      },
      {
        "heading": "Worked example and solution",
        "text": "In a producer-consumer system, one process places work in a bounded buffer and another removes it. Shared memory can avoid repeated copying, but both processes must coordinate updates to buffer positions and capacity. A pipe provides a different interface with the OS mediating the stream."
      },
      {
        "heading": "Key terms",
        "text": "IPC: inter-process communication. Race condition: an outcome depending on uncoordinated timing. Synchronization: control over concurrent access. Blocking: waiting until an operation can proceed."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare shared memory with a pipe.\n2. Identify the race in two unsynchronized counter increments.\n3. When can blocking communication deadlock?"
      }
    ],
    "takeaway": "Communication and synchronization must be designed together.",
    "sources": [
      "sys-systems-programming-lesson-5-6-combined-pdf"
    ]
  },
  {
    "id": "sys-threads",
    "courseId": "sys",
    "title": "POSIX threads and synchronization",
    "minutes": 5,
    "objectives": [
      "Distinguish threads from processes",
      "Explain mutexes, semaphores and critical sections"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The updated sixth lesson introduces POSIX threads, thread identifiers and synchronization. Threads share a process environment while each has its own execution flow."
      },
      {
        "heading": "Key concepts",
        "text": "Shared state creates races when operations overlap without coordination. A mutex provides mutual exclusion for a critical section. A semaphore maintains a count used to coordinate access or available work. Choose clear lock ownership, keep protected work limited and use a consistent lock order. Waiting for threads and releasing synchronization resources are part of the lifecycle."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: two threads increment the same counter.\n\nSolution: reading, adding and storing are a compound operation. Without coordination, both may read the same old value and one update is lost. Protect the read-modify-write sequence with suitable synchronization; locking only the final assignment is insufficient."
      },
      {
        "heading": "Key terms",
        "text": "Thread: an execution flow within a process. Critical section: code accessing shared state that needs coordination. Mutex: a mutual-exclusion mechanism. Semaphore: a counting synchronization mechanism."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why can a counter update lose work?\n2. Compare a mutex and a counting semaphore.\n3. How can inconsistent lock order lead to deadlock?"
      }
    ],
    "takeaway": "Protect the whole shared-state operation and make synchronization ownership explicit.",
    "sources": [
      "sys-systems-programming-lesson-6-updated"
    ]
  },
  {
    "id": "sys-sockets",
    "courseId": "sys",
    "title": "Unix socket programming: TCP and UDP",
    "minutes": 5,
    "objectives": [
      "Describe client and server socket flows",
      "Compare stream and datagram communication"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "The seventh systems lesson introduces Unix socket APIs and client-server communication. A socket represents a communication endpoint with an address and protocol arrangement."
      },
      {
        "heading": "Key concepts",
        "text": "A typical TCP server creates a socket, binds an address, listens and accepts a connection; the client connects before exchanging data. TCP provides a byte stream, so applications need their own message framing. UDP sends datagrams and has different delivery and ordering guarantees. Check return values and handle disconnection, timeouts and partial stream operations."
      },
      {
        "heading": "Worked example and solution",
        "text": "Example: a TCP client sends a length followed by a message.\n\nSolution: the receiver first collects the complete length field, validates it and then reads exactly the announced number of bytes using a loop. One receive call need not return one whole application message, even if the sender used one send call."
      },
      {
        "heading": "Key terms",
        "text": "Socket: a communication endpoint. Bind: assign a local address. Listen/accept: prepare for and receive connections. Datagram: an individually addressed message. Framing: defining message boundaries."
      },
      {
        "heading": "Revision questions",
        "text": "1. List the main TCP server steps.\n2. Why does TCP require application message framing?\n3. Compare stream and datagram behaviour."
      }
    ],
    "takeaway": "Design the application protocol as carefully as the socket call sequence.",
    "sources": [
      "sys-systems-programming-lesson-7"
    ]
  },
  {
    "id": "daa-introduction",
    "courseId": "daa",
    "title": "Algorithms, correctness and problem solving",
    "minutes": 5,
    "objectives": [
      "Describe algorithm properties",
      "Explain correctness and loop invariants"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "An algorithm is a finite, well-defined sequence of steps for solving a specified problem. Analysis separates whether a solution is correct from how many resources it requires."
      },
      {
        "heading": "Key concepts",
        "text": "State inputs, outputs and assumptions before designing steps. A correctness argument connects the procedure to the specification. For a loop, an invariant should hold initially, remain true after each iteration and establish the desired result at termination. Testing examples supports debugging but does not replace a general correctness argument."
      },
      {
        "heading": "Worked example and solution",
        "text": "To find the maximum of a nonempty array, keep the largest value seen so far. After each iteration, the invariant is that best equals the maximum of the inspected prefix. At termination the prefix is the whole array, so best is the required maximum."
      },
      {
        "heading": "Key terms",
        "text": "Specification: required input/output behaviour. Invariant: a preserved assertion. Termination: eventual completion. Correctness: satisfying the specification under its assumptions."
      },
      {
        "heading": "Revision questions",
        "text": "1. State the precondition for the maximum algorithm.\n2. Give its loop invariant.\n3. Why do ten passing examples not prove correctness for every input?"
      }
    ],
    "takeaway": "Begin with a precise problem and justify both the result and termination.",
    "sources": [
      "daa-daa-outline"
    ]
  },
  {
    "id": "daa-asymptotic",
    "courseId": "daa",
    "title": "Asymptotic analysis and growth of functions",
    "minutes": 5,
    "objectives": [
      "Interpret O, Omega and Theta bounds",
      "Compare common growth rates"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Asymptotic analysis describes how resource use grows as input size becomes large. It emphasizes growth rate rather than machine-specific elapsed time."
      },
      {
        "heading": "Key concepts",
        "text": "Big O gives an asymptotic upper bound, Omega a lower bound and Theta a tight bound. State whether the analyzed function is worst-case, average-case or another measure; O itself does not mean worst-case. Common rates include constant, logarithmic, linear, n log n, quadratic and exponential. Constants and lower-order terms are ignored when deriving asymptotic classes."
      },
      {
        "heading": "Worked example and solution",
        "text": "The function 3n² + 5n + 8 is Theta(n²). A loop visiting n items with constant work per item is Theta(n). Two nested loops each making n iterations perform Theta(n²) work. Doubling n roughly quadruples the dominant quadratic term."
      },
      {
        "heading": "Key terms",
        "text": "Input size: the parameter measuring problem scale. O: upper bound. Omega: lower bound. Theta: matching upper and lower bounds. Dominant term: the term governing growth."
      },
      {
        "heading": "Revision questions",
        "text": "1. Order log n, n, n log n and n² by growth.\n2. Explain why O(n²) is not necessarily a tight bound.\n3. Analyze two sequential linear loops."
      }
    ],
    "takeaway": "State the input measure, case and bound clearly before comparing algorithms.",
    "sources": [
      "daa-lecture-2-asymptotic-analysis"
    ]
  },
  {
    "id": "daa-recurrences",
    "courseId": "daa",
    "title": "Recurrences and recursive algorithms",
    "minutes": 5,
    "objectives": [
      "Form a recurrence from a recursive algorithm",
      "Use expansion or a recursion tree to estimate cost"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A recurrence expresses the cost of a recursive problem using the cost of smaller instances. It must include both recursive work and the work done outside recursive calls."
      },
      {
        "heading": "Key concepts",
        "text": "Identify the number of subproblems, their sizes, combination work and base case. Expansion and recursion trees show how work accumulates by level. Where applicable, the Master theorem compares a recurrence of the form T(n) = aT(n/b) + f(n) with the subproblem growth. Check its conditions rather than applying a memorized result to every recurrence."
      },
      {
        "heading": "Worked example and solution",
        "text": "Merge sort has T(n) = 2T(n/2) + Theta(n). Each level contributes Theta(n), and there are Theta(log n) levels, giving Theta(n log n). Binary search keeps only one half, giving T(n) = T(n/2) + Theta(1) and Theta(log n) time."
      },
      {
        "heading": "Key terms",
        "text": "Recurrence: a recursive cost equation. Base case: a directly solved instance. Recursion tree: a representation of subproblem work. Depth: the longest chain of recursive calls."
      },
      {
        "heading": "Revision questions",
        "text": "1. Form a recurrence for binary search.\n2. Explain merge sort’s cost per level.\n3. What changes if each recursive call keeps n - 1 items?"
      }
    ],
    "takeaway": "Count all subproblem and combination work, and include a valid stopping condition.",
    "sources": [
      "daa-daa-outline"
    ]
  },
  {
    "id": "daa-divide-conquer",
    "courseId": "daa",
    "title": "Divide and conquer",
    "minutes": 5,
    "objectives": [
      "Identify divide, conquer and combine steps",
      "Analyze merge sort and binary search"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Divide and conquer breaks a problem into smaller related instances, solves them and combines their results. The quality of the division and the cost of combination determine efficiency."
      },
      {
        "heading": "Key concepts",
        "text": "Merge sort divides the sequence in half and merges sorted halves. Quicksort partitions around a pivot; balanced partitions give efficient behaviour, while consistently unbalanced ones can give quadratic time. Binary search discards half a sorted search range after a comparison. Confirm that prerequisites such as sorted input hold."
      },
      {
        "heading": "Worked example and solution",
        "text": "Searching [3, 8, 12, 19, 25] for 19 first compares the middle value 12. Only the right portion can contain the target, so the other half is discarded. Repeating this reduction yields logarithmic comparisons, provided the sequence is sorted."
      },
      {
        "heading": "Key terms",
        "text": "Partition: divide according to a criterion. Pivot: a partition reference value. Merge: combine ordered sequences. Subproblem: a smaller instance."
      },
      {
        "heading": "Revision questions",
        "text": "1. Identify the three merge sort phases.\n2. Why can quicksort take quadratic time?\n3. What makes binary search invalid on unsorted data?"
      }
    ],
    "takeaway": "Efficient division shrinks the remaining work while preserving the problem’s correctness conditions.",
    "sources": [
      "daa-daa-outline"
    ]
  },
  {
    "id": "daa-greedy",
    "courseId": "daa",
    "title": "Greedy algorithms",
    "minutes": 5,
    "objectives": [
      "Explain the greedy-choice property",
      "Distinguish a valid greedy solution from a heuristic"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "A greedy algorithm repeatedly makes a locally preferred choice. It is correct for a problem only when those choices can be justified as part of a global optimum."
      },
      {
        "heading": "Key concepts",
        "text": "Common examples include activity selection, fractional knapsack and minimum spanning tree methods. Greedy-choice and optimal-substructure arguments justify suitable problems. Fractional knapsack can select by value-to-weight ratio because items may be divided; the same rule does not generally solve 0/1 knapsack. Dijkstra’s shortest-path method assumes nonnegative edge weights."
      },
      {
        "heading": "Worked example and solution",
        "text": "For compatible activity scheduling on one resource, choose the activity that finishes earliest, then repeat among activities starting after it. This leaves maximum room for later activities. Choosing the shortest duration instead can block a better sequence."
      },
      {
        "heading": "Key terms",
        "text": "Greedy choice: a locally selected action. Optimal substructure: optimal solutions contain appropriate optimal subsolutions. MST: a minimum-weight spanning tree. Feasible: satisfying constraints."
      },
      {
        "heading": "Revision questions",
        "text": "1. Why does a greedy rule require proof?\n2. Contrast fractional and 0/1 knapsack.\n3. State an assumption of Dijkstra’s algorithm."
      }
    ],
    "takeaway": "A simple local rule is an algorithmic solution only when its global correctness is established.",
    "sources": [
      "daa-daa-outline"
    ]
  },
  {
    "id": "daa-dynamic-programming",
    "courseId": "daa",
    "title": "Dynamic programming",
    "minutes": 5,
    "objectives": [
      "Recognize overlapping subproblems",
      "Define states, recurrences and base cases"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Dynamic programming avoids repeating the same subproblem computations. It is useful when a problem has suitable optimal substructure and overlapping subproblems."
      },
      {
        "heading": "Key concepts",
        "text": "Define what each state means, derive a recurrence, specify base cases and choose an evaluation order that respects dependencies. Memoization stores results of recursive calls; tabulation builds a table directly. Matrix-chain multiplication, longest common subsequence and optimal binary search trees are key examples in the supplied outline."
      },
      {
        "heading": "Worked example and solution",
        "text": "For Fibonacci numbers, plain recursion repeatedly recomputes earlier values. Storing each F(i) means each state is evaluated once. For an optimization problem such as matrix-chain order, also store the choice producing the optimum if the actual solution must be reconstructed."
      },
      {
        "heading": "Key terms",
        "text": "State: a subproblem representation. Memoization: caching recursive results. Tabulation: evaluating a table of states. Reconstruction: recovering choices from stored decisions."
      },
      {
        "heading": "Revision questions",
        "text": "1. Compare memoization and tabulation.\n2. Why must the state meaning be precise?\n3. What additional data is needed to reconstruct an optimal solution?"
      }
    ],
    "takeaway": "Design the state and dependency relation before writing the dynamic-programming table.",
    "sources": [
      "daa-daa-outline"
    ]
  },
  {
    "id": "daa-graphs",
    "courseId": "daa",
    "title": "Graph algorithms, paths and spanning trees",
    "minutes": 5,
    "objectives": [
      "Choose adjacency lists or matrices",
      "Explain BFS, DFS and topological ordering"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Graphs represent relationships using vertices and edges. The representation and traversal method should fit the problem’s operations and density."
      },
      {
        "heading": "Key concepts",
        "text": "Adjacency lists use Theta(V + E) space, while an adjacency matrix uses Theta(V²). BFS explores by layers and finds shortest paths by edge count in an unweighted graph. DFS explores deeply and supports cycle-related reasoning and ordering tasks. Topological order exists for a directed acyclic graph. A minimum spanning tree and a shortest-path tree optimize different objectives."
      },
      {
        "heading": "Worked example and solution",
        "text": "Model prerequisite units with directed edges from prerequisite to dependent unit. A topological ordering gives an order that respects prerequisites if there is no directed cycle. A cycle means those stated prerequisites cannot all be satisfied sequentially."
      },
      {
        "heading": "Key terms",
        "text": "Vertex: an entity. Edge: a relationship. Path: a sequence of connected vertices. Cycle: a closed path. DAG: directed acyclic graph."
      },
      {
        "heading": "Revision questions",
        "text": "1. When is an adjacency list preferable?\n2. Why does BFS give shortest unweighted paths?\n3. Compare an MST and a shortest-path tree."
      }
    ],
    "takeaway": "Match graph direction, weights and representation to the question being answered.",
    "sources": [
      "daa-daa-outline"
    ]
  },
  {
    "id": "stacks",
    "courseId": "daa",
    "title": "Stacks and queues",
    "minutes": 5,
    "objectives": [
      "Explain LIFO and FIFO ordering",
      "Choose a supporting structure for graph traversal"
    ],
    "sections": [
      {
        "heading": "Introduction",
        "text": "Stacks and queues are prerequisite structures used by the algorithms in this unit. A stack removes the most recently added element; a queue removes the earliest added element."
      },
      {
        "heading": "Key concepts",
        "text": "A stack follows Last In, First Out (LIFO): push adds to the top, pop removes the top and peek reads it. A queue follows First In, First Out (FIFO): enqueue adds at the back and dequeue removes the front. Suitable implementations make these core operations constant-time; resizable array growth may require occasional extra work."
      },
      {
        "heading": "Worked example and solution",
        "text": "Push 10, 20 and 30 onto a stack: pop returns 30. Enqueue the same values: dequeue returns 10. BFS uses a queue to process a layer before the next one; DFS can use a stack to pursue a branch before returning to earlier alternatives."
      },
      {
        "heading": "Key terms",
        "text": "Push: add to a stack. Pop: remove its top. Peek: read without removal. Enqueue: add to a queue. Dequeue: remove the front."
      },
      {
        "heading": "Revision questions",
        "text": "1. Which structure fits an undo operation?\n2. Trace three pushes followed by two pops.\n3. Why does BFS need FIFO order?"
      }
    ],
    "takeaway": "Use a stack for the most recent unfinished work and a queue for work in arrival order.",
    "sources": [
      "daa-daa-outline"
    ]
  },
{
  "id": "ai-introduction",
  "courseId": "ai",
  "title": "Introduction to Artificial Intelligence",
  "minutes": 20,
  "objectives": [
    "Define AI and explain its goals",
    "Describe approaches, techniques, branches and applications",
    "Explain types, strengths, limitations and challenges"
  ],
  "sections": [
    {
      "heading": "Lecturer's notes",
      "text": "The lecturer's Lesson 1 introduces AI as a branch of computer science concerned with intelligent systems that can learn, infer, reason, solve problems and act. It covers history, contributing disciplines, types, advantages, disadvantages, challenges, AI tools and prerequisites. The other identified lecturer files cover applications, features, examples, human versus artificial intelligence and how AI works."
    },
    {
      "heading": "Goals and approaches",
      "text": "AI aims to build systems that perceive information, represent knowledge, reason or learn, and choose actions to achieve objectives. Classic approaches include thinking humanly, acting humanly (including the Turing Test), thinking rationally and acting rationally. Acting rationally means selecting actions expected to achieve goals using available evidence."
    },
    {
      "heading": "Techniques, branches and applications",
      "text": "Techniques include search, knowledge representation, logical inference, planning, machine learning and probabilistic reasoning. Branches include robotics, computer vision, speech processing, natural-language processing, expert systems and machine learning. Applications span healthcare, finance, education, transport, manufacturing, accessibility and scientific research."
    },
    {
      "heading": "Types and limitations",
      "text": "Narrow AI is designed for a limited task. Artificial general intelligence (AGI) would perform a broad range of intellectual tasks, but has not been achieved. Superintelligence is hypothetical. Functional categories often discuss reactive machines, limited-memory systems, theory-of-mind and self-aware systems; the last two are not established real-world AI capabilities. AI can be fast and consistent but may be biased, brittle, costly, opaque and dependent on data quality and human oversight."
    },
    {
      "heading": "Worked example",
      "text": "A university support chatbot classifies a question, retrieves a policy answer and responds. It combines language processing and information retrieval. It is narrow AI, and uncertain or high-impact cases should be escalated to a human."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: explicit goals, approaches and techniques. The verified Lesson 1 file covers definitions and related introductory material but does not systematically explain these three required areas. The additional explanation here fills that gap."
    },
    {
      "heading": "Revision questions",
      "text": "1. Define AI and explain four goals. 2. Compare the four classic approaches. 3. Explain five AI techniques and applications. 4. Distinguish narrow AI, AGI and hypothetical superintelligence. 5. Discuss benefits, limitations and ethical challenges."
    }
  ],
  "takeaway": "AI combines representation, reasoning, learning and action; distinguish present-day narrow systems from hypothetical general intelligence.",
  "sources": [
    "Lecturer: Lesson 1 Introduction to AI",
    "SPC 2303 course outline — Topic 1"
  ]
},
{
  "id": "ai-intelligent-agents",
  "courseId": "ai",
  "title": "Intelligent Agents",
  "minutes": 20,
  "objectives": [
    "Define agents, environments, sensors and actuators",
    "Apply PEAS to a practical system",
    "Compare agent architectures and environment properties"
  ],
  "sections": [
    {
      "heading": "Agent and environment",
      "text": "An agent perceives its environment through sensors and acts through actuators. A software agent may receive user input or API data and respond through a screen or network request. Its agent function maps percept histories to actions."
    },
    {
      "heading": "PEAS",
      "text": "PEAS means Performance measure, Environment, Actuators and Sensors. For a delivery robot: performance includes safe, timely delivery; environment includes corridors and people; actuators include wheels and grippers; sensors include cameras and distance sensors."
    },
    {
      "heading": "Agent architectures",
      "text": "A simple reflex agent uses current percepts and condition–action rules. A model-based agent maintains internal state. A goal-based agent chooses actions to reach goals. A utility-based agent compares outcomes using preferences or utility. A learning agent improves through experience; common components include a performance element, learning element, critic and problem generator."
    },
    {
      "heading": "Environment properties",
      "text": "Environments may be fully or partially observable, deterministic or stochastic, episodic or sequential, static or dynamic, discrete or continuous, and single-agent or multi-agent. Chess is commonly modelled as fully observable and deterministic; driving is partially observable, dynamic and stochastic."
    },
    {
      "heading": "Turing Test and example",
      "text": "The Turing Test evaluates whether a machine's conversational behaviour can be distinguished from a human's under specified conditions. It assesses behaviour, not consciousness. A thermostat is a simple agent: it senses temperature, compares it with a target and switches heating on or off."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: agent structures, simple and goal-based agents, decision-making agents, and the purpose and implementation of the Turing Test. The repository contains a Lesson 7 AI Agents file, but its full text has not been verified in this integration."
    },
    {
      "heading": "Revision questions",
      "text": "1. Explain sensors and actuators. 2. Apply PEAS to a library kiosk. 3. Compare reflex, model-based, goal-based and utility-based agents. 4. Explain four environment properties. 5. Describe one limitation of the Turing Test."
    }
  ],
  "takeaway": "Agent design begins with the environment and performance measure; select an architecture suited to its percepts, goals and uncertainty.",
  "sources": [
    "Lecturer file listed: Lesson 7 What are AI Agents (full text not verified)",
    "SPC 2303 course outline — Topic 2"
  ]
},
{
  "id": "ai-general-problem-solving",
  "courseId": "ai",
  "title": "General Problem Solving and Search",
  "minutes": 20,
  "objectives": [
    "Formulate a problem as a state-space search",
    "Compare uninformed and heuristic search",
    "Explain forward and backward reasoning"
  ],
  "sections": [
    {
      "heading": "Problem formulation",
      "text": "A search problem specifies an initial state, actions, a transition model, a goal test and a path-cost function. The state space contains reachable states. A solution is an action sequence reaching a goal; an optimal solution has minimum cost."
    },
    {
      "heading": "Uninformed search",
      "text": "Breadth-first search (BFS) expands shallowest nodes first and is complete for finite branching; it is optimal when all step costs are equal, but can use substantial memory. Depth-first search (DFS) follows a branch deeply and backtracks; it uses less memory but is not generally optimal and can fail in infinite-depth spaces. Uniform-cost search expands the lowest accumulated path cost."
    },
    {
      "heading": "Heuristic search",
      "text": "A heuristic h(n) estimates remaining cost. Greedy best-first search chooses the smallest h(n), but is not generally optimal. A* uses f(n)=g(n)+h(n), where g(n) is cost so far. An admissible heuristic does not overestimate true remaining cost; consistency supports standard graph-search optimality."
    },
    {
      "heading": "Data-driven and goal-driven methods",
      "text": "Forward chaining is data-driven: start with facts and apply rules to derive conclusions. Backward chaining is goal-driven: start with a query and work backward to the facts or rules that could establish it."
    },
    {
      "heading": "Worked example",
      "text": "In a maze, the initial state is the entrance, actions are moves, the transition model updates location, the goal test checks the exit and path cost counts steps. BFS finds a shortest path when every move has equal cost. A* may explore fewer states using a suitable distance heuristic."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: search-space strategies, heuristics, control strategies, exhaustive search and data-driven/goal-driven approaches. The repository lists Search Algorithms in Artificial Intelligence, but its complete text has not been verified here."
    },
    {
      "heading": "Revision questions",
      "text": "1. State the five elements of a search problem. 2. Compare BFS and DFS. 3. Explain uniform-cost search. 4. Explain A* and admissibility. 5. Distinguish forward from backward chaining."
    }
  ],
  "takeaway": "Select a search strategy based on completeness, optimality, time, memory and the quality of available heuristics.",
  "sources": [
    "Lecturer file listed: Search Algorithms in Artificial Intelligence (full text not verified)",
    "SPC 2303 course outline — Topic 3"
  ]
},
{
  "id": "ai-knowledge-representation",
  "courseId": "ai",
  "title": "Knowledge Representation",
  "minutes": 20,
  "objectives": [
    "Explain why AI systems represent knowledge",
    "Compare common representation methods",
    "Represent simple facts and rules using predicate logic"
  ],
  "sections": [
    {
      "heading": "Meaning and purpose",
      "text": "Knowledge representation (KR) encodes information about objects, properties, relationships and rules so an AI system can reason and act. A useful representation should be expressive, support efficient inference and make assumptions explicit."
    },
    {
      "heading": "Facts, rules and acquisition",
      "text": "A fact records information accepted as true, e.g. Enrolled(Amina, AI101). A rule expresses a conditional relationship, e.g. IF a student has completed a prerequisite THEN registration is permitted. Knowledge may be acquired from experts, documents, sensors or data and should be validated."
    },
    {
      "heading": "Representation methods",
      "text": "Methods include propositional logic, predicate logic, semantic networks, frames, production rules and ontologies. Propositional logic represents whole statements as true or false. Predicate logic represents objects, properties, relations and quantifiers. Semantic networks use nodes and labelled links; frames group attributes; production systems use IF–THEN rules."
    },
    {
      "heading": "Predicate logic example",
      "text": "Let Student(x) and Enrolled(x, AI101) be predicates. 'Every student enrolled in AI101 can access its notes' can be represented as ∀x ((Student(x) ∧ Enrolled(x, AI101)) → CanAccess(x, Notes_AI101)). Here ∀ means for every, ∧ means AND, and → means implication."
    },
    {
      "heading": "Knowledge cycle and issues",
      "text": "A knowledge cycle includes acquisition, representation, validation, storage, inference, explanation and updating. Issues include ambiguity, inconsistency, incompleteness, uncertainty, changing facts and maintenance cost."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: knowledge and facts, acquisition, representation logic, the knowledge cycle, representation issues and predicate logic. No dedicated lecturer document for this topic has been verified among the AI files reviewed."
    },
    {
      "heading": "Revision questions",
      "text": "1. Define KR and list its requirements. 2. Compare propositional and predicate logic. 3. Explain semantic networks, frames and production rules. 4. Translate a universal statement into predicate logic. 5. Discuss KR challenges."
    }
  ],
  "takeaway": "A knowledge base stores facts and relationships; inference rules derive conclusions, whose reliability depends on the quality of the represented knowledge.",
  "sources": [
    "SPC 2303 course outline — Topic 4"
  ]
},
{
  "id": "ai-reasoning-systems",
  "courseId": "ai",
  "title": "Reasoning Systems",
  "minutes": 20,
  "objectives": [
    "Explain reasoning in AI",
    "Compare deductive, inductive and abductive reasoning",
    "Distinguish symbolic and statistical reasoning"
  ],
  "sections": [
    {
      "heading": "Meaning",
      "text": "Reasoning derives or evaluates conclusions from facts, rules, evidence or models. AI uses reasoning for diagnosis, prediction, planning, query answering and decision support."
    },
    {
      "heading": "Deduction",
      "text": "Deduction derives a conclusion that must follow if premises are true and the argument is valid. Example: all registered students may access the portal; Nia is registered; therefore Nia may access the portal. A valid argument may still be unsound if a premise is false."
    },
    {
      "heading": "Induction and abduction",
      "text": "Induction generalizes from observations to a likely pattern; its conclusions are probable, not guaranteed. Abduction proposes a plausible explanation for an observation. If a server is unreachable, a router failure may explain it, but other causes remain possible."
    },
    {
      "heading": "Symbolic and statistical reasoning",
      "text": "Symbolic reasoning manipulates explicit symbols, facts and rules and can provide traceable logical steps. Statistical reasoning uses data and probability to estimate patterns and uncertainty. Hybrid systems may combine statistical predictions with symbolic policy rules."
    },
    {
      "heading": "Applications and challenges",
      "text": "Reasoning supports medical decision systems, fault diagnosis, fraud detection, recommendation, planning and expert systems. Challenges include incomplete or conflicting evidence, uncertainty, bias, computational cost, explainability and confusing correlation with causation."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: symbolic and statistical reasoning, deductive, abductive and inductive reasoning, applications and challenges. No dedicated lecturer document for this topic has been verified among the AI files reviewed."
    },
    {
      "heading": "Revision questions",
      "text": "1. Define reasoning. 2. Compare deduction, induction and abduction with examples. 3. Distinguish symbolic from statistical reasoning. 4. Discuss four applications and four challenges."
    }
  ],
  "takeaway": "Deduction follows from premises, induction generalizes from examples, and abduction proposes explanations; they differ in certainty and purpose.",
  "sources": [
    "SPC 2303 course outline — Topic 5"
  ]
},
{
  "id": "ai-game-playing",
  "courseId": "ai",
  "title": "Game Playing: Minimax and Alpha–Beta Pruning",
  "minutes": 20,
  "objectives": [
    "Model a competitive game as a search tree",
    "Apply minimax",
    "Explain alpha–beta pruning"
  ],
  "sections": [
    {
      "heading": "Game model",
      "text": "A two-player, zero-sum game can be represented by states, legal actions, a player-to-move function, a terminal test and a utility function. MAX maximizes utility; MIN minimizes it."
    },
    {
      "heading": "Minimax",
      "text": "Assign utility values to terminal states and propagate upward. At MAX nodes choose the maximum child value; at MIN nodes choose the minimum. The root selects the move with the best guaranteed result assuming optimal play."
    },
    {
      "heading": "Worked example",
      "text": "MAX has moves A and B. A leads to MIN choices with values 3 and 5, so MIN chooses 3. B leads to values 2 and 9, so MIN chooses 2. MAX chooses A because 3 is better than 2."
    },
    {
      "heading": "Alpha–beta pruning",
      "text": "Alpha is the best value MAX can guarantee so far; beta is the best value MIN can guarantee. When alpha ≥ beta, remaining children cannot affect the final decision and can be pruned. Alpha–beta returns the same minimax choice while potentially examining fewer nodes; move ordering affects efficiency."
    },
    {
      "heading": "Practical limitations",
      "text": "Game trees grow rapidly with depth and branching factor. Programs use depth limits, evaluation functions, iterative deepening, move ordering and transposition tables when full search is infeasible."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: game-playing overview, minimax and alpha–beta pruning. No dedicated lecturer document for this topic has been verified among the AI files reviewed."
    },
    {
      "heading": "Revision questions",
      "text": "1. Explain MAX and MIN. 2. Apply minimax to a small tree. 3. Define alpha and beta. 4. State the pruning condition. 5. Explain why move ordering matters."
    }
  ],
  "takeaway": "Minimax chooses the best move against optimal opposition; alpha–beta skips branches that cannot change that choice.",
  "sources": [
    "SPC 2303 course outline — Topic 6"
  ]
},
{
  "id": "ai-learning",
  "courseId": "ai",
  "title": "Learning in Artificial Intelligence",
  "minutes": 20,
  "objectives": [
    "Compare supervised, unsupervised and reinforcement learning",
    "Explain other learning approaches",
    "Describe neural networks and genetic algorithms"
  ],
  "sections": [
    {
      "heading": "Meaning and major types",
      "text": "Learning improves a system's performance through experience or data. Supervised learning uses labelled examples; unsupervised learning seeks structure in unlabelled data; reinforcement learning learns actions or policies through rewards and penalties. Rote learning stores facts or solutions for reuse."
    },
    {
      "heading": "Other approaches",
      "text": "Learning from experience updates behaviour based on outcomes. Analogy transfers a relationship from a familiar problem to a new one. Induction generalizes from examples. Discovery identifies previously unknown patterns. The course outline also includes genetic algorithms and connectionist models."
    },
    {
      "heading": "Neural networks",
      "text": "A neural network is a parameterized model made of interconnected computational units. Training adjusts weights to reduce a loss function. A feed-forward network commonly has input, hidden and output layers. Applications include image recognition, speech, language and prediction; limitations include data needs, computation and interpretability."
    },
    {
      "heading": "Genetic algorithms",
      "text": "A genetic algorithm initializes candidate solutions, evaluates fitness, selects candidates, applies crossover and mutation, and repeats over generations. It can explore complex search spaces but does not guarantee a global optimum; results depend on encoding and fitness design."
    },
    {
      "heading": "Applications and reliability",
      "text": "Examples include spam classification, customer grouping, robot navigation and timetable optimization. Fault tolerance addresses noisy inputs, missing data and component failure through validation, fallback rules, checkpoints, monitoring and human review. Models should be monitored for data drift after deployment."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: rote, supervised, reinforcement and unsupervised learning; experience, analogy, induction, discovery; genetic algorithms; neural networks; applications; fault tolerance and recovery. No complete lecturer document for this topic has been verified among the AI files reviewed."
    },
    {
      "heading": "Revision questions",
      "text": "1. Compare the three major learning paradigms. 2. Explain rote and inductive learning. 3. Describe neural-network training. 4. Outline a genetic algorithm. 5. Explain fault tolerance and model drift."
    }
  ],
  "takeaway": "Choose the learning paradigm based on the feedback available: labels, unlabelled structure or rewards from interaction.",
  "sources": [
    "SPC 2303 course outline — Topic 7"
  ]
},
{
  "id": "ai-natural-language",
  "courseId": "ai",
  "title": "Natural Language Processing",
  "minutes": 20,
  "objectives": [
    "Define NLP and identify applications",
    "Explain syntactic, semantic and pragmatic analysis",
    "Discuss NLP challenges"
  ],
  "sections": [
    {
      "heading": "Definition and applications",
      "text": "Natural Language Processing (NLP) is the AI area concerned with processing, interpreting or generating human language. Applications include search, translation, speech interfaces, text classification, summarization, question answering and chatbots."
    },
    {
      "heading": "Syntactic processing",
      "text": "Syntax concerns grammatical structure and how words combine into phrases and sentences. Processing may include tokenization, part-of-speech tagging and parsing. Parsing identifies sentence structure; ambiguity and incomplete sentences complicate analysis."
    },
    {
      "heading": "Semantic analysis",
      "text": "Semantics concerns meaning. Systems may identify entities, relations, word senses, intent and semantic roles. Context can help distinguish words with multiple meanings."
    },
    {
      "heading": "Pragmatic analysis",
      "text": "Pragmatics interprets language in context, including speaker intention, shared knowledge and implied meaning. 'Can you open the notes?' is usually a request to open them, not merely a question about ability."
    },
    {
      "heading": "Pipeline and challenges",
      "text": "A simplified pipeline cleans text, tokenizes it, analyzes structure and meaning, uses context and produces output. Modern neural systems may learn these capabilities jointly. Challenges include ambiguity, idioms, sarcasm, spelling variation, low-resource languages, bias, privacy and hallucinations."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: the definition of natural language, syntactic processing, semantic analysis and pragmatic analysis. No dedicated lecturer document for this topic has been verified among the AI files reviewed."
    },
    {
      "heading": "Revision questions",
      "text": "1. Define NLP and list five applications. 2. Distinguish syntax, semantics and pragmatics. 3. Explain contextual ambiguity. 4. Discuss four NLP challenges."
    }
  ],
  "takeaway": "Syntax analyzes structure, semantics analyzes meaning, and pragmatics interprets meaning in context.",
  "sources": [
    "SPC 2303 course outline — Topic 8"
  ]
},
{
  "id": "ai-planning",
  "courseId": "ai",
  "title": "Planning in Artificial Intelligence",
  "minutes": 20,
  "objectives": [
    "Explain planning components",
    "Describe goal-stack, nonlinear and hierarchical planning",
    "Explain the frame problem and reactive systems"
  ],
  "sections": [
    {
      "heading": "Meaning and components",
      "text": "AI planning selects and organizes actions to achieve a goal from an initial state. A classical planning problem specifies an initial state, goal conditions and actions. Actions have preconditions and effects."
    },
    {
      "heading": "Goal-stack planning",
      "text": "Goal-stack planning works backward from a goal. If a goal is not true, the planner selects an action that can achieve it, makes the action's preconditions subgoals, satisfies them and then applies the action. Interacting subgoals can make this approach difficult."
    },
    {
      "heading": "Nonlinear and hierarchical planning",
      "text": "A linear plan fixes a total order of actions. Nonlinear or partial-order planning leaves actions unordered when no dependency requires an order. Hierarchical planning decomposes a high-level task into subtasks until executable actions are reached."
    },
    {
      "heading": "Frame problem",
      "text": "The frame problem asks how to represent what remains unchanged when an action occurs. If a robot moves a cup, unrelated facts such as the room's wall colour should persist without restating every unchanged fact for every action."
    },
    {
      "heading": "Reactive systems and example",
      "text": "Reactive systems respond to current percepts or events, often with limited deliberation. A delivery robot may plan a route to a room while a reactive obstacle-avoidance behaviour responds immediately when a person crosses its path. Hybrid systems combine reactive behaviour with deliberative planning."
    },
    {
      "heading": "Course-outline coverage audit",
      "text": "Missing from the lecturer's notes but required by the course outline: planning components, the frame problem, goal-stack planning, nonlinear and hierarchical planning, and reactive systems. No dedicated lecturer document for this topic has been verified among the AI files reviewed."
    },
    {
      "heading": "Revision questions",
      "text": "1. Define AI planning and list its components. 2. Explain preconditions and effects. 3. Describe goal-stack planning. 4. Compare linear, nonlinear and hierarchical planning. 5. Explain the frame problem and reactive systems."
    }
  ],
  "takeaway": "Planning organizes actions through preconditions and effects; partial-order, hierarchical and reactive approaches address different forms of complexity.",
  "sources": [
    "SPC 2303 course outline — Topic 9"
  ]
}
];
export const resources:Resource[] = [
  {
    "id": "sqa-case-tool",
    "courseId": "sqa",
    "title": "Case tool",
    "url": "/notes/sqa/case-tool.ppt",
    "format": "PPT"
  },
  {
    "id": "sqa-software-quality-assurance-complete-notes",
    "courseId": "sqa",
    "title": "software-quality-assurance-complete-notes-",
    "url": "/notes/sqa/software-quality-assurance-complete-notes.pdf",
    "format": "PDF"
  },
  {
    "id": "sqa-sqa",
    "courseId": "sqa",
    "title": "SQA",
    "url": "/notes/sqa/sqa.pdf",
    "format": "PDF"
  },
  {
    "id": "aoop-course-outline-sse-2105",
    "courseId": "aoop",
    "title": "Course Outline SSE 2105",
    "url": "/notes/aoop/course-outline-sse-2105.pdf",
    "format": "PDF"
  },
  {
    "id": "aoop-lesson-1-introduction-to-oop",
    "courseId": "aoop",
    "title": "Lesson 1- Introduction to OOP",
    "url": "/notes/aoop/lesson-1-introduction-to-oop.pptx",
    "format": "PPTX"
  },
  {
    "id": "aoop-lesson-2-introduction-to-java",
    "courseId": "aoop",
    "title": "Lesson 2- Introduction to Java",
    "url": "/notes/aoop/lesson-2-introduction-to-java.pptx",
    "format": "PPTX"
  },
  {
    "id": "aoop-lesson-3-java-control-structures",
    "courseId": "aoop",
    "title": "Lesson 3- Java Control Structures",
    "url": "/notes/aoop/lesson-3-java-control-structures.pdf",
    "format": "PDF"
  },
  {
    "id": "aoop-lesson-4-java-functions-and-arrays",
    "courseId": "aoop",
    "title": "Lesson 4- Java Functions and Arrays",
    "url": "/notes/aoop/lesson-4-java-functions-and-arrays.pdf",
    "format": "PDF"
  },
  {
    "id": "aoop-oop-introduction",
    "courseId": "aoop",
    "title": "OOP  introduction",
    "url": "/notes/aoop/oop-introduction.pdf",
    "format": "PDF"
  },
  {
    "id": "aoop-sse-2105-lecture-notes-topic-1-6",
    "courseId": "aoop",
    "title": "SSE 2105_Lecture notes_topic 1-6",
    "url": "/notes/aoop/sse-2105-lecture-notes-topic-1-6.pdf",
    "format": "PDF"
  },
  {
    "id": "aoop-sse2105-course-outline",
    "courseId": "aoop",
    "title": "SSE2105_Course_Outline",
    "url": "/notes/aoop/sse2105-course-outline.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-combied-lecture-notes",
    "courseId": "cbp",
    "title": "combied lecture notes",
    "url": "/notes/cbp/combied-lecture-notes.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-component-based-software-engineering-syllabus",
    "courseId": "cbp",
    "title": "COMPONENT BASED SOFTWARE ENGINEERING  syllabus",
    "url": "/notes/cbp/component-based-software-engineering-syllabus.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-component-based-system-engineering-cbse-condensed-to-10-lessons",
    "courseId": "cbp",
    "title": "Component-Based System Engineering (CBSE) condensed to 10 lessons",
    "url": "/notes/cbp/component-based-system-engineering-cbse-condensed-to-10-lessons.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-1-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 1  COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-1-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-10-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 10 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-10-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-2-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 2 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-2-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-3-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 3 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-3-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-4-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 4 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-4-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-5-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 5 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-5-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-6-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 6 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-6-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-7-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 7 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-7-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-8-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 8 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-8-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lecture-9-component-based-software-engineering",
    "courseId": "cbp",
    "title": "LECTURE 9 COMPONENT BASED SOFTWARE ENGINEERING",
    "url": "/notes/cbp/lecture-9-component-based-software-engineering.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lesson-1-component-based-software-engineering-overview",
    "courseId": "cbp",
    "title": "Lesson 1 Component Based software engineering overview",
    "url": "/notes/cbp/lesson-1-component-based-software-engineering-overview.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-lesson-2-component-fundamentals-characteristics-and-models",
    "courseId": "cbp",
    "title": "Lesson 2 Component Fundamentals Characteristics and Models",
    "url": "/notes/cbp/lesson-2-component-fundamentals-characteristics-and-models.pdf",
    "format": "PDF"
  },
  {
    "id": "cbp-merged-notes",
    "courseId": "cbp",
    "title": "merged notes",
    "url": "/notes/cbp/merged-notes.pdf",
    "format": "PDF"
  },
  {
    "id": "dba-database-systems-administration",
    "courseId": "dba",
    "title": "DATABASE SYSTEMS ADMINISTRATION",
    "url": "/notes/dba/database-systems-administration.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-merged",
    "courseId": "sys",
    "title": "merged",
    "url": "/notes/sys/merged.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-system-programming",
    "courseId": "sys",
    "title": "system programming",
    "url": "/notes/sys/system-programming.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-systems-programing-lesson-1",
    "courseId": "sys",
    "title": "Systems Programing lesson 1..",
    "url": "/notes/sys/systems-programing-lesson-1.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-systems-programming-lesson-2",
    "courseId": "sys",
    "title": "Systems programming lesson 2",
    "url": "/notes/sys/systems-programming-lesson-2.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-systems-programming-lesson-3",
    "courseId": "sys",
    "title": "Systems programming lesson 3",
    "url": "/notes/sys/systems-programming-lesson-3.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-systems-programming-lesson-4-1",
    "courseId": "sys",
    "title": "Systems programming lesson 4...... (1)",
    "url": "/notes/sys/systems-programming-lesson-4-1.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-systems-programming-lesson-4",
    "courseId": "sys",
    "title": "Systems programming lesson 4......",
    "url": "/notes/sys/systems-programming-lesson-4.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-systems-programming-lesson-5-6-combined-pdf",
    "courseId": "sys",
    "title": "Systems programming lesson 5 & 6 combined-pdf",
    "url": "/notes/sys/systems-programming-lesson-5-6-combined-pdf.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-systems-programming-lesson-5-and-6-ipc",
    "courseId": "sys",
    "title": "Systems programming lesson 5 and 6 IPC",
    "url": "/notes/sys/systems-programming-lesson-5-and-6-ipc.docx",
    "format": "DOCX"
  },
  {
    "id": "sys-systems-programming-lesson-6-updated",
    "courseId": "sys",
    "title": "Systems programming Lesson 6 Updated",
    "url": "/notes/sys/systems-programming-lesson-6-updated.pdf",
    "format": "PDF"
  },
  {
    "id": "sys-systems-programming-lesson-7",
    "courseId": "sys",
    "title": "Systems programming lesson 7",
    "url": "/notes/sys/systems-programming-lesson-7.pdf",
    "format": "PDF"
  },
  {
    "id": "daa-daa-outline",
    "courseId": "daa",
    "title": "DAA OUTLINE",
    "url": "/notes/daa/daa-outline.docx",
    "format": "DOCX"
  },
  {
    "id": "daa-lecture-1-introduction",
    "courseId": "daa",
    "title": "Lecture 1 Introduction",
    "url": "/notes/daa/lecture-1-introduction.ppt",
    "format": "PPT"
  },
  {
    "id": "daa-lecture-2-asymptotic-analysis",
    "courseId": "daa",
    "title": "Lecture 2 Asymptotic Analysis",
    "url": "/notes/daa/lecture-2-asymptotic-analysis.pptx",
    "format": "PPTX"
  },
  {
    "id": "ai-artificial-intelligence-cat-1",
    "courseId": "ai",
    "title": "ARTIFICIAL INTELLIGENCE cat 1",
    "url": "/notes/ai/artificial-intelligence-cat-1.pdf",
    "format": "PDF"
  },
  {
    "id": "ai-lecture-1-introduction",
    "courseId": "ai",
    "title": "Lecture 1 Introduction",
    "url": "/notes/ai/lecture-1-introduction.ppt",
    "format": "PPT"
  },
  {
    "id": "ai-lesson-1-introduction-to-artificial-intelligence",
    "courseId": "ai",
    "title": "Lesson 1 Introduction to Artificial Intelligence",
    "url": "/notes/ai/lesson-1-introduction-to-artificial-intelligence.docx",
    "format": "DOCX"
  },
  {
    "id": "ai-lesson-2-applications-of-artificial-intelligence",
    "courseId": "ai",
    "title": "Lesson 2 Applications of Artificial Intelligence",
    "url": "/notes/ai/lesson-2-applications-of-artificial-intelligence.docx",
    "format": "DOCX"
  },
  {
    "id": "ai-lesson-3-features-of-artificial-intelligence",
    "courseId": "ai",
    "title": "Lesson 3 Features of Artificial Intelligence",
    "url": "/notes/ai/lesson-3-features-of-artificial-intelligence.docx",
    "format": "DOCX"
  },
  {
    "id": "ai-lesson-4-examples-of-ai",
    "courseId": "ai",
    "title": "Lesson 4 Examples of AI",
    "url": "/notes/ai/lesson-4-examples-of-ai.docx",
    "format": "DOCX"
  },
  {
    "id": "ai-lesson-5-difference-between-artificial-intelligence-and-human-intelligence",
    "courseId": "ai",
    "title": "Lesson 5 - Difference between Artificial Intelligence and Human Intelligence",
    "url": "/notes/ai/lesson-5-difference-between-artificial-intelligence-and-human-intelligence.docx",
    "format": "DOCX"
  },
  {
    "id": "ai-lesson-6-how-does-ai-work",
    "courseId": "ai",
    "title": "Lesson 6 - How does AI Work",
    "url": "/notes/ai/lesson-6-how-does-ai-work.docx",
    "format": "DOCX"
  },
  {
    "id": "ai-lesson-7-what-are-ai-agents",
    "courseId": "ai",
    "title": "Lesson 7 - What are AI Agents",
    "url": "/notes/ai/lesson-7-what-are-ai-agents.docx",
    "format": "DOCX"
  },
  {
    "id": "ai-search-algorithms-in-artificial-intelligence",
    "courseId": "ai",
    "title": "Search Algorithms in Artificial Intelligence",
    "url": "/notes/ai/search-algorithms-in-artificial-intelligence.docx",
    "format": "DOCX"
  },
  {
    "id": "ai-spc-2303-artificial-intelligence",
    "courseId": "ai",
    "title": "SPC 2303 ARTIFICIAL INTELLIGENCE",
    "url": "/notes/ai/spc-2303-artificial-intelligence.doc",
    "format": "DOC"
  }
];
export const getCourseTopics=(courseId:string)=>topics.filter(t=>t.courseId===courseId);
export type Question = {id:string;type:'mcq'|'boolean'|'short';prompt:string;options?:string[];answer:string;explanation:string};
export const questions:Question[] = [
 {id:'q1',type:'mcq',prompt:'Which principle does a stack follow?',options:['First In, First Out (FIFO)','Last In, First Out (LIFO)','Random access','Priority ordering'],answer:'Last In, First Out (LIFO)',explanation:'A stack removes the most recently added item first, following Last In, First Out.'},
 {id:'q2',type:'boolean',prompt:'A queue removes the element that was added first.',options:['True','False'],answer:'True',explanation:'Queues follow First In, First Out (FIFO), just like a line at a service desk.'},
 {id:'q3',type:'mcq',prompt:'What is the typical time complexity of a stack push operation?',options:['O(n)','O(log n)','O(1)','O(n²)'],answer:'O(1)',explanation:'Pushing onto a linked-list stack, or an array stack with available capacity, takes constant time.'},
 {id:'q4',type:'short',prompt:'What is the name of the stack operation that removes the top element?',answer:'pop',explanation:'Pop removes and returns the element at the top of a stack.'},
 {id:'q5',type:'mcq',prompt:'Which data structure is most suitable for implementing an undo action?',options:['Queue','Stack','Graph','Set'],answer:'Stack',explanation:'An undo action reverses the most recent operation, matching the LIFO behavior of a stack.'}
];
export const deadlines=[{day:'08',month:'NOV',title:'Database administration revision',course:'DBA · Database Systems Administration',type:'Sample reminder',time:'11:59 PM',color:'blue'},{day:'10',month:'NOV',title:'Stacks & queues practice',course:'SPC 2302 · Design and Analysis of Algorithms',type:'Practice quiz',time:'5:00 PM',color:'rose'},{day:'12',month:'NOV',title:'Software quality review',course:'SQA · Software Quality Assurance',type:'Sample reminder',time:'11:59 PM',color:'mint'}];
