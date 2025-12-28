# **App Name**: expenseIQ

## Core Features:

- User Registration: Register with email and password.
- User Authentication: Secure login and logout.
- Password Recovery: Password recovery flow.
- Profile Management: Manage name, default currency, and monthly budget.
- Manual Expense Entry: Record expenses with date, amount, type, category, payment method, and description.
- Expense Actions: Edit, delete, tag (personal/reimbursable), and attach receipts (image/PDF).
- OCR Receipt Recognition: AI-powered tool to extract data (RUC, business name, date, total, tax) from receipts and auto-fill expense forms with optional SUNAT validation.
- Categorization: Predefined categories (food, transport, etc.) with CRUD for user-defined categories and custom icons/colors.
- Dashboards and Analytics: KPIs (monthly total, daily average, top category) with charts (pie, bar/line) and filters (date range, category, payment method).
- Budgets and Alerts: Configuration of global and category-specific budgets with notifications at 80% and 100% and visual indicators.
- Payment Methods: Management of payment types (cash, debit, credit, digital wallets).
- Reports and Export: Generate and export reports (daily, monthly, by category) in PDF and Excel formats.
- Period Management: Lock editing for closed months with a global filter for selecting the working month/year.
- History and Audit: Log changes (date, altered field) with a visual indicator in the expense detail.
- Notifications: In-app and email notifications for budget exhaustion, OCR failures, and suspected duplicate expenses.
- Predictive Classification: AI-powered expense categorization.
- Expense Projection: AI-powered projection of end-of-month expenses.
- External Integration: Validation of RUC and business name using SUNAT/OSE APIs.

## Style Guidelines:

- Primary color (Buttons principales, Marca, FAB): #D50000 (Rojo Intenso) in light mode, #FF5252 (Rojo Coral - más legible) in dark mode.
- On Primary (Texto dentro de botones rojos): #FFFFFF (Blanco) in light mode, #000000 (Negro) in dark mode.
- Secondary (Elementos de soporte, iconos inactivos): #212121 (Negro Carbón) in light mode, #E0E0E0 (Gris Perla) in dark mode.
- Background (Fondo general de las pantallas): #F5F5F5 (Gris Muy Claro) in light mode, #000000 (Negro Puro) in dark mode.
- Surface (Tarjetas (Cards), Modales, Menús): #FFFFFF (Blanco Puro) in light mode, #121212 (Gris muy oscuro) in dark mode.
- Error (Alertas críticas, Presupuesto excedido): #B00020 (Rojo Sangre) in light mode, #CF6679 (Rosado Rojizo) in dark mode.
- Text Primary (Títulos, Montos principales): #000000 (Negro) in light mode, #FFFFFF (Blanco) in dark mode.
- Text Secondary (Subtítulos, Fechas): #757575 (Gris) in light mode, #B3B3B3 (Gris Plata) in dark mode.
- Mobile-first and responsive design.
- Immediate feedback (toasts, spinners, skeleton screens).
- Minimalist layout centered on screen.
- Pure black background.