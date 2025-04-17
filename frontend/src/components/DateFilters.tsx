import React, {Dispatch, FC, SetStateAction} from "react";
import styled from "styled-components";


const FilterGroup = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 8px;
`;

const Filter = styled.div`
	display: flex;
	width: 70%;
	justify-content: space-between;
`;

const Label = styled.label`
	font-weight: 500;
`;

interface DateFiltersProps {
		startDate: string | null;
		endDate: string | null;
		setStartDate: Dispatch<SetStateAction<string | null>>;
		setEndDate: Dispatch<SetStateAction<string | null>>;
}

export const DateFilters: FC<DateFiltersProps> = ({startDate, endDate, setStartDate, setEndDate}) => {

		return (
				<FilterGroup>
						<Filter>
								<Label htmlFor="start-date">Початкова дата:</Label>
								<input
										id="start-date"
										type="date"
										value={startDate ?? ""}
										onChange={(e) => setStartDate(e.target.value)}
								/>
						</Filter>

						<Filter>
								<Label htmlFor="end-date">Кінцева дата:</Label>
								<input
										id="end-date"
										type="date"
										value={endDate ?? ""}
										onChange={(e) => setEndDate(e.target.value)}
								/>
						</Filter>

				</FilterGroup>
		);
};