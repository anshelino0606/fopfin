import styled from "styled-components";
import React, {FC, useState} from "react";
import {BarChart, PieChart} from "@mui/x-charts";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";

import {ChartType, IncomeReport} from "../../utils/types";
import {mockedIncomeStatistics, incomeCategories} from "../../utils/mocks";
import {CategoryDropdown} from "../../components/CategoryDropdown";
import {DateFilters} from "../../components/DateFilters";


const MainContent = styled.div`
	flex: 1;
	max-height: calc(100vh - 124px - 88px);
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	padding: 16px;
	row-gap: 12px;
`;

const Title = styled.h2`
	font-size: 24px;
`;

const Filters = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const ChartSwitcher = styled.div`
	display: flex;
	gap: 12px;
`;

const ChartSwitchButton = styled.button`
	border-radius: 8px;
	padding: 6px 12px;
	background: #fff;
	border: 2px solid var(--primary-color);
	font-weight: 600;
	font-size: 16px;
	text-align: center;
	color: #000;
	cursor: pointer;
	transition: all 300ms ease-in-out;

	&:hover,
	&.active {
		background: var(--primary-color);
	}
`;

const ChartWrapper = styled.div`
	height: 400px;
`;

const DownloadButton = styled.button`
	border: 3px solid var(--primary-color);
	font-size: 16px;
	border-radius: 8px;
	padding: 8px 12px;
	font-weight: 600;
	font-style: italic;
	transition: all 300ms ease-in-out;
	cursor: pointer;

	&:hover {
		background: var(--primary-color);
	}
`;

export const IncomeStatisticPage: FC = () => {
		const [incomeReport] = useState<IncomeReport[]>(mockedIncomeStatistics);
		const [chartType, setChartType] = useState<ChartType>("bar");
		const [startDate, setStartDate] = useState<string | null>(null);
		const [endDate, setEndDate] = useState<string | null>(null);
		const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

		const filteredIncomes = incomeReport.flatMap((entry) => {
				const reportDate = new Date(entry.period_start);
				const matchesDate =
						(!startDate || reportDate >= new Date(startDate)) &&
						(!endDate || reportDate <= new Date(endDate));

				if (!matchesDate) return [];

				return entry.incomes.filter(
						(inc) =>
								selectedCategories.length === 0 ||
								selectedCategories.includes(inc.category_id),
				);
		});

		const pieData = incomeCategories.map((category, index) => {
				const total = filteredIncomes
						.filter((item) => item.category_id === category)
						.reduce((sum, item) => sum + item.total, 0);
				return {id: index, value: total, label: category};
		});

		const barData = [
				{
						data: incomeCategories.map((category) =>
								filteredIncomes
										.filter((item) => item.category_id === category)
										.reduce((sum, item) => sum + item.total, 0),
						),
						label: "Доходи",
				},
		];

		const downloadPDF = () => {
				const chartWrapper = document.getElementById("chart-wrapper");

				if (chartWrapper) {
						html2canvas(chartWrapper).then((canvas) => {
								const imgData = canvas.toDataURL("image/png");

								const doc = new jsPDF();
								doc.addImage(imgData, "PNG", 10, 10, 180, 160);
								doc.save("income-statistics.pdf");
						});
				}
		};

		return (
				<MainContent>
						<Title>Звіт по доходах</Title>

						<Filters>
								<DateFilters
										startDate={startDate}
										endDate={endDate}
										setStartDate={setStartDate}
										setEndDate={setEndDate}
								/>
								<CategoryDropdown
										selectedCategories={selectedCategories}
										setSelectedCategories={setSelectedCategories}
										categoryType="income"
								/>
						</Filters>

						<h3>Оберіть вигляд діаграми</h3>
						<ChartSwitcher>
								<ChartSwitchButton
										className={chartType === "bar" ? "active" : undefined}
										onClick={() => setChartType("bar")}
								>
										Стовпчикова
								</ChartSwitchButton>
								<ChartSwitchButton
										className={chartType === "pie" ? "active" : undefined}
										onClick={() => setChartType("pie")}
								>
										Кругова
								</ChartSwitchButton>
						</ChartSwitcher>

						<ChartWrapper id="chart-wrapper">
								{chartType === "bar" ? (
										<BarChart
												xAxis={[
														{
																scaleType: "band",
																data: incomeCategories,
																tickLabelStyle: {
																		angle: -90,
																		textAnchor: "end",
																		dominantBaseline: "central",
																		fontSize: 12,
																},
														},
												]}
												height={400}
												margin={{bottom: 140}}
												slotProps={{legend: {hidden: true}}}
												series={barData}
										/>
								) : (
										<PieChart
												series={[
														{
																data: pieData,
																highlightScope: {fade: "global", highlight: "item"},
														},
												]}
												slotProps={{
														legend: {
																direction: "row",
																position: {vertical: "top", horizontal: "middle"},
														},
												}}
												margin={{top: 100}}
										/>
								)}
						</ChartWrapper>

						<DownloadButton onClick={downloadPDF}>Завантажити PDF</DownloadButton>
				</MainContent>
		);
};
