import {Category, ExpensesReport, IncomeReport, TaxCategoryStatistic} from "./types";


export const defaultCategories: Category[] = [
		{name: 'Зарплата', isIncome: true, isExpense: false, hasTax: true},
		{name: 'Подарунки', isIncome: true, isExpense: false, hasTax: false},
		{name: 'Підробіток', isIncome: true, isExpense: false, hasTax: true},
		{name: 'Продукти', isIncome: false, isExpense: true, hasTax: false},
		{name: 'Пальне', isIncome: false, isExpense: true, hasTax: false},
		{name: 'Алкоголь і сигарети', isIncome: false, isExpense: true, hasTax: false},
		{name: 'Обслуговування авто', isIncome: false, isExpense: true, hasTax: false},
		{name: 'Оренда житла', isIncome: false, isExpense: true, hasTax: false},
		{name: 'Комунальні послуги', isIncome: false, isExpense: true, hasTax: false},
		{name: "Зв'язок", isIncome: false, isExpense: true, hasTax: false},
		{name: 'Подарунки', isIncome: false, isExpense: true, hasTax: false},
		{name: 'Заощадження', isIncome: false, isExpense: true, hasTax: false},
		{name: 'Кафе та ресторани', isIncome: false, isExpense: true, hasTax: false},
		{name: "Здоров'я", isIncome: false, isExpense: true, hasTax: false},
];

export const incomeCategories: string[] = [
		'Зарплата',
		'Подарунки',
		'Підробіток',
];

export const expenseCategories: string[] = [
		'Продукти',
		'Пальне',
		'Алкоголь і сигарети',
		'Обслуговування авто',
		'Оренда житла',
		'Комунальні послуги',
		'Зв\'язок',
		'Подарунки',
		'Заощадження',
		'Кафе та ресторани',
		'Здоров\'я',
];

export const mockedTaxCategoryStatistics: TaxCategoryStatistic[] = [
		{ id: '1', tax_report_id: 'r1', category_id: 'Продукти', total: 1050, period_start: '2025-01-01', period_end: '2025-01-31' },
		{ id: '2', tax_report_id: 'r1', category_id: 'Пальне', total: 320, period_start: '2025-01-01', period_end: '2025-01-31' },
		{ id: '3', tax_report_id: 'r1', category_id: 'Комунальні послуги', total: 870, period_start: '2025-01-01', period_end: '2025-01-31' },

		{ id: '4', tax_report_id: 'r2', category_id: 'Оренда житла', total: 3000, period_start: '2025-02-01', period_end: '2025-02-28' },
		{ id: '5', tax_report_id: 'r2', category_id: 'Заощадження', total: 950, period_start: '2025-02-01', period_end: '2025-02-28' },
		{ id: '6', tax_report_id: 'r2', category_id: 'Кафе та ресторани', total: 620, period_start: '2025-02-01', period_end: '2025-02-28' },

		{ id: '7', tax_report_id: 'r3', category_id: 'Продукти', total: 980, period_start: '2025-03-01', period_end: '2025-03-31' },
		{ id: '8', tax_report_id: 'r3', category_id: 'Пальне', total: 410, period_start: '2025-03-01', period_end: '2025-03-31' },
		{ id: '9', tax_report_id: 'r3', category_id: 'Обслуговування авто', total: 850, period_start: '2025-03-01', period_end: '2025-03-31' },

		{ id: '10', tax_report_id: 'r4', category_id: 'Здоров\'я', total: 720, period_start: '2025-04-01', period_end: '2025-04-30' },
		{ id: '11', tax_report_id: 'r4', category_id: 'Зв\'язок', total: 160, period_start: '2025-04-01', period_end: '2025-04-30' },
		{ id: '12', tax_report_id: 'r4', category_id: 'Продукти', total: 990, period_start: '2025-04-01', period_end: '2025-04-30' },

		{ id: '13', tax_report_id: 'r5', category_id: 'Оренда житла', total: 3000, period_start: '2025-05-01', period_end: '2025-05-31' },
		{ id: '14', tax_report_id: 'r5', category_id: 'Комунальні послуги', total: 890, period_start: '2025-05-01', period_end: '2025-05-31' },
		{ id: '15', tax_report_id: 'r5', category_id: 'Пальне', total: 380, period_start: '2025-05-01', period_end: '2025-05-31' },

		{ id: '16', tax_report_id: 'r6', category_id: 'Продукти', total: 1020, period_start: '2025-06-01', period_end: '2025-06-30' },
		{ id: '17', tax_report_id: 'r6', category_id: 'Кафе та ресторани', total: 710, period_start: '2025-06-01', period_end: '2025-06-30' },
		{ id: '18', tax_report_id: 'r6', category_id: 'Заощадження', total: 1100, period_start: '2025-06-01', period_end: '2025-06-30' },

		{ id: '19', tax_report_id: 'r7', category_id: 'Здоров\'я', total: 870, period_start: '2025-07-01', period_end: '2025-07-31' },
		{ id: '20', tax_report_id: 'r7', category_id: 'Зв\'язок', total: 140, period_start: '2025-07-01', period_end: '2025-07-31' },
		{ id: '21', tax_report_id: 'r7', category_id: 'Подарунки', total: 500, period_start: '2025-07-01', period_end: '2025-07-31' },

		{ id: '22', tax_report_id: 'r8', category_id: 'Продукти', total: 1080, period_start: '2025-08-01', period_end: '2025-08-31' },
		{ id: '23', tax_report_id: 'r8', category_id: 'Пальне', total: 400, period_start: '2025-08-01', period_end: '2025-08-31' },
		{ id: '24', tax_report_id: 'r8', category_id: 'Кафе та ресторани', total: 670, period_start: '2025-08-01', period_end: '2025-08-31' },

		{ id: '25', tax_report_id: 'r9', category_id: 'Обслуговування авто', total: 940, period_start: '2025-09-01', period_end: '2025-09-30' },
		{ id: '26', tax_report_id: 'r9', category_id: 'Комунальні послуги', total: 920, period_start: '2025-09-01', period_end: '2025-09-30' },
		{ id: '27', tax_report_id: 'r9', category_id: 'Зв\'язок', total: 155, period_start: '2025-09-01', period_end: '2025-09-30' },

		{ id: '28', tax_report_id: 'r10', category_id: 'Оренда житла', total: 3000, period_start: '2025-10-01', period_end: '2025-10-31' },
		{ id: '29', tax_report_id: 'r10', category_id: 'Подарунки', total: 450, period_start: '2025-10-01', period_end: '2025-10-31' },
		{ id: '30', tax_report_id: 'r10', category_id: 'Заощадження', total: 1200, period_start: '2025-10-01', period_end: '2025-10-31' },

		{ id: '31', tax_report_id: 'r11', category_id: 'Продукти', total: 1120, period_start: '2025-11-01', period_end: '2025-11-30' },
		{ id: '32', tax_report_id: 'r11', category_id: 'Пальне', total: 410, period_start: '2025-11-01', period_end: '2025-11-30' },
		{ id: '33', tax_report_id: 'r11', category_id: 'Комунальні послуги', total: 880, period_start: '2025-11-01', period_end: '2025-11-30' },

		{ id: '34', tax_report_id: 'r12', category_id: 'Обслуговування авто', total: 990, period_start: '2025-12-01', period_end: '2025-12-31' },
		{ id: '35', tax_report_id: 'r12', category_id: 'Кафе та ресторани', total: 730, period_start: '2025-12-01', period_end: '2025-12-31' },
		{ id: '36', tax_report_id: 'r12', category_id: 'Здоров\'я', total: 900, period_start: '2025-12-01', period_end: '2025-12-31' },
];

export const mockedExpensesStatistics: ExpensesReport[] = [
		{
				id: 'e1',
				user_id: 'u1',
				period_start: '2025-01-01',
				period_end: '2025-01-31',
				generated_at: '2025-01-31T23:59:59Z',
				expenses: [
						{ category_id: 'Продукти', total: 1200 },
						{ category_id: 'Пальне', total: 500 },
						{ category_id: 'Комунальні послуги', total: 800 },
				],
		},
		{
				id: 'e2',
				user_id: 'u1',
				period_start: '2025-02-01',
				period_end: '2025-02-28',
				generated_at: '2025-02-28T23:59:59Z',
				expenses: [
						{ category_id: 'Продукти', total: 1150 },
						{ category_id: 'Здоров\'я', total: 300 },
						{ category_id: 'Подарунки', total: 250 },
				],
		},
		{
				id: 'e3',
				user_id: 'u1',
				period_start: '2025-03-01',
				period_end: '2025-03-31',
				generated_at: '2025-03-31T23:59:59Z',
				expenses: [
						{ category_id: 'Оренда житла', total: 3000 },
						{ category_id: 'Кафе та ресторани', total: 700 },
				],
		},
		{
				id: 'e4',
				user_id: 'u1',
				period_start: '2025-04-01',
				period_end: '2025-04-30',
				generated_at: '2025-04-30T23:59:59Z',
				expenses: [
						{ category_id: 'Зв\'язок', total: 150 },
						{ category_id: 'Пальне', total: 600 },
				],
		},
		{
				id: 'e5',
				user_id: 'u1',
				period_start: '2025-05-01',
				period_end: '2025-05-31',
				generated_at: '2025-05-31T23:59:59Z',
				expenses: [
						{ category_id: 'Заощадження', total: 900 },
						{ category_id: 'Комунальні послуги', total: 850 },
				],
		},
		{
				id: 'e6',
				user_id: 'u1',
				period_start: '2025-06-01',
				period_end: '2025-06-30',
				generated_at: '2025-06-30T23:59:59Z',
				expenses: [
						{ category_id: 'Продукти', total: 1000 },
						{ category_id: 'Обслуговування авто', total: 400 },
				],
		},
		{
				id: 'e7',
				user_id: 'u1',
				period_start: '2025-07-01',
				period_end: '2025-07-31',
				generated_at: '2025-07-31T23:59:59Z',
				expenses: [
						{ category_id: 'Здоров\'я', total: 600 },
						{ category_id: 'Подарунки', total: 300 },
				],
		},
		{
				id: 'e8',
				user_id: 'u1',
				period_start: '2025-08-01',
				period_end: '2025-08-31',
				generated_at: '2025-08-31T23:59:59Z',
				expenses: [
						{ category_id: 'Кафе та ресторани', total: 400 },
						{ category_id: 'Пальне', total: 550 },
				],
		},
		{
				id: 'e9',
				user_id: 'u1',
				period_start: '2025-09-01',
				period_end: '2025-09-30',
				generated_at: '2025-09-30T23:59:59Z',
				expenses: [
						{ category_id: 'Оренда житла', total: 3100 },
						{ category_id: 'Заощадження', total: 1100 },
				],
		},
		{
				id: 'e10',
				user_id: 'u1',
				period_start: '2025-10-01',
				period_end: '2025-10-31',
				generated_at: '2025-10-31T23:59:59Z',
				expenses: [
						{ category_id: 'Комунальні послуги', total: 780 },
						{ category_id: 'Зв\'язок', total: 200 },
				],
		},
		{
				id: 'e11',
				user_id: 'u1',
				period_start: '2025-11-01',
				period_end: '2025-11-30',
				generated_at: '2025-11-30T23:59:59Z',
				expenses: [
						{ category_id: 'Продукти', total: 1250 },
						{ category_id: 'Здоров\'я', total: 500 },
				],
		},
		{
				id: 'e12',
				user_id: 'u1',
				period_start: '2025-12-01',
				period_end: '2025-12-31',
				generated_at: '2025-12-31T23:59:59Z',
				expenses: [
						{ category_id: 'Подарунки', total: 900 },
						{ category_id: 'Пальне', total: 450 },
				],
		},
];

export const mockedIncomeStatistics: IncomeReport[] = [
		{
				id: "1",
				user_id: "user1",
				period_start: "2025-01-01",
				period_end: "2025-01-31",
				incomes: [
						{ category_id: "Зарплата", total: 1500 },
						{ category_id: "Подарунки", total: 300 },
						{ category_id: "Підробіток", total: 500 },
				],
				generated_at: "2025-01-31",
		},
		{
				id: "2",
				user_id: "user1",
				period_start: "2025-02-01",
				period_end: "2025-02-28",
				incomes: [
						{ category_id: "Зарплата", total: 1600 },
						{ category_id: "Подарунки", total: 250 },
						{ category_id: "Підробіток", total: 550 },
				],
				generated_at: "2025-02-28",
		},
		{
				id: "3",
				user_id: "user1",
				period_start: "2025-03-01",
				period_end: "2025-03-31",
				incomes: [
						{ category_id: "Зарплата", total: 1700 },
						{ category_id: "Подарунки", total: 200 },
						{ category_id: "Підробіток", total: 600 },
				],
				generated_at: "2025-03-31",
		},
		{
				id: "4",
				user_id: "user1",
				period_start: "2025-04-01",
				period_end: "2025-04-30",
				incomes: [
						{ category_id: "Зарплата", total: 1800 },
						{ category_id: "Подарунки", total: 280 },
						{ category_id: "Підробіток", total: 650 },
				],
				generated_at: "2025-04-30",
		},
		{
				id: "5",
				user_id: "user1",
				period_start: "2025-05-01",
				period_end: "2025-05-31",
				incomes: [
						{ category_id: "Зарплата", total: 1850 },
						{ category_id: "Подарунки", total: 300 },
						{ category_id: "Підробіток", total: 700 },
				],
				generated_at: "2025-05-31",
		},
		{
				id: "6",
				user_id: "user1",
				period_start: "2025-06-01",
				period_end: "2025-06-30",
				incomes: [
						{ category_id: "Зарплата", total: 1900 },
						{ category_id: "Подарунки", total: 320 },
						{ category_id: "Підробіток", total: 750 },
				],
				generated_at: "2025-06-30",
		},
		{
				id: "7",
				user_id: "user1",
				period_start: "2025-07-01",
				period_end: "2025-07-31",
				incomes: [
						{ category_id: "Зарплата", total: 2000 },
						{ category_id: "Подарунки", total: 350 },
						{ category_id: "Підробіток", total: 800 },
				],
				generated_at: "2025-07-31",
		},
		{
				id: "8",
				user_id: "user1",
				period_start: "2025-08-01",
				period_end: "2025-08-31",
				incomes: [
						{ category_id: "Зарплата", total: 2100 },
						{ category_id: "Подарунки", total: 370 },
						{ category_id: "Підробіток", total: 850 },
				],
				generated_at: "2025-08-31",
		},
		{
				id: "9",
				user_id: "user1",
				period_start: "2025-09-01",
				period_end: "2025-09-30",
				incomes: [
						{ category_id: "Зарплата", total: 2200 },
						{ category_id: "Подарунки", total: 390 },
						{ category_id: "Підробіток", total: 900 },
				],
				generated_at: "2025-09-30",
		},
		{
				id: "10",
				user_id: "user1",
				period_start: "2025-10-01",
				period_end: "2025-10-31",
				incomes: [
						{ category_id: "Зарплата", total: 2300 },
						{ category_id: "Подарунки", total: 400 },
						{ category_id: "Підробіток", total: 950 },
				],
				generated_at: "2025-10-31",
		},
		{
				id: "11",
				user_id: "user1",
				period_start: "2025-11-01",
				period_end: "2025-11-30",
				incomes: [
						{ category_id: "Зарплата", total: 2400 },
						{ category_id: "Подарунки", total: 420 },
						{ category_id: "Підробіток", total: 1000 },
				],
				generated_at: "2025-11-30",
		},
		{
				id: "12",
				user_id: "user1",
				period_start: "2025-12-01",
				period_end: "2025-12-31",
				incomes: [
						{ category_id: "Зарплата", total: 2500 },
						{ category_id: "Подарунки", total: 450 },
						{ category_id: "Підробіток", total: 1050 },
				],
				generated_at: "2025-12-31",
		},
];
