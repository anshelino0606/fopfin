import {FC, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

import {BarChartComponent as BarChart, PieChartComponent as PieChart} from "../components";
import {ChartType} from "../types.ts";


const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	height: 100vh;
	background: #e3f2fd;
	justify-content: center;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 16px;
	gap: 12px;
`;

const BackButton = styled.button`
	padding: 12px 8px;
	background: none;
	border: none;
	font-family: "SF Pro", sans-serif;
	font-weight: 590;
	font-size: 16px;
	color: #1b1d1f;
	display: flex;
	align-items: center;
	white-space: nowrap;
	align-self: start;
`;

const HeaderTitle = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
`;

const ChartsWrapper = styled.div`

`;

const StatisticsTitle = styled.div`
	width: 288px;
	height: 56px;
	border: 3px solid #5fa8d3;
	border-radius: 12px;
	background: #fff;
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
	font-size: 24px;
	line-height: 100%;
	color: #1b1d1f;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const MainContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	background: #e3f2fd;
	row-gap: 12px;
	padding: 16px;
	min-height: calc(100vh - 150px - 100px);
`;

const BottomNavigation = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 12px;
	background: #e3f2fd;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	max-width: 428px;
	margin: 0 auto;
`;

const NavIcon = styled.button<{ active?: boolean }>`
	width: 76px;
	height: 76px;
	border: 2px solid #5fa8d3;
	border-radius: 24px;
	background: ${props => props.active ? '#5fa8d3' : '#fff'};
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	padding: 0;

	img {
		width: 40px;
		height: 40px;
		object-fit: contain;
	}
`;

export const StatisticsPage: FC = () => {
		const navigate = useNavigate();
		const handleBack = () => navigate(-1);

		const [chartType, setChartType] = useState<ChartType | undefined>(undefined);

		return (
				<PageContainer>
						<Header>
								<BackButton onClick={handleBack}>
										← Назад
								</BackButton>
								<HeaderTitle>
										<StatisticsTitle>
												Статистика
										</StatisticsTitle>
								</HeaderTitle>
						</Header>

						<MainContent>

								<button onClick={()=>setChartType('pie')}>Pie</button>
								<button onClick={()=>setChartType('bar')}>Bar</button>

								{chartType && <ChartsWrapper>
										{chartType === 'bar' ? <BarChart/> : <PieChart/>}
                </ChartsWrapper>}


								<button onClick={()=> console.log('downloading pdf from backend')}>Download PDF</button>
						</MainContent>

						<BottomNavigation>
								<NavIcon onClick={() => navigate('/expenses')}>
										<img src="/icons/expenses.png" alt="Витрати"/>
								</NavIcon>
								<NavIcon onClick={() => navigate('/income')}>
										<img src="/icons/income.png" alt="Надходження"/>
								</NavIcon>
								<NavIcon active>
										<img src="/icons/statistics.png" alt="Статистика"/>
								</NavIcon>
								<NavIcon onClick={() => navigate('/settings')}>
										<img src="/icons/settings.png" alt="Налаштування"/>
								</NavIcon>
						</BottomNavigation>
				</PageContainer>
		);
};