import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {expenseCategories, incomeCategories} from "../utils/mocks";


const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 8px;
`;

const CategoryDropdownContainer = styled.div`
	position: relative;
	display: inline-block;
	width: fit-content;
`;

const DropdownToggle = styled.button`
	background-color: #fff;
	border: 2px solid var(--primary-color);
	padding: 6px 12px;
	cursor: pointer;
	border-radius: 8px;
	text-align: left;
	font-weight: 400;
	font-size: 16px;
	line-height: 150%;
	color: #000;
	transition: all 300ms ease-in-out;

	&:hover {
		background: var(--primary-color);
	}
`;

const CheckboxDropdown = styled.div`
	position: absolute;
	top: 110%;
	left: 0;
	z-index: 100;
	background-color: white;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px 12px;
	max-height: 200px;
	overflow-y: auto;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 200px;
`;

const CheckboxItem = styled.label`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 6px;
`;

const Label = styled.label`
	font-weight: 500;
`;

interface CategoryDropdownProps {
		selectedCategories: string[];
		setSelectedCategories: Dispatch<SetStateAction<string[]>>;
		categoryType: 'expense' | 'income' | 'taxes';
}

export const CategoryDropdown: FC<CategoryDropdownProps> = ({
																																selectedCategories,
																																setSelectedCategories,
																																categoryType,
																														}) => {
		const dropdownRef = useRef<HTMLDivElement>(null);
		const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

		const categories = categoryType !== 'income' ? expenseCategories : incomeCategories;

		useEffect(() => {
				const handleClickOutside = (event: MouseEvent) => {
						if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
								setCategoryDropdownOpen(false);
						}
				};
				document.addEventListener("mousedown", handleClickOutside);

				return () => {
						document.removeEventListener("mousedown", handleClickOutside);
				};
		}, []);


		return (
				<Wrapper>
						<Label>Категорії:</Label>
						<CategoryDropdownContainer ref={dropdownRef}>
								<DropdownToggle onClick={() => setCategoryDropdownOpen((prev) => !prev)}>
										Обрані: {selectedCategories.length || 'Усі'}
								</DropdownToggle>

								{categoryDropdownOpen && (
										<CheckboxDropdown>
												{categories.map((cat) => (
														<CheckboxItem key={cat}>
																<input
																		type="checkbox"
																		checked={selectedCategories.includes(cat)}
																		onChange={() => {
																				setSelectedCategories((prev) =>
																						prev.includes(cat)
																								? prev.filter((c) => c !== cat)
																								: [...prev, cat],
																				);
																		}}
																/>
																<span>{cat}</span>
														</CheckboxItem>
												))}
										</CheckboxDropdown>
								)}
						</CategoryDropdownContainer>
				</Wrapper>
		);
};