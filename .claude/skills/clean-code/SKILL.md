---
name: clean-code
description: Expert-level Clean Code principles for writing readable, maintainable, and professional JavaScript/TypeScript code. Use when writing any code to ensure quality, clarity, and long-term maintainability.
---

# Clean Code Principles

## Philosophy

"Clean code is code that has been taken care of. Someone has taken the time to keep it simple and orderly. They have paid appropriate attention to details. They have cared." — Robert C. Martin

Code is read 10x more than it's written. Optimize for readability.

---

## 1. Naming

### Variables — Reveal Intent
```javascript
// ❌ Bad
const d = new Date()
const t = d.getTime()
const arr = users.filter(u => u.a > 18)

// ✅ Good
const currentDate = new Date()
const timestampMs = currentDate.getTime()
const adultUsers = users.filter(user => user.age > 18)
```

### Use Pronounceable Names
```javascript
// ❌ Bad
const yyyymmdstr = moment().format('YYYY/MM/DD')
const modymdhms = new Date()

// ✅ Good
const currentDate = moment().format('YYYY/MM/DD')
const modificationTimestamp = new Date()
```

### Use Searchable Names
```javascript
// ❌ Bad — Magic numbers
if (user.role === 1) { }
setTimeout(doSomething, 86400000)

// ✅ Good
const ADMIN_ROLE = 1
const MILLISECONDS_PER_DAY = 86_400_000

if (user.role === ADMIN_ROLE) { }
setTimeout(doSomething, MILLISECONDS_PER_DAY)
```

### Avoid Mental Mapping
```javascript
// ❌ Bad — What is i, j, k?
for (let i = 0; i < users.length; i++) {
  for (let j = 0; j < users[i].orders.length; j++) {
    // ...
  }
}

// ✅ Good
for (const user of users) {
  for (const order of user.orders) {
    // ...
  }
}
```

### Class Names — Nouns
```javascript
// ❌ Bad
class ProcessData { }
class HandlePayment { }

// ✅ Good
class DataProcessor { }
class PaymentHandler { }
class UserRepository { }
class OrderService { }
```

### Method Names — Verbs
```javascript
// ❌ Bad
class User {
  name() { }
  password() { }
}

// ✅ Good
class User {
  getName() { }
  setPassword(password) { }
  isActive() { }
  hasPermission(permission) { }
  canEdit(resource) { }
}
```

### Use Domain Language
```javascript
// ❌ Bad — Generic
const list = getThings()
const data = fetchStuff()

// ✅ Good — Domain-specific
const activeSubscriptions = getActiveSubscriptions()
const pendingOrders = fetchPendingOrders()
```

### Boolean Names — Question Form
```javascript
// ❌ Bad
const open = true
const write = false
const fruit = true

// ✅ Good
const isOpen = true
const canWrite = false
const hasFruit = true
const shouldUpdate = true
const didComplete = false
```

---

## 2. Functions

### Small — Do One Thing
```javascript
// ❌ Bad — Does too many things
function processUser(user) {
  // Validate
  if (!user.email || !user.name) {
    throw new Error('Invalid user')
  }
  
  // Format
  user.email = user.email.toLowerCase()
  user.name = user.name.trim()
  
  // Save
  database.save(user)
  
  // Notify
  emailService.send(user.email, 'Welcome!')
  
  // Log
  logger.info(`User created: ${user.id}`)
}

// ✅ Good — Single responsibility
function validateUser(user) {
  if (!user.email || !user.name) {
    throw new ValidationError('Email and name are required')
  }
}

function normalizeUser(user) {
  return {
    ...user,
    email: user.email.toLowerCase(),
    name: user.name.trim()
  }
}

function createUser(userData) {
  validateUser(userData)
  const user = normalizeUser(userData)
  const savedUser = userRepository.save(user)
  notificationService.sendWelcome(savedUser)
  return savedUser
}
```

### Function Length — Max 20 Lines
```javascript
// If a function exceeds 20 lines, extract smaller functions
// Each function should be readable without scrolling
```

### Arguments — Fewer is Better
```javascript
// ❌ Bad — Too many arguments
function createUser(name, email, age, address, phone, role, department) { }

// ✅ Good — Object parameter
function createUser({ name, email, age, address, phone, role, department }) { }

// ✅ Better — Separate concerns
function createUser(personalInfo, contactInfo, organizationInfo) { }
```

### Avoid Flag Arguments
```javascript
// ❌ Bad — Boolean flag changes behavior
function renderPage(isMobile) {
  if (isMobile) {
    // render mobile
  } else {
    // render desktop
  }
}

// ✅ Good — Separate functions
function renderMobilePage() { }
function renderDesktopPage() { }

// Or use strategy pattern
const renderers = {
  mobile: renderMobilePage,
  desktop: renderDesktopPage
}
renderers[deviceType]()
```

### No Side Effects
```javascript
// ❌ Bad — Hidden side effect
function checkPassword(user, password) {
  if (user.password === hash(password)) {
    Session.initialize() // Hidden side effect!
    return true
  }
  return false
}

// ✅ Good — Pure function
function isPasswordValid(user, password) {
  return user.password === hash(password)
}

// Caller handles session
if (isPasswordValid(user, password)) {
  Session.initialize()
}
```

### Command Query Separation
```javascript
// ❌ Bad — Does both
function setAndGetValue(key, value) {
  this.data[key] = value
  return this.data[key]
}

// ✅ Good — Separate command and query
function setValue(key, value) {
  this.data[key] = value
}

function getValue(key) {
  return this.data[key]
}
```

### Prefer Exceptions to Error Codes
```javascript
// ❌ Bad
function withdraw(amount) {
  if (amount > balance) {
    return -1 // Error code
  }
  balance -= amount
  return 0 // Success
}

// ✅ Good
function withdraw(amount) {
  if (amount > balance) {
    throw new InsufficientFundsError(amount, balance)
  }
  balance -= amount
}
```

### DRY — Don't Repeat Yourself
```javascript
// ❌ Bad — Duplication
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function validateUserEmail(user) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(user.email)
}

// ✅ Good — Single source of truth
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email) {
  return EMAIL_REGEX.test(email)
}

function validateUserEmail(user) {
  return isValidEmail(user.email)
}
```

---

## 3. Comments

### Code Should Be Self-Documenting
```javascript
// ❌ Bad — Comment explains what code does
// Check if user is eligible for discount
if (user.age > 65 || user.membershipYears > 5) {
  applyDiscount()
}

// ✅ Good — Code explains itself
const isSeniorCitizen = user.age > 65
const isLoyalMember = user.membershipYears > 5
const isEligibleForDiscount = isSeniorCitizen || isLoyalMember

if (isEligibleForDiscount) {
  applyDiscount()
}
```

### Good Comments — Why, Not What
```javascript
// ✅ Legal comments
// Copyright (c) 2024 Company. All rights reserved.

// ✅ Intent explanation
// We use a binary search here because the array is always sorted
// and can contain millions of items

// ✅ Warning of consequences
// WARNING: This operation takes ~30 minutes for large datasets
// Consider running during off-peak hours

// ✅ TODO (with ticket reference)
// TODO(JIRA-1234): Replace with new API endpoint after migration

// ✅ Clarification of external code
// The third-party API returns dates in MM/DD/YYYY format
// despite their documentation saying ISO 8601

// ✅ JSDoc for public APIs
/**
 * Calculates compound interest over time.
 * @param {number} principal - Initial investment amount
 * @param {number} rate - Annual interest rate (0.05 = 5%)
 * @param {number} years - Investment duration in years
 * @returns {number} Final amount after compound interest
 */
function calculateCompoundInterest(principal, rate, years) {
  return principal * Math.pow(1 + rate, years)
}
```

### Bad Comments — Delete These
```javascript
// ❌ Redundant — Says what code already says
// Increment counter by 1
counter++

// ❌ Noise
// Default constructor
constructor() { }

// ❌ Commented-out code — Use version control
// function oldImplementation() {
//   // ...
// }

// ❌ Position markers
//////////////////////////
// SECTION: User Methods
//////////////////////////

// ❌ Closing brace comments
} // end if
} // end for
} // end class

// ❌ Attribution
// Added by John on 12/15/2023
```

---

## 4. Formatting

### Vertical Density — Related Code Together
```javascript
// ❌ Bad — Unrelated spacing
class User {

  constructor(name) {

    this.name = name

  }


  getName() {

    return this.name

  }

}

// ✅ Good — Logical grouping
class User {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}
```

### Vertical Distance — Declare Near Use
```javascript
// ❌ Bad — Variable declared far from use
function process() {
  const config = loadConfig()
  
  // ... 50 lines of code ...
  
  useConfig(config) // Where did config come from?
}

// ✅ Good — Declare close to usage
function process() {
  // ... other logic ...
  
  const config = loadConfig()
  useConfig(config)
}
```

### Horizontal Formatting — Max 100-120 Characters
```javascript
// ❌ Bad — Too long
const userWithAllPropertiesAndRelationships = await userRepository.findByIdWithRelations(userId, ['orders', 'payments', 'subscriptions', 'preferences'])

// ✅ Good — Break into readable lines
const userWithRelations = await userRepository.findByIdWithRelations(
  userId,
  ['orders', 'payments', 'subscriptions', 'preferences']
)
```

### Consistent Indentation
```javascript
// Use 2 spaces for JavaScript/TypeScript
// Configure EditorConfig or Prettier
```

### File Organization — Newspaper Metaphor
```javascript
// Top: High-level, public API
// Bottom: Low-level, private details

class OrderService {
  // PUBLIC - What this class does (the headlines)
  async createOrder(orderData) {
    const validatedData = this.validateOrder(orderData)
    const order = await this.persistOrder(validatedData)
    await this.notifyCustomer(order)
    return order
  }

  async cancelOrder(orderId) {
    // ...
  }

  // PRIVATE - How it does it (the details)
  validateOrder(data) {
    // ...
  }

  async persistOrder(data) {
    // ...
  }

  async notifyCustomer(order) {
    // ...
  }
}
```

---

## 5. Objects & Data Structures

### Data Transfer Objects (DTOs) — No Behavior
```javascript
// DTO — Pure data
class UserDTO {
  constructor(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
  }
}

// Object — Data + Behavior
class User {
  #password

  constructor(id, name, email, password) {
    this.id = id
    this.name = name
    this.email = email
    this.#password = password
  }

  checkPassword(attempt) {
    return hash(attempt) === this.#password
  }

  getDisplayName() {
    return `${this.name} <${this.email}>`
  }
}
```

### Law of Demeter — Don't Talk to Strangers
```javascript
// ❌ Bad — Train wreck
const zipCode = user.getAddress().getCity().getZipCode()

// ✅ Good — Tell, don't ask
const zipCode = user.getZipCode()

// Inside User class
getZipCode() {
  return this.address.getZipCode()
}
```

### Prefer Composition Over Inheritance
```javascript
// ❌ Bad — Inheritance hierarchy
class Animal { }
class Dog extends Animal { }
class RobotDog extends Dog { } // Can't bark, doesn't eat...

// ✅ Good — Composition
const canWalk = (state) => ({
  walk: () => { /* ... */ }
})

const canBark = (state) => ({
  bark: () => { /* ... */ }
})

const createDog = (name) => {
  const state = { name }
  return {
    ...canWalk(state),
    ...canBark(state)
  }
}
```

---

## 6. Error Handling

### Use Exceptions, Not Return Codes
```javascript
// ❌ Bad
function getUser(id) {
  const user = database.find(id)
  if (!user) return null
  return user
}

// Caller must check for null everywhere
const user = getUser(id)
if (user) {
  // ...
}

// ✅ Good
function getUser(id) {
  const user = database.find(id)
  if (!user) {
    throw new UserNotFoundError(id)
  }
  return user
}

// Caller handles exceptions at appropriate level
try {
  const user = getUser(id)
  // ...
} catch (error) {
  if (error instanceof UserNotFoundError) {
    // Handle gracefully
  }
}
```

### Create Custom Error Classes
```javascript
class ApplicationError extends Error {
  constructor(message, code, details = {}) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}

class ValidationError extends ApplicationError {
  constructor(field, message) {
    super(message, 'VALIDATION_ERROR', { field })
  }
}

class NotFoundError extends ApplicationError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 'NOT_FOUND', { resource, id })
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED')
  }
}
```

### Don't Return Null
```javascript
// ❌ Bad — Null propagation
function getUsers() {
  const users = database.query('SELECT * FROM users')
  if (users.length === 0) return null
  return users
}

// Caller must check
const users = getUsers()
if (users !== null) {
  users.forEach(/* ... */)
}

// ✅ Good — Return empty collection
function getUsers() {
  return database.query('SELECT * FROM users') // Returns [] if empty
}

// Caller doesn't need null check
const users = getUsers()
users.forEach(/* ... */) // Works fine with empty array
```

### Don't Pass Null
```javascript
// ❌ Bad
function calculateArea(width, height) {
  return width * height
}
calculateArea(null, 5) // NaN

// ✅ Good — Validate inputs
function calculateArea(width, height) {
  if (width == null || height == null) {
    throw new ValidationError('Width and height are required')
  }
  if (width <= 0 || height <= 0) {
    throw new ValidationError('Dimensions must be positive')
  }
  return width * height
}
```

### Fail Fast
```javascript
// ✅ Good — Validate at entry points
function processOrder(order) {
  // Guard clauses first
  if (!order) throw new ValidationError('Order is required')
  if (!order.items?.length) throw new ValidationError('Order must have items')
  if (!order.customerId) throw new ValidationError('Customer ID is required')
  
  // Main logic only runs if valid
  return executeOrder(order)
}
```

---

## 7. Boundaries

### Wrap Third-Party Code
```javascript
// ❌ Bad — Direct dependency everywhere
import axios from 'axios'

class UserService {
  async getUser(id) {
    const response = await axios.get(`/users/${id}`)
    return response.data
  }
}

// ✅ Good — Wrapper isolates dependency
class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({ baseURL })
  }

  async get(url, config) {
    const response = await this.client.get(url, config)
    return response.data
  }

  async post(url, data, config) {
    const response = await this.client.post(url, data, config)
    return response.data
  }
}

class UserService {
  constructor(httpClient) {
    this.http = httpClient
  }

  async getUser(id) {
    return this.http.get(`/users/${id}`)
  }
}
```

### Adapter Pattern for External APIs
```javascript
// External API returns different format
// { usr_id: 1, usr_name: 'John', usr_mail: 'john@example.com' }

// Adapter normalizes to our domain model
class ExternalUserAdapter {
  static toDomain(externalUser) {
    return {
      id: externalUser.usr_id,
      name: externalUser.usr_name,
      email: externalUser.usr_mail
    }
  }

  static toExternal(domainUser) {
    return {
      usr_id: domainUser.id,
      usr_name: domainUser.name,
      usr_mail: domainUser.email
    }
  }
}
```

---

## 8. Unit Tests

### F.I.R.S.T. Principles
```javascript
// Fast — Tests run quickly
// Independent — No test depends on another
// Repeatable — Same result every time
// Self-validating — Boolean outcome (pass/fail)
// Timely — Written before or with production code
```

### One Assert Per Test (Conceptually)
```javascript
// ❌ Bad — Testing multiple behaviors
test('user creation', () => {
  const user = createUser({ name: 'John', email: 'john@test.com' })
  expect(user.id).toBeDefined()
  expect(user.name).toBe('John')
  expect(user.email).toBe('john@test.com')
  expect(user.createdAt).toBeDefined()
  expect(sendWelcomeEmail).toHaveBeenCalled()
})

// ✅ Good — Single behavior per test
describe('createUser', () => {
  test('generates unique id', () => {
    const user = createUser({ name: 'John', email: 'john@test.com' })
    expect(user.id).toBeDefined()
  })

  test('normalizes email to lowercase', () => {
    const user = createUser({ name: 'John', email: 'JOHN@TEST.COM' })
    expect(user.email).toBe('john@test.com')
  })

  test('sends welcome email', () => {
    createUser({ name: 'John', email: 'john@test.com' })
    expect(sendWelcomeEmail).toHaveBeenCalledWith('john@test.com')
  })
})
```

### Arrange-Act-Assert Pattern
```javascript
test('should apply discount for orders over $100', () => {
  // Arrange
  const order = new Order([
    { product: 'Widget', price: 60 },
    { product: 'Gadget', price: 50 }
  ])
  const discountService = new DiscountService()

  // Act
  const discountedOrder = discountService.apply(order)

  // Assert
  expect(discountedOrder.total).toBe(99) // 110 - 10% discount
})
```

### Test Names Describe Behavior
```javascript
// ❌ Bad — Vague names
test('test1', () => { })
test('user test', () => { })
test('should work', () => { })

// ✅ Good — Behavior-driven names
test('returns empty array when no users match criteria', () => { })
test('throws ValidationError when email is invalid', () => { })
test('applies 10% discount for orders over $100', () => { })
```

### Test Boundary Conditions
```javascript
describe('paginate', () => {
  test('returns first page by default', () => { })
  test('returns empty array for page beyond total', () => { })
  test('handles page size of 1', () => { })
  test('handles single item in collection', () => { })
  test('handles empty collection', () => { })
  test('throws for negative page number', () => { })
  test('throws for zero page size', () => { })
})
```

---

## 9. Classes

### Single Responsibility Principle (SRP)
```javascript
// ❌ Bad — Multiple responsibilities
class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  save() {
    // Database logic
  }

  sendEmail(message) {
    // Email logic
  }

  generateReport() {
    // Reporting logic
  }
}

// ✅ Good — Single responsibility each
class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }
}

class UserRepository {
  save(user) { }
  find(id) { }
}

class EmailService {
  send(to, message) { }
}

class UserReportGenerator {
  generate(user) { }
}
```

### Open/Closed Principle (OCP)
```javascript
// ❌ Bad — Must modify class to add new discount type
class DiscountCalculator {
  calculate(order, discountType) {
    if (discountType === 'percentage') {
      return order.total * 0.1
    } else if (discountType === 'fixed') {
      return 10
    } else if (discountType === 'bogo') {
      // ... new code for each type
    }
  }
}

// ✅ Good — Open for extension, closed for modification
class DiscountStrategy {
  calculate(order) {
    throw new Error('Must implement calculate')
  }
}

class PercentageDiscount extends DiscountStrategy {
  constructor(percentage) {
    super()
    this.percentage = percentage
  }

  calculate(order) {
    return order.total * this.percentage
  }
}

class FixedDiscount extends DiscountStrategy {
  constructor(amount) {
    super()
    this.amount = amount
  }

  calculate(order) {
    return Math.min(this.amount, order.total)
  }
}

class DiscountCalculator {
  calculate(order, strategy) {
    return strategy.calculate(order)
  }
}
```

### Liskov Substitution Principle (LSP)
```javascript
// ❌ Bad — Square breaks Rectangle contract
class Rectangle {
  setWidth(width) { this.width = width }
  setHeight(height) { this.height = height }
  getArea() { return this.width * this.height }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width
    this.height = width // Breaks expectation!
  }
}

// ✅ Good — Separate abstractions
class Shape {
  getArea() { throw new Error('Must implement') }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }
  getArea() { return this.width * this.height }
}

class Square extends Shape {
  constructor(side) {
    super()
    this.side = side
  }
  getArea() { return this.side * this.side }
}
```

### Interface Segregation Principle (ISP)
```javascript
// ❌ Bad — Fat interface
class Worker {
  work() { }
  eat() { }
  sleep() { }
}

class Robot extends Worker {
  work() { /* OK */ }
  eat() { throw new Error('Robots do not eat') } // Forced to implement
  sleep() { throw new Error('Robots do not sleep') }
}

// ✅ Good — Segregated interfaces (using composition)
const Workable = {
  work() { }
}

const Eatable = {
  eat() { }
}

const Sleepable = {
  sleep() { }
}

class Human {
  work() { }
  eat() { }
  sleep() { }
}

class Robot {
  work() { }
  // Only implements what it needs
}
```

### Dependency Inversion Principle (DIP)
```javascript
// ❌ Bad — High-level depends on low-level
class UserService {
  constructor() {
    this.database = new MySQLDatabase() // Tight coupling
  }

  getUser(id) {
    return this.database.query(`SELECT * FROM users WHERE id = ${id}`)
  }
}

// ✅ Good — Both depend on abstraction
class UserRepository {
  constructor(database) {
    this.database = database // Injected dependency
  }

  findById(id) {
    return this.database.query('users', { id })
  }
}

// Can inject any implementation
const mysqlRepo = new UserRepository(new MySQLDatabase())
const mongoRepo = new UserRepository(new MongoDatabase())
const mockRepo = new UserRepository(new InMemoryDatabase())
```

### Keep Classes Small
```javascript
// A class should have:
// - One responsibility
// - ~100-200 lines max
// - 5-10 public methods max
// - High cohesion (all methods use most instance variables)
```

---

## 10. Code Smells & Refactoring

### Long Method → Extract Method
```javascript
// ❌ Smell
function printReport(data) {
  // 50 lines of header formatting
  // 100 lines of body generation
  // 30 lines of footer formatting
}

// ✅ Refactored
function printReport(data) {
  printHeader(data)
  printBody(data)
  printFooter(data)
}
```

### Long Parameter List → Parameter Object
```javascript
// ❌ Smell
function createEvent(name, date, location, organizer, capacity, price, category) { }

// ✅ Refactored
function createEvent(eventDetails) {
  const { name, date, location, organizer, capacity, price, category } = eventDetails
}
```

### Duplicate Code → Extract Function/Class
```javascript
// Look for copy-paste patterns
// Extract to shared utility or base class
```

### Feature Envy → Move Method
```javascript
// ❌ Smell — Method uses other object's data more than its own
class Order {
  getDiscountedTotal(customer) {
    if (customer.loyaltyPoints > 1000) {
      return this.total * 0.9
    }
    if (customer.memberSince < new Date('2020-01-01')) {
      return this.total * 0.95
    }
    return this.total
  }
}

// ✅ Refactored — Move to where data lives
class Customer {
  getDiscount() {
    if (this.loyaltyPoints > 1000) return 0.1
    if (this.memberSince < new Date('2020-01-01')) return 0.05
    return 0
  }
}

class Order {
  getDiscountedTotal(customer) {
    return this.total * (1 - customer.getDiscount())
  }
}
```

### Primitive Obsession → Value Objects
```javascript
// ❌ Smell — Primitives with implicit rules
function createUser(email, phone) {
  if (!email.includes('@')) throw new Error('Invalid email')
  if (phone.length !== 10) throw new Error('Invalid phone')
}

// ✅ Refactored — Value objects encapsulate rules
class Email {
  constructor(value) {
    if (!value.includes('@')) {
      throw new ValidationError('Invalid email format')
    }
    this.value = value.toLowerCase()
  }

  toString() {
    return this.value
  }
}

class PhoneNumber {
  constructor(value) {
    const digits = value.replace(/\D/g, '')
    if (digits.length !== 10) {
      throw new ValidationError('Phone number must have 10 digits')
    }
    this.value = digits
  }
}
```

### Switch Statements → Polymorphism
```javascript
// ❌ Smell
function calculatePay(employee) {
  switch (employee.type) {
    case 'hourly':
      return employee.hours * employee.rate
    case 'salaried':
      return employee.salary / 12
    case 'commissioned':
      return employee.basePay + employee.sales * employee.commission
  }
}

// ✅ Refactored — Strategy pattern
class HourlyEmployee {
  calculatePay() {
    return this.hours * this.rate
  }
}

class SalariedEmployee {
  calculatePay() {
    return this.salary / 12
  }
}

class CommissionedEmployee {
  calculatePay() {
    return this.basePay + this.sales * this.commission
  }
}
```

---

## 11. Concurrency

### Keep Synchronized Sections Small
```javascript
// ❌ Bad — Large critical section
async function processOrders(orders) {
  await mutex.acquire()
  try {
    for (const order of orders) {
      await validateOrder(order)
      await calculateTotal(order)
      await applyDiscount(order)
      await saveOrder(order)
    }
  } finally {
    mutex.release()
  }
}

// ✅ Good — Minimal locking
async function processOrders(orders) {
  const processedOrders = await Promise.all(
    orders.map(async (order) => {
      await validateOrder(order)
      await calculateTotal(order)
      await applyDiscount(order)
      return order
    })
  )

  await mutex.acquire()
  try {
    await saveOrders(processedOrders) // Only lock for shared resource
  } finally {
    mutex.release()
  }
}
```

### Avoid Shared State
```javascript
// ❌ Bad — Shared mutable state
let counter = 0

async function incrementCounter() {
  counter++ // Race condition!
}

// ✅ Good — Immutable or contained state
class Counter {
  #value = 0
  #mutex = new Mutex()

  async increment() {
    await this.#mutex.acquire()
    try {
      this.#value++
      return this.#value
    } finally {
      this.#mutex.release()
    }
  }
}
```

---

## 12. Emergent Design

### Run All Tests
```javascript
// Tests enable refactoring
// Without tests, you can't safely improve code
// High test coverage = freedom to change
```

### Refactor Continuously
```javascript
// After tests pass:
// 1. Look for duplication
// 2. Improve names
// 3. Extract methods/classes
// 4. Apply patterns where appropriate
// 5. Run tests again
```

### Remove Duplication
```javascript
// The Rule of Three:
// 1st occurrence: Write it
// 2nd occurrence: Note it
// 3rd occurrence: Refactor it
```

### Express Intent
```javascript
// Code should read like well-written prose
// A developer should understand what code does at a glance
// If you need to add a comment, consider renaming instead
```

---

## Golden Rules

1. **Leave code cleaner than you found it** — Boy Scout Rule
2. **Make it work, make it right, make it fast** — In that order
3. **Premature optimization is the root of all evil** — Profile first
4. **Simple beats clever** — Explicit > implicit
5. **Consistency over personal preference** — Follow team conventions
6. **Tests are documentation** — They show how code should be used
7. **Delete dead code** — Version control remembers
8. **One level of abstraction per function** — No mixing
9. **Functions should do one thing** — And do it well
10. **Names should reveal intent** — No mental gymnastics required

---

## Quick Reference

### Before Committing, Ask:
- [ ] Can someone understand this code without explanation?
- [ ] Are names descriptive and consistent?
- [ ] Are functions short and focused?
- [ ] Is there any duplication?
- [ ] Are edge cases handled?
- [ ] Are there tests for this code?
- [ ] Would I be proud to show this code?

### Red Flags:
- Comment explaining what code does (not why)
- Function over 20 lines
- More than 3 parameters
- Nested callbacks/conditionals > 2 levels
- Magic numbers or strings
- Commented-out code
- Generic names (data, info, item, temp)
- Boolean parameters