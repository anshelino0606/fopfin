import {FC} from "react";
import styled from "styled-components";

import NavButton from "../../components/NavButton";


const MainContent = styled.div`
	flex: 1;
	background: ${props => props.theme.mode === 'dark' ? 'var(--background-dark)' : 'var(--background-light)'};
	padding: 16px;
	display: flex;
	flex-direction: column;
	row-gap: 24px;
	min-height: calc(100vh - 124px - 88px);
	overflow: hidden;
	overflow-y: scroll;
}`;

const Title = styled.h2`
	margin: 0;
`;

export const StatisticsMenuPage: FC = () => {
		return (
				<MainContent>
						<Title>На цій сторінці Ви можете обрати та переглянути звітність по своїх коштах</Title>

						<NavButton label="Звіт з витрат" link="expense-report"/>
						<NavButton label="Звіт з надходжень" link="income-report"/>
						<NavButton label="Податковий звіт" link="tax-report"/>
				</MainContent>
		);
};