CREATE TABLE "USER" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'observer')) NOT NULL,
    tax_group VARCHAR(20) CHECK (tax_group IN ('individual', 'entrepreneur', 'business')) NOT NULL,
    tax_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CATEGORY (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('expense', 'income')) NOT NULL,
    icon TEXT NOT NULL,
    user_id INT REFERENCES "USER"(id) ON DELETE CASCADE
);

CREATE TABLE TRANSACTION (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    category_id INT REFERENCES CATEGORY(id) ON DELETE SET NULL,
    user_id INT REFERENCES "USER"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(10) CHECK (type IN ('expense', 'income')) NOT NULL
);

CREATE TABLE REPORT (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "USER"(id) ON DELETE CASCADE,
    month DATE NOT NULL,
    total_income DECIMAL(12,2) NOT NULL,
    total_expense DECIMAL(12,2) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pdf_url TEXT
);

CREATE TABLE CATEGORY_STATISTICS (
    id SERIAL PRIMARY KEY,
    report_id INT REFERENCES REPORT(id) ON DELETE CASCADE,
    category_id INT REFERENCES CATEGORY(id) ON DELETE SET NULL,
    total DECIMAL(12,2) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('expense', 'income')) NOT NULL
);

CREATE TABLE TAX_REPORT (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "USER"(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_income DECIMAL(12,2) NOT NULL,
    taxable_income DECIMAL(12,2) NOT NULL,
    tax_due DECIMAL(12,2) NOT NULL,
    period_type VARCHAR(10) CHECK (period_type IN ('monthly', 'quarterly', 'yearly')) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pdf_url TEXT
);

CREATE TABLE OBSERVER_PERMISSION (
    id SERIAL PRIMARY KEY,
    admin_id INT REFERENCES "USER"(id) ON DELETE CASCADE,
    observer_id INT REFERENCES "USER"(id) ON DELETE CASCADE,
    category_id INT REFERENCES CATEGORY(id) ON DELETE CASCADE
);
