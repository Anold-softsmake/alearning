"""Import the supplied Year 3 Semester 1 files and authored revision notes.

Only academic document formats are copied. Source files remain unchanged.
"""
from pathlib import Path
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[2]
APP = ROOT / 'app'
FOLDERS = {
    'sqa': 'Software Quaity Assurance',
    'aoop': 'AOOP',
    'cbp': 'Component  Based Programming',
    'dba': 'Data System Adiministration',
    'sys': 'System Programming',
    'daa': 'DAA',
    'ai': 'AI',
}
resources = []
for course_id, folder in FOLDERS.items():
    for source in sorted((ROOT / 'notes' / 'YEAR 3' / folder).iterdir()):
        if source.suffix.lower() not in {'.pdf', '.doc', '.docx', '.ppt', '.pptx'}:
            continue
        slug = re.sub(r'[^a-z0-9]+', '-', source.stem.lower()).strip('-')
        destination = APP / 'public' / 'notes' / course_id / (slug + source.suffix.lower())
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        resources.append({'id': f'{course_id}-{slug}', 'courseId': course_id,
                          'title': source.stem.strip(), 'url': f'/notes/{course_id}/{destination.name}',
                          'format': source.suffix[1:].upper()})

chapters = []

def topic(course_id, slug, title, objective, concept, points, example, terms, review, takeaway, source_hint=''):
    matches = [r['id'] for r in resources if r['courseId'] == course_id and source_hint.lower() in r['title'].lower()] if source_hint else []
    if not matches:
        matches = [r['id'] for r in resources if r['courseId'] == course_id][:2]
    chapters.append({'id': slug, 'courseId': course_id, 'title': title,
        'minutes': max(5, round(len((concept + points + example + terms + review).split()) / 100)),
        'objectives': [s.strip() for s in objective.split('|')],
        'sections': [
            {'heading': 'Introduction', 'text': concept},
            {'heading': 'Key concepts', 'text': points},
            {'heading': 'Worked example and solution', 'text': example},
            {'heading': 'Key terms', 'text': terms},
            {'heading': 'Revision questions', 'text': review},
        ], 'takeaway': takeaway, 'sources': matches})

# SQA is the common chapter template: objectives, concepts, example, terminology,
# revision questions and a summary. Original complete notes remain linked.
topic('sqa', 'sqa-introduction', 'Introduction to software quality assurance',
      'Define software quality and quality assurance|Distinguish quality assurance from quality control',
      'Software quality describes how well a software product meets specified requirements and user needs. Software quality assurance (SQA) is the planned, systematic work used to build confidence that software processes and products satisfy those requirements.',
      'Quality assurance focuses on preventing defects through suitable processes, standards, training and reviews. Quality control evaluates products through activities such as inspection and testing. A defect is a flaw in an artefact; a failure is observable incorrect behaviour during execution. Good processes reduce risk, while product checks provide evidence of what was actually built.',
      'A university fee portal must calculate balances correctly, protect student information and remain usable during registration. The team defines acceptance criteria, reviews the design and agrees coding standards before implementation. Testers then check balance calculations and access permissions. The preventive activities are QA; evaluating the resulting portal is QC.',
      'Quality: fitness for requirements and use. QA: systematic confidence-building activities. QC: product evaluation. Defect: a flaw. Failure: incorrect behaviour observed during use.',
      '1. Explain QA and QC with one activity for each.\n2. How can a defect exist without causing an observed failure?\n3. Give three quality requirements for a university portal.',
      'Plan quality into the process, then collect evidence that the product meets its requirements.', 'complete-notes')
topic('sqa', 'sqa-quality-models', 'Software quality factors and models',
      'Describe functional and nonfunctional quality|Turn a quality factor into a measurable requirement',
      'A program can produce the correct answer and still be difficult to use, slow or costly to maintain. Quality models organize these different concerns so that a team can evaluate more than functional correctness.',
      'Common factors include reliability, usability, efficiency, maintainability, portability and security. The supplied product-quality chapter introduces ISO/IEC 9126 and ISO/IEC 25010. It distinguishes product quality from process quality, with process models including CMMI. Quality factors can conflict: extra validation may improve robustness while adding execution cost. Select measures that reflect actual user needs rather than treating every factor as equally important.',
      'Replace “the portal should be fast” with a testable target such as “95% of timetable requests should finish within two seconds under the agreed test load”. Record the environment and workload; a timing result without those conditions is hard to interpret.',
      'Reliability: consistent operation under stated conditions. Maintainability: ease of making changes. Portability: ease of moving environments. Metric: a defined measurement.',
      '1. Give an example of a quality trade-off.\n2. Write a measurable usability requirement.\n3. Why is correctness alone insufficient?',
      'Use quality factors to make expectations explicit, measurable and relevant to users.', 'complete-notes')
topic('sqa', 'sqa-planning', 'Quality planning, standards and the SQA plan',
      'Describe the purpose of an SQA plan|Identify responsibilities and quality records',
      'A quality plan explains how a particular project will meet its quality objectives. It makes responsibilities, checks, evidence and escalation routes clear before work is delivered.',
      'An SQA plan covers project scope, applicable standards, review and testing activities, roles, schedules, configuration management, defect reporting and records. A standard states required expectations; a procedure describes how an activity is carried out. Audits compare actual practice and evidence with the agreed process.',
      'For an examination system, the plan assigns design review to another developer, requires approval of grading rules, schedules integration tests and records defects with severity and ownership. Release requires evidence that the agreed acceptance criteria are satisfied.',
      'SQA plan: project quality arrangements. Standard: an agreed requirement. Procedure: a repeatable method. Audit: an evidence-based compliance check.',
      '1. List five sections of an SQA plan.\n2. Distinguish a standard from a procedure.\n3. What evidence should be kept for a release decision?',
      'A useful quality plan gives each quality activity an owner and produces reviewable evidence.', 'complete-notes')
topic('sqa', 'sqa-reviews', 'Reviews, inspections and software audits',
      'Compare walkthroughs, inspections and audits|Explain how early reviews prevent rework',
      'Static evaluation examines software artefacts without executing the program. Requirements, designs, code and test plans can all be reviewed before defects reach users.',
      'A walkthrough is commonly led by the author to explain an artefact and gather feedback. An inspection is a structured peer review with preparation, defined roles, defect logging and follow-up. An audit checks adherence to specified standards or processes. Review the work against explicit criteria and track corrections to closure.',
      'Before coding fee calculations, reviewers inspect the requirement “late payment incurs a penalty”. They find that the rate, start date and exemptions are missing. Resolving these ambiguities now prevents incompatible implementations and unreliable tests later.',
      'Static evaluation: checking without execution. Inspection: formal peer defect detection. Walkthrough: author-led examination. Audit trail: records showing what was checked and decided.',
      '1. How does an inspection differ from testing?\n2. Suggest a requirements review checklist.\n3. Why is follow-up necessary after a review?',
      'Find defects in the earliest artefact where they can be recognized and corrected.', 'complete-notes')
topic('sqa', 'sqa-testing', 'Verification, validation and software testing',
      'Distinguish verification from validation|Choose suitable test levels and design techniques',
      'Verification asks whether development outputs satisfy their specified inputs. Validation asks whether the resulting system meets intended user needs. Testing executes software to reveal failures and provide evidence about behaviour.',
      'Unit tests target small pieces of code; integration tests examine interactions; system tests examine the complete system; acceptance tests evaluate agreed user requirements. Black-box techniques include equivalence partitioning and boundary value analysis. White-box techniques use internal structure. Regression testing checks that changes have not broken previously working behaviour.',
      'If a mark must be an integer between 0 and 100, test valid classes and invalid classes, then boundaries such as -1, 0, 1, 99, 100 and 101. Checking only 50 misses the errors that often appear at the edges.',
      'Test case: inputs, conditions and expected result. Regression: checking existing behaviour after change. Boundary value: an input at or close to a limit.',
      '1. Give a validation activity for a student portal.\n2. Design boundary tests for a minimum password length.\n3. Explain why passing tests cannot prove the absence of all defects.',
      'Use complementary test techniques and connect every expected result to a requirement.', 'complete-notes')
topic('sqa', 'sqa-defects-metrics', 'Defect management, metrics and improvement',
      'Record and prioritize defects|Interpret quality measurements in context',
      'Defect management turns a reported problem into a reproducible, assigned and verified correction. Metrics help a team understand trends and decide where improvement is needed.',
      'A useful defect report includes environment, steps to reproduce, expected and actual behaviour, evidence, severity and status. Severity measures impact; priority reflects the order in which work should be done. Track reopened defects, escaped defects and defect trends, but interpret figures alongside scope and reporting effort. Root cause analysis identifies conditions that allowed a problem to occur.',
      'After a release, several rounding errors are found in fee calculations. Fixing each report helps users, but investigating the common cause reveals inconsistent numeric handling. A shared calculation routine, design guidance and boundary tests address the underlying cause.',
      'Severity: impact. Priority: urgency or work order. Defect density: defects per defined size measure. Root cause: an underlying contributing reason.',
      '1. Write a reproducible bug report.\n2. Can a low-severity defect have high priority? Explain.\n3. Why can raw defect counts mislead?',
      'Use defect evidence to improve both the current product and the process that produces it.', 'complete-notes')
topic('sqa', 'sqa-configuration-case', 'Configuration management and CASE tools',
      'Explain baselines and change control|Describe how CASE tools support quality',
      'Configuration management keeps software artefacts identifiable and controlled as they change. Computer-aided software engineering (CASE) tools support development activities and help keep related artefacts consistent.',
      'Identify configuration items such as source code, requirements, tests and release packages. Establish baselines, review change requests, record approved changes and verify the release configuration. CASE support can include modelling, requirements traceability, code analysis, testing and documentation. Tools assist a defined process; their output still requires human evaluation.',
      'A lecturer reports that quiz answers changed unexpectedly. A versioned baseline identifies the released questions and answer key. Change history shows who approved the update, and traceability connects the changed requirement to its tests.',
      'Configuration item: an artefact under control. Baseline: an agreed reference version. Change control: reviewing and authorizing changes. CASE: computer-aided software engineering.',
      '1. What belongs in a release baseline?\n2. How does traceability help assess a change?\n3. Name two CASE tool activities and the quality benefit of each.',
      'Controlled changes and traceable artefacts make quality evidence dependable.', 'Case tool')
topic('sqa', 'sqa-testing-methods', 'Black-box, white-box and grey-box testing',
      'Compare testing approaches|Design cases using both requirements and program structure',
      'The supplied SQA chapter on testing methods distinguishes black-box, white-box and grey-box approaches by the knowledge used to design tests.',
      'Black-box tests derive expected behaviour from the specification without requiring internal implementation knowledge. White-box tests use control flow and implementation structure, for example statement and branch coverage. Grey-box testing uses partial internal knowledge. Coverage helps identify untested structure but does not establish that all requirements or possible inputs are correct.',
      'Example: a fee calculator applies a discount when a student is eligible and the balance is positive.\n\nSolution: specification-based cases check eligible and ineligible students, zero balance and invalid inputs. Structure-based cases also exercise both outcomes of each branch. Check calculated amounts against the stated rule, not only whether each line executed.',
      'Black box: specification-focused testing. White box: structure-focused testing. Grey box: testing using some implementation knowledge. Branch coverage: exercised decision outcomes.',
      '1. Compare the information used in the three approaches.\n2. Why is full statement coverage insufficient?\n3. Design boundary cases for a discount threshold.',
      'Combine behavioural checks with structural evidence; neither alone establishes complete quality.', 'complete-notes')
topic('sqa', 'sqa-testing-tools', 'Testing tools and automation',
      'Describe the role of test frameworks|Explain fixtures, assertions and test isolation',
      'The supplied tools chapter introduces Jtest, JUnit, JWalk, PowerMock and TestNG. Their common purpose is to support repeatable evaluation; selecting a tool still requires understanding the test objective.',
      'A test framework organizes test execution and reports outcomes. Assertions compare observed results with expectations. Fixtures prepare known conditions. Mocks or substitutes can isolate dependencies, but excessive substitution can hide integration failures. Automated tests should be repeatable and their expected values should come from the requirements rather than duplicating the implementation.',
      'Example: a balance service depends on a payment gateway.\n\nSolution: a unit test supplies a controlled gateway result and asserts the balance calculation. A separate integration test verifies the real gateway contract. A passing isolated test alone cannot show that the real connection works.',
      'Assertion: a checked expectation. Fixture: prepared test conditions. Mock: a controlled substitute. Test suite: a collection of tests. Regression suite: checks retained across changes.',
      '1. What makes a useful assertion?\n2. When can mocks hide a defect?\n3. Which checks belong in both unit and integration testing?',
      'Automate meaningful checks and keep evidence of real component interactions.', 'complete-notes')

topic('aoop', 'aoop-introduction', 'Object-oriented programming fundamentals',
      'Explain classes, objects and messages|Compare structured and object-oriented programming',
      'Object-oriented programming organizes a program around objects that combine state and behaviour. A class defines a common structure; an object is a particular instance of that class.',
      'Attributes store state and methods define operations. Encapsulation keeps representation behind an interface. Abstraction presents essential behaviour while hiding detail. Inheritance derives a specialized class from an existing one. Polymorphism allows a common operation to behave differently for different object types.',
      'A Student class can hold a name and registration number and provide an enrol() method. Two Student objects have separate state even though they use the same class definition. A private balance field changed through payFees() protects rules that direct public changes could bypass.',
      'Class: a type definition. Object: an instance. Attribute: stored state. Method: behaviour. Encapsulation: controlled access to representation.',
      '1. Distinguish a class from an object.\n2. Identify state and behaviour for a library book.\n3. Explain one benefit and one cost of OO design.',
      'Model related state and behaviour together, and make object responsibilities clear.', 'Lesson 1')
topic('aoop', 'aoop-java', 'Java foundations and program structure',
      'Describe the Java compilation and execution process|Recognize data types, variables and operators',
      'Java source is compiled into bytecode that runs on a Java Virtual Machine. A compatible runtime on each platform executes the bytecode, which supports Java’s platform-independent approach.',
      'A basic program contains a class, a main method, statements and blocks. Primitive types hold values such as int, double and boolean; reference types refer to objects. Variables may be local, instance or static. Constants can be declared with final; static final is commonly used for class constants. Distinguish syntax errors, runtime errors and logic errors.',
      'public class Hello { public static void main(String[] args) { int units = 7; System.out.println(units); } }\n\nThe compiler checks the program structure and produces Hello.class. The JVM executes main. An incorrect arithmetic expression can compile successfully while still producing a logic error.',
      'JVM: Java Virtual Machine. Bytecode: compiled JVM instructions. Local variable: a variable in a method or block. Static field: class-level state.',
      '1. Describe source → bytecode → execution.\n2. Give one syntax, runtime and logic error.\n3. Compare instance and static variables.',
      'Understand both program structure and execution before building larger Java classes.', 'Lesson 2')
topic('aoop', 'aoop-control', 'Java control structures',
      'Select conditions and loops for a task|Trace a program’s control flow',
      'Control structures determine the order in which statements run. Selection chooses a path, while iteration repeats a block under a stated condition.',
      'Use if/else for conditions and switch for suitable discrete alternatives. A for loop suits counted iteration; while checks its condition before each pass; do/while runs its body at least once. break exits a loop or switch and continue moves to the next loop iteration. Carefully define initialization, condition and update.',
      'To sum marks in an array, initialize total to 0, visit each mark once and add it. When counting from 0 to length - 1, using i <= length attempts an out-of-bounds access. A trace table of i and total exposes this boundary error.',
      'Selection: choosing execution paths. Iteration: repetition. Loop invariant: a property preserved across iterations. Sentinel: a special value that ends input.',
      '1. When is do/while appropriate?\n2. Trace a for loop that prints 1 through 5.\n3. How can a loop become infinite?',
      'Trace conditions and loop boundaries explicitly to prevent hidden flow errors.', 'Lesson 3')
topic('aoop', 'aoop-methods-arrays', 'Java methods and arrays',
      'Define methods with parameters and return values|Use arrays safely',
      'A method packages an operation behind a name and parameter list. An array stores a fixed-length sequence of values of a common element type.',
      'A method declaration states modifiers, return type, name and parameters. Arguments supply values when a method is called. Java passes argument values by value; for objects, that value is a reference. Arrays use zero-based indexes and expose their size through length. Separate computation from input/output to make methods reusable and easier to test.',
      'static int sum(int[] marks) { int total = 0; for (int mark : marks) total += mark; return total; }\n\nFor {40, 60, 80}, the return value is 180. Computing an average needs a check for an empty array and an appropriate numeric type to avoid unwanted integer division.',
      'Parameter: an input variable in a method declaration. Argument: a supplied value. Return value: a method result. Index: an element position.',
      '1. Distinguish parameters and arguments.\n2. Write a method to find a nonempty array’s maximum.\n3. Explain why index length is invalid.',
      'Use small methods with clear contracts, and check array boundaries and empty inputs.', 'Lesson 4')
topic('aoop', 'aoop-inheritance', 'Inheritance, interfaces and polymorphism',
      'Distinguish inheritance from composition|Explain overriding and interface-based behaviour',
      'Inheritance expresses an is-a relationship, allowing a subclass to specialize a superclass. Composition expresses a has-a relationship by building an object from other objects.',
      'Java classes extend one superclass and may implement multiple interfaces. An overridden instance method provides subclass-specific behaviour and is selected at runtime through dynamic dispatch. Overloading uses the same method name with different parameter lists. Use an interface when callers should depend on a capability rather than a concrete implementation.',
      'An interface Shape declares area(). Circle and Rectangle implement different calculations. A variable of type Shape can refer to either object, and shape.area() invokes the relevant implementation. A Student that has a Timetable should usually contain one rather than extend Timetable.',
      'Superclass: a base class. Subclass: a derived class. Override: replace inherited instance behaviour. Interface: a contract of operations. Composition: an object contains other objects.',
      '1. Compare overriding and overloading.\n2. Explain dynamic dispatch with Shape.\n3. Give an inappropriate inheritance relationship and improve it.',
      'Depend on clear interfaces and use inheritance only when the substitutability relationship makes sense.', 'topic 1-6')
topic('aoop', 'aoop-exceptions', 'Exceptions and robust object-oriented programs',
      'Explain exception propagation and handling|Use cleanup and input validation appropriately',
      'Exceptions represent exceptional conditions that interrupt normal control flow. Handling them at an appropriate boundary helps a program respond predictably and protect its state.',
      'A try block contains code that may fail; catch handles a matching exception; finally provides cleanup where needed. Try-with-resources manages AutoCloseable resources. Java distinguishes checked and unchecked exceptions. Validate expected input errors directly and avoid catching exceptions merely to hide failures. Use specific error messages and retain useful diagnostic information.',
      'A marks importer may encounter a missing file or a value such as “absent” where a number is expected. File access and numeric conversion need appropriate handling. Reject invalid records with a clear reason; do not silently record zero and make the result look valid.',
      'Exception: an exceptional condition. Propagation: passing a failure up the call stack. Checked exception: one subject to compiler handling rules. Resource: something requiring release.',
      '1. Why is catching every exception and doing nothing harmful?\n2. What is the role of finally?\n3. How would you report one invalid record in a batch import?',
      'Handle failures deliberately and keep invalid data from becoming apparently successful results.', 'topic 1-6')
topic('aoop', 'aoop-objects-classes', 'Objects, constructors and access control',
      'Create objects using constructors|Apply access modifiers and data hiding',
      'The supplied sixth topic develops objects and classes in Java. A class combines fields, constructors and methods; an object supplies the particular state on which its instance methods operate.',
      'A constructor initializes a new instance and has the class name with no return type. The this reference identifies the current instance. Access modifiers control where members may be used: private restricts a member to its declaring class, while public exposes it more widely. Keep internal fields private when updates must preserve rules and offer methods that validate changes.',
      'Example: a Student stores marks and computes a grade.\n\nSolution: initialize the name in the constructor, store marks in an instance array and expose a method that rejects values outside 0 to 100. A computeAverage() method handles an empty array explicitly. This follows the supplied grade-management assignment’s separation into data and methods.',
      'Constructor: an instance initializer. Field: a class member that stores state. this: a reference to the current object. Access modifier: a declaration controlling visibility.',
      '1. Compare a constructor and a method.\n2. Why hide the marks array?\n3. Design class responsibilities for the supplied grade-management assignment.',
      'Construct valid objects and preserve their invariants through controlled operations.', 'topic 1-6')
topic('aoop', 'aoop-gui-database', 'GUI and database programming: outline extension',
      'Relate events and components to object-oriented design|Describe database CRUD operations',
      'The uploaded course outline extends beyond the introductory topic notes to GUI programming and Java database connections. This revision overview identifies those later syllabus areas; use the outline and lecturer material for their detailed treatment.',
      'A graphical interface uses components organized in containers, and event handlers respond to user actions. Keep interface code separate from validation and persistence logic. Database CRUD means create, read, update and delete. JDBC uses a connection, prepared statements and result handling; close resources and handle failures. The outline also names Java applets as a historical syllabus topic.',
      'Example: a registration form saves a student.\n\nSolution: the event handler reads inputs, a validation method checks them, and a data-access method uses parameterized SQL. A database failure should leave the form available with a clear message rather than claiming the record was saved.',
      'Component: a GUI control. Container: an organizer of controls. Event handler: an action callback. JDBC: Java Database Connectivity. CRUD: create, read, update and delete.',
      '1. Why separate GUI and database logic?\n2. What does each CRUD operation do?\n3. Why use prepared statements?\n4. Which later outline topics require further lecturer material?',
      'Connect interface actions to validated operations and report persistence outcomes accurately.', 'Course_Outline')

topic('cbp', 'cbp-overview', 'Component-based software engineering overview',
      'Define a software component|Explain development for reuse and development with reuse',
      'Component-based software engineering builds systems by selecting and composing reusable components. A component provides functionality through an explicit interface and can be developed and deployed with a degree of independence.',
      'Development for reuse creates components intended for multiple contexts. Development with reuse assembles existing components into a new system. Benefits can include reduced effort and use of proven functionality, while limitations include interface mismatch, dependency constraints, licensing and limited control over evolution.',
      'An e-learning application can compose authentication, document storage and quiz services. The team specifies the expected interface of each service before connecting it. Replacing storage is easier when callers use a small stable adapter rather than vendor-specific calls everywhere.',
      'Component: a unit of composition with explicit interfaces. Reuse: use of existing assets. Dependency: a required external capability. Composition: connecting parts into a system.',
      '1. Distinguish a component from an arbitrary source file.\n2. Compare development for and with reuse.\n3. List three risks of using an existing component.',
      'Reuse works best when responsibilities, interfaces and dependencies are explicit.', 'Lesson 1')
topic('cbp', 'cbp-fundamentals', 'Component characteristics, interfaces and models',
      'Identify component characteristics|Explain provided and required interfaces',
      'A component’s public contract describes what it offers and what it requires. Internal implementation can change independently when the public contract remains compatible.',
      'Useful characteristics include encapsulation, composability, replaceability and independent deployment where supported. A provided interface exposes services; a required interface describes dependencies. A component model defines rules for interfaces, communication, deployment and lifecycle, helping components cooperate consistently.',
      'A Payment component provides collectPayment() and requires a BankGateway interface. A test gateway can implement the required interface during development. Publishing the function name alone is insufficient: the contract must also state accepted inputs, outcomes and failure behaviour.',
      'Provided interface: offered operations. Required interface: needed operations. Contract: agreed observable behaviour. Component model: conventions and mechanisms for composing components.',
      '1. Draw provided and required interfaces for a notification component.\n2. Why does a signature alone not define a complete contract?\n3. What makes replacement safe?',
      'A component boundary includes behavioural expectations as well as operation names.', 'Lesson 2')
topic('cbp', 'cbp-selection', 'Component discovery, evaluation and selection',
      'Evaluate a candidate against requirements|Identify compatibility and lifecycle risks',
      'Selecting an existing component involves more than finding a feature match. The team must assess whether the component will fit the system and remain supportable over time.',
      'Define functional requirements, quality constraints, environment and interface expectations. Evaluate candidate functionality, documentation, compatibility, reliability evidence, security, licensing, support and update practices. A small prototype can reveal integration problems before a commitment is made. Record compromises where the system requirements are adapted to available components.',
      'Two PDF viewer components both display documents. One is too large for students on limited mobile data; the other has a smaller package but lacks the needed accessibility controls. A selection matrix makes these trade-offs visible instead of choosing solely on feature count.',
      'Candidate: a possible component. Qualification: checking fitness for intended use. Compatibility: ability to cooperate. Total cost: acquisition, integration, operation and maintenance effort.',
      '1. Prepare five evaluation criteria for a document viewer.\n2. Why use a prototype?\n3. What evidence supports a reliability claim?',
      'Select components using explicit requirements and practical evidence of fit.', 'LECTURE 3')
topic('cbp', 'cbp-composition', 'Component composition, adaptation and integration',
      'Describe common interface mismatches|Explain adapters and integration testing',
      'Composition connects components to achieve a larger responsibility. Even components that provide the right functions may disagree about data, calling conventions or interaction order.',
      'An adapter translates between an expected and an existing interface. Wrappers can isolate vendor-specific details. Consider data formats, synchronous versus asynchronous calls, error handling, ordering and resource ownership. Integration tests exercise the boundaries, including unavailable services and malformed responses.',
      'One component returns a date as day/month/year while another expects an ISO-style representation. An adapter validates and converts the date once at the boundary. Guessing the interpretation of 03/04 can silently corrupt data, so the source format must be explicit.',
      'Adapter: a translator between interfaces. Wrapper: a boundary around an implementation. Glue code: connection logic. Integration test: a test of interactions.',
      '1. Give a data mismatch and a protocol mismatch.\n2. When does an adapter add too much complexity?\n3. Test an unavailable payment provider.',
      'Make mismatches visible and resolve them at well-defined integration boundaries.', 'LECTURE 4')
topic('cbp', 'cbp-architecture', 'Component architecture and middleware',
      'Explain the role of connectors and middleware|Assess coupling in component architectures',
      'A component architecture describes responsibilities, connections and deployment arrangements. Connectors define how components interact, while middleware supplies shared communication or infrastructure services.',
      'Interactions may use direct calls, events, messaging or remote service requests. Keep components cohesive and reduce unnecessary coupling. Remote calls introduce latency, partial failure and serialization concerns that local calls do not share. Architecture should explain data ownership, communication contracts and failure handling.',
      'After enrolment, a service publishes an event that a notification component consumes. Enrolment can succeed even if email is temporarily unavailable, provided delivery is retried and duplicate messages are handled. This design trades immediate coordination for looser coupling.',
      'Connector: an interaction mechanism. Middleware: supporting communication infrastructure. Coupling: dependence between components. Cohesion: how closely a component’s responsibilities belong together.',
      '1. Compare direct calls with event-based interaction.\n2. What extra failures occur in a distributed call?\n3. Why must duplicate events be considered?',
      'Choose interactions that fit the required consistency, performance and failure behaviour.', 'LECTURE 5')
topic('cbp', 'cbp-quality-evolution', 'Component testing, deployment and evolution',
      'Plan tests at component and system boundaries|Explain version compatibility and safe evolution',
      'A component may work in isolation while failing in a particular composition. Testing and release practices therefore need to cover both its own behaviour and its use within the system.',
      'Test the component contract, edge cases, dependency failures and integration paths. Record versions and deployment configuration so a build is reproducible. Evaluate backwards compatibility before upgrading a dependency. Stage a release, monitor the relevant behaviour and retain a practical recovery path when an upgrade causes problems.',
      'A library update changes a method’s default ordering. Unit tests of the application’s own calculations still pass, but a transcript integration test reveals the changed order. Pinning known versions and testing the contract helps catch this before deployment.',
      'Version: an identifiable release. Compatibility: preservation of expected interactions. Regression test: checking earlier behaviour after change. Deployment configuration: runtime arrangements.',
      '1. Why are component unit tests insufficient for a whole application?\n2. What makes an upgrade breaking?\n3. List information needed to reproduce a release.',
      'Treat component changes as system changes and verify the contracts the system relies on.', 'condensed')

topic('dba', 'dba-role', 'Database administration and the DBA role',
      'Explain database administration responsibilities|Distinguish logical and physical administration tasks',
      'Database systems administration keeps a database available, secure, consistent and recoverable. The DBA manages the database environment as well as the data structures used by applications.',
      'Responsibilities include installation, configuration, user management, storage planning, monitoring, backup, recovery and performance tuning. Logical concerns include schemas, constraints and privileges; physical concerns include storage layout, files, memory and capacity. Administrative changes should be documented and tested before broad use.',
      'A university database has separate responsibilities for registration, examinations and finance. The DBA provides appropriate access, monitors capacity and prepares recovery procedures so a disk failure does not make student records unrecoverable.',
      'DBA: database administrator. DBMS: database management system. Instance: a running database environment. Schema: the logical organization of database objects.',
      '1. List five DBA responsibilities.\n2. Compare logical and physical administration.\n3. Why must administrative changes be recorded?',
      'Administration is continuous stewardship of availability, integrity, security and recovery.', 'DATABASE')
topic('dba', 'dba-install-storage', 'Database installation, configuration and storage',
      'Plan a database environment|Explain storage and capacity considerations',
      'A dependable database installation begins with workload and recovery requirements. Configuration connects those requirements to the resources and operating environment available.',
      'Check software prerequisites, supported environment, storage capacity, memory, accounts and connectivity. Organize data and log storage according to the chosen DBMS. Estimate growth and monitor remaining capacity. Separate development and production responsibilities, and keep configuration information sufficient to rebuild the environment.',
      'A registration workload grows sharply at semester start. Planning must include expected concurrent sessions, transaction volume and room for logs and backups. A database with enough space for tables can still stop accepting writes if its log storage fills.',
      'Data file: stored database pages. Log: records used to support transaction recovery. Capacity planning: estimating resource demand. Configuration: selected operational settings.',
      '1. What should be checked before installation?\n2. Why plan capacity for logs as well as data?\n3. Which configuration details belong in recovery documentation?',
      'Plan storage and configuration for operation, growth and restoration.', 'DATABASE')
topic('dba', 'dba-security', 'Users, roles, privileges and database security',
      'Distinguish authentication and authorization|Apply least privilege to database access',
      'Authentication establishes an identity; authorization determines which actions that identity may perform. Database security uses both controls alongside auditing and protection of stored information.',
      'Assign privileges to roles that match responsibilities rather than granting broad administrator access. Separate application accounts from personal administrator accounts. Review grants, remove obsolete access and protect credentials. Parameterized statements address injection risks in application queries; they do not replace database privileges.',
      'A marks clerk may enter marks for assigned work but should not alter finance records or grant new roles. A reporting account may read approved views while lacking update permission. If the reporting credentials leak, the restricted privileges reduce the possible impact.',
      'Role: a named set of permissions. Privilege: an allowed operation. Least privilege: only the access required. Audit: a record of relevant actions.',
      '1. Compare authentication and authorization.\n2. Design roles for a small library database.\n3. Why should an application avoid using a DBA account?',
      'Use narrowly scoped roles and verify access with the account that will actually run the task.', 'DATABASE')
topic('dba', 'dba-backup-recovery', 'Backup, recovery and disaster planning',
      'Compare backup and recovery|Explain recovery objectives and restore testing',
      'A backup is a recoverable copy of data and required supporting information. Recovery restores service after damage, loss or another disruption; a backup is useful only when the recovery process works.',
      'Backup strategies may combine full backups, incremental changes and transaction logs, depending on DBMS capabilities. The recovery point objective concerns acceptable data loss; the recovery time objective concerns acceptable outage duration. Retain protected copies and test restoration in a suitable separate environment. Document the order and prerequisites of recovery steps.',
      'A full backup taken on Sunday may require later change backups and logs to recover to Thursday morning. Restoring only Sunday’s copy loses the intervening work. A restoration exercise reveals whether the required files, keys, accounts and instructions are actually available.',
      'RPO: acceptable data-loss window. RTO: target time to restore service. Full backup: a complete selected data copy. Restore test: verification that recovery can be performed.',
      '1. Why is a successful backup job not proof of recoverability?\n2. Compare RPO and RTO.\n3. What should a recovery exercise verify?',
      'Design backups around recovery needs, and prove the plan with restoration tests.', 'DATABASE')
topic('dba', 'dba-transactions', 'Transactions, concurrency and integrity',
      'Describe ACID properties|Explain locking, isolation and deadlocks',
      'A transaction groups related operations into a logical unit of work. Concurrent access needs coordination so that each transaction preserves the database’s rules.',
      'Atomicity gives all-or-nothing outcomes; consistency preserves defined constraints; isolation controls the effects of concurrent work; durability preserves committed changes. Locks and other concurrency mechanisms regulate access. A deadlock occurs when transactions wait cyclically for resources. Isolation choices affect both anomalies and concurrency.',
      'Transferring 1,000 between accounts requires a debit and a credit. If only the debit commits, the operation breaks its intended invariant. A transaction groups both updates. If two transfers lock accounts in opposite orders, consistent lock ordering can reduce deadlock risk.',
      'Commit: make a transaction’s results durable. Rollback: undo an uncommitted transaction. Deadlock: cyclic waiting. Constraint: a rule enforced on data.',
      '1. Explain each ACID property using a transfer.\n2. How can concurrent updates lose work?\n3. Give one strategy to reduce deadlocks.',
      'Use transactions and constraints to preserve business rules even when users work concurrently.', 'DATABASE')
topic('dba', 'dba-performance', 'Monitoring, maintenance and performance tuning',
      'Identify common database bottlenecks|Use measurements to guide tuning',
      'Database tuning improves a measured workload while preserving correctness and operational requirements. Begin by establishing which resource or query actually limits performance.',
      'Monitor query duration, execution plans, wait conditions, storage use, memory, I/O and concurrent activity. Indexes can accelerate suitable lookups but consume space and add update cost. Maintain relevant statistics and review query design. Change one factor at a time where practical, then compare against a repeatable baseline.',
      'A transcript query repeatedly scans a large results table for one student. An appropriate index may reduce the rows examined. Measure the plan and timing before and after the change, and check the effect on results entry because each insert must maintain the index.',
      'Execution plan: the strategy chosen for a query. Index: an auxiliary access structure. Baseline: reference measurements. Bottleneck: the limiting resource or step.',
      '1. Why measure before adding an index?\n2. Give one index benefit and one cost.\n3. What makes a before/after comparison meaningful?',
      'Tune the observed workload using evidence, and include maintenance and write costs.', 'DATABASE')
topic('dba', 'dba-upgrades', 'Database upgrades, migration and fallback',
      'Plan an upgrade with verification and recovery|Distinguish migration from routine configuration',
      'The supplied administration notes cover moving a database environment forward while protecting existing data and applications. An upgrade changes software versions; a migration may also change platforms, formats or deployment arrangements.',
      'Check compatibility, estimate downtime and rehearse the process on a representative environment. Back up required data and configuration, define verification steps and establish a feasible fallback. Compare row counts and important business totals, check application queries and verify permissions. A completed installer alone does not prove the database is ready.',
      'Example: a university updates its DBMS before registration.\n\nSolution: rehearse with a restored copy, run representative enrolment and transcript operations, record the expected outage and test the fallback procedure. After migration, verify key totals and access under actual application roles before reopening service.',
      'Upgrade: a software version change. Migration: moving data or environment. Fallback: a prepared return to an acceptable prior state. Verification: checking required results.',
      '1. What should a rehearsal establish?\n2. Why may fallback require more than reinstalling old software?\n3. List checks after a migration.',
      'Treat an upgrade as a controlled data and application change with a tested recovery path.', 'DATABASE')
topic('dba', 'dba-index-architecture', 'Database architectures, clustering and indexes',
      'Compare deployment and availability arrangements|Explain how B+ tree indexes support queries',
      'The supplied notes connect DBMS selection and architecture to clustering, hardware, cloud deployment and index structures. These choices support different workload, availability and cost requirements.',
      'Separate the application’s logical database requirements from its physical deployment. A cluster coordinates multiple nodes according to the selected DBMS design; it does not remove the need for backup. B+ tree indexes organize keys in a balanced search structure and link leaf entries for ordered traversal. Index benefit depends on selectivity, query shape and maintenance cost.',
      'Example: a query retrieves students with registration numbers in a range.\n\nSolution: an appropriate ordered index can locate the start and scan matching leaf entries. A query returning almost every row may instead favor a scan. Inspect the execution plan rather than assuming the presence of an index guarantees its use.',
      'Cluster: coordinated database nodes. Selectivity: how narrowly a condition filters rows. B+ tree: a balanced ordered index structure. Query optimizer: a component that chooses an execution plan.',
      '1. Why is clustering different from backup?\n2. How does an ordered index support a range query?\n3. Why might an optimizer choose a scan?',
      'Choose architecture and access structures against the actual workload and recovery needs.', 'DATABASE')

topic('sys', 'sys-introduction', 'Introduction to systems programming',
      'Distinguish system and application software|Explain the role of operating-system interfaces',
      'Systems programming develops software close to the operating environment, including translators, loaders, utilities and code that uses operating-system services directly.',
      'Application software serves end-user tasks, while system software supports program execution and manages machine resources. System programs must understand data representation, execution, files and resource ownership. A system call is a controlled request for an operating-system service; a library function may wrap one or more such calls.',
      'A file-copy utility repeatedly reads bytes and writes them to another file. It must handle errors, partial operations and cleanup as well as the normal path. The operating system mediates access to storage so the program does not directly control the hardware.',
      'System software: software supporting the computing environment. System call: an OS service request. Utility: a supporting program. Resource: a managed capability such as a file handle.',
      '1. Give four examples of system software.\n2. Compare a library call with a system call.\n3. Why does resource cleanup matter?',
      'Systems programs coordinate with the operating environment and must handle its constraints explicitly.', 'lesson 1')
topic('sys', 'sys-translators', 'Language processors, assemblers and compilers',
      'Compare assemblers, compilers and interpreters|Describe translation stages',
      'Language processors transform or execute program representations. An assembler translates assembly language; a compiler translates a source language into a target form; an interpreter executes the represented operations through an interpreting environment.',
      'Translation can involve lexical analysis, parsing, semantic checks, intermediate representation and code generation. Assemblers resolve mnemonics, labels and address information. A symbol table records identifiers and relevant attributes. A two-pass assembler can first establish symbol locations and then generate code using the completed table.',
      'An assembly jump may refer to a label defined later in the source. The first pass records where labels belong. The second pass can encode the jump target. Without a strategy for forward references, the translator does not yet know the required address.',
      'Symbol table: recorded identifier information. Token: a lexical unit. Object code: translated code awaiting further preparation where required. Forward reference: use before definition.',
      '1. Compare an assembler and a compiler.\n2. Why use two passes?\n3. What information belongs in a symbol table?',
      'Translation connects program meaning to executable representation through organized stages.', 'lesson 2')
topic('sys', 'sys-linkers-loaders', 'Linkers, loaders and program execution',
      'Distinguish linking from loading|Explain relocation and external symbol resolution',
      'Separately translated modules must be connected and prepared for execution. A linker combines modules and resolves references; a loader arranges the program in memory for execution.',
      'External symbols connect references in one module to definitions elsewhere. Relocation adjusts address-dependent information for the assigned location. Static linking includes selected code in the linked result, while dynamic linking defers some connections to shared libraries. Exact behaviour depends on the operating system and executable format.',
      'main refers to a helper function compiled in another file. The linker connects that reference to the helper’s definition. When the program is placed at a different memory location, address-dependent references must remain valid through the platform’s relocation and loading mechanisms.',
      'Linker: connects translated modules. Loader: prepares execution in memory. Relocation: address adjustment. External symbol: a name resolved outside its defining module.',
      '1. What is an unresolved external symbol?\n2. Compare linking and loading.\n3. Give a benefit and a constraint of shared libraries.',
      'Execution requires correctly connected modules and valid runtime addresses.', 'lesson 2')
topic('sys', 'sys-processes', 'Processes and process control',
      'Distinguish a process from a program|Describe process creation and termination',
      'A program is stored instructions; a process is an executing instance with runtime state and resources. Operating systems manage process creation, scheduling, waiting and termination.',
      'Process state includes execution context, address space and resource references. In a POSIX-style model, fork creates a child process, exec replaces the executing program image and wait collects child termination status. These calls have distinct roles. Check failures and distinguish parent and child control paths.',
      'A command shell starts a child, arranges its input/output, runs the requested program and waits when appropriate. If it never collects finished children, process-management records can accumulate. A forked child is not automatically running a different program; exec performs that replacement.',
      'PID: process identifier. Parent/child: a process creation relationship. Context: execution state. Exit status: a recorded termination result.',
      '1. Compare a program and a process.\n2. Explain fork, exec and wait separately.\n3. Why should a parent inspect a child’s exit status?',
      'Track which process owns each action and resource throughout creation and termination.', 'lesson 4')
topic('sys', 'sys-ipc', 'Inter-process communication',
      'Compare pipes, messages and shared memory|Explain synchronization needs in communication',
      'Processes coordinate through inter-process communication (IPC). The mechanism chosen affects data flow, coupling, performance and failure behaviour.',
      'Pipes provide byte-stream communication; message queues preserve message-oriented exchange; shared memory exposes a common region to participating processes. Shared data requires synchronization to prevent races. Blocking operations can wait for data or capacity, while nonblocking operations require the program to handle unavailable progress explicitly.',
      'In a producer-consumer system, one process places work in a bounded buffer and another removes it. Shared memory can avoid repeated copying, but both processes must coordinate updates to buffer positions and capacity. A pipe provides a different interface with the OS mediating the stream.',
      'IPC: inter-process communication. Race condition: an outcome depending on uncoordinated timing. Synchronization: control over concurrent access. Blocking: waiting until an operation can proceed.',
      '1. Compare shared memory with a pipe.\n2. Identify the race in two unsynchronized counter increments.\n3. When can blocking communication deadlock?',
      'Communication and synchronization must be designed together.', '5 & 6')
topic('sys', 'sys-files', 'File operations, signals and resource handling',
      'Explain file descriptors and partial I/O|Describe safe cleanup around errors and signals',
      'System-level I/O uses handles or descriptors to refer to open resources. Robust programs handle failure, interruptions and partial progress rather than assuming each request completes fully.',
      'A POSIX-style file sequence uses open, read/write and close. A read can return fewer bytes than requested or reach end-of-file; a write can make partial progress. Signals notify processes of events and require careful handling under the platform’s restrictions. Release owned resources on all appropriate exit paths.',
      'A copy loop reads a block, then continues writing until all bytes from that block have been written. It checks error results and closes both descriptors on completion or failure. Counting every request as a full block would corrupt the copied file when an operation completes partially.',
      'Descriptor: a process reference to an open resource. EOF: end-of-file. Partial write: fewer bytes written than requested. Signal: an asynchronous process notification.',
      '1. Why must a copy loop track bytes actually written?\n2. Distinguish EOF from an I/O error.\n3. What resources must be released when setup fails halfway?',
      'Use actual return values and clear ownership rules for reliable low-level operations.', 'lesson 3')
topic('sys', 'sys-linux', 'Linux foundations and the systems toolbox',
      'Explain kernel and user-space responsibilities|Recognize compilation and debugging tools',
      'The first two COM 312 lessons introduce Linux history and design, the kernel, libraries, utilities, system calls and the programming toolbox. User programs request kernel-managed services through defined interfaces.',
      'The kernel manages resources such as processes, memory and devices. Libraries provide reusable interfaces, and shells and utilities support interaction. The GCC pipeline preprocesses, compiles, assembles and links. Tools in the supplied notes include gcc, gdb, NASM, readelf, objdump, od, nm, ldd and ldconfig, each addressing a different part of building or inspecting programs.',
      'Example: a C program compiles but fails to link.\n\nSolution: distinguish a source error from a missing symbol or library at the linking stage. Inspect the relevant symbols and linker inputs, then use a debugger for execution-time faults. Choosing the tool depends on which stage failed.',
      'Kernel: the privileged operating-system core. User space: the environment for ordinary programs. Compiler: a source translator. Debugger: a tool for inspecting execution.',
      '1. Name the four GCC stages in order.\n2. Compare kernel and library responsibilities.\n3. Which tool category helps inspect a runtime crash?',
      'Identify the failing stage and use the Linux tool that exposes the needed evidence.', 'lesson 1')
topic('sys', 'sys-filesystems', 'Linux filesystems, inodes and shell scripting',
      'Describe the Unix directory hierarchy and inodes|Connect shell operations with file APIs',
      'The third systems lesson covers the Linux directory tree, Unix/POSIX filesystem concepts, file support in the kernel and shell scripting. Pathnames identify entries in a directory hierarchy rooted at /.',
      'An inode stores filesystem metadata and references to file contents; a directory associates names with filesystem objects. Paths may be absolute or relative. Permissions regulate access and depend on the operation and containing directories. A shell expands commands, redirects streams and composes programs through pipes. Scripts should handle spaces, failed commands and expected input carefully.',
      'Example: a script processes lecture files whose names contain spaces.\n\nSolution: preserve each pathname as a single argument through appropriate quoting, check whether file operations succeeded and distinguish the current working directory from an absolute path. Splitting a pathname on spaces can make a valid file appear missing.',
      'Inode: filesystem metadata and content references. Path: a location expressed through names. Directory: name-to-object associations. Redirection: connecting a command’s input/output to another source.',
      '1. Compare an inode and a filename.\n2. Give an absolute and a relative path.\n3. Why must shell scripts preserve argument boundaries?',
      'Understand file identity, naming and access separately when working with Linux files.', 'lesson 3')
topic('sys', 'sys-threads', 'POSIX threads and synchronization',
      'Distinguish threads from processes|Explain mutexes, semaphores and critical sections',
      'The updated sixth lesson introduces POSIX threads, thread identifiers and synchronization. Threads share a process environment while each has its own execution flow.',
      'Shared state creates races when operations overlap without coordination. A mutex provides mutual exclusion for a critical section. A semaphore maintains a count used to coordinate access or available work. Choose clear lock ownership, keep protected work limited and use a consistent lock order. Waiting for threads and releasing synchronization resources are part of the lifecycle.',
      'Example: two threads increment the same counter.\n\nSolution: reading, adding and storing are a compound operation. Without coordination, both may read the same old value and one update is lost. Protect the read-modify-write sequence with suitable synchronization; locking only the final assignment is insufficient.',
      'Thread: an execution flow within a process. Critical section: code accessing shared state that needs coordination. Mutex: a mutual-exclusion mechanism. Semaphore: a counting synchronization mechanism.',
      '1. Why can a counter update lose work?\n2. Compare a mutex and a counting semaphore.\n3. How can inconsistent lock order lead to deadlock?',
      'Protect the whole shared-state operation and make synchronization ownership explicit.', '6 Updated')
topic('sys', 'sys-sockets', 'Unix socket programming: TCP and UDP',
      'Describe client and server socket flows|Compare stream and datagram communication',
      'The seventh systems lesson introduces Unix socket APIs and client-server communication. A socket represents a communication endpoint with an address and protocol arrangement.',
      'A typical TCP server creates a socket, binds an address, listens and accepts a connection; the client connects before exchanging data. TCP provides a byte stream, so applications need their own message framing. UDP sends datagrams and has different delivery and ordering guarantees. Check return values and handle disconnection, timeouts and partial stream operations.',
      'Example: a TCP client sends a length followed by a message.\n\nSolution: the receiver first collects the complete length field, validates it and then reads exactly the announced number of bytes using a loop. One receive call need not return one whole application message, even if the sender used one send call.',
      'Socket: a communication endpoint. Bind: assign a local address. Listen/accept: prepare for and receive connections. Datagram: an individually addressed message. Framing: defining message boundaries.',
      '1. List the main TCP server steps.\n2. Why does TCP require application message framing?\n3. Compare stream and datagram behaviour.',
      'Design the application protocol as carefully as the socket call sequence.', 'lesson 7')

topic('daa', 'daa-introduction', 'Algorithms, correctness and problem solving',
      'Describe algorithm properties|Explain correctness and loop invariants',
      'An algorithm is a finite, well-defined sequence of steps for solving a specified problem. Analysis separates whether a solution is correct from how many resources it requires.',
      'State inputs, outputs and assumptions before designing steps. A correctness argument connects the procedure to the specification. For a loop, an invariant should hold initially, remain true after each iteration and establish the desired result at termination. Testing examples supports debugging but does not replace a general correctness argument.',
      'To find the maximum of a nonempty array, keep the largest value seen so far. After each iteration, the invariant is that best equals the maximum of the inspected prefix. At termination the prefix is the whole array, so best is the required maximum.',
      'Specification: required input/output behaviour. Invariant: a preserved assertion. Termination: eventual completion. Correctness: satisfying the specification under its assumptions.',
      '1. State the precondition for the maximum algorithm.\n2. Give its loop invariant.\n3. Why do ten passing examples not prove correctness for every input?',
      'Begin with a precise problem and justify both the result and termination.', 'OUTLINE')
topic('daa', 'daa-asymptotic', 'Asymptotic analysis and growth of functions',
      'Interpret O, Omega and Theta bounds|Compare common growth rates',
      'Asymptotic analysis describes how resource use grows as input size becomes large. It emphasizes growth rate rather than machine-specific elapsed time.',
      'Big O gives an asymptotic upper bound, Omega a lower bound and Theta a tight bound. State whether the analyzed function is worst-case, average-case or another measure; O itself does not mean worst-case. Common rates include constant, logarithmic, linear, n log n, quadratic and exponential. Constants and lower-order terms are ignored when deriving asymptotic classes.',
      'The function 3n² + 5n + 8 is Theta(n²). A loop visiting n items with constant work per item is Theta(n). Two nested loops each making n iterations perform Theta(n²) work. Doubling n roughly quadruples the dominant quadratic term.',
      'Input size: the parameter measuring problem scale. O: upper bound. Omega: lower bound. Theta: matching upper and lower bounds. Dominant term: the term governing growth.',
      '1. Order log n, n, n log n and n² by growth.\n2. Explain why O(n²) is not necessarily a tight bound.\n3. Analyze two sequential linear loops.',
      'State the input measure, case and bound clearly before comparing algorithms.', 'Asymptotic')
topic('daa', 'daa-recurrences', 'Recurrences and recursive algorithms',
      'Form a recurrence from a recursive algorithm|Use expansion or a recursion tree to estimate cost',
      'A recurrence expresses the cost of a recursive problem using the cost of smaller instances. It must include both recursive work and the work done outside recursive calls.',
      'Identify the number of subproblems, their sizes, combination work and base case. Expansion and recursion trees show how work accumulates by level. Where applicable, the Master theorem compares a recurrence of the form T(n) = aT(n/b) + f(n) with the subproblem growth. Check its conditions rather than applying a memorized result to every recurrence.',
      'Merge sort has T(n) = 2T(n/2) + Theta(n). Each level contributes Theta(n), and there are Theta(log n) levels, giving Theta(n log n). Binary search keeps only one half, giving T(n) = T(n/2) + Theta(1) and Theta(log n) time.',
      'Recurrence: a recursive cost equation. Base case: a directly solved instance. Recursion tree: a representation of subproblem work. Depth: the longest chain of recursive calls.',
      '1. Form a recurrence for binary search.\n2. Explain merge sort’s cost per level.\n3. What changes if each recursive call keeps n - 1 items?',
      'Count all subproblem and combination work, and include a valid stopping condition.', 'OUTLINE')
topic('daa', 'daa-divide-conquer', 'Divide and conquer',
      'Identify divide, conquer and combine steps|Analyze merge sort and binary search',
      'Divide and conquer breaks a problem into smaller related instances, solves them and combines their results. The quality of the division and the cost of combination determine efficiency.',
      'Merge sort divides the sequence in half and merges sorted halves. Quicksort partitions around a pivot; balanced partitions give efficient behaviour, while consistently unbalanced ones can give quadratic time. Binary search discards half a sorted search range after a comparison. Confirm that prerequisites such as sorted input hold.',
      'Searching [3, 8, 12, 19, 25] for 19 first compares the middle value 12. Only the right portion can contain the target, so the other half is discarded. Repeating this reduction yields logarithmic comparisons, provided the sequence is sorted.',
      'Partition: divide according to a criterion. Pivot: a partition reference value. Merge: combine ordered sequences. Subproblem: a smaller instance.',
      '1. Identify the three merge sort phases.\n2. Why can quicksort take quadratic time?\n3. What makes binary search invalid on unsorted data?',
      'Efficient division shrinks the remaining work while preserving the problem’s correctness conditions.', 'OUTLINE')
topic('daa', 'daa-greedy', 'Greedy algorithms',
      'Explain the greedy-choice property|Distinguish a valid greedy solution from a heuristic',
      'A greedy algorithm repeatedly makes a locally preferred choice. It is correct for a problem only when those choices can be justified as part of a global optimum.',
      'Common examples include activity selection, fractional knapsack and minimum spanning tree methods. Greedy-choice and optimal-substructure arguments justify suitable problems. Fractional knapsack can select by value-to-weight ratio because items may be divided; the same rule does not generally solve 0/1 knapsack. Dijkstra’s shortest-path method assumes nonnegative edge weights.',
      'For compatible activity scheduling on one resource, choose the activity that finishes earliest, then repeat among activities starting after it. This leaves maximum room for later activities. Choosing the shortest duration instead can block a better sequence.',
      'Greedy choice: a locally selected action. Optimal substructure: optimal solutions contain appropriate optimal subsolutions. MST: a minimum-weight spanning tree. Feasible: satisfying constraints.',
      '1. Why does a greedy rule require proof?\n2. Contrast fractional and 0/1 knapsack.\n3. State an assumption of Dijkstra’s algorithm.',
      'A simple local rule is an algorithmic solution only when its global correctness is established.', 'OUTLINE')
topic('daa', 'daa-dynamic-programming', 'Dynamic programming',
      'Recognize overlapping subproblems|Define states, recurrences and base cases',
      'Dynamic programming avoids repeating the same subproblem computations. It is useful when a problem has suitable optimal substructure and overlapping subproblems.',
      'Define what each state means, derive a recurrence, specify base cases and choose an evaluation order that respects dependencies. Memoization stores results of recursive calls; tabulation builds a table directly. Matrix-chain multiplication, longest common subsequence and optimal binary search trees are key examples in the supplied outline.',
      'For Fibonacci numbers, plain recursion repeatedly recomputes earlier values. Storing each F(i) means each state is evaluated once. For an optimization problem such as matrix-chain order, also store the choice producing the optimum if the actual solution must be reconstructed.',
      'State: a subproblem representation. Memoization: caching recursive results. Tabulation: evaluating a table of states. Reconstruction: recovering choices from stored decisions.',
      '1. Compare memoization and tabulation.\n2. Why must the state meaning be precise?\n3. What additional data is needed to reconstruct an optimal solution?',
      'Design the state and dependency relation before writing the dynamic-programming table.', 'OUTLINE')
topic('daa', 'daa-graphs', 'Graph algorithms, paths and spanning trees',
      'Choose adjacency lists or matrices|Explain BFS, DFS and topological ordering',
      'Graphs represent relationships using vertices and edges. The representation and traversal method should fit the problem’s operations and density.',
      'Adjacency lists use Theta(V + E) space, while an adjacency matrix uses Theta(V²). BFS explores by layers and finds shortest paths by edge count in an unweighted graph. DFS explores deeply and supports cycle-related reasoning and ordering tasks. Topological order exists for a directed acyclic graph. A minimum spanning tree and a shortest-path tree optimize different objectives.',
      'Model prerequisite units with directed edges from prerequisite to dependent unit. A topological ordering gives an order that respects prerequisites if there is no directed cycle. A cycle means those stated prerequisites cannot all be satisfied sequentially.',
      'Vertex: an entity. Edge: a relationship. Path: a sequence of connected vertices. Cycle: a closed path. DAG: directed acyclic graph.',
      '1. When is an adjacency list preferable?\n2. Why does BFS give shortest unweighted paths?\n3. Compare an MST and a shortest-path tree.',
      'Match graph direction, weights and representation to the question being answered.', 'OUTLINE')
topic('daa', 'stacks', 'Stacks and queues',
      'Explain LIFO and FIFO ordering|Choose a supporting structure for graph traversal',
      'Stacks and queues are prerequisite structures used by the algorithms in this unit. A stack removes the most recently added element; a queue removes the earliest added element.',
      'A stack follows Last In, First Out (LIFO): push adds to the top, pop removes the top and peek reads it. A queue follows First In, First Out (FIFO): enqueue adds at the back and dequeue removes the front. Suitable implementations make these core operations constant-time; resizable array growth may require occasional extra work.',
      'Push 10, 20 and 30 onto a stack: pop returns 30. Enqueue the same values: dequeue returns 10. BFS uses a queue to process a layer before the next one; DFS can use a stack to pursue a branch before returning to earlier alternatives.',
      'Push: add to a stack. Pop: remove its top. Peek: read without removal. Enqueue: add to a queue. Dequeue: remove the front.',
      '1. Which structure fits an undo operation?\n2. Trace three pushes followed by two pops.\n3. Why does BFS need FIFO order?',
      'Use a stack for the most recent unfinished work and a queue for work in arrival order.', 'OUTLINE')

topic('ai', 'ai-introduction', 'Introduction to artificial intelligence',
      'Define AI and describe its scope|Compare narrow and general intelligence concepts',
      'Artificial intelligence studies systems that perform tasks associated with intelligent behaviour, including reasoning, learning, perception and decision-making. The supplied introductory lesson covers its definition, history, types, advantages, limitations and challenges.',
      'Narrow AI is designed for particular tasks. General intelligence describes a broader ability across tasks. AI systems can use explicitly programmed rules, search or learned patterns. Useful evaluation considers the actual task, the evidence of performance and the consequences of errors rather than whether an output appears human.',
      'A timetable conflict checker uses rules to detect overlapping classes. A prediction model learns associations from past enrolment data. Both support decisions, but each has limits and depends on how the task and data are defined.',
      'AI: artificial intelligence. Agent: a system that perceives and acts. Learning: adapting behaviour or predictions from data. Inference: deriving a conclusion or producing a model output.',
      '1. Give a rule-based and a learning-based AI example.\n2. Compare narrow and general AI.\n3. Name two limitations of an AI system.',
      'Define intelligence in terms of the task and evaluate actual behaviour and limitations.', 'Lesson 1')
topic('ai', 'ai-applications', 'Applications of artificial intelligence',
      'Identify application areas|Relate AI techniques to useful tasks',
      'AI applications combine a problem, suitable information and a method for producing useful outputs. The supplied lesson surveys sectors including healthcare, finance, astronomy and robotics.',
      'Applications include classification, prediction, recommendation, anomaly detection, language processing and automated control. Choosing an application requires a clear purpose and suitable evaluation. Errors can have unequal costs, and a model that works in one setting may fail when the input population or conditions change.',
      'A university helpdesk can classify messages by department. Evaluate misrouted messages, not just overall accuracy, and allow staff to correct assignments. Sensitive or ambiguous cases may require review rather than automatic action.',
      'Classification: selecting a category. Prediction: estimating an unknown outcome. Recommendation: ranking useful options. Anomaly: an observation that differs from expected patterns.',
      '1. Map three sectors to specific AI tasks.\n2. What data would a helpdesk classifier need?\n3. Why might two errors have different costs?',
      'Start with the user’s task and define how useful performance will be measured.', 'Lesson 2')
topic('ai', 'ai-features', 'Features and capabilities of AI systems',
      'Describe automation, data ingestion and learning|Explain the role of representation and analysis',
      'The features lesson describes AI through capabilities such as automation, ingesting information, analysis and learning. These capabilities depend on the system’s design and information sources.',
      'Data ingestion collects inputs; preprocessing prepares them; representation makes relevant aspects available to a method. Learning estimates useful patterns, while inference applies a rule set or trained model. Automation follows a defined workflow and should include handling for uncertain, missing or invalid inputs.',
      'A document classification pipeline first extracts text, then represents the text, predicts a subject and records the result. A scanned page with no extractable text needs a different handling path. Ignoring that condition may generate a confident label from empty input.',
      'Ingestion: collecting inputs. Preprocessing: preparing data. Representation: an encoded form. Model: a rule or learned relationship used to produce outputs.',
      '1. Distinguish training from inference.\n2. Why does representation affect performance?\n3. What should a pipeline do with missing input?',
      'AI capability comes from a complete information-processing pipeline, including failure handling.', 'Lesson 3')
topic('ai', 'ai-examples', 'AI examples: reasoning, language and perception',
      'Recognize reasoning, learning and self-correction examples|Distinguish language and vision tasks',
      'Examples help connect abstract AI ideas to observable operations. The supplied lesson discusses learning, reasoning, self-correction, recommendation, natural language processing and computer vision.',
      'Reasoning uses represented knowledge to derive conclusions. Natural language processing operates on language; computer vision operates on images or video. A recommendation system ranks candidates from available signals. Feedback can support improvement, but an individual correction does not automatically retrain every system.',
      'An accessibility tool may detect text in an image and then read it aloud. Image processing recognizes characters; language processing can help interpret their sequence. If the characters are misrecognized, later stages may produce fluent but incorrect text.',
      'NLP: natural language processing. Computer vision: interpreting visual inputs. Reasoning: deriving conclusions. Feedback: information used to evaluate or improve behaviour.',
      '1. Separate the stages in an image-to-speech tool.\n2. Give a reasoning example.\n3. Why should fluent output still be checked?',
      'Identify the specific capability behind an example and trace errors across its stages.', 'Lesson 4')
topic('ai', 'ai-human-intelligence', 'Artificial intelligence and human intelligence',
      'Compare strengths and limitations|Explain the role of context and judgment',
      'The supplied lesson compares artificial and human intelligence. Useful comparison considers the task, learning conditions and environment rather than assuming one universal ranking.',
      'Computers can process large quantities of structured information consistently and quickly for suitable tasks. Human intelligence includes flexible contextual understanding, lived experience and social judgment. AI performance depends on its design, data and evaluation conditions. Systems can reproduce patterns and errors present in their information sources.',
      'A model can flag unusual attendance patterns across thousands of records. A lecturer may know that a timetable change or a documented personal circumstance explains the pattern. Combining the signal with contextual review produces a better-supported decision.',
      'Context: surrounding circumstances. Generalization: applying learned patterns to new cases. Bias: systematic distortion. Judgment: assessing a situation using relevant evidence and context.',
      '1. Compare humans and AI on a clearly specified task.\n2. Why is context important?\n3. Give a decision where human review adds information.',
      'Use AI strengths within their evaluated limits and include the context needed for sound decisions.', 'Lesson 5')
topic('ai', 'ai-how-it-works', 'How AI works: data, models and evaluation',
      'Describe a model-development workflow|Compare supervised, unsupervised and reinforcement learning',
      'The supplied lesson introduces machine learning, deep learning, language processing, vision and expert systems. A learning workflow connects a defined problem to data, training and evaluation.',
      'Supervised learning uses labelled examples; unsupervised learning seeks structure without task labels; reinforcement learning studies actions and reward through interaction. A typical workflow collects and prepares data, selects a model, trains it and evaluates it on data excluded from fitting. Leakage makes evaluation overoptimistic when information from the answer or test set enters training.',
      'To classify lecture notes by unit, split examples before fitting data-dependent preprocessing, train on the training set and assess performance on held-out examples. Several pages from the same document may be too similar to split independently without inflating the result.',
      'Training set: examples used for fitting. Validation: data used for development choices. Test set: held-out evaluation data. Leakage: improper access to information during development.',
      '1. Compare three learning paradigms.\n2. Why keep evaluation data separate?\n3. Give an example of leakage in a document classifier.',
      'A credible model result requires a clear task and an evaluation that reflects new cases.', 'Lesson 6')
topic('ai', 'ai-agents', 'Intelligent agents and environments',
      'Compare major agent types|Describe environment properties',
      'An agent receives percepts from an environment and chooses actions. A performance measure defines what successful behaviour means for the task.',
      'Simple reflex agents use current percepts and condition-action rules. Model-based agents maintain internal state. Goal-based agents reason about achieving goals; utility-based agents compare preferences among outcomes; learning agents improve from experience. Environments may be fully or partially observable, deterministic or stochastic, episodic or sequential, static or dynamic, and discrete or continuous.',
      'A campus delivery robot senses obstacles, tracks its position and chooses routes to a destination. Limited sensors make the environment partially observable; moving people make it dynamic. The performance measure should consider safe arrival and resource use rather than speed alone.',
      'Percept: an observation. Action: an environment-changing choice. Utility: a measure of outcome preference. Rationality: choosing appropriately given available information and goals.',
      '1. Compare reflex and goal-based agents.\n2. Classify a chess environment and justify assumptions.\n3. Design a performance measure for a delivery robot.',
      'Choose an agent design that matches what it can observe and how the environment changes.', 'Lesson 7')
topic('ai', 'ai-search', 'Search algorithms and problem formulation',
      'Specify states, actions, goals and path costs|Compare uninformed and informed search',
      'Search explores possible states to find a solution. A well-defined search problem states the initial state, available actions, transition behaviour, goal test and path cost.',
      'Breadth-first search explores shallow states first; depth-first search explores a branch before backtracking. Uniform-cost search expands by accumulated path cost. Informed search uses a heuristic; A* orders by g(n) + h(n). Completeness, optimality, time and space depend on each algorithm’s assumptions. Admissibility and, for standard graph-search treatment, consistency of a heuristic matter for A* guarantees.',
      'For a campus route, states are locations, actions traverse walkways and cost may be distance. A straight-line distance to the destination can be a lower-bound heuristic when walkway distance cannot be shorter. Fewest edges and shortest distance are different objectives when edges have unequal weights.',
      'State space: possible problem configurations. Heuristic: an estimated remaining cost. Completeness: finding a solution when one exists under stated conditions. Optimality: returning a minimum-cost solution.',
      '1. Formulate a route problem.\n2. When does BFS find a least-cost path?\n3. Explain g(n) and h(n) in A*.\n4. Compare DFS time and memory concerns.',
      'Define the search problem and assumptions before selecting a strategy.', 'Search Algorithms')

# Keep the sequence aligned with the supplied lecture progression.
topic_order = {
    'aoop': ['aoop-introduction', 'aoop-java', 'aoop-control', 'aoop-methods-arrays', 'aoop-objects-classes', 'aoop-inheritance', 'aoop-exceptions', 'aoop-gui-database'],
    'sys': ['sys-introduction', 'sys-linux', 'sys-translators', 'sys-linkers-loaders', 'sys-filesystems', 'sys-files', 'sys-processes', 'sys-ipc', 'sys-threads', 'sys-sockets'],
}
chapters.sort(key=lambda t: (list(FOLDERS).index(t['courseId']), topic_order[t['courseId']].index(t['id']) if t['courseId'] in topic_order else 0))

course_specs = [
    ('sqa', 'SQA', 'Software Quality Assurance', 'mint', 'Study software quality, quality planning, reviews, testing, metrics and CASE tools.'),
    ('aoop', 'SSE 2105', 'Advanced Object-Oriented Programming', 'lavender', 'Develop Java foundations, object-oriented design, control structures, methods and robust programs.'),
    ('cbp', 'SSE 2302', 'Component-Based Programming', 'peach', 'Component Based Software Engineering: reusable components, explicit interfaces and dependable integration.'),
    ('dba', 'SBT 2301', 'Database Systems Administration', 'blue', 'Administer database environments, access, backup, recovery, transactions and performance.'),
    ('sys', 'COM 312', 'System Programming', 'yellow', 'Explore Linux, system software, processes, communication and operating-system services.'),
    ('daa', 'SPC 2302', 'Design and Analysis of Algorithms', 'rose', 'Prove correctness and analyze algorithms using divide and conquer, greedy methods, dynamic programming and graphs.'),
    ('ai', 'SPC 2303', 'Artificial Intelligence', 'mint', 'Study intelligent behaviour, learning, agents, applications and search algorithms.'),
]
courses = [{'id': cid, 'code': code, 'title': title, 'category': 'Computer Science',
            'lecturer': 'Uploaded lecture notes', 'initials': code.split()[0][:2],
            'color': color, 'progress': 0, 'year': 3, 'semester': 1,
            'topics': sum(t['courseId'] == cid for t in chapters),
            'materials': sum(r['courseId'] == cid for r in resources),
            'description': description} for cid, code, title, color, description in course_specs]

data_path = APP / 'src' / 'lib' / 'data.ts'
old = data_path.read_text(encoding='utf-8')
questions = old[old.index('export type Question'):old.index('export const deadlines')]
out = '''// Year 3, Semester 1: imported from the supplied notes/YEAR 3 folder.
// Short labels are used where no verified unit code is available in the files.
export type Course = {id:string;code:string;title:string;category:string;lecturer:string;initials:string;color:string;progress:number;topics:number;materials:number;description:string;year:number;semester:number};
export type Topic = {id:string;courseId:string;title:string;minutes:number;objectives:string[];sections:{heading:string;text:string}[];takeaway:string;sources:string[]};
export type Resource = {id:string;courseId:string;title:string;url:string;format:string};
'''
for name, value, typename in [('courses', courses, 'Course'), ('topics', chapters, 'Topic'), ('resources', resources, 'Resource')]:
    out += f'export const {name}:{typename}[] = ' + json.dumps(value, ensure_ascii=False, indent=2) + ';\n'
out += "export const getCourseTopics=(courseId:string)=>topics.filter(t=>t.courseId===courseId);\n"
out += questions
out += "export const deadlines=[{day:'08',month:'NOV',title:'Database administration revision',course:'DBA · Database Systems Administration',type:'Sample reminder',time:'11:59 PM',color:'blue'},{day:'10',month:'NOV',title:'Stacks & queues practice',course:'SPC 2302 · Design and Analysis of Algorithms',type:'Practice quiz',time:'5:00 PM',color:'rose'},{day:'12',month:'NOV',title:'Software quality review',course:'SQA · Software Quality Assurance',type:'Sample reminder',time:'11:59 PM',color:'mint'}];\n"
data_path.write_text(out, encoding='utf-8')
print(json.dumps({'units': len(courses), 'topics': len(chapters), 'documents': len(resources), 'byUnit': {c['id']: {'topics': c['topics'], 'files': c['materials']} for c in courses}}, indent=2))
