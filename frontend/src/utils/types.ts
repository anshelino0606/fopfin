export type ChartType = 'bar' | 'pie';

export interface IReport {
		id: string;
		user_id: string;
		month: string;
		total_income: number;
		total_expense: number;
		generated_at: string;
		pdf_url?: string;
}

export type PeriodType = 'monthly' | 'quarterly' | "yearly"

export interface Expense {
		amount: number;
		category: string;
		id: number;
}

export interface Income {
		amount: number;
		category: string;
		id: number;
}

export interface Category {
		name: string;
		isIncome: boolean;
		isExpense: boolean;
		hasTax: boolean;
}

// export interface ITaxReport {
// 		id: string,
// 		user_id: string,
// 		period_start: string;
// 		period_end: string;
// 		total_income: number;
// 		expenses: {
// 				category_id: string;
// 				total: number
// 		}[]
// 		period_type: PeriodType;
// 		generated_at: string
// 		pdf_url?: string;
// }

export interface ExpensesReport {
		id: string,
		user_id: string,
		period_start: string;
		period_end: string;
		expenses: {
				category_id: string;
				total: number
		}[]
		generated_at: string
}

export interface IncomeReport {
		id: string,
		user_id: string,
		period_start: string;
		period_end: string;
		incomes: {
				category_id: string;
				total: number
		}[]
		generated_at: string
}

export interface CategoryStatistic {
		id: string;
		report_id: string;
		category_id: string;
		total: number;
		type: 'expense' | 'income';
}

export interface TaxCategoryStatistic {
		id: string;
		tax_report_id: string;
		category_id: string;
		total: number;
		period_start: string;
		period_end: string;
}

